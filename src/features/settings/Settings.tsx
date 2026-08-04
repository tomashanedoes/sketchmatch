import { useEffect, useRef, type FormEvent } from 'react';
import { audiences, getCategories } from '../../data/prompts/prompts';
import type { AppSettings, Audience } from '../../data/prompts/types';

interface SettingsProps {
  settings: AppSettings;
  audience: Audience | null;
  onSave: (settings: AppSettings) => void;
  onReset: () => void;
  onBack: () => void;
}

export function Settings({ settings, audience, onSave, onReset, onBack }: SettingsProps) {
  const headingRef = useRef<HTMLHeadingElement>(null);
  const mode: Audience = audience ?? 'children';
  const categories = getCategories(mode);

  useEffect(() => {
    headingRef.current?.focus();
  }, []);

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const selectedCategories = formData.getAll('category').map(String);
    const timerValue = Number(formData.get('timerMinutes') ?? settings.timerMinutes);

    onSave({
      ...settings,
      readAloud: formData.has('readAloud'),
      soundEnabled: formData.has('soundEnabled'),
      reducedAnimation: formData.has('reducedAnimation'),
      timerMinutes: Number.isFinite(timerValue) ? timerValue : 0,
      categories: {
        ...settings.categories,
        [mode]: selectedCategories.length ? selectedCategories : getCategories(mode),
      },
    });
  }

  return (
    <section className="page settings-page" aria-labelledby="settings-title">
      <button className="back-link" type="button" onClick={onBack}>
        ← Terug
      </button>
      <p className="eyebrow">Eigen voorkeuren</p>
      <h1 id="settings-title" tabIndex={-1} ref={headingRef}>
        Instellingen
      </h1>
      <form className="settings-form" onSubmit={handleSubmit}>
        <label className="setting-row">
          <span>
            <strong>Voorleesknop</strong>
            <small>Alleen als je dat zelf wilt. Standaard uit.</small>
          </span>
          <input type="checkbox" name="readAloud" defaultChecked={settings.readAloud} />
        </label>
        <label className="setting-row">
          <span>
            <strong>Zachte geluiden</strong>
            <small>Een kort geluid bij klaar of timer-einde.</small>
          </span>
          <input type="checkbox" name="soundEnabled" defaultChecked={settings.soundEnabled} />
        </label>
        <label className="setting-row">
          <span>
            <strong>Rustige beweging</strong>
            <small>Verminder kleine bewegingen in de vormgeving.</small>
          </span>
          <input
            type="checkbox"
            name="reducedAnimation"
            defaultChecked={settings.reducedAnimation}
          />
        </label>
        <label className="setting-row">
          <span>
            <strong>Standaard soft-timer</strong>
            <small>Alleen voor volwassenen; 0 is vrij spelen.</small>
          </span>
          <select name="timerMinutes" defaultValue={String(settings.timerMinutes)}>
            <option value="0">Vrij spelen</option>
            <option value="10">10 minuten</option>
            <option value="20">20 minuten</option>
          </select>
        </label>
        <fieldset>
          <legend>Verzamelingen voor {audiences[mode].label.toLowerCase()}</legend>
          <p className="field-help">Kies de onderwerpen die je graag terugziet.</p>
          <div className="category-list">
            {categories.map((category) => (
              <label className="category-option" key={category}>
                <input
                  type="checkbox"
                  name="category"
                  value={category}
                  defaultChecked={settings.categories[mode].includes(category)}
                />
                <span>{category}</span>
              </label>
            ))}
          </div>
        </fieldset>
        <button className="primary-button" type="submit">
          Voorkeuren bewaren
        </button>
      </form>
      <button className="text-button" type="button" onClick={onReset}>
        Herstel standaardinstellingen
      </button>
    </section>
  );
}
