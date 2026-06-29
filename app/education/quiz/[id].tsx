import { useState, useMemo, useCallback } from "react";
import {
  View,
  Text,
  ScrollView,
  Pressable,
  StyleSheet,
} from "react-native";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { ArrowLeft, X } from "lucide-react-native";
import { tokens } from "@/lib/tokens";
import { mockPaths } from "@/constants/mockEducation";
import { ProgressBar } from "@/components/education/ProgressBar";
import { QuizOption } from "@/components/education/QuizOption";

export default function Quiz() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const router = useRouter();

  const parts = id?.split("_") ?? [];
  const pathId = parts[0];
  const lessonId = parts[1];
  const insets = useSafeAreaInsets();

  const quiz = useMemo(() => {
    const path = mockPaths.find((p) => p.id === pathId);
    const lesson = path?.lessons.find((l) => l.id === lessonId);
    return lesson?.quiz ?? null;
  }, [pathId, lessonId]);

  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState<number[]>([]);
  const [showResult, setShowResult] = useState(false);

  if (!quiz || quiz.questions.length === 0) {
    return (
      <View style={styles.centered}>
        <Text style={styles.errorText}>Pas de quiz pour cette leçon</Text>
        <Pressable onPress={() => router.back()}>
          <Text style={styles.backLink}>Retour</Text>
        </Pressable>
      </View>
    );
  }

  const question = quiz.questions[currentIndex];
  const total = quiz.questions.length;
  const selectedIndex = answers[currentIndex] ?? -1;
  const isLast = currentIndex === total - 1;

  const handleSelect = useCallback(
    (optionIndex: number) => {
      if (showResult) return;
      const next = [...answers];
      next[currentIndex] = optionIndex;
      setAnswers(next);
    },
    [answers, currentIndex, showResult],
  );

  const handleNext = useCallback(() => {
    if (isLast) {
      const correctCount = quiz.questions.filter(
        (q, i) => answers[i] === q.correctIndex,
      ).length;
      const score = Math.round((correctCount / total) * 100);
      router.replace(
        `/education/results/${pathId}_${lessonId}?score=${score}&correct=${correctCount}&total=${total}&answers=${JSON.stringify(answers)}` as any,
      );
    } else {
      setCurrentIndex((i) => i + 1);
    }
  }, [isLast, quiz, answers, total, pathId, lessonId, router]);

  const progressPercent = ((currentIndex + 1) / total) * 100;

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
        <Text style={styles.headerTitle}>
          Question {currentIndex + 1}/{total}
        </Text>
        <Pressable
          onPress={() => router.back()}
          style={({ pressed }) => [
            styles.backBtn,
            pressed && { opacity: 0.7 },
          ]}
        >
          <X size={20} color={tokens.onSurfaceVariant} />
        </Pressable>
      </View>

      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <ProgressBar progress={progressPercent} color={tokens.accent} height={6} />

        <Text style={styles.question}>{question.question}</Text>

        <View style={styles.options}>
          {question.options.map((opt, i) => (
            <QuizOption
              key={i}
              label={opt}
              index={i}
              selected={selectedIndex === i}
              correct={showResult ? i === question.correctIndex : null}
              disabled={showResult || selectedIndex >= 0}
              onPress={() => handleSelect(i)}
            />
          ))}
        </View>

        {selectedIndex >= 0 && (
          <View style={styles.explanationBox}>
            <Text style={styles.explanationTitle}>
              {selectedIndex === question.correctIndex ? "✓ Correct" : "✗ Incorrect"}
            </Text>
            <Text style={styles.explanation}>{question.explanation}</Text>
          </View>
        )}
      </ScrollView>

      <View style={styles.footer}>
        <Pressable
          onPress={handleNext}
          disabled={selectedIndex < 0}
          style={({ pressed }) => [
            styles.nextBtn,
            selectedIndex < 0 && styles.nextBtnDisabled,
            pressed && selectedIndex >= 0 && { opacity: 0.85 },
          ]}
        >
          <Text
            style={[
              styles.nextText,
              selectedIndex < 0 && styles.nextTextDisabled,
            ]}
          >
            {isLast ? "Voir les résultats" : "Question suivante"}
          </Text>
        </Pressable>
      </View>
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
    fontSize: 15,
    fontWeight: "600",
    color: tokens.onSurface,
    fontFamily: "DMSans_600SemiBold",
  },
  scroll: {
    flex: 1,
  },
  scrollContent: {
    padding: 16,
    paddingBottom: 32,
    gap: 24,
  },
  question: {
    fontSize: 20,
    fontWeight: "700",
    color: tokens.onSurface,
    fontFamily: "DMSans_700Bold",
    lineHeight: 28,
  },
  options: {
    gap: 12,
  },
  explanationBox: {
    backgroundColor: tokens.surface,
    borderRadius: 14,
    padding: 16,
    gap: 6,
  },
  explanationTitle: {
    fontSize: 15,
    fontWeight: "700",
    color: tokens.onSurface,
    fontFamily: "DMSans_700Bold",
  },
  explanation: {
    fontSize: 14,
    color: tokens.onSurfaceVariant,
    fontFamily: "DMSans_400Regular",
    lineHeight: 20,
  },
  footer: {
    padding: 16,
    paddingBottom: 40,
    backgroundColor: tokens.background,
  },
  nextBtn: {
    backgroundColor: tokens.accent,
    borderRadius: 14,
    paddingVertical: 16,
    alignItems: "center",
  },
  nextBtnDisabled: {
    backgroundColor: tokens.surfaceDim,
  },
  nextText: {
    fontSize: 16,
    fontWeight: "700",
    color: tokens.onAccent,
    fontFamily: "DMSans_700Bold",
  },
  nextTextDisabled: {
    color: tokens.onSurfaceVariant,
  },
});
