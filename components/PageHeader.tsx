import { View, Text, Pressable, StyleSheet } from "react-native";
import { useRouter } from "expo-router";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { ChevronLeft } from "lucide-react-native";
import { tokens } from "@/lib/tokens";

interface Props {
  title: string;
  subtitle?: string;
}

export default function PageHeader({ title, subtitle }: Props) {
  const router = useRouter();
  const insets = useSafeAreaInsets();

  return (
    <View style={[styles.container, { paddingTop: insets.top + 8 }]}>
      <View style={styles.row}>
        <Pressable
          onPress={() => router.back()}
          style={({ pressed }) => [
            styles.backBtn,
            pressed && styles.backPressed,
          ]}
        >
          <ChevronLeft size={22} color={tokens.onSurface} />
        </Pressable>
        <View style={styles.textArea}>
          <Text style={styles.title}>{title}</Text>
          {subtitle && <Text style={styles.subtitle}>{subtitle}</Text>}
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: tokens.background,
    paddingBottom: 12,
    paddingHorizontal: 16,
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
  backBtn: {
    width: 36,
    height: 36,
    borderRadius: 10,
    backgroundColor: tokens.surface,
    alignItems: "center",
    justifyContent: "center",
  },
  backPressed: { opacity: 0.6 },
  textArea: { flex: 1 },
  title: {
    fontFamily: "DMSans_600SemiBold",
    fontSize: 17,
    color: tokens.onSurface,
  },
  subtitle: {
    fontFamily: "DMSans_400Regular",
    fontSize: 11,
    color: tokens.onSurfaceVariant,
    marginTop: 1,
  },
});
