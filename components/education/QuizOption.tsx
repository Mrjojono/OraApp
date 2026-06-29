import { View, Text, Pressable, StyleSheet } from "react-native";
import { Circle, CheckCircle } from "lucide-react-native";
import { tokens } from "@/lib/tokens";

interface Props {
  label: string;
  selected: boolean;
  correct: boolean | null;
  disabled: boolean;
  onPress: () => void;
}

export function QuizOption({ label, selected, correct, disabled, onPress }: Props) {
  let bg: string = tokens.surface;
  let border: string = tokens.outline;
  let textColor: string = tokens.onSurface;
  let iconColor: string = tokens.muted;
  const Icon = selected ? CheckCircle : Circle;

  if (selected && correct === true) {
    bg = tokens.accentContainer;
    border = tokens.accent;
    textColor = tokens.accent;
    iconColor = tokens.accent;
  } else if (selected && correct === false) {
    bg = "rgba(255,69,58,0.12)";
    border = tokens.negative;
    textColor = tokens.negative;
    iconColor = tokens.negative;
  } else if (selected) {
    bg = tokens.accentContainer;
    border = tokens.accent;
    textColor = tokens.accent;
    iconColor = tokens.accent;
  }

  return (
    <Pressable
      onPress={onPress}
      disabled={disabled}
      style={({ pressed }) => [
        styles.row,
        { backgroundColor: bg, borderColor: border },
        pressed && !disabled && styles.pressed,
      ]}
    >
      <Icon size={20} color={iconColor} />
      <Text style={[styles.label, { color: textColor }]}>{label}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: "row",
    alignItems: "center",
    padding: 20,
    borderRadius: 12,
    borderWidth: 1,
    gap: 12,
  },
  pressed: { opacity: 0.8 },
  label: {
    fontSize: 14,
    fontWeight: "500",
    fontFamily: "DMSans_500Medium",
  },
});
