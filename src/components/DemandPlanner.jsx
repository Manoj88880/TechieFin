"use client";
import { useState } from "react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

export default function DemandPlanner() {
  const [products, setProducts] = useState([
    { id: 1, name: "Product A", jan: 100, feb: 120, mar: 150, apr: 130 },
    { id: 2, name: "Product B", jan: 200, feb: 180, mar: 220, apr: 250 },
  ]);
  const [shown, setShown] = useState(false);
  const [selected, setSelected] = useState(0);

  const getChartData = (product) => [
    { month: "Jan", demand: product.jan },
    { month: "Feb", demand: product.feb },
    { month: "Mar", demand: product.mar },
    { month: "Apr", demand: product.apr },
  ];

  const getTrend = (product) => {
    const avg = (product.jan + product.feb + product.mar + product.apr) / 4;
    const last = product.apr;
    if (last > avg * 1.1) return { text: "📈 High Demand", color: "text-green-400" };
    if (last < avg * 0.9) return { text: "📉 Low Demand", color: "text-red-400" };
    return { text: "➡️ Stable Demand", color: "text-yellow-400" };
  };

  return (
    <div className="bg-gray-800 p-4 rounded-xl mb-6">
      <h2 className="text-lg font-semibold mb-3">📦 Demand Planner</h2>
      <button
        onClick={() => setShown(!shown)}
        className="bg-purple-600 hover:bg-purple-700 text-white font-semibold px-4 py-2 rounded-lg w-full mb-3"
      >
        {shown ? "Hide Planner" : "View Demand Planner"}
      </button>
      {shown && (
        <>
          <div className="flex gap-2 mb-3 flex-wrap">
            {products.map((p, i) => (
              <button
                key={p.id}
                onClick={() => setSelected(i)}
                className={`px-3 py-1 rounded-lg text-sm font-semibold ${selected === i ? "bg-purple-600 text-white" : "bg-gray-700 text-gray-400"}`}
              >
                {p.name}
              </button>
            ))}
          </div>
          <div className="bg-gray-700 p-3 rounded-xl mb-3">
            <div className="flex justify-between items-center mb-2">
              <p className="font-medium">{products[selected].name}</p>
              <p className={`text-sm font-bold ${getTrend(products[selected]).color}`}>
                {getTrend(products[selected]).text}
              </p>
            </div>
            <ResponsiveContainer width="100%" height={150}>
              <BarChart data={getChartData(products[selected])}>
                <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                <XAxis dataKey="month" stroke="#9ca3af" />
                <YAxis stroke="#9ca3af" />
                <Tooltip contentStyle={{ backgroundColor: "#1f2937", border: "none", borderRadius: "8px", color: "#fff" }} />
                <Bar dataKey="demand" fill="#8b5cf6" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
          <div className="grid grid-cols-4 gap-2">
            {getChartData(products[selected]).map((d) => (
              <div key={d.month} className="bg-gray-700 p-2 rounded-xl text-center">
                <p className="text-xs text-gray-400">{d.month}</p>
                <p className="font-bold text-purple-400">{d.demand}</p>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
}