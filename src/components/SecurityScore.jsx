"use client";
import { useState } from "react";

export default function SecurityScore({ transactions }) {
  const [shown, setShown] = useState(false);
  const [answers, setAnswers] = useState({
    insurance: false,
    emergency: false,
    retirement: false,
    debt: false,
    diversified: false,
  });

  const income = transactions.filter((t) => t.type === "income").reduce((a, b) => a + b.amount, 0);
  const expense = transactions.filter((t) => t.type === "expense").reduce((a, b) => a + b.amount, 0);
  const balance = income - expense;
  const savingRate = income > 0 ? ((balance / income) * 100) : 0;

  const calculateScore = () => {
    let score = 0;
    if (savingRate >= 20) score += 20;
    else if (savingRate >= 10) score += 10;
    if (balance > expense * 3) score += 20;
    else if (balance > expense) score += 10;
    if (answers.insurance) score += 15;
    if (answers.emergency) score += 15;
    if (answers.retirement) score += 15;
    if (answers.debt) score += 10;
    if (answers.diversified) score += 5;
    return score;
  };

  const score = calculateScore();
  const getGrade = () => {
    if (score >= 80) return { grade: "A", color: "text-green-400", msg: "🛡️ Highly Secure!" };
    if (score >= 60) return { grade: "B", color: "text-blue-400", msg: "🔒 Moderately Secure" };
    if (score >= 40) return { grade: "C", color: "text-yellow-400", msg: "⚠️ Needs Improvement" };
    return { grade: "D", color: "text-red-400", msg: "🚨 Financial Risk!" };
  };

  const { grade, color, msg } = getGrade();

  const questions = [
    { key: "insurance", label: "Do you have health & life insurance?" },
    { key: "emergency", label: "Do you have 6 months emergency fund?" },
    { key: "retirement", label: "Are you investing for retirement?" },
    { key: "debt", label: "Are you debt free or managing debt well?" },
    { key: "diversified", label: "Is your portfolio diversified?" },
  ];

  return (
    <div className="bg-gray-800 p-4 rounded-xl mb-6">
      <h2 className="text-lg font-semibold mb-3">🔒 Financial Security Score</h2>
      <button
        onClick={() => setShown(!shown)}
        className="bg-red-700 hover:bg-red-800 text-white font-semibold px-4 py-2 rounded-lg w-full mb-3"
      >
        {shown ? "Hide Score" : "Check Security Score"}
      </button>
      {shown && (
        <>
          <div className="flex flex-col gap-2 mb-4">
            {questions.map((q) => (
              <div
                key={q.key}
                onClick={() => setAnswers({ ...answers, [q.key]: !answers[q.key] })}
                className={`flex items-center gap-3 p-3 rounded-xl cursor-pointer ${
                  answers[q.key] ? "bg-green-900" : "bg-gray-700"
                }`}
              >
                <span>{answers[q.key] ? "✅" : "⬜"}</span>
                <p className="text-sm">{q.label}</p>
              </div>
            ))}
          </div>
          <div className="flex flex-col items-center gap-2 bg-gray-700 p-4 rounded-xl">
            <p className={`text-6xl font-bold ${color}`}>{score}</p>
            <p className={`text-2xl font-bold ${color}`}>Grade: {grade}</p>
            <p className={`${color}`}>{msg}</p>
            <div className="w-full bg-gray-600 rounded-full h-3 mt-2">
              <div
                className="bg-red-500 h-3 rounded-full transition-all duration-500"
                style={{ width: `${score}%` }}
              ></div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}