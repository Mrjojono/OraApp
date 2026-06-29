import React from "react";
import { View, Text, Pressable } from "react-native";
import {
  Home,
  Car,
  Heart,
  BookOpen,
  Wrench,
  MoreHorizontal,
  ChevronRight,
  UtensilsCrossed,
  Gamepad2,
} from "lucide-react-native";
import type { RecurringExpense } from "@/types/expense";

import { tokens } from "@/lib/tokens";

const P = tokens.accent;
const FG = tokens.onSurface;
const MFG = tokens.onSurfaceVariant;
const ACCENT = tokens.surface;

const categoryIcons: Record<string, { icon: React.ReactNode; bg: string }> = {
  LOGEMENT: { icon: <Home size={16} color={P} />, bg: ACCENT },
  NOURRITURE: { icon: <UtensilsCrossed size={16} color={P} />, bg: ACCENT },
  TRANSPORT: { icon: <Car size={16} color={P} />, bg: ACCENT },
  LOISIRS: { icon: <Gamepad2 size={16} color={P} />, bg: ACCENT },
  SANTE: { icon: <Heart size={16} color={P} />, bg: ACCENT },
  EDUCATION: { icon: <BookOpen size={16} color={P} />, bg: ACCENT },
  SERVICES: { icon: <Wrench size={16} color={P} />, bg: ACCENT },
  AUTRES: { icon: <MoreHorizontal size={16} color={P} />, bg: ACCENT },
};

const frequencyLabels: Record<string, string> = {
  MONTHLY: "Mensuel",
  WEEKLY: "Hebdo",
  YEARLY: "Annuel",
  DAILY: "Quotidien",
};

type Props = {
  recurringExpenses: RecurringExpense[];
  totalRecurringAmount: number;
  totalRecurringCount: number;
  onPress?: (expense: RecurringExpense) => void;
};

export default function RecurringExpensesCard({
  recurringExpenses,
  totalRecurringAmount,
  totalRecurringCount,
  onPress,
}: Props) {
  if (recurringExpenses.length === 0) {
    return null;
  }

  return (
    <View style={{ marginTop: 0 }}>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: 14,
        }}
      >
        <Text style={{ fontSize: 15, fontWeight: "500", color: FG }}>
          Dépenses récurrentes
        </Text>
        <Text style={{ fontSize: 12, color: MFG }}>
          {totalRecurringAmount.toLocaleString("fr-FR")} F
        </Text>
      </View>

      {recurringExpenses.map((exp) => {
        const icon = categoryIcons[exp.category] ?? categoryIcons.AUTRES;
        const freq = frequencyLabels[exp.frequency] ?? exp.frequency;

        return (
          <Pressable
            key={exp.description}
            onPress={() => onPress?.(exp)}
            disabled={!onPress}
            style={({ pressed }) => ({
              opacity: pressed ? 0.7 : 1,
            })}
          >
            <View
              style={{
                padding: 10,
                borderBottomWidth: 0,
              }}
            >
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                }}
              >
                <View
                  style={{
                    width: 35,
                    height: 35,
                    borderRadius: 5,
                    backgroundColor: icon.bg,
                    alignItems: "center",
                    justifyContent: "center",
                    marginRight: 10,
                  }}
                >
                  {icon.icon}
                </View>

                <View style={{ flex: 1 }}>
                  <View
                    style={{
                      flexDirection: "row",
                      alignItems: "center",
                      gap: 6,
                    }}
                  >
                    <Text
                      style={{
                        fontSize: 13,
                        fontWeight: "500",
                        color: FG,
                      }}
                    >
                      {exp.description}
                    </Text>
                    <View
                      style={{
                        backgroundColor: ACCENT,
                        borderRadius: 3,
                        paddingHorizontal: 7,
                        paddingVertical: 2,
                      }}
                    >
                      <Text style={{ fontSize: 10, color: P }}>{freq}</Text>
                    </View>
                  </View>
                  <Text style={{ fontSize: 11, color: MFG, marginTop: 1 }}>
                    {exp.averageAmount.toLocaleString("fr-FR")} F ·{" "}
                    {exp.occurrences} occurrence
                    {exp.occurrences > 1 ? "s" : ""} · Prochaine :{" "}
                    {new Date(exp.nextExpectedDate).toLocaleDateString(
                      "fr-FR",
                      {
                        day: "numeric",
                        month: "short",
                      },
                    )}
                  </Text>
                </View>

                {onPress && <ChevronRight size={14} color={MFG} />}
              </View>
            </View>
          </Pressable>
        );
      })}
    </View>
  );
}
