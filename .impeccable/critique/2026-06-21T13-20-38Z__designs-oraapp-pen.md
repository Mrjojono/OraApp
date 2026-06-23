---
target: Pencil screens (Dashboard + Analyse)
total_score: 18
p0_count: 3
p1_count: 3
timestamp: 2026-06-21T13-20-38Z
slug: designs-oraapp-pen
---
## Design Health Score

| # | Heuristic | Score | Key Issue |
|---|-----------|-------|-----------|
| 1 | Visibility of System Status | 3 | No loading/refresh/offline states |
| 2 | Match System / Real World | 3 | French + CFA correct; "Flux net du mois" jargonneux |
| 3 | User Control and Freedom | 1 | Pas de back, search, filter, drill-down |
| 4 | Consistency and Standards | 1 | Nav labels différents entre écrans, variable nommée accent_blue contient du vert |
| 5 | Error Prevention | 2 | Score "BON" inexpliqué |
| 6 | Recognition Rather Than Recall | 3 | Bento + tags scannables; nav incohérente force re-apprentissage |
| 7 | Flexibility and Efficiency of Use | 1 | Pas de shortcuts, customisation, search |
| 8 | Aesthetic and Minimalist Design | 2 | Bonne base mais séparateurs contredisent la spec, Playfair surutilisé |
| 9 | Error Recovery | 1 | Aucun état erreur/vide/hors-ligne |
| 10 | Help and Documentation | 1 | Pas d'aide, onboarding, tooltips |
| **Total** | | **18/40** | **Poor — refonte UX majeure nécessaire** |

## Anti-Patterns Verdict

**Oui, ça se lit comme du AI-generated.** Raisons :
- Warm monochrome + bento grid + green accent = le template générique "premium fintech" 2025-2026
- **Icônes Lucide dans les transactions, Phosphor dans la nav** — classique AI mistake
- **Largeurs de barres codées en dur** (57px, 31.5px...) — cassent sur d'autres tailles d'écran
- **Variable nommée `accent_blue` stocke du vert #5EAA31** — une IA qui ne vérifie pas son output
- **Score card incomplète** : pas de progress bar, pas de container vert pour le label
- **"Bonjour, Marc" en Playfair Display** — un serif pour un greeting, c'est forcé

Le DESIGN.md est bien pensé. L'implémentation dans les écrans Pencil est à ~70% de la spec.

## What's Working

1. **Balance "40 000 Fcfa"** : 34px Playfair Display en vert, hiérarchie forte, oeil attire en premier
2. **Architecture bento** : Entrées/Sorties → Flux net → Score → Transactions, récit financier logique
3. **Tags catégories sur Analyse** : tag + progress bar + pourcentage, propre et scannable

## Priority Issues

### P0 — Nav labels incohérents entre écrans
Dashboard dit "Dashboard/Score", Analyse dit "Accueil/Revenus". La spec dit "Dashboard, Analyse, Score, Profil". Bloquant.

### P0 — Librairie d'icônes mixée (Lucide + Phosphor)
Les transactions utilisent Lucide, la nav utilise Phosphor. DESIGN.md spécifie Phosphor. Double bundle ou library wrong.

### P0 — Variable `accent_blue` nommée "bleu" mais stocke du vert #5EAA31
Confusion garante pour tout développeur qui lit le code.

### P1 — Score card incomplète
Spec demande : score right-aligned, container vert pâle pour le label, progress bar fine, 2 métriques clés. Actuel : score left-aligned, label sans container, pas de barre, pas de métriques.

### P1 — Montants des dépenses pas en rouge
Loyer (-80,000) et Amazon (-32,500) utilisent `$text_primary` au lieu de `$negative_text`. Spec dit : négatif en rouge.

### P1 — Séparateurs entre transactions
Spec demande "items sans bordure entre eux". Actuel : 1px divider entre chaque item.

### P2 — Largeurs de barres catégories en dur (57px, 31.5px, etc.)
Devraient utiliser fill_container ou pourcentages.

### P2 — Couleurs des catégories incohérentes
Logement = bleu (info), Transport = vert (positif), Nourriture = jaune, Loisirs = rouge. Aucune règle sémantique.

### P2 — Playfair Display utilisé pour le greeting "Bonjour, Marc"
Reservé aux montants et score selon la spec. Devrait être DM Sans.

## Persona Red Flags

**Casey (mobile distraite)** : Nav labels incohérents → erreurs en naviguant vite. Pas de search/filter. Couleurs inconsistentes cassent le glance.
**Jordan (première fois)** : Score "75 BON" sans contexte. Pas d'onboarding, tooltip, aide. "Flux net du mois" jargonneux.
**Aminata (commerçante Abidjan, Android milieu gamme, 3G)** : Pas d'état offline/loading. Pas de timestamp "dernière sync". Peut pas taper sur les catégories Analyse pour voir le détail.
**Riley (stress tester)** : Score toujours positif. Quid d'un score faible ? Solde négatif ? État vide des transactions ?

## Minor Observations
- Dashboard 920px vs Analyse 844px — standardiser
- Icônes nav 20px, spec dit 22px
- "Entrées 6,033,749 / 34 transactions" mais la liste en montre 4
- Score 75/BON = "good" selon la spec mais utilise la couleur "excellent" (#5EAA31)
- Bordure #EAEAEA et fond #F7F6F3 conformes à la spec ✓
