---
target: BudgetCard (components/dash/BudgetCard.tsx)
total_score: 26
p0_count: 0
p1_count: 1
p2_count: 1
p3_count: 2
timestamp: 2026-06-22T16-41-07Z
slug: components-dash-budgetcard-tsx
---
## Critique du BudgetCard

### Design Health Score

| # | Heuristique | Score | Problème clé |
|---|---|---|---|
| 1 | Visibilité de l'état système | 3 | Bon feedback CTA, mais insight toujours visible même sans données |
| 2 | Correspondance système/réel | 3 | Termes clairs pour un public bancaire ouest-africain |
| 3 | Contrôle et liberté utilisateur | 3 | CTA clair, bottom sheet dismissable |
| 4 | Cohérence et standards | 2 | PlusJakartaSans ≠ DESIGN.md (DM Sans uniquement) |
| 5 | Prévention des erreurs | 3 | Lecture seule, pas d'input dangereux |
| 6 | Reconnaissance plutôt que mémorisation | 3 | Catégories visibles avec barres + dots |
| 7 | Flexibilité et efficacité | 2 | Pas de raccourci, vue liste via bottom sheet uniquement |
| 8 | Design esthétique et minimaliste | 2 | Padding à 14px au lieu de 20px (crampé), gap unique |
| 9 | Aide sur les erreurs | 3 | N/A (affichage seule) |
| 10 | Aide et documentation | 2 | Insight présente, mais pas d'explication des catégories |
| **Total** | | **26/40** | **Significant improvements needed** |

---

### Anti-Patterns Verdict

**LLM assessment** : La carte ne crie pas "AI made this" — le dark mode sobre, les barres proportionnelles, et l'insight intégré sont des choix intentionnels. Le seul indice de dérive : la police PlusJakartaSans qui s'invite sur les titres alors que DESIGN.md interdit toute police hors DM Sans. Le product register dit clairement : "One family is often right."

**Détection automatique** : 8 findings
- `#4C9AFF` (Transport) hors palette DESIGN.md — 1 advisory
- `PlusJakartaSans_600SemiBold` utilisé sur 3 éléments (headerTitle, seeAllText, insightTitle) — 3 warnings
- `DMSans_500Medium` et `DMSans_400Regular` flaggés — 4 warnings, mais **faux positifs** : DESIGN.md nomme "DM Sans 500" et l'Expo font family s'appelle `DMSans_500Medium`

---

### Ce qui fonctionne bien

1. **Barres de progression + dots par catégorie** — Lecture verticale rapide.
2. **CTA "Voir toutes les catégories" amélioré** — Touch target large avec fond accentContainer.
3. **Insight fusionné dans la carte** — Dashboard compact, évite la fragmentation.

---

### Problèmes Prioritaires

**[P1] Font hors système — PlusJakartaSans utilisé sur 3 styles**
- headerTitle, seeAllText, insightTitle utilisent PlusJakartaSans_600SemiBold
- DESIGN.md spécifie DM Sans uniquement
- Commande : `$impeccable typeset`

**[P2] Padding card à 14px vs 20px DESIGN.md**
- card padding:14 mais DESIGN.md spécifie card-padding: 20px
- Contenu comprimé
- Commande : `$impeccable layout`

**[P3] #4C9AFF (Transport) hors palette DESIGN.md**
- Transport utilise #4C9AFF dans defaultItems et index.tsx
- DESIGN.md n'a pas de bleu
- Commande : `$impeccable colorize`

**[P3] Gap unique à 12px entre tous les enfants**
- Pas de hiérarchie spatiale entre insight et items
- Commande : `$impeccable layout`

---

### Persona Red Flags

**Alex (Power User)** : Pas de personnalisation des catégories. Doit ouvrir le bottom sheet pour voir le détail. Pas de tri, pas de filtrage.

**Casey (Mobile distrait)** : CTA mieux mais bottom sheet à 50% couvre le dashboard — peut désorienter.

**Jordan (Nouveau)** : Barres de progression non expliquées. "40%" de quoi ? Pas de label indicatif.

---

### Observations mineures

- insightTitle toujours visible même si insightMessage est un placeholder. Rendre optionnel.
- "Voir toutes les catégories" sans flèche après refonte — perte du signifiant d'action.
