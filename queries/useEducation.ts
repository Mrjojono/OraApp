import { useQuery, useMutation } from "@tanstack/react-query";
import {
  fetchPaths,
  fetchPath,
  fetchLesson,
  submitQuiz,
} from "@/services/mock/mockEducationService";

export function useEducationPaths() {
  return useQuery({
    queryKey: ["education", "paths"],
    queryFn: fetchPaths,
  });
}

export function useEducationPath(id: string) {
  return useQuery({
    queryKey: ["education", "path", id],
    queryFn: () => fetchPath(id),
    enabled: !!id,
  });
}

export function useEducationLesson(pathId: string, lessonId: string) {
  return useQuery({
    queryKey: ["education", "lesson", pathId, lessonId],
    queryFn: () => fetchLesson(pathId, lessonId),
    enabled: !!pathId && !!lessonId,
  });
}

export function useSubmitQuiz() {
  return useMutation({
    mutationFn: ({
      quizId,
      answers,
    }: {
      quizId: string;
      answers: number[];
    }) => submitQuiz(quizId, answers),
  });
}
