export interface SavingGoal {
  id: string;
  label: string;
  targetAmount: number;
  currentAmount: number;
  monthlyContribution: number;
  deadline?: string;
}

export interface SavingsRate {
  monthlyIncome: number;
  monthlyExpenses: number;
  monthlyDebtPayments: number;
  netSavings: number;
  savingsRate: number;
  label: string;
  score: number;
  garmanForgueThreshold: number;
}

export interface SavingsFrequency {
  monthsWithSavings: number;
  totalMonths: number;
  regularityRate: number;
  score: number;
  averageDepositAmount: number;
  depositsByMonth: { month: string; saved: boolean; amount: number }[];
}

export interface SavingsRetention {
  averageRetentionDays: number;
  label: string;
  score: number;
  retentionByMonth: { month: string; retentionDays: number }[];
  interpretation: string;
}

export const mockGoals: SavingGoal[] = [
  {
    id: "g1",
    label: "Fonds d'urgence",
    targetAmount: 500000,
    currentAmount: 150000,
    monthlyContribution: 50000,
  },
  {
    id: "g2",
    label: "Voyage",
    targetAmount: 1000000,
    currentAmount: 200000,
    monthlyContribution: 75000,
  },
  {
    id: "g3",
    label: "Nouveau téléphone",
    targetAmount: 300000,
    currentAmount: 280000,
    monthlyContribution: 60000,
    deadline: "2026-08",
  },
];

export const mockSavingsRate: SavingsRate = {
  monthlyIncome: 385000,
  monthlyExpenses: 192500,
  monthlyDebtPayments: 50000,
  netSavings: 142500,
  savingsRate: 37,
  label: "BON",
  score: 72,
  garmanForgueThreshold: 10,
};

export const mockSavingsFrequency: SavingsFrequency = {
  monthsWithSavings: 4,
  totalMonths: 6,
  regularityRate: 67,
  score: 55,
  averageDepositAmount: 35000,
  depositsByMonth: [
    { month: "Jan", saved: true, amount: 40000 },
    { month: "Fév", saved: true, amount: 35000 },
    { month: "Mar", saved: false, amount: 0 },
    { month: "Avr", saved: true, amount: 30000 },
    { month: "Mai", saved: true, amount: 45000 },
    { month: "Juin", saved: false, amount: 0 },
  ],
};

export const mockSavingsRetention: SavingsRetention = {
  averageRetentionDays: 18,
  label: "MOYEN",
  score: 48,
  retentionByMonth: [
    { month: "Jan", retentionDays: 22 },
    { month: "Fév", retentionDays: 18 },
    { month: "Mar", retentionDays: 12 },
    { month: "Avr", retentionDays: 20 },
    { month: "Mai", retentionDays: 15 },
    { month: "Juin", retentionDays: 21 },
  ],
  interpretation:
    "Votre épargne reste en moyenne 18 jours sur le compte avant d'être utilisée. Essayez de conserver vos économies au moins 30 jours pour constituer un vrai matelas de sécurité.",
};
