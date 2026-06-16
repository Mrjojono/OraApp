import { View } from "react-native";
import { Stack } from "expo-router";
import { useFonts } from "expo-font";
import { BebasNeue_400Regular } from "@expo-google-fonts/bebas-neue";
import {
  PlusJakartaSans_400Regular,
  PlusJakartaSans_600SemiBold,
  PlusJakartaSans_700Bold,
} from "@expo-google-fonts/plus-jakarta-sans";
import "../global.css";

export default function RootLayout() {
  const [loaded] = useFonts({
    BebasNeue_400Regular,
    PlusJakartaSans_400Regular,
    PlusJakartaSans_600SemiBold,
    PlusJakartaSans_700Bold,
  });

  if (!loaded) {
    return null;
  }

  return (
    <View className="bg-background flex-1">
      <Stack screenOptions={{ headerShown: false }} />
    </View>
  );
}
