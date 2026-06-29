import { useQuery, useMutation, useQueries } from "@tanstack/react-query";
import {
  fetchGoals,
  fetchSavingsRate,
  fetchSavingsFrequency,
  fetchSavingsRetention,
  createGoal,
} from "@/services/mock/mockSavingsService";
import type { SavingGoal } from "@/constants/mockSavings";

export function useSavingsGoals() {
  return useQuery({
    queryKey: ["savings", "goals"],
    queryFn: fetchGoals,
  });
}

export function useSavingsIndicators() {
  return useQueries({
    queries: [
      { queryKey: ["savings", "rate"], queryFn: fetchSavingsRate },
      { queryKey: ["savings", "frequency"], queryFn: fetchSavingsFrequency },
      { queryKey: ["savings", "retention"], queryFn: fetchSavingsRetention },
    ],
  });
}

export function useCreateGoal() {
  return useMutation({
    mutationFn: (data: Partial<SavingGoal>) => createGoal(data),
  });
}
