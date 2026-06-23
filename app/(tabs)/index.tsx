import React, { useRef, useState, useCallback } from "react";
import {
  View,
  Text,
  ScrollView,
  RefreshControl,
  StyleSheet,
} from "react-native";
import { BottomSheetModal, BottomSheetView } from "@gorhom/bottom-sheet";
import { tokens } from "@/lib/tokens";
import { HomeHeader } from "@/components/dashboard/HomeHeader";
import { BalanceSection } from "@/components/dashboard/BalanceSection";
import { QuickActions } from "@/components/dashboard/QuickActions";
import { AlertBanner } from "@/components/dashboard/AlertBanner";
import { OraScoreCard } from "@/components/dashboard/OraScoreCard";
import { BudgetCard } from "@/components/dashboard/BudgetCard";
import { BlurBackdrop } from "@/components/BlurBackdrop";
import {
  Home,
  Car,
  UtensilsCrossed,
  Gamepad2,
  Wrench,
} from "lucide-react-native";

const P = tokens.accent;
const FG = tokens.onSurface;
const MFG = tokens.onSurfaceVariant;
const ACCENT = tokens.surface;
const BORDER = tokens.outline;

const categoryIcons: Record<string, (c: string) => React.ReactNode> = {
  LOGEMENT: (c) => <Home size={16} color={c} />,
  NOURRITURE: (c) => <UtensilsCrossed size={16} color={c} />,
  TRANSPORT: (c) => <Car size={16} color={c} />,
  LOISIRS: (c) => <Gamepad2 size={16} color={c} />,
  SERVICES: (c) => <Wrench size={16} color={c} />,
};

const budgetItems = [
  {
    key: "LOGEMENT",
    label: "Logement",
    amount: 154000,
    color: tokens.accent,
    percent: 40,
    count: 3,
  },
  {
    key: "NOURRITURE",
    label: "Alimentation",
    amount: 96250,
    color: tokens.warning,
    percent: 25,
    count: 8,
  },
  {
    key: "TRANSPORT",
    label: "Transport",
    amount: 57750,
    color: "#4C9AFF",
    percent: 15,
    count: 5,
  },
  {
    key: "LOISIRS",
    label: "Loisirs",
    amount: 38500,
    color: "#FFC043",
    percent: 10,
    count: 4,
  },
  {
    key: "SERVICES",
    label: "Services",
    amount: 38500,
    color: "#A5A5A5",
    percent: 10,
    count: 2,
  },
];

const totalBudget = budgetItems
  .reduce((sum, i) => sum + i.amount, 0)
  .toLocaleString("fr-FR");

const dominantCategory = budgetItems.reduce((max, i) =>
  i.percent > max.percent ? i : max,
).key;

const styles = StyleSheet.create({
  scroll: {
    flex: 1,
    paddingHorizontal: 1,
  },
  scrollContent: {
    paddingBottom: 120,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 14,
  },
  headerTitle: {
    fontSize: 15,
    fontWeight: "500",
    color: FG,
  },
  headerTotal: {
    fontSize: 12,
    color: MFG,
  },
  item: {
    backgroundColor: tokens.surfaceDim,
    borderRadius: 10,
    padding: 12,
    marginBottom: 10,
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },
  iconBox: {
    width: 35,
    height: 35,
    borderRadius: 5,
    backgroundColor: ACCENT,
    alignItems: "center",
    justifyContent: "center",
    marginRight: 10,
  },
  labelArea: { flex: 1 },
  labelRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
  },
  label: {
    fontSize: 13,
    fontWeight: "500",
    color: FG,
  },
  badge: {
    backgroundColor: ACCENT,
    borderRadius: 3,
    paddingHorizontal: 7,
    paddingVertical: 2,
  },
  badgeText: {
    fontSize: 10,
    color: P,
  },
  subtitle: {
    fontSize: 11,
    color: MFG,
    marginTop: 1,
  },
  percentRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
  },
  percent: {
    fontSize: 14,
    fontWeight: "600",
  },
  barTrack: {
    height: 4,
    backgroundColor: ACCENT,
    borderRadius: 4,
    overflow: "hidden",
  },
  barFill: {
    height: "100%",
    borderRadius: 4,
  },
});

const Index = () => {
  const [refreshing, setRefreshing] = useState(false);
  const budgetSheetRef = useRef<BottomSheetModal>(null);

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    setTimeout(() => setRefreshing(false), 2000);
  }, []);

  const openBudgetSheet = useCallback(() => {
    budgetSheetRef.current?.present();
  }, []);

  return (
    <View className="flex-1" style={{ backgroundColor: tokens.background }}>
      <ScrollView
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
        className="flex-1"
        style={styles.scroll}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <HomeHeader />
        <BalanceSection />
        <QuickActions />
        <AlertBanner />
        <OraScoreCard />
        <BudgetCard onSeeAll={openBudgetSheet} />
      </ScrollView>

      <BottomSheetModal
        ref={budgetSheetRef}
        snapPoints={["50%"]}
        enablePanDownToClose
        backgroundStyle={{ backgroundColor: tokens.surface }}
        backdropComponent={BlurBackdrop}
      >
        <BottomSheetView style={{ padding: 16 }}>
          <View style={styles.header}>
            <Text style={styles.headerTitle}>Catégories de dépenses</Text>
            <Text style={styles.headerTotal}>{totalBudget} F</Text>
          </View>

          {budgetItems.map((item) => {
            const renderIcon =
              categoryIcons[item.key] ?? categoryIcons.LOGEMENT;
            const isDominant = item.key === dominantCategory;

            return (
              <View key={item.key} style={styles.item}>
                <View style={styles.row}>
                  <View style={styles.iconBox}>{renderIcon(item.color)}</View>

                  <View style={styles.labelArea}>
                    <View style={styles.labelRow}>
                      <Text style={styles.label}>{item.label}</Text>
                      {isDominant && (
                        <View style={styles.badge}>
                          <Text style={styles.badgeText}>Principal</Text>
                        </View>
                      )}
                    </View>
                    <Text style={styles.subtitle}>
                      {item.amount.toLocaleString("fr-FR")} F · {item.count}{" "}
                      {item.count > 1 ? "transactions" : "transaction"}
                    </Text>
                  </View>

                  <View style={styles.percentRow}>
                    <Text
                      style={[
                        styles.percent,
                        {
                          color: item.percent >= 50 ? item.color : FG,
                        },
                      ]}
                    >
                      {item.percent}%
                    </Text>
                  </View>
                </View>

                <View style={styles.barTrack}>
                  <View
                    style={[
                      styles.barFill,
                      {
                        width: `${item.percent}%`,
                        backgroundColor: item.color,
                      },
                    ]}
                  />
                </View>
              </View>
            );
          })}
        </BottomSheetView>
      </BottomSheetModal>
    </View>
  );
};

export default Index;
