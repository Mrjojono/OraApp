import React, { useState, useRef, useCallback, useMemo } from "react";
import {
  View,
  ScrollView,
  StyleSheet,
  Text,
  Pressable,
  RefreshControl,
} from "react-native";
import {
  BottomSheetModal,
  BottomSheetView,
  BottomSheetScrollView,
  BottomSheetBackdrop,
} from "@gorhom/bottom-sheet";
import type { BottomSheetBackdropProps } from "@gorhom/bottom-sheet";
import { tokens } from "@/lib/tokens";
import { analyseMockData } from "@/constants/mockData";
import RevenueVariationChart from "@/components/RevenueVariationChart";
import type { ExpenseCategory } from "@/types/expense";

import SumCard from "@/components/analysis/SumCard";
import CategoriesCard from "@/components/analysis/CategoriesCard";
import RecVarCard from "@/components/analysis/RecVarCard";
import RatioCard from "@/components/analysis/RatioCard";
import AdviceCard from "@/components/analysis/AdviceCard";
import CategoryBreakdownSheet from "@/components/analysis/CategoryBreakdownSheet";
import CategoryDetailSheet from "@/components/analysis/CategoryDetailSheet";
import RecurringSheet from "@/components/analysis/RecurringSheet";
import VariableSheet from "@/components/analysis/VariableSheet";

const MONTH_SNAP = ["40%"];

const Analysis = () => {
  const [monthIndex, setMonthIndex] = useState(5);
  const data = analyseMockData[monthIndex];
  const isFirst = monthIndex === 0;
  const isLast = monthIndex === analyseMockData.length - 1;

  const [selectedCategory, setSelectedCategory] =
    useState<ExpenseCategory | null>(null);
  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    setTimeout(() => setRefreshing(false), 1500);
  }, []);

  const categoriesSheetRef = useRef<BottomSheetModal>(null);
  const recurringSheetRef = useRef<BottomSheetModal>(null);
  const variableSheetRef = useRef<BottomSheetModal>(null);
  const categoryDetailSheetRef = useRef<BottomSheetModal>(null);
  const monthSheetRef = useRef<BottomSheetModal>(null);

  const openCategories = useCallback(() => {
    categoriesSheetRef.current?.present();
  }, []);

  const openMonthSheet = useCallback(() => {
    monthSheetRef.current?.present();
  }, []);

  const selectMonth = useCallback((index: number) => {
    setMonthIndex(index);
    monthSheetRef.current?.dismiss();
  }, []);

  const openCategoryDetail = useCallback((cat: ExpenseCategory) => {
    setSelectedCategory(cat);
    setTimeout(() => {
      categoryDetailSheetRef.current?.present();
    }, 50);
  }, []);

  const openRecurring = useCallback(() => {
    recurringSheetRef.current?.present();
  }, []);

  const openVariable = useCallback(() => {
    variableSheetRef.current?.present();
  }, []);

  const goPrev = useCallback(() => {
    setMonthIndex((i) => Math.max(0, i - 1));
  }, []);

  const goNext = useCallback(() => {
    setMonthIndex((i) => Math.min(analyseMockData.length - 1, i + 1));
  }, []);

  const selectedCategoryRecurring = useMemo(
    () =>
      selectedCategory
        ? data.recurring.filter((r) => r.category === selectedCategory.category)
        : [],
    [selectedCategory, data.recurring],
  );

  const recurringTotal = data.recurring.reduce(
    (s, r) => s + r.averageAmount,
    0,
  );

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
        <SumCard
          totalExpenses={data.totalExpenses}
          transactionCount={data.transactionCount}
          averageTransaction={data.averageTransaction}
          currentMonth={data.label}
          onPrevMonth={goPrev}
          onNextMonth={goNext}
          onMonthLabelPress={openMonthSheet}
          isFirst={isFirst}
          isLast={isLast}
        />

        <CategoriesCard
          categories={data.categories}
          onPressCategory={openCategoryDetail}
          onPressSeeAll={openCategories}
        />

        <RecVarCard
          recurringTotal={recurringTotal}
          recurringCount={data.recurring.length}
          recurringPercent={Math.round(
            (data.recurring.reduce((s, r) => s + r.averageAmount, 0) /
              data.totalExpenses) *
              100,
          )}
          variableTotal={data.variable.totalAmount}
          variableCount={data.variable.count}
          variablePercent={data.variable.percent}
          onPressRecurring={openRecurring}
          onPressVariable={openVariable}
        />

        <RatioCard
          ratio={data.ratio.ratio}
          label={data.ratio.label}
          expensesAmount={data.ratio.expensesAmount}
          revenueAmount={data.ratio.revenueAmount}
          interpretation={data.ratio.interpretation}
        />

        {data.advice && (
          <AdviceCard
            severity={data.advice.severity}
            title={data.advice.title}
            message={data.advice.message}
          />
        )}

        <RevenueVariationChart
          monthlyRevenues={data.revenueVariation.monthlyRevenues}
          averageVariationPercent={
            data.revenueVariation.averageVariationPercent
          }
          trend={data.revenueVariation.trend}
          volatilityScore={data.revenueVariation.volatilityScore}
          coefficientOfVariation={data.revenueVariation.coefficientOfVariation}
        />
      </ScrollView>

      <BottomSheetModal
        ref={categoryDetailSheetRef}
        snapPoints={["45%"]}
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
          {selectedCategory && (
            <CategoryDetailSheet
              category={selectedCategory}
              totalExpenses={data.totalExpenses}
              recurringItems={selectedCategoryRecurring}
            />
          )}
        </BottomSheetView>
      </BottomSheetModal>

      <BottomSheetModal
        ref={categoriesSheetRef}
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
          <CategoryBreakdownSheet
            categories={data.categories}
            totalAmount={data.totalExpenses}
            onPressCategory={openCategoryDetail}
          />
        </BottomSheetView>
      </BottomSheetModal>

      <BottomSheetModal
        ref={recurringSheetRef}
        snapPoints={["45%"]}
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
          <RecurringSheet
            expenses={data.recurring}
            totalAmount={data.recurring.reduce(
              (s, r) => s + r.averageAmount,
              0,
            )}
            totalCount={data.recurring.length}
          />
        </BottomSheetView>
      </BottomSheetModal>

      <BottomSheetModal
        ref={variableSheetRef}
        snapPoints={["45%"]}
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
          <VariableSheet
            transactions={data.variable.transactions}
            totalAmount={data.variable.totalAmount}
            totalCount={data.variable.count}
            percent={data.variable.percent}
          />
        </BottomSheetView>
      </BottomSheetModal>

      <BottomSheetModal
        ref={monthSheetRef}
        snapPoints={MONTH_SNAP}
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
        <BottomSheetScrollView
          style={styles.sheetContent}
          contentContainerStyle={styles.monthSheetList}
        >
          <Text style={styles.monthSheetTitle}>Choisir un mois</Text>
          {analyseMockData.map((m, i) => {
            const active = i === monthIndex;
            return (
              <Pressable
                key={m.monthKey}
                onPress={() => selectMonth(i)}
                style={[styles.monthRow, active && styles.monthRowActive]}
              >
                <Text
                  style={[
                    styles.monthRowLabel,
                    active && styles.monthRowLabelActive,
                  ]}
                >
                  {m.label}
                </Text>
                {active && <View style={styles.monthDot} />}
              </Pressable>
            );
          })}
        </BottomSheetScrollView>
      </BottomSheetModal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingTop: 0,
    flex: 1,
    backgroundColor: tokens.background,
  },
  scroll: {
    flex: 1,
    paddingHorizontal: 16,
  },
  scrollContent: {
    paddingBottom: 120,
    gap: 16,
  },
  sheetContent: {
    padding: 24,
  },
  monthSheetList: {
    gap: 4,
    paddingBottom: 60,
  },
  monthSheetTitle: {
    fontSize: 17,
    fontWeight: "600",
    color: tokens.onSurface,
    marginBottom: 12,
  },
  monthRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 14,
    paddingHorizontal: 16,
    borderRadius: 10,
  },
  monthRowActive: {
    backgroundColor: tokens.accentContainer,
  },
  monthRowLabel: {
    fontSize: 15,
    fontWeight: "500",
    color: tokens.onSurface,
  },
  monthRowLabelActive: {
    color: tokens.accent,
    fontWeight: "600",
  },
  monthDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: tokens.accent,
  },
});

export default Analysis;
