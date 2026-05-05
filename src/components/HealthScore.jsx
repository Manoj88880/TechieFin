"use client";
import { useState } from "react";

export default function HealthScore({ transactions }) {
  const [shown, setShown] = useState(false);

  const calculateScore = () => {
    const income = transactions
      .filter((t) => t.type === "income")
      .reduce((a, b) => a + b.amount, 0);

    const expense = transactions
      .filter((t) => t.type === "expense")
      .reduce((a, b) => a + b.amount, 0);

    const balance = income - expense;
    const savingRate = income > 0 ? (balance / income) * 100 : 0;

    let score = 0;

    // Saving rate score (max 40 points)
    if (savingRate >= 30) score += 40;
    else if (savingRate >= 20) score += 30;
    else if (savingRate >= 10) score += 20;
    else if (savingRate >= 0) score += 10;
    else score += 0;

    // Balance score (max 30 points)
    if (balance > 10000) score += 30;
    else if (balance > 5000) score += 20;
    else if (balance > 0) score += 10;
    else score += 0;

    // Transaction count score (max 30 points)
    const txCount = transactions.length;
    if (txCount >= 10) score += 30;
    else if (txCount >= 5) score += 20;
    else if (txCount >= 1) score += 10;

    return score;
  };

  const score = calculateScore();

  const getGrade = () => {
    if (score >= 80) return { grade: "A", color: "text-green-400", msg: "Excellent! 🌟" };
    if (score >= 60) return { grade: "B", color: "text-blue-400", msg: "Good Job! 👍" };
    if (score >= 40) return { grade: "C", color: "text-yellow-400", msg: "Needs Improvement 📈" };
    return { grade: "D", color: "text-red-400", msg: "Take Action Now! 🚨" };
  };

  const { grade, color, msg } = getGrade();

  return (
    <div className="bg-gray-800 p-4 rounded-xl mb-6">
      <h2 className="text-lg font-semibold mb-3">🎯 Financial Health Score</h2>
      <button
        onClick={() => setShown(!shown)}
        className="bg-indigo-600 hover:bg-indigo-700 text-white font-semibold px-4 py-2 rounded-lg w-full mb-3"
      >
        {shown ? "Hide Score" : "Check My Score"}
      </button>
      {shown && (
        <div className="flex flex-col items-center gap-2">
          <div className={`text-7xl font-bold ${color}`}>{score}</div>
          <div className={`text-3xl font-bold ${color}`}>Grade: {grade}</div>
          <div className="text-gray-300 text-sm">{msg}</div>
          <div className="w-full bg-gray-700 rounded-full h-4 mt-2">
            <div
              className="bg-indigo-500 h-4 rounded-full transition-all duration-500"
              style={{ width: `${score}%` }}
            ></div>
          </div>
          <p className="text-xs text-gray-400">Score based on saving rate, balance & activity</p>
        </div>
      )}
    </div>
  );
}