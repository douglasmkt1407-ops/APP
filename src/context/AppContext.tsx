import React, { createContext, useContext, useState, useEffect, useRef, useCallback } from 'react';
import {
  ViewType,
  UserProfile,
  UserStats,
  Flashcard,
  Simulado,
  StudySummary,
  SprintDay,
  DailyGoalItem,
  NotificationSettings,
  ScheduledReminder,
  SimuladoAttempt,
  CardCategory
} from '../types';
import { INITIAL_FLASHCARDS } from '../data/flashcardsData';
import { SIMULADOS_DATA } from '../data/simuladosData';
import { SUMMARIES_DATA } from '../data/summariesData';
import { INITIAL_SPRINT_DAYS } from '../data/sprintData';
import confetti from 'canvas-confetti';
import {
  UserAccountMemory,
  getAllAccounts,
  saveAllAccounts,
  getAccountByEmail,
  saveOrUpdateAccount,
  updateActiveAccountData,
  getSavedCredentials,
  setSavedCredentials,
  getActiveEmail,
  setActiveEmail,
  isExplicitLoggedOut,
  updateAccountPassword
} from '../utils/userMemory';

export interface RegisteredAccount {
  id: string;
  email: string;
  password: string;
  name: string;
  targetExam: string;
  avatarUrl?: string;
  createdAt: string;
}

interface AppContextType {
  // Navigation & User
  currentView: ViewType;
  setCurrentView: (view: ViewType) => void;
  user: UserProfile | null;
  login: (email: string, password?: string, rememberMe?: boolean) => { success: boolean; message?: string };
  registerAccount: (email: string, password: string, name: string, targetExam: string, rememberMe?: boolean) => { success: boolean; message?: string };
  logout: () => void;
  updateProfile: (name: string, targetExam: string, avatarUrl?: string) => void;
  updateAvatar: (avatarUrl: string) => void;
  changePassword: (email: string, newPassword: string) => { success: boolean; message: string };
  getAllStoredAccounts: () => UserAccountMemory[];

  // PWA Install
  canInstallPwa: boolean;
  isInstallModalOpen: boolean;
  setIsInstallModalOpen: (open: boolean) => void;
  promptPwaInstall: () => Promise<void>;

  // Stats
  stats: UserStats;
  overallProgressPercentage: number;
  resetAllStatsToZero: () => void;
  resetStudyTimeToZero: () => void;
  loadDemoStats: () => void;
  registerStudySession: (minutes?: number, label?: string) => void;
  addStudySeconds: (seconds: number) => void;

  // Flashcards
  flashcards: Flashcard[];
  activeCategory: CardCategory | 'Todas';
  setActiveCategory: (cat: CardCategory | 'Todas') => void;
  markCardReviewed: (cardId: number, status: 'learning' | 'mastered') => void;

  // Simulados
  simulados: Simulado[];
  selectedSimuladoId: number | null;
  setSelectedSimuladoId: (id: number | null) => void;
  recordSimuladoAttempt: (attempt: Omit<SimuladoAttempt, 'id' | 'date'>) => void;

  // Resumos Express
  summaries: StudySummary[];
  selectedSummaryId: string | null;
  setSelectedSummaryId: (id: string | null) => void;
  markSummaryAsRead: (summaryId: string) => void;

  // Sprint 7 Dias
  sprintDays: SprintDay[];
  toggleSprintTask: (taskId: string) => void;

  // Checklist Diário
  dailyGoals: DailyGoalItem[];
  dailyGoalsDate: string;
  toggleDailyGoal: (goalId: string) => void;
  addDailyGoal: (text: string, category?: string) => void;
  editDailyGoal: (id: string, newText: string, newCategory?: string) => void;
  deleteDailyGoal: (id: string) => void;
  renewDailyChecklist: () => void;

  // Notifications & Scheduling
  notifications: NotificationSettings;
  scheduledReminders: ScheduledReminder[];
  updateNotificationSettings: (settings: Partial<NotificationSettings>) => void;
  requestBrowserNotificationPermission: () => Promise<boolean>;
  sendTestNotification: () => void;
  toggleScheduledReminder: (id: string) => void;
  updateScheduledReminderTime: (id: string, time: string) => void;
  addScheduledReminder: (reminder: Omit<ScheduledReminder, 'id'>) => void;
  deleteScheduledReminder: (id: string) => void;
  triggerScheduledReminderNotification: (reminder: ScheduledReminder) => void;
  inAppNotification: { title: string; body: string } | null;
  dismissInAppNotification: () => void;

  // Quick navigation helper
  navigateToWithParams: (view: ViewType, params?: { category?: string; simuladoId?: number; summaryId?: string }) => void;

  // Automated Presence & Session Tracking (Entrada e Saída)
  sessionEntryTime: string;
  sessionLastExitTime: string;
  sessionActiveSeconds: number;
  isSessionTracking: boolean;
  toggleSessionTracking: () => void;
  formatDurationHHMMSS: (totalSeconds: number) => string;
}

const getTodayDateKey = (): string => {
  const d = new Date();
  const year = d.getFullYear();
  const month = String(d.getMonth() + 1).padStart(2, '0');
  const day = String(d.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
};

const updateStudyTimeInStats = (
  prev: UserStats,
  addedHours: number
): { studyTimeHours: number; dailyStudyHistory: Record<string, number>; consecutiveDays: number; lastStudyDate: string } => {
  const today = getTodayDateKey();
  const currentHistory = prev.dailyStudyHistory || {};
  const currentTodayHours = currentHistory[today] || 0;
  // Use 4 decimal places so that every 1 minute (+0.0167h) is accurately recorded without rounding truncation
  const newTodayHours = Number((currentTodayHours + addedHours).toFixed(4));
  const newTotalHours = Number((prev.studyTimeHours + addedHours).toFixed(4));
  const isNewDay = prev.lastStudyDate !== today;
  const newDays = isNewDay ? Math.max(1, prev.consecutiveDays + 1) : Math.max(1, prev.consecutiveDays);

  return {
    studyTimeHours: Math.max(0, newTotalHours),
    dailyStudyHistory: {
      ...currentHistory,
      [today]: Math.max(0, newTodayHours)
    },
    consecutiveDays: newDays,
    lastStudyDate: today
  };
};

const DEFAULT_ZERO_STATS: UserStats = {
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
};

const DEFAULT_DAILY_GOALS: DailyGoalItem[] = [
  { id: 'goal-1', text: 'Revisar no mínimo 15 Flashcards de enfermagem', completed: false, category: 'Cards' },
  { id: 'goal-2', text: 'Resolver 1 Simulado com gabarito comentado', completed: false, category: 'Simulado' },
  { id: 'goal-3', text: 'Fazer leitura de 1 Resumo Express com anotações', completed: false, category: 'Resumos' },
  { id: 'goal-4', text: 'Cumprir a meta da missão do Sprint de 7 Dias', completed: false, category: 'Sprint' },
  { id: 'goal-5', text: 'Manter a constância e hidratar-se durante o estudo (2L de água)', completed: false, category: 'Saúde' }
];

const DEFAULT_SCHEDULED_REMINDERS: ScheduledReminder[] = [
  {
    id: 'reminder-morning',
    title: '🌅 Lembrete Matinal NEXTENF',
    message: 'Comece seu dia revisando 15 flashcards de enfermagem!',
    time: '08:00',
    enabled: true,
    category: 'Flashcards'
  },
  {
    id: 'reminder-afternoon',
    title: '☀️ Hora do Simulado NEXTENF',
    message: 'Hora do Simulado do dia (10 questões calibradas). Vamos juntos?',
    time: '14:00',
    enabled: true,
    category: 'Simulado'
  },
  {
    id: 'reminder-night',
    title: '🌙 Fechamento do Dia NEXTENF',
    message: 'Feche sua meta do Checklist Diário antes de dormir!',
    time: '20:30',
    enabled: true,
    category: 'Checklist'
  }
];

const DEFAULT_NOTIFICATIONS: NotificationSettings = {
  browserNotificationsEnabled: false,
  morningReminder: true,
  morningTime: '08:00',
  afternoonReminder: true,
  afternoonTime: '14:00',
  nightReminder: true,
  nightTime: '20:30',
  soundAlerts: true,
  streakAlerts: true,
  scheduledReminders: DEFAULT_SCHEDULED_REMINDERS
};

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Navigation
  const [currentView, setCurrentView] = useState<ViewType>('inicio');

  // PWA Install State
  const [deferredPrompt, setDeferredPrompt] = useState<any>(null);
  const [canInstallPwa, setCanInstallPwa] = useState<boolean>(false);
  const [isInstallModalOpen, setIsInstallModalOpen] = useState<boolean>(false);

  useEffect(() => {
    const handleBeforeInstallPrompt = (e: Event) => {
      e.preventDefault();
      setDeferredPrompt(e);
      setCanInstallPwa(true);
    };

    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);

    return () => {
      window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
    };
  }, []);

  const promptPwaInstall = async () => {
    if (deferredPrompt) {
      try {
        deferredPrompt.prompt();
        const choice = await deferredPrompt.userChoice;
        if (choice && choice.outcome === 'accepted') {
          setCanInstallPwa(false);
          setDeferredPrompt(null);
        }
      } catch (err) {
        console.warn('Erro ao disparar prompt de instalação PWA:', err);
      }
    } else {
      setIsInstallModalOpen(true);
    }
  };

  // User auth state
  const [user, setUser] = useState<UserProfile | null>(() => {
    if (isExplicitLoggedOut()) {
      return null;
    }

    const activeEmail = getActiveEmail();
    if (activeEmail) {
      const acc = getAccountByEmail(activeEmail);
      if (acc) {
        return {
          id: acc.id,
          name: acc.name,
          email: acc.email,
          targetExam: acc.targetExam,
          avatarUrl: acc.avatarUrl || '',
          createdAt: acc.createdAt
        };
      }
    }

    const savedCreds = getSavedCredentials();
    if (savedCreds && savedCreds.rememberMe && savedCreds.email) {
      const acc = getAccountByEmail(savedCreds.email);
      if (acc) {
        setActiveEmail(acc.email);
        return {
          id: acc.id,
          name: acc.name,
          email: acc.email,
          targetExam: acc.targetExam,
          avatarUrl: acc.avatarUrl || '',
          createdAt: acc.createdAt
        };
      }
    }

    const saved = localStorage.getItem('nextenf_user_session');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch {
        return null;
      }
    }
    return null;
  });

  // User Stats (defaults to ZERO for realistic fresh experience, restores from user memory)
  const [stats, setStats] = useState<UserStats>(() => {
    const activeEmail = getActiveEmail() || getSavedCredentials()?.email;
    if (activeEmail) {
      const acc = getAccountByEmail(activeEmail);
      if (acc && acc.stats) {
        return acc.stats;
      }
    }

    const saved = localStorage.getItem('nextenf_user_stats');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        if (
          (!parsed.cardsReviewedCount || parsed.cardsReviewedCount === 0) &&
          (!parsed.questionsAnsweredCount || parsed.questionsAnsweredCount === 0) &&
          (!parsed.simuladosAttempts || parsed.simuladosAttempts.length === 0) &&
          (parsed.studyTimeHours === 0.3 || parsed.studyTimeHours === 0.30)
        ) {
          parsed.studyTimeHours = 0.0;
          parsed.dailyStudyHistory = {};
        }
        return parsed;
      } catch {
        return DEFAULT_ZERO_STATS;
      }
    }
    return DEFAULT_ZERO_STATS;
  });

  // Notifications
  const [notifications, setNotifications] = useState<NotificationSettings>(() => {
    const activeEmail = getActiveEmail() || getSavedCredentials()?.email;
    if (activeEmail) {
      const acc = getAccountByEmail(activeEmail);
      if (acc && acc.notifications) {
        return {
          ...DEFAULT_NOTIFICATIONS,
          ...acc.notifications,
          scheduledReminders: acc.notifications.scheduledReminders || DEFAULT_SCHEDULED_REMINDERS
        };
      }
    }

    const saved = localStorage.getItem('nextenf_notifications');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        return {
          ...DEFAULT_NOTIFICATIONS,
          ...parsed,
          scheduledReminders: parsed.scheduledReminders || DEFAULT_SCHEDULED_REMINDERS
        };
      } catch {
        return DEFAULT_NOTIFICATIONS;
      }
    }
    return DEFAULT_NOTIFICATIONS;
  });

  // Daily goals date tracker
  const [dailyGoalsDate, setDailyGoalsDate] = useState<string>(() => {
    return localStorage.getItem('nextenf_daily_goals_date') || getTodayDateKey();
  });

  // Daily goals state with automatic renewal if date has changed
  const [dailyGoals, setDailyGoals] = useState<DailyGoalItem[]>(() => {
    const today = getTodayDateKey();
    const activeEmail = getActiveEmail() || getSavedCredentials()?.email;
    let savedGoals: DailyGoalItem[] | null = null;
    let savedDate: string | null = null;

    if (activeEmail) {
      const acc = getAccountByEmail(activeEmail);
      if (acc && acc.dailyGoals && acc.dailyGoals.length > 0) {
        savedGoals = acc.dailyGoals;
        savedDate = acc.dailyGoalsDate || null;
      }
    }

    if (!savedGoals) {
      const savedDateRaw = localStorage.getItem('nextenf_daily_goals_date');
      const savedRaw = localStorage.getItem('nextenf_daily_goals');
      if (savedRaw) {
        try {
          savedGoals = JSON.parse(savedRaw);
          savedDate = savedDateRaw;
        } catch {
          // ignore
        }
      }
    }

    // If it is the exact same calendar day, preserve current checkbox states
    if (savedGoals && savedDate === today) {
      return savedGoals;
    }

    // New day detected or initial load: automatically renew the checklist!
    localStorage.setItem('nextenf_daily_goals_date', today);
    if (savedGoals) {
      const renewed = savedGoals.map(g => ({ ...g, completed: false }));
      localStorage.setItem('nextenf_daily_goals', JSON.stringify(renewed));
      return renewed;
    }

    return DEFAULT_DAILY_GOALS;
  });

  // Flashcards state
  const [flashcards, setFlashcards] = useState<Flashcard[]>(() => {
    return INITIAL_FLASHCARDS.map(card => {
      const isMastered = stats.masteredCardIds?.includes(card.id);
      const isReviewed = stats.reviewedCardIds?.includes(card.id);
      return {
        ...card,
        status: isMastered ? 'mastered' : isReviewed ? 'learning' : 'new'
      };
    });
  });

  const [activeCategory, setActiveCategory] = useState<CardCategory | 'Todas'>('Todas');

  // Simulados state
  const [simulados] = useState<Simulado[]>(SIMULADOS_DATA);
  const [selectedSimuladoId, setSelectedSimuladoId] = useState<number | null>(null);

  // Resumos Express state
  const [summaries, setSummaries] = useState<StudySummary[]>(() => {
    return SUMMARIES_DATA.map(s => ({
      ...s,
      isRead: stats.readSummaryIds?.includes(s.id) || false
    }));
  });
  const [selectedSummaryId, setSelectedSummaryId] = useState<string | null>(null);

  // Sprint Days state
  const [sprintDays, setSprintDays] = useState<SprintDay[]>(INITIAL_SPRINT_DAYS);

  // In-app alert notification
  const [inAppNotification, setInAppNotification] = useState<{ title: string; body: string } | null>(null);

  // Automated Presence & Session Tracking (Entrada e Saída)
  const [sessionEntryTime, setSessionEntryTime] = useState<string>(() => {
    const existing = localStorage.getItem('nextenf_current_entry_time');
    if (existing) return existing;
    const now = new Date().toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit', second: '2-digit' });
    localStorage.setItem('nextenf_current_entry_time', now);
    return now;
  });

  const [sessionLastExitTime, setSessionLastExitTime] = useState<string>(() => {
    return localStorage.getItem('nextenf_last_exit_time') || '--:--';
  });

  const [sessionActiveSeconds, setSessionActiveSeconds] = useState<number>(0);
  const [isSessionTracking, setIsSessionTracking] = useState<boolean>(true);
  const sessionAccruedRef = useRef<number>(0);

  // Sync to database vault and localStorage
  useEffect(() => {
    if (user?.email) {
      localStorage.setItem('nextenf_user_session', JSON.stringify(user));
      // Save directly to the account memory database vault
      updateActiveAccountData(user.email, {
        name: user.name,
        targetExam: user.targetExam,
        avatarUrl: user.avatarUrl,
        stats,
        dailyGoals,
        dailyGoalsDate,
        notifications
      });
    } else {
      localStorage.removeItem('nextenf_user_session');
    }
  }, [user, stats, dailyGoals, dailyGoalsDate, notifications]);

  useEffect(() => {
    localStorage.setItem('nextenf_user_stats', JSON.stringify(stats));
  }, [stats]);

  useEffect(() => {
    localStorage.setItem('nextenf_notifications', JSON.stringify(notifications));
  }, [notifications]);

  useEffect(() => {
    localStorage.setItem('nextenf_daily_goals', JSON.stringify(dailyGoals));
  }, [dailyGoals]);

  // Active daily renewal watcher (checks midnight rollover, visibility change, and window focus)
  useEffect(() => {
    const checkDailyRenewal = () => {
      const today = getTodayDateKey();
      const savedDate = localStorage.getItem('nextenf_daily_goals_date');

      if (savedDate && savedDate !== today) {
        // It is a new day! Automatically renew daily checklist
        setDailyGoals(prev => {
          const renewed = prev.map(g => ({ ...g, completed: false }));
          localStorage.setItem('nextenf_daily_goals', JSON.stringify(renewed));
          localStorage.setItem('nextenf_daily_goals_date', today);
          return renewed;
        });
        setDailyGoalsDate(today);
      } else if (!savedDate) {
        localStorage.setItem('nextenf_daily_goals_date', today);
        setDailyGoalsDate(today);
      }
    };

    checkDailyRenewal();
    const interval = setInterval(checkDailyRenewal, 15000);
    window.addEventListener('focus', checkDailyRenewal);
    document.addEventListener('visibilitychange', checkDailyRenewal);

    return () => {
      clearInterval(interval);
      window.removeEventListener('focus', checkDailyRenewal);
      document.removeEventListener('visibilitychange', checkDailyRenewal);
    };
  }, []);

  // Add real-time study seconds (from Modo Foco or active reading)
  const addStudySeconds = useCallback((seconds: number) => {
    if (seconds <= 0) return;
    const hours = Number((seconds / 3600).toFixed(4));
    setStats(prev => {
      const timeUpdate = updateStudyTimeInStats(prev, hours);
      return {
        ...prev,
        ...timeUpdate
      };
    });
  }, []);

  // Reset study time specifically to zero
  const resetStudyTimeToZero = useCallback(() => {
    const today = getTodayDateKey();
    setSessionActiveSeconds(0);
    sessionAccruedRef.current = 0;
    setStats(prev => {
      const updatedHistory = { ...(prev.dailyStudyHistory || {}) };
      delete updatedHistory[today];
      const updated: UserStats = {
        ...prev,
        studyTimeHours: 0.0,
        dailyStudyHistory: updatedHistory
      };
      localStorage.setItem('nextenf_user_stats', JSON.stringify(updated));
      return updated;
    });

    setInAppNotification({
      title: '⏱️ Tempo de Estudo Zerado',
      body: 'O tempo estudado foi redefinido para 0.0h com sucesso.'
    });

    if (notifications.soundAlerts) {
      playAlertSound();
    }
  }, [notifications.soundAlerts]);

  // Toggle automated presence tracking
  const toggleSessionTracking = useCallback(() => {
    setIsSessionTracking(prev => {
      const next = !prev;
      if (!next && sessionAccruedRef.current > 0) {
        const remaining = sessionAccruedRef.current;
        sessionAccruedRef.current = 0;
        addStudySeconds(remaining);
      }
      return next;
    });
  }, [addStudySeconds]);

  // Format seconds to HH:MM:SS
  const formatDurationHHMMSS = useCallback((totalSeconds: number): string => {
    if (!totalSeconds || totalSeconds < 0) return '00:00:00';
    const hrs = Math.floor(totalSeconds / 3600);
    const mins = Math.floor((totalSeconds % 3600) / 60);
    const secs = totalSeconds % 60;
    return `${String(hrs).padStart(2, '0')}:${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
  }, []);

  // Automated presence timer: ticks every 1 second, and every 60 seconds (1 minute of real time) increments the studied time
  useEffect(() => {
    if (!user || !isSessionTracking) return;

    const interval = setInterval(() => {
      setSessionActiveSeconds(prev => prev + 1);
      sessionAccruedRef.current += 1;

      // Exactly every 60 seconds (1 minute de tempo real), adiciona 1 minuto ao tempo estudado
      if (sessionAccruedRef.current >= 60) {
        const toAdd = sessionAccruedRef.current;
        sessionAccruedRef.current = 0;
        addStudySeconds(toAdd);
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [user, isSessionTracking, addStudySeconds]);

  // Handle browser tab close, unmount and visibility changes to record exact Horário de Saída
  useEffect(() => {
    const handleBeforeUnload = () => {
      const exitTime = new Date().toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit', second: '2-digit' });
      localStorage.setItem('nextenf_last_exit_time', exitTime);

      if (sessionAccruedRef.current > 0) {
        const remainingHours = Number((sessionAccruedRef.current / 3600).toFixed(4));
        sessionAccruedRef.current = 0;
        try {
          const rawStats = localStorage.getItem('nextenf_user_stats');
          if (rawStats) {
            const parsed: UserStats = JSON.parse(rawStats);
            const today = getTodayDateKey();
            const history = parsed.dailyStudyHistory || {};
            const updatedTotal = Number((parsed.studyTimeHours + remainingHours).toFixed(4));
            const updatedToday = Number(((history[today] || 0) + remainingHours).toFixed(4));
            parsed.studyTimeHours = Math.max(0, updatedTotal);
            parsed.dailyStudyHistory = { ...history, [today]: Math.max(0, updatedToday) };
            localStorage.setItem('nextenf_user_stats', JSON.stringify(parsed));
          }
        } catch {
          // ignore
        }
      }
    };

    const handleVisibilityChange = () => {
      if (document.visibilityState === 'hidden') {
        const exitTime = new Date().toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit', second: '2-digit' });
        localStorage.setItem('nextenf_last_exit_time', exitTime);
        setSessionLastExitTime(exitTime);

        if (sessionAccruedRef.current > 0) {
          const toAdd = sessionAccruedRef.current;
          sessionAccruedRef.current = 0;
          addStudySeconds(toAdd);
        }
      } else if (document.visibilityState === 'visible') {
        const lastExit = localStorage.getItem('nextenf_last_exit_time');
        if (lastExit) setSessionLastExitTime(lastExit);
      }
    };

    window.addEventListener('beforeunload', handleBeforeUnload);
    document.addEventListener('visibilitychange', handleVisibilityChange);

    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, [addStudySeconds]);

  // Sync flashcards status when stats change
  useEffect(() => {
    setFlashcards(prev =>
      prev.map(card => {
        const isMastered = stats.masteredCardIds?.includes(card.id);
        const isReviewed = stats.reviewedCardIds?.includes(card.id);
        return {
          ...card,
          status: isMastered ? 'mastered' : isReviewed ? 'learning' : 'new'
        };
      })
    );
  }, [stats.masteredCardIds, stats.reviewedCardIds]);

  // Sync summaries read status
  useEffect(() => {
    setSummaries(prev =>
      prev.map(s => ({
        ...s,
        isRead: stats.readSummaryIds?.includes(s.id) || false
      }))
    );
  }, [stats.readSummaryIds]);

  // Sync sprint tasks completion
  useEffect(() => {
    setSprintDays(prev =>
      prev.map(day => {
        const updatedTasks = day.tasks.map(task => ({
          ...task,
          completed: !!stats.sprintProgress[task.id]
        }));
        const allCompleted = updatedTasks.every(t => t.completed);
        return {
          ...day,
          tasks: updatedTasks,
          completed: allCompleted
        };
      })
    );
  }, [stats.sprintProgress]);

  // Sound chime helper
  const playAlertSound = () => {
    try {
      const audioCtx = new (window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext)();
      const osc = audioCtx.createOscillator();
      const gain = audioCtx.createGain();
      osc.connect(gain);
      gain.connect(audioCtx.destination);
      osc.type = 'sine';
      osc.frequency.setValueAtTime(587.33, audioCtx.currentTime); // D5
      osc.frequency.exponentialRampToValueAtTime(880, audioCtx.currentTime + 0.15); // A5
      gain.gain.setValueAtTime(0.2, audioCtx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.01, audioCtx.currentTime + 0.35);
      osc.start();
      osc.stop(audioCtx.currentTime + 0.36);
    } catch {
      // AudioContext not allowed or not supported in silent environment
    }
  };

  // Database memory vault helpers
  const getAllStoredAccounts = useCallback((): UserAccountMemory[] => {
    return getAllAccounts();
  }, []);

  const changePassword = useCallback((email: string, newPassword: string) => {
    return updateAccountPassword(email, newPassword);
  }, []);

  // Auth methods connected to persistent database vault
  const login = (email: string, password?: string, rememberMe = true): { success: boolean; message?: string } => {
    const normEmail = email.trim().toLowerCase();
    const account = getAccountByEmail(normEmail);

    if (!account) {
      return {
        success: false,
        message: 'E-mail não encontrado no banco de dados. Cadastre sua conta na aba ao lado.'
      };
    }

    if (password && account.password !== password.trim()) {
      return {
        success: false,
        message: 'Senha incorreta. Verifique suas credenciais e tente novamente.'
      };
    }

    const sessionUser: UserProfile = {
      id: account.id,
      name: account.name,
      email: account.email,
      targetExam: account.targetExam,
      avatarUrl: account.avatarUrl || '',
      createdAt: account.createdAt
    };
    setUser(sessionUser);
    setActiveEmail(account.email);

    if (rememberMe) {
      setSavedCredentials({
        email: account.email,
        password: account.password,
        rememberMe: true,
        autoLogin: true
      });
    } else {
      setSavedCredentials(null);
    }

    // Restore this student's specific stats, dailyGoals & notifications from their memory vault
    if (account.stats) {
      setStats(account.stats);
    }
    if (account.dailyGoals && account.dailyGoals.length > 0) {
      const today = getTodayDateKey();
      if (account.dailyGoalsDate === today) {
        setDailyGoals(account.dailyGoals);
      } else {
        setDailyGoals(account.dailyGoals.map(g => ({ ...g, completed: false })));
      }
    }
    if (account.notifications) {
      setNotifications({
        ...DEFAULT_NOTIFICATIONS,
        ...account.notifications,
        scheduledReminders: account.notifications.scheduledReminders || DEFAULT_SCHEDULED_REMINDERS
      });
    }

    const entryNow = new Date().toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit', second: '2-digit' });
    setSessionEntryTime(entryNow);
    localStorage.setItem('nextenf_current_entry_time', entryNow);
    setSessionActiveSeconds(0);
    sessionAccruedRef.current = 0;

    setCurrentView('inicio');
    return { success: true };
  };

  const registerAccount = (
    email: string,
    password: string,
    name: string,
    targetExam: string,
    rememberMe = true
  ): { success: boolean; message?: string } => {
    const normEmail = email.trim().toLowerCase();
    const existing = getAccountByEmail(normEmail);

    if (existing) {
      return {
        success: false,
        message: 'Este e-mail já está cadastrado no banco de dados. Faça login com sua senha.'
      };
    }

    const newAccount: UserAccountMemory = {
      id: 'user_' + Date.now(),
      email: normEmail,
      password: password.trim(),
      name: name.trim() || 'Estudante de Enfermagem',
      targetExam: targetExam.trim() || 'Concurso Técnico em Enfermagem / EBSERH',
      avatarUrl: '',
      createdAt: new Date().toISOString(),
      lastActive: new Date().toISOString(),
      stats: { ...DEFAULT_ZERO_STATS },
      dailyGoals: [...DEFAULT_DAILY_GOALS],
      dailyGoalsDate: getTodayDateKey(),
      notifications: { ...DEFAULT_NOTIFICATIONS }
    };

    saveOrUpdateAccount(newAccount);

    const sessionUser: UserProfile = {
      id: newAccount.id,
      name: newAccount.name,
      email: newAccount.email,
      targetExam: newAccount.targetExam,
      avatarUrl: '',
      createdAt: newAccount.createdAt
    };

    setUser(sessionUser);
    setActiveEmail(newAccount.email);
    setStats({ ...DEFAULT_ZERO_STATS });
    setDailyGoals([...DEFAULT_DAILY_GOALS]);
    setNotifications({ ...DEFAULT_NOTIFICATIONS });

    if (rememberMe) {
      setSavedCredentials({
        email: newAccount.email,
        password: newAccount.password,
        rememberMe: true,
        autoLogin: true
      });
    }

    const entryNow = new Date().toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit', second: '2-digit' });
    setSessionEntryTime(entryNow);
    localStorage.setItem('nextenf_current_entry_time', entryNow);
    setSessionActiveSeconds(0);
    sessionAccruedRef.current = 0;

    setCurrentView('inicio');
    return { success: true };
  };

  const logout = () => {
    if (sessionAccruedRef.current > 0) {
      const remaining = sessionAccruedRef.current;
      sessionAccruedRef.current = 0;
      addStudySeconds(remaining);
    }
    const exitTime = new Date().toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit', second: '2-digit' });
    localStorage.setItem('nextenf_last_exit_time', exitTime);
    setSessionLastExitTime(exitTime);

    if (user?.email) {
      updateActiveAccountData(user.email, {
        stats,
        dailyGoals,
        dailyGoalsDate,
        notifications
      });
    }

    setActiveEmail(null);
    setUser(null);
    localStorage.removeItem('nextenf_user_session');
  };

  const updateProfile = (name: string, targetExam: string, avatarUrl?: string) => {
    if (!user) return;
    const resolvedAvatar = avatarUrl !== undefined ? avatarUrl : (user.avatarUrl || '');
    const updated: UserProfile = {
      ...user,
      name,
      targetExam,
      avatarUrl: resolvedAvatar
    };
    setUser(updated);
    updateActiveAccountData(user.email, {
      name,
      targetExam,
      avatarUrl: resolvedAvatar
    });
  };

  const updateAvatar = (avatarUrl: string) => {
    if (!user) return;
    const updated: UserProfile = {
      ...user,
      avatarUrl
    };
    setUser(updated);
    updateActiveAccountData(user.email, {
      avatarUrl
    });
  };

  // Reset to realistic ZERO
  const resetAllStatsToZero = () => {
    const freshZero: UserStats = {
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
      sprintProgress: {}
    };

    const freshGoals = DEFAULT_DAILY_GOALS.map(g => ({ ...g, completed: false }));
    const today = getTodayDateKey();

    // Immediate forced persistence
    localStorage.setItem('nextenf_user_stats', JSON.stringify(freshZero));
    localStorage.setItem('nextenf_daily_goals', JSON.stringify(freshGoals));
    localStorage.setItem('nextenf_daily_goals_date', today);

    setStats(freshZero);
    setDailyGoals(freshGoals);
    setDailyGoalsDate(today);
    setSessionActiveSeconds(0);
    sessionAccruedRef.current = 0;

    // Reset flashcards status to new
    setFlashcards(INITIAL_FLASHCARDS.map(card => ({ ...card, status: 'new' })));

    // Reset summaries read status
    setSummaries(SUMMARIES_DATA.map(s => ({ ...s, isRead: false })));

    // Reset sprint days tasks
    setSprintDays(INITIAL_SPRINT_DAYS.map(d => ({
      ...d,
      completed: false,
      tasks: d.tasks.map(t => ({ ...t, completed: false }))
    })));

    setInAppNotification({
      title: '✓ Dados Zerados com Sucesso!',
      body: 'Todos os seus contadores de cards, simulados, horas e progresso foram redefinidos para 0.'
    });

    if (notifications.soundAlerts) {
      playAlertSound();
    }
  };

  // Load demo stats (optional helper for testing)
  const loadDemoStats = () => {
    // Generate realistic last 7 days history ending today
    const history: Record<string, number> = {};
    const d = new Date();
    const demoHoursByDay = [1.2, 2.0, 1.5, 2.8, 1.8, 2.2, 1.4];
    for (let i = 6; i >= 0; i--) {
      const past = new Date(d);
      past.setDate(d.getDate() - i);
      const y = past.getFullYear();
      const m = String(past.getMonth() + 1).padStart(2, '0');
      const day = String(past.getDate()).padStart(2, '0');
      const key = `${y}-${m}-${day}`;
      history[key] = demoHoursByDay[6 - i];
    }

    const demoStats: UserStats = {
      cardsReviewedCount: 108,
      questionsAnsweredCount: 50,
      questionsCorrectCount: 42,
      consecutiveDays: 14,
      studyTimeHours: 24.5,
      lastStudyDate: getTodayDateKey(),
      simuladosAttempts: [
        {
          id: 'demo-1',
          simuladoId: 1,
          simuladoTitle: 'Simulado 01 - Fundamentos & Sinais Vitais',
          date: 'Ontem',
          score: 9,
          percentage: 90,
          answers: {},
          timeSpentSeconds: 780
        },
        {
          id: 'demo-2',
          simuladoId: 2,
          simuladoTitle: 'Simulado 02 - Farmacologia & Cálculo',
          date: 'Hoje',
          score: 8,
          percentage: 80,
          answers: {},
          timeSpentSeconds: 940
        }
      ],
      reviewedCardIds: Array.from({ length: 60 }, (_, i) => i + 1),
      masteredCardIds: Array.from({ length: 40 }, (_, i) => i + 1),
      readSummaryIds: ['resumo-gotejamento', 'resumo-rcp-aha'],
      completedDailyTasks: ['goal-1', 'goal-2'],
      sprintProgress: { 'sprint-d1-t1': true, 'sprint-d1-t2': true },
      dailyStudyHistory: history
    };

    localStorage.setItem('nextenf_user_stats', JSON.stringify(demoStats));
    setStats(demoStats);

    setInAppNotification({
      title: '📊 Dados Demonstrativos Carregados',
      body: 'Os gráficos agora exibem métricas preenchidas para visualização.'
    });

    if (notifications.soundAlerts) {
      playAlertSound();
    }
  };

  // Flashcards actions
  const markCardReviewed = (cardId: number, status: 'learning' | 'mastered') => {
    setStats(prev => {
      const reviewedSet = new Set(prev.reviewedCardIds);
      reviewedSet.add(cardId);

      const masteredSet = new Set(prev.masteredCardIds);
      if (status === 'mastered') {
        masteredSet.add(cardId);
      } else {
        masteredSet.delete(cardId);
      }

      // Add small study time (+3 minutes = 0.05h)
      const timeUpdate = updateStudyTimeInStats(prev, 0.05);

      return {
        ...prev,
        cardsReviewedCount: reviewedSet.size,
        reviewedCardIds: Array.from(reviewedSet),
        masteredCardIds: Array.from(masteredSet),
        ...timeUpdate
      };
    });
  };

  // Simulados actions
  const recordSimuladoAttempt = (attemptData: Omit<SimuladoAttempt, 'id' | 'date'>) => {
    const newAttempt: SimuladoAttempt = {
      ...attemptData,
      id: 'att_' + Date.now(),
      date: new Date().toLocaleDateString('pt-BR', { day: '2-digit', month: '2-digit', hour: '2-digit', minute: '2-digit' })
    };

    setStats(prev => {
      const newAttempts = [newAttempt, ...prev.simuladosAttempts];
      const answeredTotal = prev.questionsAnsweredCount + 10;
      const correctTotal = prev.questionsCorrectCount + attemptData.score;
      const hoursAdded = Math.max(0.25, Number((attemptData.timeSpentSeconds / 3600).toFixed(2)));
      const timeUpdate = updateStudyTimeInStats(prev, hoursAdded);

      return {
        ...prev,
        questionsAnsweredCount: answeredTotal,
        questionsCorrectCount: correctTotal,
        simuladosAttempts: newAttempts,
        ...timeUpdate
      };
    });

    // Celebratory effect if passed with 70%+
    if (attemptData.percentage >= 70) {
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 }
      });
    }
  };

  // Summaries actions
  const markSummaryAsRead = (summaryId: string) => {
    setStats(prev => {
      if (prev.readSummaryIds.includes(summaryId)) return prev;
      const newRead = [...prev.readSummaryIds, summaryId];
      const timeUpdate = updateStudyTimeInStats(prev, 0.15); // +9 minutes

      return {
        ...prev,
        readSummaryIds: newRead,
        ...timeUpdate
      };
    });
  };

  // Sprint actions
  const toggleSprintTask = (taskId: string) => {
    setStats(prev => {
      const willBeCompleted = !prev.sprintProgress[taskId];
      const updated = { ...prev.sprintProgress, [taskId]: willBeCompleted };

      if (willBeCompleted) {
        const timeUpdate = updateStudyTimeInStats(prev, 0.25); // +15 min
        return {
          ...prev,
          sprintProgress: updated,
          ...timeUpdate
        };
      }

      return {
        ...prev,
        sprintProgress: updated
      };
    });

    if (notifications.soundAlerts) {
      playAlertSound();
    }
  };

  // Daily goals
  const toggleDailyGoal = (goalId: string) => {
    let justCompleted = false;
    setDailyGoals(prev =>
      prev.map(g => {
        if (g.id === goalId) {
          justCompleted = !g.completed;
          return { ...g, completed: justCompleted };
        }
        return g;
      })
    );

    if (justCompleted) {
      setStats(prev => {
        const timeUpdate = updateStudyTimeInStats(prev, 0.25); // +15 min
        return {
          ...prev,
          ...timeUpdate
        };
      });

      setInAppNotification({
        title: '🎯 Meta Concluída!',
        body: '+15 min de estudo computados no gráfico de hoje!'
      });

      if (notifications.soundAlerts) {
        playAlertSound();
      }
    }
  };

  // Direct study session logger (e.g., from ProgressoView)
  const registerStudySession = useCallback((minutes: number = 15, label: string = 'Sessão de Estudo') => {
    const hours = Number((minutes / 60).toFixed(2));
    setStats(prev => {
      const timeUpdate = updateStudyTimeInStats(prev, hours);
      return {
        ...prev,
        ...timeUpdate
      };
    });

    setInAppNotification({
      title: `⚡ ${label} Registrada!`,
      body: `+${minutes} minutos adicionados com sucesso ao seu gráfico de hoje.`
    });

    if (notifications.soundAlerts) {
      playAlertSound();
    }
  }, [notifications.soundAlerts]);

  const addDailyGoal = (text: string, category: string = 'Meta Pessoal') => {
    if (!text.trim()) return;
    const newGoal: DailyGoalItem = {
      id: 'custom-' + Date.now(),
      text: text.trim(),
      completed: false,
      category: category.trim() || 'Meta Pessoal'
    };
    setDailyGoals(prev => {
      const updated = [...prev, newGoal];
      localStorage.setItem('nextenf_daily_goals', JSON.stringify(updated));
      return updated;
    });
    setInAppNotification({
      title: '✓ Nova Meta Adicionada!',
      body: `"${text.trim()}" foi incluída no seu checklist diário.`
    });
  };

  const editDailyGoal = (id: string, newText: string, newCategory?: string) => {
    if (!newText.trim()) return;
    setDailyGoals(prev => {
      const updated = prev.map(g => {
        if (g.id === id) {
          return {
            ...g,
            text: newText.trim(),
            category: newCategory ? newCategory.trim() : g.category
          };
        }
        return g;
      });
      localStorage.setItem('nextenf_daily_goals', JSON.stringify(updated));
      return updated;
    });
    setInAppNotification({
      title: '✏️ Meta Atualizada!',
      body: 'O texto da meta foi alterado com sucesso.'
    });
  };

  const deleteDailyGoal = (id: string) => {
    setDailyGoals(prev => {
      const updated = prev.filter(g => g.id !== id);
      localStorage.setItem('nextenf_daily_goals', JSON.stringify(updated));
      return updated;
    });
    setInAppNotification({
      title: '🗑️ Meta Removida',
      body: 'A atividade foi retirada do seu checklist diário.'
    });
  };

  const renewDailyChecklist = () => {
    const today = getTodayDateKey();
    setDailyGoals(prev => {
      const renewed = prev.map(g => ({ ...g, completed: false }));
      localStorage.setItem('nextenf_daily_goals', JSON.stringify(renewed));
      localStorage.setItem('nextenf_daily_goals_date', today);
      return renewed;
    });
    setDailyGoalsDate(today);
    setInAppNotification({
      title: '🔄 Checklist Diário Renovado!',
      body: 'Metas reinicializadas com sucesso para o seu novo ciclo de estudos de hoje.'
    });
    if (notifications.soundAlerts) {
      playAlertSound();
    }
  };

  // Notifications
  const updateNotificationSettings = (settings: Partial<NotificationSettings>) => {
    setNotifications(prev => ({ ...prev, ...settings }));
  };

  const requestBrowserNotificationPermission = async (): Promise<boolean> => {
    if (!('Notification' in window)) {
      return false;
    }
    try {
      const permission = await Notification.requestPermission();
      const granted = permission === 'granted';
      updateNotificationSettings({ browserNotificationsEnabled: granted });
      return granted;
    } catch {
      return false;
    }
  };

  const toggleScheduledReminder = (id: string) => {
    setNotifications(prev => {
      const current = prev.scheduledReminders || DEFAULT_SCHEDULED_REMINDERS;
      const updated = current.map(r => (r.id === id ? { ...r, enabled: !r.enabled } : r));
      return {
        ...prev,
        scheduledReminders: updated
      };
    });
  };

  const updateScheduledReminderTime = (id: string, time: string) => {
    setNotifications(prev => {
      const current = prev.scheduledReminders || DEFAULT_SCHEDULED_REMINDERS;
      const updated = current.map(r => (r.id === id ? { ...r, time } : r));
      return {
        ...prev,
        scheduledReminders: updated
      };
    });
  };

  const addScheduledReminder = (reminder: Omit<ScheduledReminder, 'id'>) => {
    const newRem: ScheduledReminder = {
      ...reminder,
      id: 'rem_' + Date.now()
    };
    setNotifications(prev => ({
      ...prev,
      scheduledReminders: [...(prev.scheduledReminders || DEFAULT_SCHEDULED_REMINDERS), newRem]
    }));
  };

  const deleteScheduledReminder = (id: string) => {
    setNotifications(prev => ({
      ...prev,
      scheduledReminders: (prev.scheduledReminders || DEFAULT_SCHEDULED_REMINDERS).filter(r => r.id !== id)
    }));
  };

  const triggerScheduledReminderNotification = (reminder: ScheduledReminder) => {
    if (notifications.soundAlerts) {
      playAlertSound();
    }

    if (
      typeof window !== 'undefined' &&
      'Notification' in window &&
      Notification.permission === 'granted'
    ) {
      try {
        const notif = new Notification(reminder.title, {
          body: reminder.message,
          icon: '/favicon.ico',
          badge: '/favicon.ico',
          tag: reminder.id
        });
        notif.onclick = () => {
          window.focus();
        };
      } catch {
        setInAppNotification({
          title: reminder.title,
          body: reminder.message
        });
      }
    } else {
      setInAppNotification({
        title: reminder.title,
        body: reminder.message
      });
    }
  };

  // Active Background Notification Scheduler Loop
  const firedRemindersRef = useRef<Record<string, string>>({});

  useEffect(() => {
    const checkScheduledReminders = () => {
      const now = new Date();
      const currentHours = String(now.getHours()).padStart(2, '0');
      const currentMinutes = String(now.getMinutes()).padStart(2, '0');
      const currentTimeString = `${currentHours}:${currentMinutes}`;
      const todayDateKey = `${now.getFullYear()}-${now.getMonth() + 1}-${now.getDate()}`;

      const reminders = notifications.scheduledReminders || DEFAULT_SCHEDULED_REMINDERS;
      reminders.forEach(reminder => {
        if (!reminder.enabled) return;

        if (reminder.time === currentTimeString) {
          const firedKey = `${reminder.id}_${todayDateKey}_${currentTimeString}`;
          if (firedRemindersRef.current[firedKey]) {
            return;
          }
          firedRemindersRef.current[firedKey] = 'fired';
          triggerScheduledReminderNotification(reminder);
        }
      });
    };

    checkScheduledReminders();
    const interval = setInterval(checkScheduledReminders, 12000);
    return () => clearInterval(interval);
  }, [notifications.scheduledReminders, notifications.browserNotificationsEnabled, notifications.soundAlerts]);

  const sendTestNotification = () => {
    const title = '🔔 Lembrete NEXTENF';
    const body = 'Hora da sua meta diária de estudos! Resolva 10 questões e revise seus flashcards.';

    if (notifications.soundAlerts) {
      playAlertSound();
    }

    if ('Notification' in window && Notification.permission === 'granted') {
      try {
        new Notification(title, {
          body,
          icon: '/favicon.ico',
          badge: '/favicon.ico'
        });
      } catch {
        // Fallback to in-app notification if browser denies
        setInAppNotification({ title, body });
      }
    } else {
      // In-app banner
      setInAppNotification({ title, body });
    }
  };

  const dismissInAppNotification = () => {
    setInAppNotification(null);
  };

  // Quick navigation helper
  const navigateToWithParams = (view: ViewType, params?: { category?: string; simuladoId?: number; summaryId?: string }) => {
    if (params?.category) {
      setActiveCategory(params.category as CardCategory);
    }
    if (params?.simuladoId) {
      setSelectedSimuladoId(params.simuladoId);
    }
    if (params?.summaryId) {
      setSelectedSummaryId(params.summaryId);
    }
    setCurrentView(view);
  };

  // Calculate overall progress percentage dynamically
  // 100 cards + 10 simulados (100 questions) + 5 summaries + 7 sprint days
  const overallProgressPercentage = React.useMemo(() => {
    const totalWeight = 100 + 100 + 20 + 21; // cards(100) + questions(100) + summaries(20) + sprintTasks(21)
    const cardsCompleted = Math.min(100, stats.cardsReviewedCount);
    const questionsCompleted = Math.min(100, stats.questionsAnsweredCount);
    const summariesCompleted = Math.min(20, stats.readSummaryIds.length * 4);
    const sprintTasksCompleted = Object.values(stats.sprintProgress).filter(Boolean).length;

    const totalDone = cardsCompleted + questionsCompleted + summariesCompleted + sprintTasksCompleted;
    const pct = Math.round((totalDone / totalWeight) * 100);
    return Math.min(100, Math.max(0, pct));
  }, [stats]);

  return (
    <AppContext.Provider
      value={{
        currentView,
        setCurrentView,
        user,
        login,
        registerAccount,
        logout,
        updateProfile,
        updateAvatar,
        changePassword,
        getAllStoredAccounts,
        canInstallPwa,
        isInstallModalOpen,
        setIsInstallModalOpen,
        promptPwaInstall,
        stats,
        overallProgressPercentage,
        resetAllStatsToZero,
        resetStudyTimeToZero,
        loadDemoStats,
        registerStudySession,
        addStudySeconds,
        flashcards,
        activeCategory,
        setActiveCategory,
        markCardReviewed,
        simulados,
        selectedSimuladoId,
        setSelectedSimuladoId,
        recordSimuladoAttempt,
        summaries,
        selectedSummaryId,
        setSelectedSummaryId,
        markSummaryAsRead,
        sprintDays,
        toggleSprintTask,
        dailyGoals,
        dailyGoalsDate,
        toggleDailyGoal,
        addDailyGoal,
        editDailyGoal,
        deleteDailyGoal,
        renewDailyChecklist,
        notifications,
        scheduledReminders: notifications.scheduledReminders || DEFAULT_SCHEDULED_REMINDERS,
        updateNotificationSettings,
        requestBrowserNotificationPermission,
        sendTestNotification,
        toggleScheduledReminder,
        updateScheduledReminderTime,
        addScheduledReminder,
        deleteScheduledReminder,
        triggerScheduledReminderNotification,
        inAppNotification,
        dismissInAppNotification,
        navigateToWithParams,
        sessionEntryTime,
        sessionLastExitTime,
        sessionActiveSeconds,
        isSessionTracking,
        toggleSessionTracking,
        formatDurationHHMMSS
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
