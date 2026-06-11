import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import React from "react";
import Animated from "react-native-reanimated";
import { Mail } from "lucide-react-native";
import { useAnimation } from "@/hooks/useAnimation";

const EmailBoard = () => {
  const { entrance, pressScale } = useAnimation();

  return (
    <View className="flex-1 grid grid-cols-1 mt-28">
      <Animated.Text
        entering={entrance.slideDown.delay(100)}
        className="text-3xl font-bebas font-bold"
      >
        ENTRER VOTRE ADRESSE EMAIL
      </Animated.Text>
      <Animated.View entering={entrance.slideUp.delay(400)} className="mt-20">
        <Text className="text-sm  font-medium text-forest-depth mb-2">
          Adresse Email
        </Text>
        <View
          style={styles.containerInput}
          className="flex-row border border-mint-subtle   bg-surface-white px-4"
        >
          <Mail size={25} color="#727A67" />
          <TextInput
            style={styles.input}
            placeholder="joan@gmail.com"
            className="flex-1  ml-1 h-full"
            keyboardType="email-address"
            autoCapitalize="none"
          />
        </View>
        <Text className="text-sm mt-1 ml-2">
          Nous utiliserons cet email pour sécuriser votre compte.
        </Text>
      </Animated.View>

      <Animated.View
        entering={entrance.slideUp.delay(700)}
        className="mt-10 items-center "
      >
        <TouchableOpacity
          onPressIn={pressScale.onPressIn}
          onPressOut={pressScale.onPressOut}
          style={styles.button}
        >
          <Animated.View style={pressScale.style}>
            <Text className="text-lg font-medium text-on-primary">
              Continuer
            </Text>
          </Animated.View>
        </TouchableOpacity>
      </Animated.View>
    </View>
  );
};

export default EmailBoard;

const styles = StyleSheet.create({
  text: {},
  containerInput: {
    flexDirection: "row",
    alignItems: "center",
    borderRadius: 8,
    paddingHorizontal: 5,
    height: 50,
  },
  input: {
    fontSize: 16,
    paddingHorizontal: 5,
  },
  button: {
    alignItems: "center",
    justifyContent: "center",
    height: 50,
    width: "100%",
    borderRadius: 8,
    backgroundColor: "#3A6A00",
  },
});
