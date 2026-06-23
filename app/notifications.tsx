import { View, Text, FlatList, TouchableOpacity, ActivityIndicator } from "react-native";
import { useRouter } from "expo-router";
import { ArrowLeft } from "lucide-react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useMemo, useState } from "react";
import { tokens } from "@/lib/tokens";
import { useNotifications } from "@/hooks/useNotifications";
import NotificationCard from "@/components/notifications/NotificationCard";
import type { Notification } from "@/services/notifications";

type Filter = "all" | "unread";

export default function NotificationsScreen() {
  const insets = useSafeAreaInsets();
  const router = useRouter();
  const {
    notifications,
    unreadCount,
    isLoading,
    isRefreshing,
    hasMore,
    error,
    loadMore,
    refresh,
    markRead,
    markAllRead,
  } = useNotifications();

  const [filter, setFilter] = useState<Filter>("all");

  const filtered = useMemo(
    () =>
      filter === "unread"
        ? notifications.filter((n) => !n.isRead)
        : notifications,
    [filter, notifications],
  );

  const handlePress = (n: Notification) => {
    if (!n.isRead) markRead(n.id);
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
      <View className="flex-1 items-center justify-center py-20">
        <Text style={{ color: tokens.onSurfaceVariant, fontSize: 15 }}>
          {filter === "unread"
            ? "Aucune notification non lue"
            : "Aucune notification"}
        </Text>
      </View>
    );
  };

  return (
    <View style={{ flex: 1, backgroundColor: tokens.background }}>
      <View
        style={{
          paddingTop: insets.top,
          backgroundColor: tokens.background,
        }}
      >
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
            paddingHorizontal: 16,
            paddingVertical: 12,
          }}
        >
          <TouchableOpacity
            onPress={() => router.back()}
            hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
          >
            <ArrowLeft size={24} color={tokens.onSurface} />
          </TouchableOpacity>
          <Text
            style={{
              fontSize: 20,
              fontWeight: "600",
              color: tokens.onSurface,
            }}
          >
            Notifications
          </Text>
          {unreadCount > 0 && (
            <TouchableOpacity onPress={markAllRead}>
              <Text
                style={{
                  fontSize: 13,
                  color: tokens.accent,
                  fontWeight: "500",
                }}
              >
                Tout lu
              </Text>
            </TouchableOpacity>
          )}
        </View>

        <View
          style={{
            flexDirection: "row",
            paddingHorizontal: 16,
            gap: 8,
            paddingBottom: 12,
          }}
        >
          {(["all", "unread"] as Filter[]).map((f) => (
            <TouchableOpacity
              key={f}
              onPress={() => setFilter(f)}
              style={{
                paddingHorizontal: 16,
                paddingVertical: 6,
                borderRadius: 16,
                backgroundColor:
                  filter === f ? tokens.accent : tokens.surface,
              }}
            >
              <Text
                style={{
                  fontSize: 13,
                  fontWeight: "500",
                  color:
                    filter === f ? tokens.onAccent : tokens.onSurfaceVariant,
                }}
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
        <View className="flex-1 items-center justify-center">
          <ActivityIndicator size="large" color={tokens.accent} />
        </View>
      ) : (
        <FlatList
          data={filtered}
          renderItem={renderItem}
          keyExtractor={(item) => item.id}
          contentContainerStyle={{
            paddingHorizontal: 16,
            paddingBottom: 40,
            gap: 8,
          }}
          ListEmptyComponent={renderEmpty}
          onRefresh={refresh}
          refreshing={isRefreshing}
          onEndReached={loadMore}
          onEndReachedThreshold={0.3}
          showsVerticalScrollIndicator={false}
          ItemSeparatorComponent={() => <View style={{ height: 8 }} />}
        />
      )}
    </View>
  );
}
