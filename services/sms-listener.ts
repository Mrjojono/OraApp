import SmsListener from "react-native-android-sms-listener";
import { Platform } from "react-native";
import type { RawSms } from "./sms-reader";

type SmsCallback = (sms: RawSms) => void;

const listeners = new Set<SmsCallback>();
let subscribed = false;

export function subscribeToNewSms(callback: SmsCallback): () => void {
  listeners.add(callback);

  if (!subscribed && Platform.OS === "android") {
    SmsListener.addListener((message) => {
      const sms: RawSms = {
        _id: String(message.timestamp),
        address: message.originatingAddress,
        body: message.body,
        date: Number(message.timestamp) || 0,
        date_sent: Number(message.timestamp) || 0,
      };
      listeners.forEach((cb) => cb(sms));
    });
    subscribed = true;
  }

  return () => listeners.delete(callback);
}
