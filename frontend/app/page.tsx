"use client";

import { useEffect, useState } from "react";

import { useVitalsStream } from "../hooks/useVitalsStream";
import { generateECGSignal } from "../utils/ecgSignal";
import { generatePlethSignal } from "../utils/plethSignal";
import { getVitalStatus } from "../utils/clinicalLogic";

import VitalGrid from "../components/VitalGrid";
import ECGPanel from "../components/ECGPanel";
import PlethPanel from "../components/PlethPanel";

import { VitalMap } from "../types/vitals";

export default function Page() {
  const { latestVitals, trends } = useVitalsStream();

  const [ecgSignal, setEcgSignal] = useState<number[]>([]);
  const [plethSignal, setPlethSignal] = useState<number[]>([]);

  useEffect(() => {
    const interval = setInterval(() => {
      const hr = latestVitals["HR"]?.value ?? 75;

      const status = getVitalStatus("HR", hr);
      const amplitude =
        status === "critical"
          ? 1.15
          : status === "warning"
          ? 1.05
          : 1;

      setEcgSignal(
        generateECGSignal(hr, 300).map((v) => v * amplitude)
      );

      setPlethSignal(generatePlethSignal(hr, 300));
    }, 100);

    return () => clearInterval(interval);
  }, [latestVitals]);

  return (
    <main
      style={{
        padding: 24,
        maxWidth: 1400,
        margin: "0 auto",
      }}
    >
      <h1 style={{ color: "#ffffff", marginBottom: 20 }}>
        ICU Patient Monitoring Dashboard
      </h1>

      <VitalGrid vitals={latestVitals} trends={trends} />

      <ECGPanel
        signal={ecgSignal}
        hr={latestVitals["HR"]?.value}
      />

      <PlethPanel signal={plethSignal} />
    </main>
  );
}
