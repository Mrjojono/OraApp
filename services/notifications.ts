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
  severity?: "info" | "warning" | "positive" | "negative";
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

export interface UnreadCountResponse {
  count: number;
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
  return res.data;
}

export async function fetchUnreadCount(): Promise<number> {
  const res = await api.get<UnreadCountResponse>("/notifications/unread");
  return res.data.count;
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
