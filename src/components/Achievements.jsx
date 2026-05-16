"use client";
import { useState } from "react";

export default function Achievements({ transactions }) {
  const [shown, setShown] = useState(false);

  const income = transactions.filter((t) => t.type === "income").reduce((a, b) => a + b.amount, 0);
  const expense = transactions.filter((t) => t.type === "expense").reduce((a, b) => a + b.amount, 0);
  const balance = income - expense;
  const savingRate = income > 0 ? ((balance / income) * 100) : 0;

  const achievements = [
    {
      id: 1,
      emoji: "🌱",
      title: "First Step",
      desc: "Add your first transaction",
      unlocked: transactions.length >= 1,
    },
    {
      id: 2,
      emoji: "📊",
      title: "Data Lover",
      desc: "Add 10 transactions",
      unlocked: transactions.length >= 10,
    },
    {
      id: 3,
      emoji: "💰",
      title: "Saver",
      desc: "Save more than you spend",
      unlocked: balance > 0,
    },
    {
      id: 4,
      emoji: "🏆",
      title: "Super Saver",
      desc: "Save rate above 30%",
      unlocked: savingRate >= 30,
    },
    {
      id: 5,
      emoji: "💎",
      title: "Rich Mind",
      desc: "Balance above ₹50,000",
      unlocked: balance >= 50000,
    },
    {
      id: 6,
      emoji: "🔥",
      title: "On Fire",
      desc: "Add 20+ transactions",
      unlocked: transactions.length >= 20,
    },
    {
      id: 7,
      emoji: "🎯",
      title: "Budget Master",
      desc: "Expenses less than 50% of income",
      unlocked: income > 0 && expense < income * 0.5,
    },
    {
      id: 8,
      emoji: "👑",
      title: "Finance King",
      desc: "Balance above ₹1,00,000",
      unlocked: balance >= 100000,
    },
  ];

  const unlocked = achievements.filter((a) => a.unlocked).length;

  return (
    <div className="bg-gray-800 p-4 rounded-xl mb-6">
      <h2 className="text-lg font-semibold mb-3">🏅 Achievements</h2>
      <div className="flex justify-between items-center mb-3">
        <p className="text-sm text-gray-400">{unlocked}/{achievements.length} unlocked</p>
        <button
          onClick={() => setShown(!shown)}
          className="bg-yellow-600 hover:bg-yellow-700 text-white text-xs px-3 py-1 rounded-lg"
        >
          {shown ? "Hide" : "View All"}
        </button>
      </div>
      {/* Progress Bar */}
      <div className="w-full bg-gray-700 rounded-full h-3 mb-3">
        <div
          className="bg-yellow-400 h-3 rounded-full transition-all duration-500"
          style={{ width: `${(unlocked / achievements.length) * 100}%` }}
        ></div>
      </div>
      {shown && (
        <div className="grid grid-cols-2 gap-2">
          {achievements.map((a) => (
            <div
              key={a.id}
              className={`p-3 rounded-xl text-center ${
                a.unlocked ? "bg-yellow-900 border border-yellow-500" : "bg-gray-700 opacity-50"
              }`}
            >
              <p className="text-3xl mb-1">{a.emoji}</p>
              <p className="text-sm font-bold">{a.title}</p>
              <p className="text-xs text-gray-400">{a.desc}</p>
              {a.unlocked && <p className="text-xs text-yellow-400 mt-1">✅ Unlocked!</p>}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}