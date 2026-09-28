/**
 * Safe Storage utility that works reliably across all mobile browsers
 * (including Samsung Internet, Xiaomi Mi Browser, Chrome Android, Safari Private Mode, WebViews).
 * 
 * If window.localStorage is blocked, throws SecurityError (Knox, Smart Anti-Tracking, Incognito),
 * or throws QuotaExceededError, it seamlessly falls back to an in-memory map without crashing the app.
 */

class MemoryStorage {
  private map = new Map<string, string>();

  getItem(key: string): string | null {
    return this.map.has(key) ? this.map.get(key)! : null;
  }

  setItem(key: string, value: string): void {
    this.map.set(key, String(value));
  }

  removeItem(key: string): void {
    this.map.delete(key);
  }

  clear(): void {
    this.map.clear();
  }
}

const memoryFallback = new MemoryStorage();

// Detect whether localStorage is actually accessible and writable
let isLocalStorageWorking = false;
try {
  if (typeof window !== 'undefined' && window.localStorage) {
    const testKey = '__nextenf_test_storage__';
    window.localStorage.setItem(testKey, '1');
    window.localStorage.removeItem(testKey);
    isLocalStorageWorking = true;
  }
} catch {
  isLocalStorageWorking = false;
}

export const safeStorage = {
  getItem: (key: string): string | null => {
    try {
      if (isLocalStorageWorking && typeof window !== 'undefined') {
        const val = window.localStorage.getItem(key);
        if (val !== null) return val;
      }
    } catch {
      // Storage access blocked or restricted on this device
    }
    return memoryFallback.getItem(key);
  },

  setItem: (key: string, value: string): void => {
    try {
      if (isLocalStorageWorking && typeof window !== 'undefined') {
        window.localStorage.setItem(key, String(value));
      }
    } catch {
      // Quota exceeded or security restriction (e.g. Samsung Knox, Xiaomi privacy mode)
      isLocalStorageWorking = false;
    }
    memoryFallback.setItem(key, String(value));
  },

  removeItem: (key: string): void => {
    try {
      if (isLocalStorageWorking && typeof window !== 'undefined') {
        window.localStorage.removeItem(key);
      }
    } catch {
      // Ignore
    }
    memoryFallback.removeItem(key);
  },

  clear: (): void => {
    try {
      if (isLocalStorageWorking && typeof window !== 'undefined') {
        window.localStorage.clear();
      }
    } catch {
      // Ignore
    }
    memoryFallback.clear();
  }
};
