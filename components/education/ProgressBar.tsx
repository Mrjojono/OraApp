import { View, StyleSheet } from "react-native";
import { tokens } from "@/lib/tokens";

interface Props {
  progress: number;
  color?: string;
  height?: number;
}

export function ProgressBar({ progress, color = tokens.accent, height = 4 }: Props) {
  return (
    <View style={[styles.track, { height }]}>
      <View
        style={[
          styles.fill,
          {
            width: `${Math.min(100, Math.max(0, progress))}%`,
            height,
            backgroundColor: color,
          },
        ]}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  track: {
    width: "100%",
    borderRadius: 2,
    backgroundColor: tokens.surfaceDim,
    overflow: "hidden",
  },
  fill: {
    borderRadius: 2,
  },
});
