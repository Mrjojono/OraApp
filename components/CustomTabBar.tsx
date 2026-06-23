import { View, TouchableOpacity, Dimensions } from "react-native";
import React, { useEffect } from "react";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
} from "react-native-reanimated";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { tabs } from "@/constants/data";
import { tokens } from "@/lib/tokens";

const { width: SCREEN_WIDTH } = Dimensions.get("window");

const CONFIG = {
  horizontalInset: 20,
  height: 56,
  radius: 8,
  pillWidth: 44,
  pillHeight: 36,
  iconSize: 22,
};

const TAB_WIDTH = (SCREEN_WIDTH - 2 * CONFIG.horizontalInset) / tabs.length;
const PILL_OFFSET = (TAB_WIDTH - CONFIG.pillWidth) / 2;

const CustomTabBar = ({
  state,
  navigation,
}: {
  state: { index: number; routes: { key: string; name: string }[] };
  navigation: { navigate: (name: string) => void };
}) => {
  const insets = useSafeAreaInsets();
  const pillTranslateX = useSharedValue(0);

  useEffect(() => {
    pillTranslateX.value = withSpring(state.index * TAB_WIDTH + PILL_OFFSET, {
      damping: 20,
      stiffness: 200,
    });
  }, [state.index]);

  const pillStyle = useAnimatedStyle(() => ({
    transform: [{ translateX: pillTranslateX.value }],
  }));

  return (
    <View
      style={{
        position: "absolute",
        bottom: Math.max(insets.bottom, CONFIG.horizontalInset),
        left: CONFIG.horizontalInset,
        right: CONFIG.horizontalInset,
        height: CONFIG.height,
        borderRadius: CONFIG.radius,
        backgroundColor: tokens.surface,
        borderWidth: 1,
        borderColor: tokens.outline,
        flexDirection: "row",
        alignItems: "center",
        paddingHorizontal: 0,
      }}
    >
      <Animated.View
        style={[
          {
            position: "absolute",
            width: CONFIG.pillWidth,
            height: CONFIG.pillHeight,
            borderRadius: CONFIG.pillHeight / 2,
            backgroundColor: tokens.accent,
          },
          pillStyle,
        ]}
      />

      {state.routes.map((route, index) => {
        const isFocused = state.index === index;
        const tab = tabs[index];
        if (!tab) return null;

        return (
          <TouchableOpacity
            key={route.key}
            onPress={() => navigation.navigate(route.name)}
            style={{
              flex: 1,
              height: "100%",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            {tab.icon({
              focused: isFocused,
              color: isFocused ? tokens.accent : tokens.onSurfaceVariant,
              size: CONFIG.iconSize,
            })}
          </TouchableOpacity>
        );
      })}
    </View>
  );
};

export default CustomTabBar;
