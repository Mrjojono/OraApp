import Svg, { Circle } from "react-native-svg";
import { BarChart } from "react-native-gifted-charts";
import DropDownPicker from "react-native-dropdown-picker";
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import { Bell, RefreshCw } from "lucide-react-native";
import React, { useState } from "react";
import { useSmsReader } from "@/services/sms-reader";
import { styled } from "nativewind";
import { SafeAreaView as RNSafeAreaView } from "react-native-safe-area-context";
const SafeAreaView = styled(RNSafeAreaView);

const Index = () => {
  const size = 112;
  const strokeWidth = 10;
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const progress = 70;

  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [dropdownValue, setDropdownValue] = useState("6");
  const [dropdownItems, setDropdownItems] = useState([
    { label: "3 mois", value: "3" },
    { label: "6 mois", value: "6" },
    { label: "12 mois", value: "12" },
  ]);

  const { status, read, reset } = useSmsReader();

  const [syncMessage, setSyncMessage] = useState(
    "Importer les transactions mobile money",
  );

  const handleSync = async () => {
    const messages = await read();
    console.log(messages);
    if (messages.length > 0) {
      setSyncMessage(`${messages.length} SMS lus avec succès`);
    } else if (status === "denied") {
      setSyncMessage("Permission SMS refusée");
    }
  };

  const allMonths = [
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

  const monthCount = parseInt(dropdownValue, 10);
  const data = allMonths.slice(-monthCount);
  const barWidth = monthCount >= 12 ? 22 : monthCount <= 3 ? 50 : 35;
  const spacing = monthCount >= 12 ? 14 : monthCount <= 3 ? 28 : 20;
  const labelFontSize = monthCount >= 12 ? 10 : monthCount <= 3 ? 13 : 12;

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

        <TouchableOpacity
          onPress={handleSync}
          disabled={status === "loading"}
          activeOpacity={0.8}
          style={{ borderRadius: 8 }}
          className={`bg-primary py-4 px-5 flex-row items-center gap-3 mt-3
            ${status === "loading" ? "opacity-70" : ""}`}
        >
          {status === "loading" ? (
            <ActivityIndicator size="small" color="#FFFFFF" />
          ) : (
            <RefreshCw size={20} color="#FFFFFF" />
          )}
          <View className="flex-1">
            <Text className="text-white font-semibold text-base leading-5">
              Synchroniser mes SMS
            </Text>
            <Text className="text-white/70 text-xs mt-0.5">{syncMessage}</Text>
          </View>
        </TouchableOpacity>

        <View
          style={{ borderRadius: 8, zIndex: dropdownOpen ? 999 : 1 }}
          className="mt-11 bg-surface-white border-mint-subtle p-4 border"
        >
          <View className="flex-row items-center justify-between mb-4">
            <Text className="text-sm font-semibold  text-gray-500 uppercase tracking-wider">
              Évolution du score
            </Text>
            <View style={{ zIndex: dropdownOpen ? 1000 : 1 }}>
              <DropDownPicker
                open={dropdownOpen}
                value={dropdownValue}
                items={dropdownItems}
                setOpen={setDropdownOpen}
                setValue={setDropdownValue}
                setItems={setDropdownItems}
                style={{
                  backgroundColor: "#F5F7F0",
                  borderColor: "#D4DFC7",
                  borderRadius: 8,
                  minHeight: 32,
                  width: 110,
                }}
                containerStyle={{ width: 110 }}
                textStyle={{
                  fontSize: 12,
                  color: "#3A6A00",
                  fontWeight: "600",
                }}
                dropDownContainerStyle={{
                  backgroundColor: "#FFFFFF",
                  borderColor: "#D4DFC7",
                  borderRadius: 8,
                }}
                labelStyle={{ fontWeight: "600" }}
                listItemLabelStyle={{ fontSize: 12, color: "#4A5568" }}
                selectedItemLabelStyle={{ color: "#3A6A00", fontWeight: "600" }}
                listMode="SCROLLVIEW"
                showArrowIcon
              />
            </View>
          </View>
          <BarChart
            key={JSON.stringify(data)}
            data={data}
            barWidth={barWidth}
            spacing={spacing}
            yAxisThickness={0}
            hideYAxisText
            xAxisColor="#E2EBD6"
            xAxisLabelTextStyle={{ color: "#727A67", fontSize: labelFontSize }}
            labelsDistanceFromXaxis={6}
            height={200}
            isAnimated
            showValuesAsTopLabel
            noOfSections={4}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Index;
