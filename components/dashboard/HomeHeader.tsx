import { useEffect, useState } from "react";
import { StyleSheet, View, Text, Pressable } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useRouter } from "expo-router";
import { Bell } from "lucide-react-native";
import { tokens } from "@/lib/tokens";
import { useAuth } from "@/contexts/AuthContext";
import { fetchUnreadCount, type Notification } from "@/services/notifications";
import { notificationSocket } from "@/services/socket";

export function HomeHeader() {
  const insets = useSafeAreaInsets();
  const { user, isAuthenticated } = useAuth();
  const router = useRouter();
  const [badgeCount, setBadgeCount] = useState(0);

  const displayName = user?.username ?? user?.name ?? user?.email ?? "";

  useEffect(() => {
    if (!isAuthenticated) {
      setBadgeCount(0);
      return;
    }

    fetchUnreadCount()
      .then((count) => {
        console.log("[HomeHeader] unread count initial:", count);
        setBadgeCount(count);
      })
      .catch(() => {});

    const onNotif = (notification: Notification) => {
      console.log("[HomeHeader] notification reçue:", JSON.stringify(notification));
      setBadgeCount((prev) => prev + 1);
    };

    const onCount = (count: number) => {
      console.log("[HomeHeader] unread count mis à jour:", count);
      setBadgeCount(count);
    };

    notificationSocket.onNotification(onNotif);
    notificationSocket.onUnreadCount(onCount);

    return () => {
      notificationSocket.offNotification(onNotif);
      notificationSocket.offUnreadCount(onCount);
    };
  }, [isAuthenticated]);

  return (
    <View style={[styles.container, { paddingTop: insets.top + 16 }]}>
      <Text style={styles.greeting}>{displayName}</Text>
      <Pressable
        style={({ pressed }) => [styles.notifBtn, pressed && styles.pressed]}
        onPress={() => router.push("/notifications")}
      >
        <Bell size={18} color={tokens.onSurface} />
        {badgeCount > 0 && (
          <View style={styles.badge}>
            <Text style={styles.badgeText}>
              {badgeCount > 9 ? "9+" : badgeCount}
            </Text>
          </View>
        )}
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 13,
    paddingBottom: 24,
    backgroundColor: tokens.background,
  },
  greeting: {
    fontFamily: "DMSans_500Medium",
    fontSize: 20,
    color: tokens.onSurface,
  },
  notifBtn: {
    width: 36,
    height: 36,
    borderRadius: 8,
    backgroundColor: tokens.surface,
    alignItems: "center",
    justifyContent: "center",
  },
  pressed: { opacity: 0.7 },
  badge: {
    position: "absolute",
    top: -6,
    right: -6,
    width: 16,
    height: 16,
    borderRadius: 8,
    backgroundColor: tokens.accent,
    alignItems: "center",
    justifyContent: "center",
  },
  badgeText: {
    fontSize: 10,
    fontWeight: "700",
    color: tokens.onAccent,
  },
});
