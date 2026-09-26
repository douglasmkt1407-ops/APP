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
  stats: UserStats;
  dailyGoals: DailyGoalItem[];
  dailyGoalsDate?: string;
  notifications?: NotificationSettings;
}

const ACCOUNTS_VAULT_KEY = 'nextenf_accounts_vault';
const SAVED_CREDENTIALS_KEY = 'nextenf_saved_credentials';
const ACTIVE_EMAIL_KEY = 'nextenf_active_email';
const EXPLICIT_LOGOUT_KEY = 'nextenf_explicit_logout';

// Default starter account if vault is completely empty
const DEFAULT_ACCOUNT: UserAccountMemory = {
  id: 'user_aluno',
  email: 'aluno@nextenf.com.br',
  password: '123',
  name: 'Aluno NEXTENF',
  targetExam: 'Concurso Técnico em Enfermagem / EBSERH',
  avatarUrl: '',
  createdAt: new Date().toISOString(),
  lastActive: new Date().toISOString(),
  stats: {
    cardsReviewedCount: 0,
    questionsAnsweredCount: 0,
    questionsCorrectCount: 0,
    consecutiveDays: 0,
    studyTimeHours: 0.0,
    simuladosAttempts: [],
    reviewedCardIds: [],
    masteredCardIds: [],
    readSummaryIds: [],
    completedDailyTasks: [],
    sprintProgress: {},
    dailyStudyHistory: {}
  },
  dailyGoals: []
};

// Retrieve all accounts stored in the device's local vault
export const getAllAccounts = (): UserAccountMemory[] => {
  try {
    const raw = localStorage.getItem(ACCOUNTS_VAULT_KEY);
    if (raw) {
      const parsed = JSON.parse(raw);
      if (Array.isArray(parsed) && parsed.length > 0) {
        return parsed;
      }
    }
  } catch (err) {
    console.warn('Erro ao carregar banco de contas:', err);
  }
  return [DEFAULT_ACCOUNT];
};

// Save list of accounts to vault
export const saveAllAccounts = (accounts: UserAccountMemory[]): void => {
  try {
    localStorage.setItem(ACCOUNTS_VAULT_KEY, JSON.stringify(accounts));
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
};

// Saved credentials management (Email and Password remembered on device)
export const getSavedCredentials = (): SavedCredentials | null => {
  try {
    const raw = localStorage.getItem(SAVED_CREDENTIALS_KEY);
    if (raw) {
      const parsed = JSON.parse(raw);
      if (parsed && parsed.email) {
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
    return localStorage.getItem(ACTIVE_EMAIL_KEY);
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
