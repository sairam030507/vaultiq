import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Sparkles, ArrowRight } from "lucide-react";

function Login() {
  const [email, setEmail] = useState("demo@vaultiq.ai");
  const [password, setPassword] = useState("demo1234");
  const navigate = useNavigate();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    navigate("/dashboard");
  };

  return (
    <div className="min-h-screen flex font-sans">
      {/* Left Side */}
      <div className="hidden lg:flex lg:w-1/2 bg-gradient-to-br from-blue-700 via-indigo-800 to-slate-900 text-white items-center justify-center p-12 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-blue-500/20 rounded-full blur-3xl" />
        <div className="relative z-10 max-w-lg">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/10 border border-white/20 text-blue-200 text-xs font-semibold mb-6">
            <Sparkles className="w-4 h-4 text-blue-300" />
            AI & Machine Learning Powered
          </div>
          <h1 className="text-5xl font-black tracking-tight leading-tight">
            Welcome Back to Vault<span className="text-blue-400">IQ</span>
          </h1>

          <p className="mt-6 text-lg text-blue-100 leading-relaxed">
            Track expenses, forecast next month's spending with statistical regression, manage budgets, and make smarter financial decisions.
          </p>

          <div className="mt-10 flex gap-4 text-4xl">
            <div className="p-4 rounded-2xl bg-white/10 backdrop-blur-md">💰</div>
            <div className="p-4 rounded-2xl bg-white/10 backdrop-blur-md">📊</div>
            <div className="p-4 rounded-2xl bg-white/10 backdrop-blur-md">🤖</div>
          </div>
        </div>
      </div>

      {/* Right Side */}
      <div className="w-full lg:w-1/2 flex items-center justify-center bg-slate-100 px-6 py-12">
        <div className="bg-white shadow-2xl rounded-3xl p-10 w-full max-w-md border border-slate-200">
          <h2 className="text-3xl font-black text-slate-900">
            Sign In
          </h2>

          <p className="mt-2 text-slate-500 text-sm">
            Access your VaultIQ dashboard and predictive analytics.
          </p>

          <form onSubmit={handleLogin} className="mt-8 space-y-4">
            <div>
              <label className="block text-slate-700 text-xs font-bold uppercase tracking-wider mb-2">
                Email Address
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                className="w-full p-3.5 border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                required
              />
            </div>

            <div>
              <label className="block text-slate-700 text-xs font-bold uppercase tracking-wider mb-2">
                Password
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter your password"
                className="w-full p-3.5 border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                required
              />
            </div>

            <button
              type="submit"
              className="w-full mt-4 bg-blue-600 hover:bg-blue-700 text-white py-3.5 rounded-xl font-bold transition shadow-lg shadow-blue-600/30 flex items-center justify-center gap-2 text-sm"
            >
              Sign In to Dashboard <ArrowRight className="w-4 h-4" />
            </button>
          </form>

          {/* Quick Demo Access */}
          <div className="mt-6 pt-6 border-t border-slate-100">
            <button
              onClick={() => navigate("/dashboard")}
              className="w-full bg-slate-900 hover:bg-slate-800 text-white py-3 rounded-xl font-semibold transition text-xs flex items-center justify-center gap-2"
            >
              <Sparkles className="w-3.5 h-3.5 text-blue-400" />
              1-Click Demo Access (No password needed)
            </button>
          </div>

          <p className="mt-6 text-center text-slate-600 text-xs">
            Don't have an account?{" "}
            <Link to="/signup" className="text-blue-600 font-bold hover:underline">
              Sign Up
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Login;