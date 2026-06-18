import { useState } from "react";
import { Pressable, Text, View, ActivityIndicator } from "react-native";
import { api } from "@/services/api";

export default function PingTest() {
  const [result, setResult] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [baseUrl, setBaseUrl] = useState<string | null>(null);

  const test = async () => {
    setLoading(true);
    setResult(null);

    const url = `${api.defaults.baseURL}/ping`;
    setBaseUrl(url);

    try {
      const res = await api.get("/ping");
      setResult(`OK ${res.status}\n${JSON.stringify(res.data)}`);
    } catch (err: any) {
      const parts: string[] = [];

      if (err.response) {
        const { status, data } = err.response;
        parts.push(`Status: ${status}`);
        if (data) parts.push(`Data: ${JSON.stringify(data)}`);
      } else if (err.request) {
        parts.push("Aucune réponse du serveur");
        parts.push("Vérifie que le backend tourne et que ngrok est actif");
      } else {
        parts.push(err.message);
      }

      setResult(parts.join("\n"));
    }

    setLoading(false);
  };

  return (
    <View className="mt-3 border border-red-200 rounded-lg p-3 bg-red-50">
      <Text className="text-xs font-bold text-red-700 mb-1">
        Diagnostic connexion
      </Text>
      <Pressable
        onPress={test}
        disabled={loading}
        className="bg-red-500 py-3 px-5 rounded-lg items-center"
      >
        {loading ? (
          <ActivityIndicator color="#FFFFFF" />
        ) : (
          <Text className="text-white font-semibold text-sm">
            Tester connexion backend
          </Text>
        )}
      </Pressable>
      {baseUrl && (
        <Text className="text-xs text-gray-500 mt-2 font-mono">
          URL: {baseUrl}
        </Text>
      )}
      {result && (
        <Text className="text-xs mt-1 text-gray-700 font-mono leading-4">
          {result}
        </Text>
      )}
    </View>
  );
}
