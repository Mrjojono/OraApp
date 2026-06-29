import { delay } from "./utils";
import { mockRecommendations } from "@/constants/mockRecommendations";
import type { Recommendation } from "@/constants/mockRecommendations";

export async function fetchRecommendations(): Promise<Recommendation[]> {
  await delay(500);
  return [...mockRecommendations];
}
