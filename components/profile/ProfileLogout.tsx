import { View, Text, Pressable, StyleSheet } from "react-native";
import { LogOut } from "lucide-react-native";
import { tokens } from "@/lib/tokens";
import { useAuth } from "@/contexts/AuthContext";
import { showAlert } from "@/components/ui/CustomAlert";

export default function ProfileLogout() {
  const { logout } = useAuth();

  const handleLogout = async () => {
    const result = await showAlert({
      title: "Déconnexion",
      message: "Êtes-vous sûr de vouloir vous déconnecter ?",
      buttons: [
        { text: "Annuler", style: "cancel" },
        { text: "Se déconnecter", style: "destructive", onPress: logout },
      ],
    });
  };

  return (
    <Pressable onPress={handleLogout} style={({ pressed }) => [
      styles.card,
      pressed && styles.cardPressed,
    ]}>
      <LogOut size={20} color={tokens.negative} strokeWidth={2} />
      <Text style={styles.label}>Se déconnecter</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 12,
    backgroundColor: tokens.surface,
    borderRadius: 8,
    padding: 16,
  },
  cardPressed: {
    backgroundColor: tokens.surfaceDim,
  },
  label: {
    fontSize: 15,
    fontWeight: "500",
    color: tokens.negative,
  },
});
