import { useRef, useMemo } from "react";
import { View, Text, ScrollView, Pressable, StyleSheet } from "react-native";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { ArrowLeft, Clock } from "lucide-react-native";
import { tokens } from "@/lib/tokens";
import { mockPaths } from "@/constants/mockEducation";
import { LessonItem } from "@/components/education/LessonItem";
import { ProgressBar } from "@/components/education/ProgressBar";

export default function PathDetail() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const scrollRef = useRef<ScrollView>(null);

  const path = useMemo(
    () => mockPaths.find((p) => p.id === id),
    [id],
  );

  if (!path) {
    return (
      <View style={styles.centered}>
        <Text style={styles.errorText}>Parcours introuvable</Text>
        <Pressable onPress={() => router.back()}>
          <Text style={styles.backLink}>Retour</Text>
        </Pressable>
      </View>
    );
  }

  const nextLessonIndex = path.lessons.findIndex(
    (l) => l.status === "available",
  );

  const handleLessonPress = (lessonId: string) => {
    router.push(`/education/lesson/${path.id}_${lessonId}` as any);
  };

  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
      <View style={styles.header}>
        <Pressable
          onPress={() => router.back()}
          style={({ pressed }) => [
            styles.backBtn,
            pressed && { opacity: 0.7 },
          ]}
        >
          <ArrowLeft size={22} color={tokens.onSurface} />
        </Pressable>
        <Text style={styles.headerTitle}>{path.title}</Text>
        <View style={styles.backBtn} />
      </View>

      <ScrollView
        ref={scrollRef}
        style={styles.scroll}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <Text style={styles.description}>{path.description}</Text>

        <View style={styles.stats}>
          <View style={styles.stat}>
            <Clock size={16} color={tokens.onSurfaceVariant} />
            <Text style={styles.statText}>{path.estimatedTime}</Text>
          </View>
          <View style={styles.statDot} />
          <Text style={styles.statText}>
            {path.lessonCount} leçons
          </Text>
        </View>

        <ProgressBar progress={path.progress} color={path.color} />

        <View style={styles.lessonsList}>
          {path.lessons.map((lesson, i) => (
            <View key={lesson.id}>
              <LessonItem
                lesson={lesson}
                onPress={() => handleLessonPress(lesson.id)}
              />
              {i < path.lessons.length - 1 && (
                <View
                  style={[
                    styles.connector,
                    lesson.status === "completed"
                      ? { backgroundColor: tokens.accent }
                      : { backgroundColor: tokens.surfaceDim },
                  ]}
                />
              )}
            </View>
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
    gap: 12,
  },
  errorText: {
    fontSize: 16,
    color: tokens.onSurfaceVariant,
    fontFamily: "DMSans_500Medium",
  },
  backLink: {
    fontSize: 14,
    color: tokens.accent,
    fontFamily: "DMSans_500Medium",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  backBtn: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: tokens.surface,
    alignItems: "center",
    justifyContent: "center",
  },
  headerTitle: {
    fontSize: 17,
    fontWeight: "600",
    color: tokens.onSurface,
    fontFamily: "DMSans_600SemiBold",
  },
  scroll: {
    flex: 1,
  },
  scrollContent: {
    padding: 16,
    paddingBottom: 120,
    gap: 16,
  },
  description: {
    fontSize: 14,
    color: tokens.onSurfaceVariant,
    lineHeight: 20,
    fontFamily: "DMSans_400Regular",
  },
  stats: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  stat: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
  },
  statText: {
    fontSize: 13,
    color: tokens.onSurfaceVariant,
    fontFamily: "DMSans_400Regular",
  },
  statDot: {
    width: 3,
    height: 3,
    borderRadius: 1.5,
    backgroundColor: tokens.outline,
  },
  lessonsList: {
    gap: 0,
    paddingTop: 8,
  },
  connector: {
    width: 2,
    height: 16,
    marginLeft: 35,
  },
});
