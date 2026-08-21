import {
  LayoutDashboard,
  Sparkles,
  PieChart,
  Receipt,
  Users,
  ArrowLeft,
} from "lucide-react";
import { Link } from "react-router-dom";
import { useExpense } from "../../context/ExpenseContext";

function Sidebar() {
  const { activeTab, setActiveTab, predictionData } = useExpense();

  const navItems = [
    {
      id: "dashboard",
      label: "Dashboard",
      icon: LayoutDashboard,
      badge: null,
    },
    {
      id: "ai-predictor",
      label: "ML Predictor",
      icon: Sparkles,
      badge: "AI",
      badgeColor: "bg-blue-500 text-white",
    },
    {
      id: "budgets",
      label: "Budgets & Analytics",
      icon: PieChart,
      badge: null,
    },
    {
      id: "transactions",
      label: "Expenses",
      icon: Receipt,
      badge: null,
    },
    {
      id: "split",
      label: "Split Expenses",
      icon: Users,
      badge: null,
    },
  ] as const;

  return (
    <aside className="w-64 bg-slate-900 text-white min-h-screen p-6 flex flex-col justify-between hidden md:flex sticky top-0 h-screen">
      <div>
        {/* Brand Logo */}
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-blue-600 to-indigo-500 flex items-center justify-center font-bold text-xl shadow-lg shadow-blue-500/30">
            V
          </div>
          <div>
            <h1 className="text-2xl font-black tracking-tight text-white">
              Vault<span className="text-blue-400">IQ</span>
            </h1>
            <p className="text-[10px] text-slate-400 uppercase tracking-widest font-semibold">
              ML Expense Intelligence
            </p>
          </div>
        </div>

        {/* Navigation */}
        <nav className="mt-10 space-y-2">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;

            return (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`w-full flex items-center justify-between px-4 py-3 rounded-xl font-medium transition text-sm ${
                  isActive
                    ? "bg-blue-600 text-white shadow-lg shadow-blue-600/30"
                    : "text-slate-400 hover:text-white hover:bg-slate-800/60"
                }`}
              >
                <div className="flex items-center gap-3">
                  <Icon className={`w-5 h-5 ${isActive ? "text-white" : "text-slate-400"}`} />
                  <span>{item.label}</span>
                </div>
                {item.badge && (
                  <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${item.badgeColor}`}>
                    {item.badge}
                  </span>
                )}
              </button>
            );
          })}
        </nav>

        {/* Next Month ML Quick Peek */}
        <div className="mt-8 p-4 rounded-2xl bg-slate-800/60 border border-slate-700/60 backdrop-blur-sm">
          <div className="flex items-center gap-2 text-xs font-bold text-blue-400">
            <Sparkles className="w-3.5 h-3.5" />
            <span>{predictionData.nextMonthName} Forecast</span>
          </div>
          <div className="mt-2 text-xl font-black text-white">
            ₹{predictionData.predictedTotal.toLocaleString()}
          </div>
          <div className="text-[11px] text-slate-400 mt-1 flex items-center justify-between">
            <span>Model Conf: {predictionData.confidenceScore}%</span>
            <button
              onClick={() => setActiveTab("ai-predictor")}
              className="text-blue-400 hover:underline font-semibold"
            >
              Details →
            </button>
          </div>
        </div>
      </div>

      {/* Footer / User info */}
      <div className="pt-6 border-t border-slate-800 space-y-4">
        <Link
          to="/"
          className="flex items-center gap-2 text-xs text-slate-400 hover:text-white transition"
        >
          <ArrowLeft className="w-4 h-4" /> Back to Home
        </Link>
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-full bg-blue-500/20 border border-blue-500/40 flex items-center justify-center font-bold text-blue-300 text-sm">
            AM
          </div>
          <div className="overflow-hidden">
            <p className="text-xs font-bold text-white truncate">Alex Morgan</p>
            <p className="text-[11px] text-slate-400 truncate">demo@vaultiq.ai</p>
          </div>
        </div>
      </div>
    </aside>
  );
}

export default Sidebar;