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
        _id: `${message.timestamp}`,
        address: message.originatingAddress,
        body: message.body,
        date: message.timestamp,
        date_sent: message.timestamp,
      };
      listeners.forEach((cb) => cb(sms));
    });
    subscribed = true;
  }

  return () => listeners.delete(callback);
}
