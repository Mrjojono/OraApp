import { PermissionsAndroid, Platform } from "react-native";
import { useState, useCallback, useEffect, useRef } from "react";
import SmsAndroid from "react-native-get-sms-android";
import { subscribeToNewSms } from "./sms-listener";

export interface RawSms {
  _id: string;
  address: string;
  body: string;
  date: string | number;
  date_sent: string | number;
}

export async function requestSmsPermission(): Promise<boolean> {
  if (Platform.OS !== "android") return false;

  try {
    const granted = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.READ_SMS,
      {
        title: "Accès aux SMS",
        message:
          "OraApp a besoin d'accéder à vos SMS pour analyser vos transactions.",
        buttonPositive: "Autoriser",
        buttonNegative: "Refuser",
      },
    );

    return granted === PermissionsAndroid.RESULTS.GRANTED;
  } catch {
    return false;
  }
}

export function readAllSms(maxCount: number = 500): Promise<RawSms[]> {
  return new Promise((resolve, reject) => {
    if (Platform.OS !== "android") {
      reject(new Error("Lecture SMS disponible uniquement sur Android"));
      return;
    }

    SmsAndroid.list(
      JSON.stringify({ box: "inbox", maxCount }),
      (error: string) => {
        reject(new Error(error || "Erreur de lecture des SMS"));
      },
      (_count: number, smsListJson: string) => {
        try {
          const messages: RawSms[] = JSON.parse(smsListJson);
          resolve(
            messages.map((msg) => ({
              ...msg,
              _id: String(msg._id ?? ""),
              date: Number(msg.date) || 0,
              date_sent: Number(msg.date_sent) || 0,
            })),
          );
        } catch {
          reject(new Error("Erreur de parsing de la liste SMS"));
        }
      },
    );
  });
}

type ReadStatus = "idle" | "loading" | "granted" | "denied" | "error";

export function useSmsReader() {
  const [status, setStatus] = useState<ReadStatus>("idle");
  const [smsList, setSmsList] = useState<RawSms[]>([]);
  const [error, setError] = useState<string | null>(null);
  const lastCount = useRef(0);

  useEffect(() => {
    const unsubscribe = subscribeToNewSms((sms) => {
      setSmsList((prev) => [sms, ...prev]);
    });
    return unsubscribe;
  }, []);

  const read = useCallback(async () => {
    setStatus("loading");
    setError(null);

    try {
      const granted = await requestSmsPermission();
      if (!granted) {
        setStatus("denied");
        setError("Permission SMS refusée");
        return [];
      }

      const messages = await readAllSms();
      lastCount.current = messages.length;
      setStatus("granted");
      setSmsList(messages);
      return messages;
    } catch (err: any) {
      setStatus("error");
      setError(err.message || "Erreur inconnue");
      return [];
    }
  }, []);

  const reset = useCallback(() => {
    setStatus("idle");
    setSmsList([]);
    setError(null);
  }, []);

  return { status, smsList, error, read, reset };
}
