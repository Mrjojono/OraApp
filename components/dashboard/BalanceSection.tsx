import { StyleSheet, View, Text } from "react-native";
import { tokens } from "@/lib/tokens";

interface Props {
  label?: string;
  amount?: string;
  changeText?: string;
  syncText?: string;
}

export function BalanceSection({
  label = "Solde disponible",
  amount = "1 250 000 F",
  changeText = "+12% ce mois",
  syncText = "Sync il y a 2 min",
}: Props) {
  return (
    <View style={styles.container}>
      <Text style={styles.label}>{label}</Text>
      <Text style={styles.amount}>{amount}</Text>
      <View style={styles.row}>
        <Text style={styles.change}>{changeText}</Text>
        <Text style={styles.sync}>{syncText}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { paddingHorizontal: 13, paddingBottom: 24, gap: 4 },
  label: {
    fontFamily: "DMSans_500Medium",
    fontSize: 13,
    color: "#8E8E93",
  },
  amount: {
    fontFamily: "BebasNeue_400Regular",
    fontSize: 44,
    color: tokens.onSurface,
    letterSpacing: -1,
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    marginTop: 4,
  },
  change: {
    fontFamily: "DMSans_500Medium",
    fontSize: 13,
    color: tokens.positive,
  },
  sync: {
    fontFamily: "DMSans_500Medium",
    fontSize: 11,
    color: tokens.muted,
  },
});
