"use client";
import { useState } from "react";

export default function AIAdvice({ transactions = [] }) {
  const [advice, setAdvice] = useState([]);
  const [shown, setShown] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const getAdvice = async () => {
    setLoading(true);
    setError(null);
    
    try {
      // Calculate totals safely
      const income = transactions
        .filter((t) => t.type === "income")
        .reduce((a, b) => a + Number(b.amount || 0), 0);

      const expense = transactions
        .filter((t) => t.type === "expense")
        .reduce((a, b) => a + Number(b.amount || 0), 0);

      const balance = income - expense;

      // Fetch AI advice from API
      const response = await fetch("/api/advice", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ income, expense, balance, transactions }),
      });

      if (!response.ok) throw new Error("Failed to fetch advice");

      const data = await response.json();
      const tips = data.advice || [];

      setAdvice(tips);
      setShown(true);
    } catch (err) {
      console.error("Error fetching advice:", err);
      setError("Unable to get advice. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-gray-800 p-4 rounded-xl mb-6">
      <h2 className="text-lg font-semibold mb-3">🤖 Smart Spending Advice</h2>

      <button
        onClick={getAdvice}
        disabled={loading}
        className="bg-purple-600 hover:bg-purple-700 disabled:opacity-50 text-white font-semibold px-4 py-2 rounded-lg w-full mb-3"
      >
        {loading ? "Loading..." : "Get Smart Advice"}
      </button>

      {error && (
        <div className="bg-red-900 text-red-200 p-3 rounded-lg mb-3 text-sm">
          {error}
        </div>
      )}

      {shown && (
        <ul className="flex flex-col gap-2">
          {advice.map((tip, index) => (
            <li
              key={`advice-${index}-${tip.substring(0, 10)}`}
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