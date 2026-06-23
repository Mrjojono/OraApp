import { StyleSheet, View, Text, Pressable } from "react-native";
import { Lightbulb } from "lucide-react-native";
import { tokens } from "@/lib/tokens";

interface BudgetItem {
  label: string;
  amount: number;
  color: string;
  percent: number;
}

interface Props {
  title?: string;
  total?: string;
  items?: BudgetItem[];
  onSeeAll?: () => void;
  insightTitle?: string;
  insightMessage?: string;
}

const defaultItems: BudgetItem[] = [
  { label: "Logement", amount: 154000, color: tokens.accent, percent: 40 },
  { label: "Alimentation", amount: 96250, color: tokens.warning, percent: 25 },
  { label: "Transport", amount: 57750, color: "#4C9AFF", percent: 15 },
];

export function BudgetCard({
  title = "Dépenses du mois",
  total = "385 000 F",
  items = defaultItems,
  onSeeAll,
  insightTitle = "Astuce du jour",
  insightMessage = "Réduire vos abonnements pourrait vous faire économiser 12 500 F par mois.",
}: Props) {
  return (
    <View style={styles.card}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>{title}</Text>
        <Text style={styles.headerTotal}>{total}</Text>
      </View>

      {items.map((item) => (
        <View key={item.label} style={styles.budgetRow}>
          <View style={[styles.dot, { backgroundColor: item.color }]} />
          <Text style={styles.budgetLabel}>{item.label}</Text>
          <View style={styles.barTrack}>
            <View
              style={[
                styles.barFill,
                { width: `${item.percent}%`, backgroundColor: item.color },
              ]}
            />
          </View>
          <Text style={styles.budgetAmount}>
            {item.amount.toLocaleString("fr-FR")}
          </Text>
        </View>
      ))}

      {onSeeAll && (
        <Pressable
          onPress={onSeeAll}
          style={({ pressed }) => [
            styles.seeAllButton,
            pressed && styles.seeAllPressed,
          ]}
          android_ripple={{ color: tokens.accentContainer, borderless: false }}
        >
          <Text style={styles.seeAllText}>Voir toutes les catégories</Text>
        </Pressable>
      )}

      <View style={styles.insight}>
        <Lightbulb size={18} color={tokens.accent} />
        <View style={styles.insightContent}>
          <Text style={styles.insightTitle}>{insightTitle}</Text>
          <Text style={styles.insightMessage}>{insightMessage}</Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    marginHorizontal: 13,
    marginBottom: 20,
    backgroundColor: tokens.surface,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: tokens.outline,
    padding: 14,
    gap: 12,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  headerTitle: {
    fontFamily: "PlusJakartaSans_600SemiBold",
    fontSize: 15,
    color: tokens.onSurface,
  },
  headerTotal: {
    fontFamily: "DMSans_500Medium",
    fontSize: 13,
    color: tokens.onSurfaceVariant,
  },
  budgetRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
  },
  budgetLabel: {
    fontFamily: "DMSans_500Medium",
    fontSize: 13,
    color: tokens.onSurface,
    marginRight: 4,
  },
  barTrack: {
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
  budgetAmount: {
    fontFamily: "DMSans_500Medium",
    fontSize: 12,
    color: tokens.onSurfaceVariant,
    width: 56,
    textAlign: "right",
  },
  seeAllButton: {
    alignItems: "center",
    paddingVertical: 12,
    borderRadius: 10,
    backgroundColor: tokens.accentContainer,
  },
  seeAllPressed: {
    opacity: 0.6,
  },
  seeAllText: {
    fontFamily: "PlusJakartaSans_600SemiBold",
    fontSize: 13,
    color: tokens.accent,
  },
  insight: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    backgroundColor: tokens.surfaceDim,
    borderRadius: 10,
    padding: 12,
  },
  insightContent: { flex: 1, gap: 2 },
  insightTitle: {
    fontFamily: "PlusJakartaSans_600SemiBold",
    fontSize: 12,
    color: tokens.onSurface,
  },
  insightMessage: {
    fontFamily: "DMSans_400Regular",
    fontSize: 11,
    color: tokens.onSurfaceVariant,
  },
});
