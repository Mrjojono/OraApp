import { View, Text, TouchableOpacity } from "react-native";
import { Tabs, useRouter } from "expo-router";
import { Bell, LogOut } from "lucide-react-native";
import { tabs, components } from "@/constants/data";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useEffect } from "react";

import { startAutoSync } from "@/services/sms-sync";
import { useAuth } from "@/contexts/AuthContext";

const tabBar = components.tabBar;

const Header = () => {
  const insets = useSafeAreaInsets();
  const { user, logout } = useAuth();
  const router = useRouter();
  const displayName = user?.username ?? user?.name ?? user?.email ?? "";

  const handleLogout = async () => {
    await logout();
    router.replace("/(auth)/email");
  };

  return (
    <View
      style={{ paddingTop: insets.top }}
      className="flex justify-between border-0 py-4 px-4 flex-row bg-background items-center"
    >
      <Text className="text-base font-semibold text-foreground">
        {displayName}
      </Text>
      <View className="flex-row items-center gap-3">
        <TouchableOpacity onPress={handleLogout}>
          <LogOut size={22} color="#3A6A00" />
        </TouchableOpacity>
        <Bell size={24} color="#3A6A00" />
      </View>
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
        animation: "shift",
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
