import { View, Text, Pressable } from "react-native";
import {
  Home,
  Car,
  Heart,
  BookOpen,
  Wrench,
  MoreHorizontal,
  ChevronRight,
  UtensilsCrossed,
  Gamepad2,
} from "lucide-react-native";
import type { ExpenseCategory } from "@/types/expense";
import { tokens } from "@/lib/tokens";

const P = tokens.accent;
const FG = tokens.onSurface;
const MFG = tokens.onSurfaceVariant;
const ACCENT = tokens.surface;
const BORDER = tokens.outline;

const categoryIcons: Record<string, { icon: JSX.Element; bg: string }> = {
  LOGEMENT: { icon: <Home size={16} color={P} />, bg: ACCENT },
  NOURRITURE: { icon: <UtensilsCrossed size={16} color={P} />, bg: ACCENT },
  TRANSPORT: { icon: <Car size={16} color={P} />, bg: ACCENT },
  LOISIRS: { icon: <Gamepad2 size={16} color={P} />, bg: ACCENT },
  SANTE: { icon: <Heart size={16} color={P} />, bg: ACCENT },
  EDUCATION: { icon: <BookOpen size={16} color={P} />, bg: ACCENT },
  SERVICES: { icon: <Wrench size={16} color={P} />, bg: ACCENT },
  AUTRES: { icon: <MoreHorizontal size={16} color={P} />, bg: ACCENT },
};

const categoryLabels: Record<string, string> = {
  LOGEMENT: "Logement",
  NOURRITURE: "Nourriture",
  TRANSPORT: "Transport",
  LOISIRS: "Loisirs",
  SANTE: "Santé",
  EDUCATION: "Éducation",
  SERVICES: "Services",
  AUTRES: "Autres",
};

type Props = {
  categories: ExpenseCategory[];
  totalAmount: number;
  dominantCategory: string;
  onPress?: (category: ExpenseCategory) => void;
};

export default function ExpenseCard({
  categories,
  totalAmount,
  dominantCategory,
  onPress,
}: Props) {
  const sorted = [...categories].sort((a, b) => b.percent - a.percent);

  return (
    <View style={{ marginTop: 0 }}>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: 14,
        }}
      >
        <Text style={{ fontSize: 15, fontWeight: "500", color: FG }}>
          Catégories de dépenses
        </Text>
        <Text style={{ fontSize: 12, color: MFG }}>
          {totalAmount.toLocaleString("fr-FR")} F
        </Text>
      </View>

      {sorted.map((cat) => {
        const icon = categoryIcons[cat.category] ?? categoryIcons.AUTRES;
        const label = categoryLabels[cat.category] ?? cat.category;
        const isDominant = cat.category === dominantCategory;

        return (
          <Pressable
            key={cat.category}
            onPress={() => onPress?.(cat)}
            disabled={!onPress}
            style={({ pressed }) => ({
              opacity: pressed ? 0.7 : 1,
              borderBottomWidth: 0,
              marginBottom: 0,
              borderColor: isDominant ? "#9FE35D" : BORDER,
            })}
          >
            <View
              className="bg-transparent"
              style={{
                padding: 10,
              }}
            >
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  marginBottom: 10,
                }}
              >
                <View
                  style={{
                    width: 35,
                    height: 35,
                    borderRadius: 5,
                    backgroundColor: icon.bg,
                    alignItems: "center",
                    justifyContent: "center",
                    marginRight: 10,
                  }}
                >
                  {icon.icon}
                </View>

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
                        color: FG,
                      }}
                    >
                      {label}
                    </Text>
                    {isDominant && (
                      <View
                        style={{
                          backgroundColor: ACCENT,
                          borderRadius: 3,
                          paddingHorizontal: 7,
                          paddingVertical: 2,
                        }}
                      >
                        <Text style={{ fontSize: 10, color: P }}>
                          Principal
                        </Text>
                      </View>
                    )}
                  </View>
                  <Text
                    style={{ fontSize: 11, color: MFG, marginTop: 1 }}
                  >
                    {cat.amount.toLocaleString("fr-FR")} F · {cat.count}{" "}
                    {cat.count > 1 ? "transactions" : "transaction"}
                  </Text>
                </View>

                <View
                  style={{ flexDirection: "row", alignItems: "center", gap: 4 }}
                >
                  <Text
                    style={{
                      fontSize: 14,
                      fontWeight: "600",
                      color: cat.percent >= 50 ? P : FG,
                    }}
                  >
                    {cat.percent}%
                  </Text>
                  {onPress && <ChevronRight size={14} color={MFG} />}
                </View>
              </View>

              <View
                style={{
                  height: 4,
                  backgroundColor: ACCENT,
                  borderRadius: 4,
                  overflow: "hidden",
                }}
              >
                <View
                  style={{
                    height: "100%",
                    width: `${cat.percent}%`,
                    backgroundColor:
                      cat.percent >= 50 ? P : "#9FE35D",
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
