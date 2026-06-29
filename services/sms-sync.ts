import { api } from "./api";
import { readAllSms, requestSmsPermission } from "./sms-reader";

const SMS_SYNC_URL = "/sms/sync";
const CHUNK_SIZE = 100;

export async function syncNewSms() {
  try {
    const granted = await requestSmsPermission();
    if (!granted) return { synced: 0 };

    const allSms = await readAllSms(500);
    if (allSms.length === 0) return { synced: 0 };

    let synced = 0;

    for (let i = 0; i < allSms.length; i += CHUNK_SIZE) {
      const chunk = allSms.slice(i, i + CHUNK_SIZE);
      const sanitized = chunk.map((sms) => ({
        ...sms,
        date: Number(sms.date) || 0,
        date_sent: Number(sms.date_sent) || 0,
      }));
      await api.post(SMS_SYNC_URL, { messages: sanitized });
      synced += chunk.length;
    }

    return { synced };
  } catch (e: any) {
    console.log("SMS sync error:", e?.response?.data ?? e?.message ?? e);
    return { synced: 0, error: e };
  }
}

export function startAutoSync(intervalMs: number = 3600000) {
  syncNewSms();
  return setInterval(syncNewSms, intervalMs);
}
