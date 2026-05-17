"use client";
import { useState } from "react";

export default function RiskAnalyzer({ transactions }) {
  const [shown, setShown] = useState(false);

  const income = transactions.filter((t) => t.type === "income").reduce((a, b) => a + b.amount, 0);
  const expense = transactions.filter((t) => t.type === "expense").reduce((a, b) => a + b.amount, 0);
  const balance = income - expense;
  const savingRate = income > 0 ? ((balance / income) * 100) : 0;

  const risks = [
    {
      title: "💸 Overspending Risk",
      level: expense > income ? "High" : expense > income * 0.8 ? "Medium" : "Low",
      desc: expense > income ? "You are spending more than you earn!" : expense > income * 0.8 ? "Your expenses are close to your income." : "Your spending is well controlled.",
    },
    {
      title: "🏦 Emergency Fund Risk",
      level: balance < expense * 3 ? "High" : balance < expense * 6 ? "Medium" : "Low",
      desc: balance < expense * 3 ? "You need a bigger emergency fund!" : balance < expense * 6 ? "Consider building a 6-month emergency fund." : "Your emergency fund looks good!",
    },
    {
      title: "📉 Income Concentration Risk",
      level: transactions.filter((t) => t.type === "income").length <= 1 ? "High" : "Low",
      desc: transactions.filter((t) => t.type === "income").length <= 1 ? "You have only one income source. Consider diversifying!" : "Good! You have multiple income sources.",
    },
    {
      title: "💰 Savings Risk",
      level: savingRate < 10 ? "High" : savingRate < 20 ? "Medium" : "Low",
      desc: savingRate < 10 ? "Your saving rate is too low. Try to save more!" : savingRate < 20 ? "Try to increase saving rate to 20%." : "Great saving rate!",
    },
  ];

  const getRiskColor = (level) => {
    if (level === "High") return "text-red-400 bg-red-900";
    if (level === "Medium") return "text-yellow-400 bg-yellow-900";
    return "text-green-400 bg-green-900";
  };

  return (
    <div className="bg-gray-800 p-4 rounded-xl mb-6">
      <h2 className="text-lg font-semibold mb-3">🎰 Financial Risk Analyzer</h2>
      <button
        onClick={() => setShown(!shown)}
        className="bg-red-600 hover:bg-red-700 text-white font-semibold px-4 py-2 rounded-lg w-full mb-3"
      >
        {shown ? "Hide Analysis" : "Analyze My Risks"}
      </button>
      {shown && (
        <div className="flex flex-col gap-3">
          {risks.map((risk) => (
            <div key={risk.title} className="bg-gray-700 p-3 rounded-xl">
              <div className="flex justify-between items-center mb-1">
                <p className="font-medium text-sm">{risk.title}</p>
                <span className={`text-xs px-2 py-1 rounded-lg font-bold ${getRiskColor(risk.level)}`}>
                  {risk.level}
                </span>
              </div>
              <p className="text-xs text-gray-400">{risk.desc}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}