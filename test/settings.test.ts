import assert from 'node:assert/strict';
import test from 'node:test';
import {
  createDefaultSettings,
  loadSettings,
  PROMPT_CATALOG_VERSION,
} from '../src/features/settings/storage';

test('upgrades legacy category defaults to the full catalog', () => {
  globalThis.localStorage = {
    store: {
      'tekenmoment-settings': JSON.stringify({
        readAloud: false,
        soundEnabled: false,
        reducedAnimation: false,
        timerMinutes: 0,
        categories: {
          children: ['dieren', 'lucht', 'natuur'],
          adults: ['landschap', 'natuur', 'thuis'],
        },
      }),
    },
    getItem(key: string) {
      return this.store[key] ?? null;
    },
    setItem(key: string, value: string) {
      this.store[key] = value;
    },
    removeItem(key: string) {
      delete this.store[key];
    },
    clear() {
      this.store = {};
    },
    key() {
      return null;
    },
    get length() {
      return Object.keys(this.store).length;
    },
  } as Storage;

  const settings = loadSettings();
  const defaults = createDefaultSettings();

  assert.equal(settings.catalogVersion, PROMPT_CATALOG_VERSION);
  assert.deepEqual(settings.categories.children.sort(), defaults.categories.children.sort());
  assert.deepEqual(settings.categories.adults.sort(), defaults.categories.adults.sort());
});
