import { View, Text, Pressable, StyleSheet } from "react-native";
import { CheckCircle, PlayCircle, Circle } from "lucide-react-native";
import type { EducationLesson } from "@/types/education";
import { tokens } from "@/lib/tokens";

interface Props {
  lesson: EducationLesson;
  index: number;
  active?: boolean;
  hasQuiz?: boolean;
  onPress: () => void;
}

export function LessonItem({ lesson, index, active, hasQuiz, onPress }: Props) {
  const isLocked = lesson.status === "locked";
  const isCompleted = lesson.status === "completed";

  let StatusIcon = Circle;
  let iconColor: string = tokens.muted;
  let numColor: string = tokens.muted;
  let titleColor: string = tokens.onSurface;
  let timeColor: string = tokens.muted;

  if (isCompleted) {
    StatusIcon = CheckCircle;
    iconColor = tokens.positive;
    numColor = tokens.muted;
  } else if (isLocked) {
    StatusIcon = Circle;
    iconColor = tokens.muted;
    numColor = tokens.muted;
    titleColor = tokens.onSurface;
  } else {
    StatusIcon = PlayCircle;
    iconColor = tokens.accent;
    numColor = tokens.accent;
    titleColor = tokens.accent;
  }

  const num = String(index + 1).padStart(2, "0");

  return (
    <Pressable
      onPress={onPress}
      disabled={isLocked}
      style={({ pressed }) => [
        styles.row,
        active && styles.active,
        pressed && !isLocked && styles.pressed,
      ]}
    >
      <Text style={[styles.num, { color: numColor }]}>{num}</Text>
      <View style={styles.content}>
        <Text style={[styles.title, { color: titleColor }]}>{lesson.title}</Text>
        <Text style={[styles.time, { color: timeColor }]}>{lesson.duration}</Text>
      </View>
      <View style={styles.end}>
        {hasQuiz && (
          <View style={styles.quizBadge}>
            <Text style={styles.quizBadgeText}>Quiz</Text>
          </View>
        )}
        <StatusIcon size={20} color={iconColor} />
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 12,
    gap: 12,
  },
  active: {
    backgroundColor: "rgba(52,199,89,0.25)",
  },
  pressed: { opacity: 0.7 },
  num: {
    fontSize: 13,
    fontWeight: "600",
    fontFamily: "DMSans_600SemiBold",
    width: 24,
  },
  content: {
    flex: 1,
    gap: 2,
  },
  title: {
    fontSize: 13,
    fontWeight: "500",
    fontFamily: "DMSans_500Medium",
  },
  time: {
    fontSize: 10,
    fontWeight: "500",
    fontFamily: "DMSans_500Medium",
  },
  end: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
  },
  quizBadge: {
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 4,
    backgroundColor: tokens.accentContainer,
  },
  quizBadgeText: {
    fontSize: 8,
    fontWeight: "600",
    color: tokens.accent,
    fontFamily: "DMSans_600SemiBold",
  },
});
