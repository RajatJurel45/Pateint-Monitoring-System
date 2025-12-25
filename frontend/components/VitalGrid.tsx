import VitalTile from "./VitalTile";
import { VitalMap, TrendMap } from "../types/vitals";

type Props = {
  vitals: VitalMap;
  trends: TrendMap;
};

export default function VitalGrid({ vitals, trends }: Props) {
  return (
    <section
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
        gap: 18,
        marginBottom: 32,
      }}
    >
      <VitalTile
        code="HR"
        label="Heart Rate"
        value={vitals["HR"]?.value}
        unit={vitals["HR"]?.unit}
        trend={trends["HR"] || []}
      />

      <VitalTile
        code="SPO2"
        label="SpO₂"
        value={vitals["SPO2"]?.value}
        unit={vitals["SPO2"]?.unit}
        trend={trends["SPO2"] || []}
      />

      <VitalTile
        code="RR"
        label="Respiratory Rate"
        value={vitals["RR"]?.value}
        unit={vitals["RR"]?.unit}
        trend={trends["RR"] || []}
      />

      <VitalTile
        code="TEMP"
        label="Temperature"
        value={vitals["TEMP"]?.value}
        unit={vitals["TEMP"]?.unit}
        trend={trends["TEMP"] || []}
      />
    </section>
  );
}
