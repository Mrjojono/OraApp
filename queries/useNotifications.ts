import {
  useInfiniteQuery,
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";
import {
  fetchNotifications,
  fetchUnreadCount,
  markAsRead,
  markAllAsRead,
} from "@/services/notifications";
import { useNotificationStore } from "@/stores/notificationStore";

const NOTIFICATIONS_KEY = ["notifications"];

export function useNotificationList() {
  return useInfiniteQuery({
    queryKey: NOTIFICATIONS_KEY,
    queryFn: async ({ pageParam = 1 }) => {
      const res = await fetchNotifications(pageParam, 20);
      const store = useNotificationStore.getState();

      if (pageParam === 1) {
        store.setNotifications(res.notifications);
      } else {
        store.appendNotifications(res.notifications);
      }

      return res;
    },
    getNextPageParam: (lastPage) =>
      lastPage.hasMore ? lastPage.page + 1 : undefined,
    initialPageParam: 1,
    staleTime: 30_000,
  });
}

export function useRefreshUnreadCount() {
  return {
    refresh: async () => {
      const count = await fetchUnreadCount();
      useNotificationStore.getState().setUnreadCount(count);
      return count;
    },
  };
}

export function useMarkRead() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => markAsRead(id),
    onMutate: async (id) => {
      useNotificationStore.getState().markRead(id);
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: NOTIFICATIONS_KEY });
    },
  });
}

export function useMarkAllRead() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: () => markAllAsRead(),
    onMutate: async () => {
      useNotificationStore.getState().markAllRead();
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: NOTIFICATIONS_KEY });
    },
  });
}
