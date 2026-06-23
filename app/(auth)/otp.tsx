import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
} from "react-native";
import React, { useState, useEffect } from "react";
import Animated from "react-native-reanimated";
import { useRouter } from "expo-router";
import { useAnimation } from "@/hooks/useAnimation";
import { tokens } from "@/lib/tokens";
import OTPTextInput from "react-native-otp-textinput";

const OTPScreen = () => {
  const [timer, setTimer] = useState(300);
  const [canResend, setCanResend] = useState(false);
  const router = useRouter();
  const { entrance, pressScale } = useAnimation();

  useEffect(() => {
    if (timer <= 0) {
      setCanResend(true);
      return;
    }
    const interval = setInterval(() => setTimer((t) => t - 1), 1000);
    return () => clearInterval(interval);
  }, [timer]);

  const formatTime = (s: number) => {
    const m = Math.floor(s / 60);
    const sec = s % 60;
    return `${m}:${sec.toString().padStart(2, "0")}`;
  };

  const handleResend = () => {
    if (!canResend) return;
    setTimer(300);
    setCanResend(false);
    //logique d'envoie de code
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : undefined}
      className="flex-1 bg-background px-5"
    >
      <ScrollView
        contentContainerStyle={{ flexGrow: 1, paddingBottom: 120 }}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
      >
        <View className="flex-1 grid grid-cols-1 mt-5">
          <Animated.Text
            entering={entrance.slideDown.delay(100)}
            className="text-3xl text-foreground font-bebas font-bold"
          >
            VÉRIFIEZ VOTRE IDENTITÉ
          </Animated.Text>

          <Animated.Text
            entering={entrance.slideUp.delay(250)}
            className="text-sm text-muted-foreground mt-4"
          >
            Un code de vérification a été envoyé au +228 ********* 05.
          </Animated.Text>

          <Animated.View
            entering={entrance.slideUp.delay(400)}
            className="mt-8"
          >
            <Text className="text-sm font-medium text-muted-foreground mb-2">
              Code de vérification
            </Text>
            <OTPTextInput
              tintColor={tokens.accent}
              offTintColor={tokens.outline}
              inputCount={6}
              textInputStyle={{
                width: 45,
                height: 50,
                borderRadius: 8,
                borderWidth: 1,
              }}
              handleTextChange={(code) => console.log(code)}
            />
          </Animated.View>

          <Animated.View
            entering={entrance.slideUp.delay(550)}
            className="items-center mt-6"
          >
            <Text className="text-sm text-muted-foreground">
              Vous n&apos;avez pas reçu de code ?{" "}
              <Text
                className={
                  canResend
                    ? "text-primary font-semibold underline"
                    : "text-outline"
                }
                onPress={handleResend}
                disabled={!canResend}
              >
                {canResend ? "Renvoyer" : `Renvoyer (${formatTime(timer)})`}
              </Text>
            </Text>
          </Animated.View>

          <Animated.View
            entering={entrance.slideUp.delay(700)}
            className="mt-10 items-center"
          >
            <TouchableOpacity
              onPressIn={pressScale.onPressIn}
              onPressOut={pressScale.onPressOut}
              onPress={() => router.push("/(auth)/password?from=register")}
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
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default OTPScreen;

const styles = StyleSheet.create({
  button: {
    alignItems: "center",
    justifyContent: "center",
    height: 50,
    width: "100%",
    borderRadius: 8,
    backgroundColor: tokens.accent,
  },
});
