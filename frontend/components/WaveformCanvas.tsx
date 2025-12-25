"use client";

import { useEffect, useRef } from "react";

type Props = {
  signal: number[];
  color?: string;
  height?: number;
};

export default function WaveformCanvas({
  signal,
  color = "#22c55e",
  height = 120,
}: Props) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const width = canvas.width;
    const h = canvas.height;

    ctx.clearRect(0, 0, width, h);

    ctx.strokeStyle = color;
    ctx.lineWidth = 2;
    ctx.beginPath();

    const mid = h / 2;
    const scale = h / 3;

    signal.forEach((v, i) => {
      const x = (i / (signal.length - 1)) * width;
      const y = mid - v * scale;

      if (i === 0) ctx.moveTo(x, y);
      else ctx.lineTo(x, y);
    });

    ctx.stroke();
  }, [signal, color]);

  return (
    <canvas
      ref={canvasRef}
      width={600}
      height={height}
      style={{
        width: "100%",
        height,
        background: "#020617",
        borderRadius: 6,
      }}
    />
  );
}
