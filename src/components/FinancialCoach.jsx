"use client";
import { useState } from "react";

const COACHING_PLANS = {
  beginner: {
    title: "🌱 Beginner Plan",
    color: "border-green-500",
    steps: [
      { week: 1, task: "Track every expense for 7 days", done: false },
      { week: 2, task: "Create your first monthly budget", done: false },
      { week: 3, task: "Open a savings account", done: false },
      { week: 4, task: "Set up auto-transfer of 10% income to savings", done: false },
      { week: 5, task: "Learn about FDs and RDs", done: false },
      { week: 6, task: "Start a SIP of ₹500/month", done: false },
    ],
  },
  intermediate: {
    title: "📈 Intermediate Plan",
    color: "border-yellow-500",
    steps: [
      { week: 1, task: "Review and optimize your budget", done: false },
      { week: 2, task: "Build 3-month emergency fund", done: false },
      { week: 3, task: "Increase SIP to 20% of income", done: false },
      { week: 4, task: "Learn about index funds", done: false },
      { week: 5, task: "Review your insurance coverage", done: false },
      { week: 6, task: "Start investing in PPF or NPS", done: false },
    ],
  },
  advanced: {
    title: "🏆 Advanced Plan",
    color: "border-purple-500",
    steps: [
      { week: 1, task: "Diversify portfolio across asset classes", done: false },
      { week: 2, task: "Research direct stock investments", done: false },
      { week: 3, task: "Optimize tax saving investments", done: false },
      { week: 4, task: "Consider real estate or REITs", done: false },
      { week: 5, task: "Review and rebalance portfolio", done: false },
      { week: 6, task: "Plan for financial independence", done: false },
    ],
  },
};

export default function FinancialCoach({ transactions }) {
  const [shown, setShown] = useState(false);
  const [progress, setProgress] = useState({});

  const income = transactions.filter((t) => t.type === "income").reduce((a, b) => a + b.amount, 0);
  const expense = transactions.filter((t) => t.type === "expense").reduce((a, b) => a + b.amount, 0);
  const savingRate = income > 0 ? ((income - expense) / income) * 100 : 0;

  const getLevel = () => {
    if (savingRate >= 30 && transactions.length >= 10) return "advanced";
    if (savingRate >= 10 && transactions.length >= 5) return "intermediate";
    return "beginner";
  };

  const level = getLevel();
  const plan = COACHING_PLANS[level];

  const toggleStep = (index) => {
    const key = `${level}-${index}`;
    setProgress((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const completedSteps = plan.steps.filter((_, i) => progress[`${level}-${i}`]).length;

  return (
    <div className="bg-gray-800 p-4 rounded-xl mb-6">
      <h2 className="text-lg font-semibold mb-3">🧠 AI Financial Coach</h2>
      <button
        onClick={() => setShown(!shown)}
        className="bg-violet-600 hover:bg-violet-700 text-white font-semibold px-4 py-2 rounded-lg w-full mb-3"
      >
        {shown ? "Hide Coach" : "Get Coaching Plan"}
      </button>
      {shown && (
        <>
          <div className={`bg-gray-700 p-3 rounded-xl border-l-4 ${plan.color} mb-3`}>
            <p className="font-bold">{plan.title}</p>
            <p className="text-xs text-gray-400">Based on your saving rate of {savingRate.toFixed(1)}%</p>
            <div className="w-full bg-gray-600 rounded-full h-2 mt-2">
              <div
                className="bg-violet-500 h-2 rounded-full"
                style={{ width: `${(completedSteps / plan.steps.length) * 100}%` }}
              ></div>
            </div>
            <p className="text-xs text-gray-400 mt-1">{completedSteps}/{plan.steps.length} tasks completed</p>
          </div>
          <div className="flex flex-col gap-2">
            {plan.steps.map((step, i) => (
              <div
                key={i}
                onClick={() => toggleStep(i)}
                className={`flex items-center gap-3 p-3 rounded-xl cursor-pointer ${
                  progress[`${level}-${i}`] ? "bg-violet-900" : "bg-gray-700"
                }`}
              >
                <span className="text-xl">{progress[`${level}-${i}`] ? "✅" : "⬜"}</span>
                <div>
                  <p className="text-xs text-gray-400">Week {step.week}</p>
                  <p className={`text-sm ${progress[`${level}-${i}`] ? "line-through text-gray-500" : ""}`}>
                    {step.task}
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