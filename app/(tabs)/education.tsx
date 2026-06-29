import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  RefreshControl,
} from "react-native";
import { useRouter } from "expo-router";
import { tokens } from "@/lib/tokens";
import { useEducationPaths } from "@/queries/useEducation";
import { SkeletonList } from "@/components/ui/Skeleton";
import { ErrorState } from "@/components/ui/ErrorState";
import { RecoCard } from "@/components/education/RecoCard";
import { PathCard } from "@/components/education/PathCard";

const mockRecos = [
  {
    id: "reco-1",
    title: "Épargner même avec un petit revenu",
    reason: "Basé sur votre profil financier",
    pathId: "epargne",
    highlighted: true,
  },
  {
    id: "reco-2",
    title: "Comprendre le taux d'endettement",
    reason: "Recommandé pour votre niveau",
    pathId: "credit-responsable",
    highlighted: false,
  },
];

export default function Education() {
  const router = useRouter();
  const { data: paths, isLoading, error, refetch, isRefetching } = useEducationPaths();

  if (isLoading) {
    return (
      <View style={styles.container}>
        <ScrollView style={styles.scroll} contentContainerStyle={styles.scrollContent}>
          <Text style={styles.pageTitle}>Éducation</Text>
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Recommandé pour vous</Text>
            <SkeletonList count={2} />
          </View>
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Mes parcours</Text>
            <SkeletonList count={3} />
          </View>
        </ScrollView>
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.container}>
        <ErrorState onRetry={refetch} />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl refreshing={isRefetching} onRefresh={refetch} />
        }
      >
        <Text style={styles.pageTitle}>Éducation</Text>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Recommandé pour vous</Text>
          {mockRecos.map((reco) => (
            <RecoCard
              key={reco.id}
              title={reco.title}
              reason={reco.reason}
              highlighted={reco.highlighted}
              onPress={() =>
                router.push(`/education/path/${reco.pathId}` as any)
              }
            />
          ))}
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Mes parcours</Text>
          {paths?.length === 0 && (
            <Text style={styles.emptyText}>Aucun parcours disponible</Text>
          )}
          {paths?.map((path) => (
            <PathCard
              key={path.id}
              path={path}
              onPress={() => router.push(`/education/path/${path.id}` as any)}
            />
          ))}
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: tokens.background,
  },
  scroll: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: 120,
  },
  pageTitle: {
    fontSize: 22,
    fontWeight: "600",
    color: tokens.onSurface,
    fontFamily: "DMSans_600SemiBold",
    paddingHorizontal: 16,
    paddingTop: 24,
    paddingBottom: 20,
  },
  section: {
    gap: 12,
    paddingHorizontal: 16,
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 15,
    fontWeight: "600",
    color: tokens.onSurface,
    fontFamily: "DMSans_600SemiBold",
  },
  emptyText: {
    fontFamily: "DMSans_400Regular",
    fontSize: 13,
    color: tokens.onSurfaceVariant,
    textAlign: "center",
    paddingVertical: 24,
  },
});
