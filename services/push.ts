import { Platform } from "react-native";
import * as Notifications from "expo-notifications";
import { router } from "expo-router";
import { getAccessToken } from "./storage";
import {
  registerPushToken as apiRegisterPush,
  unregisterPushToken as apiUnregisterPush,
} from "./notifications";
import { notificationSocket } from "./socket";

// ─── Fix #4 : handler déclaré au top-level du module (pas dans une fonction) ──
Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: true, // Fix : était false → badges ne se mettaient pas à jour
    shouldShowBanner: true,
    shouldShowList: true,
  }),
});

// ─── Fix #5 : import statique expo-router (supprime le require() dynamique) ───
Notifications.addNotificationResponseReceivedListener((response) => {
  const link = response.notification.request.content.data?.link;
  if (typeof link === "string") {
    router.push(link as any);
  }
});

// ─── Fix #1 : canal Android obligatoire pour Android 8+ ──────────────────────
async function setupAndroidChannel() {
  if (Platform.OS !== "android") return;
  await Notifications.setNotificationChannelAsync("default", {
    name: "Notifications",
    importance: Notifications.AndroidImportance.MAX,
    vibrationPattern: [0, 250, 250, 250],
    lightColor: "#FF231F7C",
    sound: "default",
    showBadge: true,
  });
}

export async function registerForPushNotifications() {
  try {
    // Canal Android à créer avant de demander le token
    await setupAndroidChannel();

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

    // ─── Fix #2 : EXPO_PUBLIC_PROJECT_ID lu depuis .env ─────────────────────
    // Vérifier que votre .env contient bien :
    // EXPO_PUBLIC_PROJECT_ID=a2a376a8-ac4d-43d8-bbf8-ad23c2a1cfe9
    // (valeur déjà présente dans app.json > extra.eas.projectId)
    const projectId = process.env.EXPO_PUBLIC_PROJECT_ID ?? undefined;

    const pushTokenData = await Notifications.getExpoPushTokenAsync({
      projectId,
    });
    const token = pushTokenData.data;
    const platform = Platform.OS === "ios" ? "ios" : "android";

    await apiRegisterPush(token, platform);
    console.log("[Push] token registered:", token);

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
