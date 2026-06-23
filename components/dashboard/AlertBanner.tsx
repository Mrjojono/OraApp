import { StyleSheet, View, Text, Pressable } from "react-native";
import { AlertTriangle } from "lucide-react-native";
import { tokens } from "@/lib/tokens";

interface Props {
  title?: string;
  message?: string;
  cta?: string;
  onPress?: () => void;
}

export function AlertBanner({
  title = "Risque de découvert",
  message = "3 transactions imputées cette semaine",
  cta = "Voir les détails →",
  onPress,
}: Props) {
  return (
    <View style={styles.container}>
      <AlertTriangle size={20} color={tokens.warning} />
      <View style={styles.content}>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.message}>{message}</Text>
        <Pressable onPress={onPress}>
          <Text style={styles.cta}>{cta}</Text>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 13,
    marginBottom: 20,
    backgroundColor: tokens.warningBg,
    borderRadius: 14,
    padding: 12,
    flexDirection: "row",
    gap: 12,
    alignItems: "center",
  },
  content: { flex: 1, gap: 4 },
  title: {
    fontFamily: "PlusJakartaSans_600SemiBold",
    fontSize: 13,
    color: tokens.onSurface,
  },
  message: {
    fontFamily: "DMSans_500Medium",
    fontSize: 11,
    color: "#D0D0D0",
  },
  cta: {
    fontFamily: "PlusJakartaSans_600SemiBold",
    fontSize: 11,
    color: tokens.warning,
    marginTop: 2,
  },
});
