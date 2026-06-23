import { View, Text, Pressable, StyleSheet } from "react-native";
import { ChevronLeft, ChevronRight } from "lucide-react-native";
import { tokens } from "@/lib/tokens";

type Props = {
  currentLabel: string;
  onPrev: () => void;
  onNext: () => void;
  isFirst: boolean;
  isLast: boolean;
};

const FG = tokens.onSurface;
const MFG = tokens.onSurfaceVariant;
const P = tokens.accent;

export default function MonthPicker({
  currentLabel,
  onPrev,
  onNext,
  isFirst,
  isLast,
}: Props) {
  return (
    <View style={styles.header}>
      <Text style={styles.title}>Analyse</Text>
      <View style={styles.picker}>
        <Pressable
          onPress={onPrev}
          disabled={isFirst}
          style={({ pressed }) => [
            styles.arrow,
            isFirst && styles.arrowDisabled,
            pressed && !isFirst && styles.arrowPressed,
          ]}
        >
          <ChevronLeft
            size={18}
            color={isFirst ? tokens.muted : P}
            strokeWidth={2.5}
          />
        </Pressable>
        <Text style={styles.monthLabel}>{currentLabel}</Text>
        <Pressable
          onPress={onNext}
          disabled={isLast}
          style={({ pressed }) => [
            styles.arrow,
            isLast && styles.arrowDisabled,
            pressed && !isLast && styles.arrowPressed,
          ]}
        >
          <ChevronRight
            size={18}
            color={isLast ? tokens.muted : P}
            strokeWidth={2.5}
          />
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 16,
    marginBottom: 20,
    paddingHorizontal: 4,
  },
  title: {
    fontSize: 22,
    fontWeight: "600",
    color: FG,
  },
  picker: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  arrow: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: tokens.surface,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
    borderColor: tokens.outline,
  },
  arrowDisabled: {
    opacity: 0.4,
  },
  arrowPressed: {
    opacity: 0.7,
  },
  monthLabel: {
    fontSize: 13,
    fontWeight: "500",
    color: MFG,
    minWidth: 110,
    textAlign: "center",
  },
});
