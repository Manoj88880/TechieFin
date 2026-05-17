export default function Summary({ transactions }) {
  const income = transactions
    .filter((t) => t.type === "income")
    .reduce((a, b) => a + b.amount, 0);

  const expense = transactions
    .filter((t) => t.type === "expense")
    .reduce((a, b) => a + b.amount, 0);

  const balance = income - expense;

  return (
    <div className="mb-2">
      <div className="text-center mb-4">
        <p className="text-purple-200 text-sm mb-1">Total Balance</p>
        <p className="text-5xl font-bold text-white tracking-tight">
          ₹{balance.toLocaleString()}
        </p>
        <p className="text-purple-300 text-xs mt-2">
          {balance >= 0 ? "✅ On track!" : "⚠️ Overspending!"}
        </p>
      </div>
      <div className="grid grid-cols-2 gap-3">
        <div
          className="p-4 rounded-2xl"
          style={{
            background: "rgba(5, 150, 105, 0.3)",
            border: "1px solid rgba(16, 185, 129, 0.3)",
            backdropFilter: "blur(10px)",
          }}
        >
          <div className="flex items-center gap-2 mb-1">
            <span className="text-lg">💚</span>
            <p className="text-xs text-green-300">Income</p>
          </div>
          <p className="text-2xl font-bold text-white">₹{income.toLocaleString()}</p>
        </div>
        <div
          className="p-4 rounded-2xl"
          style={{
            background: "rgba(220, 38, 38, 0.3)",
            border: "1px solid rgba(239, 68, 68, 0.3)",
            backdropFilter: "blur(10px)",
          }}
        >
          <div className="flex items-center gap-2 mb-1">
            <span className="text-lg">❤️</span>
            <p className="text-xs text-red-300">Expenses</p>
          </div>
          <p className="text-2xl font-bold text-white">₹{expense.toLocaleString()}</p>
        </div>
      </div>
    </div>
  );
}