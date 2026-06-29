export type PathStatus = "recommended" | "in_progress" | "completed" | "new";
export type LessonStatus = "locked" | "available" | "completed";

export interface LessonContent {
  type: "paragraph" | "tip" | "highlight" | "bullet_list";
  text?: string;
  items?: string[];
  iconName?: string;
}

export interface EducationQuiz {
  id: string;
  questions: QuizQuestion[];
}

export interface QuizQuestion {
  id: string;
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
}

export interface QuizResult {
  quizId: string;
  pathId: string;
  score: number;
  correctCount: number;
  totalCount: number;
  answers: number[];
}

export interface EducationLesson {
  id: string;
  title: string;
  duration: string;
  status: LessonStatus;
  content: LessonContent[];
  keyTakeaways?: string[];
  quiz?: EducationQuiz;
}

export interface EducationPath {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  category: "debutant" | "budget" | "epargne" | "credit" | "investissement";
  iconName: string;
  color: string;
  progress: number;
  lessonCount: number;
  completedCount: number;
  estimatedTime: string;
  status: PathStatus;
  lessons: EducationLesson[];
}
