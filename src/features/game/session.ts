import { getPrompt, getPromptById } from '../../data/prompts/prompts';
import type { Audience, Prompt, SessionStats } from '../../data/prompts/types';

export function createSessionStats(timerMinutes = 0): SessionStats {
  const startedAt = Date.now();
  return {
    completed: 0,
    skipped: 0,
    startedAt,
    timerEndsAt: timerMinutes > 0 ? startedAt + timerMinutes * 60_000 : null,
  };
}

export function pickNextPrompt(
  audience: Audience,
  seenIds: string[],
  categories: string[],
): Prompt {
  return getPrompt(audience, seenIds, categories);
}

export function completePrompt(stats: SessionStats): SessionStats {
  return { ...stats, completed: stats.completed + 1 };
}

export function skipPrompt(stats: SessionStats): SessionStats {
  return { ...stats, skipped: stats.skipped + 1 };
}

export function isTimerFinished(stats: SessionStats, now = Date.now()): boolean {
  return stats.timerEndsAt !== null && now >= stats.timerEndsAt;
}

export function remainingTimerSeconds(stats: SessionStats, now = Date.now()): number | null {
  if (stats.timerEndsAt === null) return null;
  return Math.max(0, Math.ceil((stats.timerEndsAt - now) / 1000));
}

export function repeatPrompt(id: string): Prompt | undefined {
  return getPromptById(id);
}

export function formatDuration(ms: number): string {
  const totalSeconds = Math.max(0, Math.floor(ms / 1000));
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;
  if (minutes === 0) return `${seconds} seconden`;
  if (seconds === 0) return `${minutes} minuten`;
  return `${minutes} minuten en ${seconds} seconden`;
}
