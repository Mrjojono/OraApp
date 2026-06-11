import { Stack } from "expo-router";

export default function AuthLayout() {
  return (
    <Stack
      screenOptions={{
        headerShown: true,
        headerTitle: "",
        headerShadowVisible: false,
        headerStyle: { backgroundColor: "#F6FBEF" },
        headerTintColor: "#181D16",
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
