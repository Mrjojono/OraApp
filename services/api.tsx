import axios, {
  create,
  isCancel,
  AxiosRequestConfig,
  AxiosResponse,
} from "axios";
import { useReducer, useEffect, useCallback, useRef } from "react";

// Création d'une instance Axios personnalisée pour éviter de polluer la configuration globale d'axios.
// Cela est plus propre et vous permettra d'ajouter facilement des intercepteurs plus tard (ex: gestion des tokens JWT).
export const api = create({
  baseURL: process.env.EXPO_PUBLIC_API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// Intercepteur requête : injecte le token JWT dynamiquement depuis SecureStore
api.interceptors.request.use(
  async (config: any) => {
    if (config._skipAuth) {
      return config;
    }

    const { getAccessToken } = await import("@/services/storage");
    const token = await getAccessToken();
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error),
);

// Intercepteur réponse : refresh automatique sur 401
let isRefreshing = false;
let failedQueue: Array<{
  resolve: (token: string) => void;
  reject: (err: any) => void;
}> = [];

function processQueue(error: any, token: string | null) {
  failedQueue.forEach((prom) => {
    if (error) {
      prom.reject(error);
    } else {
      prom.resolve(token!);
    }
  });
  failedQueue = [];
}

api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest: any = error.config;

    if (error.response?.status === 401 && !originalRequest._skipAuth) {
      if (isRefreshing) {
        return new Promise((resolve, reject) => {
          failedQueue.push({
            resolve: (token: string) => {
              originalRequest.headers.Authorization = `Bearer ${token}`;
              resolve(api(originalRequest));
            },
            reject,
          });
        });
      }

      originalRequest._skipAuth = true;
      isRefreshing = true;

      try {
        const { getRefreshToken, setTokens } = await import(
          "@/services/storage"
        );
        const refreshToken = await getRefreshToken();

        if (!refreshToken) {
          console.log("Refresh: no refresh token available");
          throw new Error("No refresh token");
        }

        const res = await api.post("/auth/refresh", { refreshToken });
        const { accessToken, refreshToken: newRefreshToken } = res.data;

        console.log("Refresh: token refreshed successfully");
        await setTokens(accessToken, newRefreshToken ?? refreshToken);
        processQueue(null, accessToken);

        originalRequest.headers.Authorization = `Bearer ${accessToken}`;
        return api(originalRequest);
      } catch (refreshError) {
        console.log("Refresh: failed, logging out", refreshError);
        processQueue(refreshError, null);
        const { clearAuth } = await import("@/services/storage");
        await clearAuth();
        return Promise.reject(refreshError);
      } finally {
        isRefreshing = false;
      }
    }

    return Promise.reject(error);
  },
);

// Définition des méthodes HTTP supportées
export type HttpMethod =
  | "GET"
  | "POST"
  | "PUT"
  | "PATCH"
  | "UPDATE"
  | "DELETE"
  | "MULTIPART";

// Définition des types génériques pour l'état du Hook
interface UseAxiosState<T> {
  data: T | null;
  isLoading: boolean;
  error: any;
}

// Définition des actions du reducer
type UseAxiosAction<T> =
  | { type: "REQUEST_START" }
  | { type: "REQUEST_SUCCESS"; payload: T }
  | { type: "REQUEST_FAILURE"; payload: any }
  | { type: "RESET" };

// Reducer pour gérer l'état de la requête de façon propre et prévisible
function axiosReducer<T>(
  state: UseAxiosState<T>,
  action: UseAxiosAction<T>,
): UseAxiosState<T> {
  switch (action.type) {
    case "REQUEST_START":
      return { ...state, isLoading: true, error: null };
    case "REQUEST_SUCCESS":
      return { isLoading: false, data: action.payload, error: null };
    case "REQUEST_FAILURE":
      return { isLoading: false, data: null, error: action.payload };
    case "RESET":
      return { isLoading: false, data: null, error: null };
    default:
      return state;
  }
}

// Options de configuration pour le hook
export interface UseAxiosOptions {
  manual?: boolean; // Si true, la requête ne sera pas lancée au montage du composant
  params?: any; // Paramètres de requête globaux (query params)
}

/**
 * Un Hook React personnalisé et générique pour effectuer des requêtes HTTP sécurisées et typées avec Axios.
 *
 * @param initialUrl - L'URL de la requête API.
 * @param initialMethod - La méthode HTTP à utiliser ('GET' par défaut).
 * @param initialData - Le corps de la requête (Request Body) initial pour POST/PUT/PATCH.
 * @param options - Options supplémentaires (manual, params).
 */
export default function useAxios<T = any>(
  initialUrl: string,
  initialMethod: HttpMethod = "GET",
  initialData: any = null,
  options: UseAxiosOptions = {},
) {
  // Par défaut, les requêtes GET s'exécutent automatiquement au montage du composant.
  // Les autres méthodes (POST, PUT, DELETE...) attendent un déclenchement manuel (execute).
  const { manual = initialMethod !== "GET", params: initialParams } = options;

  const [state, dispatch] = useReducer(axiosReducer<T>, {
    data: null,
    isLoading: !manual,
    error: null,
  });

  // Utilisation d'un Ref pour stocker l'AbortController actif afin de pouvoir
  // annuler proprement la requête si le composant est démonté ou si une nouvelle requête démarre.
  const abortControllerRef = useRef<AbortController | null>(null);

  /**
   * Fonction pour déclencher manuellement la requête API.
   * Utile pour soumettre des formulaires ou rafraîchir des données.
   */
  const execute = useCallback(
    async (customData?: any, customUrl?: string, customParams?: any) => {
      // Annuler la requête précédente si elle est toujours en cours d'exécution
      if (abortControllerRef.current) {
        abortControllerRef.current.abort();
      }

      // Création d'un nouvel AbortController pour cette requête
      const controller = new AbortController();
      abortControllerRef.current = controller;

      dispatch({ type: "REQUEST_START" });

      try {
        const activeUrl = customUrl || initialUrl;
        const activeMethod = initialMethod;
        const activeData = customData !== undefined ? customData : initialData;
        const activeParams =
          customParams !== undefined ? customParams : initialParams;

        // Préparation de la configuration Axios de manière dynamique et typée
        const config: AxiosRequestConfig = {
          url: activeUrl,
          signal: controller.signal,
          params: activeParams,
        };

        // Gestion spéciale de la méthode MULTIPART (ex: téléchargement de fichier/image)
        if (activeMethod === "MULTIPART") {
          config.method = "POST";
          config.data = activeData;
          config.headers = {
            "Content-Type": "multipart/form-data",
          };
        } else if (activeMethod === "UPDATE") {
          // 'UPDATE' est redirigé vers PATCH qui est le standard Axios
          config.method = "PATCH";
          config.data = activeData;
        } else {
          config.method =
            activeMethod.toLowerCase() as AxiosRequestConfig["method"];
          // Ne pas passer de corps (body) pour les méthodes GET et DELETE qui n'en ont normalement pas
          if (activeMethod !== "GET" && activeMethod !== "DELETE") {
            config.data = activeData;
          }
        }

        // Exécution de la requête via notre instance Axios personnalisée
        const response: AxiosResponse<T> = await api.request<T>(config);

        dispatch({ type: "REQUEST_SUCCESS", payload: response.data });
        return response.data;
      } catch (err: any) {
        // Si la requête a été annulée via AbortController, on ignore pour éviter de mettre à jour le state d'un composant démonté
        if (
          isCancel(err) ||
          err.name === "CanceledError" ||
          err.name === "AbortError"
        ) {
          return;
        }
        dispatch({ type: "REQUEST_FAILURE", payload: err });
        throw err;
      }
    },
    [initialUrl, initialMethod, initialData, initialParams],
  );

  /**
   * Réinitialise l'état du Hook (data, isLoading, error)
   */
  const reset = useCallback(() => {
    dispatch({ type: "RESET" });
  }, []);

  // Cycle de vie : Exécution au montage si la requête n'est pas manuelle
  useEffect(() => {
    if (!manual && initialUrl) {
      execute().catch(() => {
        // On gère les erreurs silencieusement ici pour éviter les rejets de promesses non gérés dans la console,
        // l'erreur est de toute façon accessible via state.error
      });
    }

    // Nettoyage : Annuler la requête en cours si le composant est démonté
    return () => {
      if (abortControllerRef.current) {
        abortControllerRef.current.abort();
      }
    };
  }, [manual, execute, initialUrl]);

  return {
    ...state,
    execute,
    reset,
  };
}
