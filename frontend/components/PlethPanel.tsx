import WaveformCanvas from "./WaveformCanvas";

type Props = {
  signal: number[];
};

export default function PlethPanel({ signal }: Props) {
  return (
    <section>
      <h3 style={{ color: "#60a5fa", marginBottom: 6 }}>
        Plethysmography
      </h3>
      <WaveformCanvas signal={signal} color="#60a5fa" />
    </section>
  );
}
