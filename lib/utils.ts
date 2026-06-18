import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const getProgressColor = (value: number) => {
  if (value < 25) return { hex: "#ba1a1a", tw: "bg-error", label: "Critique" };
  if (value < 50) return { hex: "#EF9F27", tw: "bg-warning", label: "Fragile" };
  if (value < 75)
    return { hex: "#47672d", tw: "bg-secondary", label: "Correct" };
  return { hex: "#3a6a00", tw: "bg-primary", label: "Solide" };
};

export const getScoreVariant = (value: number) => {
  if (value < 25) return "danger" as const;
  if (value < 50) return "warning" as const;
  if (value < 75) return "success" as const;
  return "success" as const;
};
