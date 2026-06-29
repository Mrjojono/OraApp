import { delay } from "./utils";
import {
  mockGoals,
  mockSavingsRate,
  mockSavingsFrequency,
  mockSavingsRetention,
} from "@/constants/mockSavings";
import type { SavingGoal, SavingsRate, SavingsFrequency, SavingsRetention } from "@/constants/mockSavings";

export async function fetchGoals(): Promise<SavingGoal[]> {
  await delay(500);
  return [...mockGoals];
}

export async function fetchSavingsRate(): Promise<SavingsRate> {
  await delay(400);
  return { ...mockSavingsRate };
}

export async function fetchSavingsFrequency(): Promise<SavingsFrequency> {
  await delay(400);
  return { ...mockSavingsFrequency };
}

export async function fetchSavingsRetention(): Promise<SavingsRetention> {
  await delay(400);
  return { ...mockSavingsRetention };
}

export async function createGoal(
  data: Partial<SavingGoal>,
): Promise<SavingGoal> {
  await delay(600);
  return {
    id: `g${Date.now()}`,
    label: data.label ?? "",
    targetAmount: data.targetAmount ?? 0,
    currentAmount: 0,
    monthlyContribution: data.monthlyContribution ?? 0,
    deadline: data.deadline,
  };
}
