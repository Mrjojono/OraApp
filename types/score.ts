export interface ScoreComponent {
  score: number;
  weight: number;
  contribution: number;
}

export interface ScoreInterpretation {
  level: string;
  label: string;
  message: string;
  priorities: string[];
}

export interface ScoreData {
  globalScore: number;
  label: string;
  components: Record<string, ScoreComponent>;
  interpretations?: Record<string, ScoreInterpretation>;
  methodology?: string;
  advice?: {
    severity: string;
    title: string;
    message: string;
  };
  history?: Array<{ month: string; score: number }>;
}

export interface ScoreResponse {
  score: ScoreData;
}

export const COMPONENT_CONFIG: Record<string, { label: string; short: string }> = {
  C1_expenses: { label: "Dépenses", short: "Dépenses" },
  C2_debt: { label: "Endettement", short: "Endettement" },
  C3_savings: { label: "Épargne", short: "Épargne" },
  C4_stability: { label: "Stabilité", short: "Stabilité" },
};

export function getLevelColor(level: string): string {
  switch (level.toUpperCase()) {
    case "EXCELLENT":
    case "BON":
    case "TRES BIEN":
      return "#30D158";
    case "MOYEN":
    case "FAIBLE":
    case "EN SURVEILLANCE":
      return "#FFC043";
    case "CRITIQUE":
    case "CRITICAL":
    case "ALERTE":
      return "#FF453A";
    default:
      return "#B0B0B0";
  }
}

export function getLevelLabel(level: string): string {
  switch (level.toUpperCase()) {
    case "CRITIQUE":
    case "CRITICAL":
      return "CRITIQUE";
    case "FAIBLE":
      return "FAIBLE";
    case "MOYEN":
      return "MOYEN";
    case "BON":
      return "BON";
    case "EXCELLENT":
    case "TRES BIEN":
      return "EXCELLENT";
    default:
      return level;
  }
}

export function getGlobalLevel(score: number): { level: string; color: string } {
  if (score >= 80) return { level: "EXCELLENT", color: "#30D158" };
  if (score >= 60) return { level: "BON", color: "#30D158" };
  if (score >= 40) return { level: "MOYEN", color: "#FFC043" };
  if (score >= 20) return { level: "FAIBLE", color: "#C48A2C" };
  return { level: "CRITIQUE", color: "#FF453A" };
}

export function getScoreColor(score: number): string {
  return getGlobalLevel(score).color;
}
