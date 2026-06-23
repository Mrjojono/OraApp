import { View, Text, Pressable, StyleSheet } from "react-native";
import {
  Home,
  Car,
  Heart,
  BookOpen,
  Wrench,
  MoreHorizontal,
  UtensilsCrossed,
  Gamepad2,
} from "lucide-react-native";
import type { ExpenseCategory } from "@/types/expense";
import { tokens } from "@/lib/tokens";

type Props = {
  categories: ExpenseCategory[];
  totalAmount: number;
  onPressCategory?: (category: ExpenseCategory) => void;
};

const P = tokens.accent;
const FG = tokens.onSurface;
const MFG = tokens.onSurfaceVariant;
const ACCENT = tokens.surface;
const BORDER = tokens.outline;

const categoryIcons: Record<
  string,
  { icon: React.ReactElement; bg: string }
> = {
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

export default function CategoryBreakdownSheet({
  categories,
  totalAmount,
  onPressCategory,
}: Props) {
  const sorted = [...categories].sort((a, b) => b.percent - a.percent);

  return (
    <View>
      <View style={styles.header}>
        <Text style={styles.title}>Catégories de dépenses</Text>
        <Text style={styles.total}>{totalAmount.toLocaleString("fr-FR")} F</Text>
      </View>

      {sorted.map((cat) => {
        const color = CATEGORY_COLORS[cat.category] ?? MFG;
        const icon = categoryIcons[cat.category] ?? categoryIcons.AUTRES;
        const label = categoryLabels[cat.category] ?? cat.category;

        return (
          <Pressable
            key={cat.category}
            onPress={() => onPressCategory?.(cat)}
            style={({ pressed }) => [
              styles.row,
              pressed && styles.rowPressed,
            ]}
          >
            <View style={[styles.iconBox, { backgroundColor: icon.bg }]}>
              {icon.icon}
            </View>
            <View style={styles.content}>
              <View style={styles.labelRow}>
                <Text style={styles.name}>{label}</Text>
                <View style={[styles.colorDot, { backgroundColor: color }]} />
              </View>
              <View style={styles.barTrack}>
                <View
                  style={[
                    styles.barFill,
                    { width: `${cat.percent}%`, backgroundColor: color },
                  ]}
                />
              </View>
            </View>
            <View style={styles.right}>
              <Text style={styles.amount}>
                {cat.amount.toLocaleString("fr-FR")}
              </Text>
              <Text style={styles.percent}>{cat.percent}%</Text>
            </View>
          </Pressable>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 20,
  },
  title: {
    fontSize: 17,
    fontWeight: "600",
    color: FG,
  },
  total: {
    fontSize: 13,
    color: MFG,
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 14,
    gap: 10,
  },
  iconBox: {
    width: 36,
    height: 36,
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
  },
  content: {
    flex: 1,
  },
  labelRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    marginBottom: 6,
  },
  name: {
    fontSize: 13,
    fontWeight: "500",
    color: FG,
  },
  colorDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
  },
  barTrack: {
    height: 4,
    backgroundColor: tokens.surfaceDim,
    borderRadius: 2,
    overflow: "hidden",
  },
  barFill: {
    height: "100%",
    borderRadius: 2,
  },
  right: {
    alignItems: "flex-end",
  },
  amount: {
    fontSize: 13,
    fontWeight: "600",
    color: FG,
  },
  percent: {
    fontSize: 11,
    color: MFG,
    marginTop: 2,
  },
  rowPressed: {
    opacity: 0.6,
  },
});
