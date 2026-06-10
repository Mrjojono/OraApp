import { View, Text, Dimensions, TouchableOpacity } from "react-native";
import React, { useRef, useState, useCallback } from "react";
import Animated from "react-native-reanimated";
import PagerView from "react-native-pager-view";
import { useRouter } from "expo-router";
import OnboardingData from "@/constants/OnboardingData";
import { useAnimation } from "@/hooks/useAnimation";

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

  const handleNext = useCallback(() => {
    if (currentIndex < OnboardingData.length - 1) {
      pagerRef.current?.setPage(currentIndex + 1);
    } else {
      router.replace("/(tabs)");
    }
  }, [currentIndex, router]);

  const handleSkip = useCallback(() => {
    router.replace("/(tabs)");
  }, [router]);

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
                  color: "#181D16",
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
                  color: "#424939",
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
        <Text style={{ fontSize: 16, color: "#424939" }}>Skip</Text>
      </TouchableOpacity>

      {/* Pagination + Next button - bottom */}
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
                backgroundColor: i === currentIndex ? "#3A6A00" : "#C1C9B4",
              }}
            />
          ))}
        </View>
        {currentIndex === OnboardingData.length - 1 ? (
          <View style={{ flexDirection: "row", gap: 8, width: "100%" }}>
            <TouchableOpacity
              onPress={handleSkip}
              onPressIn={pressLogin.onPressIn}
              onPressOut={pressLogin.onPressOut}
              style={[
                {
                  flex: 1,
                  alignItems: "center",
                  padding: 10,
                  borderRadius: 8,
                  borderWidth: 1,
                  borderColor: "#3A6A00",
                },
                pressLogin.style,
              ]}
            >
              <Text
                style={{ fontSize: 16, fontWeight: "600", color: "#3A6A00" }}
              >
                Se connecter
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={handleNext}
              onPressIn={pressSignup.onPressIn}
              onPressOut={pressSignup.onPressOut}
              style={[
                {
                  flex: 1,
                  alignItems: "center",
                  padding: 10,
                  borderRadius: 8,
                  backgroundColor: "#3A6A00",
                },
                pressSignup.style,
              ]}
            >
              <Text
                style={{ fontSize: 16, fontWeight: "600", color: "#FFFFFF" }}
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
              backgroundColor: "#3A6A00",
              padding: 12,
              borderRadius: 8,
            }}
            onPress={handleNext}
          >
            <Text style={{ fontSize: 16, fontWeight: "600", color: "#FFFFFF" }}>
              Suivant
            </Text>
          </TouchableOpacity>
        )}
      </Animated.View>
    </View>
  );
};

export default OnboardingScreen;
