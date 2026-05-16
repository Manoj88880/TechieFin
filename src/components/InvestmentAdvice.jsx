"use client";
import { useState } from "react";

export default function InvestmentAdvice({ transactions }) {
  const [shown, setShown] = useState(false);

  const income = transactions.filter((t) => t.type === "income").reduce((a, b) => a + b.amount, 0);
  const expense = transactions.filter((t) => t.type === "expense").reduce((a, b) => a + b.amount, 0);
  const balance = income - expense;
  const savingRate = income > 0 ? ((balance / income) * 100) : 0;

  const getRecommendations = () => {
    const recs = [];

    if (balance <= 0) {
      return [{
        title: "⚠️ Focus on Savings First",
        desc: "You need to reduce expenses before investing. Try to save at least ₹1000/month first.",
        risk: "No Risk",
        color: "border-red-500",
      }];
    }

    if (balance < 5000) {
      recs.push({
        title: "🏦 Fixed Deposit (FD)",
        desc: "Safe investment with 6-7% returns. Perfect for small amounts. Start with ₹1000.",
        risk: "Low Risk",
        color: "border-green-500",
        returns: "6-7% p.a.",
      });
      recs.push({
        title: "💰 Recurring Deposit (RD)",
        desc: "Save a fixed amount monthly and earn interest. Great for beginners.",
        risk: "Low Risk",
        color: "border-green-500",
        returns: "5-6% p.a.",
      });
    }

    if (balance >= 5000) {
      recs.push({
        title: "📈 SIP - Mutual Funds",
        desc: `Start a SIP of ₹${Math.floor(balance * 0.3).toLocaleString()}/month. Long term wealth creation.`,
        risk: "Medium Risk",
        color: "border-yellow-500",
        returns: "12-15% p.a.",
      });
      recs.push({
        title: "🏛️ PPF Account",
        desc: "Public Provident Fund - tax free returns. Lock in period of 15 years.",
        risk: "Low Risk",
        color: "border-green-500",
        returns: "7.1% p.a.",
      });
    }

    if (balance >= 20000 && savingRate >= 20) {
      recs.push({
        title: "📊 Index Funds (Nifty 50)",
        desc: "Invest in top 50 Indian companies. Low cost, high returns over long term.",
        risk: "Medium Risk",
        color: "border-yellow-500",
        returns: "12-15% p.a.",
      });
      recs.push({
        title: "🏠 Real Estate REITs",
        desc: "Invest in real estate without buying property. Regular dividend income.",
        risk: "Medium Risk",
        color: "border-yellow-500",
        returns: "8-10% p.a.",
      });
    }

    if (balance >= 50000 && savingRate >= 30) {
      recs.push({
        title: "₿ Crypto (Small %)",
        desc: "Invest only 5-10% of savings in crypto. High risk but high reward.",
        risk: "High Risk",
        color: "border-red-500",
        returns: "Variable",
      });
      recs.push({
        title: "📱 Direct Stocks",
        desc: "Research and invest in individual company stocks for higher returns.",
        risk: "High Risk",
        color: "border-red-500",
        returns: "15-25% p.a.",
      });
    }

    return recs;
  };

  const recommendations = getRecommendations();

  return (
    <div className="bg-gray-800 p-4 rounded-xl mb-6">
      <h2 className="text-lg font-semibold mb-3">💹 Investment Recommendations</h2>
      <button
        onClick={() => setShown(!shown)}
        className="bg-emerald-600 hover:bg-emerald-700 text-white font-semibold px-4 py-2 rounded-lg w-full mb-3"
      >
        {shown ? "Hide Recommendations" : "Get Investment Advice"}
      </button>
      {shown && (
        <>
          <div className="bg-gray-700 p-3 rounded-xl mb-3 text-sm">
            <p className="text-gray-400">Based on your finances:</p>
            <p>💰 Available to invest: <span className="text-green-400 font-bold">₹{balance.toLocaleString()}</span></p>
            <p>📊 Saving rate: <span className="text-blue-400 font-bold">{savingRate.toFixed(1)}%</span></p>
          </div>
          <div className="flex flex-col gap-3">
            {recommendations.map((rec, i) => (
              <div key={i} className={`bg-gray-700 p-3 rounded-xl border-l-4 ${rec.color}`}>
                <div className="flex justify-between items-start mb-1">
                  <p className="font-semibold text-sm">{rec.title}</p>
                  {rec.returns && (
                    <span className="text-xs bg-gray-600 px-2 py-1 rounded-lg text-green-400">
                      {rec.returns}
                    </span>
                  )}
                </div>
                <p className="text-xs text-gray-400 mb-1">{rec.desc}</p>
                <span className={`text-xs px-2 py-1 rounded-lg ${
                  rec.risk === "Low Risk" ? "bg-green-900 text-green-400" :
                  rec.risk === "Medium Risk" ? "bg-yellow-900 text-yellow-400" :
                  rec.risk === "High Risk" ? "bg-red-900 text-red-400" :
                  "bg-gray-600 text-gray-400"
                }`}>
                  {rec.risk}
                </span>
              </div>
            ))}
          </div>
          <p className="text-xs text-gray-500 mt-3">⚠️ This is for educational purposes only. Consult a financial advisor before investing.</p>
        </>
      )}
    </div>
  );
}