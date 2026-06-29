import { View, Text, ScrollView, StyleSheet } from "react-native";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { BookOpen, Clock } from "lucide-react-native";
import { tokens } from "@/lib/tokens";
import { useEducationPath } from "@/queries/useEducation";
import { SkeletonCard } from "@/components/ui/Skeleton";
import { ErrorState } from "@/components/ui/ErrorState";
import { LessonItem } from "@/components/education/LessonItem";
import { BackLink } from "@/components/ui/back-button";
import { PathBadge } from "@/components/education/PathBadge";

export default function PathDetail() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const { data: path, isLoading, error, refetch } = useEducationPath(id!);

  if (isLoading) {
    return (
      <View style={[styles.container, { paddingTop: insets.top }]}>
        <BackLink onPress={() => router.back()} />
        <View style={styles.scroll}>
          <View style={styles.scrollContent}>
            <SkeletonCard />
            <SkeletonCard />
            <SkeletonCard />
            <SkeletonCard />
          </View>
        </View>
      </View>
    );
  }

  if (error) {
    return (
      <View style={[styles.container, { paddingTop: insets.top }]}>
        <BackLink onPress={() => router.back()} />
        <ErrorState onRetry={refetch} />
      </View>
    );
  }

  if (!path) {
    return (
      <View style={[styles.container, { paddingTop: insets.top }]}>
        <BackLink onPress={() => router.back()} />
        <View style={styles.centered}>
          <Text style={styles.errorText}>Parcours introuvable</Text>
        </View>
      </View>
    );
  }

  const completedCount = path.lessons.filter((l) => l.status === "completed").length;
  const lessonCount = path.lessons.length;
  const progress = lessonCount > 0 ? (completedCount / lessonCount) * 100 : 0;

  const handleLesson = (lessonId: string) => {
    router.push(`/education/lesson/${path.id}_${lessonId}` as any);
  };

  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
      <BackLink onPress={() => router.back()} />

      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.header}>
          <BookOpen size={36} color={tokens.accent} />
          <View style={styles.headerTitles}>
            <Text style={styles.pathTitle}>{path.title}</Text>
            <Text style={styles.pathDesc}>{path.description}</Text>
          </View>
          <PathBadge category={path.category} />
        </View>

        <View style={styles.progRow}>
          <Text style={styles.progLabel}>
            Progression {completedCount}/{lessonCount} leçons
          </Text>
          <View style={styles.barBg}>
            <View
              style={[
                styles.barFill,
                {
                  width: `${Math.min(100, Math.max(0, progress))}%`,
                },
              ]}
            />
          </View>
        </View>

        <Text style={styles.lessonsTitle}>Leçons</Text>

        <View style={styles.lessonsList}>
          {path.lessons.map((lesson, i) => (
            <LessonItem
              key={lesson.id}
              lesson={lesson}
              index={i}
              hasQuiz={!!lesson.quiz}
              active={lesson.status === "available"}
              onPress={() => handleLesson(lesson.id)}
            />
          ))}
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: tokens.background,
  },
  centered: {
    flex: 1,
    backgroundColor: tokens.background,
    alignItems: "center",
    justifyContent: "center",
  },
  errorText: {
    fontSize: 16,
    color: tokens.onSurfaceVariant,
    fontFamily: "DMSans_500Medium",
  },
  scroll: {
    flex: 1,
  },
  scrollContent: {
    padding: 16,
    paddingBottom: 120,
    gap: 16,
  },
  header: {
    flexDirection: "row",
    alignItems: "flex-start",
    gap: 12,
  },
  headerTitles: {
    flex: 1,
    gap: 4,
  },
  pathTitle: {
    fontSize: 20,
    fontWeight: "600",
    color: tokens.onSurface,
    fontFamily: "DMSans_600SemiBold",
  },
  pathDesc: {
    fontSize: 11,
    fontWeight: "500",
    color: tokens.onSurfaceVariant,
    fontFamily: "DMSans_500Medium",
    lineHeight: 16,
  },
  progRow: {
    gap: 12,
  },
  progLabel: {
    fontSize: 12,
    fontWeight: "500",
    color: tokens.onSurfaceVariant,
    fontFamily: "DMSans_500Medium",
  },
  barBg: {
    height: 8,
    borderRadius: 4,
    backgroundColor: tokens.surfaceDim,
    overflow: "hidden",
  },
  barFill: {
    height: 8,
    borderRadius: 4,
    backgroundColor: tokens.accent,
  },
  lessonsTitle: {
    fontSize: 15,
    fontWeight: "600",
    color: tokens.onSurface,
    fontFamily: "DMSans_600SemiBold",
    marginTop: 8,
  },
  lessonsList: {
    gap: 8,
  },
});
