import { View, Text, StyleSheet } from "react-native";
import type { VariableTransaction } from "@/types/expense";
import { tokens } from "@/lib/tokens";

type Props = {
  transactions: VariableTransaction[];
  totalAmount: number;
  totalCount: number;
  percent: number;
};

const FG = tokens.onSurface;
const MFG = tokens.onSurfaceVariant;
const BORDER = tokens.outline;

export default function VariableSheet({
  transactions,
  totalAmount,
  totalCount,
  percent,
}: Props) {
  if (transactions.length === 0) return null;

  return (
    <View>
      <View style={styles.header}>
        <Text style={styles.title}>Dépenses variables</Text>
        <View style={styles.headerRight}>
          <Text style={styles.count}>{totalCount} transactions</Text>
          <Text style={styles.total}>{totalAmount.toLocaleString("fr-FR")} F</Text>
        </View>
      </View>

      <View style={styles.summaryRow}>
        <View style={styles.summaryChip}>
          <Text style={styles.chipText}>{percent}% du total</Text>
        </View>
      </View>

      {transactions.map((txn, index) => (
        <View key={`${txn.description}-${index}`} style={styles.row}>
          <View style={styles.left}>
            <Text style={styles.name}>{txn.description}</Text>
            <Text style={styles.date}>
              {new Date(txn.date).toLocaleDateString("fr-FR", {
                day: "numeric",
                month: "short",
              })}
            </Text>
          </View>
          <Text style={styles.amount}>
            {txn.amount.toLocaleString("fr-FR")} F
          </Text>
        </View>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    marginBottom: 12,
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
  summaryRow: {
    flexDirection: "row",
    marginBottom: 16,
  },
  summaryChip: {
    backgroundColor: tokens.surfaceDim,
    borderRadius: 6,
    paddingHorizontal: 10,
    paddingVertical: 4,
  },
  chipText: {
    fontSize: 11,
    fontWeight: "500",
    color: MFG,
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: BORDER,
  },
  left: {},
  name: {
    fontSize: 13,
    fontWeight: "500",
    color: FG,
    marginBottom: 2,
  },
  date: {
    fontSize: 11,
    color: MFG,
  },
  amount: {
    fontSize: 14,
    fontWeight: "600",
    color: FG,
  },
});
