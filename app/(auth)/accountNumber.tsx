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
import React from "react";
import Animated from "react-native-reanimated";
import { Hash } from "lucide-react-native";
import { useRouter } from "expo-router";
import { tokens } from "@/lib/tokens";
import { useAnimation } from "@/hooks/useAnimation";

const AccountNumber = () => {
  const router = useRouter();
  const { entrance, pressScale } = useAnimation();

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
            ENTRER VOTRE NUMERO DE COMPTE
          </Animated.Text>
          <Animated.View
            entering={entrance.slideUp.delay(400)}
            className="mt-20"
          >
            <Text className="text-sm font-medium text-muted-foreground mb-2">
              Numero de Compte
            </Text>
            <View
              style={styles.containerInput}
              className="flex-row border border-border bg-card px-4"
            >
              <Hash size={25} color={tokens.onSurfaceVariant} />
              <TextInput
                style={styles.input}
                placeholder="4443185208"
                placeholderTextColor={tokens.muted}
                className="flex-1 text-foreground ml-1 h-full"
                keyboardType="numeric"
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
              onPress={() => router.push("/(auth)/email?from=accountNumber")}
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

export default AccountNumber;

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
