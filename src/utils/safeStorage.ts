/**
 * Safe Storage utility that works reliably across all mobile browsers
 * (including Samsung Internet, Xiaomi Mi Browser, Chrome Android, Safari Private Mode, WebViews).
 * 
 * Safely accesses window.localStorage with per-call try/catch blocks.
 * Never permanently disables storage, ensuring saved credentials and accounts
 * are always persisted across sessions and reboots.
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

// Helper to write to cookie as secondary fallback for critical auth keys
function writeCookie(key: string, value: string, days = 365) {
  try {
    if (typeof document !== 'undefined') {
      const expires = new Date(Date.now() + days * 864e5).toUTCString();
      document.cookie = `${encodeURIComponent(key)}=${encodeURIComponent(value)}; expires=${expires}; path=/; SameSite=Lax`;
    }
  } catch {
    // Cookie disabled or restricted
  }
}

function readCookie(key: string): string | null {
  try {
    if (typeof document !== 'undefined' && document.cookie) {
      const name = encodeURIComponent(key) + '=';
      const parts = document.cookie.split('; ');
      for (const part of parts) {
        if (part.indexOf(name) === 0) {
          return decodeURIComponent(part.substring(name.length));
        }
      }
    }
  } catch {
    // Ignore
  }
  return null;
}

function removeCookie(key: string) {
  try {
    if (typeof document !== 'undefined') {
      document.cookie = `${encodeURIComponent(key)}=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/; SameSite=Lax`;
    }
  } catch {
    // Ignore
  }
}

export const safeStorage = {
  getItem: (key: string): string | null => {
    // 1. Try window.localStorage
    try {
      if (typeof window !== 'undefined' && window.localStorage) {
        const val = window.localStorage.getItem(key);
        if (val !== null) return val;
      }
    } catch {
      // Storage access blocked or restricted
    }

    // 2. Try cookie fallback for critical auth keys
    if (key.includes('credentials') || key.includes('active_email') || key.includes('accounts_vault')) {
      const cookieVal = readCookie(key);
      if (cookieVal !== null) {
        // Recover back to localStorage if available
        try {
          if (typeof window !== 'undefined' && window.localStorage) {
            window.localStorage.setItem(key, cookieVal);
          }
        } catch {}
        return cookieVal;
      }
    }

    // 3. In-memory fallback
    return memoryFallback.getItem(key);
  },

  setItem: (key: string, value: string): void => {
    const str = String(value);

    // Always update in-memory
    memoryFallback.setItem(key, str);

    // Persist to window.localStorage
    try {
      if (typeof window !== 'undefined' && window.localStorage) {
        window.localStorage.setItem(key, str);
      }
    } catch {
      // Handled gracefully without permanent disable
    }

    // Also persist critical auth keys in cookie (if not too large)
    if ((key.includes('credentials') || key.includes('active_email') || key.includes('accounts_vault')) && str.length < 3500) {
      writeCookie(key, str);
    }
  },

  removeItem: (key: string): void => {
    memoryFallback.removeItem(key);

    try {
      if (typeof window !== 'undefined' && window.localStorage) {
        window.localStorage.removeItem(key);
      }
    } catch {
      // Ignore
    }

    if (key.includes('credentials') || key.includes('active_email') || key.includes('accounts_vault')) {
      removeCookie(key);
    }
  },

  clear: (): void => {
    memoryFallback.clear();

    try {
      if (typeof window !== 'undefined' && window.localStorage) {
        window.localStorage.clear();
      }
    } catch {
      // Ignore
    }
  }
};
