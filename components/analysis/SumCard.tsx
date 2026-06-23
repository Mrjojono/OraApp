import { View, Text, Pressable, StyleSheet } from "react-native";
import { ChevronLeft, ChevronRight } from "lucide-react-native";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSequence,
  withTiming,
  type SharedValue,
} from "react-native-reanimated";
import { useEffect, useCallback } from "react";
import { tokens } from "@/lib/tokens";

type Props = {
  totalExpenses: number;
  transactionCount: number;
  averageTransaction: number;
  currentMonth: string;
  onPrevMonth: () => void;
  onNextMonth: () => void;
  onMonthLabelPress?: () => void;
  isFirst: boolean;
  isLast: boolean;
};

const FG = tokens.onSurface;
const MFG = tokens.onSurfaceVariant;

export default function SumCard({
  totalExpenses,
  transactionCount,
  averageTransaction,
  currentMonth,
  onPrevMonth,
  onNextMonth,
  onMonthLabelPress,
  isFirst,
  isLast,
}: Props) {
  const scale = useSharedValue(1);
  const prevGlow = useSharedValue(0);
  const nextGlow = useSharedValue(0);

  const amountStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
  }));

  const prevGlowStyle = useAnimatedStyle(() => ({
    opacity: prevGlow.value,
  }));

  const nextGlowStyle = useAnimatedStyle(() => ({
    opacity: nextGlow.value,
  }));

  useEffect(() => {
    scale.value = withSequence(
      withTiming(1.03, { duration: 100 }),
      withTiming(1, { duration: 150 }),
    );
  }, [totalExpenses]);

  const fireGlow = (sharedVal: SharedValue<number>) => {
    sharedVal.value = withSequence(
      withTiming(1, { duration: 80 }),
      withTiming(1, { duration: 150 }),
      withTiming(0, { duration: 150 }),
    );
  };

  const handlePrev = useCallback(() => {
    fireGlow(prevGlow);
    onPrevMonth();
  }, [onPrevMonth]);

  const handleNext = useCallback(() => {
    fireGlow(nextGlow);
    onNextMonth();
  }, [onNextMonth]);

  return (
    <View style={styles.wrapper}>
      <View style={styles.row1}>
        <Animated.Text style={[styles.amount, amountStyle]}>
          {totalExpenses.toLocaleString("fr-FR")} F
        </Animated.Text>
        <Text style={styles.count}>{transactionCount} transactions</Text>
      </View>

      <View style={styles.row2}>
        <Text style={styles.label}>Dépenses du mois</Text>
        <Text style={styles.avg}>
          Moy: {averageTransaction.toLocaleString("fr-FR")} F
        </Text>
      </View>

      <View style={styles.chip}>
        <Pressable onPress={handlePrev} disabled={isFirst} style={styles.arrow}>
          <View style={[styles.arrowTouch]}>
            <Animated.View style={[styles.glow, prevGlowStyle]} />
            <ChevronLeft
              size={16}
              color={isFirst ? tokens.muted : tokens.onSurface}
              strokeWidth={2.5}
            />
          </View>
        </Pressable>

        <Pressable onPress={onMonthLabelPress} style={styles.monthTouch}>
          <Text style={styles.monthLabel}>{currentMonth}</Text>
        </Pressable>

        <Pressable onPress={handleNext} disabled={isLast} style={styles.arrow}>
          <View style={[styles.arrowTouch]}>
            <Animated.View style={[styles.glow, nextGlowStyle]} />
            <ChevronRight
              size={16}
              color={isLast ? tokens.muted : tokens.onSurface}
              strokeWidth={2.5}
            />
          </View>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    gap: 10,
    paddingHorizontal: 13,
    paddingBottom: 10,
  },
  row1: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-end",
  },
  amount: {
    fontSize: 36,
    fontWeight: "700",
    color: FG,
    letterSpacing: -0.01,
  },
  count: {
    fontSize: 13,
    fontWeight: "500",
    color: MFG,
  },
  row2: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  label: {
    fontSize: 12,
    fontWeight: "500",
    color: MFG,
  },
  avg: {
    fontSize: 12,
    fontWeight: "500",
    color: MFG,
  },
  chip: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    alignSelf: "center",
    backgroundColor: tokens.surface,
    borderRadius: 10,
    marginTop: 20,
    paddingVertical: 2,
    paddingHorizontal: 2,
    gap: 8,
    minWidth: 300,
  },
  arrow: {
    width: 36,
    height: 36,
    borderRadius: 18,
    overflow: "hidden",
  },
  arrowTouch: {
    width: 36,
    height: 36,
    borderRadius: 18,
    alignItems: "center",
    justifyContent: "center",
  },
  glow: {
    ...StyleSheet.absoluteFillObject,
    borderRadius: 18,
    backgroundColor: tokens.accentContainer,
  },
  monthTouch: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 8,
  },
  monthLabel: {
    fontSize: 14,
    fontWeight: "600",
    color: FG,
    textAlign: "center",
  },
});
