import { View, Text, Pressable } from "react-native";
import {
  Briefcase,
  Globe,
  TrendingUp,
  CircleDollarSign,
  ChevronRight,
  Truck,
  ShoppingBag,
} from "lucide-react-native";
import type { RevenueSource } from "@/types/revenue";
import { tokens } from "@/lib/tokens";

const PRIMARY = tokens.accent;
const WARNING = tokens.warning;

const categoryIcons: Record<string, { icon: JSX.Element; bg: string }> = {
  SALAIRE: {
    icon: <Briefcase size={16} color={PRIMARY} />,
    bg: tokens.surface,
  },
  FREELANCE: {
    icon: <Globe size={16} color={PRIMARY} />,
    bg: tokens.surface,
  },
  INVESTMENT: {
    icon: <TrendingUp size={16} color={PRIMARY} />,
    bg: tokens.surface,
  },
  DEPOTS: {
    icon: <CircleDollarSign size={16} color={PRIMARY} />,
    bg: tokens.surface,
  },
  TRANSPORT: {
    icon: <Truck size={16} color={PRIMARY} />,
    bg: tokens.surface,
  },
  COMMERCE: {
    icon: <ShoppingBag size={16} color={PRIMARY} />,
    bg: tokens.surface,
  },
  CREDIT: { icon: <TrendingUp size={16} color={WARNING} />, bg: "#3d2e0e" },
};

const categoryLabels: Record<string, string> = {
  SALAIRE: "Salaire",
  FREELANCE: "Freelance",
  INVESTMENT: "Investissement",
  DEPOTS: "Dépôts",
  TRANSPORT: "Transport",
  COMMERCE: "Commerce",
  CREDIT: "Crédit",
};

type Props = {
  sources: RevenueSource[];
  totalAmount: number;
  dominantSource: string;
  onPress?: (source: RevenueSource) => void;
};

export default function RevenueCard({
  sources,
  totalAmount,
  dominantSource,
  onPress,
}: Props) {
  return (
    <View style={{ marginTop: 24 }}>
      {/* Header */}
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: 14,
        }}
      >
        <Text
          style={{
            fontSize: 15,
            fontWeight: "500",
            color: tokens.onSurface,
          }}
        >
          Sources de revenus
        </Text>
        <Text style={{ fontSize: 12, color: tokens.onSurfaceVariant }}>
          {totalAmount.toLocaleString("fr-FR")} F
        </Text>
      </View>

      {/* Liste */}
      {sources.map((source, index) => {
        const cat = categoryIcons[source.category] ?? categoryIcons.DEPOTS;
        const label = categoryLabels[source.category] ?? source.category;
        const isDominant = source.category === dominantSource;

        return (
          <Pressable
            key={source.category}
            onPress={() => onPress?.(source)}
            disabled={!onPress}
            style={({ pressed }) => ({
              opacity: pressed ? 0.7 : 1,
              borderBottomWidth: 0,
              marginBottom: 0,
              borderColor: isDominant
                ? tokens.accent
                : tokens.outline,
            })}
          >
            <View
              className="bg-transparent"
              style={{
                padding: 10,
              }}
            >
              {/* Ligne principale */}
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  marginBottom: 10,
                }}
              >
                {/* Icône */}
                <View
                  style={{
                    width: 35,
                    height: 35,
                    borderRadius: 5,
                    backgroundColor: cat.bg,
                    alignItems: "center",
                    justifyContent: "center",
                    marginRight: 10,
                  }}
                >
                  {cat.icon}
                </View>

                {/* Label + montant */}
                <View style={{ flex: 1 }}>
                  <View
                    style={{
                      flexDirection: "row",
                      alignItems: "center",
                      gap: 6,
                    }}
                  >
                    <Text
                      style={{
                        fontSize: 13,
                        fontWeight: "500",
                        color: tokens.onSurface,
                      }}
                    >
                      {label}
                    </Text>
                    {isDominant && (
                      <View
                        style={{
                          backgroundColor: tokens.surface,
                          borderRadius: 3,
                          paddingHorizontal: 7,
                          paddingVertical: 2,
                        }}
                      >
                          <Text
                            style={{ fontSize: 10, color: tokens.accent }}
                        >
                          Principal
                        </Text>
                      </View>
                    )}
                  </View>
                  <Text
                    style={{
                      fontSize: 11,
                      color: tokens.onSurfaceVariant,
                      marginTop: 1,
                    }}
                  >
                    {source.amount.toLocaleString("fr-FR")} F · {source.count}{" "}
                    {source.count > 1 ? "transactions" : "transaction"}
                  </Text>
                </View>

                {/* % + chevron */}
                <View
                  style={{ flexDirection: "row", alignItems: "center", gap: 4 }}
                >
                  <Text
                    style={{
                      fontSize: 14,
                      fontWeight: "600",
                      color:
                        source.percent >= 50
                          ? tokens.accent
                          : tokens.onSurface,
                    }}
                  >
                    {source.percent}%
                  </Text>
                  {onPress && (
                    <ChevronRight
                      size={14}
                      color={tokens.onSurfaceVariant}
                    />
                  )}
                </View>
              </View>

              {/* Barre de progression */}
              <View
                style={{
                  height: 4,
                  backgroundColor: tokens.surface,
                  borderRadius: 4,
                  overflow: "hidden",
                }}
              >
                <View
                  style={{
                    height: "100%",
                    width: `${source.percent}%`,
                    backgroundColor:
                      source.percent >= 50
                        ? tokens.accent
                        : tokens.surfaceDim,
                    borderRadius: 4,
                  }}
                />
              </View>
            </View>
          </Pressable>
        );
      })}
    </View>
  );
}
