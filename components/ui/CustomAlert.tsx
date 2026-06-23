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
}

type InternalConfig = AlertConfig & { resolve: (index: number) => void };

let alertCallback: ((config: InternalConfig) => void) | null = null;

export function showAlert(config: AlertConfig) {
  return new Promise<number>((resolve) => {
    alertCallback?.({ ...config, resolve });
  });
}

export default function CustomAlert() {
  const [config, setConfig] = useState<InternalConfig | null>(null);
  const [visible, setVisible] = useState(false);
  const backdropOpacity = useSharedValue(0);
  const dialogScale = useSharedValue(0.9);

  const isDestructible =
    config?.buttons?.some((b) => b.style === "destructive") ?? false;

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

  const buttonStyle = (b: AlertButton) => {
    if (b.style === "destructive") return styles.btnDestructiveText;
    if (b.style === "cancel") return styles.btnCancelText;
    return styles.btnDefaultText;
  };

  return (
    <Modal transparent visible={visible} onRequestClose={() => hide(-1)}>
      <Animated.View style={[styles.backdrop, backdropStyle]}>
        <Pressable style={StyleSheet.absoluteFill} onPress={() => hide(-1)} />
        <Animated.View style={[styles.dialog, dialogStyle]}>
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
                    pressed && styles.btnPressed,
                    i > 0 && styles.btnBorder,
                  ]}
                >
                  <Text style={[styles.btnText, buttonStyle(b)]}>
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
    borderRadius: 14,
    borderWidth: 1,
    borderColor: tokens.outline,
    padding: 24,
    gap: 8,
  },
  title: {
    fontSize: 17,
    fontWeight: "600",
    color: tokens.onSurface,
    textAlign: "center",
  },
  message: {
    fontSize: 14,
    fontWeight: "400",
    color: tokens.onSurfaceVariant,
    textAlign: "center",
    lineHeight: 20,
    marginTop: 4,
  },
  btnRow: {
    flexDirection: "row",
    marginTop: 16,
    gap: 8,
  },
  btn: {
    flex: 1,
    height: 44,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
  },
  btnCancel: {
    backgroundColor: tokens.accentContainer,
  },
  btnPressed: {
    opacity: 0.7,
  },
  btnBorder: {
    borderLeftWidth: 0,
  },
  btnText: {
    fontSize: 15,
    fontWeight: "600",
  },
  btnDefaultText: {
    color: tokens.accent,
  },
  btnCancelText: {
    color: tokens.accent,
  },
  btnDestructiveText: {
    color: tokens.negative,
  },
});
