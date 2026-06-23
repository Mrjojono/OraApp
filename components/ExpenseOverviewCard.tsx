import { View, Text, Pressable } from "react-native";
import { ChevronRight } from "lucide-react-native";
import type {
  ExpenseCategory,
  ExpenseSummary,
  RecurringExpense,
} from "@/types/expense";

type Props = {
  summary: ExpenseSummary;
  topCategories: ExpenseCategory[];
  recurringExpenses: RecurringExpense[];
  onPressCategories: () => void;
  onPressRecurring: () => void;
};

import { tokens } from "@/lib/tokens";

const FG = tokens.onSurface;
const MFG = tokens.onSurfaceVariant;
const P = tokens.accent;

export default function ExpenseOverviewCard({
  summary,
  topCategories,
  recurringExpenses,
  onPressCategories,
  onPressRecurring,
}: Props) {
  return (
    <View
      style={{
        backgroundColor: tokens.surface,
        borderRadius: 10,
        padding: 16,
        marginTop: 16,
      }}
    >
      <Text
        style={{
          fontSize: 12,
          color: MFG,
          marginBottom: 12,
        }}
      >
        {summary.count} transactions · ⌀{" "}
        {summary.averageTransactionAmount.toLocaleString("fr-FR")} F
      </Text>

      <View
        style={{
          backgroundColor: tokens.surface,
          borderRadius: 6,
          padding: 10,
          marginBottom: 14,
        }}
      >
        <Text style={{ fontSize: 12, color: FG }}>
          Plus grande dépense :{" "}
          <Text style={{ fontWeight: "600", color: FG }}>
            {summary.largestExpense.amount.toLocaleString("fr-FR")} F
          </Text>{" "}
          ({summary.largestExpense.description})
        </Text>
      </View>

      <View style={{ marginBottom: 14 }}>
        {topCategories.slice(0, 3).map((cat) => (
          <View key={cat.category} style={{ marginBottom: 8 }}>
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                marginBottom: 4,
              }}
            >
              <Text style={{ fontSize: 12, color: FG }}>
                {cat.category.charAt(0) + cat.category.slice(1).toLowerCase()}
              </Text>
              <Text style={{ fontSize: 12, color: FG }}>
                {cat.amount.toLocaleString("fr-FR")} F · {cat.percent}%
              </Text>
            </View>
            <View
              style={{
                height: 6,
                backgroundColor: tokens.surface,
                borderRadius: 4,
                overflow: "hidden",
              }}
            >
              <View
                style={{
                  height: "100%",
                  width: `${cat.percent}%`,
                  backgroundColor:
                    cat.percent >= 50 ? P : "#9FE35D",
                  borderRadius: 4,
                }}
              />
            </View>
          </View>
        ))}
        <Pressable
          onPress={onPressCategories}
          style={({ pressed }) => ({ opacity: pressed ? 0.6 : 1 })}
        >
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "center",
              paddingVertical: 6,
              gap: 4,
            }}
          >
            <Text style={{ fontSize: 12, color: P, fontWeight: "500" }}>
              Voir toutes les catégories
            </Text>
            <ChevronRight size={14} color={P} />
          </View>
        </Pressable>
      </View>

      {recurringExpenses.length > 0 && (
        <View
          style={{
            borderTopWidth: 1,
            borderTopColor: tokens.outline,
            paddingTop: 12,
          }}
        >
          <Text
            style={{
              fontSize: 12,
              color: MFG,
              marginBottom: 8,
            }}
          >
            Récurrentes
          </Text>
          {recurringExpenses.slice(0, 2).map((exp) => (
            <View
              key={exp.description}
              style={{
                flexDirection: "row",
                alignItems: "center",
                marginBottom: 6,
              }}
            >
              <Text style={{ fontSize: 12, color: FG, flex: 1 }}>
                {exp.description}
              </Text>
              <Text style={{ fontSize: 12, fontWeight: "500", color: FG }}>
                {exp.averageAmount.toLocaleString("fr-FR")} F
              </Text>
            </View>
          ))}
          <Pressable
            onPress={onPressRecurring}
            style={({ pressed }) => ({ opacity: pressed ? 0.6 : 1 })}
          >
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "center",
                paddingVertical: 6,
                gap: 4,
              }}
            >
              <Text style={{ fontSize: 12, color: P, fontWeight: "500" }}>
                Voir les {recurringExpenses.length} dépenses récurrentes
              </Text>
              <ChevronRight size={14} color={P} />
            </View>
          </Pressable>
        </View>
      )}
    </View>
  );
}
