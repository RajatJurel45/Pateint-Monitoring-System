/**
 * Plethysmography (SpO₂) Signal Generator
 * Produces a smooth pulse waveform (-1 to +1)
 */

export function generatePlethSignal(
  heartRate: number,
  sampleCount: number
): number[] {
  const samples: number[] = [];

  // One pulse cycle duration (seconds)
  const beatDuration = 60 / heartRate;

  for (let i = 0; i < sampleCount; i++) {
    const t = (i / sampleCount) * beatDuration;
    samples.push(plethWaveform(t, beatDuration));
  }

  return samples;
}

/**
 * Pleth waveform shape
 * Rounded upstroke + dicrotic notch
 */
function plethWaveform(t: number, beatDuration: number): number {
  const primary = pulseWave(t, 0.2 * beatDuration, 0.15 * beatDuration);
  const notch = pulseWave(t, 0.45 * beatDuration, 0.05 * beatDuration) * -0.3;

  return primary + notch;
}

/**
 * Smooth pulse wave (gamma-like)
 */
function pulseWave(
  x: number,
  center: number,
  width: number
): number {
  const z = (x - center) / width;
  return z > 0 ? z * Math.exp(1 - z) : 0;
}
