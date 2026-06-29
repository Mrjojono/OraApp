import { delay } from "./utils";
import { analyseMockData } from "@/constants/mockData";
import type { AnalyseMockData } from "@/constants/mockData";

export async function fetchAnalysis(monthKey: string): Promise<AnalyseMockData> {
  await delay(500);
  const data = analyseMockData.find((m) => m.monthKey === monthKey);
  if (!data) throw new Error("Mois introuvable");
  return { ...data };
}

export async function fetchAnalysisMonths(): Promise<
  { monthKey: string; label: string }[]
> {
  await delay(300);
  return analyseMockData.map((m) => ({ monthKey: m.monthKey, label: m.label }));
}
