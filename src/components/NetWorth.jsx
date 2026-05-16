"use client";
import { useState } from "react";

export default function NetWorth() {
  const [assets, setAssets] = useState([
    { id: 1, name: "🏠 Home", value: 5000000 },
    { id: 2, name: "🚗 Car", value: 500000 },
    { id: 3, name: "💰 Savings", value: 100000 },
  ]);
  const [liabilities, setLiabilities] = useState([
    { id: 1, name: "🏦 Home Loan", value: 3000000 },
    { id: 2, name: "💳 Credit Card", value: 50000 },
  ]);
  const [newName, setNewName] = useState("");
  const [newValue, setNewValue] = useState("");
  const [addType, setAddType] = useState("asset");
  const [shown, setShown] = useState(false);

  const totalAssets = assets.reduce((a, b) => a + b.value, 0);
  const totalLiabilities = liabilities.reduce((a, b) => a + b.value, 0);
  const netWorth = totalAssets - totalLiabilities;

  const handleAdd = () => {
    if (!newName || !newValue) return;
    const item = { id: Date.now(), name: newName, value: parseFloat(newValue) };
    if (addType === "asset") setAssets([...assets, item]);
    else setLiabilities([...liabilities, item]);
    setNewName("");
    setNewValue("");
  };

  const deleteAsset = (id) => setAssets(assets.filter((a) => a.id !== id));
  const deleteLiability = (id) => setLiabilities(liabilities.filter((l) => l.id !== id));

  return (
    <div className="bg-gray-800 p-4 rounded-xl mb-6">
      <h2 className="text-lg font-semibold mb-3">💳 Net Worth Tracker</h2>
      <button
        onClick={() => setShown(!shown)}
        className="bg-emerald-600 hover:bg-emerald-700 text-white font-semibold px-4 py-2 rounded-lg w-full mb-3"
      >
        {shown ? "Hide" : "View Net Worth"}
      </button>
      {shown && (
        <>
          {/* Net Worth Summary */}
          <div
            className="p-4 rounded-xl text-center mb-4"
            style={{ background: netWorth >= 0 ? "linear-gradient(135deg, #059669, #10b981)" : "linear-gradient(135deg, #dc2626, #ef4444)" }}
          >
            <p className="text-sm text-green-100">Your Net Worth</p>
            <p className="text-3xl font-bold text-white">₹{netWorth.toLocaleString()}</p>
          </div>

          {/* Assets */}
          <div className="mb-3">
            <p className="text-sm font-semibold text-green-400 mb-2">Assets (₹{totalAssets.toLocaleString()})</p>
            {assets.map((a) => (
              <div key={a.id} className="flex justify-between items-center bg-gray-700 p-2 rounded-lg mb-1">
                <p className="text-sm">{a.name}</p>
                <div className="flex items-center gap-2">
                  <p className="text-green-400 font-bold text-sm">₹{a.value.toLocaleString()}</p>
                  <button onClick={() => deleteAsset(a.id)} className="text-red-400 text-xs">🗑️</button>
                </div>
              </div>
            ))}
          </div>

          {/* Liabilities */}
          <div className="mb-3">
            <p className="text-sm font-semibold text-red-400 mb-2">Liabilities (₹{totalLiabilities.toLocaleString()})</p>
            {liabilities.map((l) => (
              <div key={l.id} className="flex justify-between items-center bg-gray-700 p-2 rounded-lg mb-1">
                <p className="text-sm">{l.name}</p>
                <div className="flex items-center gap-2">
                  <p className="text-red-400 font-bold text-sm">₹{l.value.toLocaleString()}</p>
                  <button onClick={() => deleteLiability(l.id)} className="text-red-400 text-xs">🗑️</button>
                </div>
              </div>
            ))}
          </div>

          {/* Add New */}
          <div className="flex flex-col gap-2">
            <select
              className="bg-gray-700 p-2 rounded-lg outline-none text-sm"
              value={addType}
              onChange={(e) => setAddType(e.target.value)}
            >
              <option value="asset">Add Asset</option>
              <option value="liability">Add Liability</option>
            </select>
            <input
              className="bg-gray-700 p-2 rounded-lg outline-none text-sm"
              placeholder="Name (e.g. 💰 Gold)"
              value={newName}
              onChange={(e) => setNewName(e.target.value)}
            />
            <input
              className="bg-gray-700 p-2 rounded-lg outline-none text-sm"
              placeholder="Value (₹)"
              type="number"
              value={newValue}
              onChange={(e) => setNewValue(e.target.value)}
            />
            <button
              onClick={handleAdd}
              className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-4 py-2 rounded-lg"
            >
              + Add
            </button>
          </div>
        </>
      )}
    </div>
  );
}