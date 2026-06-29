# OraApp

Assistant de monitoring financier personnel connecté à Orabank (Afrique de l'Ouest).

## Stack

- **Framework:** Expo v54 (React Native, file-based router)
- **Langue:** TypeScript
- **State:** Zustand stores + React Query (TanStack Query)
- **HTTP:** Axios avec intercepteurs JWT + refresh automatique
- **Mobile Money:** Synchronisation SMS MTN MoMo

## Architecture des données

L'app utilise un **mix de données mockées et d'API réelles** selon la maturité de chaque fonctionnalité.

### 1. Pages connectées à une API réelle (prod-ready)

| Page | Endpoint | Service |
|------|----------|---------|
| **Auth** (login, register, OTP, logout, refresh) | `POST /auth/*` `POST /auth/refresh` `GET /auth/me` | `services/api.tsx` + `contexts/AuthContext.tsx` |
| **Notifications** (liste paginée, marquage lu, préférences push) | `GET /notifications` `PATCH /notifications/{id}/read` `POST /notifications/read-all` `POST /notifications/push/register` `GET/PATCH /notifications/preferences` | `services/notifications.ts` + `queries/useNotifications.ts` |
| **SMS Mobile Money** (sync transactions) | `POST {EXPO_PUBLIC_SMS_SYNC_URL}` | `services/sms-sync.ts` |
| **Ping** (health check) | `GET /ping` | `components/ping-test.tsx` |

### 2. Pages utilisant des données mockées (API backend à construire)

#### `constants/mockScore.ts`
- **Page:** `(tabs)/score.tsx`
- **Ressource:** Score financier global + 4 composants (dépenses, dette, épargne, stabilité) + historique
- **Endpoints API nécessaires:**
  - `GET /score` → `ScoreData` (score global + composants + interprétations)
  - `GET /score/history` → `{ month: string; score: number }[]` (historique 6 mois)

#### `constants/mockData.ts` (analyse)
- **Page:** `(tabs)/analysis.tsx`
- **Ressource:** Analyse mensuelle des dépenses — catégories, abonnements, transactions variables, ratio, conseils, variation revenus
- **Endpoints API nécessaires:**
  - `GET /analysis/{monthKey}` → `AnalyseMockData` (données d'un mois spécifique)
  - `GET /analysis` → `AnalyseMockData[]` (tous les mois disponibles)
  - `GET /analysis/months` → `{ monthKey, label }[]` (liste des mois pour le sélecteur)

#### `constants/mockEducation.ts`
- **Pages:** `(tabs)/education.tsx`, `education/path/[id].tsx`, `education/lesson/[id].tsx`, `education/quiz/[id].tsx`, `education/results/[id].tsx`
- **Ressource:** Parcours éducatifs avec leçons, quiz, progression
- **Endpoints API nécessaires:**
  - `GET /education/paths` → `EducationPath[]` (tous les parcours disponibles)
  - `GET /education/paths/{id}` → `EducationPath` (un parcours avec ses leçons)
  - `GET /education/lessons/{id}` → `EducationLesson` (contenu détaillé d'une leçon)
  - `POST /education/quiz/{quizId}/submit` → `{ score, correctCount, totalCount, answers }` (soumission de quiz)
  - `PATCH /education/progress` → met à jour la progression utilisateur

#### `constants/mockSavings.ts`
- **Page:** `objectifs.tsx`
- **Ressource:** Objectifs d'épargne, taux d'épargne, régularité, rétention
- **Endpoints API nécessaires:**
  - `GET /savings/goals` → `SavingGoal[]` (liste des objectifs)
  - `POST /savings/goals` → crée un nouvel objectif
  - `PATCH /savings/goals/{id}` → met à jour un objectif
  - `DELETE /savings/goals/{id}` → supprime un objectif
  - `GET /savings/rate` → `SavingsRate` (taux d'épargne calculé)
  - `GET /savings/frequency` → `SavingsFrequency` (régularité)
  - `GET /savings/retention` → `SavingsRetention` (rétention moyenne)

#### `constants/mockRecommendations.ts`
- **Page:** `conseils.tsx`
- **Ressource:** Recommandations personnalisées avec priorités
- **Endpoints API nécessaires:**
  - `GET /recommendations` → `Recommendation[]` (toutes les recommandations)
  - `PATCH /recommendations/{id}/dismiss` → marque comme ignorée

### 3. Flux de synchronisation SMS

```
SMS Mobile Money → expo-sms-reader → services/sms-sync.ts → API POST /sms/sync
                                                              ↓
                                                        Analyse & tracking
```

## Types partagés

- `types/education.ts` — `EducationPath`, `EducationLesson`, `EducationQuiz`, `QuizQuestion`, `QuizResult`
- `types/expense.ts` — `ExpenseCategory`, `RecurringExpense`, `VariableTransaction`
- `types/score.ts` — `ScoreData`, `ScoreComponent`
- `services/notifications.ts` — `Notification`, `NotificationsResponse`, `NotificationPreferences`

## Structure du code

```
app/                        # Pages (file-based routing Expo)
  (tabs)/                   # Navigation par tabs
    analysis.tsx            # Analyse des dépenses (mockée)
    score.tsx               # Score financier (mocké)
    education.tsx           # Éducation financière (mockée)
  education/                # Pages du module éducation
    path/[id].tsx           # Détail d'un parcours
    lesson/[id].tsx         # Leçon
    quiz/[id].tsx           # Quiz
    results/[id].tsx        # Résultats de quiz
  objectifs.tsx             # Objectifs d'épargne (mocké)
  conseils.tsx              # Recommandations (mocké)
  notifications.tsx         # Notifications (API réelle)
constants/                  # Données mockées
  mockData.ts               # Analyse dépenses (6 mois)
  mockEducation.ts          # Parcours éducatifs (3 parcours)
  mockSavings.ts            # Objectifs + indicateurs épargne
  mockScore.ts              # Score financier
  mockRecommendations.ts    # Recommandations
services/                   # Appels API + utilitaires
  api.tsx                   # Client Axios + intercepteurs + hook useAxios
  notifications.ts          # Service notifications (API réelle)
  sms-sync.ts               # Sync SMS Mobile Money
  sms-reader.ts             # Lecture SMS
  sms-listener.ts           # Écoute SMS en temps réel
  storage.ts                # SecureStore (tokens JWT)
  socket.ts                 # WebSocket
  push.ts                   # Notifications push
components/                 # Composants réutilisables
queries/                    # React Query hooks
  useNotifications.ts       # Pagination + mutations notifications
  usePreferences.ts         # Préférences notifications
stores/                     # Zustand stores
contexts/                   # React contexts (AuthContext)
```
