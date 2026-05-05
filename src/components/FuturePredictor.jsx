"use client";
import { useState } from "react";

export default function FuturePredictor({ transactions }) {
  const [shown, setShown] = useState(false);

  const predict = () => {
    const income = transactions
      .filter((t) => t.type === "income")
      .reduce((a, b) => a + b.amount, 0);

    const expense = transactions
      .filter((t) => t.type === "expense")
      .reduce((a, b) => a + b.amount, 0);

    const balance = income - expense;
    const savingPerMonth = balance;

    return {
      oneMonth: balance + savingPerMonth,
      threeMonths: balance + savingPerMonth * 3,
      sixMonths: balance + savingPerMonth * 6,
      oneYear: balance + savingPerMonth * 12,
    };
  };

  const prediction = predict();

  const getColor = (amount) => {
    if (amount > 0) return "text-green-400";
    if (amount === 0) return "text-yellow-400";
    return "text-red-400";
  };

  return (
    <div className="bg-gray-800 p-4 rounded-xl mb-6">
      <h2 className="text-lg font-semibold mb-3">🔮 Future Balance Predictor</h2>
      <button
        onClick={() => setShown(!shown)}
        className="bg-pink-600 hover:bg-pink-700 text-white font-semibold px-4 py-2 rounded-lg w-full mb-3"
      >
        {shown ? "Hide Prediction" : "Predict My Future Balance"}
      </button>
      {shown && (
        <div className="grid grid-cols-2 gap-3">
          <div className="bg-gray-700 p-3 rounded-xl text-center">
            <p className="text-xs text-gray-400 mb-1">After 1 Month</p>
            <p className={`text-xl font-bold ${getColor(prediction.oneMonth)}`}>
              ₹{prediction.oneMonth.toFixed(0)}
            </p>
          </div>
          <div className="bg-gray-700 p-3 rounded-xl text-center">
            <p className="text-xs text-gray-400 mb-1">After 3 Months</p>
            <p className={`text-xl font-bold ${getColor(prediction.threeMonths)}`}>
              ₹{prediction.threeMonths.toFixed(0)}
            </p>
          </div>
          <div className="bg-gray-700 p-3 rounded-xl text-center">
            <p className="text-xs text-gray-400 mb-1">After 6 Months</p>
            <p className={`text-xl font-bold ${getColor(prediction.sixMonths)}`}>
              ₹{prediction.sixMonths.toFixed(0)}
            </p>
          </div>
          <div className="bg-gray-700 p-3 rounded-xl text-center">
            <p className="text-xs text-gray-400 mb-1">After 1 Year</p>
            <p className={`text-xl font-bold ${getColor(prediction.oneYear)}`}>
              ₹{prediction.oneYear.toFixed(0)}
            </p>
          </div>
        </div>
      )}
    </div>
  );
}