import { useEffect, useRef } from 'react';

interface SessionSetupProps {
  timerMinutes: number;
  onChangeTimer: (minutes: number) => void;
  onStart: () => void;
  onBack: () => void;
}

const options = [
  { value: 0, label: 'Vrij spelen', help: 'Zonder tijdsindicatie, in je eigen tempo.' },
  { value: 10, label: '10 minuten', help: 'Een zacht tekenblokje; geen race.' },
  { value: 20, label: '20 minuten', help: 'Een langer moment om te kijken en tekenen.' },
];

export function SessionSetup({ timerMinutes, onChangeTimer, onStart, onBack }: SessionSetupProps) {
  const headingRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    headingRef.current?.focus();
  }, []);

  return (
    <section className="page" aria-labelledby="setup-title">
      <button className="back-link" type="button" onClick={onBack}>
        ← Terug
      </button>
      <p className="eyebrow">Volwassenen</p>
      <h1 id="setup-title" tabIndex={-1} ref={headingRef}>
        Hoe wil je dit moment beginnen?
      </h1>
      <p className="intro setup-intro">
        Een timer is alleen een zachte herinnering. Er is geen score en niets hoeft af.
      </p>
      <div className="timer-options" role="radiogroup" aria-label="Sessieduur">
        {options.map((option) => (
          <label key={option.value} className={`timer-option${timerMinutes === option.value ? ' is-selected' : ''}`}>
            <input
              type="radio"
              name="timer"
              value={option.value}
              checked={timerMinutes === option.value}
              onChange={() => onChangeTimer(option.value)}
            />
            <strong>{option.label}</strong>
            <span>{option.help}</span>
          </label>
        ))}
      </div>
      <button className="primary-button" type="button" onClick={onStart}>
        Start SketchMatch
      </button>
    </section>
  );
}
