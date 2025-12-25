import WaveformCanvas from "./WaveformCanvas";
import { getVitalStatus, statusColor } from "../utils/clinicalLogic";

type Props = {
  signal: number[];
  hr?: number;
};

export default function ECGPanel({ signal, hr }: Props) {
  const status = hr !== undefined ? getVitalStatus("HR", hr) : "normal";
  const color = statusColor(status);

  return (
    <section style={{ marginBottom: 24 }}>
      <h3 style={{ color, marginBottom: 6 }}>ECG</h3>
      <WaveformCanvas signal={signal} color={color} />
    </section>
  );
}
