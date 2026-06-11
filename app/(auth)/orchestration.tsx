import { useEffect } from "react";
import { useRouter, useLocalSearchParams } from "expo-router";

export default function Orchestration() {
  const router = useRouter();
  const { step } = useLocalSearchParams<{ step?: string }>();

  useEffect(() => {
    switch (step) {
      case "account":
        router.replace("/(auth)/accountNumber");
        break;
      case "email":
      default:
        router.replace("/(auth)/email");
        break;
    }
  }, [step]);

  return null;
}
