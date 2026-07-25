import { Link } from "react-router-dom";

function Login() {
  return (
    <div className="min-h-screen flex">

      {/* Left Side */}
      <div className="hidden lg:flex lg:w-1/2 bg-blue-600 text-white items-center justify-center p-12">
        <div>
          <h1 className="text-5xl font-bold">
            Welcome Back to VaultIQ
          </h1>

          <p className="mt-6 text-xl text-blue-100">
            Track expenses, manage budgets, split bills,
            and get AI-powered financial insights.
          </p>

          <div className="mt-10 text-7xl">
            💰📊🤖
          </div>
        </div>
      </div>

      {/* Right Side */}
      <div className="w-full lg:w-1/2 flex items-center justify-center bg-slate-100 px-6">

        <div className="bg-white shadow-2xl rounded-3xl p-10 w-full max-w-md">

          <h2 className="text-4xl font-bold text-slate-900">
            Login
          </h2>

          <p className="mt-2 text-slate-500">
            Welcome back! Please enter your details.
          </p>

          {/* Email */}
          <div className="mt-8">
            <label className="block text-slate-700 mb-2">
              Email
            </label>

            <input
              type="email"
              placeholder="Enter your email"
              className="w-full p-4 border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Password */}
          <div className="mt-5">
            <label className="block text-slate-700 mb-2">
              Password
            </label>

            <input
              type="password"
              placeholder="Enter your password"
              className="w-full p-4 border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Forgot Password */}
          <div className="mt-3 text-right">
            <a
              href="#"
              className="text-blue-600 hover:underline"
            >
              Forgot Password?
            </a>
          </div>

          {/* Button */}
          <button className="w-full mt-6 bg-blue-600 text-white py-4 rounded-xl font-semibold hover:bg-blue-700 transition">
            Login
          </button>

          {/* Signup */}
          <p className="mt-6 text-center text-slate-600">
            Don't have an account?{" "}
            <Link
              to="/signup"
              className="text-blue-600 font-semibold"
            >
              Sign Up
            </Link>
          </p>

        </div>

      </div>

    </div>
  );
}

export default Login;