import { View, Text, StyleSheet } from "react-native";
import { User } from "lucide-react-native";
import { tokens } from "@/lib/tokens";
import { useAuth } from "@/contexts/AuthContext";

export default function ProfileHeader() {
  const { user } = useAuth();

  return (
    <View style={styles.row}>
      <View style={styles.avatar}>
        <User size={28} color={tokens.onAccent} strokeWidth={2} />
      </View>
      <View style={styles.col}>
        <Text style={styles.name}>{user?.name ?? "K. Nestor"}</Text>
        <Text style={styles.account}>
          Compte: {user?.username ?? "CI0123456789"}
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: "row",
    alignItems: "center",
    gap: 16,
  },
  avatar: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: tokens.accent,
    alignItems: "center",
    justifyContent: "center",
  },
  col: {
    gap: 4,
  },
  name: {
    fontSize: 18,
    fontWeight: "600",
    color: tokens.onSurface,
  },
  account: {
    fontSize: 13,
    fontWeight: "400",
    color: tokens.onSurfaceVariant,
  },
});
