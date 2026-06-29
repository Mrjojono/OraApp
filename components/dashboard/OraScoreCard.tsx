import { StyleSheet, View, Text, Pressable } from "react-native";
import { tokens } from "@/lib/tokens";

interface Props {
  label?: string;
  badge?: string;
  score?: number;
  changeText?: string;
  scorePercent?: number;
  tipText?: string;
  ctaText?: string;
  onCtaPress?: () => void;
}

export function OraScoreCard({
  label = "OraScore",
  badge = "CRITIQUE",
  score = 75,
  changeText = "+21 pts ce mois",
  scorePercent = 75,
  tipText = "Améliorez votre épargne",
  ctaText = "Recommandations →",
  onCtaPress,
}: Props) {
  return (
    <View style={styles.card}>
      <View style={styles.header}>
        <Text style={styles.label}>{label}</Text>
        <View style={styles.badge}>
          <Text style={styles.badgeText}>{badge}</Text>
        </View>
      </View>

      <View style={styles.scoreSection}>
        <Text style={styles.scoreNum}>{score}</Text>
        <Text style={styles.scoreChange}>{changeText}</Text>
      </View>

      <View style={styles.gaugeTrack}>
        <View style={[styles.gaugeFill, { width: `${scorePercent}%` }]} />
      </View>

      <View style={styles.footer}>
        <Text style={styles.tip}>{tipText}</Text>
        <Pressable onPress={onCtaPress}>
          <Text style={styles.cta}>{ctaText}</Text>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    marginHorizontal: 13,
    marginBottom: 20,
    backgroundColor: tokens.surface,
    borderRadius: 14,
    padding: 14,
    gap: 10,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  label: {
    fontFamily: "DMSans_500Medium",
    fontSize: 12,
    color: tokens.onSurfaceVariant,
  },
  badge: {
    backgroundColor: tokens.accent + "20",
    borderRadius: 6,
    paddingHorizontal: 10,
    paddingVertical: 6,
  },
  badgeText: {
    fontFamily: "DMSans_500Medium",
    fontSize: 11,
    color: tokens.accent,
    fontWeight: "600",
  },
  scoreSection: {
    gap: 12,
    display: "flex",
    flexDirection: "row",
    alignItems: "flex-start",
  },
  scoreNum: {
    fontFamily: "BebasNeue_400Regular",
    fontSize: 56,
    color: tokens.onSurface,
  },
  scoreChange: {
    fontFamily: "DMSans_500Medium",
    fontSize: 12,
    color: tokens.positive,
  },
  gaugeTrack: {
    height: 8,
    backgroundColor: tokens.outline,
    borderRadius: 4,
    overflow: "hidden",
  },
  gaugeFill: {
    height: "100%",
    backgroundColor: tokens.accent,
    borderRadius: 4,
  },
  footer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  tip: {
    fontFamily: "DMSans_500Medium",
    fontSize: 11,
    color: tokens.onSurfaceVariant,
  },
  cta: {
    fontFamily: "PlusJakartaSans_600SemiBold",
    fontSize: 11,
    color: tokens.accent,
  },
});
