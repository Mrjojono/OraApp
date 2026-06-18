import { View, Text } from "react-native";
import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { CreditCard, AlertCircle } from "lucide-react-native";
import { getProgressColor } from "@/lib/utils";

import React from "react";

const ScoreFieldCard = ({
  progress,
  debtProgress,
}: {
  progress: number;
  debtProgress: number;
}) => {
  return (
    <View>
      <Card className="mt-5 rounded border bg-amber-100   border-mint-subtle ">
        <CardContent className="p-3">
          {/* Header icons */}
          <View className="flex flex-row justify-between items-center">
            <CreditCard size={26} color="#000" />
            {progress < 25 && <AlertCircle size={26} color="red" />}
          </View>

          {/* Title */}
          <Text className="text-lg mt-3 font-bold">Endettement correct</Text>

          {/* Description */}
          <Text className="text-base font-medium text-gray-700 mt-1">
            Votre endettement est sous contrôle et vos remboursements sont
            réguliers.
          </Text>

          {/* Progress */}
          <View>
            <Text className="text-lg text-right mb-1">{debtProgress}</Text>
            <Progress
              indicatorClassName={getProgressColor(debtProgress).tw}
              value={debtProgress}
            />
          </View>

          {/* Footer action */}
          <Text className="text-base mt-4 font-medium text-right text-gray-500">
            Voir plus
          </Text>
        </CardContent>
      </Card>
    </View>
  );
};

export default ScoreFieldCard;
