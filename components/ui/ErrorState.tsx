import { View, Text, Pressable } from "react-native";
import { AlertCircle } from "lucide-react-native";
import { cn } from "@/lib/utils";

interface ErrorStateProps {
  title?: string;
  message?: string;
  onRetry?: () => void;
}

export function ErrorState({
  title = "Une erreur est survenue",
  message = "Impossible de charger les données. Vérifiez votre connexion et réessayez.",
  onRetry,
}: ErrorStateProps) {
  return (
    <View className="flex-1 items-center justify-center px-8 py-20">
      <View className="bg-error-container rounded-full p-4 mb-4">
        <AlertCircle size={28} color="#FF453A" />
      </View>
      <Text className="text-foreground text-lg font-semibold text-center mb-1">
        {title}
      </Text>
      <Text className="text-muted-foreground text-sm text-center leading-5 mb-6">
        {message}
      </Text>
      {onRetry && (
        <Pressable
          onPress={onRetry}
          className="bg-primary px-6 py-3 rounded-xl active:opacity-80"
        >
          <Text className="text-primary-foreground font-semibold text-sm">
            Réessayer
          </Text>
        </Pressable>
      )}
    </View>
  );
}
