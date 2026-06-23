import { TouchableOpacity, View } from "react-native";
import { useRouter } from "expo-router";
import { ChevronLeft } from "lucide-react-native";
import { tokens } from "@/lib/tokens";

export default function BackButton() {
  const router = useRouter();
  return (
    <TouchableOpacity onPress={() => router.back()}>
      <View className="w-10 h-10 rounded-full bg-primary items-center justify-center">
        <ChevronLeft size={24} color={tokens.onAccent} />
      </View>
    </TouchableOpacity>
  );
}
