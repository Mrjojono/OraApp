import { View, Text, StyleSheet } from "react-native";
import { tokens } from "@/lib/tokens";
import { getGlobalLevel } from "@/types/score";

interface Props {
  score: number;
  label: string;
  history?: Array<{ month: string; score: number }>;
}

export default function ScoreHero({ score, label }: Props) {
  const { level, color } = getGlobalLevel(score);

  return (
    <View style={styles.card}>
      <View style={styles.header}>
        <Text style={styles.label}>OraScore</Text>
        <View style={[styles.badge, { backgroundColor: color + "20" }]}>
          <Text style={[styles.badgeText, { color }]}>{level}</Text>
        </View>
      </View>

      <View style={styles.scoreSection}>
        <View style={styles.scoreRow}>
          <Text style={[styles.scoreNum, { color }]}>{score}</Text>
          <Text style={styles.scoreDenom}>/100</Text>
          <View style={styles.trendBadge}>
            <Text style={styles.trendText}>-9 pts / 6 mois</Text>
          </View>
        </View>
      </View>

      <View style={styles.gaugeTrack}>
        <View style={[styles.gaugeFill, { width: `${score}%`, backgroundColor: color }]} />
      </View>

      <Text style={styles.label}>{label}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: tokens.surface,
    borderRadius: 14,
    padding: 20,
    gap: 14,
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
    flex: 1,
  },
  badge: {
    borderRadius: 6,
    paddingHorizontal: 10,
    paddingVertical: 6,
  },
  badgeText: {
    fontFamily: "DMSans_500Medium",
    fontSize: 11,
    fontWeight: "600",
  },
  scoreSection: {
    gap: 8,
  },
  scoreRow: {
    flexDirection: "row",
    alignItems: "baseline",
  },
  scoreNum: {
    fontFamily: "BebasNeue_400Regular",
    fontSize: 64,
    lineHeight: 64,
  },
  scoreDenom: {
    fontFamily: "DMSans_500Medium",
    fontSize: 20,
    color: tokens.onSurfaceVariant,
    marginLeft: 4,
  },
  trendBadge: {
    backgroundColor: tokens.negative + "20",
    borderRadius: 6,
    paddingHorizontal: 8,
    paddingVertical: 4,
    marginLeft: 12,
  },
  trendText: {
    fontFamily: "DMSans_500Medium",
    fontSize: 11,
    color: tokens.negative,
    fontWeight: "600",
  },
  gaugeTrack: {
    height: 8,
    backgroundColor: tokens.outline,
    borderRadius: 4,
    overflow: "hidden",
  },
  gaugeFill: {
    height: "100%",
    borderRadius: 4,
  },
});
