import { View, Text, StyleSheet } from "react-native";
import { Check, X } from "lucide-react-native";
import { tokens } from "@/lib/tokens";

interface Props {
  question: string;
  options: string[];
  selectedIndex: number;
  correctIndex: number;
  explanation: string;
}

export function ReviewCard({
  question,
  options,
  selectedIndex,
  correctIndex,
  explanation,
}: Props) {
  const isCorrect = selectedIndex === correctIndex;

  return (
    <View style={styles.card}>
      <View style={styles.header}>
        <View
          style={[
            styles.iconBox,
            { backgroundColor: isCorrect ? tokens.accentContainer : "rgba(255,69,58,0.12)" },
          ]}
        >
          {isCorrect ? (
            <Check size={16} color={tokens.accent} />
          ) : (
            <X size={16} color={tokens.negative} />
          )}
        </View>
        <Text style={styles.question}>{question}</Text>
      </View>
      {options.map((opt, i) => {
        const isSelected = i === selectedIndex;
        const isCorrectOpt = i === correctIndex;
        let color: string = tokens.onSurfaceVariant;
        let bg: string = "transparent";

        if (isCorrectOpt) {
          color = tokens.accent;
          bg = tokens.accentContainer;
        } else if (isSelected && !isCorrectOpt) {
          color = tokens.negative;
          bg = "rgba(255,69,58,0.12)";
        }

        return (
          <View key={i} style={[styles.optionRow, { backgroundColor: bg }]}>
            <Text style={[styles.optionText, { color }]}>{opt}</Text>
          </View>
        );
      })}
      <Text style={styles.explanation}>{explanation}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: tokens.surface,
    borderRadius: 14,
    padding: 18,
    gap: 10,
  },
  header: {
    flexDirection: "row",
    alignItems: "flex-start",
    gap: 10,
  },
  iconBox: {
    width: 28,
    height: 28,
    borderRadius: 14,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 1,
  },
  question: {
    flex: 1,
    fontSize: 15,
    fontWeight: "600",
    color: tokens.onSurface,
    fontFamily: "DMSans_500Medium",
    lineHeight: 21,
  },
  optionRow: {
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 8,
    marginLeft: 38,
  },
  optionText: {
    fontSize: 14,
    fontFamily: "DMSans_400Regular",
  },
  explanation: {
    fontSize: 13,
    color: tokens.onSurfaceVariant,
    fontFamily: "DMSans_400Regular",
    lineHeight: 18,
    marginTop: 4,
  },
});
