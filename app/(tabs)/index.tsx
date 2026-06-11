import { View, Text } from "react-native";
import { Bell } from "lucide-react-native";
import React from "react";
import { styled } from "nativewind";
import { SafeAreaView as RNSafeAreaView } from "react-native-safe-area-context";
const SafeAreaView = styled(RNSafeAreaView);
import Svg, { Circle } from "react-native-svg";

const Index = () => {
  const size = 112;
  const strokeWidth = 10;
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const progress = 80;

  return (
    <SafeAreaView className="bg-background px-5 flex-1">
      <View>
        <View className="flex justify-between border-b border-b-surface-container py-2 px-6 flex-row">
          <Text className="font-bold text-primary text-xl">NUTSUKPUI Joan</Text>
          <Bell size={24} color="#3A6A00" />
        </View>
      </View>

      <View className="mt-10 px-6">
        <View className="bg-surface-white border border-mint-subtle rounded-lg p-5 flex-row gap-4">
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

          <View className="flex-1 ml-2">
            <Text className="text-black text-lg font-bold">
              Votre situation financière est bonne ce mois-ci
            </Text>
          </View>
        </View>
        <View className="mt-3 bg-surface-container-highest p-3">
          <Text className="text-black text-lg font-bold">
            Vous avez réussi à rester sous votre limite de dépenses variables
            tout en augmentant vos contributions à votre fonds d&apos;urgence de
            12 % par rapport au mois dernier.
          </Text>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default Index;
