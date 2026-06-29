import type { ScoreData } from "@/types/score";

export const mockScoreData: ScoreData = {
  globalScore: 29,
  label: "Alerte critique - Votre santé financière nécessite une attention urgente",
  components: {
    C1_expenses: { score: 5, weight: 0.25, contribution: 1.25 },
    C2_debt: { score: 65, weight: 0.25, contribution: 16.25 },
    C3_savings: { score: 8, weight: 0.25, contribution: 2 },
    C4_stability: { score: 36, weight: 0.25, contribution: 9 },
  },
  interpretations: {
    C1_expenses: {
      level: "CRITIQUE",
      label: "Dépenses excessives",
      message:
        "Vos dépenses dépassent ou égalent quasi vos revenus. La moindre variation de revenu vous met en difficulté.",
      priorities: [
        "Réduire les dépenses non essentielles",
        "Négocier vos abonnements et contrats",
        "Suivre un budget mensuel strict",
      ],
    },
    C2_debt: {
      level: "BON",
      label: "Endettement sous contrôle",
      message:
        "Votre endettement est sous contrôle et vos remboursements sont réguliers.",
      priorities: [
        "Maintenir un taux d'endettement < 33%",
        "Rembourser les crédits par anticipation si possible",
        "Éviter les nouveaux crédits à la consommation",
      ],
    },
    C3_savings: {
      level: "CRITIQUE",
      label: "Épargne insuffisante",
      message:
        "Vous n'épargnez pas ou quasi pas. Vous êtes totalement vulnérable face aux imprévus.",
      priorities: [
        "Mettre en place un virement automatique le jour de paie",
        "Constituer un fonds d'urgence (3 mois de dépenses)",
        "Commencer avec un petit montant (5-10% des revenus)",
      ],
    },
    C4_stability: {
      level: "FAIBLE",
      label: "Revenus irréguliers",
      message:
        "Vos revenus sont irréguliers et/ou vous subissez des découverts fréquents.",
      priorities: [
        "Stabiliser vos revenus (activité régulière)",
        "Activer les alertes de découvert",
        "Consulter votre conseiller pour un accompagnement",
      ],
    },
  },
  history: [
    { month: "Jan", score: 38 },
    { month: "Fév", score: 42 },
    { month: "Mar", score: 35 },
    { month: "Avr", score: 33 },
    { month: "Mai", score: 29 },
    { month: "Juin", score: 29 },
  ],
};
