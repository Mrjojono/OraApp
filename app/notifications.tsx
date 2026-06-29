import { useMemo, useState } from "react";
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  ActivityIndicator,
  StyleSheet,
} from "react-native";
import { useRouter } from "expo-router";
import { ArrowLeft } from "lucide-react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { tokens } from "@/lib/tokens";
import {
  useNotificationList,
  useMarkRead,
  useMarkAllRead,
} from "@/queries/useNotifications";
import { useNotificationStore } from "@/stores/notificationStore";
import NotificationCard from "@/components/notifications/NotificationCard";
import type { Notification } from "@/services/notifications";

type Filter = "all" | "unread";

export default function NotificationsScreen() {
  const insets = useSafeAreaInsets();
  const router = useRouter();
  const notifications = useNotificationStore((s) => s.notifications);
  const unreadCount = useNotificationStore((s) => s.unreadCount);
  const {
    isLoading,
    isFetchingNextPage,
    hasNextPage,
    fetchNextPage,
    refetch,
    isRefetching,
  } = useNotificationList();
  const markReadMut = useMarkRead();
  const markAllReadMut = useMarkAllRead();

  const [filter, setFilter] = useState<Filter>("all");

  const filtered = useMemo(
    () =>
      filter === "unread"
        ? notifications.filter((n) => !n.isRead)
        : notifications,
    [filter, notifications],
  );

  const handlePress = (n: Notification) => {
    if (!n.isRead) markReadMut.mutate(n.id);
    if (n.link) router.push(n.link as any);
  };

  const renderItem = ({ item }: { item: Notification }) => (
    <NotificationCard
      notification={item}
      onPress={() => handlePress(item)}
    />
  );

  const renderEmpty = () => {
    if (isLoading) return null;
    return (
      <View style={styles.emptyWrap}>
        <Text style={styles.emptyText}>
          {filter === "unread"
            ? "Aucune notification non lue"
            : "Aucune notification"}
        </Text>
      </View>
    );
  };

  const renderFooter = () => {
    if (!hasNextPage || isFetchingNextPage) return null;
    return (
      <View style={styles.footerLoader}>
        <ActivityIndicator size="small" color={tokens.muted} />
      </View>
    );
  };

  return (
    <View style={styles.screen}>
      <View style={[styles.header, { paddingTop: insets.top }]}>
        <View style={styles.headerRow}>
          <TouchableOpacity
            onPress={() => router.back()}
            hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
          >
            <ArrowLeft size={24} color={tokens.onSurface} />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Notifications</Text>
          {unreadCount > 0 ? (
            <TouchableOpacity onPress={() => markAllReadMut.mutate()}>
              <Text style={styles.markAllRead}>Tout lu</Text>
            </TouchableOpacity>
          ) : (
            <View style={{ width: 50 }} />
          )}
        </View>

        <View style={styles.filterRow}>
          {(["all", "unread"] as Filter[]).map((f) => (
            <TouchableOpacity
              key={f}
              onPress={() => setFilter(f)}
              style={[
                styles.filterChip,
                filter === f && styles.filterChipActive,
              ]}
            >
              <Text
                style={[
                  styles.filterChipText,
                  filter === f && styles.filterChipTextActive,
                ]}
              >
                {f === "all" ? "Toutes" : "Non lues"}
                {f === "unread" && unreadCount > 0
                  ? ` (${unreadCount})`
                  : ""}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      {isLoading ? (
        <View style={styles.loadingWrap}>
          <ActivityIndicator size="large" color={tokens.accent} />
        </View>
      ) : (
        <FlatList
          data={filtered}
          renderItem={renderItem}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.listContent}
          ListEmptyComponent={renderEmpty}
          ListFooterComponent={renderFooter}
          onRefresh={refetch}
          refreshing={isRefetching}
          onEndReached={() => {
            if (hasNextPage) fetchNextPage();
          }}
          onEndReachedThreshold={0.3}
          showsVerticalScrollIndicator={false}
          ItemSeparatorComponent={() => <View style={{ height: 8 }} />}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: tokens.background,
  },
  header: {
    backgroundColor: tokens.background,
  },
  headerRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: "600",
    color: tokens.onSurface,
  },
  markAllRead: {
    fontSize: 13,
    color: tokens.accent,
    fontWeight: "500",
  },
  filterRow: {
    flexDirection: "row",
    paddingHorizontal: 16,
    gap: 8,
    paddingBottom: 12,
  },
  filterChip: {
    paddingHorizontal: 16,
    paddingVertical: 6,
    borderRadius: 16,
    backgroundColor: tokens.surface,
  },
  filterChipActive: {
    backgroundColor: tokens.accent,
  },
  filterChipText: {
    fontSize: 13,
    fontWeight: "500",
    color: tokens.onSurfaceVariant,
  },
  filterChipTextActive: {
    color: tokens.onAccent,
  },
  loadingWrap: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  listContent: {
    paddingHorizontal: 16,
    paddingBottom: 40,
    gap: 8,
  },
  emptyWrap: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 80,
  },
  emptyText: {
    color: tokens.onSurfaceVariant,
    fontSize: 15,
  },
  footerLoader: {
    paddingVertical: 16,
    alignItems: "center",
  },
});
