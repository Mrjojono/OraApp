import type {
  ExpenseCategory,
  RecurringExpense,
  VariableTransaction,
} from "@/types/expense";

export interface AnalyseMockData {
  monthKey: string;
  label: string;
  totalExpenses: number;
  transactionCount: number;
  averageTransaction: number;
  categories: ExpenseCategory[];
  recurring: RecurringExpense[];
  variable: {
    totalAmount: number;
    count: number;
    percent: number;
    transactions: VariableTransaction[];
  };
  ratio: {
    ratio: number;
    label: string;
    expensesAmount: number;
    revenueAmount: number;
    interpretation: string;
  };
  advice: {
    severity: "INFO" | "WARNING";
    title: string;
    message: string;
  } | null;
  revenueVariation: {
    monthlyRevenues: {
      month: string;
      amount: number;
      variationPercent: number | null;
    }[];
    averageVariationPercent: number;
    trend: "UP" | "DOWN" | "STABLE";
    volatilityScore: number;
    coefficientOfVariation: number;
  };
}

const baseRecurring: RecurringExpense[] = [
  {
    description: "LOYER",
    averageAmount: 80000,
    frequency: "MONTHLY",
    occurrences: 6,
    nextExpectedDate: "2026-07-01",
    category: "LOGEMENT",
  },
  {
    description: "SPOTIFY",
    averageAmount: 5000,
    frequency: "MONTHLY",
    occurrences: 6,
    nextExpectedDate: "2026-07-15",
    category: "LOISIRS",
  },
  {
    description: "NETFLIX",
    averageAmount: 7500,
    frequency: "MONTHLY",
    occurrences: 6,
    nextExpectedDate: "2026-07-10",
    category: "LOISIRS",
  },
  {
    description: "ASSURANCE AUTO",
    averageAmount: 15000,
    frequency: "MONTHLY",
    occurrences: 6,
    nextExpectedDate: "2026-07-05",
    category: "TRANSPORT",
  },
  {
    description: "ABONNEMENT SALLE",
    averageAmount: 10000,
    frequency: "MONTHLY",
    occurrences: 6,
    nextExpectedDate: "2026-07-01",
    category: "LOISIRS",
  },
];

export const analyseMockData: AnalyseMockData[] = [
  {
    monthKey: "2026-01",
    label: "Janvier 2026",
    totalExpenses: 385000,
    transactionCount: 24,
    averageTransaction: 16042,
    categories: [
      { category: "LOGEMENT", amount: 154000, percent: 40, count: 3 },
      { category: "NOURRITURE", amount: 96250, percent: 25, count: 8 },
      { category: "TRANSPORT", amount: 57750, percent: 15, count: 5 },
      { category: "SANTE", amount: 38500, percent: 10, count: 2 },
      { category: "LOISIRS", amount: 19250, percent: 5, count: 3 },
      { category: "AUTRES", amount: 19250, percent: 5, count: 3 },
    ],
    recurring: baseRecurring,
    variable: {
      totalAmount: 117500,
      count: 14,
      percent: 30.5,
      transactions: [
        { description: "Courses Carrefour", amount: 25000, date: "2026-01-08" },
        { description: "Essence Total", amount: 15000, date: "2026-01-12" },
        { description: "Restaurant", amount: 12000, date: "2026-01-15" },
        { description: "Vêtements", amount: 20000, date: "2026-01-20" },
        { description: "Pharmacie", amount: 8500, date: "2026-01-22" },
      ],
    },
    ratio: {
      ratio: 45,
      label: "Sain",
      expensesAmount: 385000,
      revenueAmount: 855556,
      interpretation:
        "Vous dépensez moins de 50% de vos revenus. Continuez ainsi !",
    },
    advice: {
      severity: "INFO",
      title: "Dépenses logement élevées",
      message:
        "40% de vos dépenses vont au logement. Essayez de réduire de 10 000 F/mois.",
    },
    revenueVariation: {
      monthlyRevenues: [
        { month: "2026-07", amount: 1238203, variationPercent: null },
        { month: "2026-08", amount: 682385, variationPercent: -44.9 },
        { month: "2026-09", amount: 623882, variationPercent: -8.6 },
        { month: "2026-10", amount: 734774, variationPercent: 17.8 },
        { month: "2026-11", amount: 556233, variationPercent: -24.3 },
        { month: "2026-12", amount: 975246, variationPercent: 75.3 },
      ],
      averageVariationPercent: 3.1,
      trend: "STABLE",
      volatilityScore: 35,
      coefficientOfVariation: 29.3,
    },
  },
  {
    monthKey: "2026-02",
    label: "Février 2026",
    totalExpenses: 402000,
    transactionCount: 27,
    averageTransaction: 14889,
    categories: [
      { category: "LOGEMENT", amount: 154000, percent: 38.3, count: 3 },
      { category: "NOURRITURE", amount: 100500, percent: 25, count: 9 },
      { category: "TRANSPORT", amount: 60300, percent: 15, count: 6 },
      { category: "SANTE", amount: 40200, percent: 10, count: 3 },
      { category: "LOISIRS", amount: 28140, percent: 7, count: 4 },
      { category: "AUTRES", amount: 18860, percent: 4.7, count: 2 },
    ],
    recurring: baseRecurring,
    variable: {
      totalAmount: 127000,
      count: 16,
      percent: 31.6,
      transactions: [
        { description: "Courses Carrefour", amount: 28000, date: "2026-02-05" },
        { description: "Essence Total", amount: 16000, date: "2026-02-10" },
        { description: "Restaurant", amount: 15000, date: "2026-02-14" },
        { description: "Électricité", amount: 22000, date: "2026-02-18" },
      ],
    },
    ratio: {
      ratio: 48,
      label: "Sain",
      expensesAmount: 402000,
      revenueAmount: 837500,
      interpretation:
        "Votre ratio dépenses/revenus est stable et maîtrisé.",
    },
    advice: {
      severity: "WARNING",
      title: "Forte augmentation alimentation",
      message:
        "25% de hausse sur l'alimentation ce mois-ci. Vérifiez vos courses.",
    },
    revenueVariation: {
      monthlyRevenues: [
        { month: "2026-07", amount: 1238203, variationPercent: null },
        { month: "2026-08", amount: 682385, variationPercent: -44.9 },
        { month: "2026-09", amount: 623882, variationPercent: -8.6 },
        { month: "2026-10", amount: 734774, variationPercent: 17.8 },
        { month: "2026-11", amount: 556233, variationPercent: -24.3 },
        { month: "2026-12", amount: 975246, variationPercent: 75.3 },
      ],
      averageVariationPercent: -2.1,
      trend: "STABLE",
      volatilityScore: 32,
      coefficientOfVariation: 27.1,
    },
  },
  {
    monthKey: "2026-03",
    label: "Mars 2026",
    totalExpenses: 358000,
    transactionCount: 22,
    averageTransaction: 16273,
    categories: [
      { category: "LOGEMENT", amount: 154000, percent: 43, count: 3 },
      { category: "NOURRITURE", amount: 85920, percent: 24, count: 7 },
      { category: "TRANSPORT", amount: 53700, percent: 15, count: 5 },
      { category: "SANTE", amount: 35800, percent: 10, count: 2 },
      { category: "LOISIRS", amount: 17900, percent: 5, count: 3 },
      { category: "AUTRES", amount: 10680, percent: 3, count: 2 },
    ],
    recurring: baseRecurring,
    variable: {
      totalAmount: 98000,
      count: 11,
      percent: 27.4,
      transactions: [
        { description: "Courses Carrefour", amount: 22000, date: "2026-03-03" },
        { description: "Essence Total", amount: 14000, date: "2026-03-08" },
        { description: "Restaurant", amount: 10000, date: "2026-03-15" },
      ],
    },
    ratio: {
      ratio: 42,
      label: "Sain",
      expensesAmount: 358000,
      revenueAmount: 852381,
      interpretation:
        "Bonne maîtrise des dépenses ce mois-ci. Votre épargne potentielle augmente.",
    },
    advice: null,
    revenueVariation: {
      monthlyRevenues: [
        { month: "2026-07", amount: 1238203, variationPercent: null },
        { month: "2026-08", amount: 682385, variationPercent: -44.9 },
        { month: "2026-09", amount: 623882, variationPercent: -8.6 },
        { month: "2026-10", amount: 734774, variationPercent: 17.8 },
        { month: "2026-11", amount: 556233, variationPercent: -24.3 },
        { month: "2026-12", amount: 975246, variationPercent: 75.3 },
      ],
      averageVariationPercent: 5.2,
      trend: "UP",
      volatilityScore: 42,
      coefficientOfVariation: 31.5,
    },
  },
  {
    monthKey: "2026-04",
    label: "Avril 2026",
    totalExpenses: 421000,
    transactionCount: 29,
    averageTransaction: 14517,
    categories: [
      { category: "LOGEMENT", amount: 154000, percent: 36.6, count: 3 },
      { category: "NOURRITURE", amount: 105250, percent: 25, count: 10 },
      { category: "TRANSPORT", amount: 63150, percent: 15, count: 6 },
      { category: "SANTE", amount: 42100, percent: 10, count: 3 },
      { category: "LOISIRS", amount: 25260, percent: 6, count: 4 },
      { category: "AUTRES", amount: 31240, percent: 7.4, count: 3 },
    ],
    recurring: baseRecurring,
    variable: {
      totalAmount: 146000,
      count: 18,
      percent: 34.7,
      transactions: [
        { description: "Courses Carrefour", amount: 30000, date: "2026-04-02" },
        { description: "Essence Total", amount: 17000, date: "2026-04-07" },
        { description: "Restaurant", amount: 18000, date: "2026-04-12" },
        { description: "Vêtements", amount: 25000, date: "2026-04-18" },
        { description: "Électricité", amount: 21000, date: "2026-04-22" },
      ],
    },
    ratio: {
      ratio: 52,
      label: "Modéré",
      expensesAmount: 421000,
      revenueAmount: 809615,
      interpretation:
        "Vous dépensez un peu plus de la moitié de vos revenus. Surveillez les dépenses non essentielles.",
    },
    advice: {
      severity: "WARNING",
      title: "Ratio dépenses/revenus en hausse",
      message:
        "52% de vos revenus sont consommés par les dépenses. Essayez de réduire les sorties non essentielles.",
    },
    revenueVariation: {
      monthlyRevenues: [
        { month: "2026-07", amount: 1238203, variationPercent: null },
        { month: "2026-08", amount: 682385, variationPercent: -44.9 },
        { month: "2026-09", amount: 623882, variationPercent: -8.6 },
        { month: "2026-10", amount: 734774, variationPercent: 17.8 },
        { month: "2026-11", amount: 556233, variationPercent: -24.3 },
        { month: "2026-12", amount: 975246, variationPercent: 75.3 },
      ],
      averageVariationPercent: -1.8,
      trend: "DOWN",
      volatilityScore: 38,
      coefficientOfVariation: 33.2,
    },
  },
  {
    monthKey: "2026-05",
    label: "Mai 2026",
    totalExpenses: 374000,
    transactionCount: 25,
    averageTransaction: 14960,
    categories: [
      { category: "LOGEMENT", amount: 154000, percent: 41.2, count: 3 },
      { category: "NOURRITURE", amount: 93500, percent: 25, count: 8 },
      { category: "TRANSPORT", amount: 56100, percent: 15, count: 5 },
      { category: "SANTE", amount: 37400, percent: 10, count: 2 },
      { category: "LOISIRS", amount: 22440, percent: 6, count: 4 },
      { category: "AUTRES", amount: 10560, percent: 2.8, count: 3 },
    ],
    recurring: baseRecurring,
    variable: {
      totalAmount: 109000,
      count: 14,
      percent: 29.1,
      transactions: [
        { description: "Courses Carrefour", amount: 24000, date: "2026-05-06" },
        { description: "Essence Total", amount: 15000, date: "2026-05-11" },
        { description: "Restaurant", amount: 13000, date: "2026-05-18" },
      ],
    },
    ratio: {
      ratio: 44,
      label: "Sain",
      expensesAmount: 374000,
      revenueAmount: 850000,
      interpretation:
        "Retour à un ratio sain. Vos efforts de réduction portent leurs fruits.",
    },
    advice: {
      severity: "INFO",
      title: "Bonne tendance",
      message:
        "Vous avez réduit vos dépenses de 11% par rapport au mois dernier. Continuez !",
    },
    revenueVariation: {
      monthlyRevenues: [
        { month: "2026-07", amount: 1238203, variationPercent: null },
        { month: "2026-08", amount: 682385, variationPercent: -44.9 },
        { month: "2026-09", amount: 623882, variationPercent: -8.6 },
        { month: "2026-10", amount: 734774, variationPercent: 17.8 },
        { month: "2026-11", amount: 556233, variationPercent: -24.3 },
        { month: "2026-12", amount: 975246, variationPercent: 75.3 },
      ],
      averageVariationPercent: 4.7,
      trend: "STABLE",
      volatilityScore: 30,
      coefficientOfVariation: 25.8,
    },
  },
  {
    monthKey: "2026-06",
    label: "Juin 2026",
    totalExpenses: 390000,
    transactionCount: 26,
    averageTransaction: 15000,
    categories: [
      { category: "LOGEMENT", amount: 154000, percent: 39.5, count: 3 },
      { category: "NOURRITURE", amount: 97500, percent: 25, count: 9 },
      { category: "TRANSPORT", amount: 58500, percent: 15, count: 5 },
      { category: "SANTE", amount: 39000, percent: 10, count: 2 },
      { category: "LOISIRS", amount: 23400, percent: 6, count: 4 },
      { category: "AUTRES", amount: 17600, percent: 4.5, count: 3 },
    ],
    recurring: baseRecurring,
    variable: {
      totalAmount: 125000,
      count: 15,
      percent: 32.1,
      transactions: [
        { description: "Courses Carrefour", amount: 26000, date: "2026-06-04" },
        { description: "Essence Total", amount: 16000, date: "2026-06-09" },
        { description: "Restaurant", amount: 14000, date: "2026-06-14" },
        { description: "Vêtements", amount: 18000, date: "2026-06-20" },
      ],
    },
    ratio: {
      ratio: 46,
      label: "Sain",
      expensesAmount: 390000,
      revenueAmount: 847826,
      interpretation:
        "Ratio stable et maîtrisé. Vous êtes sur la bonne voie.",
    },
    advice: null,
    revenueVariation: {
      monthlyRevenues: [
        { month: "2026-07", amount: 1238203, variationPercent: null },
        { month: "2026-08", amount: 682385, variationPercent: -44.9 },
        { month: "2026-09", amount: 623882, variationPercent: -8.6 },
        { month: "2026-10", amount: 734774, variationPercent: 17.8 },
        { month: "2026-11", amount: 556233, variationPercent: -24.3 },
        { month: "2026-12", amount: 975246, variationPercent: 75.3 },
      ],
      averageVariationPercent: 2.8,
      trend: "STABLE",
      volatilityScore: 33,
      coefficientOfVariation: 28.6,
    },
  },
];
