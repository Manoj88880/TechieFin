"use client";
import { useState } from "react";

export default function TaxCalculator() {
  const [income, setIncome] = useState("");
  const [regime, setRegime] = useState("new");
  const [result, setResult] = useState(null);

  const calculateTax = () => {
    if (!income) return;
    const ann = parseFloat(income);
    let tax = 0;

    if (regime === "new") {
      if (ann <= 300000) tax = 0;
      else if (ann <= 600000) tax = (ann - 300000) * 0.05;
      else if (ann <= 900000) tax = 15000 + (ann - 600000) * 0.10;
      else if (ann <= 1200000) tax = 45000 + (ann - 900000) * 0.15;
      else if (ann <= 1500000) tax = 90000 + (ann - 1200000) * 0.20;
      else tax = 150000 + (ann - 1500000) * 0.30;
    } else {
      if (ann <= 250000) tax = 0;
      else if (ann <= 500000) tax = (ann - 250000) * 0.05;
      else if (ann <= 1000000) tax = 12500 + (ann - 500000) * 0.20;
      else tax = 112500 + (ann - 1000000) * 0.30;
    }

    const cess = tax * 0.04;
    const total = tax + cess;
    const monthly = total / 12;
    const effective = ((total / ann) * 100).toFixed(2);

    setResult({ tax, cess, total, monthly, effective });
  };

  return (
    <div className="bg-gray-800 p-4 rounded-xl mb-6">
      <h2 className="text-lg font-semibold mb-3">💱 Income Tax Calculator</h2>
      <div className="flex flex-col gap-3">
        <input
          className="bg-gray-700 p-2 rounded-lg outline-none"
          placeholder="Annual Income (₹)"
          type="number"
          value={income}
          onChange={(e) => setIncome(e.target.value)}
        />
        <select
          className="bg-gray-700 p-2 rounded-lg outline-none"
          value={regime}
          onChange={(e) => setRegime(e.target.value)}
        >
          <option value="new">New Tax Regime (2024)</option>
          <option value="old">Old Tax Regime</option>
        </select>
        <button
          onClick={calculateTax}
          className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-4 py-2 rounded-lg"
        >
          Calculate Tax
        </button>
        {result && (
          <div className="grid grid-cols-2 gap-2">
            <div className="bg-gray-700 p-3 rounded-xl text-center">
              <p className="text-xs text-gray-400">Base Tax</p>
              <p className="text-lg font-bold text-red-400">₹{result.tax.toFixed(0)}</p>
            </div>
            <div className="bg-gray-700 p-3 rounded-xl text-center">
              <p className="text-xs text-gray-400">Cess (4%)</p>
              <p className="text-lg font-bold text-orange-400">₹{result.cess.toFixed(0)}</p>
            </div>
            <div className="bg-gray-700 p-3 rounded-xl text-center">
              <p className="text-xs text-gray-400">Total Tax</p>
              <p className="text-lg font-bold text-red-400">₹{result.total.toFixed(0)}</p>
            </div>
            <div className="bg-gray-700 p-3 rounded-xl text-center">
              <p className="text-xs text-gray-400">Monthly Tax</p>
              <p className="text-lg font-bold text-yellow-400">₹{result.monthly.toFixed(0)}</p>
            </div>
            <div className="bg-gray-700 p-3 rounded-xl text-center col-span-2">
              <p className="text-xs text-gray-400">Effective Tax Rate</p>
              <p className="text-2xl font-bold text-purple-400">{result.effective}%</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}