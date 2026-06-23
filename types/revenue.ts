export interface RevenueSource {
  category: "SALARY" | "FREELANCE" | "INVESTMENT" | "OTHER";
  amount: number;
  percent: number;
  count: number;
}

export interface RevenueData {
  sources: RevenueSource[];
  totalAmount: number;
  dominantSource: string;
}

export interface RevenueOverview {
  currentMonth: { total: number; month: string };
  previousMonth: { total: number; month: string };
  averageLast6Months: number;
  variationPercent: number;
  trend: "UP" | "DOWN" | "STABLE";
  rolling30Days: number;
}

export interface RevenueFrequency {
  entriesPerMonth: number;
  entriesPerWeek: number;
  averageIntervalDays: number;
  stabilityStdDev: number;
  coefficientOfVariation: number;
  stabilityLabel: string;
  stabilityScore: number;
}
