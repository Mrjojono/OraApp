import { useEffect } from "react";
import { View } from "react-native";
import { Stack, useRouter } from "expo-router";
import * as Notifications from "expo-notifications";
import * as SplashScreen from "expo-splash-screen";
import { StatusBar } from "expo-status-bar";
import { useFonts } from "expo-font";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ThemeProvider } from "@react-navigation/native";
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

SplashScreen.preventAutoHideAsync();

const queryClient = new QueryClient();

const navigationTheme = {
  dark: true,
  colors: {
    primary: "#34C759",
    background: "#0D0D0D",
    card: "#1A1A1A",
    text: "#FFFFFF",
    border: "#4A4A4E",
    notification: "#34C759",
  },
  fonts: {
    regular: { fontFamily: "DMSans_400Regular", fontWeight: "400" as const, fontSize: 14 },
    medium: { fontFamily: "DMSans_500Medium", fontWeight: "500" as const, fontSize: 14 },
    bold: { fontFamily: "DMSans_400Regular", fontWeight: "700" as const, fontSize: 14 },
    heavy: { fontFamily: "DMSans_400Regular", fontWeight: "900" as const, fontSize: 14 },
  },
};

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
    if (loaded) SplashScreen.hideAsync();
  }, [loaded]);

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
    return <View style={{ flex: 1, backgroundColor: "#0D0D0D" }} />;
  }

  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider value={navigationTheme}>
      <AuthProvider>
        <GestureHandlerRootView style={{ flex: 1, backgroundColor: "#0D0D0D" }}>
          <BottomSheetModalProvider>
            <StatusBar style="light" />
            <Stack
              screenOptions={{
                headerShown: false,
                animation: "fade",
                contentStyle: { backgroundColor: "#0D0D0D" },
              }}
            />
            <CustomAlert />
            <PortalHost />
          </BottomSheetModalProvider>
        </GestureHandlerRootView>
      </AuthProvider>
      </ThemeProvider>
    </QueryClientProvider>
  );
}
