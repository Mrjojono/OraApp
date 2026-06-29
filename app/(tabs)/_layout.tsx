import { View, ActivityIndicator } from "react-native";
import { Tabs, useRouter } from "expo-router";
import { tabs, components } from "@/constants/data";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useEffect, useRef } from "react";
import { tokens } from "@/lib/tokens";

import { startAutoSync } from "@/services/sms-sync";
import { useAuth } from "@/contexts/AuthContext";
import { HomeHeader } from "@/components/dashboard/HomeHeader";
import { NotificationToast } from "@/components/notifications/NotificationToast";

const tabBar = components.tabBar;

const TabLayout = () => {
  const insets = useSafeAreaInsets();
  const { isAuthenticated, isLoading } = useAuth();
  const router = useRouter();

  const tabBottom = useRef(
    Math.max(insets.bottom, tabBar.horizontalInset),
  ).current;

  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      router.replace("/(auth)/email");
    }
  }, [isLoading, isAuthenticated]);

  useEffect(() => {
    const timer = startAutoSync();
    return () => clearInterval(timer);
  }, []);

  if (isLoading) {
    return (
      <View className="flex-1 items-center justify-center ">
        <ActivityIndicator size="large" color={tokens.accent} />
      </View>
    );
  }

  if (!isAuthenticated) return null;

  return (
    <View style={{ flex: 1 }}>
      <Tabs
        screenOptions={{
          header: () => <HomeHeader />,
          headerStyle: { backgroundColor: tokens.background },
          headerShown: true,
          tabBarShowLabel: false,
          tabBarStyle: {
            position: "absolute",
            bottom: tabBottom,
            height: tabBar.height,
            marginHorizontal: tabBar.horizontalInset,
            borderRadius: tabBar.radius,
            borderWidth: 1,
            borderColor: tokens.outline,
            backgroundColor: tokens.surface,
            zIndex: 100,
            elevation: 10,
          },
          tabBarActiveTintColor: tokens.accent,
          tabBarInactiveTintColor: tokens.onSurfaceVariant,
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
      <NotificationToast />
    </View>
  );
};

export default TabLayout;
