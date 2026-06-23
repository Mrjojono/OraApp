---
name: Revolut-Inspired Dark Mode (Orabank)
colors:
  background: '#0D0D0D'
  surface: '#1A1A1A'
  surface-dim: '#242424'
  on-surface: '#FFFFFF'
  on-surface-variant: '#A5A5A5'
  outline: '#2C2C2E'
  accent: '#FF5A5F'
  on-accent: '#FFFFFF'
  accent-container: rgba(255,90,95,0.12)
  warning-bg: '#3A2A1A'
  warning-accent: '#FFC043'
  positive: '#30D158'
  negative: '#FF453A'
  tab-inactive: '#A5A5A5'
  text-muted: '#555555'
typography:
  display-lg:
    fontFamily: Playfair Display
    fontSize: 56px
    fontWeight: '700'
    lineHeight: 64px
    letterSpacing: -0.02em
  display-md:
    fontFamily: Playfair Display
    fontSize: 44px
    fontWeight: '700'
    lineHeight: 52px
  headline-lg:
    fontFamily: DM Sans
    fontSize: 28px
    fontWeight: '600'
    lineHeight: 36px
  headline-md:
    fontFamily: DM Sans
    fontSize: 22px
    fontWeight: '600'
    lineHeight: 28px
  title-md:
    fontFamily: DM Sans
    fontSize: 17px
    fontWeight: '600'
    lineHeight: 24px
  body-md:
    fontFamily: DM Sans
    fontSize: 14px
    fontWeight: '400'
    lineHeight: 20px
  label-md:
    fontFamily: DM Sans
    fontSize: 13px
    fontWeight: '500'
    lineHeight: 18px
  label-sm:
    fontFamily: DM Sans
    fontSize: 11px
    fontWeight: '500'
    lineHeight: 16px
  caption:
    fontFamily: DM Sans
    fontSize: 10px
    fontWeight: '500'
    lineHeight: 14px
  number-lg:
    fontFamily: DM Sans
    fontSize: 56px
    fontWeight: '700'
    lineHeight: 64px
    letterSpacing: -0.01em
  number-md:
    fontFamily: DM Sans
    fontSize: 24px
    fontWeight: '600'
    lineHeight: 32px
rounded:
  sm: 4px
  DEFAULT: 10px
  md: 12px
  lg: 14px
  xl: 16px
spacing:
  margin-mobile: 16px
  gutter: 12px
  card-padding: 20px
  section-gap: 20px
  card-gap: 12px
---

## Brand & Style

OraApp est un assistant de monitoring financier connecté à Orabank. Design inspiré de Revolut : dark mode premium, carte foncées sur fond noir, accent corail utilisé avec parcimonie.

Le style est **Dark Mode Fintech Premium** :
- Fond #0D0D0D, cartes #1A1A1A, bordures fines #2C2C2E
- Aucun effet décoratif (zéro gradient, zéro glassmorphisme, zéro ombre portée)
- L'accent corail (#FF5A5F) est un signal, pas une décoration
- L'interface inspire confiance par sa rigueur sombre et premium
- Mobile-first, conçu pour une utilisation en déplacement

## Colors

L'accent corail (#FF5A5F) est utilisé avec parcimonie :
- **Accent (#FF5A5F)** : Score, CTA, insights, tab active, icône Score dans QuickActions
- **Warning (#FFC043)** : Alertes et avertissements (amber)
- **Positive (#30D158)** : Variations positives (+12%, +21 pts), soldes en hausse
- **Negative (#FF453A)** : Dépenses, alertes urgentes
- **Neutres** : Fond #0D0D0D, cartes #1A1A1A, bordures #2C2C2E
- **Textes** : Primaire #FFFFFF, secondaire #A5A5A5 (contraste 4.7:1), muet #555555

## Typography

- **Playfair Display** (serif) → grands montants, score (56px)
- **DM Sans** (sans-serif) → tout le reste : labels, data, body, badges
- Aucun usage d'Inter, Roboto, ou Helvetica
- Poids max : 700 (display), 600 (headings), 500 (body/labels)
- Letter-spacing serré (-0.01em à -0.02em) pour les montants

## Layout & Spacing

- Layout vertical, gap 20px entre sections
- Marges mobiles : 16px (padding latéral des sections dans le Content)
- Cards : padding 20-24px, corner radius 14px, bordure 1px #2C2C2E
- Tab bar flottante : capsule style, corner radius 16px, margin 16px
- La hauteur des cartes est déterminée par le contenu
- Pas de bento grid — les cartes s'empilent verticalement

## Navigation

- **Tab bar flottante** (capsule) : 4 sections (Accueil, Analyse, Score, Profil)
- Fond #1A1A1A, bordure 1px #2C2C2E, corner radius 16px
- Icônes Phosphor outline, 20px
- Label 9px/600 sous chaque icône
- Tab active : icône + texte en corail #FF5A5F, fond rgba(255,90,95,0.12)
- Tab inactive : icône + texte en #A5A5A5
- Position : flottante en bas de l'écran, margin 16px

## Sections du Dashboard

### Balance Section
- Pas de carte — texte directement sur le fond #0D0D0D
- Label "Solde disponible" en #8E8E93 (13px/500)
- Montant en display-lg (Playfair Display, 44px/700, #FFFFFF)
- Changement (+12%) en positif #30D158
- Sync indicator en #555555

### Quick Actions
- 4 cartes horizontales (#1A1A1A, radius 14px)
- Icône 22px + label 10px/500 #8E8E93
- **Score** : icône en corail #FF5A5F (point d'entrée principal)
- Objectifs, Conseils, Aide : icônes blanches #FFFFFF

### AlertBanner (contextuel)
- Apparaît entre QuickActions et ScoreCard quand l'API retourne une alerte
- Fond selon sévérité : #3A2A1A (WARNING), icon #FFC043
- Layout horizontal : icon + texte + CTA
- Padding 14px, corner radius 14px
- Titre #FFFFFF 13px/600, message #D0D0D0 11px/500, CTA #FFC043 11px/600

### OraScore Card
- Carte verticale (#1A1A1A, radius 14px, padding 20px)
- Row 1 : label "OraScore" + badge "75/100 · Très bien" (corail sur fond rgba(255,90,95,0.12))
- Row 2 : score number (Playfair Display, 56px/700) + trend (#30D158)
- Row 3 : gauge bar full-width (8px height, radius 4px, fill proportionnel)
- Row 4 : detail (#A5A5A5) + CTA "Recommandations →" (corail #FF5A5F)
- Score - label : BON, TRÈS BIEN, EXCELLENT

### Budget Card
- Carte verticale (#1A1A1A, radius 14px, padding 20px, gap 16px)
- Header : "Dépenses du mois" (#FFFFFF, 15px/600) + total (#A5A5A5)
- 3 catégories maximum sur le dashboard (Logement/Alimentation/Transport)
- Chaque catégorie : dot 8px + nom (#FFFFFF) + barre (6px) + montant (#A5A5A5)
- Barres proportionnelles (40%→140px, 25%→90px, 15%→55px dans 342px)
- "Voir toutes les catégories →" en corail
- InsightRow fusionné : fond #242424, icon corail, title #FFFFFF, sub #D0D0D0

## Components (transversaux)

### ScoreBar (réutilisable)
- Barre horizontale, corner radius 4px, hauteur 8px
- Fond #2C2C2E, fill couleur accent
- Utilisé dans ScoreCard, éligibilité, etc.

### InsightRow
- Fond #242424, corner radius 10px, padding 12-14px
- Icon 18px (corail) + texte vertical
- Titre 12px/600 #FFFFFF, sous-titre 10px/500 #D0D0D0
- Fusionné dans la BudgetCard du dashboard

### Buttons (adaptés dark mode)
- Primary : pas de filled — privilégier les CTA textuels en corail
- Ghost : texte #A5A5A5
- Secondary card : bordure 1px #2C2C2E

### AdviceCard (dark mode)
- Carte #1A1A1A, bordure 1px #2C2C2E, radius 14px
- **Sévérité INFO** : icon corail ou bleu
- **Sévérité WARNING** : fond #3A2A1A, icon #FFC043
- **Sévérité CRITICAL** : fond #3A1A1A, icon #FF453A

### Loading / Empty / Error
- Loading : skeleton cards #2C2C2E avec pulse
- Empty : icon 48px #555555 + texte #A5A5A5
- Error : icon warning + "Réessayer" en ghost
- Offline : "Dernière sync" dans le header

### Advice Display Rules (API)

| Type | Sévérité | Composant | Placement |
|------|----------|-----------|-----------|
| OVERDRAFT_RISK | CRITICAL | AlertBanner | Dashboard, tout en haut |
| SPENDING_SPIKE | WARNING | AlertBanner | Dashboard |
| BALANCE_LOW | WARNING | AdviceCard | Dashboard |
| DEBT_WARNING | CRITICAL | AlertBanner | Score |
| GOOD_HABIT | INFO | AdviceCard | Score |
| TOP_CATEGORY | INFO | AdviceCard | Analyse |
| HIGH_EXPENSE_RATIO | WARNING | AdviceCard | Analyse |
| SUBSCRIPTION_BLOAT | INFO | AdviceCard | Analyse |
| SAVINGS_DROP | WARNING | AlertBanner | Revenus |
| INCOME_DROP | WARNING | AlertBanner | Revenus |

## Data Sources (API Mapping)

```typescript
// Base: http://localhost:4000, Auth: JWT Bearer

interface AnalyticsEndpoints {
  // Dashboard
  balance:       'GET /analytics/:customerId/balance/average'       // averageBalance
  cashflow:      'GET /analytics/:customerId/revenues/cashflow'     // totalCredits, totalDebits, netFlow
  score:         'GET /analytics/:customerId/score'                 // globalScore, label
  scoreHistory:  'GET /analytics/:customerId/score/history?months=6' // history[], trend
  scoreExplain:  'GET /analytics/:customerId/score/explanation'     // indicators[]
  
  // Analyse
  expensesDetect:    'GET /analytics/:customerId/expenses/detect'
  expensesCats:     'GET /analytics/:customerId/expenses/categories'
  expensesRecurring:'GET /analytics/:customerId/expenses/recurring?months=3'
  expensesVariable: 'GET /analytics/:customerId/expenses/variable'
  expensesRatio:    'GET /analytics/:customerId/expenses/ratio'
  
  // Revenus
  revenuesMonthly:  'GET /analytics/:customerId/revenues/monthly'
  revenuesSources:  'GET /analytics/:customerId/revenues/sources'
  revenuesFreq:     'GET /analytics/:customerId/revenues/frequency'
  revenuesVariation:'GET /analytics/:customerId/revenues/variation'
  
  // Advice
  advice:           'GET /analytics/:customerId/advice'
  recommendations:  'GET /analytics/:customerId/score/recommendations'
}

interface AuthEndpoints {
  register:    'POST /auth/register'    // 4 steps: account → contact → otp → password
  login:       'POST /auth/login'
  resendOtp:   'POST /auth/resend-otp'
  forgotPwd:   'POST /auth/forgot-password'  // 3 steps: contact → otp → new password
  me:          'POST /auth/me'
  logout:      'POST /auth/logout'
}

interface EligibilityEndpoint {
  evaluate:    'POST /eligibility/evaluate'  // productName, status, scorePercent, rules[]
}
```

---

## Écrans à concevoir (prochaines étapes)

1. **Analyse** — Dépenses par catégorie, récurrentes vs variables, ratio dépenses/revenus
2. **Score** — Score détaillé, historique (graphique), recommandations, explication des indicateurs
3. **Profil** — Infos personnelles, score récap, éligibilité produits, déconnexion
