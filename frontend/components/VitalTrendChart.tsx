"use client";

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

type Props = {
  values: number[];
  color: string;
};

export default function VitalTrendChart({ values, color }: Props) {
  const data = values.map((v, i) => ({
    index: i,
    value: v,
  }));

  return (
    <ResponsiveContainer width="100%" height={120}>
      <LineChart data={data}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="index" hide />
        <YAxis domain={["auto", "auto"]} />
        <Tooltip />
        <Line
          type="monotone"
          dataKey="value"
          stroke={color}
          strokeWidth={2}
          dot={false}
        />
      </LineChart>
    </ResponsiveContainer>
  );
}
