import { View, Text, StyleSheet } from "react-native";
import { Lightbulb } from "lucide-react-native";
import { tokens } from "@/lib/tokens";

type Props = {
  severity: "INFO" | "WARNING";
  title: string;
  message: string;
};

export default function AdviceCard({ severity, title, message }: Props) {
  const isWarning = severity === "WARNING";

  return (
    <View
      style={[
        styles.card,
        isWarning ? styles.warningBg : styles.infoBg,
      ]}
    >
      <Lightbulb
        size={20}
        color={tokens.accent}
        strokeWidth={2}
      />
      <View style={styles.content}>
        <Text style={[styles.title, isWarning && { color: tokens.warning }]}>
          {title}
        </Text>
        <Text style={styles.message}>{message}</Text>
        <Text style={styles.cta}>Réduire de 10 000 F/mois →</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    borderRadius: 14,
    padding: 20,
    flexDirection: "row",
    gap: 12,
  },
  warningBg: {
    backgroundColor: tokens.warningBg,
    borderColor: "rgba(255,192,67,0.2)",
  },
  infoBg: {
    backgroundColor: tokens.surface,
  },
  content: {
    flex: 1,
    gap: 6,
  },
  title: {
    fontSize: 13,
    fontWeight: "600",
    color: tokens.onSurface,
  },
  message: {
    fontSize: 11,
    fontWeight: "500",
    color: "#D0D0D0",
    lineHeight: 16,
  },
  cta: {
    fontSize: 11,
    fontWeight: "600",
    color: tokens.accent,
  },
});
