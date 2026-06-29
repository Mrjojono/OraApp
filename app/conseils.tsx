import { View, ScrollView, Text, StyleSheet, RefreshControl } from "react-native";
import { TrendingDown } from "lucide-react-native";
import { tokens } from "@/lib/tokens";
import PageHeader from "@/components/PageHeader";
import { useRecommendations } from "@/queries/useRecommendations";
import { Skeleton, SkeletonCard } from "@/components/ui/Skeleton";
import { ErrorState } from "@/components/ui/ErrorState";

const FG = tokens.onSurface;
const MFG = tokens.onSurfaceVariant;
const P = tokens.accent;

const priorityColor: Record<string, string> = {
  HIGH: tokens.negative,
  MEDIUM: tokens.warning,
  LOW: P,
};

const priorityLabel: Record<string, string> = {
  HIGH: "Prioritaire",
  MEDIUM: "Important",
  LOW: "Suggestion",
};

export default function ConseilsPage() {
  const { data: recos, isLoading, error, refetch, isRefetching } = useRecommendations();

  if (isLoading) {
    return (
      <View style={styles.container}>
        <PageHeader title="Conseils" subtitle="Chargement..." />
        <ScrollView
          style={styles.scroll}
          contentContainerStyle={styles.scrollContent}
        >
          <Skeleton className="h-3 w-32 mb-1" />
          <Skeleton className="h-12 w-48 mb-1" />
          <Skeleton className="h-3 w-20 mb-6" />
          <SkeletonCard />
          <Skeleton className="h-px w-full my-6" />
          <Skeleton className="h-3 w-40 mb-3" />
          <SkeletonCard />
          <SkeletonCard />
        </ScrollView>
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.container}>
        <PageHeader title="Conseils" subtitle="Erreur de chargement" />
        <ErrorState onRetry={refetch} />
      </View>
    );
  }

  if (!recos || recos.length === 0) {
    return (
      <View style={styles.container}>
        <PageHeader title="Conseils" subtitle="0 recommandation" />
        <View style={styles.emptyWrap}>
          <Text style={styles.emptyText}>Aucune recommandation pour le moment</Text>
        </View>
      </View>
    );
  }

  const totalPotential = recos
    .filter((r) => r.actionAmount)
    .reduce((sum, r) => sum + (r.actionAmount ?? 0), 0);

  const sorted = [...recos].sort(
    (a, b) =>
      ({ HIGH: 0, MEDIUM: 1, LOW: 2 }[a.priority]) -
      ({ HIGH: 0, MEDIUM: 1, LOW: 2 }[b.priority]),
  );

  const [featured, ...rest] = sorted;

  return (
    <View style={styles.container}>
      <PageHeader title="Conseils" subtitle={`${recos.length} recommandation${recos.length > 1 ? "s" : ""}`} />
      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl refreshing={isRefetching} onRefresh={refetch} />
        }
      >
        <Text style={styles.totalLabel}>Économies potentielles</Text>
        <Text style={styles.totalValue}>
          {totalPotential.toLocaleString("fr-FR")} F
        </Text>
        <Text style={styles.totalPer}>par mois</Text>

        {featured && (
          <View style={styles.featuredCard}>
            <View style={styles.featuredTop}>
              <Text style={[styles.featuredPrio, { color: priorityColor[featured.priority] }]}>
                {priorityLabel[featured.priority]}
              </Text>
            </View>
            <Text style={styles.featuredTitle}>{featured.title}</Text>
            <Text style={styles.featuredMsg}>{featured.message}</Text>
            {featured.actionAmount && (
              <View style={styles.actionRow}>
                <TrendingDown size={14} color={P} />
                <Text style={styles.actionText}>
                  {featured.actionAmount.toLocaleString("fr-FR")} F/mois
                </Text>
              </View>
            )}
          </View>
        )}

        <View style={styles.divider} />

        <Text style={styles.listLabel}>Autres recommandations</Text>

        {rest.map((rec, i) => (
          <View key={i} style={styles.card}>
            <View style={styles.cardTop}>
              <Text style={[styles.cardPrio, { color: priorityColor[rec.priority] }]}>
                {priorityLabel[rec.priority]}
              </Text>
            </View>
            <Text style={styles.cardTitle}>{rec.title}</Text>
            <Text style={styles.cardMsg}>{rec.message}</Text>
            {rec.actionAmount && (
              <View style={styles.actionRow}>
                <TrendingDown size={14} color={P} />
                <Text style={styles.actionText}>
                  {rec.actionAmount.toLocaleString("fr-FR")} F/mois
                </Text>
              </View>
            )}
          </View>
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: tokens.background },
  scroll: { flex: 1, paddingHorizontal: 16 },
  scrollContent: { paddingBottom: 120, gap: 0, paddingTop: 20 },
  totalLabel: {
    fontFamily: "DMSans_500Medium",
    fontSize: 11,
    color: MFG,
    textTransform: "uppercase",
    letterSpacing: 1,
  },
  totalValue: {
    fontFamily: "BebasNeue_400Regular",
    fontSize: 48,
    color: P,
    marginTop: 2,
  },
  totalPer: {
    fontFamily: "DMSans_400Regular",
    fontSize: 12,
    color: MFG,
    marginBottom: 24,
  },
  featuredCard: {
    backgroundColor: tokens.surface,
    borderRadius: 14,
    padding: 20,
    gap: 12,
    borderWidth: 1,
    borderColor: tokens.outline + "50",
  },
  featuredTop: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  featuredPrio: {
    fontFamily: "DMSans_500Medium",
    fontSize: 11,
    textTransform: "uppercase",
    letterSpacing: 0.8,
  },
  featuredTitle: {
    fontFamily: "DMSans_600SemiBold",
    fontSize: 17,
    color: FG,
    lineHeight: 22,
  },
  featuredMsg: {
    fontFamily: "DMSans_400Regular",
    fontSize: 13,
    color: MFG,
    lineHeight: 19,
  },
  divider: {
    height: 1,
    backgroundColor: tokens.outline + "40",
    marginVertical: 24,
  },
  listLabel: {
    fontFamily: "DMSans_500Medium",
    fontSize: 12,
    color: MFG,
    marginBottom: 12,
  },
  card: {
    backgroundColor: tokens.surface,
    borderRadius: 12,
    padding: 16,
    gap: 8,
    marginBottom: 10,
  },
  cardTop: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
  },
  cardPrio: {
    fontFamily: "DMSans_500Medium",
    fontSize: 10,
    textTransform: "uppercase",
    letterSpacing: 0.6,
  },
  cardTitle: {
    fontFamily: "DMSans_600SemiBold",
    fontSize: 14,
    color: FG,
    lineHeight: 19,
  },
  cardMsg: {
    fontFamily: "DMSans_400Regular",
    fontSize: 12,
    color: MFG,
    lineHeight: 17,
  },
  actionRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    backgroundColor: tokens.accent + "10",
    borderRadius: 8,
    paddingVertical: 8,
    paddingHorizontal: 10,
    marginTop: 2,
  },
  actionText: {
    fontFamily: "DMSans_600SemiBold",
    fontSize: 12,
    color: P,
  },
  emptyWrap: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 24,
  },
  emptyText: {
    fontFamily: "DMSans_400Regular",
    fontSize: 14,
    color: MFG,
    textAlign: "center",
  },
});
