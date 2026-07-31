import { useEffect, useRef } from 'react';
import type { SessionStats } from '../../data/prompts/types';
import { formatDuration } from './session';

interface SessionResultProps {
  stats: SessionStats;
  timed: boolean;
  onNext: () => void;
  onHome: () => void;
}

export function SessionResult({ stats, timed, onNext, onHome }: SessionResultProps) {
  const headingRef = useRef<HTMLHeadingElement>(null);
  const elapsed = Date.now() - stats.startedAt;

  useEffect(() => {
    headingRef.current?.focus();
  }, []);

  return (
    <section className="welcome" aria-labelledby="done-title">
      <p className="eyebrow">Mooi zo</p>
      <div className="completion-mark" aria-hidden="true">
        ❋
      </div>
      <h1 id="done-title" tabIndex={-1} ref={headingRef}>
        Je tekening
        <br />
        mag er zijn.
      </h1>
      <p className="intro">
        Leg je potlood even neer en kijk naar wat er op het papier is ontstaan.
      </p>
      <ul className="session-summary" aria-label="Overzicht van dit moment">
        <li>
          <strong>{stats.completed}</strong>
          <span>afgeronde impulsen</span>
        </li>
        <li>
          <strong>{stats.skipped}</strong>
          <span>overgeslagen impulsen</span>
        </li>
        <li>
          <strong>{formatDuration(elapsed)}</strong>
          <span>{timed ? 'in dit tekenblokje' : 'in dit moment'}</span>
        </li>
      </ul>
      <p className="quiet-note">Dit is geen score, alleen een terugblik op wat je deed.</p>
      <button className="primary-button" type="button" onClick={onNext}>
        Nog een tekenimpuls
      </button>
      <button className="text-button" type="button" onClick={onHome}>
        Voor nu afronden
      </button>
    </section>
  );
}
