import { View, Text } from "react-native";
import { Tabs } from "expo-router";
import { Bell } from "lucide-react-native";
import { tabs, components } from "@/constants/data";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useEffect } from "react";
import { startAutoSync } from "@/services/sms-sync";

const tabBar = components.tabBar;

const Header = () => {
  const insets = useSafeAreaInsets();
  return (
    <View
      style={{ paddingTop: insets.top }}
      className="flex justify-between border-b border-b-surface-container py-4 px-6 flex-row bg-background"
    >
      <Text className="font-bold text-primary text-xl">NUTSUKPUI Joan</Text>
      <Bell size={24} color="#3A6A00" />
    </View>
  );
};

const TabLayout = () => {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const insets = useSafeAreaInsets();
  useEffect(() => {
    const timer = startAutoSync();
    return () => clearInterval(timer);
  }, []);

  return (
    <Tabs
      screenOptions={{
        header: () => <Header />,
        headerShown: true,
        tabBarShowLabel: false,
        tabBarStyle: {
          position: "absolute",
          bottom: Math.max(insets.bottom, tabBar.horizontalInset),
          height: tabBar.height,
          marginHorizontal: tabBar.horizontalInset,
          borderRadius: tabBar.radius,
          backgroundColor: "#FFFFFF",
          borderWidth: 1,
          borderColor: "#E2EBD6",
          elevation: 0,
        },
        tabBarActiveTintColor: "#3A6A00",
        tabBarInactiveTintColor: "#C1C9B4",
        tabBarItemStyle: {
          paddingVertical: (tabBar.height - tabBar.iconFrame) / 2,
        },
      }}
    >
      {tabs.map((tab) => (
        <Tabs.Screen
          key={tab.name}
          name={tab.name}
          options={{
            tabBarIcon: ({ focused, color, size }) =>
              tab.icon({ focused, color, size }),
          }}
        />
      ))}
    </Tabs>
  );
};

export default TabLayout;
