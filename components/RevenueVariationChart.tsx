import { View, Text, StyleSheet, Dimensions } from "react-native";
import { LineChart } from "react-native-gifted-charts";
import { getProgressColor } from "@/lib/utils";
import { tokens } from "@/lib/tokens";

type MonthlyRevenue = {
  month: string;
  amount: number;
  variationPercent: number | null;
};

type RevenueVariationChartProps = {
  monthlyRevenues: MonthlyRevenue[];
  averageVariationPercent: number;
  trend: "UP" | "DOWN" | "STABLE";
  volatilityScore: number;
  coefficientOfVariation: number;
};

const FG = tokens.onSurface;
const MFG = tokens.onSurfaceVariant;

const TREND_COLORS: Record<
  string,
  { hex: string; label: string }
> = {
  UP: { hex: tokens.positive, label: "↑ En hausse" },
  DOWN: { hex: tokens.negative, label: "↓ En baisse" },
  STABLE: { hex: tokens.warning, label: "→ Stable" },
};

const RevenueVariationChart = ({
  monthlyRevenues,
  averageVariationPercent,
  trend,
  volatilityScore,
  coefficientOfVariation,
}: RevenueVariationChartProps) => {
  const chartColor = TREND_COLORS[trend].hex;

  const chartWidth = Dimensions.get("window").width - 64;
  const spacing = Math.max(
    40,
    Math.floor(chartWidth / (monthlyRevenues.length - 1)),
  );

  const chartData = monthlyRevenues.map((d) => ({
    value: Math.round(d.amount / 1000),
    label: d.month.slice(5),
    dataPointText: `${(d.amount / 1000).toLocaleString("fr-FR", {
      maximumFractionDigits: 0,
    })} K`,
  }));

  const stabilityLabel =
    coefficientOfVariation < 20
      ? { text: "Stable", color: tokens.positive }
      : coefficientOfVariation < 40
        ? { text: "Modérée", color: tokens.warning }
        : { text: "Volatile", color: tokens.negative };

  const trendInfo = TREND_COLORS[trend];
  const scoreColor = getProgressColor(volatilityScore).hex;

  return (
    <View>
      <View style={styles.titleRow}>
        <Text style={styles.title}>Variation de vos revenus</Text>
        <Text style={[styles.trendText, { color: trendInfo.hex }]}>
          {trendInfo.label}
        </Text>
      </View>

      <View style={styles.badgeRow}>
        <View style={[styles.badge, { backgroundColor: `${tokens.accent}20` }]}>
          <Text style={[styles.badgeText, { color: tokens.accent }]}>
            Moy. {averageVariationPercent > 0 ? "+" : ""}
            {averageVariationPercent}% / mois
          </Text>
        </View>
        <View
          style={[styles.badge, { backgroundColor: `${stabilityLabel.color}20` }]}
        >
          <Text style={[styles.badgeText, { color: stabilityLabel.color }]}>
            {stabilityLabel.text} · {coefficientOfVariation}%
          </Text>
        </View>
        <View style={[styles.badge, { backgroundColor: `${scoreColor}20` }]}>
          <Text style={[styles.badgeText, { color: scoreColor }]}>
            Score {volatilityScore}
          </Text>
        </View>
      </View>

      <View>
        <LineChart
          areaChart
          data={chartData}
          width={chartWidth}
          height={190}
          spacing={spacing}
          initialSpacing={12}
          endSpacing={12}
          color={chartColor}
          thickness={2}
          hideYAxisText
          yAxisColor="transparent"
          yAxisThickness={0}
          hideAxesAndRules={false}
          startFillColor={chartColor}
          startOpacity={0.2}
          endFillColor={chartColor}
          endOpacity={0.02}
          hideDataPoints={false}
          customDataPoint={() => (
            <View style={styles.dataPointContainer}>
              <View
                style={[
                  styles.dataPointGlow,
                  { backgroundColor: `${chartColor}20` },
                ]}
              />
              <View
                style={[styles.dataPoint, { backgroundColor: chartColor }]}
              />
            </View>
          )}
          xAxisColor={tokens.outline}
          xAxisLabelTextStyle={styles.xLabel}
          rulesColor={tokens.outline}
          rulesType="solid"
          textColor={chartColor}
          textFontSize={10}
          noOfSections={4}
        />
      </View>

      <View style={styles.variationRow}>
        {monthlyRevenues.map((d, i) => {
          if (d.variationPercent === null)
            return <View key={i} style={{ flex: 1 }} />;
          const isPositive = d.variationPercent >= 0;
          const varColor = isPositive ? tokens.positive : tokens.negative;
          return (
            <View key={i} style={styles.variationItem}>
              <View style={[styles.varBadge, { backgroundColor: `${varColor}20` }]}>
                <Text style={[styles.varText, { color: varColor }]}>
                  {isPositive ? "+" : ""}
                  {d.variationPercent}%
                </Text>
              </View>
            </View>
          );
        })}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  titleRow: {
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
  trendText: {
    fontSize: 13,
    fontWeight: "600",
  },
  badgeRow: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 6,
    marginBottom: 16,
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
  dataPointContainer: {
    alignItems: "center",
    justifyContent: "center",
  },
  dataPointGlow: {
    position: "absolute",
    width: 18,
    height: 18,
    borderRadius: 9,
  },
  dataPoint: {
    width: 8,
    height: 8,
    borderRadius: 4,
  },
  xLabel: {
    color: MFG,
    fontSize: 10,
  },
  variationRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 12,
  },
  variationItem: {
    flex: 1,
    alignItems: "center",
  },
  varBadge: {
    borderRadius: 4,
    paddingHorizontal: 6,
    paddingVertical: 2,
  },
  varText: {
    fontSize: 10,
    fontWeight: "600",
  },
});

export default RevenueVariationChart;
