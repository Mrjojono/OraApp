import { Stack } from "expo-router";
import { tokens } from "@/lib/tokens";

export default function EducationLayout() {
  return (
    <Stack
      screenOptions={{
        headerShown: false,
        contentStyle: { backgroundColor: tokens.background },
      }}
    >
      <Stack.Screen name="path/[id]" options={{ headerShown: false }} />
      <Stack.Screen name="lesson/[id]" options={{ headerShown: false }} />
      <Stack.Screen name="quiz/[id]" options={{ headerShown: false }} />
      <Stack.Screen name="results/[id]" options={{ headerShown: false }} />
    </Stack>
  );
}
