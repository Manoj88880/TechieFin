"use client";
import { useState } from "react";
import { db } from "@/lib/firebase";
import { collection, addDoc, Timestamp } from "firebase/firestore";

const CATEGORIES = {
  income: ["Salary", "Freelance", "Investment", "Gift", "Other"],
  expense: ["Food", "Rent", "Travel", "Shopping", "Entertainment", "Health", "Education", "Other"],
};

export default function RecurringTransactions({ user, onAdd }) {
  const [recurring, setRecurring] = useState([
    { id: 1, title: "Salary", amount: 50000, type: "income", category: "Salary", frequency: "Monthly" },
    { id: 2, title: "Rent", amount: 10000, type: "expense", category: "Rent", frequency: "Monthly" },
  ]);
  const [showAdd, setShowAdd] = useState(false);
  const [title, setTitle] = useState("");
  const [amount, setAmount] = useState("");
  const [type, setType] = useState("income");
  const [category, setCategory] = useState("Salary");
  const [frequency, setFrequency] = useState("Monthly");

  const handleAdd = () => {
    if (!title || !amount) return;
    setRecurring([...recurring, {
      id: Date.now(),
      title,
      amount: parseFloat(amount),
      type,
      category,
      frequency,
    }]);
    setTitle("");
    setAmount("");
    setShowAdd(false);
  };

  const handleDelete = (id) => {
    setRecurring(recurring.filter((r) => r.id !== id));
  };

  const handleApply = async (r) => {
    if (!user) return;
    try {
      await addDoc(collection(db, "transactions"), {
        title: r.title,
        amount: r.amount,
        type: r.type,
        category: r.category,
        userId: user.uid,
        date: Timestamp.now(),
      });
      onAdd();
      alert(`✅ ${r.title} added to transactions!`);
    } catch (error) {
      console.error("Error:", error.message);
    }
  };

  return (
    <div className="bg-gray-800 p-4 rounded-xl mb-6">
      <h2 className="text-lg font-semibold mb-3">🔄 Recurring Transactions</h2>
      <div className="flex flex-col gap-2 mb-3">
        {recurring.map((r) => (
          <div key={r.id} className="bg-gray-700 p-3 rounded-lg flex justify-between items-center">
            <div>
              <p className="font-medium">{r.title}</p>
              <p className="text-xs text-gray-400">{r.frequency} • {r.category}</p>
            </div>
            <div className="flex items-center gap-2">
              <span className={`font-bold ${r.type === "income" ? "text-green-400" : "text-red-400"}`}>
                {r.type === "income" ? "+" : "-"}₹{r.amount}
              </span>
              <button
                onClick={() => handleApply(r)}
                className="bg-green-600 hover:bg-green-700 text-white text-xs px-2 py-1 rounded-lg"
              >
                ➕
              </button>
              <button
                onClick={() => handleDelete(r.id)}
                className="bg-red-600 hover:bg-red-700 text-white text-xs px-2 py-1 rounded-lg"
              >
                🗑️
              </button>
            </div>
          </div>
        ))}
      </div>
      {showAdd ? (
        <div className="flex flex-col gap-2">
          <input
            className="bg-gray-700 p-2 rounded-lg outline-none"
            placeholder="Title (e.g. Netflix)"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <input
            className="bg-gray-700 p-2 rounded-lg outline-none"
            placeholder="Amount (₹)"
            type="number"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
          />
          <select
            className="bg-gray-700 p-2 rounded-lg outline-none"
            value={type}
            onChange={(e) => {
              setType(e.target.value);
              setCategory(CATEGORIES[e.target.value][0]);
            }}
          >
            <option value="income">Income</option>
            <option value="expense">Expense</option>
          </select>
          <select
            className="bg-gray-700 p-2 rounded-lg outline-none"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          >
            {CATEGORIES[type].map((cat) => (
              <option key={cat} value={cat}>{cat}</option>
            ))}
          </select>
          <select
            className="bg-gray-700 p-2 rounded-lg outline-none"
            value={frequency}
            onChange={(e) => setFrequency(e.target.value)}
          >
            <option value="Daily">Daily</option>
            <option value="Weekly">Weekly</option>
            <option value="Monthly">Monthly</option>
            <option value="Yearly">Yearly</option>
          </select>
          <div className="flex gap-2">
            <button
              onClick={handleAdd}
              className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-4 py-2 rounded-lg flex-1"
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
          className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-4 py-2 rounded-lg w-full"
        >
          + Add Recurring
        </button>
      )}
    </div>
  );
}