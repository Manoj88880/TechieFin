"use client";
import { useState } from "react";

export default function Statistics({ transactions }) {
  const [shown, setShown] = useState(false);

  const income = transactions.filter((t) => t.type === "income");
  const expense = transactions.filter((t) => t.type === "expense");

  const totalIncome = income.reduce((a, b) => a + b.amount, 0);
  const totalExpense = expense.reduce((a, b) => a + b.amount, 0);

  const avgIncome = income.length > 0 ? totalIncome / income.length : 0;
  const avgExpense = expense.length > 0 ? totalExpense / expense.length : 0;

  const maxIncome = income.length > 0 ? Math.max(...income.map((t) => t.amount)) : 0;
  const maxExpense = expense.length > 0 ? Math.max(...expense.map((t) => t.amount)) : 0;

  const savingRate = totalIncome > 0 ? (((totalIncome - totalExpense) / totalIncome) * 100).toFixed(1) : 0;

  const stats = [
    { label: "Total Transactions", value: transactions.length, color: "text-blue-400" },
    { label: "Income Transactions", value: income.length, color: "text-green-400" },
    { label: "Expense Transactions", value: expense.length, color: "text-red-400" },
    { label: "Avg Income", value: `₹${avgIncome.toFixed(0)}`, color: "text-green-400" },
    { label: "Avg Expense", value: `₹${avgExpense.toFixed(0)}`, color: "text-red-400" },
    { label: "Highest Income", value: `₹${maxIncome.toLocaleString()}`, color: "text-green-400" },
    { label: "Highest Expense", value: `₹${maxExpense.toLocaleString()}`, color: "text-red-400" },
    { label: "Saving Rate", value: `${savingRate}%`, color: "text-purple-400" },
  ];

  return (
    <div className="bg-gray-800 p-4 rounded-xl mb-6">
      <h2 className="text-lg font-semibold mb-3">📊 Transaction Statistics</h2>
      <button
        onClick={() => setShown(!shown)}
        className="bg-orange-600 hover:bg-orange-700 text-white font-semibold px-4 py-2 rounded-lg w-full mb-3"
      >
        {shown ? "Hide Statistics" : "View Statistics"}
      </button>
      {shown && (
        <div className="grid grid-cols-2 gap-2">
          {stats.map((stat) => (
            <div key={stat.label} className="bg-gray-700 p-3 rounded-xl">
              <p className="text-xs text-gray-400 mb-1">{stat.label}</p>
              <p className={`text-lg font-bold ${stat.color}`}>{stat.value}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}