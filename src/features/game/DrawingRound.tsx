import { useEffect, useRef } from 'react';
import { audiences } from '../../data/prompts/prompts';
import type { Audience, Prompt } from '../../data/prompts/types';
import { PromptIllustration } from './PromptIllustration';

interface DrawingRoundProps {
  audience: Audience;
  prompt: Prompt;
  remainingSeconds: number | null;
  canReadAloud: boolean;
  onSkip: () => void;
  onDone: () => void;
  onRead: () => void;
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
  onSkip,
  onDone,
  onRead,
  onSettings,
  onChangeMode,
}: DrawingRoundProps) {
  const headingRef = useRef<HTMLHeadingElement>(null);
  const isChild = audience === 'children';

  useEffect(() => {
    headingRef.current?.focus();
  }, [prompt.id]);

  return (
    <section
      className={`page drawing-page${isChild ? ' drawing-page--children' : ''}`}
      aria-labelledby="prompt-title"
    >
      <header className="round-header">
        <button className="back-link" type="button" onClick={onChangeMode}>
          {isChild ? '← Terug' : '← Andere verzameling'}
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
          className={`prompt-art prompt-art--${prompt.category}`}
          role="img"
          aria-label={prompt.description}
        >
          <PromptIllustration shape={prompt.shape} />
        </div>
        {!isChild ? <p className="eyebrow">Tekenimpuls</p> : null}
        <h1 id="prompt-title" tabIndex={-1} ref={headingRef}>
          {prompt.title}
        </h1>
        <p className="invitation">{prompt.invitation}</p>
      </div>
      <div className="drawing-actions">
        <button className="secondary-button" type="button" onClick={onSkip}>
          {isChild ? 'Andere' : 'Andere impuls'}
        </button>
        {canReadAloud ? (
          <button className="secondary-button" type="button" onClick={onRead}>
            Lees voor
          </button>
        ) : null}
        <button className="primary-button" type="button" onClick={onDone}>
          {isChild ? 'Klaar' : 'Ik ben klaar'}
        </button>
      </div>
      <p className="quiet-note">{isChild ? 'Neem de tijd.' : 'Neem de tijd die voor jou goed voelt.'}</p>
    </section>
  );
}
