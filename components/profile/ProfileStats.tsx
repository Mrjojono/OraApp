import { View, Text, StyleSheet } from "react-native";
import { Banknote, HandCoins, PiggyBank, Star } from "lucide-react-native";
import { tokens } from "@/lib/tokens";

type StatItem = {
  icon: typeof Banknote;
  label: string;
  value: string;
};

const stats: StatItem[] = [
  { icon: Banknote, label: "Dépôts", value: "800K F" },
  { icon: HandCoins, label: "Prêts", value: "500K F" },
  { icon: PiggyBank, label: "Épargne", value: "150K F" },
  { icon: Star, label: "Score", value: "75/100" },
];

export default function ProfileStats() {
  return (
    <View style={styles.card}>
      <View style={styles.row}>
        {stats.slice(0, 2).map((s) => (
          <StatBox key={s.label} item={s} />
        ))}
      </View>
      <View style={styles.row}>
        {stats.slice(2).map((s) => (
          <StatBox key={s.label} item={s} />
        ))}
      </View>
    </View>
  );
}

function StatBox({ item }: { item: StatItem }) {
  const Icon = item.icon;
  return (
    <View style={styles.box}>
      <Icon size={20} color={tokens.accent} strokeWidth={2} />
      <Text style={styles.label}>{item.label}</Text>
      <Text style={styles.value}>{item.value}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
  },
  row: {
    flexDirection: "row",
    gap: 8,
    width: "100%",
  },
  box: {
    flex: 1,
    backgroundColor: tokens.surface,
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
    gap: 6,
    height: 80,
  },
  label: {
    fontSize: 11,
    fontWeight: "500",
    color: tokens.onSurfaceVariant,
  },
  value: {
    fontSize: 15,
    fontWeight: "700",
    color: tokens.onSurface,
  },
});
