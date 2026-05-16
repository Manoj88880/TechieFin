"use client";
import { useState } from "react";

export default function EMICalculator() {
  const [principal, setPrincipal] = useState("");
  const [rate, setRate] = useState("");
  const [tenure, setTenure] = useState("");
  const [result, setResult] = useState(null);

  const calculate = () => {
    if (!principal || !rate || !tenure) return;
    const p = parseFloat(principal);
    const r = parseFloat(rate) / 12 / 100;
    const n = parseFloat(tenure);
    const emi = (p * r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1);
    const totalAmount = emi * n;
    const totalInterest = totalAmount - p;
    setResult({ emi, totalAmount, totalInterest });
  };

  return (
    <div className="bg-gray-800 p-4 rounded-xl mb-6">
      <h2 className="text-lg font-semibold mb-3">💳 EMI Calculator</h2>
      <div className="flex flex-col gap-3">
        <input
          className="bg-gray-700 p-2 rounded-lg outline-none"
          placeholder="Loan Amount (₹)"
          type="number"
          value={principal}
          onChange={(e) => setPrincipal(e.target.value)}
        />
        <input
          className="bg-gray-700 p-2 rounded-lg outline-none"
          placeholder="Annual Interest Rate (%)"
          type="number"
          value={rate}
          onChange={(e) => setRate(e.target.value)}
        />
        <input
          className="bg-gray-700 p-2 rounded-lg outline-none"
          placeholder="Tenure (months)"
          type="number"
          value={tenure}
          onChange={(e) => setTenure(e.target.value)}
        />
        <button
          onClick={calculate}
          className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-4 py-2 rounded-lg"
        >
          Calculate EMI
        </button>
        {result && (
          <div className="grid grid-cols-3 gap-2 mt-2">
            <div className="bg-gray-700 p-3 rounded-xl text-center">
              <p className="text-xs text-gray-400 mb-1">Monthly EMI</p>
              <p className="text-lg font-bold text-blue-400">₹{result.emi.toFixed(0)}</p>
            </div>
            <div className="bg-gray-700 p-3 rounded-xl text-center">
              <p className="text-xs text-gray-400 mb-1">Total Amount</p>
              <p className="text-lg font-bold text-yellow-400">₹{result.totalAmount.toFixed(0)}</p>
            </div>
            <div className="bg-gray-700 p-3 rounded-xl text-center">
              <p className="text-xs text-gray-400 mb-1">Total Interest</p>
              <p className="text-lg font-bold text-red-400">₹{result.totalInterest.toFixed(0)}</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}