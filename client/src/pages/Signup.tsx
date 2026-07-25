import { Link } from "react-router-dom";

function Signup() {
  return (
    <div className="min-h-screen flex">

      {/* Left Side */}
      <div className="hidden lg:flex lg:w-1/2 bg-gradient-to-br from-blue-700 to-indigo-700 text-white items-center justify-center p-12">
        <div>
          <h1 className="text-5xl font-bold">
            Join VaultIQ Today
          </h1>

          <p className="mt-6 text-xl text-blue-100">
            Create your account and start managing your finances smarter.
          </p>

          <div className="mt-10 text-7xl">
            🚀💰📈
          </div>
        </div>
      </div>

      {/* Right Side */}
      <div className="w-full lg:w-1/2 flex items-center justify-center bg-slate-100 px-6">

        <div className="bg-white rounded-3xl shadow-2xl p-10 w-full max-w-md">

          <h2 className="text-4xl font-bold">
            Create Account
          </h2>

          <p className="mt-2 text-slate-500">
            Start your financial journey today.
          </p>

          <div className="mt-8">
            <label className="block mb-2">Full Name</label>

            <input
              type="text"
              placeholder="Enter your name"
              className="w-full border rounded-xl p-4"
            />
          </div>

          <div className="mt-5">
            <label className="block mb-2">Email</label>

            <input
              type="email"
              placeholder="Enter your email"
              className="w-full border rounded-xl p-4"
            />
          </div>

          <div className="mt-5">
            <label className="block mb-2">Password</label>

            <input
              type="password"
              placeholder="Create password"
              className="w-full border rounded-xl p-4"
            />
          </div>

          <div className="mt-5">
            <label className="block mb-2">
              Confirm Password
            </label>

            <input
              type="password"
              placeholder="Confirm password"
              className="w-full border rounded-xl p-4"
            />
          </div>

          <button className="w-full mt-8 bg-blue-600 hover:bg-blue-700 text-white rounded-xl py-4 font-semibold">
            Create Account
          </button>

          <p className="mt-6 text-center">
            Already have an account?{" "}
            <Link
              to="/login"
              className="text-blue-600 font-semibold"
            >
              Login
            </Link>
          </p>

        </div>

      </div>

    </div>
  );
}

export default Signup;