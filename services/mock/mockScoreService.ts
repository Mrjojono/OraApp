import { delay } from "./utils";
import { mockScoreData } from "@/constants/mockScore";
import type { ScoreData } from "@/types/score";

export async function fetchScore(): Promise<ScoreData> {
  await delay(700);
  return { ...mockScoreData };
}
