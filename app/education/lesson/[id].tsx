import { View, Text, ScrollView, Pressable, StyleSheet } from "react-native";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { PlayCircle, Clock, ArrowRight } from "lucide-react-native";
import { tokens } from "@/lib/tokens";
import { useEducationPath } from "@/queries/useEducation";
import { SkeletonCard } from "@/components/ui/Skeleton";
import { ErrorState } from "@/components/ui/ErrorState";
import { LessonContent as LessonContentType } from "@/types/education";
import { BackLink } from "@/components/ui/back-button";

const badgeLabels: Record<string, string> = {
  debutant: "DEBUTANT",
  budget: "DEBUTANT",
  epargne: "AVANCE",
  credit: "INTERMEDIAIRE",
  investissement: "DEBUTANT",
};

export default function Lesson() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const router = useRouter();
  const insets = useSafeAreaInsets();

  const parts = id?.split("_") ?? [];
  const pathId = parts[0];
  const lessonId = parts[1];

  const { data: path, isLoading, error, refetch } = useEducationPath(pathId);

  if (isLoading) {
    return (
      <View style={[styles.container, { paddingTop: insets.top }]}>
        <BackLink onPress={() => router.back()} />
        <View style={styles.scroll}>
          <View style={styles.scrollContent}>
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

  const lesson = path?.lessons.find((l) => l.id === lessonId) ?? null;

  if (!lesson || !path) {
    return (
      <View style={styles.centered}>
        <Text style={styles.errorText}>Leçon introuvable</Text>
      </View>
    );
  }

  const badgeLabel = badgeLabels[path.category] || "DEBUTANT";

  const currentLessonIndex = path.lessons.findIndex((l) => l.id === lessonId);
  const nextLesson = currentLessonIndex >= 0
    ? path.lessons[currentLessonIndex + 1] ?? null
    : null;

  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
      <BackLink onPress={() => router.back()} />

      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <Text style={styles.lessonTitle}>{lesson.title}</Text>

        <View style={styles.videoCard}>
          <PlayCircle size={48} color={tokens.accent} />
          <Text style={styles.videoLabel}>Contenu vidéo bientôt disponible</Text>
        </View>

        <View style={styles.infoRow}>
          <View style={styles.badge}>
            <Text style={styles.badgeText}>{badgeLabel}</Text>
          </View>
          <View style={styles.timeRow}>
            <Clock size={14} color={tokens.onSurfaceVariant} />
            <Text style={styles.timeText}>{lesson.duration}</Text>
          </View>
        </View>

        <View style={styles.contentCard}>
          <Text style={styles.contentCardTitle}>Contenu de la leçon</Text>
          {lesson.content.map((block, i) => (
            <ContentBlock key={i} block={block} />
          ))}
        </View>

        {lesson.keyTakeaways && lesson.keyTakeaways.length > 0 && (
          <View style={styles.summaryCard}>
            <Text style={styles.summaryTitle}>A retenir</Text>
            {lesson.keyTakeaways.map((item, i) => (
              <View key={i} style={styles.summaryRow}>
                <View style={styles.summaryBullet} />
                <Text style={styles.summaryText}>{item}</Text>
              </View>
            ))}
          </View>
        )}

        {nextLesson && nextLesson.status !== "locked" && (
          <Pressable
            onPress={() => router.replace(`/education/lesson/${path.id}_${nextLesson.id}` as any)}
            style={({ pressed }) => [styles.nextLesson, pressed && { opacity: 0.8 }]}
          >
            <View style={styles.nextLessonContent}>
              <Text style={styles.nextLessonLabel}>Leçon suivante</Text>
              <Text style={styles.nextLessonTitle}>{nextLesson.title}</Text>
            </View>
            <ArrowRight size={18} color={tokens.accent} />
          </Pressable>
        )}
      </ScrollView>

      {lesson.quiz && (
        <View style={styles.footer}>
          <Pressable
            onPress={() => router.replace(`/education/quiz/${path.id}_${lesson.id}` as any)}
            style={({ pressed }) => [
              styles.cta,
              pressed && { opacity: 0.8 },
            ]}
          >
            <Text style={styles.ctaText}>Passer le Quiz</Text>
          </Pressable>
        </View>
      )}
    </View>
  );
}

function ContentBlock({ block }: { block: LessonContentType }) {
  switch (block.type) {
    case "paragraph":
      return (
        <Text key={block.text} style={styles.paragraph}>
          {block.text}
        </Text>
      );
    case "highlight":
    case "tip":
      return (
        <View key={block.text} style={block.type === "highlight" ? styles.highlight : styles.tip}>
          <Text
            style={
              block.type === "highlight" ? styles.highlightText : styles.tipText
            }
          >
            {block.text}
          </Text>
        </View>
      );
    case "bullet_list":
      return (
        <View key={block.items?.join("")} style={styles.bulletList}>
          {block.items?.map((item, i) => (
            <View key={i} style={styles.bulletRow}>
              <View style={styles.bullet} />
              <Text style={styles.bulletText}>{item}</Text>
            </View>
          ))}
        </View>
      );
    default:
      return null;
  }
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
    paddingBottom: 100,
    gap: 16,
  },
  lessonTitle: {
    fontSize: 20,
    fontWeight: "600",
    color: tokens.onSurface,
    fontFamily: "DMSans_600SemiBold",
    lineHeight: 26,
  },
  videoCard: {
    height: 180,
    borderRadius: 14,
    backgroundColor: tokens.surface,
    alignItems: "center",
    justifyContent: "center",
    gap: 12,
  },
  videoLabel: {
    fontSize: 11,
    color: tokens.onSurfaceVariant,
    fontFamily: "DMSans_500Medium",
  },
  infoRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
  badge: {
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 6,
    backgroundColor: tokens.accentContainer,
  },
  badgeText: {
    fontSize: 9,
    fontWeight: "600",
    color: tokens.accent,
    fontFamily: "DMSans_600SemiBold",
  },
  timeRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
  },
  timeText: {
    fontSize: 11,
    fontWeight: "500",
    color: tokens.onSurfaceVariant,
    fontFamily: "DMSans_500Medium",
  },
  contentCard: {
    borderRadius: 14,
    backgroundColor: tokens.surface,
    borderWidth: 1,
    borderColor: tokens.outline,
    padding: 20,
    gap: 12,
  },
  contentCardTitle: {
    fontSize: 15,
    fontWeight: "600",
    color: tokens.onSurface,
    fontFamily: "DMSans_600SemiBold",
  },
  paragraph: {
    fontSize: 12,
    color: tokens.onSurfaceVariant,
    fontFamily: "DMSans_400Regular",
    lineHeight: 17,
  },
  highlight: {
    backgroundColor: tokens.warningBg,
    borderRadius: 10,
    padding: 12,
  },
  highlightText: {
    fontSize: 12,
    color: tokens.warning,
    fontFamily: "DMSans_400Regular",
    lineHeight: 17,
  },
  tip: {
    backgroundColor: tokens.accentContainer,
    borderRadius: 10,
    padding: 12,
  },
  tipText: {
    fontSize: 12,
    color: tokens.accent,
    fontFamily: "DMSans_400Regular",
    lineHeight: 17,
  },
  bulletList: {
    gap: 8,
  },
  bulletRow: {
    flexDirection: "row",
    gap: 8,
    alignItems: "flex-start",
  },
  bullet: {
    width: 5,
    height: 5,
    borderRadius: 2.5,
    backgroundColor: tokens.accent,
    marginTop: 6,
  },
  bulletText: {
    flex: 1,
    fontSize: 12,
    color: tokens.onSurfaceVariant,
    fontFamily: "DMSans_400Regular",
    lineHeight: 17,
  },
  summaryCard: {
    borderRadius: 14,
    backgroundColor: "#3A2A1A",
    padding: 20,
    gap: 10,
  },
  summaryTitle: {
    fontSize: 13,
    fontWeight: "600",
    color: tokens.onSurface,
    fontFamily: "DMSans_600SemiBold",
  },
  summaryRow: {
    flexDirection: "row",
    gap: 8,
    alignItems: "flex-start",
  },
  summaryBullet: {
    width: 5,
    height: 5,
    borderRadius: 2.5,
    backgroundColor: tokens.warning,
    marginTop: 6,
  },
  summaryText: {
    flex: 1,
    fontSize: 11,
    fontWeight: "500",
    color: tokens.onSurfaceVariant,
    fontFamily: "DMSans_500Medium",
    lineHeight: 16,
  },
  nextLesson: {
    flexDirection: "row",
    alignItems: "center",
    borderRadius: 14,
    backgroundColor: tokens.surface,
    borderWidth: 1,
    borderColor: tokens.outline,
    padding: 16,
    gap: 12,
  },
  nextLessonContent: {
    flex: 1,
    gap: 4,
  },
  nextLessonLabel: {
    fontSize: 10,
    fontWeight: "500",
    color: tokens.onSurfaceVariant,
    fontFamily: "DMSans_500Medium",
  },
  nextLessonTitle: {
    fontSize: 13,
    fontWeight: "600",
    color: tokens.onSurface,
    fontFamily: "DMSans_600SemiBold",
  },
  footer: {
    padding: 16,
    paddingBottom: 40,
    alignItems: "center",
  },
  cta: {
    paddingHorizontal: 32,
    paddingVertical: 14,
    borderRadius: 12,
  },
  ctaText: {
    fontSize: 14,
    fontWeight: "600",
    color: tokens.accent,
    fontFamily: "DMSans_600SemiBold",
  },
});
