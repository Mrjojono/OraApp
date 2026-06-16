declare module "react-native-get-sms-android" {
  const SmsAndroid: {
    list: (
      filterJson: string,
      fail: (error: string) => void,
      success: (count: number, smsListJson: string) => void,
    ) => void;
  };
  export default SmsAndroid;
}

declare module "react-native-android-sms-listener" {
  interface SmsMessage {
    originatingAddress: string;
    body: string;
    timestamp: number;
  }
  interface Subscription {
    remove: () => void;
  }
  const SmsListener: {
    addListener: (callback: (message: SmsMessage) => void) => Subscription;
  };
  export default SmsListener;
}
