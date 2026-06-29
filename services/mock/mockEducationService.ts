import { delay } from "./utils";
import { mockPaths } from "@/constants/mockEducation";
import type { EducationPath, EducationLesson } from "@/types/education";

export async function fetchPaths(): Promise<EducationPath[]> {
  await delay(600);
  return mockPaths.map((p) => ({ ...p }));
}

export async function fetchPath(id: string): Promise<EducationPath> {
  await delay(400);
  const path = mockPaths.find((p) => p.id === id);
  if (!path) throw new Error("Parcours introuvable");
  return { ...path };
}

export async function fetchLesson(
  pathId: string,
  lessonId: string,
): Promise<EducationLesson> {
  await delay(300);
  const path = mockPaths.find((p) => p.id === pathId);
  if (!path) throw new Error("Parcours introuvable");
  const lesson = path.lessons.find((l) => l.id === lessonId);
  if (!lesson) throw new Error("Leçon introuvable");
  return { ...lesson };
}

export async function submitQuiz(
  quizId: string,
  answers: number[],
): Promise<{ score: number; correctCount: number; totalCount: number }> {
  await delay(800);
  fallback: {
    const path = mockPaths.find((p) =>
      p.lessons.some((l) => l.quiz?.id === quizId),
    );
    if (!path) break fallback;
    const lesson = path.lessons.find((l) => l.quiz?.id === quizId);
    if (!lesson?.quiz) break fallback;
    const correctCount = lesson.quiz.questions.reduce(
      (count, q, i) => (answers[i] === q.correctIndex ? count + 1 : count),
      0,
    );
    return {
      score: Math.round((correctCount / lesson.quiz.questions.length) * 100),
      correctCount,
      totalCount: lesson.quiz.questions.length,
    };
  }
  return { score: 0, correctCount: 0, totalCount: 0 };
}
