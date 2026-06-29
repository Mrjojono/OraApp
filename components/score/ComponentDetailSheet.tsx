import { View, Text, StyleSheet } from "react-native";
import { tokens } from "@/lib/tokens";
import { getLevelColor, getLevelLabel } from "@/types/score";
import type { ScoreComponent, ScoreInterpretation } from "@/types/score";
import { COMPONENT_CONFIG } from "@/types/score";

interface Props {
  componentId: string;
  data: ScoreComponent;
  interpretation?: ScoreInterpretation;
}

export default function ComponentDetailSheet({
  componentId,
  data,
  interpretation,
}: Props) {
  const config = COMPONENT_CONFIG[componentId] ?? {
    label: componentId,
    short: componentId,
  };
  const lvl = interpretation ? getLevelLabel(interpretation.level) : "N/A";
  const color = interpretation ? getLevelColor(interpretation.level) : tokens.onSurfaceVariant;
  const maxPossible = Math.round(100 / (data.weight || 1));
  const progress = (data.score / maxPossible) * 100;

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={[styles.iconLarge, { backgroundColor: color + "20" }]}>
          <View style={[styles.iconDot, { backgroundColor: color }]} />
        </View>
        <View style={styles.headerText}>
          <Text style={styles.title}>{config.label}</Text>
          <View style={styles.levelRow}>
            <View style={[styles.levelDot, { backgroundColor: color }]} />
            <Text style={[styles.levelLabel, { color }]}>{lvl}</Text>
          </View>
        </View>
      </View>

      <View style={styles.scoreSection}>
        <View style={styles.scoreRow}>
          <Text style={[styles.bigScore, { color }]}>{data.score}</Text>
          <Text style={styles.scoreDenom}>/{maxPossible}</Text>
        </View>
        <View style={styles.gaugeTrack}>
          <View
            style={[styles.gaugeFill, { width: `${progress}%`, backgroundColor: color }]}
          />
        </View>
      </View>

      <View style={styles.statsGrid}>
        <View style={styles.statBox}>
          <Text style={styles.statValue}>{data.weight * 100}%</Text>
          <Text style={styles.statLabel}>Poids</Text>
        </View>
        <View style={styles.statBox}>
          <Text style={styles.statValue}>+{data.contribution.toFixed(1)}</Text>
          <Text style={styles.statLabel}>Contribution</Text>
        </View>
      </View>

      {interpretation && (
        <>
          {interpretation.message && (
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Analyse</Text>
              <Text style={styles.message}>{interpretation.message}</Text>
            </View>
          )}

          {interpretation.priorities.length > 0 && (
            <View style={styles.section}>
              <Text style={[styles.sectionTitle, { color: tokens.negative }]}>
                Priorit\u00E9s
              </Text>
              {interpretation.priorities.map((p, i) => (
                <View key={i} style={styles.prioRow}>
                  <View style={[styles.prioDot, { backgroundColor: color }]} />
                  <Text style={styles.prioText}>{p}</Text>
                </View>
              ))}
            </View>
          )}
        </>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    gap: 20,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    gap: 14,
  },
  iconLarge: {
    width: 48,
    height: 48,
    borderRadius: 14,
    alignItems: "center",
    justifyContent: "center",
  },
  iconDot: {
    width: 18,
    height: 18,
    borderRadius: 9,
  },
  headerText: {
    flex: 1,
  },
  title: {
    fontSize: 18,
    fontWeight: "600",
    color: tokens.onSurface,
    marginBottom: 4,
  },
  levelRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
  },
  levelDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
  },
  levelLabel: {
    fontSize: 13,
    fontWeight: "600",
  },
  scoreSection: {
    gap: 8,
  },
  scoreRow: {
    flexDirection: "row",
    alignItems: "baseline",
  },
  bigScore: {
    fontFamily: "BebasNeue_400Regular",
    fontSize: 48,
    lineHeight: 48,
  },
  scoreDenom: {
    fontFamily: "DMSans_500Medium",
    fontSize: 18,
    color: tokens.onSurfaceVariant,
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
  statsGrid: {
    flexDirection: "row",
    gap: 8,
  },
  statBox: {
    flex: 1,
    backgroundColor: tokens.surfaceDim,
    borderRadius: 10,
    padding: 14,
    gap: 4,
  },
  statValue: {
    fontSize: 16,
    fontWeight: "700",
    color: tokens.onSurface,
  },
  statLabel: {
    fontSize: 11,
    color: tokens.onSurfaceVariant,
  },
  section: {
    borderTopWidth: 1,
    borderTopColor: tokens.outline,
    paddingTop: 16,
    gap: 12,
  },
  sectionTitle: {
    fontSize: 13,
    fontWeight: "600",
    textTransform: "uppercase",
    letterSpacing: 0.5,
  },
  message: {
    fontSize: 13,
    color: tokens.onSurface,
    lineHeight: 20,
  },
  prioRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  prioDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
  },
  prioText: {
    fontSize: 13,
    color: tokens.onSurface,
    flex: 1,
  },
});
