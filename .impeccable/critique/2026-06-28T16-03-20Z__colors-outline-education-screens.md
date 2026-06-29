---
timestamp: 2026-06-28T16-03-20Z
slug: colors-outline-education-screens
---
# Critique — Couleurs & Outlines (Écrans Éducation)

**Slug:** `colors-outline-education-screens`
**Date:** 2026-06-28
**Source:** Design Review Manuel (Assessment A) + Détecteur B skip (.pen chiffré)
**Références:** DESIGN.md, PRODUCT.md, login.pen (via Pencil MCP)

---

## Verdict AI Slop : 7/10 — Signaux modérés-forts

### Problèmes confirmés

1. **Variable `accent_coral` = `#34C759`** : le nom dit « corail », la valeur dit « vert ». Renommage sémantique incomplet.
2. **TabBar_A (Analyse)** : fond en `#34C75920` (vert nouveau) mais icône + label en `#FF5A5F` (corail ancien). Migration partielle.
3. **TabBar_P → onglet Profil** : `fill: "#e14b4bff"` — rouge aléatoire sans rôle dans le design system.
4. **Login screen** tourné de ~18° (`rotation: -0.314...`).
5. **Variable `border_subtle` = `#D4D4D4`** définie mais jamais utilisée — fantôme de thème clair.
6. **TabBar Dashboard** = `#FFFFFF` vs TabBar Profil/Score/Analyse = `#1A1A1A` — deux patterns de barre de navigation coexistent.

---

## Évaluation Couleurs

### Contrastes calculés

| Paire | Ratio | AA (4.5:1) | AA Large (3:1) |
|-------|-------|:-----------:|:--------------:|
| `#FFFFFF` sur `#0D0D0D` (fond) | **~18:1** ✅ | ✅ | ✅ |
| `#A5A5A5` sur `#0D0D0D` | **~4.7:1** | ✅ | ✅ |
| `#A5A5A5` sur `#1A1A1A` (surface) | **~3.7:1** | ❌ | ✅ |
| `#555555` sur `#0D0D0D` / `#1A1A1A` | **~2.4:1 / ~1.9:1** | ❌ | ❌ |
| `#30D158` (positif) sur `#1A1A1A` | **~1.3:1** | ❌ | ❌ |
| `#34C759` (accent) sur `#1A1A1A` | **~5.9:1** | ✅ | ✅ |
| `#FFFFFF` sur `#34C759` (CTA bouton) | **~2.6:1** | ❌ | ❌ |
| `#34C75920` sur `#1A1A1A` (ligne active) | **~1.1:1** | ❌ | ❌ |
| `#FF453A` (négatif) sur `#1A1A1A` | **~2.4:1** | ❌ | ❌ |
| `#FFC043` (warning) sur `#1A1A1A` | **~1.8:1** | ❌ | ❌ |
| `#2C2C2E` (outline) sur `#1A1A1A` | **~1.7:1** | ❌ | ❌ |

### Problèmes sémantiques

1. **Trois verts, zéro hiérarchie** : `#0A6E5A` (brand Ora, score gauge, login button), `#34C759` (accent, CTA textuels), `#30D158` (positif financier). L'utilisateur ne peut pas distinguer leur sens. Le `#0A6E5A` est utilisé *plus* que l'accent officiel `#34C759`.

2. **Accent vs Positif quasi-identiques** : `#34C759` (HSL 135°/59%/49%) vs `#30D158` (HSL 135°/63%/50%). Même teinte, écarts imperceptibles (~1% de luminosité).

3. **Badges/indicateurs verts sur fond vert** : `#34C75920` sur `#1A1A1A` pour l'état "actif" d'une leçon — totalement invisible.

### Problème spécifique Éducation (non présent dans les écrans existants)

**Boutons CTA remplis** (`#FFFFFF` sur `#34C759` ≈ 2.6:1) : les écrans Éducation utilisent des boutons filled ("Passer le Quiz", "Question suivante") qui violent DESIGN.md (« Privilégier les CTA textuels en corail »). Le ratio est insuffisant pour le WCAG AA même en large text.

---

## Évaluation Outlines

### Problèmes structurels

1. **Bordure carte `#2C2C2E` (1px) sur `#1A1A1A` ≈ 1.7:1** : les cartes se fondent entre elles et dans le fond. L'utilisateur doit lire le contenu pour distinguer les sections. En extérieur (cas d'usage PRODUCT.md), les cartes deviennent un bloc gris uniforme.

2. **Aucune hiérarchie d'outline** : cartes, tabBar, éléments secondaires utilisent tous `#2C2C2E` / 1px / même radius. Pas de distinction visuelle entre conteneurs primaires et secondaires.

3. **NavBar outline** (`#2C2C2E` sur `#1A1A1A`) : même problème d'invisibilité. À l'inverse, le Dashboard (NavBar `#FFFFFF`) a une outline plus visible — mais c'est un pattern différent.

4. **Séparation cartes** : l'écart de 12-16px entre cartes compense partiellement les bordures faibles, mais sur mobile en extérieur, l'écart visuel entre `#1A1A1A` et `#0D0D0D` n'est que de ~1.5:1.

---

## Heuristiques Nielsen (0-4, 0 = aucun problème)

| # | Heuristique | Score | Justification |
|---|-------------|:-----:|---------------|
| 1 | Visibilité du statut système | **0** | Soldes, scores, transactions clairement étiquetés |
| 2 | Correspondance système/monde réel | **1** | Français OK ; FCFA correct ; "entrées/sorties" non-standard |
| 3 | Contrôle utilisateur & liberté | **1** | Navigation standard, boutons retour |
| 4 | Cohérence & standards | **3** | **CRITIQUE** : accent mi-migré, TabBar incohérentes, bottom sheets claires dans app sombre, nom `accent_coral` trompeur |
| 5 | Prévention d'erreurs | **1** | Pas de problème critique |
| 6 | Reconnaissance > mémorisation | **2** | Cartes visuellement identiques → l'utilisateur mémorise la position |
| 7 | Flexibilité & efficacité | **1** | Acceptable pour mobile |
| 8 | Design esthétique & minimaliste | **1** | Propre ; quelques cartes denses |
| 9 | Aide aux erreurs | **0** | N/A (pas d'états d'erreur visibles) |
| 10 | Aide & documentation | **0** | N/A |

**Total : 10/40** — Problèmes de cohérence et contraste significatifs.

---

## Charge Cognitive : Modérée-Élevée (6/10)

- Outlines invisibles → 200-400ms par transition de section pour parser le contenu plutôt que la mise en page
- Trois verts → bruit sémantique : décoder quelle nuance signifie quoi
- NavBar blanche Dashboard vs sombre ailleurs → désorientation
- Bottom sheets claires → rupture d'adaptation au thème sombre

---

## Forces

1. **Base sombre solide** : `#0D0D0D` / `#1A1A1A` / `#FFFFFF` = fondation premium, propre
2. **Hiérarchie typographique forte** : Playfair Display pour les chiffres, DM Sans pour le corps — bien exécuté
3. **Code couleur sémantique discipliné** : `#FF453A` = négatif, `#30D158` = positif, `#FFC043` = warning — quand la lisibilité le permet

---

## Problèmes Prioritaires

| # | Problème | Sévérité |
|---|----------|:--------:|
| P0 | **`#A5A5A5` sur `#1A1A1A` échoue WCAG AA** (~3.7:1). Texte secondaire illisible, surtout en extérieur | **P0** |
| P0 | **`accent_coral` = `#34C759`** : nom ≠ valeur. TabBar_A utilise vert fond + corail icône. DESIGN.md décrit corail. `#0A6E5A` est le vrai accent de facto | **P0** |
| P1 | **Bordures cartes `#2C2C2E` invisibles** (~1.7:1 sur `#1A1A1A`) : cartes indiscernables | **P1** |
| P1 | **`#555555` text-muted illisible** (~2.4:1) : transations, sous-titres, indicateurs sync invisibles | **P1** |
| P1 | **Boutons CTA remplis** (`#FFFFFF` sur `#34C759` ≈ 2.6:1) + violent DESIGN.md (CTA textuels) | **P1** |
| P2 | **Ligne leçon active `#34C75920` sur `#1A1A1A`** ~1.1:1 — imperceptible | **P2** |
| P2 | **Onglet Profil `#e14b4bff`** — rouge aléatoire, bug évident | **P2** |
| P2 | **TabBar incohérente** : blanche Dashboard, sombre ailleurs | **P2** |
| P3 | **Login screen tourné ~18°** | **P3** |

---

## Persona Red Flags

### 👤 Casey (mobile distraite)
**Invisibilité des cartes.** Casey regarde son téléphone en marchant. `#2C2C2E` sur `#1A1A1A` (1.7:1) → tout le dashboard est un bloc gris. Elle doit lire pour trouver l'information. En extérieur, l'affichage s'effondre complètement.

**Trois verts.** Casey voit `+350 000 F` en `#30D158`, puis "Voir le détail" en `#0A6E5A`, puis une icône en `#34C759` → elle ne sait pas si ces verts signifient la même chose. À un coup d'œil, le vert devrait être cohérent.

### 👤 Sam (accessibilité)
**Échecs de contraste systémiques.** Sam (malvoyant modéré 20/80) ne voit pas : tous les `#A5A5A5` sur `#1A1A1A`, tous les `#555555` (~2.4:1), les montants positifs `#30D158` (~1.3:1), les outlines `#2C2C2E` (~1.7:1). L'app prétend « Contraste élevé pour la lisibilité en extérieur » (PRODUCT.md) mais échoue WCAG AA sur tous les tokens de texte secondaire et toutes les bordures. Sam ne peut pas utiliser cette app sans technologie d'assistance.

---

## Métriques

- **Design Review (Assessment A)** : ✅ faite
- **Detector (Assessment B)** : ⏭ skip (.pen chiffré)
- **WCAG AA violations** : 10 paires de contraste échouent
- **Scores Nielsen** : 10/40 (problèmes cohérence + contraste)
- **AI Slop Score** : 7/10
- **Charge cognitive** : 6/10

---

**Rapport généré par impeccable skill — 2026-06-28**
