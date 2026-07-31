export type Audience = 'children' | 'adults';

export type Difficulty = 'zacht' | 'verdiepend';

export interface Prompt {
  id: string;
  audience: Audience;
  title: string;
  invitation: string;
  shape: string;
  category: string;
  difficulty: Difficulty;
  description: string;
  active: boolean;
}

export interface AudienceInfo {
  label: string;
  eyebrow: string;
  description: string;
}

export interface AppSettings {
  readAloud: boolean;
  soundEnabled: boolean;
  reducedAnimation: boolean;
  /** Soft adult timer in minutes; 0 means free play. */
  timerMinutes: number;
  /** Used to unlock newly added prompt categories on existing installs. */
  catalogVersion: number;
  categories: Record<Audience, string[]>;
}

export interface SessionStats {
  completed: number;
  skipped: number;
  startedAt: number;
  timerEndsAt: number | null;
}

export type Screen =
  | 'welcome'
  | 'mode'
  | 'session-setup'
  | 'round'
  | 'result'
  | 'settings';
