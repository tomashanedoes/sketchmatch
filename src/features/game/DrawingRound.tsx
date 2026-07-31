import { useEffect, useRef } from 'react';
import { audiences } from '../../data/prompts/prompts';
import type { Audience, Prompt } from '../../data/prompts/types';

const icons: Record<string, string> = {
  apple: '●',
  sun: '☼',
  snail: '〰',
  leaf: '❧',
  tree: '♧',
  shell: '◌',
  vase: '⌇',
  hills: '⌒',
};

interface DrawingRoundProps {
  audience: Audience;
  prompt: Prompt;
  remainingSeconds: number | null;
  canReadAloud: boolean;
  isFavorite: boolean;
  canRepeatFavorite: boolean;
  onSkip: () => void;
  onDone: () => void;
  onRead: () => void;
  onToggleFavorite: () => void;
  onRepeatFavorite: () => void;
  onSettings: () => void;
  onChangeMode: () => void;
}

function formatClock(totalSeconds: number): string {
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;
  return `${minutes}:${seconds.toString().padStart(2, '0')}`;
}

export function DrawingRound({
  audience,
  prompt,
  remainingSeconds,
  canReadAloud,
  isFavorite,
  canRepeatFavorite,
  onSkip,
  onDone,
  onRead,
  onToggleFavorite,
  onRepeatFavorite,
  onSettings,
  onChangeMode,
}: DrawingRoundProps) {
  const headingRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    headingRef.current?.focus();
  }, [prompt.id]);

  return (
    <section className="page drawing-page" aria-labelledby="prompt-title">
      <header className="round-header">
        <button className="back-link" type="button" onClick={onChangeMode}>
          ← Andere verzameling
        </button>
        <div className="round-tools">
          <p>{audiences[audience].label}</p>
          {remainingSeconds !== null ? (
            <p className="timer-chip" aria-live="polite">
              {formatClock(remainingSeconds)}
            </p>
          ) : null}
          <button className="icon-button" type="button" onClick={onSettings} aria-label="Instellingen">
            ⚙
          </button>
        </div>
      </header>
      <div className="prompt-card">
        <div
          className={`prompt-art prompt-art--${prompt.shape}`}
          role="img"
          aria-label={prompt.description}
        >
          <span className={`prompt-symbol prompt-symbol--${prompt.shape}`} aria-hidden="true">
            {icons[prompt.shape] ?? '○'}
          </span>
        </div>
        <p className="eyebrow">Tekenimpuls</p>
        <h1 id="prompt-title" tabIndex={-1} ref={headingRef}>
          {prompt.title}
        </h1>
        <p className="invitation">{prompt.invitation}</p>
      </div>
      <div className="drawing-actions">
        <button className="secondary-button" type="button" onClick={onSkip}>
          Andere impuls
        </button>
        {canReadAloud ? (
          <button className="secondary-button" type="button" onClick={onRead}>
            Lees voor
          </button>
        ) : null}
        <button className="secondary-button" type="button" onClick={onToggleFavorite}>
          {isFavorite ? 'Favoriet bewaard' : 'Bewaar favoriet'}
        </button>
        {canRepeatFavorite ? (
          <button className="secondary-button" type="button" onClick={onRepeatFavorite}>
            Favoriet opnieuw
          </button>
        ) : null}
        <button className="primary-button" type="button" onClick={onDone}>
          Ik ben klaar
        </button>
      </div>
      <p className="quiet-note">Neem de tijd die voor jou goed voelt.</p>
    </section>
  );
}
