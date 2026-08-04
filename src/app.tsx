import { useEffect, useMemo, useState } from 'react';
import { audiences } from './data/prompts/prompts';
import type { AppSettings, Audience, Prompt, Screen, SessionStats } from './data/prompts/types';
import { DrawingRound } from './features/game/DrawingRound';
import { ModeChoice } from './features/game/ModeChoice';
import { SessionResult } from './features/game/SessionResult';
import { SessionSetup } from './features/game/SessionSetup';
import {
  completePrompt,
  createSessionStats,
  isTimerFinished,
  pickNextPrompt,
  remainingTimerSeconds,
  skipPrompt,
} from './features/game/session';
import { playSoftDoneSound, playSoftTimerSound } from './features/game/sound';
import { Welcome } from './features/game/Welcome';
import { Settings } from './features/settings/Settings';
import {
  createDefaultSettings,
  loadAudience,
  loadSettings,
  resetLocalData,
  saveAudience,
  saveSettings,
} from './features/settings/storage';

export function App() {
  const [settings, setSettings] = useState<AppSettings>(() => loadSettings());
  const [audience, setAudience] = useState<Audience | null>(() => loadAudience());
  const [screen, setScreen] = useState<Screen>('welcome');
  const [previousScreen, setPreviousScreen] = useState<Screen>('welcome');
  const [prompt, setPrompt] = useState<Prompt | null>(null);
  const [seen, setSeen] = useState<string[]>([]);
  const [stats, setStats] = useState<SessionStats>(() => createSessionStats());
  const [sessionTimerMinutes, setSessionTimerMinutes] = useState(0);
  const [remainingSeconds, setRemainingSeconds] = useState<number | null>(null);

  useEffect(() => {
    saveSettings(settings);
  }, [settings]);

  useEffect(() => {
    if (!stats.timerEndsAt || screen !== 'round') {
      setRemainingSeconds(null);
      return;
    }

    const tick = () => {
      const remaining = remainingTimerSeconds(stats);
      setRemainingSeconds(remaining);
      if (isTimerFinished(stats)) {
        if (settings.soundEnabled) playSoftTimerSound();
        setScreen('result');
      }
    };

    tick();
    const id = window.setInterval(tick, 1000);
    return () => window.clearInterval(id);
  }, [stats, screen, settings.soundEnabled]);

  const canReadAloud = settings.readAloud && typeof window !== 'undefined' && 'speechSynthesis' in window;
  const lastAudienceLabel = useMemo(
    () => (audience ? audiences[audience].label : null),
    [audience],
  );

  function openSettings() {
    setPreviousScreen(screen);
    setScreen('settings');
  }

  function startFreshSession(nextAudience: Audience, timerMinutes: number) {
    const nextStats = createSessionStats(timerMinutes);
    const nextPrompt = pickNextPrompt(nextAudience, [], settings.categories[nextAudience]);
    setAudience(nextAudience);
    saveAudience(nextAudience);
    setSeen([nextPrompt.id]);
    setPrompt(nextPrompt);
    setStats(nextStats);
    setSessionTimerMinutes(timerMinutes);
    setScreen('round');
  }

  function handleChooseAudience(nextAudience: Audience) {
    if (nextAudience === 'adults') {
      setAudience(nextAudience);
      saveAudience(nextAudience);
      setSessionTimerMinutes(settings.timerMinutes);
      setScreen('session-setup');
      return;
    }
    startFreshSession(nextAudience, 0);
  }

  function handleContinue() {
    if (!audience) {
      setScreen('mode');
      return;
    }
    if (audience === 'adults') {
      setSessionTimerMinutes(settings.timerMinutes);
      setScreen('session-setup');
      return;
    }
    startFreshSession(audience, 0);
  }

  function showNextPrompt(mark: 'complete' | 'skip' | 'none' = 'none') {
    if (!audience) return;

    let nextStats = stats;
    if (mark === 'complete') nextStats = completePrompt(stats);
    if (mark === 'skip') nextStats = skipPrompt(stats);
    setStats(nextStats);

    if (isTimerFinished(nextStats)) {
      setScreen('result');
      return;
    }

    const nextPrompt = pickNextPrompt(audience, seen, settings.categories[audience]);
    setSeen((current) => (current.includes(nextPrompt.id) ? current : [...current, nextPrompt.id]));
    setPrompt(nextPrompt);
    setScreen('round');
  }

  function handleDone() {
    if (settings.soundEnabled) playSoftDoneSound();
    const nextStats = completePrompt(stats);
    setStats(nextStats);
    setScreen('result');
  }

  function handleSkip() {
    showNextPrompt('skip');
  }

  function handleRead() {
    if (!prompt || !canReadAloud) return;
    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(`${prompt.title}. ${prompt.invitation}`);
    utterance.lang = 'nl-NL';
    window.speechSynthesis.speak(utterance);
  }

  function handleSaveSettings(next: AppSettings) {
    setSettings(next);
    setSeen([]);
    setScreen(previousScreen === 'round' && prompt ? 'round' : 'welcome');
  }

  function handleResetSettings() {
    resetLocalData();
    const defaults = createDefaultSettings();
    setSettings(defaults);
    setAudience(null);
    saveSettings(defaults);
  }

  if (screen === 'welcome') {
    return (
      <Welcome
        lastAudienceLabel={lastAudienceLabel}
        onStart={() => setScreen('mode')}
        onContinue={handleContinue}
        onSettings={openSettings}
      />
    );
  }

  if (screen === 'mode') {
    return <ModeChoice onBack={() => setScreen('welcome')} onChoose={handleChooseAudience} />;
  }

  if (screen === 'session-setup' && audience === 'adults') {
    return (
      <SessionSetup
        timerMinutes={sessionTimerMinutes}
        onChangeTimer={setSessionTimerMinutes}
        onBack={() => setScreen('mode')}
        onStart={() => startFreshSession('adults', sessionTimerMinutes)}
      />
    );
  }

  if (screen === 'round' && audience && prompt) {
    return (
      <DrawingRound
        audience={audience}
        prompt={prompt}
        remainingSeconds={remainingSeconds}
        canReadAloud={canReadAloud}
        onSkip={handleSkip}
        onDone={handleDone}
        onRead={handleRead}
        onSettings={openSettings}
        onChangeMode={() => setScreen('mode')}
      />
    );
  }

  if (screen === 'result') {
    return (
      <SessionResult
        stats={stats}
        timed={sessionTimerMinutes > 0}
        onNext={() => showNextPrompt('none')}
        onHome={() => setScreen('welcome')}
      />
    );
  }

  if (screen === 'settings') {
    return (
      <Settings
        settings={settings}
        audience={audience}
        onSave={handleSaveSettings}
        onReset={handleResetSettings}
        onBack={() => setScreen(previousScreen)}
      />
    );
  }

  return (
    <Welcome
      lastAudienceLabel={lastAudienceLabel}
      onStart={() => setScreen('mode')}
      onContinue={handleContinue}
      onSettings={openSettings}
    />
  );
}
