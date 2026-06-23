import {
  Home,
  Wallet,
  User2,
  Banknote,
  ScrollText,
  Star,
} from "lucide-react-native";
import { View } from "react-native";
import { tokens } from "@/lib/tokens";
const ICON_SIZE = 24;

const TabIcon = ({
  focused,
  color,
  icon: Icon,
}: {
  focused: boolean;
  color: string;
  icon: React.ComponentType<{
    size: number;
    color: string;
    strokeWidth: number;
  }>;
}) => (
  <View
    style={{
      width: 70,
      height: 44,
      borderRadius: 9,
      marginBottom: 10,
      alignItems: "center",
      justifyContent: "center",
      backgroundColor: focused ? "#FF5A5F20" : "transparent",
    }}
  >
    <Icon size={ICON_SIZE} color={color} strokeWidth={2.5} />
  </View>
);

export const tabs: AppTab[] = [
  {
    name: "index",
    title: "Home",
    icon: ({ focused, color }) => (
      <TabIcon focused={focused} color={color} icon={Home} />
    ),
  },
  {
    name: "analysis",
    title: "Analysis",
    icon: ({ focused, color }) => (
      <TabIcon focused={focused} color={color} icon={Banknote} />
    ),
  },

  {
    name: "score",
    title: "Score",
    icon: ({ focused, color }) => (
      <TabIcon focused={focused} color={color} icon={Star} />
    ),
  },
  {
    name: "profile",
    title: "Profile",
    icon: ({ focused, color }) => (
      <TabIcon focused={focused} color={color} icon={User2} />
    ),
  },
];

export const spacing = {
  0: 0,
  1: 4,
  2: 8,
  3: 12,
  4: 16,
  5: 20,
  6: 24,
  7: 28,
  8: 32,
  9: 36,
  10: 40,
  11: 44,
  12: 48,
  13: 52,
  14: 56,
  16: 64,
  18: 72,
  20: 80,
  24: 96,
  30: 120,
} as const;

export const components = {
  tabBar: {
    height: spacing[14],
    horizontalInset: spacing[5],
    radius: spacing[3],
    iconFrame: spacing[7],
  },
} as const;
