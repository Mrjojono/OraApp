import { View, Text, Dimensions, TouchableOpacity } from "react-native";
import React, { useRef, useState, useCallback } from "react";
import Animated from "react-native-reanimated";
import PagerView from "react-native-pager-view";
import { useRouter } from "expo-router";
import OnboardingData from "@/constants/OnboardingData";
import { useAnimation } from "@/hooks/useAnimation";
import { tokens } from "@/lib/tokens";

const { width } = Dimensions.get("window");

const OnboardingScreen = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const pagerRef = useRef<PagerView>(null);
  const router = useRouter();
  const {
    entrance,
    pressScale: pressLogin,
    pressScale: pressSignup,
  } = useAnimation();

  const handleNext = useCallback(
    (connect?: string) => {
      if (currentIndex < OnboardingData.length - 1) {
        pagerRef.current?.setPage(currentIndex + 1);
      } else {
        if (connect && connect === "orchestration-register") {
          router.replace("/(auth)/orchestration?step=account");
        } else if (connect && connect === "orchestration-connect") {
          router.replace("/(auth)/orchestration?step=email");
        } else {
          router.replace("/(auth)/email");
        }
      }
    },
    [currentIndex, router],
  );

  const handleSkip = useCallback(() => {
    pagerRef.current?.setPage(OnboardingData.length - 1);
  }, []);

  return (
    <View style={{ flex: 1 }}>
      <PagerView
        ref={pagerRef}
        style={{ flex: 1 }}
        initialPage={0}
        onPageSelected={(e) => setCurrentIndex(e.nativeEvent.position)}
      >
        {OnboardingData.map((item, index) => (
          <View
            key={index}
            style={{ flex: 1, width, backgroundColor: item.backgroundColor }}
          >
            <View
              style={{
                flex: 1,
                justifyContent: "center",
                alignItems: "center",
                paddingHorizontal: 40,
              }}
            >
              <Animated.View
                entering={entrance.bounce.delay(100)}
                style={{ width: width * 0.8, height: width * 0.8 }}
              >
                <Animated.Image
                  source={item.image}
                  style={{ width: "100%", height: "100%" }}
                />
              </Animated.View>
              <Animated.Text
                entering={entrance.slideUp.delay(300)}
                style={{
                  fontSize: 26,
                  fontWeight: "bold",
                  textAlign: "center",
                  marginTop: 40,
                  color: tokens.onSurface,
                }}
              >
                {item.title}
              </Animated.Text>
              <Animated.Text
                entering={entrance.slideUp.delay(500)}
                style={{
                  fontSize: 16,
                  textAlign: "center",
                  marginTop: 12,
                  color: tokens.onSurfaceVariant,
                }}
              >
                {item.subtitle}
              </Animated.Text>
            </View>
          </View>
        ))}
      </PagerView>

      <TouchableOpacity
        onPress={handleSkip}
        style={{ position: "absolute", top: 60, right: 24, zIndex: 10 }}
      >
        <Text style={{ fontSize: 16, color: tokens.onSurfaceVariant }}>Skip</Text>
      </TouchableOpacity>

      <Animated.View
        entering={entrance.fade.delay(700)}
        style={{
          position: "absolute",
          bottom: 60,
          left: 0,
          right: 0,
          flexDirection: "column",
          justifyContent: "space-between",
          alignItems: "center",
          gap: 20,
          width: "100%",
          paddingHorizontal: 24,
        }}
      >
        <View style={{ flexDirection: "row", gap: 8 }}>
          {OnboardingData.map((_, i) => (
            <View
              key={i}
              style={{
                width: 8,
                height: 8,
                borderRadius: 4,
                backgroundColor:
                  i === currentIndex ? tokens.accent : tokens.onSurfaceVariant,
              }}
            />
          ))}
        </View>
        {currentIndex === OnboardingData.length - 1 ? (
          <View style={{ flexDirection: "row", gap: 8, width: "100%" }}>
            <TouchableOpacity
              onPress={() => handleNext("orchestration-connect")}
              onPressIn={pressLogin.onPressIn}
              onPressOut={pressLogin.onPressOut}
              style={[
                {
                  flex: 1,
                  alignItems: "center",
                  padding: 10,
                  borderRadius: 8,
                  borderWidth: 1,
                  borderColor: tokens.accent,
                },
                pressLogin.style,
              ]}
            >
              <Text style={{ fontSize: 16, fontWeight: "600", color: tokens.accent }}>
                Se connecter
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => handleNext("orchestration-register")}
              onPressIn={pressSignup.onPressIn}
              onPressOut={pressSignup.onPressOut}
              style={[
                {
                  flex: 1,
                  alignItems: "center",
                  padding: 10,
                  borderRadius: 8,
                  backgroundColor: tokens.accent,
                },
                pressSignup.style,
              ]}
            >
              <Text
                style={{
                  fontSize: 16,
                  fontWeight: "600",
                color: tokens.onAccent,
                }}
              >
                Créer un compte
              </Text>
            </TouchableOpacity>
          </View>
        ) : (
          <TouchableOpacity
            style={{
              marginTop: 20,
              alignItems: "center",
              width: "100%",
              backgroundColor: tokens.accent,
              padding: 12,
              borderRadius: 8,
            }}
            onPress={() => handleNext("orchestration")}
          >
            <Text
              style={{
                fontSize: 16,
                fontWeight: "600",
                color: tokens.onAccent,
              }}
            >
              Suivant
            </Text>
          </TouchableOpacity>
        )}
      </Animated.View>
    </View>
  );
};

export default OnboardingScreen;
