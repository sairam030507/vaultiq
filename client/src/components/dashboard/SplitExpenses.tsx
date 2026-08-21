import { useState } from "react";
import { Plus, Trash2, ArrowRight, CheckCircle2, Split } from "lucide-react";

interface Participant {
  id: string;
  name: string;
  paid: number;
}

export default function SplitExpenses() {
  const [billTitle, setBillTitle] = useState("Weekend Trip / Dinner");
  const [participants, setParticipants] = useState<Participant[]>([
    { id: "1", name: "Alex (You)", paid: 4500 },
    { id: "2", name: "Rahul", paid: 1200 },
    { id: "3", name: "Sneha", paid: 2300 },
  ]);
  const [newName, setNewName] = useState("");
  const [newPaid, setNewPaid] = useState("");

  const handleAddParticipant = () => {
    if (!newName) return;
    setParticipants((prev) => [
      ...prev,
      {
        id: String(Date.now()),
        name: newName,
        paid: Number(newPaid) || 0,
      },
    ]);
    setNewName("");
    setNewPaid("");
  };

  const handleRemove = (id: string) => {
    setParticipants((prev) => prev.filter((p) => p.id !== id));
  };

  const totalBill = participants.reduce((sum, p) => sum + p.paid, 0);
  const perPersonShare = participants.length > 0 ? Math.round(totalBill / participants.length) : 0;

  // Calculate settlement balances
  const balances = participants.map((p) => ({
    ...p,
    net: p.paid - perPersonShare, // positive = should receive, negative = owes
  }));

  const creditors = balances.filter((b) => b.net > 0).sort((a, b) => b.net - a.net);
  const debtors = balances.filter((b) => b.net < 0).sort((a, b) => a.net - b.net);

  // Settlement transactions
  const settlements: { from: string; to: string; amount: number }[] = [];
  const cCopy = creditors.map((c) => ({ ...c }));
  const dCopy = debtors.map((d) => ({ ...d }));

  let cIdx = 0;
  let dIdx = 0;

  while (cIdx < cCopy.length && dIdx < dCopy.length) {
    const cred = cCopy[cIdx]!;
    const deb = dCopy[dIdx]!;

    const amount = Math.min(cred.net, Math.abs(deb.net));
    if (amount > 0) {
      settlements.push({
        from: deb.name,
        to: cred.name,
        amount: Math.round(amount),
      });
    }

    cred.net -= amount;
    deb.net += amount;

    if (cred.net <= 0.1) cIdx++;
    if (Math.abs(deb.net) <= 0.1) dIdx++;
  }

  return (
    <div className="space-y-8 animate-fadeIn">
      <div>
        <h1 className="text-3xl font-extrabold text-slate-900">Group Expense Splitter</h1>
        <p className="text-slate-500 mt-1 text-sm">
          Split bills evenly, track who paid what, and resolve group debts with minimal transactions
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left: Input Participants */}
        <div className="lg:col-span-2 bg-white rounded-3xl p-6 shadow-sm border border-slate-200">
          <div className="mb-6">
            <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">
              Expense Name / Group
            </label>
            <input
              type="text"
              value={billTitle}
              onChange={(e) => setBillTitle(e.target.value)}
              className="w-full text-lg font-bold text-slate-900 border border-slate-200 rounded-xl p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <h2 className="text-base font-bold text-slate-800 mb-4">Participants & Amounts Paid</h2>

          <div className="space-y-3">
            {participants.map((p) => (
              <div
                key={p.id}
                className="flex items-center justify-between p-3.5 rounded-xl bg-slate-50 border border-slate-100"
              >
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-blue-100 text-blue-700 font-bold flex items-center justify-center text-xs">
                    {p.name.charAt(0)}
                  </div>
                  <span className="font-semibold text-slate-900 text-sm">{p.name}</span>
                </div>

                <div className="flex items-center gap-4">
                  <span className="font-bold text-slate-900 text-sm">
                    Paid: ₹{p.paid.toLocaleString()}
                  </span>
                  {participants.length > 2 && (
                    <button
                      onClick={() => handleRemove(p.id)}
                      className="text-slate-400 hover:text-red-500 transition"
                      title="Remove"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>

          {/* Add person form */}
          <div className="mt-6 flex flex-col sm:flex-row gap-3">
            <input
              type="text"
              placeholder="Friend's Name"
              value={newName}
              onChange={(e) => setNewName(e.target.value)}
              className="flex-1 border border-slate-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <input
              type="number"
              placeholder="Amount Paid (₹)"
              value={newPaid}
              onChange={(e) => setNewPaid(e.target.value)}
              className="w-full sm:w-40 border border-slate-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <button
              onClick={handleAddParticipant}
              className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-5 py-2.5 rounded-xl text-sm flex items-center justify-center gap-2 transition"
            >
              <Plus className="w-4 h-4" /> Add
            </button>
          </div>
        </div>

        {/* Right: Settlement Summary */}
        <div className="space-y-6">
          <div className="bg-gradient-to-br from-blue-600 to-indigo-700 rounded-3xl p-6 text-white shadow-lg">
            <div className="text-xs font-semibold uppercase tracking-wider text-blue-200">
              Total Split Bill
            </div>
            <div className="text-3xl font-black mt-1">₹{totalBill.toLocaleString()}</div>
            <div className="mt-4 pt-4 border-t border-white/20 flex justify-between items-center text-sm">
              <span className="text-blue-100">Split Equally:</span>
              <span className="font-bold text-lg">₹{perPersonShare.toLocaleString()} / person</span>
            </div>
          </div>

          <div className="bg-white rounded-3xl p-6 shadow-sm border border-slate-200">
            <h3 className="font-bold text-slate-900 text-base mb-4 flex items-center gap-2">
              <Split className="w-4 h-4 text-blue-600" /> Optimal Settlement Plan
            </h3>

            {settlements.length === 0 ? (
              <div className="text-center py-6 text-slate-500 text-xs flex items-center justify-center gap-2">
                <CheckCircle2 className="w-5 h-5 text-emerald-500" /> Everyone is settled up!
              </div>
            ) : (
              <div className="space-y-3">
                {settlements.map((s, idx) => (
                  <div
                    key={idx}
                    className="p-3 rounded-xl bg-slate-50 border border-slate-100 flex items-center justify-between text-xs"
                  >
                    <div className="flex items-center gap-2 font-semibold text-slate-800">
                      <span className="text-red-600 font-bold">{s.from}</span>
                      <ArrowRight className="w-3.5 h-3.5 text-slate-400" />
                      <span className="text-emerald-600 font-bold">{s.to}</span>
                    </div>
                    <span className="font-black text-slate-900 bg-white px-2.5 py-1 rounded-lg border border-slate-200">
                      ₹{s.amount.toLocaleString()}
                    </span>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
