import { View, Text, Pressable } from "react-native";
import React, { useCallback, useMemo, useRef } from "react";
import { ChevronRight } from "lucide-react-native";
import BottomSheet, { BottomSheetView } from "@gorhom/bottom-sheet";
import { GestureHandlerRootView } from "react-native-gesture-handler";

type BadgeVariant = "success" | "warning" | "danger" | "neutral" | "info";

type BadgeProps = {
  text: string;
  icon?: React.ReactNode;
  variant?: BadgeVariant;
  onPress?: () => void;
};

const variants: Record<BadgeVariant, { bg: string; text: string }> = {
  success: { bg: "#2d3f22", text: "#9fe35d" },
  warning: { bg: "#3d2e0e", text: "#EF9F27" },
  danger: { bg: "#3d1414", text: "#F09595" },
  neutral: { bg: "#2a2a28", text: "#B4B2A9" },
  info: { bg: "#0e2440", text: "#85B7EB" },
};

const Badge = ({ text, icon, variant = "success", onPress }: BadgeProps) => {
  const colors = variants[variant];

  const bottomSheetRef = useRef<BottomSheet>(null);

  const handleSheetChanges = useCallback((index: number) => {
    console.log("handleSheetChanges", index);
  }, []);

  return (
    <Pressable
      onPress={onPress}
      disabled={!onPress}
      style={({ pressed }) => ({
        backgroundColor: colors.bg,
        borderRadius: 10,
        paddingHorizontal: 12,
        paddingVertical: 5,
        flexDirection: "row",
        alignItems: "center",
        gap: 6,
        alignSelf: "flex-start",
        opacity: pressed ? 0.7 : 1,
      })}
    >
      {icon && <View>{icon}</View>}
      <Text style={{ color: colors.text, fontSize: 12 }}>{text}</Text>
      {icon ? null : <ChevronRight size={12} color={colors.text} />}
    </Pressable>
  );
};

export default Badge;
