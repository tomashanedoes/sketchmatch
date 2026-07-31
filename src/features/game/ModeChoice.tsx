import { useEffect, useRef } from 'react';
import { audiences } from '../../data/prompts/prompts';
import type { Audience } from '../../data/prompts/types';

interface ModeChoiceProps {
  onBack: () => void;
  onChoose: (audience: Audience) => void;
}

export function ModeChoice({ onBack, onChoose }: ModeChoiceProps) {
  const headingRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    headingRef.current?.focus();
  }, []);

  return (
    <section className="page" aria-labelledby="choose-title">
      <button className="back-link" type="button" onClick={onBack}>
        ← Terug
      </button>
      <p className="eyebrow">Kies een verzameling</p>
      <h1 id="choose-title" tabIndex={-1} ref={headingRef}>
        Voor wie is dit tekenmoment?
      </h1>
      <div className="audience-grid">
        {(Object.keys(audiences) as Audience[]).map((key) => {
          const audience = audiences[key];
          return (
            <button
              key={key}
              className={`audience-card audience-card--${key}`}
              type="button"
              onClick={() => onChoose(key)}
            >
              <span className="card-mark" aria-hidden="true">
                {key === 'children' ? '✦' : '◒'}
              </span>
              <span className="eyebrow">{audience.eyebrow}</span>
              <strong>{audience.label}</strong>
              <span>{audience.description}</span>
              <span className="card-arrow" aria-hidden="true">
                →
              </span>
            </button>
          );
        })}
      </div>
    </section>
  );
}
