import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  ActivityIndicator,
} from "react-native";
import React, { useState, useEffect } from "react";
import Animated from "react-native-reanimated";
import { EyeOff, Eye, AlertCircle } from "lucide-react-native";
import { useRouter, useLocalSearchParams } from "expo-router";
import { useAnimation } from "@/hooks/useAnimation";
import { useAuth } from "@/hooks/useAuth";
import { tokens } from "@/lib/tokens";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

const PasswordScreen = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [forgotTimer, setForgotTimer] = useState(0);
  const [error, setError] = useState("");
  const [password, setPassword] = useState("");
  //const [confirmPassword, setConfirmPassword] = useState("");
  const { isSubmitting, login } = useAuth();
  const [canResend, setCanResend] = useState(true);
  const router = useRouter();
  const { entrance, pressScale } = useAnimation();
  const { from, contact } = useLocalSearchParams();

  // console.log(contact);

  const handleSubmit = async () => {
    if (from === "login") {
      if (password.length === 0) {
        setError("Vous devez entrer un mot de passe");
        return;
      }
      try {
        await login({ contact: String(contact), password });
        router.push("/(tabs)");
      } catch {
        setError("Échec de la connexion. Vérifiez vos identifiants.");
      }
    }
  };

  useEffect(() => {
    if (forgotTimer <= 0) return;
    const interval = setInterval(() => setForgotTimer((t) => t - 1), 1000);
    return () => clearInterval(interval);
  }, [forgotTimer]);

  const handleForgotPassword = () => {
    if (!canResend) return;
    setCanResend(false);
    setForgotTimer(60);
    setTimeout(() => setCanResend(true), 60000);
  };

  const formatTime = (s: number) => {
    const m = Math.floor(s / 60);
    const sec = s % 60;
    return `${m}:${sec.toString().padStart(2, "0")}`;
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : undefined}
      className="flex-1   bg-background px-5"
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
            {from === "register"
              ? "CRÉER VOTRE MOT DE PASSE"
              : "ENTRER VOTRE MOT DE PASSE"}
          </Animated.Text>

          <Animated.View
            entering={entrance.slideUp.delay(400)}
            className="mt-20"
          >
            <Text className="text-sm font-medium text-muted-foreground mb-2">
              Mot de passe
            </Text>
            <View
              style={styles.containerInput}
              className="flex-row border border-border bg-card px-4"
            >
              <TextInput
                onChangeText={(text) => setPassword(text)}
                value={password}
                style={styles.input}
                placeholder="••••••••••••••••"
                placeholderTextColor={tokens.muted}
                className="flex-1 text-foreground h-full"
                secureTextEntry={!showPassword}
                autoCapitalize="none"
              />
              <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
                {showPassword ? (
                  <Eye size={25} color={tokens.onSurfaceVariant} />
                ) : (
                  <EyeOff size={25} color={tokens.onSurfaceVariant} />
                )}
              </TouchableOpacity>
            </View>

            {from !== "register" && (
              <TouchableOpacity
                onPress={handleForgotPassword}
                disabled={!canResend}
              >
                <Text
                  className={`text-sm ml-1 underline font-medium mt-1 ${
                    canResend ? "text-foreground" : "text-muted-foreground"
                  }`}
                >
                  {canResend
                    ? "mot de passe oublié?"
                    : `Réessayer (${formatTime(forgotTimer)})`}
                </Text>
              </TouchableOpacity>
            )}
          </Animated.View>

          {from === "register" && (
            <Animated.View
              entering={entrance.slideUp.delay(400)}
              className="mt-10"
            >
              <Text className="text-sm font-medium text-muted-foreground mb-2">
                Repeter le mot de passe
              </Text>
              <View
                style={styles.containerInput}
                className="flex-row border border-border bg-card px-4"
              >
                <TextInput
                  style={styles.input}
                  placeholder="••••••••••••••••"
                  placeholderTextColor={tokens.muted}
                  className="flex-1 text-foreground h-full"
                  secureTextEntry={!showConfirm}
                  autoCapitalize="none"
                />
                <TouchableOpacity onPress={() => setShowConfirm(!showConfirm)}>
                  {showConfirm ? (
                    <Eye size={25} color={tokens.onSurfaceVariant} />
                  ) : (
                    <EyeOff size={25} color={tokens.onSurfaceVariant} />
                  )}
                </TouchableOpacity>
              </View>
            </Animated.View>
          )}

          <Animated.View
            entering={entrance.slideUp.delay(700)}
            className="mt-10 items-center "
          >
            <TouchableOpacity
              onPressIn={pressScale.onPressIn}
              onPressOut={pressScale.onPressOut}
              onPress={handleSubmit}
              style={styles.button}
              disabled={isSubmitting}
            >
              <Animated.View style={pressScale.style}>
                {isSubmitting ? (
                  <ActivityIndicator size="large" color={tokens.onAccent} />
                ) : (
                  <Text className="text-lg font-medium text-on-primary">
                    Continuer
                  </Text>
                )}
              </Animated.View>
            </TouchableOpacity>
            {error ? (
              <Alert icon={AlertCircle} variant="destructive" className="mt-4">
                <AlertTitle>Erreur</AlertTitle>
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            ) : null}
          </Animated.View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default PasswordScreen;

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
