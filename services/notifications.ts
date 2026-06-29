import { api } from "./api";

export interface Notification {
  id: string;
  type:
    | "ADVICE"
    | "SCORE_CHANGE"
    | "ELIGIBILITY"
    | "EDUCATIONAL"
    | "SYSTEM"
    | "ADMIN_BROADCAST"
    | "WEEKLY_DIGEST";
  title: string;
  body: string;
  severity?: string;
  isRead: boolean;
  createdAt: string;
  link?: string;
}

export interface NotificationsResponse {
  notifications: Notification[];
  total: number;
  page: number;
  limit: number;
  hasMore: boolean;
}

export interface NotificationPreferences {
  pushEnabled: boolean;
  types: Record<string, boolean>;
}

export async function fetchNotifications(
  page = 1,
  limit = 20,
): Promise<NotificationsResponse> {
  const res = await api.get("/notifications", { params: { page, limit } });
  const data = res.data;
  return {
    notifications: data.items ?? data.notifications ?? [],
    total: data.total ?? 0,
    page: data.page ?? page,
    limit: data.limit ?? limit,
    hasMore: data.totalPages ? data.page < data.totalPages : data.hasMore ?? false,
  };
}

export async function fetchUnreadCount(): Promise<number> {
  const res = await api.get<any>("/notifications/unread");
  console.log("[API] /notifications/unread raw response:", JSON.stringify(res.data));
  if (typeof res.data === "number") return res.data;
  if (res.data?.count !== undefined) return res.data.count;
  if (res.data?.unreadCount !== undefined) return res.data.unreadCount;
  if (Array.isArray(res.data?.items)) {
    return res.data.items.filter((n: any) => !n.isRead).length;
  }
  return 0;
}

export async function markAsRead(id: string): Promise<void> {
  await api.patch(`/notifications/${id}/read`);
}

export async function markAllAsRead(): Promise<void> {
  await api.post("/notifications/read-all");
}

export async function registerPushToken(
  token: string,
  platform: "ios" | "android",
): Promise<void> {
  await api.post("/notifications/push/register", { token, platform });
}

export async function unregisterPushToken(): Promise<void> {
  await api.post("/notifications/push/unregister");
}

export async function fetchPreferences(): Promise<NotificationPreferences> {
  const res = await api.get<NotificationPreferences>(
    "/notifications/preferences",
  );
  console.log(res.data);
  return res.data;
}

export async function updatePreferences(
  prefs: Partial<NotificationPreferences>,
): Promise<NotificationPreferences> {
  const res = await api.patch<NotificationPreferences>(
    "/notifications/preferences",
    prefs,
  );
  return res.data;
}
