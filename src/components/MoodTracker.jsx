"use client";
import { useState } from "react";

export default function MoodTracker() {
  const [mood, setMood] = useState(null);
  const [tip, setTip] = useState("");

  const moods = [
    { emoji: "😊", label: "Happy", tip: "Great mood! Perfect time to review your savings goals and investments!" },
    { emoji: "😐", label: "Neutral", tip: "Feeling neutral? Avoid impulse purchases today and stick to your budget!" },
    { emoji: "😢", label: "Sad", tip: "Feeling sad? Avoid emotional spending! Try free activities to cheer up instead." },
    { emoji: "😠", label: "Angry", tip: "Feeling angry? Step away from shopping apps! Anger leads to regret purchases." },
    { emoji: "😰", label: "Stressed", tip: "Stressed? Avoid big financial decisions today. Take a break and relax first!" },
  ];

  const handleMood = (m) => {
    setMood(m.emoji);
    setTip(m.tip);
  };

  return (
    <div className="bg-gray-800 p-4 rounded-xl mb-6">
      <h2 className="text-lg font-semibold mb-3">😊 Mood Spending Tracker</h2>
      <p className="text-gray-400 text-sm mb-3">How are you feeling today?</p>
      <div className="flex justify-between gap-2 mb-3">
        {moods.map((m) => (
          <button
            key={m.emoji}
            onClick={() => handleMood(m)}
            className={`flex flex-col items-center p-2 rounded-xl flex-1 transition-all ${
              mood === m.emoji
                ? "bg-yellow-600 text-white"
                : "bg-gray-700 hover:bg-gray-600"
            }`}
          >
            <span className="text-2xl">{m.emoji}</span>
            <span className="text-xs mt-1">{m.label}</span>
          </button>
        ))}
      </div>
      {tip && (
        <div className="bg-gray-700 p-3 rounded-xl text-sm text-gray-200">
          💡 {tip}
        </div>
      )}
    </div>
  );
}