import { Sparkles, TrendingUp, TrendingDown, ArrowRight } from "lucide-react";
import { useExpense } from "../../context/ExpenseContext";

export default function AIInsights() {
  const { predictionData, setActiveTab } = useExpense();

  return (
    <div className="bg-gradient-to-br from-indigo-900 via-slate-900 to-slate-900 rounded-3xl p-6 text-white shadow-xl mt-8">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-blue-500/20 border border-blue-400/30 flex items-center justify-center">
            <Sparkles className="w-5 h-5 text-blue-400 animate-pulse" />
          </div>
          <div>
            <h2 className="text-xl font-bold">AI Expense Predictor & Insights</h2>
            <p className="text-xs text-slate-300">
              Next month projection powered by multi-factor machine learning regression
            </p>
          </div>
        </div>

        <button
          onClick={() => setActiveTab("ai-predictor")}
          className="inline-flex items-center gap-1.5 text-xs font-semibold px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-500 transition text-white shadow-lg shadow-blue-600/30 self-start sm:self-auto"
        >
          Open ML Studio <ArrowRight className="w-3.5 h-3.5" />
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white/10 backdrop-blur-md rounded-2xl p-4 border border-white/10">
          <div className="text-slate-300 text-xs font-medium">
            {predictionData.nextMonthName} Forecast
          </div>
          <div className="text-2xl font-black mt-1 text-white">
            ₹{predictionData.predictedTotal.toLocaleString()}
          </div>
          <div className="text-xs text-slate-300 mt-2 flex items-center gap-1">
            {predictionData.percentageVsCurrentMonth > 0 ? (
              <span className="text-amber-300 font-semibold flex items-center">
                <TrendingUp className="w-3 h-3 mr-0.5" /> +{predictionData.percentageVsCurrentMonth}%
              </span>
            ) : (
              <span className="text-emerald-300 font-semibold flex items-center">
                <TrendingDown className="w-3 h-3 mr-0.5" /> {predictionData.percentageVsCurrentMonth}%
              </span>
            )}
            <span>vs current month</span>
          </div>
        </div>

        <div className="bg-white/10 backdrop-blur-md rounded-2xl p-4 border border-white/10">
          <div className="text-slate-300 text-xs font-medium">Model Confidence</div>
          <div className="text-2xl font-black mt-1 text-emerald-400">
            {predictionData.confidenceScore}%
          </div>
          <div className="text-xs text-slate-300 mt-2">
            R² Score: {(predictionData.accuracyMetric.rSquared * 100).toFixed(0)}% (
            {predictionData.accuracyMetric.dataPointsCount} data points)
          </div>
        </div>

        <div className="bg-white/10 backdrop-blur-md rounded-2xl p-4 border border-white/10">
          <div className="text-slate-300 text-xs font-medium">Smart Savings Recommendation</div>
          <div className="text-xs text-slate-200 mt-2 line-clamp-2">
            {predictionData.recommendations[0]?.description || "Consistent budget performance detected."}
          </div>
        </div>
      </div>
    </div>
  );
}