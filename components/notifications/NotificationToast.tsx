import { useEffect, useRef, useState } from "react";
import {
  Animated,
  Text,
  Pressable,
  StyleSheet,
  View,
} from "react-native";
import { useRouter } from "expo-router";
import { tokens } from "@/lib/tokens";
import { notificationSocket } from "@/services/socket";
import { useAuth } from "@/contexts/AuthContext";
import type { Notification } from "@/services/notifications";

const AUTO_DISMISS = 4000;

export function NotificationToast() {
  const { isAuthenticated } = useAuth();
  const router = useRouter();
  const [notif, setNotif] = useState<Notification | null>(null);
  const opacity = useRef(new Animated.Value(0)).current;
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    if (!isAuthenticated) return;

    const show = (notification: Notification) => {
      if (!notification) return;

      if (timerRef.current) clearTimeout(timerRef.current);

      setNotif(notification);
      Animated.timing(opacity, {
        toValue: 1,
        duration: 250,
        useNativeDriver: true,
      }).start();

      timerRef.current = setTimeout(hide, AUTO_DISMISS);
    };

    notificationSocket.onNotification(show);
    return () => {
      notificationSocket.offNotification(show);
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, [isAuthenticated]);

  const hide = () => {
    Animated.timing(opacity, {
      toValue: 0,
      duration: 200,
      useNativeDriver: true,
    }).start(() => setNotif(null));
  };

  if (!notif) return null;

  return (
    <Animated.View style={[styles.wrapper, { opacity }]}>
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
