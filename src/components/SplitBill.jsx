"use client";
import { useState } from "react";

export default function SplitBill() {
  const [amount, setAmount] = useState("");
  const [people, setPeople] = useState("");
  const [result, setResult] = useState(null);

  const calculate = () => {
    if (!amount || !people || people < 2) return;
    const perPerson = parseFloat(amount) / parseInt(people);
    setResult(perPerson);
  };

  return (
    <div className="bg-gray-800 p-4 rounded-xl mb-6">
      <h2 className="text-lg font-semibold mb-3">🧾 Split Bill</h2>
      <div className="flex flex-col gap-3">
        <input
          className="bg-gray-700 p-2 rounded-lg outline-none"
          placeholder="Total Bill Amount (₹)"
          type="number"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
        />
        <input
          className="bg-gray-700 p-2 rounded-lg outline-none"
          placeholder="Number of People"
          type="number"
          value={people}
          onChange={(e) => setPeople(e.target.value)}
        />
        <button
          onClick={calculate}
          className="bg-orange-600 hover:bg-orange-700 text-white font-semibold px-4 py-2 rounded-lg"
        >
          Calculate Split
        </button>
        {result && (
          <div className="bg-gray-700 p-4 rounded-xl text-center">
            <p className="text-gray-400 text-sm">Each Person Pays</p>
            <p className="text-3xl font-bold text-orange-400">
              ₹{result.toFixed(2)}
            </p>
            <p className="text-gray-400 text-xs mt-1">
              {amount} ÷ {people} people
            </p>
          </div>
        )}
      </div>
    </div>
  );
}