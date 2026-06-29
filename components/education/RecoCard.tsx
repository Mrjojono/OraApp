import { View, Text, Pressable, StyleSheet } from "react-native";
import { Sparkles, ChevronRight } from "lucide-react-native";
import { tokens } from "@/lib/tokens";

interface Props {
  title: string;
  reason: string;
  highlighted?: boolean;
  onPress: () => void;
}

export function RecoCard({ title, reason, highlighted, onPress }: Props) {
  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => [
        styles.card,
        highlighted && styles.highlighted,
        pressed && styles.pressed,
      ]}
    >
      <Sparkles size={20} color={highlighted ? tokens.accent : tokens.onSurfaceVariant} />
      <View style={styles.content}>
        <Text style={[styles.title, highlighted && styles.titleHighlighted]}>
          {title}
        </Text>
        <Text style={[styles.reason, highlighted && styles.reasonHighlighted]}>
          {reason}
        </Text>
      </View>
      <ChevronRight size={16} color={tokens.onSurfaceVariant} />
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    padding: 14,
    borderRadius: 12,
    backgroundColor: tokens.surface,
  },
  highlighted: {
    backgroundColor: "#1A3A1A",
  },
  pressed: { opacity: 0.85 },
  content: {
    flex: 1,
    gap: 3,
  },
  title: {
    fontSize: 13,
    fontWeight: "600",
    color: tokens.onSurface,
    fontFamily: "DMSans_600SemiBold",
  },
  titleHighlighted: {
    color: "#FFFFFF",
  },
  reason: {
    fontSize: 11,
    fontWeight: "500",
    color: tokens.onSurfaceVariant,
    fontFamily: "DMSans_500Medium",
  },
  reasonHighlighted: {
    color: tokens.onSurfaceVariant,
  },
});
