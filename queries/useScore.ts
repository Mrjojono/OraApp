import { useQuery } from "@tanstack/react-query";
import { fetchScore } from "@/services/mock/mockScoreService";

export function useScore() {
  return useQuery({
    queryKey: ["score"],
    queryFn: fetchScore,
  });
}
