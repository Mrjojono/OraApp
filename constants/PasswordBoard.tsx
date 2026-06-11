import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import React from "react";
import Animated from "react-native-reanimated";
import { Lock } from "lucide-react-native";
import { useAnimation } from "@/hooks/useAnimation";

const PasswordBoard = () => {
  const { entrance, pressScale } = useAnimation();

  return (
    <View className="flex-1 grid grid-cols-1 mt-28">
      <Animated.Text
        entering={entrance.slideDown.delay(100)}
        className="text-3xl font-bebas font-bold"
      >
        CRÉER VOTRE MOT DE PASSE
      </Animated.Text>
      <Animated.View entering={entrance.slideUp.delay(400)} className="mt-20">
        <Text className="text-sm font-medium text-forest-depth mb-2">
          Mot de passe
        </Text>
        <View
          style={styles.containerInput}
          className="flex-row border border-mint-subtle   bg-surface-white px-4"
        >
          <Lock size={25} color="#727A67" />
          <TextInput
            style={styles.input}
            placeholder="••••••••"
            className="flex-1  ml-1 h-full"
            secureTextEntry
            autoCapitalize="none"
          />
        </View>
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

export default PasswordBoard;

const styles = StyleSheet.create({
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
