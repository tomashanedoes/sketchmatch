import { useEffect, useRef } from 'react';

interface WelcomeProps {
  lastAudienceLabel: string | null;
  onStart: () => void;
  onContinue: () => void;
  onSettings: () => void;
}

export function Welcome({ lastAudienceLabel, onStart, onContinue, onSettings }: WelcomeProps) {
  const headingRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    headingRef.current?.focus();
  }, []);

  return (
    <section className="welcome" aria-labelledby="welcome-title">
      <p className="eyebrow">Een klein tekenmoment</p>
      <h1 id="welcome-title" tabIndex={-1} ref={headingRef}>
        Van kijken
        <br />
        naar tekenen.
      </h1>
      <p className="intro">
        Pak papier en een potlood. Kies een rustige tekenimpuls en geef de vorm alle tijd die zij nodig
        heeft.
      </p>
      <div className="paper-scribble" aria-hidden="true">
        <span />
        <span />
        <span />
      </div>
      {lastAudienceLabel ? (
        <button className="primary-button" type="button" onClick={onContinue}>
          Verder met {lastAudienceLabel.toLowerCase()}
        </button>
      ) : (
        <button className="primary-button" type="button" onClick={onStart}>
          Begin rustig
        </button>
      )}
      {lastAudienceLabel ? (
        <button className="secondary-button" type="button" onClick={onStart}>
          Andere verzameling
        </button>
      ) : null}
      <p className="quiet-note">Er is niets te winnen. Alleen iets om te maken.</p>
      <button className="text-button" type="button" onClick={onSettings}>
        Instellingen
      </button>
    </section>
  );
}
