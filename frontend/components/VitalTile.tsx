import VitalTrendChart from "./VitalTrendChart";
import {
  getVitalStatus,
  statusColor,
  VitalStatus,
} from "../utils/clinicalLogic";

type Props = {
  code: string;
  label: string;
  value?: number;
  unit?: string;
  trend: number[];
};

export default function VitalTile({
  code,
  label,
  value,
  unit,
  trend,
}: Props) {
  const status: VitalStatus =
    value !== undefined
      ? getVitalStatus(code, value)
      : "normal";

  const color = statusColor(status);

  return (
    <div
      style={{
        background: "#020617",
        borderRadius: 12,
        padding: 20,
        minHeight: 210,
        borderLeft: `6px solid ${color}`,
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
      }}
    >
      {/* ---------- LABEL ---------- */}
      <div
        style={{
          fontSize: 13,
          textTransform: "uppercase",
          letterSpacing: "0.05em",
          color: "#94a3b8",
        }}
      >
        {label}
      </div>

      {/* ---------- VALUE ---------- */}
      <div
        style={{
          fontSize: 44,
          fontWeight: 600,
          color: "#ffffff",
          lineHeight: 1.1,
        }}
      >
        {value !== undefined ? value : "--"}
      </div>

      {/* ---------- UNIT ---------- */}
      <div
        style={{
          fontSize: 14,
          color: "#cbd5f5",
          marginBottom: 8,
        }}
      >
        {unit ?? ""}
      </div>

      {/* ---------- TREND ---------- */}
      {trend.length >= 5 ? (
        <VitalTrendChart values={trend} color={color} />
      ) : (
        <div
          style={{
            fontSize: 12,
            color: "#94a3b8",
          }}
        >
          Collecting trend…
        </div>
      )}
    </div>
  );
}
