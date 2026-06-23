import { StyleSheet, View, Text, Pressable } from "react-native";
import { Bell } from "lucide-react-native";
import { tokens } from "@/lib/tokens";

interface Props {
  greeting?: string;
}

export function HomeHeader({ greeting = "Bonjour, Marc" }: Props) {
  return (
    <View style={styles.container}>
      <Text style={styles.greeting}>{greeting}</Text>
      <Pressable
        style={({ pressed }) => [styles.notifBtn, pressed && styles.pressed]}
      >
        <Bell size={18} color={tokens.onSurface} />
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 13,
    paddingTop: 60,
    paddingBottom: 24,
  },
  greeting: {
    fontFamily: "DMSans_500Medium",
    fontSize: 20,
    color: tokens.onSurface,
  },
  notifBtn: {
    width: 36,
    height: 36,
    borderRadius: 8,
    backgroundColor: tokens.surface,
    borderWidth: 1,
    borderColor: tokens.outline,
    alignItems: "center",
    justifyContent: "center",
  },
  pressed: { opacity: 0.7 },
});
