import {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
  type ReactNode,
} from "react";
import { api } from "@/services/api";
import {
  getAccessToken,
  getRefreshToken,
  setTokens,
  clearAuth,
  saveUser,
  getUser,
} from "@/services/storage";
import {
  registerForPushNotifications,
  unregisterFromPushNotifications,
} from "@/services/push";

export interface User {
  id: string;
  email: string;
  name?: string;
  username?: string;
}

interface AuthState {
  user: User | null;
  isLoading: boolean;
  isSubmitting: boolean;
  isAuthenticated: boolean;
}

interface AuthContextValue extends AuthState {
  login: (credentials: { contact: string; password: string }) => Promise<void>;
  register: (data: Record<string, any>) => Promise<void>;
  verifyOtp: (data: { email: string; otp: string }) => Promise<void>;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextValue | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<AuthState>({
    user: null,
    isLoading: true,
    isSubmitting: false,
    isAuthenticated: false,
  });

  const restoreSession = useCallback(async () => {
    try {
      const token = await getAccessToken();
      if (!token) {
        setState({
          user: null,
          isLoading: false,
          isSubmitting: false,
          isAuthenticated: false,
        });
        return;
      }

      const res = await api.get("/auth/me");
      const user = res.data?.user ?? res.data;
      await saveUser(user);
      setState({
        user,
        isLoading: false,
        isSubmitting: false,
        isAuthenticated: true,
      });
    } catch {
      const cachedUser = await getUser();
      if (cachedUser) {
        setState({
          user: cachedUser,
          isLoading: false,
          isSubmitting: false,
          isAuthenticated: true,
        });
      } else {
        await clearAuth();
        setState({
          user: null,
          isLoading: false,
          isSubmitting: false,
          isAuthenticated: false,
        });
      }
    }
  }, []);

  useEffect(() => {
    restoreSession();
  }, [restoreSession]);

  const login = useCallback(
    async (credentials: { contact: string; password: string }) => {
      setState((prev) => ({ ...prev, isSubmitting: true }));
      try {
        const res = await api.post("/auth/login", credentials);
        const { accessToken, refreshToken, user } = res.data;
        console.log("RAW SERVER RESPONSE:", JSON.stringify(res.data, null, 2));
        await setTokens(accessToken, refreshToken);
        await saveUser(user);
        setState({
          user,
          isLoading: false,
          isSubmitting: false,
          isAuthenticated: true,
        });
        // Register for push notifications on successful login
        registerForPushNotifications();
      } catch (e) {
        console.log("Login error:", e);

        setState((prev) => ({ ...prev, isSubmitting: false }));
        throw new Error("Login échoué");
      }
    },
    [],
  );

  const register = useCallback(async (data: Record<string, any>) => {
    setState((prev) => ({ ...prev, isSubmitting: true }));
    try {
      const res = await api.post("/auth/register", data);
      const { accessToken, refreshToken, user } = res.data;
      await setTokens(accessToken, refreshToken);
      await saveUser(user);
      setState({
        user,
        isLoading: false,
        isSubmitting: false,
        isAuthenticated: true,
      });
      registerForPushNotifications();
    } catch {
      setState((prev) => ({ ...prev, isSubmitting: false }));
      throw new Error("Inscription échouée");
    }
  }, []);

  const verifyOtp = useCallback(
    async (data: { email: string; otp: string }) => {
      await api.post("/auth/verify-otp", data);
    },
    [],
  );

  const logout = useCallback(async () => {
    try {
      const refreshToken = await getRefreshToken();
      if (refreshToken) {
        await api.post("/auth/logout", { refreshToken });
      }
    } catch {
      // ignore errors on logout
    }
    unregisterFromPushNotifications();
    await clearAuth();
    setState({
      user: null,
      isLoading: false,
      isSubmitting: false,
      isAuthenticated: false,
    });
  }, []);

  return (
    <AuthContext.Provider
      value={{ ...state, login, register, verifyOtp, logout }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth(): AuthContextValue {
  const ctx = useContext(AuthContext);
  if (!ctx) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return ctx;
}
