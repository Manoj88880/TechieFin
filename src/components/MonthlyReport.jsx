"use client";
import { useState } from "react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";

export default function MonthlyReport({ transactions }) {
  const [shown, setShown] = useState(false);

  const getMonthlyData = () => {
    const months = {};

    transactions.forEach((t) => {
      if (!t.date) return;
      const date = t.date.toDate();
      const key = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}`;
      const label = date.toLocaleString("default", { month: "short", year: "numeric" });

      if (!months[key]) {
        months[key] = { name: label, income: 0, expense: 0 };
      }

      if (t.type === "income") months[key].income += t.amount;
      else months[key].expense += t.amount;
    });

    return Object.values(months).sort((a, b) => a.name.localeCompare(b.name));
  };

  const data = getMonthlyData();

  return (
    <div className="bg-gray-800 p-4 rounded-xl mb-6">
      <h2 className="text-lg font-semibold mb-3">📊 Monthly Reports</h2>
      <button
        onClick={() => setShown(!shown)}
        className="bg-cyan-600 hover:bg-cyan-700 text-white font-semibold px-4 py-2 rounded-lg w-full mb-3"
      >
        {shown ? "Hide Report" : "View Monthly Report"}
      </button>
      {shown && (
        <>
          {data.length === 0 ? (
            <p className="text-gray-400 text-sm text-center">No data yet! Add transactions to see monthly report.</p>
          ) : (
            <>
              <ResponsiveContainer width="100%" height={250}>
                <BarChart data={data}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                  <XAxis dataKey="name" stroke="#9ca3af" />
                  <YAxis stroke="#9ca3af" />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "#1f2937",
                      border: "none",
                      borderRadius: "8px",
                      color: "#fff",
                    }}
                  />
                  <Legend />
                  <Bar dataKey="income" fill="#22c55e" radius={[4, 4, 0, 0]} name="Income" />
                  <Bar dataKey="expense" fill="#ef4444" radius={[4, 4, 0, 0]} name="Expense" />
                </BarChart>
              </ResponsiveContainer>

              {/* Monthly Summary Table */}
              <div className="mt-4 flex flex-col gap-2">
                {data.map((month) => (
                  <div key={month.name} className="bg-gray-700 p-3 rounded-lg">
                    <div className="flex justify-between items-center">
                      <p className="font-medium">{month.name}</p>
                      <p className={`font-bold ${month.income - month.expense >= 0 ? "text-green-400" : "text-red-400"}`}>
                        ₹{(month.income - month.expense).toLocaleString()}
                      </p>
                    </div>
                    <div className="flex justify-between text-xs text-gray-400 mt-1">
                      <span>Income: ₹{month.income.toLocaleString()}</span>
                      <span>Expense: ₹{month.expense.toLocaleString()}</span>
                    </div>
                  </div>
                ))}
              </div>
            </>
          )}
        </>
      )}
    </div>
  );
}