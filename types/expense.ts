export interface ExpenseCategory {
  category: string;
  amount: number;
  percent: number;
  count: number;
}

export interface LargestExpense {
  amount: number;
  description: string;
  date: string;
}

export interface ExpenseSummary {
  totalExpenses: number;
  count: number;
  averageTransactionAmount: number;
  largestExpense: LargestExpense;
}

export interface RecurringExpense {
  description: string;
  averageAmount: number;
  frequency: string;
  occurrences: number;
  nextExpectedDate: string;
  category: string;
}

export interface RecurringData {
  recurringExpenses: RecurringExpense[];
  totalRecurringAmount: number;
  totalRecurringCount: number;
}

export interface VariableTransaction {
  description: string;
  amount: number;
  date: string;
}

export interface ExpenseSplitData {
  totalExpenses: number;
  recurringExpenses: number;
  variableExpenses: number;
  variablePercent: number;
  variableTransactions: VariableTransaction[];
}
