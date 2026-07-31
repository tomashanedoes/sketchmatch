import { getCategories } from '../../data/prompts/prompts';
import type { AppSettings, Audience } from '../../data/prompts/types';

const SETTINGS_KEY = 'tekenmoment-settings';
const AUDIENCE_KEY = 'tekenmoment-audience';
const FAVORITE_KEY = 'tekenmoment-favorite';

export function createDefaultSettings(): AppSettings {
  return {
    readAloud: false,
    soundEnabled: false,
    reducedAnimation: false,
    timerMinutes: 0,
    categories: {
      children: getCategories('children'),
      adults: getCategories('adults'),
    },
  };
}

export function loadSettings(): AppSettings {
  const defaults = createDefaultSettings();
  try {
    const stored = JSON.parse(localStorage.getItem(SETTINGS_KEY) ?? 'null') as Partial<AppSettings> | null;
    if (!stored) return defaults;
    return {
      ...defaults,
      ...stored,
      categories: {
        children: stored.categories?.children?.length
          ? stored.categories.children
          : defaults.categories.children,
        adults: stored.categories?.adults?.length
          ? stored.categories.adults
          : defaults.categories.adults,
      },
    };
  } catch {
    return defaults;
  }
}

export function saveSettings(settings: AppSettings): void {
  localStorage.setItem(SETTINGS_KEY, JSON.stringify(settings));
  document.documentElement.classList.toggle('reduce-animation', settings.reducedAnimation);
}

export function loadAudience(): Audience | null {
  const value = localStorage.getItem(AUDIENCE_KEY);
  return value === 'children' || value === 'adults' ? value : null;
}

export function saveAudience(audience: Audience): void {
  localStorage.setItem(AUDIENCE_KEY, audience);
}

export function loadFavorite(): string | null {
  return localStorage.getItem(FAVORITE_KEY);
}

export function saveFavorite(id: string | null): void {
  if (!id) {
    localStorage.removeItem(FAVORITE_KEY);
    return;
  }
  localStorage.setItem(FAVORITE_KEY, id);
}

export function resetLocalData(): void {
  localStorage.removeItem(SETTINGS_KEY);
  localStorage.removeItem(AUDIENCE_KEY);
  localStorage.removeItem(FAVORITE_KEY);
}
