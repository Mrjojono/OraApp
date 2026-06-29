import { View, Text, StyleSheet } from "react-native";
import { Mail, Phone, CreditCard } from "lucide-react-native";
import { tokens } from "@/lib/tokens";
import { useAuth } from "@/contexts/AuthContext";

type InfoRow = {
  icon: typeof Mail;
  label: string;
  value: string;
};

export default function ProfileInfo() {
  const { user } = useAuth();

  const rows: InfoRow[] = [
    { icon: Mail, label: "Email", value: user?.email ?? "nestor@email.com" },
    {
      icon: Phone,
      label: "Téléphone",
      value: user?.username ?? "+225 01 02 03 04 05",
    },
    {
      icon: CreditCard,
      label: "Compte",
      value: "CI0123456789",
    },
  ];

  return (
    <View style={styles.card}>
      <Text style={styles.title}>Informations personnelles</Text>
      {rows.map((r, i) => {
        const Icon = r.icon;
        const isLast = i === rows.length - 1;
        return (
          <View key={r.label} style={[styles.row, !isLast && styles.rowBorder]}>
            <Icon size={18} color={tokens.onSurfaceVariant} strokeWidth={2} />
            <View style={styles.col}>
              <Text style={styles.label}>{r.label}</Text>
              <Text style={styles.value}>{r.value}</Text>
            </View>
          </View>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: tokens.surface,
    borderRadius: 8,
    paddingVertical: 4,
  },
  title: {
    fontSize: 15,
    fontWeight: "600",
    color: tokens.onSurface,
    marginBottom: 4,
    paddingHorizontal: 16,
    paddingTop: 14,
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    paddingVertical: 14,
    paddingHorizontal: 16,
  },
  col: {
    flex: 1,
    gap: 2,
  },
  label: {
    fontSize: 11,
    fontWeight: "500",
    color: tokens.onSurfaceVariant,
  },
  value: {
    fontSize: 14,
    fontWeight: "500",
    color: tokens.onSurface,
  },
  rowBorder: {
    borderBottomWidth: 0,
    borderBottomColor: tokens.outline,
  },
});
