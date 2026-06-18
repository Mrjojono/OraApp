import Svg, { Circle } from "react-native-svg";
import HomeChart from "@/components/HomeChart";
import { View, Text, ScrollView, RefreshControl, FlatList } from "react-native";
import { useState, useRef, useCallback } from "react";
import SyncIndicator from "@/components/sync-indicator";
import { getProgressColor } from "@/lib/utils";
import Badge from "@/components/Badge";
import PingTest from "@/components/ping-test";
import { useAuth } from "@/contexts/AuthContext";
import { BottomSheetModal, BottomSheetView } from "@gorhom/bottom-sheet";
type BadgeVariant = "success" | "warning" | "danger";

const Index = () => {
  const size = 80;
  const strokeWidth = 8;
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const progress = 60;
  const debtProgress = 24;
  const { user } = useAuth();

  const bottomSheetModalRef = useRef<BottomSheetModal>(null);
  const [selectedBadge, setSelectedBadge] = useState<string | null>(null);
  const openSheet = useCallback((label: string) => {
    setSelectedBadge(label);
    bottomSheetModalRef.current?.present();
  }, []);

  const data = [
    { value: 150, label: "Jan", frontColor: "#3A6A00" },
    { value: 240, label: "Fév", frontColor: "#3A6A00" },
    { value: 180, label: "Mar", frontColor: "#5C8A2A" },
    { value: 300, label: "Avr", frontColor: "#3A6A00" },
    { value: 220, label: "Mai", frontColor: "#5C8A2A" },
    { value: 280, label: "Jui", frontColor: "#3A6A00" },
    { value: 100, label: "Juil", frontColor: "#5C8A2A" },
    { value: 260, label: "Aoû", frontColor: "#3A6A00" },
    { value: 210, label: "Sep", frontColor: "#5C8A2A" },
    { value: 330, label: "Oct", frontColor: "#3A6A00" },
    { value: 250, label: "Nov", frontColor: "#5C8A2A" },
    { value: 310, label: "Déc", frontColor: "#3A6A00" },
  ];
  const [refreshing, setRefreshing] = useState(false);
  const onRefresh = () => {
    setRefreshing(true);
    setTimeout(() => {
      console.log("refreshing", refreshing);
      setRefreshing(false);
    }, 2000);
  };

  const cashFlow = {
    totalCredits: { count: 34, amount: 6033749 },
    totalDebits: { count: 181, amount: 5517436 },
    netFlow: 516313,
  };
  const cashFlowCards = [
    {
      id: "credits",
      label: "Entrées",
      amount: cashFlow.totalCredits.amount,
      count: cashFlow.totalCredits.count,
      bg: "#ebf0e4",
      textPrimary: "#3a6a00",
      textSecondary: "#727a67",
    },
    {
      id: "debits",
      label: "Sorties",
      amount: cashFlow.totalDebits.amount,
      count: cashFlow.totalDebits.count,
      bg: "#ebf0e4",
      textPrimary: "#ba1a1a",
      textSecondary: "#727a67",
    },
    {
      id: "net",
      label: "Flux net",
      amount: cashFlow.netFlow,
      count: null,
      bg: "#ebf0e4",
      textPrimary: "#3a6a00",
      textSecondary: "#727a67",
    },
  ];

  const scoreComponents = [
    { id: "c1", label: "Dépenses", score: 62, variant: "warning" as const },
    { id: "c2", label: "Endettement", score: 85, variant: "success" as const },
    { id: "c3", label: "Épargne", score: 55, variant: "warning" as const },
    { id: "c4", label: "Stabilité", score: 70, variant: "success" as const },
  ];

  const getScoreVariant = (score: number): BadgeVariant => {
    if (score >= 75) return "success";
    if (score >= 50) return "warning";
    return "danger";
  };

  return (
    <View className="bg-background font-sans text-base leading-relaxed pt-10 flex-1">
      <ScrollView
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
        className="flex-1 px-4"
        contentContainerStyle={{ paddingBottom: 120 }}
        showsVerticalScrollIndicator={false}
      >
        <View className="mb-5">
          <Text className="text-center font-sans mb-3 text-3xl">
            Votre Solde{" "}
          </Text>
          <Text className="text-6xl font-bebas mb-7 py-5 items-center  text-center font-semibold">
            40.000 Fcfa
          </Text>

          <FlatList
            data={cashFlowCards}
            horizontal
            showsHorizontalScrollIndicator={false}
            keyExtractor={(item) => item.id}
            contentContainerStyle={{
              gap: 10,
              paddingVertical: 4,
              marginBottom: 10,
            }}
            renderItem={({ item }) => (
              <View
                style={{
                  backgroundColor: item.bg,
                  borderRadius: 10,
                  padding: 14,
                  width: 140,
                }}
              >
                <Text
                  style={{
                    color: item.textSecondary,
                    fontSize: 11,
                    marginBottom: 6,
                  }}
                >
                  {item.label}
                </Text>
                <Text
                  style={{
                    color: item.textPrimary,
                    fontSize: 18,
                    fontWeight: "500",
                  }}
                >
                  {item.amount.toLocaleString("fr-FR")}
                </Text>
                <Text
                  style={{
                    color: item.textSecondary,
                    fontSize: 11,
                    marginTop: 4,
                  }}
                >
                  {item.count !== null ? `${item.count} transactions` : "Fcfa"}
                </Text>
              </View>
            )}
          />
        </View>

        <View
          style={{ borderRadius: 10, backgroundColor: "#1a2614" }}
          className=" border-0  py-4 flex-row gap-1"
        >
          <View className="w-28 h-20 items-center justify-center">
            <Svg width={size} height={size} style={{ position: "absolute" }}>
              <Circle
                cx={size / 2}
                cy={size / 2}
                r={radius}
                stroke="#2d3f22"
                strokeWidth={strokeWidth}
                fill="none"
              />
              <Circle
                cx={size / 2}
                cy={size / 2}
                r={radius}
                stroke={getProgressColor(progress).hex}
                strokeWidth={strokeWidth}
                fill="none"
                strokeDasharray={`${(circumference * progress) / 100} ${circumference}`}
                strokeLinecap="round"
              />
            </Svg>
            <View className="items-center justify-center">
              <Text className="font-bebas text-4xl text-primary-container text-center leading-none">
                {progress}
              </Text>
              <Text
                className="text-xs text-secondary"
                style={{ color: "#5C8A2A" }}
              >
                /100
              </Text>
            </View>
          </View>

          <View className="flex-1">
            <Text className="text-primary-container text-lg font-bold">
              Votre situation financière est bonne ce mois-ci
            </Text>
          </View>
        </View>

        <View
          style={{
            flexDirection: "row",
            flexWrap: "wrap",
            gap: 8,
            marginTop: 0,
            paddingTop: 10,
          }}
        >
          <FlatList
            data={scoreComponents}
            contentContainerStyle={{
              gap: 10,
              paddingVertical: 4,
              marginBottom: 10,
            }}
            renderItem={({ item }) => (
              <View>
                <Badge
                  key={item.id}
                  text={`${item.label} · ${item.score}`}
                  variant={getScoreVariant(item.score)}
                  onPress={() => openSheet(item.label)}
                />
              </View>
            )}
            keyExtractor={(item) => item.id}
            horizontal
          />
        </View>

        <View
          style={{ borderRadius: 10 }}
          className="mt-3 border border-mint-subtle bg-surface-container-lowest p-4"
        >
          <Text className="text-black text-lg font-sans leading-relaxed">
            Vous avez maintenu vos dépenses sous la limite tout en{" "}
            <Text style={{ color: "#3a6a00", fontWeight: "500" }}>
              augmentant votre fonds d&apos;urgence de 12 %
            </Text>{" "}
            par rapport au mois dernier.
          </Text>
        </View>

        <SyncIndicator />
        <HomeChart data={data} />
      </ScrollView>

      <BottomSheetModal
        ref={bottomSheetModalRef}
        snapPoints={["40%"]}
        enablePanDownToClose
        backgroundStyle={{ backgroundColor: "#f6fbef;" }}
        style={{}}
      >
        <BottomSheetView style={{ padding: 24 }}>
          <Text className="text-lg font-bold mb-2">{selectedBadge}</Text>
          <Text>Détails de {selectedBadge?.toLowerCase()} ici.</Text>
        </BottomSheetView>
      </BottomSheetModal>
    </View>
  );
};

export default Index;
