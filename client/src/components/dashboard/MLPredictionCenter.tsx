import { useState } from "react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
  Legend,
} from "recharts";
import {
  Sparkles,
  TrendingUp,
  TrendingDown,
  AlertTriangle,
  Lightbulb,
  Sliders,
  ShieldCheck,
  Zap,
  ArrowUpRight,
  ArrowDownRight,
  CheckCircle,
  RefreshCw,
} from "lucide-react";
import { useExpense } from "../../context/ExpenseContext";

export default function MLPredictionCenter() {
  const { predictionData, refreshPredictions, isLoading, resetToDemo } = useExpense();

  // "What-if" simulator state: category percentage adjustments
  const [sliderValues, setSliderValues] = useState<Record<string, number>>({
    Food: 0,
    Shopping: 0,
    Entertainment: 0,
    Bills: 0,
  });

  const handleSliderChange = (cat: string, val: number) => {
    setSliderValues((prev) => ({ ...prev, [cat]: val }));
  };

  const handleResetSliders = () => {
    setSliderValues({ Food: 0, Shopping: 0, Entertainment: 0, Bills: 0 });
  };

  // Compute simulated savings in real time
  const categorySimulations = predictionData.categoryForecasts.map((cat) => {
    const adjustmentPct = sliderValues[cat.category] || 0;
    const adjustedAmount = Math.max(0, Math.round(cat.predictedAmount * (1 + adjustmentPct / 100)));
    const saved = Math.max(0, cat.predictedAmount - adjustedAmount);
    return {
      ...cat,
      adjustedAmount,
      saved,
      adjustmentPct,
    };
  });

  const simulatedTotal = categorySimulations.reduce((sum, c) => sum + c.adjustedAmount, 0);
  const totalSimulatedSavings = Math.max(0, predictionData.predictedTotal - simulatedTotal);
  const percentageSimulatedSaved = predictionData.predictedTotal > 0
    ? Math.round((totalSimulatedSavings / predictionData.predictedTotal) * 100)
    : 0;

  // Chart dataset
  const chartData = predictionData.historicalTrend.map((item) => ({
    month: item.month,
    Actual: item.actual > 0 ? item.actual : null,
    Predicted: item.predicted || null,
  }));

  return (
    <div className="space-y-8 animate-fadeIn">
      {/* Top Banner / AI Header */}
      <div className="relative overflow-hidden bg-gradient-to-br from-indigo-900 via-blue-900 to-slate-900 rounded-3xl p-8 text-white shadow-2xl">
        <div className="absolute top-0 right-0 -mt-8 -mr-8 w-64 h-64 bg-blue-500/20 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-1/3 -mb-10 w-80 h-80 bg-purple-500/20 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-blue-500/20 border border-blue-400/30 text-blue-300 text-sm font-medium mb-3 backdrop-blur-md">
              <Sparkles className="w-4 h-4 text-blue-400 animate-pulse" />
              Machine Learning Predictive Model v2.4
            </div>
            <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight">
              Expense Forecast for {predictionData.nextMonthName}
            </h1>
            <p className="text-slate-300 text-base mt-2 max-w-2xl">
              Trained on your multi-month historical transaction sequences, category spending velocity, and seasonal trend regression.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={refreshPredictions}
              disabled={isLoading}
              className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white/10 hover:bg-white/20 transition backdrop-blur-md text-sm font-medium border border-white/10"
              title="Recalculate predictions"
            >
              <RefreshCw className={`w-4 h-4 ${isLoading ? "animate-spin" : ""}`} />
              Recalculate
            </button>
            <button
              onClick={resetToDemo}
              className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 transition text-sm font-semibold shadow-lg shadow-blue-600/30"
              title="Reload 6-month historical dataset"
            >
              <Zap className="w-4 h-4" />
              Load 6-Month Dataset
            </button>
          </div>
        </div>

        {/* Prediction Key Metrics Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mt-8 relative z-10">
          <div className="bg-white/10 backdrop-blur-md rounded-2xl p-5 border border-white/10">
            <div className="text-slate-300 text-xs font-semibold uppercase tracking-wider">
              Predicted Next Month
            </div>
            <div className="text-3xl font-black mt-2 text-white">
              ₹{predictionData.predictedTotal.toLocaleString()}
            </div>
            <div className="flex items-center gap-1.5 mt-2 text-xs">
              {predictionData.percentageVsCurrentMonth > 0 ? (
                <span className="flex items-center text-amber-300 font-semibold">
                  <TrendingUp className="w-3.5 h-3.5 mr-0.5" />
                  +{predictionData.percentageVsCurrentMonth}% vs this month
                </span>
              ) : predictionData.percentageVsCurrentMonth < 0 ? (
                <span className="flex items-center text-emerald-300 font-semibold">
                  <TrendingDown className="w-3.5 h-3.5 mr-0.5" />
                  {predictionData.percentageVsCurrentMonth}% vs this month
                </span>
              ) : (
                <span className="text-slate-300 font-semibold">≈ Stable trajectory</span>
              )}
            </div>
          </div>

          <div className="bg-white/10 backdrop-blur-md rounded-2xl p-5 border border-white/10">
            <div className="text-slate-300 text-xs font-semibold uppercase tracking-wider">
              Confidence Interval (90%)
            </div>
            <div className="text-2xl font-bold mt-2 text-blue-200">
              ₹{predictionData.confidenceInterval.lowerBound.toLocaleString()} – ₹{predictionData.confidenceInterval.upperBound.toLocaleString()}
            </div>
            <div className="flex items-center gap-1 text-xs text-slate-300 mt-2">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
              <span>Model Confidence: <strong>{predictionData.confidenceScore}%</strong></span>
            </div>
          </div>

          <div className="bg-white/10 backdrop-blur-md rounded-2xl p-5 border border-white/10">
            <div className="text-slate-300 text-xs font-semibold uppercase tracking-wider">
              Regression Fit (R²)
            </div>
            <div className="text-3xl font-black mt-2 text-emerald-400">
              {(predictionData.accuracyMetric.rSquared * 100).toFixed(0)}%
            </div>
            <div className="text-xs text-slate-300 mt-2">
              MAPE error rate: <strong>{predictionData.accuracyMetric.mape}%</strong> ({predictionData.accuracyMetric.dataPointsCount} data points)
            </div>
          </div>

          <div className="bg-white/10 backdrop-blur-md rounded-2xl p-5 border border-white/10">
            <div className="text-slate-300 text-xs font-semibold uppercase tracking-wider">
              Top Cost Driver
            </div>
            <div className="text-2xl font-bold mt-2 text-purple-200 truncate">
              {predictionData.topDrivers[0] || "Housing"}
            </div>
            <div className="text-xs text-slate-300 mt-2">
              Primary contributor to monthly total
            </div>
          </div>
        </div>
      </div>

      {/* Main Charts & Visualizations */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Forecast Timeline Chart */}
        <div className="lg:col-span-2 bg-white rounded-3xl p-6 shadow-sm border border-slate-200">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-6">
            <div>
              <h2 className="text-xl font-bold text-slate-900 flex items-center gap-2">
                <TrendingUp className="w-5 h-5 text-blue-600" />
                Historical Trend vs Next Month ML Projection
              </h2>
              <p className="text-sm text-slate-500">
                Continuous time-series regression blending actuals with future forecast
              </p>
            </div>
            <div className="flex items-center gap-4 text-xs font-medium">
              <span className="flex items-center gap-1.5 text-blue-600">
                <span className="w-3 h-3 rounded-full bg-blue-600"></span> Actual Spending
              </span>
              <span className="flex items-center gap-1.5 text-purple-600">
                <span className="w-3 h-3 rounded-full bg-purple-600"></span> ML Projection
              </span>
            </div>
          </div>

          <div className="h-72 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={chartData} margin={{ top: 10, right: 20, left: 10, bottom: 0 }}>
                <defs>
                  <linearGradient id="actualGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#3B82F6" stopOpacity={0.4} />
                    <stop offset="95%" stopColor="#3B82F6" stopOpacity={0.0} />
                  </linearGradient>
                  <linearGradient id="predGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#8B5CF6" stopOpacity={0.4} />
                    <stop offset="95%" stopColor="#8B5CF6" stopOpacity={0.0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E2E8F0" />
                <XAxis dataKey="month" stroke="#64748B" fontSize={12} tickLine={false} />
                <YAxis
                  stroke="#64748B"
                  fontSize={12}
                  tickLine={false}
                  tickFormatter={(val) => `₹${(val / 1000).toFixed(0)}k`}
                />
                <Tooltip
                  formatter={(val: any) => [`₹${Number(val).toLocaleString()}`, ""]}
                  contentStyle={{
                    backgroundColor: "#1E293B",
                    borderRadius: "12px",
                    color: "#fff",
                    border: "none",
                    boxShadow: "0 10px 25px -5px rgba(0,0,0,0.3)",
                  }}
                />
                <Area
                  type="monotone"
                  dataKey="Actual"
                  stroke="#3B82F6"
                  strokeWidth={3}
                  fill="url(#actualGradient)"
                />
                <Area
                  type="monotone"
                  dataKey="Predicted"
                  stroke="#8B5CF6"
                  strokeWidth={3}
                  strokeDasharray="4 4"
                  fill="url(#predGradient)"
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Category Comparison Bar Chart */}
        <div className="bg-white rounded-3xl p-6 shadow-sm border border-slate-200 flex flex-col justify-between">
          <div>
            <h2 className="text-xl font-bold text-slate-900 mb-1">Category Breakdown</h2>
            <p className="text-sm text-slate-500 mb-4">Past month vs Next month projection</p>
            <div className="h-64 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={predictionData.categoryForecasts.slice(0, 5)}
                  layout="vertical"
                  margin={{ top: 0, right: 20, left: 10, bottom: 0 }}
                >
                  <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke="#F1F5F9" />
                  <XAxis
                    type="number"
                    stroke="#94A3B8"
                    fontSize={10}
                    tickFormatter={(v) => `₹${(v / 1000).toFixed(0)}k`}
                  />
                  <YAxis type="category" dataKey="category" stroke="#475569" fontSize={11} width={75} />
                  <Tooltip
                    formatter={(val: any) => [`₹${Number(val).toLocaleString()}`, ""]}
                    contentStyle={{ backgroundColor: "#0F172A", borderRadius: "8px", color: "#fff" }}
                  />
                  <Legend wrapperStyle={{ fontSize: "11px" }} />
                  <Bar dataKey="previousMonthAmount" name="Last Month" fill="#94A3B8" radius={[0, 4, 4, 0]} />
                  <Bar dataKey="predictedAmount" name="Predicted" fill="#3B82F6" radius={[0, 4, 4, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      </div>

      {/* Category-Wise Forecast Cards */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 className="text-2xl font-bold text-slate-900">Per-Category ML Projections</h2>
            <p className="text-sm text-slate-500">
              Detailed predictions, trajectory momentum, and recommended budget caps for {predictionData.nextMonthName}
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {predictionData.categoryForecasts.map((cat) => {
            const isSpike = cat.trend === "increasing";
            const isDrop = cat.trend === "decreasing";

            return (
              <div
                key={cat.category}
                className="bg-white rounded-2xl p-6 shadow-sm border border-slate-200 hover:shadow-md transition duration-200 flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-lg text-slate-900">{cat.category}</span>
                    <span
                      className={`inline-flex items-center gap-1 text-xs font-semibold px-2.5 py-1 rounded-full ${
                        isSpike
                          ? "bg-amber-100 text-amber-800"
                          : isDrop
                          ? "bg-emerald-100 text-emerald-800"
                          : "bg-slate-100 text-slate-700"
                      }`}
                    >
                      {isSpike ? (
                        <>
                          <ArrowUpRight className="w-3.5 h-3.5" /> +{cat.percentageChange}%
                        </>
                      ) : isDrop ? (
                        <>
                          <ArrowDownRight className="w-3.5 h-3.5" /> {cat.percentageChange}%
                        </>
                      ) : (
                        "Stable"
                      )}
                    </span>
                  </div>

                  <div className="mt-4">
                    <div className="text-3xl font-black text-slate-900">
                      ₹{cat.predictedAmount.toLocaleString()}
                    </div>
                    <div className="text-xs text-slate-500 mt-1 flex items-center justify-between">
                      <span>Prev Month: ₹{cat.previousMonthAmount.toLocaleString()}</span>
                      <span>Hist Avg: ₹{cat.historicalAverage.toLocaleString()}</span>
                    </div>
                  </div>

                  <p className="text-xs text-slate-600 mt-4 bg-slate-50 p-3 rounded-xl border border-slate-100">
                    💡 {cat.notes}
                  </p>
                </div>

                <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
                  <span className="text-slate-500">Suggested Budget Cap:</span>
                  <span className="font-bold text-blue-600 bg-blue-50 px-2 py-0.5 rounded">
                    ₹{cat.recommendedBudget.toLocaleString()}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* "What-If" Scenario Simulator */}
      <div className="bg-gradient-to-br from-slate-900 to-slate-800 rounded-3xl p-8 text-white shadow-xl">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-500/20 text-purple-300 text-xs font-semibold mb-2">
              <Sliders className="w-3.5 h-3.5" />
              Interactive Scenario Lab
            </div>
            <h2 className="text-2xl font-bold">"What-If" Expense Simulator</h2>
            <p className="text-slate-300 text-sm mt-1">
              Adjust category spending sliders to simulate how lifestyle cuts immediately impact your next month's total & savings.
            </p>
          </div>

          <button
            onClick={handleResetSliders}
            className="text-xs text-slate-300 hover:text-white px-3 py-1.5 rounded-lg bg-white/10 hover:bg-white/20 transition self-start md:self-auto"
          >
            Reset Sliders
          </button>
        </div>

        {/* Sliders */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-6">
          {["Food", "Shopping", "Entertainment", "Bills"].map((cat) => {
            const val = sliderValues[cat] || 0;
            const original = predictionData.categoryForecasts.find((c) => c.category === cat)?.predictedAmount || 0;
            const adjusted = Math.max(0, Math.round(original * (1 + val / 100)));

            return (
              <div key={cat} className="bg-white/5 border border-white/10 rounded-2xl p-5 backdrop-blur-sm">
                <div className="flex justify-between items-center mb-2">
                  <span className="font-semibold text-sm">{cat}</span>
                  <span
                    className={`text-xs font-bold px-2 py-0.5 rounded ${
                      val < 0 ? "bg-emerald-500/30 text-emerald-300" : val > 0 ? "bg-amber-500/30 text-amber-300" : "bg-slate-700 text-slate-300"
                    }`}
                  >
                    {val > 0 ? `+${val}%` : `${val}%`}
                  </span>
                </div>

                <input
                  type="range"
                  min="-50"
                  max="50"
                  step="5"
                  value={val}
                  onChange={(e) => handleSliderChange(cat, Number(e.target.value))}
                  className="w-full h-2 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-blue-500 mt-2"
                />

                <div className="flex justify-between items-center mt-3 text-xs text-slate-400">
                  <span>₹{original.toLocaleString()}</span>
                  <span className="text-white font-bold">→ ₹{adjusted.toLocaleString()}</span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Simulator Impact Summary */}
        <div className="mt-8 bg-white/10 border border-white/10 rounded-2xl p-6 flex flex-col md:flex-row items-center justify-between gap-6">
          <div>
            <div className="text-xs font-semibold text-slate-300 uppercase tracking-wider">
              Simulated Next Month Total
            </div>
            <div className="text-3xl font-black text-white mt-1">
              ₹{simulatedTotal.toLocaleString()}
            </div>
            <div className="text-xs text-slate-300 mt-1">
              Original prediction: ₹{predictionData.predictedTotal.toLocaleString()}
            </div>
          </div>

          <div className="flex items-center gap-6 text-center md:text-right">
            <div>
              <div className="text-xs font-semibold text-emerald-300 uppercase tracking-wider">
                Projected Monthly Savings
              </div>
              <div className="text-3xl font-black text-emerald-400 mt-1">
                +₹{totalSimulatedSavings.toLocaleString()}
              </div>
              <div className="text-xs text-emerald-200 mt-1">
                {percentageSimulatedSaved}% total reduction
              </div>
            </div>

            <div className="hidden sm:block border-l border-white/10 pl-6 text-left">
              <div className="text-xs text-slate-300">Annualized Savings:</div>
              <div className="text-xl font-bold text-amber-300 mt-0.5">
                ₹{(totalSimulatedSavings * 12).toLocaleString()} / yr
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Anomalies & AI Recommendations Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* AI Recommendations */}
        <div className="bg-white rounded-3xl p-6 shadow-sm border border-slate-200">
          <div className="flex items-center gap-2 mb-4">
            <Lightbulb className="w-5 h-5 text-amber-500" />
            <h2 className="text-xl font-bold text-slate-900">AI Financial Coach & Savings Rules</h2>
          </div>
          <p className="text-sm text-slate-500 mb-6">
            Actionable optimization suggestions generated from your spending statistics
          </p>

          <div className="space-y-4">
            {predictionData.recommendations.map((rec) => (
              <div
                key={rec.id}
                className="p-4 rounded-2xl border border-slate-100 bg-slate-50 hover:bg-blue-50/50 hover:border-blue-200 transition"
              >
                <div className="flex items-center justify-between mb-1.5">
                  <span className="font-bold text-slate-900 text-sm">{rec.title}</span>
                  {rec.potentialSavings > 0 && (
                    <span className="text-xs font-bold text-emerald-700 bg-emerald-100 px-2.5 py-0.5 rounded-full">
                      Save ~₹{rec.potentialSavings.toLocaleString()}
                    </span>
                  )}
                </div>
                <p className="text-xs text-slate-600 leading-relaxed">{rec.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Anomaly Detection Alerts */}
        <div className="bg-white rounded-3xl p-6 shadow-sm border border-slate-200">
          <div className="flex items-center gap-2 mb-4">
            <AlertTriangle className="w-5 h-5 text-red-500" />
            <h2 className="text-xl font-bold text-slate-900">Spending Anomaly Detection</h2>
          </div>
          <p className="text-sm text-slate-500 mb-6">
            Transactions identified as statistical outliers (Z-Score &gt; 2.0σ)
          </p>

          {predictionData.anomalies.length === 0 ? (
            <div className="p-8 text-center bg-slate-50 rounded-2xl border border-dashed border-slate-200">
              <CheckCircle className="w-10 h-10 text-emerald-500 mx-auto mb-2" />
              <h3 className="font-bold text-slate-800 text-sm">No Abnormal Spikes Detected</h3>
              <p className="text-xs text-slate-500 mt-1">
                All recent transactions fall within normal statistical variance intervals.
              </p>
            </div>
          ) : (
            <div className="space-y-4">
              {predictionData.anomalies.map((anom) => (
                <div
                  key={anom.id}
                  className="p-4 rounded-2xl border border-red-100 bg-red-50/40 flex flex-col justify-between"
                >
                  <div className="flex items-center justify-between mb-1">
                    <span className="font-bold text-slate-900 text-sm">{anom.title}</span>
                    <span className="font-black text-red-600 text-sm">
                      ₹{anom.amount.toLocaleString()}
                    </span>
                  </div>
                  <p className="text-xs text-slate-600 mt-1">{anom.reason}</p>
                  <div className="mt-3 pt-2 border-t border-red-100/60 flex items-center justify-between text-xs text-slate-500">
                    <span>{anom.category} • {anom.date}</span>
                    <span className="text-red-700 font-semibold">{anom.suggestedAction}</span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
