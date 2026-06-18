import { View, Text } from "react-native";
import React, { useState } from "react";
import DropDownPicker from "react-native-dropdown-picker";
import { BarChart } from "react-native-gifted-charts";

type HomeChartData = {
  value: number;
  label: string;
  frontColor: string;
};

type HomeChartProps = {
  data: HomeChartData[];
};

const HomeChart = ({ data }: HomeChartProps) => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [dropdownValue, setDropdownValue] = useState("6");
  const [dropdownItems, setDropdownItems] = useState([
    { label: "3 mois", value: "3" },
    { label: "6 mois", value: "6" },
    { label: "12 mois", value: "12" },
  ]);

  const monthCount = parseInt(dropdownValue, 10);
  const Chartdata = data.slice(-monthCount);
  const barWidth = monthCount >= 12 ? 22 : monthCount <= 3 ? 50 : 35;
  const spacing = monthCount >= 12 ? 14 : monthCount <= 3 ? 28 : 20;
  const labelFontSize = monthCount >= 12 ? 10 : monthCount <= 3 ? 13 : 12;

  return (
    <View
      style={{ borderRadius: 8, zIndex: dropdownOpen ? 999 : 1 }}
      className="mt-11  bg-transparent border-0"
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
        data={Chartdata}
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
  );
};

export default HomeChart;
