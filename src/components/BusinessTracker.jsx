"use client";
import { useState } from "react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

export default function BusinessTracker() {
  const [shown, setShown] = useState(false);
  const [revenues, setRevenues] = useState([
    { month: "Oct", revenue: 150000, expenses: 80000 },
    { month: "Nov", revenue: 180000, expenses: 90000 },
    { month: "Dec", revenue: 220000, expenses: 100000 },
    { month: "Jan", revenue: 200000, expenses: 95000 },
  ]);
  const [month, setMonth] = useState("");
  const [revenue, setRevenue] = useState("");
  const [expenses, setExpenses] = useState("");

  const totalRevenue = revenues.reduce((a, b) => a + b.revenue, 0);
  const totalExpenses = revenues.reduce((a, b) => a + b.expenses, 0);
  const totalProfit = totalRevenue - totalExpenses;
  const profitMargin = ((totalProfit / totalRevenue) * 100).toFixed(1);

  const handleAdd = () => {
    if (!month || !revenue || !expenses) return;
    setRevenues([...revenues, {
      month,
      revenue: parseFloat(revenue),
      expenses: parseFloat(expenses),
    }]);
    setMonth(""); setRevenue(""); setExpenses("");
  };

  return (
    <div className="bg-gray-800 p-4 rounded-xl mb-6">
      <h2 className="text-lg font-semibold mb-3">📊 Business Revenue Tracker</h2>
      <button
        onClick={() => setShown(!shown)}
        className="bg-cyan-600 hover:bg-cyan-700 text-white font-semibold px-4 py-2 rounded-lg w-full mb-3"
      >
        {shown ? "Hide" : "View Business Tracker"}
      </button>
      {shown && (
        <>
          <div className="grid grid-cols-3 gap-2 mb-3">
            <div className="bg-gray-700 p-3 rounded-xl text-center">
              <p className="text-xs text-gray-400">Revenue</p>
              <p className="text-sm font-bold text-green-400">₹{(totalRevenue/1000).toFixed(0)}K</p>
            </div>
            <div className="bg-gray-700 p-3 rounded-xl text-center">
              <p className="text-xs text-gray-400">Expenses</p>
              <p className="text-sm font-bold text-red-400">₹{(totalExpenses/1000).toFixed(0)}K</p>
            </div>
            <div className="bg-gray-700 p-3 rounded-xl text-center">
              <p className="text-xs text-gray-400">Profit</p>
              <p className="text-sm font-bold text-cyan-400">₹{(totalProfit/1000).toFixed(0)}K</p>
            </div>
          </div>
          <div className="bg-gray-700 p-3 rounded-xl mb-3 text-center">
            <p className="text-xs text-gray-400">Profit Margin</p>
            <p className="text-2xl font-bold text-cyan-400">{profitMargin}%</p>
          </div>
          <ResponsiveContainer width="100%" height={200}>
            <LineChart data={revenues}>
              <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
              <XAxis dataKey="month" stroke="#9ca3af" />
              <YAxis stroke="#9ca3af" />
              <Tooltip contentStyle={{ backgroundColor: "#1f2937", border: "none", borderRadius: "8px", color: "#fff" }} />
              <Line type="monotone" dataKey="revenue" stroke="#22c55e" strokeWidth={2} />
              <Line type="monotone" dataKey="expenses" stroke="#ef4444" strokeWidth={2} />
            </LineChart>
          </ResponsiveContainer>
          <div className="flex flex-col gap-2 mt-3">
            <div className="grid grid-cols-3 gap-2">
              <input className="bg-gray-700 p-2 rounded-lg outline-none text-sm" placeholder="Month" value={month} onChange={(e) => setMonth(e.target.value)} />
              <input className="bg-gray-700 p-2 rounded-lg outline-none text-sm" placeholder="Revenue" type="number" value={revenue} onChange={(e) => setRevenue(e.target.value)} />
              <input className="bg-gray-700 p-2 rounded-lg outline-none text-sm" placeholder="Expenses" type="number" value={expenses} onChange={(e) => setExpenses(e.target.value)} />
            </div>
            <button onClick={handleAdd} className="bg-cyan-600 hover:bg-cyan-700 text-white font-semibold px-4 py-2 rounded-lg">
              + Add Month
            </button>
          </div>
        </>
      )}
    </div>
  );
}