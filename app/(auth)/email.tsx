import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
} from "react-native";
import React, { useState } from "react";
import Animated from "react-native-reanimated";
import { Mail } from "lucide-react-native";
import { useRouter, useLocalSearchParams } from "expo-router";
import { useAnimation } from "@/hooks/useAnimation";
import { tokens } from "@/lib/tokens";

const SignInScreen = () => {
  const router = useRouter();
  const { entrance, pressScale } = useAnimation();
  const { from } = useLocalSearchParams();
  const [email, setEmail] = useState("");
  //console.log(email.trim());
  const handleContinue = () => {
    if (from === "accountNumber") {
      router.push("/(auth)/otp");
    } else {
      router.push(`/(auth)/password?from=login&contact=${email.trim()}`);
    }
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
        <View className="flex-1 grid grid-cols-1 mt-28">
          <Animated.Text
            entering={entrance.slideDown.delay(100)}
            className="text-3xl text-foreground font-bebas font-bold"
          >
            ENTRER VOTRE ADRESSE EMAIL
          </Animated.Text>
          <Animated.View
            entering={entrance.slideUp.delay(400)}
            className="mt-20"
          >
            <Text className="text-sm font-medium text-muted-foreground mb-2">
              Adresse Email
            </Text>
            <View
              style={styles.containerInput}
              className="flex-row border border-border bg-card px-4"
            >
              <Mail size={25} color={tokens.onSurfaceVariant} />
              <TextInput
                onChangeText={setEmail}
                style={styles.input}
                placeholder="joan@gmail.com"
                placeholderTextColor={tokens.muted}
                className="flex-1 text-foreground ml-1 h-full"
                keyboardType="email-address"
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
              onPress={handleContinue}
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

export default SignInScreen;

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
    backgroundColor: tokens.accent,
  },
});
