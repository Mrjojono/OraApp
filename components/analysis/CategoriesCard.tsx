import { View, Text, Pressable, StyleSheet } from "react-native";
import { ChevronRight } from "lucide-react-native";
import type { ExpenseCategory } from "@/types/expense";
import { tokens } from "@/lib/tokens";

type Props = {
  categories: ExpenseCategory[];
  onPressCategory: (category: ExpenseCategory) => void;
  onPressSeeAll: () => void;
};

const FG = tokens.onSurface;
const MFG = tokens.onSurfaceVariant;
const P = tokens.accent;
const SURFACE = tokens.surface;

const CATEGORY_COLORS: Record<string, string> = {
  LOGEMENT: P,
  NOURRITURE: tokens.warning,
  TRANSPORT: "#4C9AFF",
  SANTE: tokens.positive,
  LOISIRS: "#BF5AF2",
  EDUCATION: "#FF9F0A",
  SERVICES: "#64D2FF",
  AUTRES: MFG,
};

const CATEGORY_LABELS: Record<string, string> = {
  LOGEMENT: "Logement",
  NOURRITURE: "Nourriture",
  TRANSPORT: "Transport",
  LOISIRS: "Loisirs",
  SANTE: "Santé",
  EDUCATION: "Éducation",
  SERVICES: "Services",
  AUTRES: "Autres",
};

export default function CategoriesCard({
  categories,
  onPressCategory,
  onPressSeeAll,
}: Props) {
  const sorted = [...categories].sort((a, b) => b.percent - a.percent);

  return (
    <View style={styles.card}>
      <Text style={styles.title}>Répartition par catégorie</Text>

      {sorted.map((cat) => {
        const color = CATEGORY_COLORS[cat.category] ?? MFG;
        const label = CATEGORY_LABELS[cat.category] ?? cat.category;

        return (
          <Pressable
            key={cat.category}
            onPress={() => onPressCategory(cat)}
            style={({ pressed }) => [styles.row, pressed && styles.rowPressed]}
          >
            <View style={[styles.dot, { backgroundColor: color }]} />
            <Text style={styles.name}>{label}</Text>
            <Text style={styles.percent}>{cat.percent}%</Text>
            <View style={styles.barTrack}>
              <View
                style={[
                  styles.barFill,
                  { width: `${cat.percent}%`, backgroundColor: color },
                ]}
              />
            </View>
            <Text style={styles.amount}>
              {cat.amount.toLocaleString("fr-FR")}
            </Text>
            <ChevronRight size={14} color={MFG} strokeWidth={2} />
          </Pressable>
        );
      })}

      <Pressable
        onPress={onPressSeeAll}
        style={({ pressed }) => [styles.seeAllBtn, pressed && styles.rowPressed]}
      >
        <Text style={styles.seeAllText}>Voir toutes les catégories</Text>
        <ChevronRight size={16} color={P} strokeWidth={2.5} />
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: SURFACE,
    borderRadius: 14,
    padding: 24,
    gap: 16,
  },
  title: {
    fontSize: 15,
    fontWeight: "600",
    color: FG,
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  rowPressed: {
    opacity: 0.6,
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
  },
  name: {
    fontSize: 13,
    fontWeight: "500",
    color: FG,
  },
  percent: {
    fontSize: 11,
    fontWeight: "500",
    color: MFG,
  },
  barTrack: {
    flex: 1,
    height: 6,
    backgroundColor: tokens.surfaceDim,
    borderRadius: 3,
    overflow: "hidden",
  },
  barFill: {
    height: "100%",
    borderRadius: 3,
  },
  amount: {
    fontSize: 12,
    fontWeight: "500",
    color: MFG,
    textAlign: "right",
    minWidth: 55,
  },
  seeAllBtn: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 6,
    paddingVertical: 12,
    marginTop: 4,
    borderTopWidth: 1,
    borderTopColor: tokens.outline,
  },
  seeAllText: {
    fontSize: 13,
    fontWeight: "600",
    color: P,
  },
});
