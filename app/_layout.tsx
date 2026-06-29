import { useEffect } from "react";
import { View } from "react-native";
import { Stack, useRouter } from "expo-router";
import * as Notifications from "expo-notifications";
import { useFonts } from "expo-font";
import { BebasNeue_400Regular } from "@expo-google-fonts/bebas-neue";
import {
  PlusJakartaSans_400Regular,
  PlusJakartaSans_600SemiBold,
  PlusJakartaSans_700Bold,
} from "@expo-google-fonts/plus-jakarta-sans";

import {
  DMSans_400Regular,
  DMSans_500Medium,
} from "@expo-google-fonts/dm-sans";
import "../global.css";
import { PortalHost } from "@rn-primitives/portal";
import { AuthProvider } from "@/contexts/AuthContext";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { BottomSheetModalProvider } from "@gorhom/bottom-sheet";
import CustomAlert from "@/components/ui/CustomAlert";

export default function RootLayout() {
  const router = useRouter();
  const [loaded] = useFonts({
    BebasNeue_400Regular,
    DMSans_400Regular,
    DMSans_500Medium,
    PlusJakartaSans_400Regular,
    PlusJakartaSans_600SemiBold,
    PlusJakartaSans_700Bold,
  });

  useEffect(() => {
    Notifications.getLastNotificationResponseAsync().then((response) => {
      if (!response) return;
      const link = response.notification.request.content.data?.link;
      if (typeof link === "string") {
        router.push(link as any);
      }
    });
  }, [router]);

  if (!loaded) {
    return null;
  }

  return (
    <AuthProvider>
      <GestureHandlerRootView style={{ flex: 1, backgroundColor: "#0D0D0D" }}>
        <BottomSheetModalProvider>
          <Stack
            screenOptions={{
              headerShown: false,
              contentStyle: { backgroundColor: "#0D0D0D" },
            }}
          />
          <CustomAlert />
          <PortalHost />
        </BottomSheetModalProvider>
      </GestureHandlerRootView>
    </AuthProvider>
  );
}
