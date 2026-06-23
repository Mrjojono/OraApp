import { Stack } from "expo-router";
import BackButton from "@/components/BackButton";
import { tokens } from "@/lib/tokens";

export default function AuthLayout() {
  return (
    <Stack
      screenOptions={{
        headerShown: true,
        headerTitle: "",
        headerShadowVisible: false,
        headerStyle: { backgroundColor: tokens.background },
        headerTintColor: tokens.onSurface,
        headerLeft: () => <BackButton />,
        animation: "fade",
        animationDuration: 300,
        gestureEnabled: true,
        contentStyle: { backgroundColor: tokens.background },
      }}
    >
      <Stack.Screen name="orchestration" options={{ headerShown: false }} />
      <Stack.Screen name="email" options={{ headerShown: false }} />
      <Stack.Screen name="password" />
      <Stack.Screen name="otp" />
      <Stack.Screen name="accountNumber" />
    </Stack>
  );
}
