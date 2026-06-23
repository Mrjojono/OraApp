import { Platform } from "react-native";
import { getAccessToken } from "./storage";
import { registerPushToken as apiRegisterPush, unregisterPushToken as apiUnregisterPush } from "./notifications";
import { notificationSocket } from "./socket";

let systemInitialized = false;

export async function registerForPushNotifications() {
  try {
    const Notifications = await import("expo-notifications");

    if (!systemInitialized) {
      systemInitialized = true;
      Notifications.setNotificationHandler({
        handleNotification: async () => ({
          shouldShowAlert: true,
          shouldPlaySound: true,
          shouldSetBadge: false,
          shouldShowBanner: true,
          shouldShowList: true,
        }),
      });
      Notifications.addNotificationResponseReceivedListener((response: any) => {
        const link = response.notification.request.content.data?.link;
        if (typeof link === "string") {
          try {
            const { router } = require("expo-router");
            router.push(link);
          } catch {}
        }
      });
    }

    const { status: existingStatus } =
      await Notifications.getPermissionsAsync();
    let finalStatus = existingStatus;

    if (existingStatus !== "granted") {
      const { status } = await Notifications.requestPermissionsAsync();
      finalStatus = status;
    }

    if (finalStatus !== "granted") {
      console.log("[Push] permission not granted");
      return null;
    }

    const projectId =
      process.env.EXPO_PUBLIC_PROJECT_ID ?? undefined;
    const pushTokenData = await Notifications.getExpoPushTokenAsync({
      projectId,
    });
    const token = pushTokenData.data;

    const platform = Platform.OS === "ios" ? "ios" : "android";

    await apiRegisterPush(token, platform);
    console.log("[Push] token registered");

    const accessToken = await getAccessToken();
    if (accessToken) {
      notificationSocket.connect(accessToken);
    }

    return token;
  } catch (err) {
    console.log("[Push] registration failed:", err);
    return null;
  }
}

export async function unregisterFromPushNotifications() {
  try {
    await apiUnregisterPush();
    notificationSocket.disconnect();
    console.log("[Push] unregistered");
  } catch (err) {
    console.log("[Push] unregister failed:", err);
  }
}
