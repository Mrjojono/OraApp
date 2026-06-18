import AsyncStorage from "@react-native-async-storage/async-storage";

const KEYS = {
  ACCESS_TOKEN: "accessToken",
  REFRESH_TOKEN: "refreshToken",
  USER: "user",
};

export async function getAccessToken(): Promise<string | null> {
  return AsyncStorage.getItem(KEYS.ACCESS_TOKEN);
}

export async function setTokens(
  accessToken: string,
  refreshToken: string,
): Promise<void> {
  await Promise.all([
    AsyncStorage.setItem(KEYS.ACCESS_TOKEN, accessToken),
    AsyncStorage.setItem(KEYS.REFRESH_TOKEN, refreshToken),
  ]);
}

export async function getRefreshToken(): Promise<string | null> {
  return AsyncStorage.getItem(KEYS.REFRESH_TOKEN);
}

export async function saveUser(user: object): Promise<void> {
  await AsyncStorage.setItem(KEYS.USER, JSON.stringify(user));
}

export async function getUser<T = any>(): Promise<T | null> {
  const raw = await AsyncStorage.getItem(KEYS.USER);
  return raw ? JSON.parse(raw) : null;
}

export async function clearAuth(): Promise<void> {
  await Promise.all([
    AsyncStorage.removeItem(KEYS.ACCESS_TOKEN),
    AsyncStorage.removeItem(KEYS.REFRESH_TOKEN),
    AsyncStorage.removeItem(KEYS.USER),
  ]);
}
