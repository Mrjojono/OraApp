import { useMemo } from "react";
import { View, Text, ScrollView, Pressable, StyleSheet } from "react-native";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Home, RotateCcw } from "lucide-react-native";
import { tokens } from "@/lib/tokens";
import { mockPaths } from "@/constants/mockEducation";
import { ScoreCircle } from "@/components/education/ScoreCircle";
import { ReviewCard } from "@/components/education/ReviewCard";

export default function Results() {
  const { id, score, correct, total, answers: answersRaw } =
    useLocalSearchParams<{
      id: string;
      score: string;
      correct: string;
      total: string;
      answers: string;
    }>();
  const router = useRouter();

  const parts = id?.split("_") ?? [];
  const pathId = parts[0];
  const lessonId = parts[1];

  const { quiz, lessonTitle } = useMemo(() => {
    const path = mockPaths.find((p) => p.id === pathId);
    const lesson = path?.lessons.find((l) => l.id === lessonId);
    return { quiz: lesson?.quiz ?? null, lessonTitle: lesson?.title ?? "" };
  }, [pathId, lessonId]);

  const scoreNum = parseInt(score ?? "0", 10);
  const correctNum = parseInt(correct ?? "0", 10);
  const totalNum = parseInt(total ?? "0", 10);
  const insets = useSafeAreaInsets();
  const answers: number[] = useMemo(() => {
    try {
      return answersRaw ? JSON.parse(answersRaw) : [];
    } catch {
      return [];
    }
  }, [answersRaw]);

  const passed = scoreNum >= 70;

  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.hero}>
          <ScoreCircle score={scoreNum} />
          <Text style={styles.title}>
            {passed ? "Bravo !" : "Continuez à apprendre"}
          </Text>
          <Text style={styles.subtitle}>
            {passed
              ? "Vous avez réussi ce quiz !"
              : "Revisions et réessayez"}
          </Text>
          <Text style={styles.detail}>
            {correctNum}/{totalNum} bonnes réponses
          </Text>
        </View>

        {quiz?.questions.map((q, i) => (
          <ReviewCard
            key={q.id}
            question={q.question}
            options={q.options}
            selectedIndex={answers[i] ?? -1}
            correctIndex={q.correctIndex}
            explanation={q.explanation}
          />
        ))}
      </ScrollView>

      <View style={styles.footer}>
        <Pressable
          onPress={() =>
            router.replace(`/education/path/${pathId}` as any)
          }
          style={({ pressed }) => [
            styles.btnPrimary,
            pressed && { opacity: 0.85 },
          ]}
        >
          <Home size={20} color={tokens.onAccent} />
          <Text style={styles.btnPrimaryText}>Retour au parcours</Text>
        </Pressable>
        <Pressable
          onPress={() =>
            router.replace(`/education/quiz/${pathId}_${lessonId}` as any)
          }
          style={({ pressed }) => [
            styles.btnSecondary,
            pressed && { opacity: 0.7 },
          ]}
        >
          <RotateCcw size={18} color={tokens.accent} />
          <Text style={styles.btnSecondaryText}>Réessayer</Text>
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
  scroll: {
    flex: 1,
  },
  scrollContent: {
    padding: 16,
    paddingBottom: 32,
    gap: 16,
  },
  hero: {
    alignItems: "center",
    paddingVertical: 32,
    gap: 10,
  },
  title: {
    fontSize: 26,
    fontWeight: "700",
    color: tokens.onSurface,
    fontFamily: "DMSans_700Bold",
  },
  subtitle: {
    fontSize: 15,
    color: tokens.onSurfaceVariant,
    fontFamily: "DMSans_400Regular",
  },
  detail: {
    fontSize: 14,
    color: tokens.accent,
    fontWeight: "600",
    fontFamily: "DMSans_600SemiBold",
  },
  footer: {
    padding: 16,
    paddingBottom: 40,
    gap: 10,
    backgroundColor: tokens.background,
  },
  btnPrimary: {
    flexDirection: "row",
    backgroundColor: tokens.accent,
    borderRadius: 14,
    paddingVertical: 16,
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
  },
  btnPrimaryText: {
    fontSize: 16,
    fontWeight: "700",
    color: tokens.onAccent,
    fontFamily: "DMSans_700Bold",
  },
  btnSecondary: {
    flexDirection: "row",
    borderRadius: 14,
    paddingVertical: 14,
    alignItems: "center",
    justifyContent: "center",
    gap: 6,
    backgroundColor: tokens.surface,
  },
  btnSecondaryText: {
    fontSize: 15,
    fontWeight: "600",
    color: tokens.accent,
    fontFamily: "DMSans_600SemiBold",
  },
});
