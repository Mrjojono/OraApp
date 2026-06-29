# Mock API Service Layer — Loading / Empty / Error States

## Contexte

5 pages de l'app utilisent des données mockées **synchrones** (import direct depuis `constants/mock*.ts`). Elles n'ont aucun état loading/empty/error. Lors du passage en production, ces pages doivent être prêtes à consommer de vraies APIs sans réécriture.

## Approche choisie

**Mock API service layer** — chaque ressource mockée est encapsulée dans un service async (`services/mock/*.ts`) qui retourne les données avec un délai simulé. Les pages consomment ces services via des **React Query hooks** (`queries/use*.ts`). Quand le vrai backend arrive, on change l'import dans le service — les hooks et les pages restent identiques.

## Architecture

```
constants/mock*.ts       ← données existantes (inchangées)
       ↓
services/mock/*.ts       ← wrapper async avec délai simulé
       ↓
queries/use*.ts          ← React Query (useQuery + useMutation)
       ↓
pages/*.tsx              ← utilisent les hooks, plus les import constants directs
```

### Principe du mock service

```ts
// services/mock/utils.ts
export function delay(ms = 500) {
  return new Promise(resolve => setTimeout(resolve, ms))
}

// services/mock/mockScoreService.ts
export async function fetchScore(): Promise<ScoreData> {
  await delay(600)
  return mockScoreData
}
```

Chaque fonction a une signature identique à ce que produirait le vrai backend — les pages n'ont pas besoin de savoir si c'est mocké ou réel.

## Composants partagés

### `components/ui/Skeleton.tsx`

- `<Skeleton width? height? borderRadius? />` — barre animée (pulse opacity)
- `<Skeleton.Card lines? />` — card avec N lignes
- `<Skeleton.SummaryRow count? />` — rangée de N cartes de summary
- `<Skeleton.List count? />` — N items dans une liste

### `components/ui/ErrorState.tsx`

Props:
- `title?: string` (défaut: "Une erreur est survenue")
- `message?: string`
- `onRetry?: () => void` — si présent, affiche un bouton "Réessayer"
- `icon?: ReactNode` — icône personnalisée (défaut: AlertCircle)

### `components/ui/EmptyState.tsx`

Props:
- `title?: string`
- `description?: string`
- `actionLabel?: string`
- `onAction?: () => void`
- `icon?: ReactNode`

## Hooks par page

### 1. Score (`(tabs)/score.tsx`)

**Service:** `services/mock/mockScoreService.ts`
- `fetchScore()` → `ScoreData`

**Hook:** `queries/useScore.ts`
- `useScore()` → `{ data, isLoading, error, refetch }`

**États:**
- Loading → Skeleton.Card
- Error → ErrorState(onRetry: refetch)
- Success → render content

### 2. Analyse (`(tabs)/analysis.tsx`)

**Service:** `services/mock/mockAnalysisService.ts`
- `fetchAnalysis(monthKey: string)` → `AnalyseMockData`
- `fetchAnalysisMonths()` → `{ monthKey: string; label: string }[]`

**Hook:** `queries/useAnalysis.ts`
- `useAnalysis(monthKey)` → `{ data, isLoading, error, refetch }`
- `useAnalysisMonths()` → `{ data, isLoading }`

**États:**
- Loading → Skeleton pour chaque section (SumCard, CategoriesCard, RecVarCard, RatioCard, AdviceCard, RevenueChart)
- Error → ErrorState(onRetry: refetch)
- Success → render content

**Note:** Le sélecteur de mois recharge la query avec un nouveau `monthKey`.

### 3. Éducation (`(tabs)/education.tsx`, `path/[id].tsx`, `lesson/[id].tsx`, `quiz/[id].tsx`, `results/[id].tsx`)

**Service:** `services/mock/mockEducationService.ts`
- `fetchPaths()` → `EducationPath[]`
- `fetchPath(id: string)` → `EducationPath`
- `fetchLesson(id: string)` → `EducationLesson`
- `submitQuiz(quizId: string, answers: number[])` → `QuizResult`

**Hook:** `queries/useEducation.ts`
- `useEducationPaths()` → `{ data, isLoading, error, refetch }`
- `useEducationPath(id)` → `{ data, isLoading, error }`
- `useSubmitQuiz()` → mutation

**États:**
- Loading → Skeleton cards (paths) / Skeleton lines (lessons)
- Error → ErrorState(onRetry: refetch)
- Empty → "Aucun parcours disponible" (education.tsx) / "Leçon introuvable" (lesson)
- Quiz → loading sur soumission (désactiver bouton + spinner)

### 4. Objectifs (`objectifs.tsx`)

**Service:** `services/mock/mockSavingsService.ts`
- `fetchGoals()` → `SavingGoal[]`
- `createGoal(data: Partial<SavingGoal>)` → `SavingGoal`
- `fetchSavingsRate()` → `SavingsRate`
- `fetchSavingsFrequency()` → `SavingsFrequency`
- `fetchSavingsRetention()` → `SavingsRetention`

**Hook:** `queries/useSavings.ts`
- `useSavingsGoals()` → `{ data, isLoading, error, refetch }`
- `useSavingsRate()` → `{ data, isLoading }`
- `useSavingsFrequency()` → `{ data, isLoading }`
- `useSavingsRetention()` → `{ data, isLoading }`
- `useCreateGoal()` → mutation avec `onSuccess: refetch goals`

**États:**
- Loading → Skeleton.SummaryRow(count: 3) + Skeleton.List(count: 3)
- Error → ErrorState(onRetry: refetch)
- Empty (goals) → EmptyState("Aucun objectif", "Créez votre premier objectif", action: openSheet)
- Mutation → loading sur bouton "Créer l'objectif"

**Note:** Les 3 indicateurs (rate/frequency/retention) sont chargés en parallèle avec `useQueries`.

### 5. Conseils (`conseils.tsx`)

**Service:** `services/mock/mockRecommendationsService.ts`
- `fetchRecommendations()` → `Recommendation[]`

**Hook:** `queries/useRecommendations.ts`
- `useRecommendations()` → `{ data, isLoading, error, refetch }`

**États:**
- Loading → Skeleton pour totalValue (BebasNeue) + featured card + liste
- Error → ErrorState(onRetry: refetch)
- Empty → "Aucune recommandation pour le moment"

## Simulation d'erreurs (dev)

Un flag `SIMULATE_ERROR` dans chaque service permet de tester les états d'erreur :

```ts
// services/mock/mockSavingsService.ts
const SIMULATE_ERROR = false // mettre à true pour tester

export async function fetchGoals(): Promise<SavingGoal[]> {
  await delay(500)
  if (SIMULATE_ERROR) throw new Error('Erreur réseau simulée')
  return [...mockGoals]
}
```

Bonus: une bascule globale via `__DEV__` + un switch dans les settings expo.

## Arbre de fichiers à créer

```
services/mock/
  utils.ts                        — delay(), randomDelay()
  mockScoreService.ts
  mockAnalysisService.ts
  mockEducationService.ts
  mockSavingsService.ts
  mockRecommendationsService.ts

queries/
  useScore.ts                     — nouveau
  useAnalysis.ts                  — nouveau
  useEducation.ts                 — nouveau
  useSavings.ts                   — nouveau
  useRecommendations.ts           — nouveau

components/ui/
  Skeleton.tsx                    — nouveau
  ErrorState.tsx                  — nouveau
  EmptyState.tsx                  — nouveau
```

## Pages à modifier

| Page | Changement |
|------|-----------|
| `(tabs)/score.tsx` | Remplacer `mockScoreData` par `useScore()` |
| `(tabs)/analysis.tsx` | Remplacer `analyseMockData[monthIndex]` par `useAnalysis(monthKey)` |
| `(tabs)/education.tsx` | Remplacer `mockPaths` par `useEducationPaths()` |
| `education/path/[id].tsx` | Remplacer `mockPaths.find()` par `useEducationPath(id)` |
| `education/lesson/[id].tsx` | Remplacer `mockPaths.find()` → `useEducationPath(id)` |
| `education/quiz/[id].tsx` | Remplacer mock → hooks + useSubmitQuiz mutation |
| `education/results/[id].tsx` | Remplacer mock → hooks |
| `objectifs.tsx` | Remplacer les 4 imports mock par leurs hooks respectifs |
| `conseils.tsx` | Remplacer `mockRecommendations` par `useRecommendations()` |

## Non-concerné

- Notifications (`notifications.tsx`) — déjà connectée à une API réelle
- Auth — déjà connectée
- SMS sync — déjà connecté
