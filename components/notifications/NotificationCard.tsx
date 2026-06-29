import { View, Text, Pressable, StyleSheet } from "react-native";
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

const severityColor: Record<string, string> = {
  critical: tokens.negative,
  warning: tokens.warning,
  info: tokens.onSurfaceVariant,
  positive: tokens.positive,
};

const severityLabel: Record<string, string> = {
  critical: "Critique",
  warning: "Avertissement",
  info: "Info",
  positive: "Positif",
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
  const sevKey = notification.severity?.toLowerCase() ?? "";
  const sevColor = severityColor[sevKey] || tokens.accent;
  const sevLabel = severityLabel[sevKey];

  return (
    <Pressable
      onPress={onPress}
      onLongPress={onLongPress}
      style={({ pressed }) => [
        styles.card,
        !notification.isRead && styles.cardUnread,
        pressed && styles.cardPressed,
      ]}
    >
      <View style={[styles.iconWrap, !notification.isRead && { backgroundColor: sevColor + "18" }]}>
        <Icon
          size={18}
          color={notification.isRead ? tokens.muted : sevColor}
        />
      </View>

      <View style={styles.body}>
        <View style={styles.titleRow}>
          <Text
            style={[
              styles.title,
              !notification.isRead && styles.titleUnread,
            ]}
            numberOfLines={1}
          >
            {notification.title}
          </Text>
          <Text style={styles.time}>
            {relativeTime(notification.createdAt)}
          </Text>
        </View>

        <Text style={styles.bodyText} numberOfLines={2}>
          {notification.body}
        </Text>

        {sevLabel && (
          <Text style={[styles.severity, { color: sevColor }]}>
            {sevLabel}
          </Text>
        )}
      </View>

      {!notification.isRead && <View style={styles.unreadDot} />}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    flexDirection: "row",
    alignItems: "flex-start",
    backgroundColor: tokens.surface,
    borderRadius: 12,
    padding: 14,
    gap: 12,
  },
  cardUnread: {
    borderWidth: 1,
    borderColor: tokens.outline,
  },
  cardPressed: {
    opacity: 0.85,
  },
  iconWrap: {
    width: 36,
    height: 36,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: tokens.surfaceDim,
  },
  body: {
    flex: 1,
    gap: 4,
  },
  titleRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  title: {
    fontSize: 14,
    fontWeight: "400",
    color: tokens.onSurface,
    flex: 1,
  },
  titleUnread: {
    fontWeight: "600",
  },
  time: {
    fontSize: 11,
    color: tokens.onSurfaceVariant,
    marginLeft: 8,
    flexShrink: 0,
  },
  bodyText: {
    fontSize: 13,
    color: tokens.onSurfaceVariant,
    lineHeight: 18,
  },
  severity: {
    fontSize: 11,
    fontWeight: "500",
    marginTop: 2,
  },
  unreadDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: tokens.accent,
    marginTop: 6,
    flexShrink: 0,
  },
});
