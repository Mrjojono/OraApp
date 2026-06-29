import { useState, useMemo, useCallback, useEffect, useRef } from "react";
import {
  View,
  Text,
  ScrollView,
  Pressable,
  StyleSheet,
  Animated,
} from "react-native";
import * as Haptics from "expo-haptics";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { tokens } from "@/lib/tokens";
import { useEducationPath } from "@/queries/useEducation";
import { SkeletonCard } from "@/components/ui/Skeleton";
import { ErrorState } from "@/components/ui/ErrorState";
import { QuizOption } from "@/components/education/QuizOption";
import { showAlert } from "@/components/ui/CustomAlert";
import { BackLink } from "@/components/ui/back-button";

export default function Quiz() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const router = useRouter();
  const insets = useSafeAreaInsets();

  const parts = id?.split("_") ?? [];
  const pathId = parts[0];
  const lessonId = parts[1];

  const { data: path, isLoading, error, refetch } = useEducationPath(pathId);

  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState<number[]>([]);

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
  const quiz = lesson?.quiz ?? null;
  const path_title = path?.title ?? "";

  if (!quiz || quiz.questions.length === 0) {
    return (
      <View style={[styles.container, { paddingTop: insets.top }]}>
        <BackLink onPress={() => router.back()} />
        <View style={styles.centered}>
          <Text style={styles.errorText}>Pas de quiz pour cette leçon</Text>
          <Pressable onPress={() => router.back()}>
            <Text style={styles.retourLink}>Retour</Text>
          </Pressable>
        </View>
      </View>
    );
  }

  const question = quiz.questions[currentIndex];
  const total = quiz.questions.length;
  const selectedIndex = answers[currentIndex] ?? -1;
  const isLast = currentIndex === total - 1;

  const handleSelect = useCallback(
    (optionIndex: number) => {
      if (selectedIndex >= 0) return;
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
      const next = [...answers];
      next[currentIndex] = optionIndex;
      setAnswers(next);
    },
    [answers, currentIndex, selectedIndex],
  );

  const animValue = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    animValue.setValue(0.85);
    Animated.timing(animValue, {
      toValue: 1,
      duration: 200,
      useNativeDriver: true,
    }).start();
  }, [currentIndex]);

  const handleNext = useCallback(() => {
    if (isLast) {
      Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
      const correctCount = quiz.questions.filter(
        (q, i) => answers[i] === q.correctIndex,
      ).length;
      const score = Math.round((correctCount / total) * 100);
      router.replace(
        `/education/results/${pathId}_${lessonId}?score=${score}&correct=${correctCount}&total=${total}&answers=${JSON.stringify(answers)}` as any,
      );
    } else {
      animValue.setValue(0.85);
      setCurrentIndex((i) => i + 1);
    }
  }, [isLast, quiz, answers, total, pathId, lessonId, router]);

  const progressPercent = ((currentIndex + 1) / total) * 100;

  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
      <BackLink
        onPress={() => {
          if (answers.length > 0) {
            showAlert({
              title: "Quitter le quiz ?",
              message: "Votre progression sera perdue.",
              buttons: [
                { text: "Annuler", style: "cancel" },
                { text: "Quitter", style: "destructive", onPress: () => router.replace(`/education/path/${pathId}` as any) },
              ],
            });
          } else {
            router.replace(`/education/path/${pathId}` as any);
          }
        }}
      />

      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <Text style={styles.quizTitle}>{path_title}</Text>

        <View style={styles.progRow}>
          <Text style={styles.progLabel}>
            Question {currentIndex + 1}/{total}
          </Text>
          <View style={styles.barBg}>
            <View
              style={[
                styles.barFill,
                { width: `${progressPercent}%` },
              ]}
            />
          </View>
        </View>

        <Animated.View style={[styles.questionCard, { opacity: animValue, transform: [{ scale: animValue }] }]}>
          <Text style={styles.questionText}>{question.question}</Text>
        </Animated.View>

        <View style={styles.choices}>
          {question.options.map((opt, i) => (
            <QuizOption
              key={i}
              label={opt}
              selected={selectedIndex === i}
              correct={selectedIndex >= 0 ? i === question.correctIndex : null}
              disabled={selectedIndex >= 0}
              onPress={() => handleSelect(i)}
            />
          ))}
        </View>
      </ScrollView>

      <View style={styles.footer}>
        <Pressable
          onPress={handleNext}
          disabled={selectedIndex < 0}
          style={({ pressed }) => [
            styles.cta,
            pressed && selectedIndex >= 0 && { opacity: 0.8 },
          ]}
        >
          <Text
            style={[
              styles.ctaText,
              selectedIndex < 0 && styles.ctaTextDisabled,
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
  retourLink: {
    fontSize: 14,
    color: tokens.accent,
    fontFamily: "DMSans_500Medium",
  },
  scroll: {
    flex: 1,
  },
  scrollContent: {
    padding: 16,
    paddingBottom: 100,
    gap: 20,
  },
  quizTitle: {
    fontSize: 22,
    fontWeight: "600",
    color: tokens.onSurface,
    fontFamily: "DMSans_600SemiBold",
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
    height: 6,
    borderRadius: 3,
    backgroundColor: tokens.surfaceDim,
    overflow: "hidden",
  },
  barFill: {
    height: 6,
    borderRadius: 3,
    backgroundColor: tokens.accent,
  },
  questionCard: {
    borderRadius: 14,
    backgroundColor: tokens.surface,
    borderWidth: 1,
    borderColor: tokens.outline,
    padding: 20,
  },
  questionText: {
    fontSize: 15,
    fontWeight: "500",
    color: tokens.onSurface,
    fontFamily: "DMSans_500Medium",
    lineHeight: 22,
  },
  choices: {
    gap: 10,
  },
  footer: {
    padding: 16,
    paddingBottom: 40,
    alignItems: "flex-end",
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
  ctaTextDisabled: {
    color: tokens.muted,
  },
});
