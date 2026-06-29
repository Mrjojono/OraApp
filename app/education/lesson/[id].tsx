import { useMemo, useRef } from "react";
import {
  View,
  Text,
  ScrollView,
  Pressable,
  StyleSheet,
} from "react-native";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { ArrowLeft, Lightbulb } from "lucide-react-native";
import { tokens } from "@/lib/tokens";
import { mockPaths } from "@/constants/mockEducation";
import { ProgressBar } from "@/components/education/ProgressBar";
import type { LessonContent as LessonContentType } from "@/types/education";

export default function Lesson() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const router = useRouter();

  const parts = id?.split("_") ?? [];
  const pathId = parts[0];
  const lessonId = parts[1];
  const insets = useSafeAreaInsets();

  const lesson = useMemo(() => {
    const path = mockPaths.find((p) => p.id === pathId);
    return path?.lessons.find((l) => l.id === lessonId) ?? null;
  }, [pathId, lessonId]);

  if (!lesson) {
    return (
      <View style={styles.centered}>
        <Text style={styles.errorText}>Leçon introuvable</Text>
        <Pressable onPress={() => router.back()}>
          <Text style={styles.backLink}>Retour</Text>
        </Pressable>
      </View>
    );
  }

  const handleContinue = () => {
    router.push(`/education/quiz/${pathId}_${lesson.id}` as any);
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
        <Text style={styles.headerTitle}>{lesson.title}</Text>
        <View style={styles.backBtn} />
      </View>

      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <ProgressBar progress={33} color={tokens.accent} />

        {lesson.content.map((block, i) => (
          <ContentBlock key={i} block={block} />
        ))}
      </ScrollView>

      <View style={styles.footer}>
        <Pressable
          onPress={handleContinue}
          style={({ pressed }) => [
            styles.continueBtn,
            pressed && { opacity: 0.85 },
          ]}
        >
          <Text style={styles.continueText}>
            {lesson.quiz ? "Passer le quiz" : "Terminer"}
          </Text>
        </Pressable>
      </View>
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
      return (
        <View key={block.text} style={styles.highlight}>
          <Lightbulb size={18} color={tokens.warning} />
          <Text style={styles.highlightText}>{block.text}</Text>
        </View>
      );
    case "tip":
      return (
        <View key={block.text} style={styles.tip}>
          <Lightbulb size={18} color={tokens.accent} />
          <Text style={styles.tipText}>{block.text}</Text>
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
    flex: 1,
    textAlign: "center",
    marginHorizontal: 8,
  },
  scroll: {
    flex: 1,
  },
  scrollContent: {
    padding: 16,
    paddingBottom: 32,
    gap: 18,
  },
  paragraph: {
    fontSize: 15,
    color: tokens.onSurface,
    fontFamily: "DMSans_400Regular",
    lineHeight: 22,
  },
  highlight: {
    flexDirection: "row",
    gap: 10,
    backgroundColor: tokens.warningBg,
    borderRadius: 12,
    padding: 14,
    alignItems: "flex-start",
  },
  highlightText: {
    flex: 1,
    fontSize: 14,
    color: tokens.warning,
    fontFamily: "DMSans_400Regular",
    lineHeight: 20,
  },
  tip: {
    flexDirection: "row",
    gap: 10,
    backgroundColor: tokens.accentContainer,
    borderRadius: 12,
    padding: 14,
    alignItems: "flex-start",
  },
  tipText: {
    flex: 1,
    fontSize: 14,
    color: tokens.accent,
    fontFamily: "DMSans_400Regular",
    lineHeight: 20,
  },
  bulletList: {
    gap: 10,
    paddingLeft: 4,
  },
  bulletRow: {
    flexDirection: "row",
    gap: 10,
    alignItems: "flex-start",
  },
  bullet: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: tokens.accent,
    marginTop: 8,
  },
  bulletText: {
    flex: 1,
    fontSize: 15,
    color: tokens.onSurface,
    fontFamily: "DMSans_400Regular",
    lineHeight: 22,
  },
  footer: {
    padding: 16,
    paddingBottom: 40,
    backgroundColor: tokens.background,
  },
  continueBtn: {
    backgroundColor: tokens.accent,
    borderRadius: 14,
    paddingVertical: 16,
    alignItems: "center",
  },
  continueText: {
    fontSize: 16,
    fontWeight: "700",
    color: tokens.onAccent,
    fontFamily: "DMSans_700Bold",
  },
});
