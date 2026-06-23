import { useState, useEffect, useRef } from "react";
import { Pressable, ActivityIndicator, View, Text } from "react-native";
import { RefreshCw, Check, AlertCircle } from "lucide-react-native";
import { syncNewSms } from "@/services/sms-sync";
import { tokens } from "@/lib/tokens";

type SyncState = "idle" | "syncing" | "success" | "error";

const stateConfig: Record<
  SyncState,
  {
    bg: string;
    iconColor: string;
    subtext: string;
  }
> = {
  idle: {
    bg: tokens.accent,
    iconColor: tokens.onAccent,
    subtext: tokens.onSurfaceVariant,
  },
  syncing: {
    bg: tokens.accent,
    iconColor: tokens.onAccent,
    subtext: tokens.onSurfaceVariant,
  },
  success: { bg: "#2d3f22", iconColor: "#9fe35d", subtext: "#c5eba3" },
  error: { bg: "#3d1414", iconColor: "#F09595", subtext: "#f5c4b3" },
};

export default function SyncIndicator() {
  const [state, setState] = useState<SyncState>("idle");
  const [message, setMessage] = useState(
    "Importer les transactions mobile money",
  );
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

  const colors = stateConfig[state];
  const PFG = tokens.onAccent;

  const icon = () => {
    switch (state) {
      case "syncing":
        return <ActivityIndicator size="small" color={colors.iconColor} />;
      case "success":
        return <Check size={20} color={colors.iconColor} />;
      case "error":
        return <AlertCircle size={20} color={colors.iconColor} />;
      default:
        return <RefreshCw size={20} color={colors.iconColor} />;
    }
  };

  return (
    <Pressable
      onPress={handleSync}
      disabled={state === "syncing"}
      style={{
        borderRadius: 8,
        backgroundColor: colors.bg,
      }}
      className={`py-4 px-5 flex-row items-center gap-3 mt-3
        ${state === "syncing" ? "opacity-70" : ""}`}
    >
      {icon()}
      <View className="flex-1">
        <Text
          style={{ color: PFG }}
          className="font-semibold text-base leading-5"
        >
          Synchroniser mes SMS
        </Text>
        <Text style={{ color: colors.subtext }} className="text-xs mt-0.5">
          {message}
        </Text>
      </View>
    </Pressable>
  );
}
