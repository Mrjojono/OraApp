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
import type { RecurringExpense } from "@/types/expense";
import { tokens } from "@/lib/tokens";

type Props = {
  expenses: RecurringExpense[];
  totalAmount: number;
  totalCount: number;
};

const P = tokens.accent;
const FG = tokens.onSurface;
const MFG = tokens.onSurfaceVariant;
const ACCENT = tokens.surface;

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

const frequencyLabels: Record<string, string> = {
  MONTHLY: "Mensuel",
  WEEKLY: "Hebdo",
  YEARLY: "Annuel",
  DAILY: "Quotidien",
};

export default function RecurringSheet({
  expenses,
  totalAmount,
  totalCount,
}: Props) {
  if (expenses.length === 0) return null;

  return (
    <View>
      <View style={styles.header}>
        <Text style={styles.title}>Dépenses récurrentes</Text>
        <View style={styles.headerRight}>
          <Text style={styles.count}>{totalCount} abonnements</Text>
          <Text style={styles.total}>{totalAmount.toLocaleString("fr-FR")} F</Text>
        </View>
      </View>

      {expenses.map((exp) => {
        const icon = categoryIcons[exp.category] ?? categoryIcons.AUTRES;
        const freq = frequencyLabels[exp.frequency] ?? exp.frequency;

        return (
          <View key={exp.description} style={styles.row}>
            <View style={[styles.iconBox, { backgroundColor: icon.bg }]}>
              {icon.icon}
            </View>
            <View style={styles.content}>
              <View style={styles.labelRow}>
                <Text style={styles.name}>{exp.description}</Text>
                <View style={styles.freqBadge}>
                  <Text style={styles.freqText}>{freq}</Text>
                </View>
              </View>
              <Text style={styles.detail}>
                {exp.averageAmount.toLocaleString("fr-FR")} F ·{" "}
                {exp.occurrences} occurrence
                {exp.occurrences > 1 ? "s" : ""} · Prochaine :{" "}
                {new Date(exp.nextExpectedDate).toLocaleDateString("fr-FR", {
                  day: "numeric",
                  month: "short",
                })}
              </Text>
            </View>
            <Text style={styles.amount}>
              {exp.averageAmount.toLocaleString("fr-FR")} F
            </Text>
          </View>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    marginBottom: 20,
  },
  title: {
    fontSize: 17,
    fontWeight: "600",
    color: FG,
  },
  headerRight: {
    alignItems: "flex-end",
  },
  count: {
    fontSize: 12,
    color: MFG,
    marginBottom: 2,
  },
  total: {
    fontSize: 13,
    fontWeight: "600",
    color: FG,
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
    marginBottom: 3,
  },
  name: {
    fontSize: 13,
    fontWeight: "500",
    color: FG,
  },
  freqBadge: {
    backgroundColor: ACCENT,
    borderRadius: 3,
    paddingHorizontal: 6,
    paddingVertical: 2,
  },
  freqText: {
    fontSize: 10,
    fontWeight: "600",
    color: P,
  },
  detail: {
    fontSize: 11,
    color: MFG,
  },
  amount: {
    fontSize: 13,
    fontWeight: "600",
    color: FG,
  },
});
