"use client";
import { useState } from "react";

export default function CashbackTracker() {
  const [rewards, setRewards] = useState([
    { id: 1, source: "💳 HDFC Credit Card", amount: 500, date: "2024-01-15" },
    { id: 2, source: "📱 Google Pay", amount: 200, date: "2024-01-20" },
    { id: 3, source: "🛒 Amazon", amount: 150, date: "2024-01-25" },
  ]);
  const [source, setSource] = useState("");
  const [amount, setAmount] = useState("");
  const [showAdd, setShowAdd] = useState(false);

  const total = rewards.reduce((a, b) => a + b.amount, 0);

  const handleAdd = () => {
    if (!source || !amount) return;
    setRewards([...rewards, {
      id: Date.now(),
      source,
      amount: parseFloat(amount),
      date: new Date().toISOString().split("T")[0],
    }]);
    setSource("");
    setAmount("");
    setShowAdd(false);
  };

  return (
    <div className="bg-gray-800 p-4 rounded-xl mb-6">
      <h2 className="text-lg font-semibold mb-3">💸 Cashback & Rewards</h2>
      <div
        className="p-3 rounded-xl text-center mb-3"
        style={{ background: "linear-gradient(135deg, #f59e0b, #ef4444)" }}
      >
        <p className="text-sm text-yellow-100">Total Rewards Earned</p>
        <p className="text-2xl font-bold text-white">₹{total.toLocaleString()}</p>
      </div>
      <div className="flex flex-col gap-2 mb-3">
        {rewards.map((r) => (
          <div key={r.id} className="flex justify-between items-center bg-gray-700 p-2 rounded-lg">
            <div>
              <p className="text-sm font-medium">{r.source}</p>
              <p className="text-xs text-gray-400">{r.date}</p>
            </div>
            <div className="flex items-center gap-2">
              <p className="text-yellow-400 font-bold">₹{r.amount}</p>
              <button
                onClick={() => setRewards(rewards.filter((x) => x.id !== r.id))}
                className="text-red-400 text-xs"
              >🗑️</button>
            </div>
          </div>
        ))}
      </div>
      {showAdd ? (
        <div className="flex flex-col gap-2">
          <input
            className="bg-gray-700 p-2 rounded-lg outline-none text-sm"
            placeholder="Source (e.g. 💳 HDFC Card)"
            value={source}
            onChange={(e) => setSource(e.target.value)}
          />
          <input
            className="bg-gray-700 p-2 rounded-lg outline-none text-sm"
            placeholder="Amount (₹)"
            type="number"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
          />
          <div className="flex gap-2">
            <button onClick={handleAdd} className="bg-yellow-600 hover:bg-yellow-700 text-white font-semibold px-4 py-2 rounded-lg flex-1">Add</button>
            <button onClick={() => setShowAdd(false)} className="bg-gray-600 hover:bg-gray-700 text-white font-semibold px-4 py-2 rounded-lg flex-1">Cancel</button>
          </div>
        </div>
      ) : (
        <button onClick={() => setShowAdd(true)} className="bg-yellow-600 hover:bg-yellow-700 text-white font-semibold px-4 py-2 rounded-lg w-full">
          + Add Reward
        </button>
      )}
    </div>
  );
}