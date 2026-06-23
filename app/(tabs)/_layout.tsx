import { View, Text, TouchableOpacity, ActivityIndicator } from "react-native";
import { Tabs, useRouter } from "expo-router";
import { Bell, LogOut } from "lucide-react-native";
import { tabs, components } from "@/constants/data";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useEffect, useState } from "react";
import { tokens } from "@/lib/tokens";

import { startAutoSync } from "@/services/sms-sync";
import { useAuth } from "@/contexts/AuthContext";
import { fetchUnreadCount } from "@/services/notifications";
import { notificationSocket } from "@/services/socket";

const tabBar = components.tabBar;

const Header = () => {
  const insets = useSafeAreaInsets();
  const { user, logout, isAuthenticated } = useAuth();
  const router = useRouter();
  const displayName = user?.username ?? user?.name ?? user?.email ?? "";
  const [badgeCount, setBadgeCount] = useState(0);

  useEffect(() => {
    if (!isAuthenticated) {
      setBadgeCount(0);
      return;
    }

    fetchUnreadCount().then(setBadgeCount).catch(() => {});

    const onCount = (count: number) => setBadgeCount(count);
    notificationSocket.onUnreadCount(onCount);
    return () => notificationSocket.offUnreadCount(onCount);
  }, [isAuthenticated]);

  const handleLogout = async () => {
    await logout();
    router.replace("/(auth)/email");
  };

  return (
    <View
      style={{ paddingTop: insets.top }}
      className="flex justify-between border-0  px-4 flex-row  bg-background items-center"
    >
      <Text className="text-base font-semibold text-foreground">
        {displayName}
      </Text>
      <View className="flex-row items-center gap-3">
        <TouchableOpacity onPress={() => router.push("/notifications")}>
          <View>
            <Bell size={24} color={tokens.accent} />
            {badgeCount > 0 && (
              <View
                style={{
                  position: "absolute",
                  top: -4,
                  right: -4,
                  width: 16,
                  height: 16,
                  borderRadius: 8,
                  backgroundColor: tokens.accent,
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <Text
                  style={{
                    fontSize: 10,
                    fontWeight: "700",
                    color: tokens.onAccent,
                  }}
                >
                  {badgeCount > 9 ? "9+" : badgeCount}
                </Text>
              </View>
            )}
          </View>
        </TouchableOpacity>
        <TouchableOpacity onPress={handleLogout}>
          <LogOut size={22} color={tokens.accent} />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const TabLayout = () => {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const insets = useSafeAreaInsets();
  const { isAuthenticated, isLoading } = useAuth();
  const router = useRouter();

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
    <Tabs
      screenOptions={{
        header: () => <Header />,
        headerShown: false,
        tabBarShowLabel: false,
        tabBarStyle: {
          position: "absolute",
          bottom: Math.max(insets.bottom, tabBar.horizontalInset),
          height: tabBar.height,
          marginHorizontal: tabBar.horizontalInset,
          borderRadius: tabBar.radius,
          backgroundColor: tokens.surface,
          borderWidth: 1,
          borderColor: tokens.outline,
          elevation: 0,
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
  );
};

export default TabLayout;
