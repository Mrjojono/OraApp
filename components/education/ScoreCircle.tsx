import { View, Text, StyleSheet } from "react-native";
import { tokens } from "@/lib/tokens";

interface Props {
  score: number;
  size?: number;
  strokeWidth?: number;
}

export function ScoreCircle({ score, size = 120, strokeWidth = 6 }: Props) {
  const clamped = Math.min(100, Math.max(0, score));
  const color = clamped >= 80 ? tokens.accent : clamped >= 50 ? tokens.warning : tokens.negative;
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (clamped / 100) * circumference;

  return (
    <View style={[styles.container, { width: size, height: size }]}>
      <View
        style={[
          styles.circle,
          {
            width: size,
            height: size,
            borderRadius: size / 2,
            borderWidth: strokeWidth,
            borderColor: tokens.surfaceDim,
          },
        ]}
      />
      <View
        style={[
          styles.fillCircle,
          {
            width: size,
            height: size,
            borderRadius: size / 2,
            borderWidth: strokeWidth,
            borderColor: color,
            borderLeftColor: "transparent",
            borderBottomColor: "transparent",
          },
          { transform: [{ rotate: `${(clamped / 100) * 360}deg` }] },
        ]}
      />
      <View style={styles.textWrap}>
        <Text style={[styles.scoreText, { color }]}>{Math.round(clamped)}%</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    justifyContent: "center",
  },
  circle: {
    position: "absolute",
  },
  fillCircle: {
    position: "absolute",
  },
  textWrap: {
    alignItems: "center",
    justifyContent: "center",
  },
  scoreText: {
    fontSize: 28,
    fontWeight: "700",
    fontFamily: "DMSans_700Bold",
  },
});
