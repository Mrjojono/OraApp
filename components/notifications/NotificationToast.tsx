import { useEffect, useRef, useState } from "react";
import {
  Animated,
  Text,
  Pressable,
  StyleSheet,
  View,
} from "react-native";
import { useRouter } from "expo-router";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { tokens } from "@/lib/tokens";
import { useNotificationStore } from "@/stores/notificationStore";
import type { Notification } from "@/services/notifications";

const AUTO_DISMISS = 4000;

export function NotificationToast() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const latestNotif = useNotificationStore((s) => s.notifications[0]);
  const prevIdRef = useRef<string | null>(null);
  const [notif, setNotif] = useState<Notification | null>(null);
  const opacity = useRef(new Animated.Value(0)).current;
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    if (!latestNotif || latestNotif.id === prevIdRef.current) return;
    prevIdRef.current = latestNotif.id;

    if (timerRef.current) clearTimeout(timerRef.current);

    setNotif(latestNotif);
    Animated.timing(opacity, {
      toValue: 1,
      duration: 250,
      useNativeDriver: true,
    }).start();

    timerRef.current = setTimeout(hide, AUTO_DISMISS);
  }, [latestNotif]);

  const hide = () => {
    Animated.timing(opacity, {
      toValue: 0,
      duration: 200,
      useNativeDriver: true,
    }).start(() => setNotif(null));
  };

  if (!notif) return null;

  return (
    <Animated.View style={[styles.wrapper, { opacity, paddingTop: insets.top + 8 }]}>
      <Pressable
        style={styles.toast}
        onPress={() => {
          hide();
          router.push("/notifications");
        }}
      >
        <View style={styles.dot} />
        <View style={styles.content}>
          <Text style={styles.title} numberOfLines={1}>
            {notif.title}
          </Text>
          <Text style={styles.body} numberOfLines={1}>
            {notif.body}
          </Text>
        </View>
        <Pressable onPress={hide} hitSlop={8}>
          <Text style={styles.close}>✕</Text>
        </Pressable>
      </Pressable>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    zIndex: 999,
    paddingHorizontal: 12,
  },
  toast: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: tokens.surface,
    borderWidth: 1,
    borderColor: tokens.accent,
    borderRadius: 12,
    paddingVertical: 12,
    paddingHorizontal: 14,
    gap: 10,
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: tokens.accent,
    flexShrink: 0,
  },
  content: {
    flex: 1,
  },
  title: {
    fontSize: 14,
    fontWeight: "600",
    color: tokens.onSurface,
  },
  body: {
    fontSize: 12,
    color: tokens.onSurfaceVariant,
    marginTop: 1,
  },
  close: {
    fontSize: 14,
    color: tokens.onSurfaceVariant,
    paddingLeft: 4,
  },
});
