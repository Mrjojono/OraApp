import { useQuery } from "@tanstack/react-query";
import { fetchRecommendations } from "@/services/mock/mockRecommendationsService";

export function useRecommendations() {
  return useQuery({
    queryKey: ["recommendations"],
    queryFn: fetchRecommendations,
  });
}
