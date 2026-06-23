import { View, Text, Pressable, StyleSheet } from "react-native";
import { Repeat, TrendingUp } from "lucide-react-native";
import { tokens } from "@/lib/tokens";

type Props = {
  recurringTotal: number;
  recurringCount: number;
  recurringPercent: number;
  variableTotal: number;
  variableCount: number;
  variablePercent: number;
  onPressRecurring: () => void;
  onPressVariable: () => void;
};

const FG = tokens.onSurface;
const MFG = tokens.onSurfaceVariant;
const BORDER = tokens.outline;
const SURFACE = tokens.surface;

export default function RecVarCard({
  recurringTotal,
  recurringCount,
  recurringPercent,
  variableTotal,
  variableCount,
  variablePercent,
  onPressRecurring,
  onPressVariable,
}: Props) {
  return (
    <View style={styles.container}>
      <Pressable
        onPress={onPressRecurring}
        style={({ pressed }) => [styles.box, pressed && styles.pressed]}
      >
        <Repeat size={20} color={tokens.accent} strokeWidth={2} />
        <Text style={styles.boxTitle}>Récurrentes</Text>
        <Text style={styles.boxAmount}>
          {recurringTotal.toLocaleString("fr-FR")} F
        </Text>
        <Text style={styles.boxSub}>
          {recurringPercent}% · {recurringCount} abo
          {recurringCount > 1 ? "s" : ""}
        </Text>
      </Pressable>

      <Pressable
        onPress={onPressVariable}
        style={({ pressed }) => [styles.box, pressed && styles.pressed]}
      >
        <TrendingUp size={20} color={tokens.warning} strokeWidth={2} />
        <Text style={styles.boxTitle}>Variables</Text>
        <Text style={styles.boxAmount}>
          {variableTotal.toLocaleString("fr-FR")} F
        </Text>
        <Text style={styles.boxSub}>
          {variablePercent}% · {variableCount} txn
        </Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    gap: 12,
  },
  box: {
    flex: 1,
    backgroundColor: SURFACE,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: BORDER,
    padding: 20,
    gap: 12,
  },
  pressed: {
    opacity: 0.7,
  },
  boxTitle: {
    fontSize: 13,
    fontWeight: "600",
    color: FG,
  },
  boxAmount: {
    fontSize: 22,
    fontWeight: "700",
    color: FG,
  },
  boxSub: {
    fontSize: 12,
    fontWeight: "500",
    color: MFG,
  },
});
