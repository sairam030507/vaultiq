import { Request, Response } from "express";
import { db } from "../storage/db";
import { predictNextMonthExpenses } from "../services/mlPredictor";
import { IExpense } from "../types";

export const getNextMonthPrediction = (req: Request, res: Response): void => {
  try {
    const expenses = db.getAll();
    const predictionResult = predictNextMonthExpenses(expenses);

    res.json({
      success: true,
      data: predictionResult,
    });
  } catch (error) {
    console.error("[Prediction Error]", error);
    res.status(500).json({
      success: false,
      message: "Error computing machine learning predictions",
      error,
    });
  }
};

export const getSpendingAnomalies = (req: Request, res: Response): void => {
  try {
    const expenses = db.getAll();
    const predictionResult = predictNextMonthExpenses(expenses);

    res.json({
      success: true,
      count: predictionResult.anomalies.length,
      data: predictionResult.anomalies,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error detecting anomalies",
      error,
    });
  }
};

export const getAIInsights = (req: Request, res: Response): void => {
  try {
    const expenses = db.getAll();
    const predictionResult = predictNextMonthExpenses(expenses);

    res.json({
      success: true,
      data: {
        recommendations: predictionResult.recommendations,
        topDrivers: predictionResult.topDrivers,
        trend: predictionResult.trend,
        categoryForecasts: predictionResult.categoryForecasts,
      },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error fetching AI insights",
      error,
    });
  }
};

export const simulateBudgetAdjustment = (req: Request, res: Response): void => {
  try {
    const { adjustments } = req.body; // { "Food": -15, "Shopping": -20 } (percentage shifts)
    const expenses = db.getAll();
    const basePrediction = predictNextMonthExpenses(expenses);

    if (!adjustments || typeof adjustments !== "object") {
      res.status(400).json({ success: false, message: "Adjustments map is required" });
      return;
    }

    let simulatedTotal = 0;
    const simulatedCategories = basePrediction.categoryForecasts.map((cat) => {
      const adjustmentPct = Number(adjustments[cat.category]) || 0; // e.g. -20
      const adjustedAmount = Math.max(0, Math.round(cat.predictedAmount * (1 + adjustmentPct / 100)));
      simulatedTotal += adjustedAmount;
      return {
        category: cat.category,
        originalPredicted: cat.predictedAmount,
        simulatedPredicted: adjustedAmount,
        adjustmentPct,
        savedAmount: Math.max(0, cat.predictedAmount - adjustedAmount),
      };
    });

    const totalSavings = Math.max(0, basePrediction.predictedTotal - simulatedTotal);

    res.json({
      success: true,
      data: {
        originalTotal: basePrediction.predictedTotal,
        simulatedTotal,
        totalSavings,
        percentageSaved: basePrediction.predictedTotal > 0
          ? Math.round((totalSavings / basePrediction.predictedTotal) * 100)
          : 0,
        categories: simulatedCategories,
      },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error running what-if simulation",
      error,
    });
  }
};
