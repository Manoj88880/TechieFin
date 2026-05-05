"use client";
import { useState } from "react";

export default function SavingsChallenge() {
  const [selected, setSelected] = useState(null);
  const [progress, setProgress] = useState({});

  const challenges = [
    {
      id: 1,
      title: "No Spend Weekend",
      description: "Spend ₹0 this weekend!",
      emoji: "🚫",
      days: 2,
      reward: "Save ₹500-2000",
    },
    {
      id: 2,
      title: "Coffee Save Challenge",
      description: "Skip coffee for 7 days!",
      emoji: "☕",
      days: 7,
      reward: "Save ₹700-1400",
    },
    {
      id: 3,
      title: "30 Day Saving Challenge",
      description: "Save ₹100 every day for 30 days!",
      emoji: "💰",
      days: 30,
      reward: "Save ₹3000",
    },
    {
      id: 4,
      title: "Cooking at Home",
      description: "Cook at home for 14 days straight!",
      emoji: "🍳",
      days: 14,
      reward: "Save ₹2000-5000",
    },
  ];

  const toggleDay = (challengeId, day) => {
    const key = `${challengeId}-${day}`;
    setProgress((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const getCompletedDays = (challengeId, totalDays) => {
    return Array.from({ length: totalDays }, (_, i) => i + 1).filter(
      (day) => progress[`${challengeId}-${day}`]
    ).length;
  };

  return (
    <div className="bg-gray-800 p-4 rounded-xl mb-6">
      <h2 className="text-lg font-semibold mb-3">🏆 Savings Challenges</h2>
      <div className="flex flex-col gap-3">
        {challenges.map((c) => {
          const completed = getCompletedDays(c.id, c.days);
          const percent = Math.round((completed / c.days) * 100);
          return (
            <div key={c.id} className="bg-gray-700 p-3 rounded-xl">
              <div
                className="flex justify-between items-center cursor-pointer"
                onClick={() => setSelected(selected === c.id ? null : c.id)}
              >
                <div className="flex items-center gap-2">
                  <span className="text-2xl">{c.emoji}</span>
                  <div>
                    <p className="font-medium text-sm">{c.title}</p>
                    <p className="text-xs text-gray-400">{c.reward}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-sm font-bold text-yellow-400">{percent}%</p>
                  <p className="text-xs text-gray-400">{completed}/{c.days} days</p>
                </div>
              </div>
              <div className="w-full bg-gray-600 rounded-full h-2 mt-2">
                <div
                  className="bg-yellow-400 h-2 rounded-full transition-all duration-300"
                  style={{ width: `${percent}%` }}
                ></div>
              </div>
              {selected === c.id && (
                <div className="mt-3">
                  <p className="text-xs text-gray-400 mb-2">{c.description}</p>
                  <div className="flex flex-wrap gap-1">
                    {Array.from({ length: c.days }, (_, i) => i + 1).map((day) => (
                      <button
                        key={day}
                        onClick={() => toggleDay(c.id, day)}
                        className={`w-7 h-7 rounded-lg text-xs font-bold transition-all ${
                          progress[`${c.id}-${day}`]
                            ? "bg-yellow-400 text-gray-900"
                            : "bg-gray-600 text-gray-400"
                        }`}
                      >
                        {day}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}