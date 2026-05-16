"use client";
import { useState } from "react";

export default function GoalTracker() {
  const [goals, setGoals] = useState([
    { id: 1, name: "🏠 Buy a House", target: 500000, saved: 50000 },
    { id: 2, name: "✈️ Europe Trip", target: 100000, saved: 25000 },
  ]);
  const [showAdd, setShowAdd] = useState(false);
  const [name, setName] = useState("");
  const [target, setTarget] = useState("");
  const [saved, setSaved] = useState("");

  const handleAdd = () => {
    if (!name || !target) return;
    setGoals([...goals, {
      id: Date.now(),
      name,
      target: parseFloat(target),
      saved: parseFloat(saved) || 0,
    }]);
    setName("");
    setTarget("");
    setSaved("");
    setShowAdd(false);
  };

  const handleDelete = (id) => {
    setGoals(goals.filter((g) => g.id !== id));
  };

  return (
    <div className="bg-gray-800 p-4 rounded-xl mb-6">
      <h2 className="text-lg font-semibold mb-3">🎯 Goal Tracker</h2>
      <div className="flex flex-col gap-3 mb-3">
        {goals.map((goal) => {
          const percent = Math.min((goal.saved / goal.target) * 100, 100).toFixed(0);
          return (
            <div key={goal.id} className="bg-gray-700 p-3 rounded-xl">
              <div className="flex justify-between items-center mb-2">
                <p className="font-medium">{goal.name}</p>
                <button
                  onClick={() => handleDelete(goal.id)}
                  className="bg-red-600 hover:bg-red-700 text-white text-xs px-2 py-1 rounded-lg"
                >
                  🗑️
                </button>
              </div>
              <div className="flex justify-between text-xs text-gray-400 mb-1">
                <span>₹{goal.saved.toLocaleString()} saved</span>
                <span>₹{goal.target.toLocaleString()} goal</span>
              </div>
              <div className="w-full bg-gray-600 rounded-full h-3">
                <div
                  className="bg-green-500 h-3 rounded-full transition-all duration-500"
                  style={{ width: `${percent}%` }}
                ></div>
              </div>
              <div className="flex justify-between text-xs mt-1">
                <span className="text-green-400">{percent}% complete</span>
                <span className="text-gray-400">₹{(goal.target - goal.saved).toLocaleString()} remaining</span>
              </div>
            </div>
          );
        })}
      </div>
      {showAdd ? (
        <div className="flex flex-col gap-2">
          <input
            className="bg-gray-700 p-2 rounded-lg outline-none"
            placeholder="Goal Name (e.g. 🚗 Buy a Car)"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <input
            className="bg-gray-700 p-2 rounded-lg outline-none"
            placeholder="Target Amount (₹)"
            type="number"
            value={target}
            onChange={(e) => setTarget(e.target.value)}
          />
          <input
            className="bg-gray-700 p-2 rounded-lg outline-none"
            placeholder="Already Saved (₹)"
            type="number"
            value={saved}
            onChange={(e) => setSaved(e.target.value)}
          />
          <div className="flex gap-2">
            <button
              onClick={handleAdd}
              className="bg-green-600 hover:bg-green-700 text-white font-semibold px-4 py-2 rounded-lg flex-1"
            >
              Add Goal
            </button>
            <button
              onClick={() => setShowAdd(false)}
              className="bg-gray-600 hover:bg-gray-700 text-white font-semibold px-4 py-2 rounded-lg flex-1"
            >
              Cancel
            </button>
          </div>
        </div>
      ) : (
        <button
          onClick={() => setShowAdd(true)}
          className="bg-green-600 hover:bg-green-700 text-white font-semibold px-4 py-2 rounded-lg w-full"
        >
          + Add New Goal
        </button>
      )}
    </div>
  );
}