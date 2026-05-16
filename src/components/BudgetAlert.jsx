"use client";
import { useState } from "react";

export default function BudgetAlert({ transactions }) {
  const [budget, setBudget] = useState("");
  const [saved, setSaved] = useState(false);
  const [monthlyBudget, setMonthlyBudget] = useState(null);

  const totalExpense = transactions
    .filter((t) => t.type === "expense")
    .reduce((a, b) => a + b.amount, 0);

  const handleSave = () => {
    if (!budget) return;
    setMonthlyBudget(parseFloat(budget));
    setSaved(true);
  };

  const getStatus = () => {
    if (!monthlyBudget) return null;
    const percent = (totalExpense / monthlyBudget) * 100;
    if (percent >= 100) return { color: "bg-red-600", msg: "🚨 Budget Exceeded!", percent: 100 };
    if (percent >= 80) return { color: "bg-orange-500", msg: "⚠️ Almost at limit!", percent };
    if (percent >= 50) return { color: "bg-yellow-500", msg: "📊 Half budget used!", percent };
    return { color: "bg-green-500", msg: "✅ Budget on track!", percent };
  };

  const status = getStatus();

  return (
    <div className="bg-gray-800 p-4 rounded-xl mb-6">
      <h2 className="text-lg font-semibold mb-3">🔔 Budget Alerts</h2>
      <div className="flex gap-2 mb-3">
        <input
          className="bg-gray-700 p-2 rounded-lg outline-none flex-1"
          placeholder="Set monthly budget (₹)"
          type="number"
          value={budget}
          onChange={(e) => setBudget(e.target.value)}
        />
        <button
          onClick={handleSave}
          className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-4 py-2 rounded-lg"
        >
          Set
        </button>
      </div>
      {saved && status && (
        <div className="flex flex-col gap-2">
          <div className="flex justify-between text-sm">
            <span>{status.msg}</span>
            <span>₹{totalExpense} / ₹{monthlyBudget}</span>
          </div>
          <div className="w-full bg-gray-700 rounded-full h-4">
            <div
              className={`${status.color} h-4 rounded-full transition-all duration-500`}
              style={{ width: `${Math.min(status.percent, 100)}%` }}
            ></div>
          </div>
          <p className="text-xs text-gray-400 text-right">
            ₹{Math.max(0, monthlyBudget - totalExpense)} remaining
          </p>
        </div>
      )}
    </div>
  );
}