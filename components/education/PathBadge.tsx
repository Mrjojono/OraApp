import { View, Text, StyleSheet } from "react-native";
import { tokens } from "@/lib/tokens";

const badgeColors: Record<string, { bg: string; text: string }> = {
  debutant: { bg: tokens.accentContainer, text: tokens.accent },
  budget: { bg: tokens.accentContainer, text: tokens.accent },
  epargne: { bg: "rgba(255,69,58,0.12)", text: tokens.negative },
  credit: { bg: "rgba(255,192,67,0.12)", text: tokens.warning },
  investissement: { bg: "rgba(0,122,255,0.15)", text: "#4C9AFF" },
};

const badgeLabels: Record<string, string> = {
  debutant: "DEBUTANT",
  budget: "DEBUTANT",
  epargne: "AVANCE",
  credit: "INTERMEDIAIRE",
  investissement: "DEBUTANT",
};

interface Props {
  category: string;
}

export function PathBadge({ category }: Props) {
  const badge = badgeColors[category] || badgeColors.debutant;
  const label = badgeLabels[category] || "DEBUTANT";
  return (
    <View style={[styles.badge, { backgroundColor: badge.bg }]}>
      <Text style={[styles.label, { color: badge.text }]}>{label}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  badge: {
    paddingHorizontal: 8,
    paddingVertical: 5,
    borderRadius: 6,
  },
  label: {
    fontSize: 9,
    fontWeight: "600",
    fontFamily: "DMSans_600SemiBold",
  },
});
