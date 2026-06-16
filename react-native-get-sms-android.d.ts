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
