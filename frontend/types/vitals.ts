export type VitalMessage = {
  vital_code: string;
  value: number;
  unit?: string;
};

export type VitalMap = Record<string, VitalMessage>;

export type TrendMap = Record<string, number[]>;
