"use client";
import { useState } from "react";

const MARKETS = [
  { name: "Sensex", value: "74,572", change: "+0.82%", positive: true, emoji: "🇮🇳" },
  { name: "Nifty 50", value: "22,604", change: "+0.79%", positive: true, emoji: "🇮🇳" },
  { name: "Dow Jones", value: "38,996", change: "-0.12%", positive: false, emoji: "🇺🇸" },
  { name: "NASDAQ", value: "16,248", change: "+0.54%", positive: true, emoji: "🇺🇸" },
  { name: "Gold", value: "₹72,450/10g", change: "+0.35%", positive: true, emoji: "🥇" },
  { name: "Silver", value: "₹85,200/kg", change: "-0.22%", positive: false, emoji: "🥈" },
  { name: "Crude Oil", value: "$82.4/barrel", change: "+1.2%", positive: true, emoji: "🛢️" },
  { name: "Bitcoin", value: "$67,234", change: "+2.4%", positive: true, emoji: "₿" },
  { name: "USD/INR", value: "₹83.45", change: "+0.05%", positive: false, emoji: "💵" },
  { name: "EUR/INR", value: "₹89.72", change: "-0.15%", positive: false, emoji: "💶" },
];

export default function MarketOverview() {
  const [shown, setShown] = useState(false);

  return (
    <div className="bg-gray-800 p-4 rounded-xl mb-6">
      <h2 className="text-lg font-semibold mb-3">🌏 Global Market Overview</h2>
      <button
        onClick={() => setShown(!shown)}
        className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-4 py-2 rounded-lg w-full mb-3"
      >
        {shown ? "Hide Markets" : "View Markets"}
      </button>
      {shown && (
        <>
          <p className="text-xs text-gray-400 mb-2">⚠️ Indicative prices for educational purposes</p>
          <div className="flex flex-col gap-2">
            {MARKETS.map((market) => (
              <div key={market.name} className="flex justify-between items-center bg-gray-700 p-3 rounded-xl">
                <div className="flex items-center gap-2">
                  <span className="text-xl">{market.emoji}</span>
                  <p className="font-medium text-sm">{market.name}</p>
                </div>
                <div className="text-right">
                  <p className="font-bold text-sm">{market.value}</p>
                  <p className={`text-xs font-bold ${market.positive ? "text-green-400" : "text-red-400"}`}>
                    {market.change}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
}