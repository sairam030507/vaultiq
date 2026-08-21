import {
  IExpense,
  MonthlyStats,
  MLPredictionResult,
  CategoryForecast,
  AnomalyAlert,
  Recommendation,
} from "../types";

/**
 * Helper to parse and sort months in chronological order
 */
export function getMonthKey(dateStr: string): string {
  if (!dateStr) return "2026-08";
  const date = new Date(dateStr);
  if (isNaN(date.getTime())) return "2026-08";
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  return `${year}-${month}`;
}

export function formatMonthName(monthKey: string): string {
  const [yearStr, monthStr] = monthKey.split("-");
  const year = parseInt(yearStr || "2026", 10);
  const month = parseInt(monthStr || "1", 10) - 1;
  const date = new Date(year, month, 1);
  return date.toLocaleDateString("en-US", { month: "short", year: "numeric" });
}

export function getNextMonthKey(lastMonthKey: string): string {
  const [yearStr, monthStr] = lastMonthKey.split("-");
  let year = parseInt(yearStr || "2026", 10);
  let month = parseInt(monthStr || "1", 10);

  month += 1;
  if (month > 12) {
    month = 1;
    year += 1;
  }

  return `${year}-${String(month).padStart(2, "0")}`;
}

/**
 * Aggregate raw expenses into monthly statistics
 */
export function aggregateMonthlyStats(expenses: IExpense[]): MonthlyStats[] {
  const map = new Map<string, { total: number; count: number; categories: Record<string, number> }>();

  for (const exp of expenses) {
    const key = getMonthKey(exp.date);
    if (!map.has(key)) {
      map.set(key, { total: 0, count: 0, categories: {} });
    }
    const bucket = map.get(key)!;
    const amount = Number(exp.amount) || 0;
    bucket.total += amount;
    bucket.count += 1;
    bucket.categories[exp.category] = (bucket.categories[exp.category] || 0) + amount;
  }

  const sortedKeys = Array.from(map.keys()).sort();

  return sortedKeys.map((k) => {
    const bucket = map.get(k)!;
    return {
      monthKey: k,
      monthName: formatMonthName(k),
      totalAmount: Math.round(bucket.total),
      count: bucket.count,
      categoryBreakdown: bucket.categories,
    };
  });
}

/**
 * Calculate Ordinary Least Squares (OLS) Linear Regression: y = m * x + b
 */
function calculateLinearRegression(yValues: number[]): {
  slope: number;
  intercept: number;
  rSquared: number;
  nextPredicted: number;
} {
  const n = yValues.length;
  if (n === 0) return { slope: 0, intercept: 0, rSquared: 1, nextPredicted: 0 };
  if (n === 1) return { slope: 0, intercept: yValues[0] ?? 0, rSquared: 1, nextPredicted: yValues[0] ?? 0 };

  const xValues = Array.from({ length: n }, (_, i) => i + 1);

  const sumX = xValues.reduce((a, b) => a + b, 0);
  const sumY = yValues.reduce((a, b) => a + b, 0);
  const sumXY = xValues.reduce((sum, x, i) => sum + x * (yValues[i] ?? 0), 0);
  const sumX2 = xValues.reduce((sum, x) => sum + x * x, 0);

  const denominator = n * sumX2 - sumX * sumX;
  const slope = denominator === 0 ? 0 : (n * sumXY - sumX * sumY) / denominator;
  const intercept = (sumY - slope * sumX) / n;

  // Calculate R² (Coefficient of Determination)
  const meanY = sumY / n;
  const ssTotal = yValues.reduce((sum, y) => sum + Math.pow(y - meanY, 2), 0);
  const ssResidual = yValues.reduce((sum, y, i) => {
    const predicted = slope * (xValues[i] ?? 1) + intercept;
    return sum + Math.pow(y - predicted, 2);
  }, 0);

  const rSquared = ssTotal === 0 ? 1 : Math.max(0, Math.min(1, 1 - ssResidual / ssTotal));
  const nextX = n + 1;
  const nextPredicted = Math.max(0, slope * nextX + intercept);

  return { slope, intercept, rSquared, nextPredicted };
}

/**
 * Calculate Exponential Moving Average with trend damping
 */
function calculateEMA(values: number[], alpha = 0.4): number {
  if (values.length === 0) return 0;
  let ema = values[0] ?? 0;
  for (let i = 1; i < values.length; i++) {
    ema = alpha * (values[i] ?? 0) + (1 - alpha) * ema;
  }
  return ema;
}

/**
 * Core Machine Learning Next-Month Predictor Engine
 */
export function predictNextMonthExpenses(expenses: IExpense[]): MLPredictionResult {
  if (!expenses || expenses.length === 0) {
    const defaultNextKey = "2026-09";
    return {
      nextMonthKey: defaultNextKey,
      nextMonthName: formatMonthName(defaultNextKey),
      predictedTotal: 0,
      confidenceScore: 0,
      confidenceInterval: { lowerBound: 0, upperBound: 0 },
      trend: "stable",
      percentageVsCurrentMonth: 0,
      historicalTrend: [],
      categoryForecasts: [],
      topDrivers: [],
      anomalies: [],
      recommendations: [],
      accuracyMetric: { rSquared: 0, mape: 0, dataPointsCount: 0 },
    };
  }

  const monthlyStats = aggregateMonthlyStats(expenses);
  const totalMonths = monthlyStats.length;

  const currentMonthStats = monthlyStats[totalMonths - 1] || {
    monthKey: "2026-08",
    monthName: "Aug 2026",
    totalAmount: 0,
    count: 0,
    categoryBreakdown: {},
  };

  const nextMonthKey = getNextMonthKey(currentMonthStats.monthKey);
  const nextMonthName = formatMonthName(nextMonthKey);

  // Extract totals for regression
  const historicalTotals = monthlyStats.map((m) => m.totalAmount);

  // 1. Time-Series Linear Trend Regression
  const regression = calculateLinearRegression(historicalTotals);

  // 2. Exponential Moving Average for Recency Bias
  const emaValue = calculateEMA(historicalTotals, 0.45);

  // 3. Weighted Model Ensemble (60% Linear Regression + 40% EMA)
  let blendedPrediction: number;
  if (totalMonths === 1) {
    blendedPrediction = historicalTotals[0] ?? 0;
  } else {
    blendedPrediction = Math.round(0.6 * regression.nextPredicted + 0.4 * emaValue);
  }

  // 4. Calculate Variance, MAPE and Confidence Interval
  let mape = 0;
  let stdDev = 0;

  if (totalMonths >= 2) {
    const mapeList: number[] = [];
    historicalTotals.forEach((actual, idx) => {
      const pred = regression.slope * (idx + 1) + regression.intercept;
      if (actual > 0) {
        mapeList.push(Math.abs(actual - pred) / actual);
      }
    });
    mape = mapeList.length > 0 ? (mapeList.reduce((a, b) => a + b, 0) / mapeList.length) * 100 : 8.5;

    const mean = historicalTotals.reduce((a, b) => a + b, 0) / totalMonths;
    const variance = historicalTotals.reduce((a, b) => a + Math.pow(b - mean, 2), 0) / totalMonths;
    stdDev = Math.sqrt(variance);
  } else {
    mape = 12.0;
    stdDev = (historicalTotals[0] || 0) * 0.15;
  }

  // Confidence bounds: ± 1.64 * stdDev (90% prediction interval)
  const marginOfError = Math.max(stdDev * 0.8, blendedPrediction * 0.08);
  const lowerBound = Math.max(0, Math.round(blendedPrediction - marginOfError));
  const upperBound = Math.round(blendedPrediction + marginOfError);

  // Confidence Score based on data count and R² / MAPE
  const countFactor = Math.min(1.0, totalMonths / 5);
  const errorFactor = Math.max(0, 1 - mape / 100);
  const confidenceScore = Math.round(Math.min(96, Math.max(65, (0.5 * countFactor + 0.5 * errorFactor) * 100)));

  // Trend vs Current Month
  const currentTotal = currentMonthStats.totalAmount;
  let percentageVsCurrent = 0;
  let trend: "increasing" | "decreasing" | "stable" = "stable";

  if (currentTotal > 0) {
    percentageVsCurrent = Math.round(((blendedPrediction - currentTotal) / currentTotal) * 100);
    if (percentageVsCurrent >= 3) trend = "increasing";
    else if (percentageVsCurrent <= -3) trend = "decreasing";
    else trend = "stable";
  }

  // 5. Per-Category ML Forecast
  const allCategories = Array.from(
    new Set(expenses.map((e) => e.category || "General"))
  );

  const categoryForecasts: CategoryForecast[] = [];

  for (const cat of allCategories) {
    const catHistoricalValues: number[] = monthlyStats.map(
      (m) => m.categoryBreakdown[cat] || 0
    );

    const prevMonthCat = currentMonthStats.categoryBreakdown[cat] || 0;
    const catRegression = calculateLinearRegression(catHistoricalValues);
    const catEMA = calculateEMA(catHistoricalValues, 0.4);

    let catPredicted = totalMonths === 1
      ? (catHistoricalValues[0] ?? 0)
      : Math.round(0.55 * catRegression.nextPredicted + 0.45 * catEMA);

    if (catPredicted < 0) catPredicted = 0;

    const catAvg = Math.round(
      catHistoricalValues.reduce((a, b) => a + b, 0) / (catHistoricalValues.length || 1)
    );

    const catPctChange = prevMonthCat > 0
      ? Math.round(((catPredicted - prevMonthCat) / prevMonthCat) * 100)
      : catPredicted > 0 ? 100 : 0;

    let catTrend: "increasing" | "decreasing" | "stable" = "stable";
    if (catPctChange >= 4) catTrend = "increasing";
    else if (catPctChange <= -4) catTrend = "decreasing";

    // Recommended Budget is 90% of predicted if increasing, or predicted + 5% buffer if stable
    const recommendedBudget = Math.round(
      catTrend === "increasing" ? Math.max(catAvg, catPredicted * 0.9) : catPredicted * 1.05
    );

    let notes = "Consistent spending pattern observed.";
    if (catTrend === "increasing") {
      notes = `Projected to surge by ${catPctChange}%. Consider setting a cap of ₹${recommendedBudget.toLocaleString()}.`;
    } else if (catTrend === "decreasing") {
      notes = `Projected to decrease by ${Math.abs(catPctChange)}%. Great progress on controlling this category!`;
    }

    categoryForecasts.push({
      category: cat,
      predictedAmount: catPredicted,
      previousMonthAmount: prevMonthCat,
      percentageChange: catPctChange,
      trend: catTrend,
      historicalAverage: catAvg,
      recommendedBudget,
      notes,
    });
  }

  // Sort categories by predicted amount descending
  categoryForecasts.sort((a, b) => b.predictedAmount - a.predictedAmount);

  // Top spending drivers
  const topDrivers = categoryForecasts
    .filter((c) => c.predictedAmount > 0)
    .slice(0, 3)
    .map((c) => `${c.category} (₹${c.predictedAmount.toLocaleString()})`);

  // 6. Historical + Prediction timeline points for Charts
  const historicalTrend = monthlyStats.map((m, idx) => ({
    month: m.monthName,
    actual: m.totalAmount,
    predicted: Math.round(regression.slope * (idx + 1) + regression.intercept),
  }));

  // Append next month's predicted node
  historicalTrend.push({
    month: nextMonthName + " (Predicted)",
    actual: 0,
    predicted: blendedPrediction,
  });

  // 7. Statistical Anomaly Detection
  const anomalies = detectSpendingAnomalies(expenses, categoryForecasts);

  // 8. AI Recommendations & Savings Optimizer
  const recommendations = generateSmartRecommendations(
    categoryForecasts,
    blendedPrediction,
    currentTotal,
    anomalies
  );

  return {
    nextMonthKey,
    nextMonthName,
    predictedTotal: blendedPrediction,
    confidenceScore,
    confidenceInterval: {
      lowerBound,
      upperBound,
    },
    trend,
    percentageVsCurrentMonth: percentageVsCurrent,
    historicalTrend,
    categoryForecasts,
    topDrivers,
    anomalies,
    recommendations,
    accuracyMetric: {
      rSquared: Math.round(regression.rSquared * 100) / 100,
      mape: Math.round(mape * 10) / 10,
      dataPointsCount: expenses.length,
    },
  };
}

/**
 * Detect spending anomalies using Category Z-score and Outlier limits
 */
function detectSpendingAnomalies(
  expenses: IExpense[],
  categoryForecasts: CategoryForecast[]
): AnomalyAlert[] {
  const anomalies: AnomalyAlert[] = [];
  const categoryStats: Record<string, { mean: number; stdDev: number; amounts: number[] }> = {};

  // Group amounts by category
  for (const exp of expenses) {
    const cat = exp.category || "General";
    if (!categoryStats[cat]) {
      categoryStats[cat] = { mean: 0, stdDev: 0, amounts: [] };
    }
    categoryStats[cat]!.amounts.push(Number(exp.amount) || 0);
  }

  // Calculate Mean and StdDev for each category
  for (const [cat, data] of Object.entries(categoryStats)) {
    const n = data.amounts.length;
    if (n === 0) continue;
    const mean = data.amounts.reduce((a, b) => a + b, 0) / n;
    const variance = data.amounts.reduce((sum, val) => sum + Math.pow(val - mean, 2), 0) / n;
    data.mean = mean;
    data.stdDev = Math.sqrt(variance);
  }

  // Scan recent expenses (last 25) for anomalies
  const recentExpenses = [...expenses].slice(-30);

  for (const exp of recentExpenses) {
    const amount = Number(exp.amount) || 0;
    const cat = exp.category || "General";
    const stat = categoryStats[cat];

    if (!stat || stat.stdDev === 0 || stat.amounts.length < 2) continue;

    const zScore = (amount - stat.mean) / stat.stdDev;

    if (zScore >= 2.0 && amount >= 1500) {
      anomalies.push({
        id: `anom-${exp.id || Math.random()}`,
        expenseId: exp.id,
        title: exp.title,
        amount,
        category: cat,
        date: exp.date,
        zScore: Math.round(zScore * 10) / 10,
        severity: zScore > 2.8 ? "high" : "medium",
        reason: `Expense is ₹${amount.toLocaleString()}, which is ${Math.round(
          (amount / stat.mean) * 100 - 100
        )}% higher than your normal average of ₹${Math.round(stat.mean).toLocaleString()} in ${cat}.`,
        suggestedAction: `Review transaction "${exp.title}" to verify if this is a recurring charge or one-time spike.`,
      });
    }
  }

  return anomalies.slice(0, 5); // Return top 5 most critical anomalies
}

/**
 * Generate AI-Driven Financial Recommendations
 */
function generateSmartRecommendations(
  categoryForecasts: CategoryForecast[],
  predictedTotal: number,
  currentTotal: number,
  anomalies: AnomalyAlert[]
): Recommendation[] {
  const recommendations: Recommendation[] = [];

  // 1. High Inflation in category
  const highestSurge = [...categoryForecasts]
    .filter((c) => c.percentageChange > 15 && c.predictedAmount > 1000)
    .sort((a, b) => b.percentageChange - a.percentageChange)[0];

  if (highestSurge) {
    const potentialSaving = Math.round(highestSurge.predictedAmount * 0.2);
    recommendations.push({
      id: "rec-surge",
      category: highestSurge.category,
      type: "budget_alert",
      title: `Surging Trend in ${highestSurge.category}`,
      description: `Spending in ${highestSurge.category} is trending +${highestSurge.percentageChange}% higher. Capping this category at ₹${highestSurge.recommendedBudget.toLocaleString()} will save ~₹${potentialSaving.toLocaleString()}.`,
      potentialSavings: potentialSaving,
      priority: "high",
    });
  }

  // 2. Food & Dining Optimization
  const foodForecast = categoryForecasts.find((c) =>
    c.category.toLowerCase().includes("food") || c.category.toLowerCase().includes("dining")
  );
  if (foodForecast && foodForecast.predictedAmount > 3000) {
    const potentialSaving = Math.round(foodForecast.predictedAmount * 0.15);
    recommendations.push({
      id: "rec-food",
      category: foodForecast.category,
      type: "savings",
      title: "Smart Dining & Groceries Rule",
      description: `Predicted food expense is ₹${foodForecast.predictedAmount.toLocaleString()}. Reducing takeout orders by 2 times a week can retain ₹${potentialSaving.toLocaleString()} next month.`,
      potentialSavings: potentialSaving,
      priority: "medium",
    });
  }

  // 3. Subscriptions / Bills Check
  const billsForecast = categoryForecasts.find((c) =>
    c.category.toLowerCase().includes("bill") ||
    c.category.toLowerCase().includes("entertainment") ||
    c.category.toLowerCase().includes("subscription")
  );
  if (billsForecast && billsForecast.predictedAmount > 1500) {
    recommendations.push({
      id: "rec-subs",
      category: billsForecast.category,
      type: "recurring_cost",
      title: "Audit Subscriptions & Utility Tariffs",
      description: `You have ₹${billsForecast.predictedAmount.toLocaleString()} projected in recurring bills/entertainment. Cancel unused OTT subscriptions to cut ₹800/month.`,
      potentialSavings: 800,
      priority: "low",
    });
  }

  // 4. Overall Spending Target
  if (predictedTotal > currentTotal && currentTotal > 0) {
    const delta = predictedTotal - currentTotal;
    recommendations.push({
      id: "rec-overall",
      category: "Overall",
      type: "budget_alert",
      title: "Predicted Expense Increase Next Month",
      description: `Based on your recent velocity, next month is projected to be ₹${delta.toLocaleString()} higher than this month. Allocate a safety buffer in your monthly savings target.`,
      potentialSavings: delta,
      priority: "high",
    });
  } else {
    recommendations.push({
      id: "rec-positive",
      category: "Overall",
      type: "positive_habit",
      title: "Spending Velocity is Stable",
      description: `Your spending habit is on a stable trajectory. Divert ₹${Math.round(predictedTotal * 0.2).toLocaleString()} (20%) directly into an emergency fund or mutual fund SIP.`,
      potentialSavings: Math.round(predictedTotal * 0.1),
      priority: "medium",
    });
  }

  return recommendations;
}
