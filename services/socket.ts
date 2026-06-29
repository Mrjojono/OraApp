import { io, Socket } from "socket.io-client";
import type { Notification } from "./notifications";

const SOCKET_PATH =
  (process.env.EXPO_PUBLIC_API_URL || "http://localhost:4000").replace(
    /^http/,
    "ws",
  ) + "/notifications";

class NotificationSocketManager {
  private socket: Socket | null = null;
  private listeners: Map<string, Set<(...args: any[]) => void>> = new Map();

  connect(token: string) {
    if (this.socket?.connected) {
      return;
    }

    this.socket = io(SOCKET_PATH, {
      auth: { token },
      transports: ["websocket"],
      reconnection: true,
      reconnectionAttempts: Infinity,
      reconnectionDelay: 2000,
    });

    this.socket.onAny((event, ...args) => {
      console.log("[Socket] event reçu:", event, JSON.stringify(args));
    });

    this.socket.on("connect", () => {
      console.log("[NotificationSocket] connected");
    });

    this.socket.on("disconnect", (reason) => {
      console.log("[NotificationSocket] disconnected:", reason);
    });

    this.socket.on("connect_error", (err) => {
      console.log("[NotificationSocket] connection error:", err.message);
    });

    this.listeners.forEach((cbs, event) => {
      cbs.forEach((cb) => {
        this.socket?.on(event, cb);
      });
    });
  }

  disconnect() {
    this.socket?.disconnect();
    this.socket = null;
  }

  onNotification(cb: (notification: Notification) => void) {
    this.on("notification", cb);
  }

  offNotification(cb: (notification: Notification) => void) {
    this.off("notification", cb);
  }

  onUnreadCount(cb: (count: number) => void) {
    this.on("unread_count", cb);
  }

  offUnreadCount(cb: (count: number) => void) {
    this.off("unread_count", cb);
  }

  private on(event: string, cb: (...args: any[]) => void) {
    if (!this.listeners.has(event)) {
      this.listeners.set(event, new Set());
    }
    this.listeners.get(event)!.add(cb);
    this.socket?.on(event, cb);
  }

  private off(event: string, cb: (...args: any[]) => void) {
    this.listeners.get(event)?.delete(cb);
    this.socket?.off(event, cb);
  }

  get isConnected() {
    return this.socket?.connected ?? false;
  }
}

export const notificationSocket = new NotificationSocketManager();
