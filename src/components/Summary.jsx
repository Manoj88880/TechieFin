export default function Summary({ transactions }) {
  const income = transactions
    .filter((t) => t.type === "income")
    .reduce((a, b) => a + b.amount, 0);

  const expense = transactions
    .filter((t) => t.type === "expense")
    .reduce((a, b) => a + b.amount, 0);

  const balance = income - expense;

  return (
    <div className="mb-6">
      {/* Balance Card */}
      <div
        className="rounded-2xl p-6 mb-4 text-center"
        style={{
          background: "linear-gradient(135deg, #6366f1, #8b5cf6, #ec4899)",
        }}
      >
        <p className="text-sm text-purple-200 mb-1">Total Balance</p>
        <p className="text-4xl font-bold text-white">₹{balance.toLocaleString()}</p>
        <p className="text-purple-200 text-xs mt-2">
          {balance >= 0 ? "✅ You are on track!" : "⚠️ Overspending!"}
        </p>
      </div>

      {/* Income & Expense Cards */}
      <div className="grid grid-cols-2 gap-4">
        <div
          className="p-4 rounded-2xl"
          style={{ background: "linear-gradient(135deg, #059669, #10b981)" }}
        >
          <p className="text-sm text-green-200">💚 Income</p>
          <p className="text-2xl font-bold text-white">₹{income.toLocaleString()}</p>
        </div>
        <div
          className="p-4 rounded-2xl"
          style={{ background: "linear-gradient(135deg, #dc2626, #ef4444)" }}
        >
          <p className="text-sm text-red-200">❤️ Expense</p>
          <p className="text-2xl font-bold text-white">₹{expense.toLocaleString()}</p>
        </div>
      </div>
    </div>
  );
}