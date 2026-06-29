import { View, Text, Pressable } from "react-native";
import { cn } from "@/lib/utils";

interface EmptyStateProps {
  title: string;
  description?: string;
  actionLabel?: string;
  onAction?: () => void;
  icon?: React.ReactNode;
}

export function EmptyState({
  title,
  description,
  actionLabel,
  onAction,
  icon,
}: EmptyStateProps) {
  return (
    <View className="flex-1 items-center justify-center px-8 py-20">
      {icon && <View className="mb-4">{icon}</View>}
      <Text className="text-foreground text-lg font-semibold text-center mb-1">
        {title}
      </Text>
      {description && (
        <Text className="text-muted-foreground text-sm text-center leading-5 mb-6">
          {description}
        </Text>
      )}
      {actionLabel && onAction && (
        <Pressable
          onPress={onAction}
          className="bg-primary px-6 py-3 rounded-xl active:opacity-80"
        >
          <Text className="text-primary-foreground font-semibold text-sm">
            {actionLabel}
          </Text>
        </Pressable>
      )}
    </View>
  );
}
