import { Pressable, Text, StyleSheet } from "react-native";
import { ChevronLeft } from "lucide-react-native";
import { tokens } from "@/lib/tokens";

interface Props {
  label?: string;
  onPress?: () => void;
}

export function BackLink({ label = "Retour", onPress }: Props) {
  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => [styles.row, pressed && { opacity: 0.7 }]}
    >
      <ChevronLeft size={20} color={tokens.accent} />
      <Text style={styles.label}>{label}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
  label: {
    fontSize: 14,
    fontWeight: "500",
    color: tokens.accent,
    fontFamily: "DMSans_500Medium",
  },
});
