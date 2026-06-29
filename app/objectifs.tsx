import { useCallback, useRef, useState } from "react";
import {
  View,
  ScrollView,
  Text,
  TextInput,
  StyleSheet,
  Pressable,
  RefreshControl,
} from "react-native";
import {
  Plus,
  Target,
  TrendingUp,
  Calendar,
  PiggyBank,
  X,
} from "lucide-react-native";
import { tokens } from "@/lib/tokens";
import PageHeader from "@/components/PageHeader";
import {
  BottomSheetModal,
  BottomSheetView,
  BottomSheetBackdrop,
} from "@gorhom/bottom-sheet";
import type { BottomSheetBackdropProps } from "@gorhom/bottom-sheet";
import { useSavingsGoals, useSavingsIndicators, useCreateGoal } from "@/queries/useSavings";
import { Skeleton, SkeletonSummaryRow, SkeletonList } from "@/components/ui/Skeleton";
import { ErrorState } from "@/components/ui/ErrorState";
import { EmptyState } from "@/components/ui/EmptyState";
import { showAlert } from "@/components/ui/CustomAlert";

const FG = tokens.onSurface;
const MFG = tokens.onSurfaceVariant;
const P = tokens.accent;

const scoreColor = (s: number) =>
  s >= 70 ? tokens.positive : s >= 40 ? tokens.warning : tokens.negative;

export default function ObjectifsPage() {
  const sheetRef = useRef<BottomSheetModal>(null);
  const [goalName, setGoalName] = useState("");
  const [goalTarget, setGoalTarget] = useState("");
  const [goalMonthly, setGoalMonthly] = useState("");

  const { data: goals, isLoading: goalsLoading, error: goalsError, refetch: refetchGoals, isRefetching } = useSavingsGoals();
  const indicators = useSavingsIndicators();
  const createGoalMut = useCreateGoal();

  const indicatorsLoading = indicators.some((q) => q.isLoading);
  const indicatorsError = indicators.find((q) => q.error);
  const rate = indicators[0]?.data;
  const freq = indicators[1]?.data;
  const retention = indicators[2]?.data;

  const openNewGoal = useCallback(() => sheetRef.current?.present(), []);
  const closeNewGoal = useCallback(() => {
    sheetRef.current?.dismiss();
    setGoalName("");
    setGoalTarget("");
    setGoalMonthly("");
  }, []);

  const handleCreateGoal = async () => {
    if (!goalName.trim() || !goalTarget.trim()) {
      await showAlert({
        title: "Champs requis",
        message: "Donnez un nom et un montant cible à votre objectif.",
        buttons: [{ text: "OK" }],
      });
      return;
    }
    createGoalMut.mutate(
      {
        label: goalName.trim(),
        targetAmount: parseInt(goalTarget) || 0,
        monthlyContribution: parseInt(goalMonthly) || 0,
      },
      {
        onSuccess: () => {
          refetchGoals();
          showAlert({
            title: "Objectif créé !",
            message: `"${goalName.trim()}" — ${parseInt(goalTarget).toLocaleString("fr-FR")} F`,
            buttons: [{ text: "OK" }],
          });
          closeNewGoal();
        },
        onError: () => {
          showAlert({
            title: "Erreur",
            message: "Impossible de créer l'objectif. Réessayez.",
            buttons: [{ text: "OK" }],
          });
        },
      },
    );
  };

  if (goalsLoading || indicatorsLoading) {
    return (
      <View style={styles.container}>
        <PageHeader title="Objectifs d'épargne" subtitle="Suivez vos progrès" />
        <ScrollView style={styles.scroll} contentContainerStyle={styles.scrollContent}>
          <SkeletonSummaryRow count={3} />
          <View style={styles.sectionHeader}>
            <Skeleton className="h-4 w-24" />
          </View>
          <SkeletonList count={3} />
        </ScrollView>
      </View>
    );
  }

  if (goalsError || indicatorsError) {
    return (
      <View style={styles.container}>
        <PageHeader title="Objectifs d'épargne" subtitle="Suivez vos progrès" />
        <ErrorState onRetry={refetchGoals} />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <PageHeader
        title="Objectifs d'épargne"
        subtitle="Suivez vos progrès"
      />
      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl refreshing={isRefetching} onRefresh={refetchGoals} />
        }
      >
        <View style={styles.summaryRow}>
          <View style={styles.summaryCard}>
            <View style={[styles.iconDot, { backgroundColor: P + "18" }]}>
              <TrendingUp size={15} color={P} />
            </View>
            <Text style={styles.summaryValue}>{rate!.savingsRate}%</Text>
            <Text style={styles.summaryLabel}>Taux</Text>
            <Text style={[styles.summaryScore, { color: scoreColor(rate!.score) }]}>
              {rate!.score}
            </Text>
          </View>
          <View style={styles.summaryCard}>
            <View style={[styles.iconDot, { backgroundColor: P + "18" }]}>
              <Calendar size={15} color={P} />
            </View>
            <Text style={styles.summaryValue}>{freq!.regularityRate}%</Text>
            <Text style={styles.summaryLabel}>Régularité</Text>
            <Text style={[styles.summaryScore, { color: scoreColor(freq!.score) }]}>
              {freq!.score}
            </Text>
          </View>
          <View style={styles.summaryCard}>
            <View style={[styles.iconDot, { backgroundColor: P + "18" }]}>
              <Target size={15} color={P} />
            </View>
            <Text style={styles.summaryValue}>{retention!.averageRetentionDays}</Text>
            <Text style={styles.summaryLabel}>Rétention</Text>
            <Text style={[styles.summaryScore, { color: scoreColor(retention!.score) }]}>
              {retention!.score}
            </Text>
          </View>
        </View>

        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Mes objectifs</Text>
          <Pressable onPress={openNewGoal} style={styles.addBtn}>
            <Plus size={14} color={P} />
            <Text style={styles.addText}>Ajouter</Text>
          </Pressable>
        </View>

        {(!goals || goals.length === 0) && (
          <EmptyState
            title="Aucun objectif"
            description="Créez votre premier objectif d'épargne"
            actionLabel="Créer un objectif"
            onAction={openNewGoal}
          />
        )}

        {goals?.map((goal) => {
          const progress = Math.min(
            (goal.currentAmount / goal.targetAmount) * 100,
            100,
          );
          return (
            <View key={goal.id} style={styles.goalCard}>
              <View style={styles.goalTop}>
                <View style={styles.goalIconBox}>
                  <PiggyBank size={15} color={P} />
                </View>
                <View style={styles.goalTextArea}>
                  <Text style={styles.goalLabel}>{goal.label}</Text>
                  {goal.deadline && (
                    <Text style={styles.goalDeadline}>
                      Échéance {goal.deadline}
                    </Text>
                  )}
                </View>
                <Text style={styles.goalPercent}>{Math.round(progress)}%</Text>
              </View>
              <View style={styles.goalBar}>
                <View style={[styles.goalBarFill, { width: `${progress}%` }]} />
              </View>
              <View style={styles.goalNumbers}>
                <Text style={styles.goalAmount}>
                  <Text style={{ color: FG }}>
                    {goal.currentAmount.toLocaleString("fr-FR")} F
                  </Text>
                  {" / "}
                  {goal.targetAmount.toLocaleString("fr-FR")} F
                </Text>
                <Text style={styles.goalMonthly}>
                  {goal.monthlyContribution.toLocaleString("fr-FR")} F/mois
                </Text>
              </View>
            </View>
          );
        })}

        <View style={styles.retentionCard}>
          <Text style={styles.retentionLabel}>Rétention de l'épargne</Text>
          <Text style={styles.retentionText}>
            {retention!.interpretation}
          </Text>
        </View>
      </ScrollView>

      <BottomSheetModal
        ref={sheetRef}
        snapPoints={["50%"]}
        enablePanDownToClose
        backgroundStyle={{ backgroundColor: tokens.surface }}
        backdropComponent={(props: BottomSheetBackdropProps) => (
          <BottomSheetBackdrop
            {...props}
            appearsOnIndex={0}
            disappearsOnIndex={-1}
            opacity={0.9}
          />
        )}
      >
        <BottomSheetView style={styles.sheetContent}>
          <View style={styles.sheetHeader}>
            <Text style={styles.sheetTitle}>Nouvel objectif</Text>
            <Pressable onPress={closeNewGoal} style={styles.sheetClose}>
              <X size={18} color={MFG} />
            </Pressable>
          </View>

          <View style={styles.sheetField}>
            <Text style={styles.sheetLabel}>Nom de l'objectif</Text>
            <TextInput
              style={styles.sheetInput}
              placeholder="Ex: Voyage, Urgences..."
              placeholderTextColor={MFG}
              value={goalName}
              onChangeText={setGoalName}
            />
          </View>

          <View style={styles.sheetField}>
            <Text style={styles.sheetLabel}>Montant cible (F CFA)</Text>
            <TextInput
              style={styles.sheetInput}
              placeholder="500 000"
              placeholderTextColor={MFG}
              keyboardType="numeric"
              value={goalTarget}
              onChangeText={setGoalTarget}
            />
          </View>

          <View style={styles.sheetField}>
            <Text style={styles.sheetLabel}>Apport mensuel (optionnel)</Text>
            <TextInput
              style={styles.sheetInput}
              placeholder="50 000"
              placeholderTextColor={MFG}
              keyboardType="numeric"
              value={goalMonthly}
              onChangeText={setGoalMonthly}
            />
          </View>

          <Pressable
            style={[styles.sheetSubmit, createGoalMut.isPending && { opacity: 0.6 }]}
            onPress={handleCreateGoal}
            disabled={createGoalMut.isPending}
          >
            <Text style={styles.sheetSubmitText}>
              {createGoalMut.isPending ? "Création..." : "Créer l'objectif"}
            </Text>
          </Pressable>
        </BottomSheetView>
      </BottomSheetModal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: tokens.background },
  scroll: { flex: 1, paddingHorizontal: 16 },
  scrollContent: { paddingBottom: 120, gap: 14, paddingTop: 16 },
  summaryRow: { flexDirection: "row", gap: 10 },
  summaryCard: {
    flex: 1,
    backgroundColor: tokens.surface,
    borderRadius: 14,
    padding: 12,
    alignItems: "center",
    gap: 3,
  },
  iconDot: {
    width: 30,
    height: 30,
    borderRadius: 15,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 2,
  },
  summaryValue: {
    fontFamily: "BebasNeue_400Regular",
    fontSize: 26,
    color: FG,
  },
  summaryLabel: {
    fontFamily: "DMSans_500Medium",
    fontSize: 9,
    color: MFG,
    textTransform: "uppercase",
    letterSpacing: 0.6,
  },
  summaryScore: {
    fontFamily: "DMSans_600SemiBold",
    fontSize: 13,
  },
  sectionHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 6,
  },
  sectionTitle: {
    fontFamily: "DMSans_500Medium",
    fontSize: 13,
    color: MFG,
    textTransform: "uppercase",
    letterSpacing: 0.5,
  },
  addBtn: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
    paddingVertical: 4,
    paddingHorizontal: 10,
    borderRadius: 8,
    backgroundColor: P + "15",
  },
  addText: {
    fontFamily: "DMSans_500Medium",
    fontSize: 11,
    color: P,
  },
  goalCard: {
    backgroundColor: tokens.surface,
    borderRadius: 14,
    padding: 14,
    gap: 8,
  },
  goalTop: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  goalIconBox: {
    width: 34,
    height: 34,
    borderRadius: 10,
    backgroundColor: tokens.accent + "15",
    alignItems: "center",
    justifyContent: "center",
  },
  goalTextArea: { flex: 1 },
  goalLabel: {
    fontFamily: "DMSans_600SemiBold",
    fontSize: 14,
    color: FG,
  },
  goalDeadline: {
    fontFamily: "DMSans_400Regular",
    fontSize: 11,
    color: MFG,
    marginTop: 1,
  },
  goalPercent: {
    fontFamily: "DMSans_600SemiBold",
    fontSize: 16,
    color: P,
  },
  goalBar: {
    height: 6,
    backgroundColor: tokens.surfaceDim,
    borderRadius: 3,
    overflow: "hidden",
  },
  goalBarFill: {
    height: "100%",
    backgroundColor: P,
    borderRadius: 3,
  },
  goalNumbers: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  goalAmount: {
    fontFamily: "DMSans_400Regular",
    fontSize: 11,
    color: MFG,
  },
  goalMonthly: {
    fontFamily: "DMSans_500Medium",
    fontSize: 11,
    color: P,
  },
  retentionCard: {
    backgroundColor: tokens.surface,
    borderRadius: 14,
    padding: 16,
    gap: 6,
  },
  retentionLabel: {
    fontFamily: "DMSans_500Medium",
    fontSize: 11,
    color: MFG,
    textTransform: "uppercase",
    letterSpacing: 0.5,
  },
  retentionText: {
    fontFamily: "DMSans_400Regular",
    fontSize: 12,
    color: FG,
    lineHeight: 17,
  },
  sheetContent: {
    padding: 24,
    gap: 20,
  },
  sheetHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  sheetTitle: {
    fontFamily: "DMSans_600SemiBold",
    fontSize: 18,
    color: FG,
  },
  sheetClose: {
    width: 32,
    height: 32,
    borderRadius: 8,
    backgroundColor: tokens.surfaceDim,
    alignItems: "center",
    justifyContent: "center",
  },
  sheetField: { gap: 6 },
  sheetLabel: {
    fontFamily: "DMSans_500Medium",
    fontSize: 12,
    color: MFG,
  },
  sheetInput: {
    backgroundColor: tokens.surfaceDim,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: tokens.outline,
    padding: 14,
    fontFamily: "DMSans_400Regular",
    fontSize: 15,
    color: FG,
  },
  sheetSubmit: {
    backgroundColor: P,
    borderRadius: 10,
    height: 48,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 4,
  },
  sheetSubmitText: {
    fontFamily: "DMSans_600SemiBold",
    fontSize: 15,
    color: "#FFFFFF",
  },
});
