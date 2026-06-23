import { View, Text, Pressable } from "react-native";
import {
  Lightbulb,
  TrendingUp,
  CheckCircle,
  BookOpen,
  Settings,
  Megaphone,
  Calendar,
  Bell,
} from "lucide-react-native";
import { tokens } from "@/lib/tokens";
import type { Notification } from "@/services/notifications";

const iconMap = {
  ADVICE: Lightbulb,
  SCORE_CHANGE: TrendingUp,
  ELIGIBILITY: CheckCircle,
  EDUCATIONAL: BookOpen,
  SYSTEM: Settings,
  ADMIN_BROADCAST: Megaphone,
  WEEKLY_DIGEST: Calendar,
} as const;

const severityColor = {
  info: tokens.onSurfaceVariant,
  warning: tokens.warning,
  positive: tokens.positive,
  negative: tokens.negative,
};

function relativeTime(dateString: string): string {
  const now = Date.now();
  const date = new Date(dateString).getTime();
  const diff = now - date;
  const minutes = Math.floor(diff / 60000);
  if (minutes < 1) return "à l'instant";
  if (minutes < 60) return `il y a ${minutes} min`;
  const hours = Math.floor(minutes / 60);
  if (hours < 24) return `il y a ${hours}h`;
  const days = Math.floor(hours / 24);
  if (days < 7) return `il y a ${days}j`;
  return new Date(dateString).toLocaleDateString("fr-FR", {
    day: "numeric",
    month: "short",
  });
}

interface Props {
  notification: Notification;
  onPress: () => void;
  onLongPress?: () => void;
}

export default function NotificationCard({
  notification,
  onPress,
  onLongPress,
}: Props) {
  const Icon = iconMap[notification.type] ?? Bell;
  const iconColor = notification.severity
    ? severityColor[notification.severity]
    : tokens.accent;

  return (
    <Pressable
      onPress={onPress}
      onLongPress={onLongPress}
      style={({ pressed }) => ({
        backgroundColor: pressed ? tokens.surfaceDim : tokens.surface,
        borderRadius: 12,
        borderWidth: 1,
        borderColor: notification.isRead ? tokens.outline : tokens.accent,
        padding: 16,
        flexDirection: "row",
        gap: 12,
        opacity: pressed ? 0.9 : 1,
      })}
    >
      <View
        style={{
          width: 40,
          height: 40,
          borderRadius: 20,
          backgroundColor: notification.isRead
            ? tokens.outline
            : tokens.accentContainer,
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Icon size={20} color={notification.isRead ? tokens.muted : iconColor} />
      </View>

      <View style={{ flex: 1, gap: 4 }}>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Text
            style={{
              fontSize: 14,
              fontWeight: notification.isRead ? "400" : "600",
              color: tokens.onSurface,
              flex: 1,
            }}
            numberOfLines={1}
          >
            {notification.title}
          </Text>
          <Text
            style={{
              fontSize: 11,
              color: tokens.onSurfaceVariant,
              marginLeft: 8,
            }}
          >
            {relativeTime(notification.createdAt)}
          </Text>
        </View>

        <Text
          style={{
            fontSize: 13,
            color: tokens.onSurfaceVariant,
            lineHeight: 18,
          }}
          numberOfLines={2}
        >
          {notification.body}
        </Text>

        {!notification.isRead && (
          <View
            style={{
              width: 6,
              height: 6,
              borderRadius: 3,
              backgroundColor: tokens.accent,
              alignSelf: "flex-start",
              marginTop: 4,
            }}
          />
        )}
      </View>
    </Pressable>
  );
}
