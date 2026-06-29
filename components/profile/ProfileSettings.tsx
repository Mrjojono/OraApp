import { View, Text, Pressable, StyleSheet } from "react-native";
import { Bell, Eye, Lock, Info } from "lucide-react-native";
import { ChevronRight } from "lucide-react-native";
import { useRouter } from "expo-router";
import { tokens } from "@/lib/tokens";

type SettingItem = {
  icon: typeof Bell;
  label: string;
  route: string;
};

const settings: SettingItem[] = [
  { icon: Bell, label: "Notifications", route: "/notifications" },
  { icon: Eye, label: "Confidentialité", route: "/confidentialite" },
  { icon: Lock, label: "Sécurité", route: "/securite" },
  { icon: Info, label: "À propos", route: "/a-propos" },
];

export default function ProfileSettings() {
  const router = useRouter();

  return (
    <View style={styles.card}>
      <Text style={styles.title}>Paramètres</Text>
      {settings.map((s, i) => {
        const Icon = s.icon;
        const isLast = i === settings.length - 1;
        return (
          <Pressable
            key={s.label}
            onPress={() => router.push(s.route as any)}
            style={({ pressed }) => [
              styles.row,
              pressed && styles.rowPressed,
              !isLast && styles.rowBorder,
            ]}
          >
            <Icon size={18} color={tokens.onSurfaceVariant} strokeWidth={2} />
            <Text style={styles.label}>{s.label}</Text>
            <ChevronRight
              size={16}
              color={tokens.muted}
              strokeWidth={2}
              style={styles.arrow}
            />
          </Pressable>
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
  rowPressed: {
    backgroundColor: tokens.accentContainer,
  },
  rowBorder: {
    borderBottomWidth: 0,
    borderBottomColor: tokens.outline,
  },
  label: {
    fontSize: 14,
    fontWeight: "500",
    color: tokens.onSurface,
    flex: 1,
  },
  arrow: {
    marginLeft: "auto",
  },
});
