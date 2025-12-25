import { useEffect, useRef, useState } from "react";
import { VitalMap, TrendMap, VitalMessage } from "../types/vitals";

/* ===================== CONFIG ===================== */
const WS_URL =
  process.env.NEXT_PUBLIC_WS_URL || "ws://localhost:8000/ws/vitals";

/* ===================== HOOK ===================== */
export function useVitalsStream() {
  const wsRef = useRef<WebSocket | null>(null);

  const [latestVitals, setLatestVitals] = useState<VitalMap>({});
  const [trends, setTrends] = useState<TrendMap>({});

  useEffect(() => {
    const ws = new WebSocket(WS_URL);
    wsRef.current = ws;

    ws.onmessage = (event) => {
      const msg: VitalMessage = JSON.parse(event.data);

      setLatestVitals((prev) => ({
        ...prev,
        [msg.vital_code]: msg,
      }));

      setTrends((prev) => {
        const arr = prev[msg.vital_code] || [];
        return {
          ...prev,
          [msg.vital_code]: [...arr, msg.value].slice(-60),
        };
      });
    };

    ws.onerror = () => {
      console.error("Vitals WebSocket error");
    };

    ws.onclose = () => {
      console.warn("Vitals WebSocket closed");
    };

    return () => ws.close();
  }, []);

  return {
    latestVitals,
    trends,
  };
}
