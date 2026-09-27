import { UserProfile, UserStats, DailyGoalItem, NotificationSettings } from '../types';

export interface SavedCredentials {
  email: string;
  password: string;
  rememberMe: boolean;
  autoLogin: boolean;
}

export interface UserAccountMemory {
  id: string;
  email: string;
  password: string;
  name: string;
  targetExam: string;
  avatarUrl?: string;
  createdAt: string;
  lastActive: string;
  hasCompletedTour?: boolean;
  stats: UserStats;
  dailyGoals: DailyGoalItem[];
  dailyGoalsDate?: string;
  notifications?: NotificationSettings;
}

const ACCOUNTS_VAULT_KEY = 'nextenf_accounts_vault';
const SAVED_CREDENTIALS_KEY = 'nextenf_saved_credentials';
const ACTIVE_EMAIL_KEY = 'nextenf_active_email';
const EXPLICIT_LOGOUT_KEY = 'nextenf_explicit_logout';

// Accounts that were created during development/testing to automatically purge
export const TEST_ACCOUNTS_TO_PURGE = [
  'aluno@nextenf.com.br',
  'teste@nextenf.com',
  'enfermeiro.ia@nextenf.com.br',
  'aluna.maria@nextenf.com.br'
];

// Retrieve all accounts stored on this specific device
export const getAllAccounts = (): UserAccountMemory[] => {
  try {
    const raw = localStorage.getItem(ACCOUNTS_VAULT_KEY);
    if (raw) {
      const parsed = JSON.parse(raw);
      if (Array.isArray(parsed)) {
        const cleaned = parsed.filter(a => {
          if (!a || !a.email) return false;
          const e = a.email.toLowerCase().trim();
          return !TEST_ACCOUNTS_TO_PURGE.includes(e) && a.id !== 'user_aluno';
        });
        if (cleaned.length !== parsed.length) {
          localStorage.setItem(ACCOUNTS_VAULT_KEY, JSON.stringify(cleaned));
        }
        return cleaned;
      }
    }
  } catch (err) {
    console.warn('Erro ao carregar banco de contas:', err);
  }
  return [];
};

// Remove a stored account from this device
export const removeStoredAccount = (email: string): UserAccountMemory[] => {
  if (!email) return getAllAccounts();
  const norm = email.trim().toLowerCase();
  const accounts = getAllAccounts().filter(a => a.email.toLowerCase() !== norm);
  saveAllAccounts(accounts);

  const creds = getSavedCredentials();
  if (creds && creds.email.toLowerCase() === norm) {
    setSavedCredentials(null);
  }
  if (getActiveEmail()?.toLowerCase() === norm) {
    setActiveEmail(null);
  }
  return accounts;
};

// Save list of accounts to vault
export const saveAllAccounts = (accounts: UserAccountMemory[]): void => {
  try {
    const cleaned = accounts.filter(a => {
      if (!a || !a.email) return false;
      const e = a.email.toLowerCase().trim();
      return !TEST_ACCOUNTS_TO_PURGE.includes(e) && a.id !== 'user_aluno';
    });
    localStorage.setItem(ACCOUNTS_VAULT_KEY, JSON.stringify(cleaned));
  } catch (err) {
    console.error('Falha ao salvar no cofre de contas:', err);
  }
};

// Get a specific account by email
export const getAccountByEmail = (email: string): UserAccountMemory | null => {
  if (!email) return null;
  const norm = email.trim().toLowerCase();
  const accounts = getAllAccounts();
  return accounts.find(a => a.email.toLowerCase() === norm) || null;
};

// Save or update an account completely in the memory vault
export const saveOrUpdateAccount = (account: UserAccountMemory): void => {
  const norm = account.email.trim().toLowerCase();
  const accounts = getAllAccounts();
  const index = accounts.findIndex(a => a.email.toLowerCase() === norm);

  const updatedAccount: UserAccountMemory = {
    ...account,
    email: norm,
    lastActive: new Date().toISOString()
  };

  if (index >= 0) {
    accounts[index] = {
      ...accounts[index],
      ...updatedAccount
    };
  } else {
    accounts.push(updatedAccount);
  }

  saveAllAccounts(accounts);
};

// Update only specific parts of the active user's memory (stats, goals, profile)
export const updateActiveAccountData = (
  email: string,
  partial: Partial<UserAccountMemory>
): void => {
  if (!email) return;
  const norm = email.trim().toLowerCase();
  const accounts = getAllAccounts();
  const index = accounts.findIndex(a => a.email.toLowerCase() === norm);

  if (index >= 0) {
    accounts[index] = {
      ...accounts[index],
      ...partial,
      lastActive: new Date().toISOString()
    };
    saveAllAccounts(accounts);
  }

  // Also sync to persistent server database in background
  syncActiveAccountToServer(email, partial);
};

// Sync to server background helper
export const syncActiveAccountToServer = async (
  email: string,
  partial: Partial<UserAccountMemory>
): Promise<void> => {
  try {
    await fetch(`/api/user/${encodeURIComponent(email.trim().toLowerCase())}/sync`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(partial)
    });
  } catch {
    // offline or static host fallback
  }
};

// Fetch account from server if available
export const fetchAccountFromServer = async (
  email: string
): Promise<UserAccountMemory | null> => {
  try {
    const res = await fetch(`/api/user/${encodeURIComponent(email.trim().toLowerCase())}`);
    if (res.ok) {
      const data = await res.json();
      if (data.success && data.account) {
        saveOrUpdateAccount(data.account);
        return data.account;
      }
    }
  } catch {
    // offline
  }
  return null;
};

// Local accounts retrieval (does not expose foreign server accounts)
export const fetchAllAccountsFromServer = async (): Promise<UserAccountMemory[]> => {
  return getAllAccounts();
};

export const serverRegister = async (
  email: string,
  password: string,
  name: string,
  targetExam: string
): Promise<{ success: boolean; account?: UserAccountMemory; message?: string }> => {
  try {
    const res = await fetch('/api/auth/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password, name, targetExam })
    });
    const data = await res.json();
    if (data.success && data.account) {
      saveOrUpdateAccount(data.account);
      return { success: true, account: data.account };
    }
    return { success: false, message: data.message || 'Erro ao registrar.' };
  } catch {
    return { success: false, message: 'Falha de conexão com o servidor central.' };
  }
};

export const serverLogin = async (
  email: string,
  password?: string
): Promise<{ success: boolean; account?: UserAccountMemory; message?: string }> => {
  try {
    const res = await fetch('/api/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password })
    });
    const data = await res.json();
    if (data.success && data.account) {
      saveOrUpdateAccount(data.account);
      return { success: true, account: data.account };
    }
    return { success: false, message: data.message || 'Erro ao autenticar.' };
  } catch {
    return { success: false, message: 'Falha de conexão com o servidor central.' };
  }
};

export const serverChangePassword = async (
  email: string,
  newPassword: string
): Promise<{ success: boolean; message: string }> => {
  try {
    const res = await fetch('/api/auth/change-password', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, newPassword })
    });
    const data = await res.json();
    if (data.success) {
      updateAccountPassword(email, newPassword);
      return { success: true, message: data.message };
    }
    return { success: false, message: data.message || 'Erro ao atualizar senha.' };
  } catch {
    return updateAccountPassword(email, newPassword);
  }
};

// Saved credentials management (Email and Password remembered on device)
export const getSavedCredentials = (): SavedCredentials | null => {
  try {
    const raw = localStorage.getItem(SAVED_CREDENTIALS_KEY);
    if (raw) {
      const parsed = JSON.parse(raw);
      if (parsed && parsed.email) {
        const norm = parsed.email.trim().toLowerCase();
        if (TEST_ACCOUNTS_TO_PURGE.includes(norm)) {
          localStorage.removeItem(SAVED_CREDENTIALS_KEY);
          return null;
        }
        return {
          email: parsed.email,
          password: parsed.password || '',
          rememberMe: parsed.rememberMe !== false,
          autoLogin: parsed.autoLogin !== false
        };
      }
    }
  } catch {
    // ignore
  }
  return null;
};

export const setSavedCredentials = (creds: SavedCredentials | null): void => {
  try {
    if (creds) {
      const norm = creds.email?.trim().toLowerCase();
      if (norm && TEST_ACCOUNTS_TO_PURGE.includes(norm)) {
        localStorage.removeItem(SAVED_CREDENTIALS_KEY);
        return;
      }
      localStorage.setItem(SAVED_CREDENTIALS_KEY, JSON.stringify(creds));
    } else {
      localStorage.removeItem(SAVED_CREDENTIALS_KEY);
    }
  } catch {
    // ignore
  }
};

// Active logged in email management
export const getActiveEmail = (): string | null => {
  try {
    const email = localStorage.getItem(ACTIVE_EMAIL_KEY);
    if (email && TEST_ACCOUNTS_TO_PURGE.includes(email.trim().toLowerCase())) {
      localStorage.removeItem(ACTIVE_EMAIL_KEY);
      return null;
    }
    return email;
  } catch {
    return null;
  }
};

export const setActiveEmail = (email: string | null): void => {
  try {
    if (email) {
      localStorage.setItem(ACTIVE_EMAIL_KEY, email.trim().toLowerCase());
      localStorage.removeItem(EXPLICIT_LOGOUT_KEY);
    } else {
      localStorage.removeItem(ACTIVE_EMAIL_KEY);
      localStorage.setItem(EXPLICIT_LOGOUT_KEY, 'true');
    }
  } catch {
    // ignore
  }
};

export const isExplicitLoggedOut = (): boolean => {
  try {
    return localStorage.getItem(EXPLICIT_LOGOUT_KEY) === 'true';
  } catch {
    return false;
  }
};

// Reset or change password for an account
export const updateAccountPassword = (
  email: string,
  newPassword: string
): { success: boolean; message: string } => {
  const norm = email.trim().toLowerCase();
  const accounts = getAllAccounts();
  const index = accounts.findIndex(a => a.email.toLowerCase() === norm);

  if (index === -1) {
    return { success: false, message: 'Conta não encontrada com este e-mail.' };
  }

  accounts[index].password = newPassword.trim();
  saveAllAccounts(accounts);

  // Also update saved credentials if it's the remembered email
  const creds = getSavedCredentials();
  if (creds && creds.email.toLowerCase() === norm) {
    setSavedCredentials({
      ...creds,
      password: newPassword.trim()
    });
  }

  return { success: true, message: 'Senha atualizada com sucesso na memória!' };
};
