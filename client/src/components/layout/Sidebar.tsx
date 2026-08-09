function Sidebar() {
  return (
    <aside className="w-64 bg-slate-900 text-white min-h-screen p-6">

      <h1 className="text-3xl font-bold">
        VaultIQ
      </h1>

      <nav className="mt-12 space-y-5">

        <p>🏠 Dashboard</p>

        <p>💸 Expenses</p>

        <p>📊 Budgets</p>

        <p>👥 Split Expenses</p>

        <p>🤖 AI Insights</p>

        <p>⚙ Settings</p>

      </nav>

    </aside>
  );
}

export default Sidebar;