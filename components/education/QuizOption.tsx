import { Text, Pressable, StyleSheet } from "react-native";
import { tokens } from "@/lib/tokens";

interface Props {
  label: string;
  index: number;
  selected: boolean;
  correct: boolean | null;
  disabled: boolean;
  onPress: () => void;
}

export function QuizOption({ label, index, selected, correct, disabled, onPress }: Props) {
  const letters = ["A", "B", "C", "D"];

  let bg: string = tokens.surface;
  let border: string = tokens.outline;
  let letterBg: string = tokens.surfaceDim;
  let letterColor: string = tokens.onSurfaceVariant;
  let textColor: string = tokens.onSurface;

  if (selected && correct === true) {
    bg = tokens.accentContainer;
    border = tokens.accent;
    letterBg = tokens.accent;
    letterColor = tokens.onAccent;
  } else if (selected && correct === false) {
    bg = "rgba(255,69,58,0.12)";
    border = tokens.negative;
    letterBg = tokens.negative;
    letterColor = tokens.onAccent;
  }

  return (
    <Pressable
      onPress={onPress}
      disabled={disabled}
      style={({ pressed }) => [
        styles.option,
        { backgroundColor: bg, borderColor: border },
        pressed && !disabled && styles.pressed,
      ]}
    >
      <View style={[styles.letter, { backgroundColor: letterBg }]}>
        <Text style={[styles.letterText, { color: letterColor }]}>
          {letters[index]}
        </Text>
      </View>
      <Text style={[styles.label, { color: textColor }]}>{label}</Text>
    </Pressable>
  );
}

// Need View import just for the letter circle
import { View } from "react-native";

const styles = StyleSheet.create({
  option: {
    flexDirection: "row",
    alignItems: "center",
    padding: 16,
    borderRadius: 12,
    borderWidth: 1,
    gap: 14,
  },
  pressed: { opacity: 0.8 },
  letter: {
    width: 32,
    height: 32,
    borderRadius: 16,
    alignItems: "center",
    justifyContent: "center",
  },
  letterText: {
    fontSize: 14,
    fontWeight: "700",
    fontFamily: "DMSans_700Bold",
  },
  label: {
    flex: 1,
    fontSize: 15,
    fontFamily: "DMSans_400Regular",
    lineHeight: 20,
  },
});
