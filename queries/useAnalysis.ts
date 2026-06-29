import { useQuery } from "@tanstack/react-query";
import {
  fetchAnalysis,
  fetchAnalysisMonths,
} from "@/services/mock/mockAnalysisService";

export function useAnalysis(monthKey: string) {
  return useQuery({
    queryKey: ["analysis", monthKey],
    queryFn: () => fetchAnalysis(monthKey),
    enabled: !!monthKey,
  });
}

export function useAnalysisMonths() {
  return useQuery({
    queryKey: ["analysis", "months"],
    queryFn: fetchAnalysisMonths,
  });
}
