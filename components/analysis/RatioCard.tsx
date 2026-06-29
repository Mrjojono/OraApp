import { View, Text, StyleSheet } from "react-native";
import { tokens } from "@/lib/tokens";

type Props = {
  ratio: number;
  label: string;
  expensesAmount: number;
  revenueAmount: number;
  interpretation: string;
};

const FG = tokens.onSurface;
const MFG = tokens.onSurfaceVariant;
const P = tokens.accent;
const SURFACE = tokens.surface;

function getRatioColor(ratio: number): string {
  if (ratio <= 50) return tokens.positive;
  if (ratio <= 65) return tokens.warning;
  return tokens.negative;
}

export default function RatioCard({
  ratio,
  label,
  expensesAmount,
  revenueAmount,
  interpretation,
}: Props) {
  const ratioColor = getRatioColor(ratio);

  return (
    <View style={styles.card}>
      <View style={styles.headerRow}>
        <Text style={styles.title}>Ratio dépenses/revenus</Text>
        <View style={[styles.badge, { backgroundColor: `${ratioColor}20` }]}>
          <Text style={[styles.badgeText, { color: ratioColor }]}>
            {label}
          </Text>
        </View>
      </View>

      <Text style={[styles.ratio, { color: ratioColor }]}>{ratio}%</Text>

      <View style={styles.amountRow}>
        <Text style={styles.amountLabel}>
          {expensesAmount.toLocaleString("fr-FR")} F
        </Text>
        <Text style={styles.amountLabel}>
          {revenueAmount.toLocaleString("fr-FR")} F
        </Text>
      </View>

      <View style={styles.gaugeTrack}>
        <View
          style={[
            styles.gaugeFill,
            { width: `${Math.min(ratio, 100)}%`, backgroundColor: ratioColor },
          ]}
        />
      </View>

      <View style={styles.interpretation}>
        <Text style={styles.interpretationText}>{interpretation}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: SURFACE,
    borderRadius: 14,
    padding: 20,
    marginBottom: 12,
  },
  headerRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 12,
  },
  title: {
    fontSize: 15,
    fontWeight: "600",
    color: FG,
  },
  badge: {
    borderRadius: 6,
    paddingHorizontal: 10,
    paddingVertical: 4,
  },
  badgeText: {
    fontSize: 11,
    fontWeight: "600",
  },
  ratio: {
    fontSize: 44,
    fontWeight: "700",
    letterSpacing: -0.01,
    marginBottom: 4,
  },
  amountRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 12,
  },
  amountLabel: {
    fontSize: 12,
    color: MFG,
  },
  gaugeTrack: {
    height: 8,
    backgroundColor: tokens.surfaceDim,
    borderRadius: 4,
    overflow: "hidden",
    marginBottom: 12,
  },
  gaugeFill: {
    height: "100%",
    borderRadius: 4,
  },
  interpretation: {
    backgroundColor: tokens.surfaceDim,
    borderRadius: 10,
    padding: 12,
  },
  interpretationText: {
    fontSize: 11,
    fontWeight: "500",
    color: tokens.onSurface,
    lineHeight: 16,
  },
});
