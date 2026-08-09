import { Link } from "react-router-dom";

import Navbar from "../components/layout/Navbar";
import FeatureCard from "../components/home/FeatureCard";
import Testimonials from "../components/home/Testimonials";
import Footer from "../components/layout/Footer";

function LandingPage() {
  return (
    <div className="min-h-screen bg-slate-50">
      {/* Navbar */}
      <Navbar />

      {/* Hero Section */}
      <section className="max-w-7xl mx-auto px-6 py-20">
        <div className="flex flex-col-reverse md:flex-row items-center justify-between gap-16">
          {/* Left Side */}
          <div className="flex-1">
            <span className="bg-blue-100 text-blue-700 px-4 py-2 rounded-full font-medium">
              🚀 AI Powered Personal Finance Platform
            </span>

            <h1 className="mt-8 text-5xl md:text-6xl font-extrabold text-slate-900 leading-tight">
              Smart Finance.
              <br />
              Smarter Decisions.
            </h1>

            <p className="mt-6 text-lg text-slate-600 max-w-xl">
              Manage expenses, split bills, track budgets, analyze spending
              habits, and receive AI-powered financial insights—all in one
              intelligent platform.
            </p>

            <div className="mt-10 flex flex-wrap gap-4">
              <Link
                to="/signup"
                className="bg-blue-600 hover:bg-blue-700 transition text-white px-7 py-3 rounded-xl font-semibold shadow-lg"
              >
                Get Started
              </Link>

              <Link
                to="/login"
                className="border border-slate-300 hover:bg-slate-100 transition px-7 py-3 rounded-xl font-semibold"
              >
                Login
              </Link>
            </div>

            <div className="mt-12 flex gap-10 flex-wrap">
              <div>
                <h2 className="text-3xl font-bold text-blue-600">10K+</h2>
                <p className="text-slate-600">Active Users</p>
              </div>

              <div>
                <h2 className="text-3xl font-bold text-green-600">$5M+</h2>
                <p className="text-slate-600">Transactions</p>
              </div>

              <div>
                <h2 className="text-3xl font-bold text-purple-600">99%</h2>
                <p className="text-slate-600">Satisfaction</p>
              </div>
            </div>
          </div>

          {/* Right Side */}
          <div className="flex-1">
            <div className="bg-white rounded-3xl shadow-2xl p-8">
              <h2 className="text-2xl font-bold text-slate-800">
                Dashboard Preview
              </h2>

              <p className="text-slate-500 mt-2">Monthly Overview</p>

              <div className="mt-8 space-y-5">
                <div className="bg-blue-100 rounded-xl p-5">
                  <div className="flex justify-between items-center">
                    <div>
                      <p className="text-slate-600">Total Balance</p>
                      <h2 className="text-3xl font-bold">$12,840</h2>
                    </div>

                    <span className="text-5xl">💳</span>
                  </div>
                </div>

                <div className="bg-slate-100 h-40 rounded-2xl flex items-center justify-center text-7xl">
                  📈
                </div>

                <div className="grid grid-cols-3 gap-4">
                  <div className="bg-green-100 rounded-xl p-4 text-center">
                    <p className="text-3xl">💰</p>
                    <p className="mt-2 text-sm">Income</p>
                  </div>

                  <div className="bg-red-100 rounded-xl p-4 text-center">
                    <p className="text-3xl">💸</p>
                    <p className="mt-2 text-sm">Expense</p>
                  </div>

                  <div className="bg-purple-100 rounded-xl p-4 text-center">
                    <p className="text-3xl">🤖</p>
                    <p className="mt-2 text-sm">AI Insights</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="max-w-7xl mx-auto px-6 py-20">
        <div className="text-center">
          <h2 className="text-4xl font-bold text-slate-900">
            Powerful Features
          </h2>

          <p className="mt-4 text-slate-600">
            Everything you need to manage your finances smarter.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mt-16">
          <FeatureCard
            icon="💸"
            title="Expense Tracking"
            description="Track every expense and know where your money goes."
          />

          <FeatureCard
            icon="📊"
            title="Budget Planning"
            description="Create monthly budgets and stay within limits."
          />

          <FeatureCard
            icon="👥"
            title="Expense Splitter"
            description="Split bills with friends and family instantly."
          />

          <FeatureCard
            icon="🤖"
            title="AI Insights"
            description="Receive personalized financial recommendations."
          />
        </div>
      </section>

      {/* Why VaultIQ */}
      <section className="bg-white py-20">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center">
            <h2 className="text-4xl font-bold">Why Choose VaultIQ?</h2>

            <p className="mt-4 text-slate-600">
              Built with modern technology to simplify personal finance.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 mt-16">
            <div className="bg-slate-50 rounded-2xl p-8 shadow">
              <div className="text-5xl">🔒</div>

              <h3 className="mt-5 text-2xl font-bold">Secure</h3>

              <p className="mt-3 text-slate-600">
                Your financial data is protected with modern security practices.
              </p>
            </div>

            <div className="bg-slate-50 rounded-2xl p-8 shadow">
              <div className="text-5xl">⚡</div>

              <h3 className="mt-5 text-2xl font-bold">Fast</h3>

              <p className="mt-3 text-slate-600">
                Add expenses and view analytics instantly.
              </p>
            </div>

            <div className="bg-slate-50 rounded-2xl p-8 shadow">
              <div className="text-5xl">🤖</div>

              <h3 className="mt-5 text-2xl font-bold">AI Powered</h3>

              <p className="mt-3 text-slate-600">
                Get intelligent spending insights and savings suggestions.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <Testimonials />

      {/* CTA */}
      <section className="bg-blue-600 py-20">
        <div className="max-w-5xl mx-auto text-center text-white px-6">
          <h2 className="text-5xl font-bold">
            Ready to Take Control of Your Finances?
          </h2>

          <p className="mt-6 text-xl">
            Join thousands of users managing their money smarter with VaultIQ.
          </p>

          <Link
            to="/signup"
            className="inline-block mt-10 bg-white text-blue-600 px-8 py-4 rounded-xl font-bold hover:bg-slate-100 transition"
          >
            Create Free Account
          </Link>
        </div>
      </section>

      {/* Footer */}
      <Footer />
    </div>
  );
}

export default LandingPage;