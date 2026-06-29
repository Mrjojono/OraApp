export interface Recommendation {
  priority: "HIGH" | "MEDIUM" | "LOW";
  component: string;
  trigger: string;
  title: string;
  message: string;
  actionAmount?: number;
  source: string;
}

export const mockRecommendations: Recommendation[] = [
  {
    priority: "HIGH",
    component: "C1_expenses",
    trigger: "expense_ratio > 75%",
    title: "Réduisez vos dépenses courantes",
    message:
      "Vous dépensez 76% de vos revenus mensuels. Essayez de réduire vos dépenses non essentielles pour atteindre un ratio de 50%.",
    actionAmount: 50000,
    source: "Conseil personnalisé",
  },
  {
    priority: "HIGH",
    component: "C3_savings",
    trigger: "savings_rate < 10%",
    title: "Automatisez votre épargne",
    message:
      "Mettez en place un virement automatique de 10% de vos revenus vers un compte épargne dès le jour de paie.",
    actionAmount: 38500,
    source: "Conseil personnalisé",
  },
  {
    priority: "MEDIUM",
    component: "C2_debt",
    trigger: "debt_ratio > 30%",
    title: "Regroupez vos crédits",
    message:
      "Vous avez plusieurs crédits en cours. Un regroupement pourrait réduire votre mensualité et améliorer votre trésorerie.",
    source: "Conseil personnalisé",
  },
  {
    priority: "MEDIUM",
    component: "C4_stability",
    trigger: "overdraft_days > 5",
    title: "Activez les alertes solde",
    message:
      "Vous avez été à découvert 8 jours ce mois-ci. Activez les alertes SMS pour anticiper les soldes faibles.",
    source: "Conseil personnalisé",
  },
  {
    priority: "LOW",
    component: "C1_expenses",
    trigger: "subscription_bloat",
    title: "Auditez vos abonnements",
    message:
      "Vous pourriez économiser jusqu'à 15 000 F/mois en supprimant les abonnements inutilisés.",
    actionAmount: 15000,
    source: "Analyse des dépenses",
  },
];
