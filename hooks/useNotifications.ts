import { useState, useEffect, useCallback, useRef } from "react";
import {
  fetchNotifications,
  fetchUnreadCount,
  markAsRead,
  markAllAsRead,
  type Notification,
} from "@/services/notifications";
import { notificationSocket } from "@/services/socket";
import { useAuth } from "@/contexts/AuthContext";

interface UseNotificationsReturn {
  notifications: Notification[];
  unreadCount: number;
  isLoading: boolean;
  isRefreshing: boolean;
  hasMore: boolean;
  error: string | null;
  loadMore: () => Promise<void>;
  refresh: () => Promise<void>;
  markRead: (id: string) => Promise<void>;
  markAllRead: () => Promise<void>;
}

export function useNotifications(): UseNotificationsReturn {
  const { isAuthenticated } = useAuth();
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [unreadCount, setUnreadCount] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const pageRef = useRef(1);
  const loadingRef = useRef(false);

  const loadPage = useCallback(async (page: number, limit = 20) => {
    if (loadingRef.current) return;
    loadingRef.current = true;
    try {
      const res = await fetchNotifications(page, limit);

      // Fix : l'API peut renvoyer un shape inattendu — on sécurise chaque champ
      const items: Notification[] = Array.isArray(res?.notifications)
        ? res.notifications
        : [];
      const more: boolean = res?.hasMore ?? false;

      if (page === 1) {
        setNotifications(items);
      } else {
        setNotifications((prev) => [...prev, ...items]);
      }
      setHasMore(more);
      pageRef.current = page;
    } catch (err: any) {
      setError(err.message || "Erreur de chargement");
    } finally {
      loadingRef.current = false;
    }
  }, []);

  const initialLoad = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      await loadPage(1);
      const count = await fetchUnreadCount();
      console.log("[Notification] unread count initial:", count);
      setUnreadCount(count ?? 0); // Fix : sécurise si l'API renvoie undefined
    } catch {
      // handled in loadPage
    } finally {
      setIsLoading(false);
    }
  }, [loadPage]);

  useEffect(() => {
    if (isAuthenticated) {
      initialLoad();
    } else {
      setNotifications([]);
      setUnreadCount(0);
      setHasMore(true);
      setIsLoading(false);
    }
  }, [isAuthenticated, initialLoad]);

  useEffect(() => {
    if (!isAuthenticated) return;

    const onNotif = (notification: Notification) => {
      if (!notification) return; // Fix : guard contre payload vide
      console.log("[Notification] reçue:", JSON.stringify(notification));
      setNotifications((prev) => [notification, ...prev]);
      setUnreadCount((prev) => prev + 1);
    };

    const onCount = (count: number) => {
      setUnreadCount(typeof count === "number" ? count : 0); // Fix : sécurise type
    };

    notificationSocket.onNotification(onNotif);
    notificationSocket.onUnreadCount(onCount);

    return () => {
      notificationSocket.offNotification(onNotif);
      notificationSocket.offUnreadCount(onCount);
    };
  }, [isAuthenticated]);

  const loadMore = useCallback(async () => {
    if (!hasMore || loadingRef.current) return;
    await loadPage(pageRef.current + 1);
  }, [hasMore, loadPage]);

  const refresh = useCallback(async () => {
    setIsRefreshing(true);
    setError(null);
    try {
      await loadPage(1);
      const count = await fetchUnreadCount();
      setUnreadCount(count ?? 0);
    } catch {
      // handled in loadPage
    } finally {
      setIsRefreshing(false);
    }
  }, [loadPage]);

  const markRead = useCallback(async (id: string) => {
    try {
      await markAsRead(id);
      setNotifications((prev) =>
        prev.map((n) => (n.id === id ? { ...n, isRead: true } : n)),
      );
      setUnreadCount((prev) => Math.max(0, prev - 1));
    } catch {
      // silent
    }
  }, []);

  const markAllRead = useCallback(async () => {
    try {
      await markAllAsRead();
      setNotifications((prev) => prev.map((n) => ({ ...n, isRead: true })));
      setUnreadCount(0);
    } catch {
      // silent
    }
  }, []);

  return {
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
  };
}
