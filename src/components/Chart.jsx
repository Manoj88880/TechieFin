"use client";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

export default function Chart({ transactions = [], currency = "\u20B9" }) {
  // Safe calculations
  const income = transactions
    .filter((t) => t.type === "income")
    .reduce((a, b) => a + Number(b.amount || 0), 0);

  const expense = transactions
    .filter((t) => t.type === "expense")
    .reduce((a, b) => a + Number(b.amount || 0), 0);

  const balance = income - expense;

  const data = [
    { name: "Income", amount: income },
    { name: "Expense", amount: expense },
    { name: "Balance", amount: balance },
  ];

  // Empty state
  if (transactions.length === 0) {
    return (
      <div className="bg-gray-800 p-4 rounded-xl mb-6">
        <h2 className="text-lg font-semibold mb-4">Overview</h2>
        <div className="text-center text-gray-400 py-8">
          <p>No transactions yet. Add some to see your financial overview.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-gray-800 p-4 rounded-xl mb-6">
      <h2 className="text-lg font-semibold mb-4">Overview</h2>

      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={data}>
          <CartesianGrid strokeDasharray="3 3" stroke="#374151" />

          <XAxis dataKey="name" stroke="#9ca3af" />
          <YAxis stroke="#9ca3af" />

          <Tooltip
            formatter={(value) => `${currency}${value.toLocaleString()}`}
            contentStyle={{
              backgroundColor: "#1f2937",
              border: "1px solid #4b5563",
              borderRadius: "8px",
              color: "#fff",
            }}
            cursor={{ fill: "rgba(99, 102, 241, 0.1)" }}
          />

          <Legend wrapperStyle={{ color: "#9ca3af" }} />

          <Bar
            dataKey="amount"
            name="Amount"
            fill="#6366f1"
            radius={[6, 6, 0, 0]}
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}