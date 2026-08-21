import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Sparkles, ArrowRight } from "lucide-react";

function Signup() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSignup = (e: React.FormEvent) => {
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
            Join Vault<span className="text-blue-400">IQ</span> Today
          </h1>

          <p className="mt-6 text-lg text-blue-100 leading-relaxed">
            Create your free account to unlock AI-driven expense predictions, multi-month analytics, and smart budget recommendations.
          </p>

          <div className="mt-10 flex gap-4 text-4xl">
            <div className="p-4 rounded-2xl bg-white/10 backdrop-blur-md">🚀</div>
            <div className="p-4 rounded-2xl bg-white/10 backdrop-blur-md">💰</div>
            <div className="p-4 rounded-2xl bg-white/10 backdrop-blur-md">📈</div>
          </div>
        </div>
      </div>

      {/* Right Side */}
      <div className="w-full lg:w-1/2 flex items-center justify-center bg-slate-100 px-6 py-12">
        <div className="bg-white rounded-3xl shadow-2xl p-10 w-full max-w-md border border-slate-200">
          <h2 className="text-3xl font-black text-slate-900">
            Create Account
          </h2>

          <p className="mt-2 text-slate-500 text-sm">
            Start your ML-powered financial journey today.
          </p>

          <form onSubmit={handleSignup} className="mt-8 space-y-4">
            <div>
              <label className="block text-slate-700 text-xs font-bold uppercase tracking-wider mb-2">
                Full Name
              </label>
              <input
                type="text"
                placeholder="Alex Morgan"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full p-3.5 border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                required
              />
            </div>

            <div>
              <label className="block text-slate-700 text-xs font-bold uppercase tracking-wider mb-2">
                Email Address
              </label>
              <input
                type="email"
                placeholder="alex@vaultiq.ai"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
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
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full p-3.5 border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                required
              />
            </div>

            <button
              type="submit"
              className="w-full mt-4 bg-blue-600 hover:bg-blue-700 text-white py-3.5 rounded-xl font-bold transition shadow-lg shadow-blue-600/30 flex items-center justify-center gap-2 text-sm"
            >
              Get Started <ArrowRight className="w-4 h-4" />
            </button>
          </form>

          <div className="mt-6 pt-6 border-t border-slate-100">
            <button
              onClick={() => navigate("/dashboard")}
              className="w-full bg-slate-900 hover:bg-slate-800 text-white py-3 rounded-xl font-semibold transition text-xs flex items-center justify-center gap-2"
            >
              <Sparkles className="w-3.5 h-3.5 text-blue-400" />
              1-Click Demo Access
            </button>
          </div>

          <p className="mt-6 text-center text-slate-600 text-xs">
            Already have an account?{" "}
            <Link to="/login" className="text-blue-600 font-bold hover:underline">
              Login
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Signup;