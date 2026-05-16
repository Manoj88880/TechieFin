"use client";
import { useState } from "react";

const RATES = {
  INR: 1,
  USD: 0.012,
  EUR: 0.011,
  GBP: 0.0095,
  JPY: 1.79,
  AED: 0.044,
  SGD: 0.016,
  AUD: 0.018,
  CAD: 0.016,
};

export default function CurrencyConverter() {
  const [amount, setAmount] = useState("");
  const [from, setFrom] = useState("INR");
  const [to, setTo] = useState("USD");
  const [result, setResult] = useState(null);

  const convert = () => {
    if (!amount) return;
    const inINR = parseFloat(amount) / RATES[from];
    const converted = inINR * RATES[to];
    setResult(converted.toFixed(4));
  };

  return (
    <div className="bg-gray-800 p-4 rounded-xl mb-6">
      <h2 className="text-lg font-semibold mb-3">🌍 Currency Converter</h2>
      <div className="flex flex-col gap-3">
        <input
          className="bg-gray-700 p-2 rounded-lg outline-none"
          placeholder="Amount"
          type="number"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
        />
        <div className="grid grid-cols-2 gap-2">
          <div>
            <p className="text-xs text-gray-400 mb-1">From</p>
            <select
              className="bg-gray-700 p-2 rounded-lg outline-none w-full"
              value={from}
              onChange={(e) => setFrom(e.target.value)}
            >
              {Object.keys(RATES).map((currency) => (
                <option key={currency} value={currency}>{currency}</option>
              ))}
            </select>
          </div>
          <div>
            <p className="text-xs text-gray-400 mb-1">To</p>
            <select
              className="bg-gray-700 p-2 rounded-lg outline-none w-full"
              value={to}
              onChange={(e) => setTo(e.target.value)}
            >
              {Object.keys(RATES).map((currency) => (
                <option key={currency} value={currency}>{currency}</option>
              ))}
            </select>
          </div>
        </div>
        <button
          onClick={convert}
          className="bg-teal-600 hover:bg-teal-700 text-white font-semibold px-4 py-2 rounded-lg"
        >
          Convert
        </button>
        {result && (
          <div className="bg-gray-700 p-4 rounded-xl text-center">
            <p className="text-gray-400 text-sm">Result</p>
            <p className="text-3xl font-bold text-teal-400">
              {result} {to}
            </p>
            <p className="text-gray-400 text-xs mt-1">
              {amount} {from} = {result} {to}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}