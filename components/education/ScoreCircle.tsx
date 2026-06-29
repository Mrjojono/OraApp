import { View, Text, StyleSheet } from "react-native";
import Svg, { Circle as SvgCircle } from "react-native-svg";
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
      <Svg width={size} height={size}>
        <SvgCircle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke={tokens.surfaceDim}
          strokeWidth={strokeWidth}
          fill="none"
        />
        <SvgCircle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke={color}
          strokeWidth={strokeWidth}
          fill="none"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          strokeLinecap="round"
          rotation="-90"
          origin={`${size / 2}, ${size / 2}`}
        />
      </Svg>
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
  textWrap: {
    position: "absolute",
    alignItems: "center",
    justifyContent: "center",
  },
  scoreText: {
    fontSize: 28,
    fontWeight: "700",
    fontFamily: "DMSans_700Bold",
  },
});
