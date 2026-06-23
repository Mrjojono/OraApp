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
      if (page === 1) {
        setNotifications(res.notifications);
      } else {
        setNotifications((prev) => [...prev, ...res.notifications]);
      }
      setHasMore(res.hasMore);
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
      setUnreadCount(count);
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
      setNotifications((prev) => [notification, ...prev]);
      setUnreadCount((prev) => prev + 1);
    };

    const onCount = (count: number) => {
      setUnreadCount(count);
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
      setUnreadCount(count);
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
