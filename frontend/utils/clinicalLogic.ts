/**
 * Centralized clinical decision logic
 * Used by UI, alerts, and AI layers
 */

export type VitalStatus = "normal" | "warning" | "critical";

/**
 * Determine clinical status for a given vital
 */
export function getVitalStatus(
  vitalCode: string,
  value: number
): VitalStatus {
  switch (vitalCode) {
    case "HR":
      if (value < 40 || value > 120) return "critical";
      if (value < 60 || value > 100) return "warning";
      return "normal";

    case "SPO2":
      if (value < 90) return "critical";
      if (value < 94) return "warning";
      return "normal";

    case "RR":
      if (value < 9 || value > 30) return "critical";
      if (value < 12 || value > 20) return "warning";
      return "normal";

    case "TEMP":
      if (value < 35 || value > 38.5) return "critical";
      if (value < 36.5 || value > 37.5) return "warning";
      return "normal";

    default:
      return "normal";
  }
}

/**
 * Map clinical status to UI color
 */
export function statusColor(status: VitalStatus): string {
  if (status === "critical") return "#ef4444"; // red
  if (status === "warning") return "#f59e0b"; // amber
  return "#22c55e"; // green
}
