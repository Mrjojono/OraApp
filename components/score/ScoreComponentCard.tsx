import { View, Text, Pressable, StyleSheet } from "react-native";
import { tokens } from "@/lib/tokens";
import { ChevronRight } from "lucide-react-native";
import { getLevelColor, getLevelLabel } from "@/types/score";

interface Props {
  id: string;
  label: string;
  score: number;
  level: string;
  contribution: number;
  onPress: (id: string) => void;
}

export default function ScoreComponentCard({
  id,
  label,
  score,
  level,
  contribution,
  onPress,
}: Props) {
  const lvl = getLevelLabel(level);
  const color = getLevelColor(level);

  return (
    <Pressable
      onPress={() => onPress(id)}
      style={({ pressed }) => [styles.card, pressed && styles.pressed]}
    >
      <View style={styles.row}>
        <View style={[styles.dot, { backgroundColor: color }]} />
        <Text style={styles.name}>{label}</Text>
        <View style={[styles.levelBadge, { backgroundColor: color + "20" }]}>
          <Text style={[styles.levelText, { color }]}>{lvl}</Text>
        </View>
        <View style={styles.spacer} />
        <Text style={[styles.scoreNum, { color }]}>{score}/100</Text>
        <ChevronRight size={16} color={tokens.onSurfaceVariant} />
      </View>
      <View style={styles.barRow}>
        <View style={styles.barBg}>
          <View
            style={[styles.barFill, { width: `${score}%`, backgroundColor: color }]}
          />
        </View>
        <Text style={styles.contrib}>+{contribution.toFixed(1)} pts</Text>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: tokens.surface,
    borderRadius: 14,
    padding: 16,
    gap: 10,
  },
  pressed: {
    opacity: 0.7,
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
  },
  name: {
    fontFamily: "DMSans_500Medium",
    fontSize: 14,
    color: tokens.onSurface,
  },
  levelBadge: {
    borderRadius: 4,
    paddingHorizontal: 8,
    paddingVertical: 3,
  },
  levelText: {
    fontFamily: "DMSans_500Medium",
    fontSize: 10,
    fontWeight: "700",
  },
  spacer: {
    flex: 1,
  },
  scoreNum: {
    fontFamily: "DMSans_600SemiBold",
    fontSize: 13,
  },
  barRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  barBg: {
    flex: 1,
    height: 6,
    backgroundColor: tokens.outline,
    borderRadius: 3,
    overflow: "hidden",
  },
  barFill: {
    height: "100%",
    borderRadius: 3,
  },
  contrib: {
    fontFamily: "DMSans_500Medium",
    fontSize: 11,
    color: tokens.onSurfaceVariant,
  },
});
