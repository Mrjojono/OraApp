import { api } from "./api";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { readAllSms } from "./sms-reader";

const LAST_SYNC_KEY = "@OraApp/lastSyncId";
const SMS_SYNC_URL = "/sms/sync";

async function getLastSyncId(): Promise<number> {
  const val = await AsyncStorage.getItem(LAST_SYNC_KEY);
  return val ? parseInt(val, 10) : 0;
}

export async function syncNewSms() {
  const allSms = await readAllSms(500);
  const lastId = await getLastSyncId();

  const newSms = allSms.filter((s) => parseInt(s._id, 10) > lastId);
  if (newSms.length === 0) return { synced: 0 };

  await api.post(SMS_SYNC_URL, { messages: newSms });

  const maxId = Math.max(...newSms.map((s) => parseInt(s._id, 10)));
  await AsyncStorage.setItem(LAST_SYNC_KEY, String(maxId));
  return { synced: newSms.length };
}

export function startAutoSync(intervalMs: number = 3600000) {
  syncNewSms();
  return setInterval(syncNewSms, intervalMs);
}
