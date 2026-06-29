import { useState, useEffect, useCallback } from "react";
import {
  Modal,
  Pressable,
  Text,
  View,
  StyleSheet,
  BackHandler,
} from "react-native";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
} from "react-native-reanimated";
import { AlertTriangle, Info, CheckCircle, XCircle } from "lucide-react-native";
import { tokens } from "@/lib/tokens";

export interface AlertButton {
  text: string;
  style?: "default" | "cancel" | "destructive";
  onPress?: () => void;
}

export interface AlertConfig {
  title: string;
  message?: string;
  buttons?: AlertButton[];
  severity?: "info" | "warning" | "destructive" | "success";
}

type InternalConfig = AlertConfig & { resolve: (index: number) => void };

let alertCallback: ((config: InternalConfig) => void) | null = null;

export function showAlert(config: AlertConfig) {
  return new Promise<number>((resolve) => {
    alertCallback?.({ ...config, resolve });
  });
}

const severityIcons = {
  info: Info,
  warning: AlertTriangle,
  destructive: XCircle,
  success: CheckCircle,
};

const severityColors: Record<string, string> = {
  info: tokens.accent,
  warning: tokens.warning,
  destructive: tokens.negative,
  success: tokens.positive,
};

export default function CustomAlert() {
  const [config, setConfig] = useState<InternalConfig | null>(null);
  const [visible, setVisible] = useState(false);
  const backdropOpacity = useSharedValue(0);
  const dialogScale = useSharedValue(0.9);

  const severity = config?.severity ?? "info";
  const Icon = severityIcons[severity] || severityIcons.info;
  const iconColor = severityColors[severity] || severityColors.info;

  const show = useCallback((cfg: InternalConfig) => {
    setConfig(cfg);
    setVisible(true);
    backdropOpacity.value = withTiming(1, { duration: 200 });
    dialogScale.value = withTiming(1, { duration: 200 });
  }, []);

  const hide = useCallback(
    (resultIndex: number = -1) => {
      backdropOpacity.value = withTiming(0, { duration: 150 });
      dialogScale.value = withTiming(0.9, { duration: 150 });
      setTimeout(() => {
        setVisible(false);
        config?.resolve(resultIndex);
        setConfig(null);
      }, 150);
    },
    [config],
  );

  useEffect(() => {
    alertCallback = show;
    return () => {
      alertCallback = null;
    };
  }, [show]);

  useEffect(() => {
    if (!visible) return;
    const onBack = () => {
      hide(-1);
      return true;
    };
    const sub = BackHandler.addEventListener("hardwareBackPress", onBack);
    return () => sub.remove();
  }, [visible, hide]);

  const backdropStyle = useAnimatedStyle(() => ({
    opacity: backdropOpacity.value,
  }));

  const dialogStyle = useAnimatedStyle(() => ({
    transform: [{ scale: dialogScale.value }],
  }));

  return (
    <Modal transparent visible={visible} onRequestClose={() => hide(-1)}>
      <Animated.View style={[styles.backdrop, backdropStyle]}>
        <Pressable style={StyleSheet.absoluteFill} onPress={() => hide(-1)} />
        <Animated.View style={[styles.dialog, dialogStyle]}>
          <View style={[styles.iconWrap, { backgroundColor: iconColor + "18" }]}>
            <Icon size={24} color={iconColor} />
          </View>

          {!!config?.title && (
            <Text style={styles.title}>{config.title}</Text>
          )}
          {!!config?.message && (
            <Text style={styles.message}>{config.message}</Text>
          )}

          {config?.buttons && config.buttons.length > 0 && (
            <View style={styles.btnRow}>
              {config.buttons.map((b, i) => (
                <Pressable
                  key={i}
                  onPress={() => {
                    b.onPress?.();
                    hide(i);
                  }}
                  style={({ pressed }) => [
                    styles.btn,
                    b.style === "cancel" && styles.btnCancel,
                    b.style === "destructive" && styles.btnDestructive,
                    pressed && styles.btnPressed,
                  ]}
                >
                  <Text
                    style={[
                      styles.btnText,
                      b.style === "destructive" && styles.btnDestructiveText,
                      b.style === "cancel" && styles.btnCancelText,
                    ]}
                  >
                    {b.text}
                  </Text>
                </Pressable>
              ))}
            </View>
          )}
        </Animated.View>
      </Animated.View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  backdrop: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.6)",
    justifyContent: "center",
    alignItems: "center",
    padding: 40,
  },
  dialog: {
    width: "100%",
    backgroundColor: tokens.surface,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: tokens.outline,
    padding: 28,
    paddingTop: 24,
    alignItems: "center",
    gap: 6,
  },
  iconWrap: {
    width: 48,
    height: 48,
    borderRadius: 14,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 8,
  },
  title: {
    fontSize: 17,
    fontWeight: "600",
    color: tokens.onSurface,
    textAlign: "center",
    fontFamily: "DMSans_600SemiBold",
  },
  message: {
    fontSize: 14,
    fontWeight: "400",
    color: tokens.onSurfaceVariant,
    textAlign: "center",
    lineHeight: 20,
    fontFamily: "DMSans_400Regular",
    marginTop: 4,
  },
  btnRow: {
    flexDirection: "row",
    marginTop: 20,
    gap: 10,
    width: "100%",
  },
  btn: {
    flex: 1,
    height: 48,
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: tokens.accent + "18",
  },
  btnCancel: {
    backgroundColor: tokens.surface,
    borderWidth: 1,
    borderColor: tokens.outline,
  },
  btnDestructive: {
    backgroundColor: "#FF453A18",
  },
  btnPressed: {
    opacity: 0.7,
  },
  btnText: {
    fontSize: 15,
    fontWeight: "600",
    color: tokens.accent,
    fontFamily: "DMSans_600SemiBold",
  },
  btnCancelText: {
    color: tokens.onSurfaceVariant,
  },
  btnDestructiveText: {
    color: tokens.negative,
  },
});
