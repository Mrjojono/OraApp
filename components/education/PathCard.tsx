import { View, Text, Pressable, StyleSheet } from "react-native";
import {
  BookOpen,
  CreditCard,
  CircleDollarSign,
  Wallet,
  TrendingUp,
  PiggyBank,
} from "lucide-react-native";
import type { EducationPath } from "@/types/education";
import { tokens } from "@/lib/tokens";
import { PathBadge } from "@/components/education/PathBadge";

const iconMap: Record<string, React.ComponentType<{ size: number; color: string }>> = {
  BookOpen, CreditCard, CircleDollarSign, Wallet, TrendingUp, PiggyBank,
};

interface Props {
  path: EducationPath;
  onPress: () => void;
}

export function PathCard({ path, onPress }: Props) {
  const Icon = iconMap[path.iconName] || BookOpen;
  const completedCount = path.lessons.filter((l) => l.status === "completed").length;
  const lessonCount = path.lessons.length;
  const progress = lessonCount > 0 ? (completedCount / lessonCount) * 100 : 0;
  const progressLabel =
    progress >= 100
      ? "Terminé"
      : `${completedCount}/${lessonCount} leçons`;

  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => [styles.card, pressed && styles.pressed]}
    >
      <View style={styles.head}>
        <Icon size={32} color={tokens.accent} />
        <Text style={styles.title} numberOfLines={1}>
          {path.title}
        </Text>
        <PathBadge category={path.category} />
      </View>

      <Text style={styles.desc} numberOfLines={2}>
        {path.description}
      </Text>

      <View style={styles.progRow}>
        <Text style={styles.progLabel}>{progressLabel}</Text>
        <View style={styles.barBg}>
          <View
            style={[
              styles.barFill,
              {
                width: `${Math.min(100, Math.max(0, progress))}%`,
                backgroundColor: progress >= 100 ? tokens.positive : tokens.accent,
              },
            ]}
          />
        </View>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: tokens.surface,
    borderRadius: 14,
    padding: 20,
    gap: 12,
    borderWidth: 1,
    borderColor: "#2C2C2E",
  },
  pressed: { opacity: 0.85 },
  head: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
  title: {
    flex: 1,
    fontSize: 15,
    fontWeight: "600",
    color: tokens.onSurface,
    fontFamily: "DMSans_600SemiBold",
  },
  desc: {
    fontSize: 11,
    fontWeight: "500",
    color: tokens.onSurfaceVariant,
    fontFamily: "DMSans_500Medium",
    lineHeight: 16,
  },
  progRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
  progLabel: {
    fontSize: 11,
    fontWeight: "500",
    color: tokens.muted,
    fontFamily: "DMSans_500Medium",
  },
  barBg: {
    flex: 1,
    height: 8,
    borderRadius: 4,
    backgroundColor: "#2C2C2E",
    overflow: "hidden",
  },
  barFill: {
    height: 8,
    borderRadius: 4,
  },
});
