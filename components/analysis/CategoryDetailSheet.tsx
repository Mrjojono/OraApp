import { View, Text, StyleSheet } from "react-native";
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
import type { ExpenseCategory, RecurringExpense } from "@/types/expense";
import { tokens } from "@/lib/tokens";

type Props = {
  category: ExpenseCategory;
  totalExpenses: number;
  recurringItems: RecurringExpense[];
};

const FG = tokens.onSurface;
const MFG = tokens.onSurfaceVariant;
const P = tokens.accent;
const SURFACE = tokens.surface;
const BORDER = tokens.outline;
const DIM = tokens.surfaceDim;

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

const categoryIcons: Record<string, React.ReactElement> = {
  LOGEMENT: <Home size={22} color={P} />,
  NOURRITURE: <UtensilsCrossed size={22} color={P} />,
  TRANSPORT: <Car size={22} color={P} />,
  LOISIRS: <Gamepad2 size={22} color={P} />,
  SANTE: <Heart size={22} color={P} />,
  EDUCATION: <BookOpen size={22} color={P} />,
  SERVICES: <Wrench size={22} color={P} />,
  AUTRES: <MoreHorizontal size={22} color={P} />,
};

const frequencyLabels: Record<string, string> = {
  MONTHLY: "Mensuel",
  WEEKLY: "Hebdo",
  YEARLY: "Annuel",
  DAILY: "Quotidien",
};

export default function CategoryDetailSheet({
  category,
  totalExpenses,
  recurringItems,
}: Props) {
  const color = CATEGORY_COLORS[category.category] ?? MFG;
  const label = CATEGORY_LABELS[category.category] ?? category.category;
  const icon = categoryIcons[category.category] ?? categoryIcons.AUTRES;
  const avgPerTx = Math.round(category.amount / category.count);

  return (
    <View>
      <View style={styles.header}>
        <View style={[styles.iconLarge, { backgroundColor: color + "20" }]}>
          {icon}
        </View>
        <View style={styles.headerText}>
          <Text style={styles.title}>{label}</Text>
          <View style={styles.percentRow}>
            <View style={[styles.colorDot, { backgroundColor: color }]} />
            <Text style={styles.percent}>{category.percent}% du total</Text>
          </View>
        </View>
      </View>

      <View style={styles.statsGrid}>
        <View style={styles.statBox}>
          <Text style={styles.statValue}>
            {category.amount.toLocaleString("fr-FR")} F
          </Text>
          <Text style={styles.statLabel}>Montant total</Text>
        </View>
        <View style={styles.statBox}>
          <Text style={styles.statValue}>{category.percent}%</Text>
          <Text style={styles.statLabel}>Pourcentage</Text>
        </View>
        <View style={styles.statBox}>
          <Text style={styles.statValue}>{category.count}</Text>
          <Text style={styles.statLabel}>Transactions</Text>
        </View>
        <View style={styles.statBox}>
          <Text style={styles.statValue}>
            {avgPerTx.toLocaleString("fr-FR")} F
          </Text>
          <Text style={styles.statLabel}>Moyenne/transaction</Text>
        </View>
      </View>

      {recurringItems.length > 0 && (
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Dépenses récurrentes</Text>
          {recurringItems.map((item) => {
            const freq = frequencyLabels[item.frequency] ?? item.frequency;
            return (
              <View key={item.description} style={styles.recurRow}>
                <View style={styles.recurLeft}>
                  <Text style={styles.recurName}>{item.description}</Text>
                  <Text style={styles.recurMeta}>
                    {freq} · {item.occurrences} occurence
                    {item.occurrences > 1 ? "s" : ""}
                  </Text>
                </View>
                <Text style={styles.recurAmount}>
                  {item.averageAmount.toLocaleString("fr-FR")} F
                </Text>
              </View>
            );
          })}
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    flexDirection: "row",
    alignItems: "center",
    gap: 14,
    marginBottom: 24,
  },
  iconLarge: {
    width: 52,
    height: 52,
    borderRadius: 14,
    alignItems: "center",
    justifyContent: "center",
  },
  headerText: {
    flex: 1,
  },
  title: {
    fontSize: 20,
    fontWeight: "600",
    color: FG,
    marginBottom: 4,
  },
  percentRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
  },
  colorDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
  },
  percent: {
    fontSize: 13,
    color: MFG,
  },
  statsGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
    marginBottom: 24,
  },
  statBox: {
    width: "48%",
    backgroundColor: DIM,
    borderRadius: 10,
    padding: 14,
    gap: 4,
  },
  statValue: {
    fontSize: 16,
    fontWeight: "700",
    color: FG,
  },
  statLabel: {
    fontSize: 11,
    color: MFG,
  },
  section: {
    borderTopWidth: 1,
    borderTopColor: BORDER,
    paddingTop: 20,
  },
  sectionTitle: {
    fontSize: 14,
    fontWeight: "600",
    color: MFG,
    marginBottom: 14,
    textTransform: "uppercase",
    letterSpacing: 0.5,
  },
  recurRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 12,
  },
  recurLeft: {
    flex: 1,
  },
  recurName: {
    fontSize: 13,
    fontWeight: "500",
    color: FG,
    marginBottom: 2,
  },
  recurMeta: {
    fontSize: 11,
    color: MFG,
  },
  recurAmount: {
    fontSize: 13,
    fontWeight: "600",
    color: FG,
  },
});
