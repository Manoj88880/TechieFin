"use client";
import { useState } from "react";

const CARBON_RATES = {
  Food: 2.5, Travel: 5.0, Shopping: 1.5,
  Entertainment: 0.5, Health: 0.3, Education: 0.2,
  Rent: 1.0, Other: 1.0,
};

export default function CarbonFootprint({ transactions }) {
  const [shown, setShown] = useState(false);

  const expenses = transactions.filter((t) => t.type === "expense");
  const totalCarbon = expenses.reduce((total, t) => {
    const rate = CARBON_RATES[t.category] || 1.0;
    return total + (t.amount / 1000) * rate;
  }, 0);

  const getCategoryCarbon = () => {
    const cats = {};
    expenses.forEach((t) => {
      const cat = t.category || "Other";
      const rate = CARBON_RATES[cat] || 1.0;
      cats[cat] = (cats[cat] || 0) + (t.amount / 1000) * rate;
    });
    return Object.entries(cats).sort((a, b) => b[1] - a[1]);
  };

  const getGrade = () => {
    if (totalCarbon < 10) return { grade: "A", color: "text-green-400", msg: "🌱 Eco Champion!" };
    if (totalCarbon < 25) return { grade: "B", color: "text-blue-400", msg: "♻️ Eco Friendly!" };
    if (totalCarbon < 50) return { grade: "C", color: "text-yellow-400", msg: "⚠️ Average Impact" };
    return { grade: "D", color: "text-red-400", msg: "🔥 High Impact!" };
  };

  const { grade, color, msg } = getGrade();
  const categoryData = getCategoryCarbon();

  return (
    <div className="bg-gray-800 p-4 rounded-xl mb-6">
      <h2 className="text-lg font-semibold mb-3">🌍 Carbon Footprint</h2>
      <button
        onClick={() => setShown(!shown)}
        className="bg-green-700 hover:bg-green-800 text-white font-semibold px-4 py-2 rounded-lg w-full mb-3"
      >
        {shown ? "Hide Carbon Report" : "View Carbon Footprint"}
      </button>
      {shown && (
        <>
          <div className="bg-gray-700 p-4 rounded-xl text-center mb-3">
            <p className="text-xs text-gray-400 mb-1">Total Carbon Footprint</p>
            <p className={`text-4xl font-bold ${color}`}>{totalCarbon.toFixed(1)}</p>
            <p className="text-gray-400 text-sm">kg CO₂ equivalent</p>
            <p className={`font-bold mt-1 ${color}`}>{msg}</p>
          </div>
          <div className="flex flex-col gap-2">
            {categoryData.map(([cat, carbon]) => (
              <div key={cat} className="bg-gray-700 p-2 rounded-lg flex justify-between items-center">
                <p className="text-sm">{cat}</p>
                <p className="text-green-400 font-bold text-sm">{carbon.toFixed(2)} kg CO₂</p>
              </div>
            ))}
          </div>
          <p className="text-xs text-gray-500 mt-3">💡 Tip: Reduce travel and food expenses to lower your carbon footprint!</p>
        </>
      )}
    </div>
  );
}