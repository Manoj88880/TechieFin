"use client";
import { useState } from "react";
import { db } from "@/lib/firebase";
import { collection, addDoc, Timestamp } from "firebase/firestore";

const CATEGORIES = {
  income: ["Salary", "Freelance", "Investment", "Gift", "Other"],
  expense: ["Food", "Rent", "Travel", "Shopping", "Entertainment", "Health", "Education", "Other"],
};

export default function AddTransaction({ onAdd, user }) {
  const [title, setTitle] = useState("");
  const [amount, setAmount] = useState("");
  const [type, setType] = useState("income");
  const [category, setCategory] = useState("Salary");

  const handleTypeChange = (newType) => {
    setType(newType);
    setCategory(CATEGORIES[newType][0]);
  };

  const handleSubmit = async () => {
    if (!title || !amount || !user) return;
    const transaction = {
      title,
      amount: parseFloat(amount),
      type,
      category,
      userId: user.uid,
      date: Timestamp.now(),
    };
    try {
      await addDoc(collection(db, "transactions"), transaction);
      setTitle("");
      setAmount("");
      onAdd();
    } catch (error) {
      console.error("Firebase Error:", error.message);
    }
  };

  return (
    <div className="bg-gray-800 p-4 rounded-xl mb-6">
      <h2 className="text-lg font-semibold mb-3">➕ Add Transaction</h2>
      <div className="flex flex-col gap-3">
        <input
          className="bg-gray-700 p-2 rounded-lg outline-none"
          placeholder="Title (e.g. Salary, Rent)"
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
          onChange={(e) => handleTypeChange(e.target.value)}
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
        <button
          onClick={handleSubmit}
          className="bg-blue-600 hover:bg-blue-700 p-2 rounded-lg font-semibold"
        >
          + Add
        </button>
      </div>
    </div>
  );
}