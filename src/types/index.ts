export type ViewType =
  | 'inicio'
  | 'cards'
  | 'questoes'
  | 'resumos'
  | 'checklist'
  | 'progresso'
  | 'foco'
  | 'sprint'
  | 'configuracoes'
  | 'suporte';

export interface UserProfile {
  id: string;
  name: string;
  email: string;
  targetExam: string;
  avatarUrl?: string;
  createdAt: string;
}

export type CardCategory =
  | 'Fundamentos de Enfermagem'
  | 'Farmacologia & Cálculos'
  | 'Urgência & Emergência'
  | 'SUS & Legislação'
  | 'Biossegurança & Infecção'
  | 'Saúde da Mulher & Criança'
  | 'Médico-Cirúrgica'
  | 'Saúde Coletiva & Vacinas';

export interface Flashcard {
  id: number;
  category: CardCategory;
  question: string;
  answer: string;
  keyMnemonic?: string;
  explanation: string;
  status: 'new' | 'learning' | 'mastered';
  lastReviewed?: string;
}

export type QuestionDifficulty = 'facil' | 'media' | 'dificil';

export interface Question {
  id: number;
  simuladoId: number;
  difficulty: QuestionDifficulty;
  subject: CardCategory;
  statement: string;
  options: {
    letter: 'A' | 'B' | 'C' | 'D' | 'E';
    text: string;
  }[];
  correctAnswer: 'A' | 'B' | 'C' | 'D' | 'E';
  explanation: string;
  examOrigin?: string;
}

export interface Simulado {
  id: number;
  title: string;
  description: string;
  focusArea: string;
  timeLimitMinutes: number;
  questions: Question[]; // Exactly 10 questions: 2 fáceis, 3 médias, 5 difíceis
}

export interface SimuladoAttempt {
  id: string;
  simuladoId: number;
  simuladoTitle: string;
  date: string;
  score: number; // 0-10
  percentage: number;
  answers: Record<number, 'A' | 'B' | 'C' | 'D' | 'E'>;
  timeSpentSeconds: number;
}

export interface StudySummary {
  id: string;
  title: string;
  category: CardCategory;
  readTime: string;
  summary: string;
  content: {
    introduction: string;
    points: {
      subtitle: string;
      details: string[];
      tip?: string;
    }[];
    tableData?: {
      headers: string[];
      rows: string[][];
    };
    goldenRule: string;
  };
  isRead: boolean;
}

export interface SprintTask {
  id: string;
  title: string;
  description: string;
  actionView: ViewType;
  actionParams?: {
    category?: string;
    simuladoId?: number;
    summaryId?: string;
  };
  completed: boolean;
}

export interface SprintDay {
  dayNumber: number;
  dayTitle: string;
  theme: string;
  focusBadge: string;
  description: string;
  targetCards: number;
  tasks: SprintTask[];
  completed: boolean;
}

export interface DailyGoalItem {
  id: string;
  text: string;
  completed: boolean;
  category: string;
}

export interface ScheduledReminder {
  id: string;
  title: string;
  message: string;
  time: string; // 'HH:mm'
  enabled: boolean;
  category?: string;
}

export interface NotificationSettings {
  browserNotificationsEnabled: boolean;
  morningReminder: boolean;
  morningTime: string;
  afternoonReminder: boolean;
  afternoonTime: string;
  nightReminder: boolean;
  nightTime: string;
  soundAlerts: boolean;
  streakAlerts: boolean;
  scheduledReminders?: ScheduledReminder[];
}

export interface UserStats {
  cardsReviewedCount: number; // e.g. 0 initially
  questionsAnsweredCount: number; // e.g. 0 initially
  questionsCorrectCount: number;
  consecutiveDays: number; // 0 initially
  studyTimeHours: number; // 0 initially
  lastStudyDate?: string;
  simuladosAttempts: SimuladoAttempt[];
  reviewedCardIds: number[];
  masteredCardIds: number[];
  readSummaryIds: string[];
  completedDailyTasks: string[];
  sprintProgress: Record<string, boolean>; // taskId -> completed
  dailyStudyHistory?: Record<string, number>; // 'YYYY-MM-DD' -> hours studied
}
