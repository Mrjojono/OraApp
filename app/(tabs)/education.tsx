import React, { useRef, useState, useCallback } from "react";
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  RefreshControl,
  Pressable,
} from "react-native";
import { useRouter } from "expo-router";
import {
  BottomSheetModal,
  BottomSheetView,
  BottomSheetBackdrop,
} from "@gorhom/bottom-sheet";
import type { BottomSheetBackdropProps } from "@gorhom/bottom-sheet";
import { GraduationCap, Sparkles, ArrowUpRight } from "lucide-react-native";
import { tokens } from "@/lib/tokens";
import { mockPaths } from "@/constants/mockEducation";
import { PathCard } from "@/components/education/PathCard";

const categories = [
  { key: "all", label: "Tous" },
  { key: "debutant", label: "Débutant" },
  { key: "budget", label: "Budget" },
  { key: "epargne", label: "Épargne" },
  { key: "credit", label: "Crédit" },
];

const activePaths = mockPaths.filter((p) => p.status !== "completed" && p.status !== "new" || p.status === "new");

export default function Education() {
  const router = useRouter();
  const [filter, setFilter] = useState("all");
  const [refreshing, setRefreshing] = useState(false);
  const sheetsRef = useRef<BottomSheetModal>(null);

  const filtered =
    filter === "all"
      ? mockPaths
      : mockPaths.filter((p) => p.category === filter);

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    setTimeout(() => setRefreshing(false), 800);
  }, []);

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
        <View style={styles.hero}>
          <View style={styles.heroIconBox}>
            <GraduationCap size={28} color={tokens.accent} />
          </View>
          <Text style={styles.heroTitle}>Apprendre & grandir</Text>
          <Text style={styles.heroSubtitle}>
            Maîtrisez vos finances avec des parcours interactifs
          </Text>
        </View>

        <View style={styles.chips}>
          {categories.map((cat) => {
            const active = cat.key === filter;
            return (
              <Pressable
                key={cat.key}
                onPress={() => setFilter(cat.key)}
                style={[
                  styles.chip,
                  active && {
                    backgroundColor: tokens.accentContainer,
                    borderColor: tokens.accent,
                  },
                ]}
              >
                <Text
                  style={[
                    styles.chipText,
                    active && { color: tokens.accent, fontWeight: "600" },
                  ]}
                >
                  {cat.label}
                </Text>
              </Pressable>
            );
          })}
        </View>

        <View style={styles.list}>
          {filtered.map((path) => (
            <PathCard
              key={path.id}
              path={path}
              onPress={() => router.push(`/education/path/${path.id}` as any)}
            />
          ))}
        </View>

        <Pressable
          style={styles.footerCard}
          onPress={() => sheetsRef.current?.present()}
        >
          <Sparkles size={20} color={tokens.warning} />
          <Text style={styles.footerText}>
            Nouveaux parcours chaque mois
          </Text>
          <ArrowUpRight size={16} color={tokens.onSurfaceVariant} />
        </Pressable>
      </ScrollView>

      <BottomSheetModal
        ref={sheetsRef}
        snapPoints={["35%"]}
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
          <Text style={styles.sheetTitle}>Bientôt disponible</Text>
          <Text style={styles.sheetDesc}>
            De nouveaux parcours arrivent chaque mois. Restez à l'affût !
          </Text>
        </BottomSheetView>
      </BottomSheetModal>
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
    paddingHorizontal: 16,
    paddingBottom: 120,
  },
  hero: {
    alignItems: "center",
    paddingVertical: 32,
    gap: 8,
  },
  heroIconBox: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: tokens.accentContainer,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 4,
  },
  heroTitle: {
    fontSize: 24,
    fontWeight: "700",
    color: tokens.onSurface,
    fontFamily: "DMSans_700Bold",
  },
  heroSubtitle: {
    fontSize: 14,
    color: tokens.onSurfaceVariant,
    textAlign: "center",
    paddingHorizontal: 40,
    lineHeight: 20,
    fontFamily: "DMSans_400Regular",
  },
  chips: {
    flexDirection: "row",
    gap: 8,
    paddingBottom: 20,
  },
  chip: {
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: tokens.outline,
  },
  chipText: {
    fontSize: 13,
    color: tokens.onSurfaceVariant,
    fontFamily: "DMSans_500Medium",
  },
  list: {
    gap: 16,
  },
  footerCard: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    backgroundColor: tokens.surface,
    borderRadius: 14,
    padding: 16,
    marginTop: 20,
  },
  footerText: {
    flex: 1,
    fontSize: 14,
    color: tokens.onSurface,
    fontFamily: "DMSans_500Medium",
  },
  sheetContent: {
    padding: 24,
    gap: 12,
  },
  sheetTitle: {
    fontSize: 18,
    fontWeight: "700",
    color: tokens.onSurface,
    fontFamily: "DMSans_700Bold",
  },
  sheetDesc: {
    fontSize: 14,
    color: tokens.onSurfaceVariant,
    lineHeight: 20,
    fontFamily: "DMSans_400Regular",
  },
});
