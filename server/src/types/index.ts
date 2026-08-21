export interface IExpense {
  id: string | number;
  userId?: string;
  title: string;
  amount: number;
  category: string;
  date: string; // YYYY-MM-DD
  paymentMethod?: string;
  notes?: string;
  createdAt?: string;
}

export interface MonthlyStats {
  monthKey: string; // "YYYY-MM"
  monthName: string; // "July 2026"
  totalAmount: number;
  count: number;
  categoryBreakdown: Record<string, number>;
}

export interface CategoryForecast {
  category: string;
  predictedAmount: number;
  previousMonthAmount: number;
  percentageChange: number;
  trend: "increasing" | "decreasing" | "stable";
  historicalAverage: number;
  recommendedBudget: number;
  notes: string;
}

export interface AnomalyAlert {
  id: string;
  expenseId?: string | number;
  title: string;
  amount: number;
  category: string;
  date: string;
  zScore: number;
  severity: "high" | "medium" | "low";
  reason: string;
  suggestedAction: string;
}

export interface Recommendation {
  id: string;
  category: string;
  type: "savings" | "budget_alert" | "recurring_cost" | "positive_habit";
  title: string;
  description: string;
  potentialSavings: number;
  priority: "high" | "medium" | "low";
}

export interface MLPredictionResult {
  nextMonthKey: string;
  nextMonthName: string;
  predictedTotal: number;
  confidenceScore: number; // 0 - 100
  confidenceInterval: {
    lowerBound: number;
    upperBound: number;
  };
  trend: "increasing" | "decreasing" | "stable";
  percentageVsCurrentMonth: number;
  historicalTrend: {
    month: string;
    actual: number;
    predicted?: number;
  }[];
  categoryForecasts: CategoryForecast[];
  topDrivers: string[];
  anomalies: AnomalyAlert[];
  recommendations: Recommendation[];
  accuracyMetric: {
    rSquared: number;
    mape: number; // Mean Absolute Percentage Error
    dataPointsCount: number;
  };
}
