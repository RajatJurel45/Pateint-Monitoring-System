/**
 * ECG Signal Generator
 * Produces a normalized ECG waveform (-1 to +1)
 * Based on a simplified P-QRS-T model
 */

export function generateECGSignal(
  heartRate: number,
  sampleCount: number
): number[] {
  const samples: number[] = [];

  // One heartbeat duration (seconds)
  const beatDuration = 60 / heartRate;

  for (let i = 0; i < sampleCount; i++) {
    const t = (i / sampleCount) * beatDuration;
    samples.push(ecgWaveform(t, beatDuration));
  }

  return samples;
}

/**
 * ECG waveform shape
 * Simplified but clinically recognizable
 */
function ecgWaveform(t: number, beatDuration: number): number {
  const p = gaussian(t, 0.1 * beatDuration, 0.025, 0.15);
  const q = gaussian(t, 0.25 * beatDuration, 0.01, -0.15);
  const r = gaussian(t, 0.3 * beatDuration, 0.01, 1.0);
  const s = gaussian(t, 0.35 * beatDuration, 0.01, -0.25);
  const tw = gaussian(t, 0.6 * beatDuration, 0.04, 0.35);

  return p + q + r + s + tw;
}

/**
 * Gaussian helper
 */
function gaussian(
  x: number,
  mu: number,
  sigma: number,
  amplitude: number
): number {
  return (
    amplitude *
    Math.exp(-Math.pow(x - mu, 2) / (2 * sigma * sigma))
  );
}
