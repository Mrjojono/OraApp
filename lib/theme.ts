import { DarkTheme, type Theme } from "@react-navigation/native";
import { tokens } from "./tokens";

export const THEME = {
  dark: {
    background: tokens.background,
    foreground: tokens.onSurface,
    card: tokens.surface,
    cardForeground: tokens.onSurface,
    popover: tokens.surface,
    popoverForeground: tokens.onSurface,
    primary: tokens.accent,
    primaryForeground: tokens.onAccent,
    secondary: tokens.surface,
    secondaryForeground: tokens.onSurface,
    muted: tokens.surface,
    mutedForeground: tokens.onSurfaceVariant,
    accent: tokens.accent,
    accentForeground: tokens.onAccent,
    destructive: tokens.negative,
    border: tokens.outline,
    input: tokens.outline,
    ring: tokens.accent,
    radius: "0.5rem",
  },
};

export const NAV_THEME: Record<"dark", Theme> = {
  dark: {
    ...DarkTheme,
    colors: {
      background: tokens.background,
      border: tokens.outline,
      card: tokens.surface,
      notification: tokens.negative,
      primary: tokens.accent,
      text: tokens.onSurface,
    },
  },
};
