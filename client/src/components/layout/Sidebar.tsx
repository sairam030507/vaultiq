import {
  FaHome,
  FaWallet,
  FaChartPie,
  FaRobot,
  FaCog,
  FaSignOutAlt,
} from "react-icons/fa";

function Sidebar() {
  return (
    <aside className="w-64 bg-slate-900 text-white min-h-screen p-6 flex flex-col">

      <h1 className="text-3xl font-bold text-blue-400">
        VaultIQ
      </h1>

      <p className="text-slate-400 mt-2 text-sm">
        Personal Finance Tracker
      </p>

      <nav className="mt-12 flex flex-col gap-5">

        <button className="flex items-center gap-3 hover:text-blue-400 transition">
          <FaHome />
          Dashboard
        </button>

        <button className="flex items-center gap-3 hover:text-blue-400 transition">
          <FaWallet />
          Expenses
        </button>

        <button className="flex items-center gap-3 hover:text-blue-400 transition">
          <FaChartPie />
          Budgets
        </button>

        <button className="flex items-center gap-3 hover:text-blue-400 transition">
          <FaRobot />
          AI Insights
        </button>

        <button className="flex items-center gap-3 hover:text-blue-400 transition">
          <FaCog />
          Settings
        </button>

      </nav>

      <button className="mt-auto flex items-center gap-3 text-red-400 hover:text-red-500 transition">
        <FaSignOutAlt />
        Logout
      </button>

    </aside>
  );
}

export default Sidebar;