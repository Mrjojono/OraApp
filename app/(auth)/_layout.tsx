import { Stack } from "expo-router";
import { SafeAreaView as RNSafeAreaView } from "react-native-safe-area-context";
const SafeAreaView = RNSafeAreaView;

export default function RootLayout() {
  return (
    <SafeAreaView>
      <Stack screenOptions={{ headerShown: false }} />
    </SafeAreaView>
  );
}
