"use client";
import { useState } from "react";

const NEWS = [
  { title: "RBI keeps repo rate unchanged at 6.5%", category: "Economy", time: "2h ago", emoji: "🏦" },
  { title: "Sensex crosses 75,000 mark for first time", category: "Markets", time: "3h ago", emoji: "📈" },
  { title: "Gold prices rise amid global uncertainty", category: "Commodities", time: "4h ago", emoji: "🥇" },
  { title: "Mutual fund SIP inflows hit record high", category: "Investment", time: "5h ago", emoji: "💰" },
  { title: "UPI transactions cross 10 billion in a month", category: "Fintech", time: "6h ago", emoji: "📱" },
  { title: "IT sector shows strong quarterly results", category: "Stocks", time: "7h ago", emoji: "💻" },
  { title: "Rupee strengthens against US dollar", category: "Forex", time: "8h ago", emoji: "💵" },
  { title: "New tax rules for crypto investments", category: "Tax", time: "9h ago", emoji: "₿" },
];

export default function NewsFeed() {
  const [shown, setShown] = useState(false);

  return (
    <div className="bg-gray-800 p-4 rounded-xl mb-6">
      <h2 className="text-lg font-semibold mb-3">📰 Financial News</h2>
      <button
        onClick={() => setShown(!shown)}
        className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-4 py-2 rounded-lg w-full mb-3"
      >
        {shown ? "Hide News" : "View Latest News"}
      </button>
      {shown && (
        <div className="flex flex-col gap-2">
          {NEWS.map((news, i) => (
            <div key={i} className="bg-gray-700 p-3 rounded-xl flex gap-3 items-start">
              <span className="text-2xl">{news.emoji}</span>
              <div className="flex-1">
                <p className="text-sm font-medium">{news.title}</p>
                <div className="flex gap-2 mt-1">
                  <span className="text-xs bg-gray-600 px-2 py-0.5 rounded-lg text-blue-400">{news.category}</span>
                  <span className="text-xs text-gray-500">{news.time}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}