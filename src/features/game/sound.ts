function playTone(frequency: number, durationMs: number, volume = 0.03): void {
  const AudioContextCtor = window.AudioContext || (window as typeof window & {
    webkitAudioContext?: typeof AudioContext;
  }).webkitAudioContext;
  if (!AudioContextCtor) return;

  const context = new AudioContextCtor();
  const oscillator = context.createOscillator();
  const gain = context.createGain();

  oscillator.type = 'sine';
  oscillator.frequency.value = frequency;
  gain.gain.value = volume;
  oscillator.connect(gain);
  gain.connect(context.destination);
  oscillator.start();
  gain.gain.exponentialRampToValueAtTime(0.0001, context.currentTime + durationMs / 1000);
  oscillator.stop(context.currentTime + durationMs / 1000);
  oscillator.onended = () => {
    void context.close();
  };
}

export function playSoftDoneSound(): void {
  playTone(392, 420);
}

export function playSoftTimerSound(): void {
  playTone(330, 650, 0.025);
}
