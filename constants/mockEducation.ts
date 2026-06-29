import type { EducationPath } from "@/types/education";

export const mockPaths: EducationPath[] = [
  {
    id: "budget-debutant",
    title: "Budget Débutant",
    subtitle: "Les bases du budget",
    description: "Apprenez à suivre vos dépenses et à construire un budget mensuel simple.",
    category: "debutant",
    iconName: "Wallet",
    color: "#34C759",
    progress: 0,
    lessonCount: 4,
    completedCount: 0,
    estimatedTime: "20 min",
    status: "recommended",
    lessons: [
      {
        id: "l1-1",
        title: "Pourquoi suivre son budget ?",
        duration: "5 min",
        status: "available",
        content: [
          { type: "paragraph", text: "Suivre son budget, c'est reprendre le contrôle de ses finances. Sans visibilité, il est difficile d'épargner ou d'éviter les découverts." },
          { type: "highlight", text: "💡 62% des français qui tiennent un budget mensuel déclarent épargner plus facilement." },
          { type: "paragraph", text: "Un budget vous permet de savoir où va votre argent, d'identifier les gaspillages et de fixer des objectifs réalistes." },
          { type: "bullet_list", items: ["Visualiser vos entrées et sorties d'argent", "Anticiper les dépenses importantes", "Atteindre vos objectifs d'épargne", "Réduire votre stress financier"] },
        ],
      },
      {
        id: "l1-2",
        title: "Les 3 piliers du budget",
        duration: "7 min",
        status: "locked",
        content: [
          { type: "paragraph", text: "Tout bon budget repose sur trois piliers : le suivi, la catégorisation, et l'ajustement." },
          { type: "paragraph", text: "Le suivi consiste à noter chaque dépense. La catégorisation permet de regrouper vos dépenses par type. L'ajustement est l'étape où vous décidez quoi changer." },
          { type: "bullet_list", items: ["Catégories essentielles : logement, alimentation, transports", "Catégories variables : loisirs, shopping, voyages", "Épargne et investissements"] },
        ],
      },
      {
        id: "l1-3",
        title: "Construire son premier budget",
        duration: "8 min",
        status: "locked",
        content: [
          { type: "paragraph", text: "Pour construire votre budget, commencez par lister vos revenus mensuels, puis vos dépenses fixes et variables." },
          { type: "tip", text: "Utilisez la règle 50/30/20 : 50% pour les besoins, 30% pour les envies, 20% pour l'épargne." },
          { type: "paragraph", text: "Ajustez chaque catégorie selon vos objectifs personnels. L'important est de trouver un équilibre qui vous correspond." },
        ],
        quiz: {
          id: "quiz-1",
          questions: [
            {
              id: "q1-1",
              question: "Quelle est la répartition recommandée par la règle 50/30/20 ?",
              options: ["50% besoins, 30% envies, 20% épargne", "50% épargne, 30% besoins, 20% envies", "50% envies, 30% besoins, 20% épargne", "20% besoins, 30% envies, 50% épargne"],
              correctIndex: 0,
              explanation: "La règle 50/30/20 répartit vos revenus entre besoins essentiels (50%), envies personnelles (30%) et épargne (20%).",
            },
            {
              id: "q1-2",
              question: "Quel est le premier pilier d'un bon budget ?",
              options: ["L'investissement", "Le suivi des dépenses", "La carte de crédit", "Les impôts"],
              correctIndex: 1,
              explanation: "Le suivi des dépenses est le premier pilier : sans savoir où va votre argent, vous ne pouvez pas optimiser votre budget.",
            },
          ],
        },
      },
      {
        id: "l1-4",
        title: "Félicitations !",
        duration: "2 min",
        status: "locked",
        content: [
          { type: "paragraph", text: "Bravo ! Vous avez complété les bases de la gestion budgétaire. Vous êtes maintenant prêt à passer au niveau supérieur." },
          { type: "highlight", text: "🎉 Vous avez franchi le premier pas vers une meilleure santé financière !" },
          { type: "paragraph", text: "Continuez avec le parcours Épargne pour apprendre à faire fructifier votre argent." },
        ],
        quiz: {
          id: "quiz-4",
          questions: [
            {
              id: "q4-1",
              question: "Pourquoi est-il important de suivre son budget ?",
              options: ["Pour dépenser plus", "Pour reprendre le contrôle de ses finances", "Pour impressionner ses amis", "Ce n'est pas important"],
              correctIndex: 1,
              explanation: "Suivre son budget permet de reprendre le contrôle de ses finances, d'identifier les gaspillages et d'atteindre ses objectifs.",
            },
          ],
        },
      },
    ],
  },
  {
    id: "epargne",
    title: "Épargne Malin",
    subtitle: "Faites fructifier votre argent",
    description: "Découvrez les différentes façons d'épargner et comment choisir les bons supports.",
    category: "epargne",
    iconName: "PiggyBank",
    color: "#007AFF",
    progress: 0,
    lessonCount: 3,
    completedCount: 0,
    estimatedTime: "15 min",
    status: "new",
    lessons: [
      {
        id: "l2-1",
        title: "Pourquoi épargner ?",
        duration: "5 min",
        status: "available",
        content: [
          { type: "paragraph", text: "Épargner vous permet de faire face aux imprévus, de réaliser des projets et de préparer votre avenir." },
          { type: "bullet_list", items: ["Épargne de précaution (3 à 6 mois de dépenses)", "Épargne projet (voyage, achat immobilier)", "Épargne retraite (préparation long terme)"] },
        ],
      },
      {
        id: "l2-2",
        title: "Livrets et placements",
        duration: "6 min",
        status: "locked",
        content: [
          { type: "paragraph", text: "Livret A, LDDS, LEP, assurance-vie... Chaque support a ses avantages selon votre objectif." },
          { type: "tip", text: "Le Livret A est idéal pour l'épargne de précaution : disponible à tout moment et sans risque." },
        ],
        quiz: {
          id: "quiz-2",
          questions: [
            {
              id: "q2-1",
              question: "Quel montant d'épargne de précaution est recommandé ?",
              options: ["1 mois de dépenses", "3 à 6 mois de dépenses", "12 mois de dépenses", "Aucune épargne de précaution"],
              correctIndex: 1,
              explanation: "L'épargne de précaution recommandée est de 3 à 6 mois de dépenses pour faire face aux imprévus.",
            },
          ],
        },
      },
      {
        id: "l2-3",
        title: "Automatiser son épargne",
        duration: "4 min",
        status: "locked",
        content: [
          { type: "paragraph", text: "Le meilleur moyen d'épargner est d'automatiser vos virements vers un compte épargne dès la réception de votre salaire." },
          { type: "highlight", text: "💡 \"Payez-vous d'abord\" : épargnez avant de dépenser, pas après." },
        ],
      },
    ],
  },
  {
    id: "credit-responsable",
    title: "Crédit Responsable",
    subtitle: "Comprendre et maîtriser le crédit",
    description: "Tout savoir sur les crédits, le taux d'endettement et comment emprunter intelligemment.",
    category: "credit",
    iconName: "CreditCard",
    color: "#FF9500",
    progress: 0,
    lessonCount: 3,
    completedCount: 0,
    estimatedTime: "18 min",
    status: "new",
    lessons: [
      {
        id: "l3-1",
        title: "Types de crédit",
        duration: "6 min",
        status: "available",
        content: [
          { type: "paragraph", text: "Crédit consommation, crédit immobilier, crédit renouvelable... Chaque type de crédit a ses spécificités." },
          { type: "bullet_list", items: ["Crédit amortissable : vous remboursez chaque mois une partie du capital", "Crédit in fine : vous remboursez tout le capital à la fin", "Crédit renouvelable : une réserve d'argent disponible en permanence"] },
        ],
      },
      {
        id: "l3-2",
        title: "Le taux d'endettement",
        duration: "7 min",
        status: "locked",
        content: [
          { type: "paragraph", text: "Le taux d'endettement est le rapport entre vos charges de crédit et vos revenus. Il ne doit pas dépasser 33%." },
        ],
        quiz: {
          id: "quiz-3",
          questions: [
            {
              id: "q3-1",
              question: "Quel est le taux d'endettement maximum recommandé ?",
              options: ["25%", "33%", "50%", "40%"],
              correctIndex: 1,
              explanation: "Le taux d'endettement ne devrait pas dépasser 33% de vos revenus pour rester dans une situation financière saine.",
            },
          ],
        },
      },
      {
        id: "l3-3",
        title: "Bien emprunter",
        duration: "5 min",
        status: "locked",
        content: [
          { type: "paragraph", text: "Comparez les TAEG, négociez l'assurance, et ne vous engagez que si vous êtes sûr de pouvoir rembourser." },
        ],
      },
    ],
  },
];
