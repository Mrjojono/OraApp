import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import AsyncStorage from "@react-native-async-storage/async-storage";
import type { Notification } from "@/services/notifications";
import { notificationSocket } from "@/services/socket";

interface NotificationState {
  notifications: Notification[];
  unreadCount: number;
  setNotifications: (notifications: Notification[]) => void;
  appendNotifications: (notifications: Notification[]) => void;
  prependNotification: (notification: Notification) => void;
  setUnreadCount: (count: number) => void;
  markRead: (id: string) => void;
  markAllRead: () => void;
  clear: () => void;
}

let socketInitialized = false;

export function initSocketToStore() {
  if (socketInitialized) return;
  socketInitialized = true;

  notificationSocket.onNotification((n) => {
    if (!n) return;
    useNotificationStore.getState().prependNotification(n);
  });
  notificationSocket.onUnreadCount((count) => {
    useNotificationStore
      .getState()
      .setUnreadCount(typeof count === "number" ? count : 0);
  });
}

export const useNotificationStore = create<NotificationState>()(
  persist(
    (set) => ({
      notifications: [],
      unreadCount: 0,

      setNotifications: (notifications) =>
        set({
          notifications,
          unreadCount: notifications.filter((n) => !n.isRead).length,
        }),

      appendNotifications: (newItems) =>
        set((state) => {
          const existingIds = new Set(state.notifications.map((n) => n.id));
          const unique = newItems.filter((n) => !existingIds.has(n.id));
          if (unique.length === 0) return state;
          return {
            notifications: [...state.notifications, ...unique],
            unreadCount: [...state.notifications, ...unique].filter(
              (n) => !n.isRead,
            ).length,
          };
        }),

      prependNotification: (notification) =>
        set((state) => {
          const exists = state.notifications.some(
            (n) => n.id === notification.id,
          );
          if (exists) return state;
          return {
            notifications: [notification, ...state.notifications],
            unreadCount: state.unreadCount + (notification.isRead ? 0 : 1),
          };
        }),

      setUnreadCount: (count) => set({ unreadCount: count }),

      markRead: (id) =>
        set((state) => ({
          notifications: state.notifications.map((n) =>
            n.id === id ? { ...n, isRead: true } : n,
          ),
          unreadCount: Math.max(
            0,
            state.unreadCount -
              (state.notifications.find((n) => n.id === id)?.isRead ? 0 : 1),
          ),
        })),

      markAllRead: () =>
        set((state) => ({
          notifications: state.notifications.map((n) => ({
            ...n,
            isRead: true,
          })),
          unreadCount: 0,
        })),

      clear: () => set({ notifications: [], unreadCount: 0 }),
    }),
    {
      name: "notifications",
      storage: createJSONStorage(() => AsyncStorage),
    },
  ),
);
