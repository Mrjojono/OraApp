import { View, Text, Pressable, StyleSheet } from "react-native";
import { Lock, Play, Check, ChevronRight } from "lucide-react-native";
import type { EducationLesson } from "@/types/education";
import { tokens } from "@/lib/tokens";

interface Props {
  lesson: EducationLesson;
  onPress: () => void;
}

export function LessonItem({ lesson, onPress }: Props) {
  const isLocked = lesson.status === "locked";
  const isCompleted = lesson.status === "completed";

  const Icon = isCompleted ? Check : isLocked ? Lock : Play;
  const iconColor = isCompleted
    ? tokens.accent
    : isLocked
      ? tokens.outline
      : tokens.accent;

  return (
    <Pressable
      onPress={onPress}
      disabled={isLocked}
      style={({ pressed }) => [styles.row, pressed && !isLocked && styles.pressed]}
    >
      <View style={[styles.iconBox, isCompleted && styles.iconBoxCompleted]}>
        <Icon size={18} color={iconColor} />
      </View>
      <View style={styles.content}>
        <Text style={[styles.title, isLocked && styles.locked]}>{lesson.title}</Text>
        <Text style={styles.duration}>{lesson.duration}</Text>
      </View>
      {!isLocked && <ChevronRight size={18} color={tokens.onSurfaceVariant} />}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: "row",
    alignItems: "center",
    padding: 16,
    backgroundColor: tokens.surface,
    borderRadius: 12,
    gap: 14,
  },
  pressed: { opacity: 0.7 },
  iconBox: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: tokens.accentContainer,
    alignItems: "center",
    justifyContent: "center",
  },
  iconBoxCompleted: {
    backgroundColor: tokens.accentContainer,
  },
  content: {
    flex: 1,
    gap: 2,
  },
  title: {
    fontSize: 15,
    fontWeight: "600",
    color: tokens.onSurface,
    fontFamily: "DMSans_500Medium",
  },
  locked: {
    color: tokens.onSurfaceVariant,
  },
  duration: {
    fontSize: 12,
    color: tokens.onSurfaceVariant,
    fontFamily: "DMSans_400Regular",
  },
});
