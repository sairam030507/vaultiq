import express, { Request, Response } from "express";
import cors from "cors";
import dotenv from "dotenv";

import expensesRouter from "./routes/expenses.routes";
import predictionRouter from "./routes/prediction.routes";
import authRouter from "./routes/auth.routes";

dotenv.config();

const app = express();

app.use(
  cors({
    origin: "*",
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

app.use(express.json());

// Root & Health check
app.get("/", (req: Request, res: Response) => {
  res.json({
    name: "VaultIQ API",
    version: "1.0.0",
    status: "online",
    description: "AI & ML-Powered Smart Expense Tracker API",
    endpoints: {
      health: "/api/health",
      expenses: "/api/expenses",
      predictions: "/api/predict/next-month",
      anomalies: "/api/predict/anomalies",
      insights: "/api/predict/insights",
      auth: "/api/auth",
    },
  });
});

app.get("/api/health", (req: Request, res: Response) => {
  res.json({ status: "healthy", timestamp: new Date().toISOString() });
});

// API Routes
app.use("/api/expenses", expensesRouter);
app.use("/api/predict", predictionRouter);
app.use("/api/auth", authRouter);

// 404 handler
app.use((req: Request, res: Response) => {
  res.status(404).json({ success: false, message: `Route ${req.originalUrl} not found` });
});

export default app;
