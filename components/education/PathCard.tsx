import { View, Text, Pressable, StyleSheet } from "react-native";
import {
  Wallet,
  PiggyBank,
  CreditCard,
  TrendingUp,
  BookOpen,
} from "lucide-react-native";
import type { EducationPath } from "@/types/education";
import { tokens } from "@/lib/tokens";
import { ProgressBar } from "./ProgressBar";

const iconMap: Record<string, React.ComponentType<{ size: number; color: string }>> = {
  Wallet,
  PiggyBank,
  CreditCard,
  TrendingUp,
  BookOpen,
};

interface Props {
  path: EducationPath;
  onPress: () => void;
}

export function PathCard({ path, onPress }: Props) {
  const Icon = iconMap[path.iconName] || BookOpen;
  const isComplete = path.status === "completed";
  const statusLabel =
    path.status === "recommended"
      ? "Recommandé"
      : path.status === "new"
        ? "Nouveau"
        : path.status === "in_progress"
          ? "En cours"
          : "Terminé";

  const statusColors = {
    background: isComplete
      ? tokens.accentContainer
      : path.status === "recommended"
        ? tokens.accentContainer
        : tokens.surfaceDim,
    text: isComplete
      ? tokens.accent
      : path.status === "recommended"
        ? tokens.accent
        : tokens.onSurfaceVariant,
  };

  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => [styles.card, pressed && styles.pressed]}
    >
      <View style={styles.topRow}>
        <View style={[styles.iconWrap, { backgroundColor: path.color + "20" }]}>
          <Icon size={22} color={path.color} />
        </View>
        <View
          style={[styles.badge, { backgroundColor: statusColors.background }]}
        >
          <Text style={[styles.badgeText, { color: statusColors.text }]}>
            {statusLabel}
          </Text>
        </View>
      </View>

      <Text style={styles.title}>{path.title}</Text>
      <Text style={styles.subtitle}>{path.subtitle}</Text>

      <ProgressBar progress={path.progress} color={path.color} />

      <View style={styles.meta}>
        <Text style={styles.metaText}>
          {path.completedCount}/{path.lessonCount} leçons
        </Text>
        <Text style={styles.metaDot}>·</Text>
        <Text style={styles.metaText}>{path.estimatedTime}</Text>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: tokens.surface,
    borderRadius: 16,
    padding: 20,
    gap: 12,
  },
  pressed: { opacity: 0.85 },
  topRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  iconWrap: {
    width: 44,
    height: 44,
    borderRadius: 14,
    alignItems: "center",
    justifyContent: "center",
  },
  badge: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 8,
  },
  badgeText: {
    fontSize: 11,
    fontWeight: "600",
    fontFamily: "DMSans_500Medium",
  },
  title: {
    fontSize: 18,
    fontWeight: "700",
    color: tokens.onSurface,
    fontFamily: "DMSans_700Bold",
  },
  subtitle: {
    fontSize: 13,
    color: tokens.onSurfaceVariant,
    lineHeight: 18,
    fontFamily: "DMSans_400Regular",
  },
  meta: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
  },
  metaText: {
    fontSize: 12,
    color: tokens.onSurfaceVariant,
    fontFamily: "DMSans_400Regular",
  },
  metaDot: {
    fontSize: 12,
    color: tokens.outline,
  },
});
