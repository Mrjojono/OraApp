import { useState, useEffect, useRef } from "react";
import { Pressable, ActivityIndicator, View, Text } from "react-native";
import { RefreshCw, Check, AlertCircle } from "lucide-react-native";
import { syncNewSms } from "@/services/sms-sync";

type SyncState = "idle" | "syncing" | "success" | "error";

export default function SyncIndicator() {
  const [state, setState] = useState<SyncState>("idle");
  const [message, setMessage] = useState("Importer les transactions mobile money");
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, []);

  const handleSync = async () => {
    setState("syncing");
    setMessage("En cours de synchronisation...");
    try {
      const result = await syncNewSms();
      const count = result?.synced ?? 0;
      setMessage(
        count > 0
          ? `${count} SMS synchronisés`
          : "Aucun nouveau SMS à synchroniser",
      );
      setState("success");
    } catch {
      setMessage("Erreur de synchronisation");
      setState("error");
    }
    if (timerRef.current) clearTimeout(timerRef.current);
    timerRef.current = setTimeout(() => {
      setState("idle");
      setMessage("Importer les transactions mobile money");
    }, 3000);
  };

  const icon = () => {
    switch (state) {
      case "syncing":
        return <ActivityIndicator size="small" color="#FFFFFF" />;
      case "success":
        return <Check size={20} color="#FFFFFF" />;
      case "error":
        return <AlertCircle size={20} color="#FFFFFF" />;
      default:
        return <RefreshCw size={20} color="#FFFFFF" />;
    }
  };

  return (
    <Pressable
      onPress={handleSync}
      disabled={state === "syncing"}
      style={{ borderRadius: 8 }}
      className={`bg-primary py-4 px-5 flex-row items-center gap-3 mt-3
        ${state === "syncing" ? "opacity-70" : ""}`}
    >
      {icon()}
      <View className="flex-1">
        <Text className="text-white font-semibold text-base leading-5">
          Synchroniser mes SMS
        </Text>
        <Text className="text-white/70 text-xs mt-0.5">{message}</Text>
      </View>
    </Pressable>
  );
}
