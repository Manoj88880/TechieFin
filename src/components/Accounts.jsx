"use client";
import { useState } from "react";

const ACCOUNT_TYPES = ["💳 Current", "🏦 Savings", "💵 Cash", "📱 UPI", "💼 Investment"];

export default function Accounts({ transactions }) {
  const [accounts, setAccounts] = useState([
    { id: 1, name: "💳 Current", balance: 0 },
    { id: 2, name: "🏦 Savings", balance: 0 },
    { id: 3, name: "💵 Cash", balance: 0 },
  ]);
  const [showAdd, setShowAdd] = useState(false);
  const [newAccount, setNewAccount] = useState("");
  const [newBalance, setNewBalance] = useState("");

  const totalBalance = accounts.reduce((a, b) => a + b.balance, 0);

  const handleAdd = () => {
    if (!newAccount || !newBalance) return;
    setAccounts([...accounts, {
      id: Date.now(),
      name: newAccount,
      balance: parseFloat(newBalance),
    }]);
    setNewAccount("");
    setNewBalance("");
    setShowAdd(false);
  };

  const handleDelete = (id) => {
    setAccounts(accounts.filter((a) => a.id !== id));
  };

  return (
    <div className="bg-gray-800 p-4 rounded-xl mb-6">
      <h2 className="text-lg font-semibold mb-3">🏦 My Accounts</h2>
      
      {/* Total Balance */}
      <div className="bg-indigo-900 p-3 rounded-xl mb-3 text-center">
        <p className="text-xs text-indigo-300">Total Across All Accounts</p>
        <p className="text-2xl font-bold text-white">₹{totalBalance.toLocaleString()}</p>
      </div>

      {/* Account List */}
      <div className="flex flex-col gap-2 mb-3">
        {accounts.map((account) => (
          <div
            key={account.id}
            className="flex justify-between items-center bg-gray-700 p-3 rounded-lg"
          >
            <p className="font-medium">{account.name}</p>
            <div className="flex items-center gap-2">
              <p className="text-green-400 font-bold">₹{account.balance.toLocaleString()}</p>
              <button
                onClick={() => handleDelete(account.id)}
                className="bg-red-600 hover:bg-red-700 text-white text-xs px-2 py-1 rounded-lg"
              >
                🗑️
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Add Account */}
      {showAdd ? (
        <div className="flex flex-col gap-2">
          <select
            className="bg-gray-700 p-2 rounded-lg outline-none"
            value={newAccount}
            onChange={(e) => setNewAccount(e.target.value)}
          >
            <option value="">Select Account Type</option>
            {ACCOUNT_TYPES.map((type) => (
              <option key={type} value={type}>{type}</option>
            ))}
          </select>
          <input
            className="bg-gray-700 p-2 rounded-lg outline-none"
            placeholder="Current Balance (₹)"
            type="number"
            value={newBalance}
            onChange={(e) => setNewBalance(e.target.value)}
          />
          <div className="flex gap-2">
            <button
              onClick={handleAdd}
              className="bg-green-600 hover:bg-green-700 text-white font-semibold px-4 py-2 rounded-lg flex-1"
            >
              Add
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
          className="bg-indigo-600 hover:bg-indigo-700 text-white font-semibold px-4 py-2 rounded-lg w-full"
        >
          + Add Account
        </button>
      )}
    </div>
  );
}