import { StyleSheet, View, Text, Pressable } from "react-native";
import {
  Star,
  Target,
  Lightbulb,
  HelpCircle,
  type LucideIcon,
} from "lucide-react-native";
import { tokens } from "@/lib/tokens";

interface QuickAction {
  label: string;
  icon: LucideIcon;
  iconBg?: string;
  iconColor?: string;
}

const defaultActions: QuickAction[] = [
  {
    label: "Score",
    icon: Star,
    iconBg: tokens.accent + "20",
    iconColor: tokens.accent,
  },
  {
    label: "Objectifs",
    icon: Target,
    iconBg: "transparent",
    iconColor: tokens.onSurface,
  },
  {
    label: "Conseils",
    icon: Lightbulb,
    iconBg: "transparent",
    iconColor: tokens.onSurface,
  },
  {
    label: "Aide",
    icon: HelpCircle,
    iconBg: "transparent",
    iconColor: tokens.onSurface,
  },
];

interface Props {
  actions?: QuickAction[];
  onPress?: (label: string) => void;
}

export function QuickActions({ actions = defaultActions, onPress }: Props) {
  return (
    <View style={styles.container}>
      {actions.map((item) => (
        <Pressable
          key={item.label}
          onPress={() => onPress?.(item.label)}
          style={({ pressed }) => [styles.btn, pressed && styles.pressed]}
        >
          <View style={[styles.iconBox]}>
            <item.icon size={22} color={item.iconColor ?? tokens.onSurface} />
          </View>
          <Text style={styles.label}>{item.label}</Text>
        </Pressable>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    paddingHorizontal: 14,
    gap: 12,
    paddingBottom: 20,
  },
  btn: {
    flex: 1,
    alignItems: "center",
    gap: 6,
    backgroundColor: tokens.surface,
    borderRadius: 14,
    paddingVertical: 14,
    paddingHorizontal: 4,
  },
  pressed: { opacity: 0.7 },
  iconBox: {
    width: 44,
    height: 20,
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
  },
  label: {
    fontFamily: "DMSans_500Medium",
    fontSize: 10,
    color: tokens.onSurfaceVariant,
    letterSpacing: 0.02,
  },
});
