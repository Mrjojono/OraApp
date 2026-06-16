import Svg, { Circle } from "react-native-svg";
import { View, Text, ScrollView } from "react-native";
import HomeChart from "@/components/HomeChart";
import SyncIndicator from "@/components/sync-indicator";
import { styled } from "nativewind";
import { SafeAreaView as RNSafeAreaView } from "react-native-safe-area-context";
const SafeAreaView = styled(RNSafeAreaView);

const Index = () => {
  const size = 112;
  const strokeWidth = 10;
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const progress = 70;

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

  return (
    <SafeAreaView className="bg-background  flex-1">
      <ScrollView
        className="flex-1 px-6"
        contentContainerStyle={{ paddingBottom: 120 }}
        showsVerticalScrollIndicator={false}
      >
        <View
          style={{ borderRadius: 8 }}
          className="bg-surface-white border border-mint-subtle  p-5 flex-row gap-4"
        >
          <View className="w-28 h-28 items-center justify-center">
            <Svg width={size} height={size} style={{ position: "absolute" }}>
              <Circle
                cx={size / 2}
                cy={size / 2}
                r={radius}
                stroke="#E2EBD6"
                strokeWidth={strokeWidth}
                fill="none"
              />
              <Circle
                cx={size / 2}
                cy={size / 2}
                r={radius}
                stroke="#3A6A00"
                strokeWidth={strokeWidth}
                fill="none"
                strokeDasharray={`${(circumference * progress) / 100} ${circumference}`}
                strokeLinecap="round"
              />
            </Svg>
            <Text className="font-bebas text-5xl text-primary text-center">
              {progress}
            </Text>
          </View>

          <View className="flex-1">
            <Text className="text-black text-lg font-bold">
              Votre situation financière est bonne ce mois-ci
            </Text>
          </View>
        </View>

        <View
          style={{ borderRadius: 8 }}
          className="mt-3 border border-mint-subtle  bg-surface-container-highest p-4"
        >
          <Text className="text-black text-base font-medium leading-relaxed">
            Vous avez réussi à rester sous votre limite de dépenses variables
            tout en augmentant vos contributions à votre fonds d&apos;urgence de
            12 % par rapport au mois dernier.
          </Text>
        </View>

        <SyncIndicator />
        <HomeChart data={data} />
      </ScrollView>
    </SafeAreaView>
  );
};

export default Index;
