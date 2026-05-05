"use client";
import { useState } from "react";

export default function AIAdvice({ transactions }) {
  const [advice, setAdvice] = useState([]);
  const [shown, setShown] = useState(false);

  const getAdvice = () => {
    const income = transactions
      .filter((t) => t.type === "income")
      .reduce((a, b) => a + b.amount, 0);

    const expense = transactions
      .filter((t) => t.type === "expense")
      .reduce((a, b) => a + b.amount, 0);

    const balance = income - expense;
    const savingRate = income > 0 ? ((balance / income) * 100).toFixed(1) : 0;
    const tips = [];

    if (savingRate < 0) {
      tips.push("🚨 You are spending more than you earn! Cut unnecessary expenses immediately.");
    } else if (savingRate < 20) {
      tips.push(`💡 Your saving rate is ${savingRate}%. Try to save at least 20% of your income.`);
    } else {
      tips.push(`✅ Great job! You are saving ${savingRate}% of your income. Keep it up!`);
    }

    if (expense > income * 0.8) {
      tips.push("⚠️ Your expenses are more than 80% of your income. Try to reduce spending on non-essentials.");
    } else if (expense > income * 0.5) {
      tips.push("📊 Your expenses are between 50-80% of income. Look for areas to cut back.");
    } else {
      tips.push("🎯 Your expenses are well under control. Consider investing your extra savings!");
    }

    const expenseCount = transactions.filter((t) => t.type === "expense").length;
    if (expenseCount > 10) {
      tips.push("🛒 You have many expense transactions. Track your daily spending to find patterns.");
    } else if (balance > 0) {
      tips.push(`💰 You have ₹${balance} left. Consider putting it in a savings account or investment!`);
    } else {
      tips.push("📝 Add more transactions to get better financial insights!");
    }

    setAdvice(tips);
    setShown(true);
  };

  return (
    <div className="bg-gray-800 p-4 rounded-xl mb-6">
      <h2 className="text-lg font-semibold mb-3">🤖 Smart Spending Advice</h2>
      <button
        onClick={getAdvice}
        className="bg-purple-600 hover:bg-purple-700 text-white font-semibold px-4 py-2 rounded-lg w-full mb-3"
      >
        Get Smart Advice
      </button>
      {shown && (
        <ul className="flex flex-col gap-2">
          {advice.map((tip, index) => (
            <li
              key={index}
              className="bg-gray-700 p-3 rounded-lg text-sm text-gray-200"
            >
              {tip}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}