import { useCallback, useMemo, useRef, useState } from "react";
import { View, ScrollView, Text, StyleSheet, RefreshControl } from "react-native";
import BottomSheet, { BottomSheetModal, BottomSheetScrollView, BottomSheetBackdrop } from "@gorhom/bottom-sheet";
import type { BottomSheetBackdropProps } from "@gorhom/bottom-sheet";
import { tokens } from "@/lib/tokens";
import ScoreHero from "@/components/score/ScoreHero";
import ScoreComponentCard from "@/components/score/ScoreComponentCard";
import ComponentDetailSheet from "@/components/score/ComponentDetailSheet";
import { mockScoreData } from "@/constants/mockScore";
import { COMPONENT_CONFIG } from "@/types/score";
import type { ScoreComponent } from "@/types/score";

const Score = () => {
  const [refreshing, setRefreshing] = useState(false);
  const [selectedComp, setSelectedComp] = useState<string | null>(null);
  const sheetRef = useRef<BottomSheetModal>(null);

  const data = mockScoreData;

  const onRefresh = useCallback(async () => {
    setRefreshing(true);
    await new Promise((r) => setTimeout(r, 1500));
    setRefreshing(false);
  }, []);

  const openDetail = useCallback((id: string) => {
    setSelectedComp(id);
    setTimeout(() => sheetRef.current?.present(), 50);
  }, []);

  const components = useMemo(
    () =>
      Object.entries(data.components).map(([id, comp]) => {
        const config = COMPONENT_CONFIG[id] ?? { label: id, short: id };
        const interp = data.interpretations?.[id];
        return {
          id,
          label: config.label,
          data: comp,
          level: interp?.level ?? "N/A",
        };
      }),
    [data],
  );

  const selectedComponentData = useMemo<
    { id: string; data: ScoreComponent } | undefined
  >(() => {
    if (!selectedComp) return;
    const comp = data.components[selectedComp];
    if (!comp) return;
    return { id: selectedComp, data: comp };
  }, [selectedComp, data.components]);

  const selectedInterpretation = selectedComp
    ? data.interpretations?.[selectedComp]
    : undefined;

  return (
    <View style={styles.container}>
      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >
        <ScoreHero score={data.globalScore} label={data.label} history={data.history} />

        <View style={styles.sectionLabel}>
          <Text style={styles.sectionTitle}>Composantes du score</Text>
        </View>

        {components.map((c) => (
          <ScoreComponentCard
            key={c.id}
            id={c.id}
            label={c.label}
            score={c.data.score}
            level={c.level}
            contribution={c.data.contribution}
            onPress={openDetail}
          />
        ))}

        {data.history && data.history.length > 0 && (
          <View style={styles.card}>
            <Text style={styles.historyTitle}>Évolution (6 derniers mois)</Text>
            <View style={styles.chartRow}>
              {data.history.map((h, i) => {
                const maxScore = Math.max(...data.history!.map((x) => x.score), 1);
                const heightPct = (h.score / maxScore) * 100;
                return (
                  <View key={i} style={styles.barCol}>
                    <Text style={styles.barScore}>{h.score}</Text>
                    <View style={styles.barTrack}>
                      <View
                        style={[
                          styles.barFill,
                          {
                            height: `${heightPct}%`,
                            backgroundColor:
                              h.score < 20
                                ? tokens.negative
                                : h.score < 40
                                  ? "#C48A2C"
                                  : h.score < 60
                                    ? tokens.warning
                                    : tokens.positive,
                          },
                        ]}
                      />
                    </View>
                    <Text style={styles.barLabel}>{h.month}</Text>
                  </View>
                );
              })}
            </View>
            <Text style={styles.trendNote}>
              Baisse de {data.history[0].score - data.history[data.history.length - 1].score} points. Tendance préoccupante.
            </Text>
          </View>
        )}

        <View style={styles.card}>
          <View style={styles.adviceHeader}>
            <View style={[styles.adviceDot, { backgroundColor: tokens.negative }]} />
            <Text style={styles.adviceTitle}>Situation critique</Text>
          </View>
          <Text style={styles.adviceMsg}>
            Votre score est très bas (29/100). Contactez votre conseiller bancaire
            pour un accompagnement personnalisé.
          </Text>
          <Text style={styles.adviceCta}>Voir les recommandations →</Text>
        </View>

        <View style={styles.card}>
          <Text style={styles.compTitle}>Répartition du score</Text>
          <Text style={styles.compSub}>
            29/100 · {components.length} composantes · Poids: 25% chaque
          </Text>
          <Text style={styles.compDetail}>
            {components.map((c) => `${c.label} ${c.data.score}`).join(" | ")}
          </Text>
        </View>
      </ScrollView>

      <BottomSheetModal
        ref={sheetRef}
        snapPoints={["50%"]}
        enablePanDownToClose
        backgroundStyle={{ backgroundColor: tokens.surface }}
        handleIndicatorStyle={{ backgroundColor: tokens.onSurfaceVariant }}
        backdropComponent={(props: BottomSheetBackdropProps) => (
          <BottomSheetBackdrop
            {...props}
            appearsOnIndex={0}
            disappearsOnIndex={-1}
            opacity={0.9}
          />
        )}
      >
        <BottomSheetScrollView style={styles.sheetContent}>
          {selectedComponentData && (
            <ComponentDetailSheet
              componentId={selectedComponentData.id}
              data={selectedComponentData.data}
              interpretation={selectedInterpretation}
            />
          )}
        </BottomSheetScrollView>
      </BottomSheetModal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: tokens.background,
  },
  scroll: {
    flex: 1,
    paddingHorizontal: 16,
  },
  scrollContent: {
    paddingBottom: 120,
    gap: 12,
    paddingTop: 16,
  },
  sectionLabel: {
    paddingTop: 8,
  },
  sectionTitle: {
    fontFamily: "DMSans_500Medium",
    fontSize: 13,
    color: tokens.onSurfaceVariant,
    textTransform: "uppercase",
    letterSpacing: 0.5,
  },
  card: {
    backgroundColor: tokens.surface,
    borderRadius: 14,
    padding: 20,
    gap: 12,
  },
  historyTitle: {
    fontFamily: "DMSans_500Medium",
    fontSize: 13,
    color: tokens.onSurfaceVariant,
    textTransform: "uppercase",
    letterSpacing: 0.5,
  },
  chartRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-end",
    height: 120,
    paddingTop: 8,
  },
  barCol: {
    flex: 1,
    alignItems: "center",
    gap: 4,
  },
  barScore: {
    fontFamily: "DMSans_500Medium",
    fontSize: 10,
    color: tokens.onSurfaceVariant,
  },
  barTrack: {
    width: "60%",
    height: "70%",
    backgroundColor: tokens.outline,
    borderRadius: 4,
    overflow: "hidden",
    justifyContent: "flex-end",
  },
  barFill: {
    width: "100%",
    borderRadius: 4,
  },
  barLabel: {
    fontFamily: "DMSans_500Medium",
    fontSize: 10,
    color: tokens.onSurfaceVariant,
  },
  trendNote: {
    fontFamily: "DMSans_500Medium",
    fontSize: 11,
    color: tokens.onSurfaceVariant,
    textAlign: "center",
  },
  adviceHeader: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  adviceDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
  },
  adviceTitle: {
    fontFamily: "DMSans_600SemiBold",
    fontSize: 15,
    color: tokens.onSurface,
  },
  adviceMsg: {
    fontFamily: "DMSans_400Regular",
    fontSize: 13,
    color: tokens.onSurface,
    lineHeight: 20,
  },
  adviceCta: {
    fontFamily: "PlusJakartaSans_600SemiBold",
    fontSize: 12,
    color: tokens.accent,
  },
  compTitle: {
    fontFamily: "DMSans_500Medium",
    fontSize: 13,
    color: tokens.onSurfaceVariant,
    textTransform: "uppercase",
    letterSpacing: 0.5,
  },
  compSub: {
    fontFamily: "DMSans_500Medium",
    fontSize: 11,
    color: tokens.onSurfaceVariant,
  },
  compDetail: {
    fontFamily: "DMSans_500Medium",
    fontSize: 12,
    color: tokens.onSurface,
  },
  sheetContent: {
    padding: 24,
  },
});

export default Score;
