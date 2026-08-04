import { getCategories } from '../../data/prompts/prompts';
import type { AppSettings, Audience } from '../../data/prompts/types';

const SETTINGS_KEY = 'tekenmoment-settings';
const AUDIENCE_KEY = 'tekenmoment-audience';
const FAVORITE_KEY = 'tekenmoment-favorite';

/** Bump when new default categories are added so existing installs unlock them. */
export const PROMPT_CATALOG_VERSION = 4;

const LEGACY_DEFAULT_CATEGORIES: Record<Audience, string[]> = {
  children: ['dieren', 'lucht', 'natuur'],
  adults: ['landschap', 'natuur', 'thuis'],
};

export function createDefaultSettings(): AppSettings {
  return {
    readAloud: false,
    soundEnabled: false,
    reducedAnimation: false,
    timerMinutes: 0,
    catalogVersion: PROMPT_CATALOG_VERSION,
    categories: {
      children: getCategories('children'),
      adults: getCategories('adults'),
    },
  };
}

function resolveCategories(
  audience: Audience,
  stored: string[] | undefined,
  defaults: string[],
  catalogVersion: number | undefined,
): string[] {
  if (!stored?.length) return defaults;

  const legacy = LEGACY_DEFAULT_CATEGORIES[audience];
  const matchesLegacyDefault =
    stored.length === legacy.length && legacy.every((category) => stored.includes(category));

  if (matchesLegacyDefault || !catalogVersion || catalogVersion < PROMPT_CATALOG_VERSION) {
    return [...new Set([...stored, ...defaults])];
  }

  return stored.filter((category) => defaults.includes(category));
}

export function loadSettings(): AppSettings {
  const defaults = createDefaultSettings();
  try {
    const stored = JSON.parse(localStorage.getItem(SETTINGS_KEY) ?? 'null') as
      | (Partial<AppSettings> & { catalogVersion?: number })
      | null;
    if (!stored) return defaults;

    // Favorieten worden niet meer gebruikt; ruim oude sleutels op.
    localStorage.removeItem(FAVORITE_KEY);

    const next: AppSettings = {
      ...defaults,
      ...stored,
      readAloud: stored.readAloud ?? false,
      catalogVersion: PROMPT_CATALOG_VERSION,
      categories: {
        children: resolveCategories(
          'children',
          stored.categories?.children,
          defaults.categories.children,
          stored.catalogVersion,
        ),
        adults: resolveCategories(
          'adults',
          stored.categories?.adults,
          defaults.categories.adults,
          stored.catalogVersion,
        ),
      },
    };

    saveSettings(next);
    return next;
  } catch {
    return defaults;
  }
}

export function saveSettings(settings: AppSettings): void {
  localStorage.setItem(
    SETTINGS_KEY,
    JSON.stringify({ ...settings, catalogVersion: PROMPT_CATALOG_VERSION }),
  );
  document.documentElement.classList.toggle('reduce-animation', settings.reducedAnimation);
}

export function loadAudience(): Audience | null {
  const value = localStorage.getItem(AUDIENCE_KEY);
  return value === 'children' || value === 'adults' ? value : null;
}

export function saveAudience(audience: Audience): void {
  localStorage.setItem(AUDIENCE_KEY, audience);
}

export function resetLocalData(): void {
  localStorage.removeItem(SETTINGS_KEY);
  localStorage.removeItem(AUDIENCE_KEY);
  localStorage.removeItem(FAVORITE_KEY);
}
