import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { tokens } from "./tokens";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const getProgressColor = (value: number) => {
  if (value < 25) return { hex: tokens.negative, tw: "bg-error", label: "Critique" };
  if (value < 50) return { hex: tokens.warning, tw: "bg-warning", label: "Fragile" };
  if (value < 75)
    return { hex: "#A5A5A5", tw: "bg-secondary", label: "Correct" };
  return { hex: tokens.positive, tw: "bg-primary", label: "Solide" };
};

export const getScoreVariant = (value: number) => {
  if (value < 25) return "danger" as const;
  if (value < 50) return "warning" as const;
  if (value < 75) return "success" as const;
  return "success" as const;
};
