import { View, Text } from "react-native";
import { TrendingUp, TrendingDown, Minus } from "lucide-react-native";
import type { RevenueOverview, RevenueFrequency } from "@/types/revenue";
import { tokens } from "@/lib/tokens";

const P = tokens.accent;
const FG = tokens.onSurface;
const MFG = tokens.onSurfaceVariant;

const trendIcons = {
  UP: <TrendingUp size={14} color={P} />,
  DOWN: <TrendingDown size={14} color={tokens.negative} />,
  STABLE: <Minus size={14} color="#EF9F27" />,
};

const trendColors = {
  UP: P,
  DOWN: tokens.negative,
  STABLE: "#EF9F27",
};

type Props = {
  overview: RevenueOverview;
  frequency: RevenueFrequency;
};

export default function RevenueOverviewCard({
  overview,
  frequency,
}: Props) {
  return (
    <View
      style={{
        backgroundColor: tokens.surface,
        borderRadius: 10,
        padding: 16,
        marginTop: 16,
      }}
    >
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: 12,
        }}
      >
        <Text style={{ fontSize: 13, fontWeight: "500", color: FG }}>
          Revenus du mois
        </Text>
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            gap: 4,
          }}
        >
          {trendIcons[overview.trend]}
          <Text
            style={{
              fontSize: 12,
              fontWeight: "600",
              color: trendColors[overview.trend],
            }}
          >
            {overview.variationPercent > 0 ? "+" : ""}
            {overview.variationPercent}%
          </Text>
        </View>
      </View>

      <Text
        style={{
          fontSize: 28,
          fontWeight: "700",
          color: FG,
          marginBottom: 12,
        }}
      >
        {overview.currentMonth.total.toLocaleString("fr-FR")} F
      </Text>

      <View
        style={{
          backgroundColor: tokens.surface,
          borderRadius: 6,
          padding: 10,
          gap: 6,
        }}
      >
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
          }}
        >
          <Text style={{ fontSize: 11, color: MFG }}>
            Moyenne 6 mois
          </Text>
          <Text style={{ fontSize: 11, color: FG }}>
            {overview.averageLast6Months.toLocaleString("fr-FR")} F
          </Text>
        </View>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
          }}
        >
          <Text style={{ fontSize: 11, color: MFG }}>
            30 jours glissants
          </Text>
          <Text style={{ fontSize: 11, color: FG }}>
            {overview.rolling30Days.toLocaleString("fr-FR")} F
          </Text>
        </View>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            paddingTop: 6,
            borderTopWidth: 1,
            borderTopColor: tokens.outline,
          }}
        >
          <Text style={{ fontSize: 11, color: MFG }}>Entrées</Text>
          <Text style={{ fontSize: 11, color: FG }}>
            ~{frequency.entriesPerMonth}/mois · ~{frequency.entriesPerWeek}/sem
          </Text>
        </View>
      </View>

      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
          marginTop: 8,
        }}
      >
        <Text style={{ fontSize: 11, color: MFG }}>Stabilité</Text>
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            gap: 6,
          }}
        >
          <View
            style={{
              height: 4,
              width: 60,
              backgroundColor: tokens.surface,
              borderRadius: 4,
              overflow: "hidden",
            }}
          >
            <View
              style={{
                height: "100%",
                width: `${frequency.stabilityScore}%`,
                backgroundColor:
                  frequency.stabilityScore >= 70
                    ? P
                    : frequency.stabilityScore >= 40
                      ? "#EF9F27"
                      : tokens.negative,
                borderRadius: 4,
              }}
            />
          </View>
          <Text style={{ fontSize: 11, color: FG }}>
            {frequency.stabilityScore}/100
          </Text>
        </View>
      </View>
    </View>
  );
}
