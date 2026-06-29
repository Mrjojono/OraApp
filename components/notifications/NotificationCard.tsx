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
  negative: tokens.negative,
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
        notification.isRead ? styles.cardRead : styles.cardUnread,
        pressed && styles.cardPressed,
      ]}
    >
      <View style={[styles.severityStrip, { backgroundColor: sevColor }]} />

      <View style={styles.iconWrap}>
        <View
          style={[
            styles.iconCircle,
            notification.isRead && styles.iconCircleRead,
          ]}
        >
          <Icon
            size={18}
            color={notification.isRead ? tokens.muted : sevColor}
          />
        </View>
      </View>

      <View style={styles.body}>
        <View style={styles.titleRow}>
          <Text
            style={[
              styles.title,
              notification.isRead ? styles.titleRead : styles.titleUnread,
            ]}
            numberOfLines={1}
          >
            {notification.title}
          </Text>
          <Text style={styles.time}>{relativeTime(notification.createdAt)}</Text>
        </View>

        <Text style={styles.bodyText} numberOfLines={2}>
          {notification.body}
        </Text>

        <View style={styles.metaRow}>
          {sevLabel && (
            <View style={[styles.severityBadge, { borderColor: sevColor }]}>
              <View style={[styles.severityDot, { backgroundColor: sevColor }]} />
              <Text style={[styles.severityLabel, { color: sevColor }]}>
                {sevLabel}
              </Text>
            </View>
          )}
          {!notification.isRead && <View style={styles.unreadDot} />}
        </View>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    flexDirection: "row",
    borderRadius: 12,
    overflow: "hidden",
  },
  cardUnread: {
    backgroundColor: tokens.surface,
  },
  cardRead: {
    backgroundColor: tokens.surface,
  },
  cardPressed: {
    opacity: 0.85,
  },
  severityStrip: {
    width: 3,
    alignSelf: "stretch",
  },
  iconWrap: {
    paddingLeft: 12,
    paddingVertical: 14,
  },
  iconCircle: {
    width: 38,
    height: 38,
    borderRadius: 19,
    backgroundColor: tokens.accentContainer,
    alignItems: "center",
    justifyContent: "center",
  },
  iconCircleRead: {
    backgroundColor: tokens.outline,
  },
  body: {
    flex: 1,
    paddingVertical: 14,
    paddingRight: 14,
    paddingLeft: 10,
    gap: 4,
  },
  titleRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  title: {
    fontSize: 14,
    flex: 1,
  },
  titleUnread: {
    fontWeight: "600",
    color: tokens.onSurface,
  },
  titleRead: {
    fontWeight: "400",
    color: tokens.onSurface,
  },
  time: {
    fontSize: 11,
    color: tokens.onSurfaceVariant,
    marginLeft: 8,
  },
  bodyText: {
    fontSize: 13,
    color: tokens.onSurfaceVariant,
    lineHeight: 18,
  },
  metaRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    marginTop: 2,
  },
  severityBadge: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
    borderWidth: 1,
    borderRadius: 4,
    paddingHorizontal: 6,
    paddingVertical: 2,
  },
  severityDot: {
    width: 5,
    height: 5,
    borderRadius: 2.5,
  },
  severityLabel: {
    fontSize: 10,
    fontWeight: "500",
  },
  unreadDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: tokens.accent,
  },
});
