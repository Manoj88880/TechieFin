"use client";
import { useState } from "react";
import { db } from "@/lib/firebase";
import { doc, deleteDoc, updateDoc } from "firebase/firestore";

const categoryEmoji = {
  Salary: "💼", Freelance: "💻", Investment: "📈", Gift: "🎁",
  Food: "🍔", Rent: "🏠", Travel: "✈️", Shopping: "🛒",
  Entertainment: "🎬", Health: "💊", Education: "📚", Other: "📝",
};

const CATEGORIES = {
  income: ["Salary", "Freelance", "Investment", "Gift", "Other"],
  expense: ["Food", "Rent", "Travel", "Shopping", "Entertainment", "Health", "Education", "Other"],
};

export default function TransactionList({ transactions, onDelete }) {
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("all");
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [editId, setEditId] = useState(null);
  const [editTitle, setEditTitle] = useState("");
  const [editAmount, setEditAmount] = useState("");
  const [editType, setEditType] = useState("");
  const [editCategory, setEditCategory] = useState("");

  const handleDelete = async (id) => {
    await deleteDoc(doc(db, "transactions", id));
    onDelete();
  };

  const handleEdit = (t) => {
    setEditId(t.id);
    setEditTitle(t.title);
    setEditAmount(t.amount);
    setEditType(t.type);
    setEditCategory(t.category || "Other");
  };

  const handleUpdate = async () => {
    if (!editTitle || !editAmount) return;
    await updateDoc(doc(db, "transactions", editId), {
      title: editTitle,
      amount: parseFloat(editAmount),
      type: editType,
      category: editCategory,
    });
    setEditId(null);
    onDelete();
  };

  const categories = ["all", ...new Set(transactions.map((t) => t.category || "Other"))];

  const filtered = transactions.filter((t) => {
    const matchSearch = t.title.toLowerCase().includes(search.toLowerCase());
    const matchType = filter === "all" || t.type === filter;
    const matchCategory = categoryFilter === "all" || t.category === categoryFilter;
    return matchSearch && matchType && matchCategory;
  });

  return (
    <div className="bg-gray-800 p-4 rounded-xl">
      <h2 className="text-lg font-semibold mb-3">📋 Transactions</h2>

      {/* Search */}
      <input
        className="bg-gray-700 p-2 rounded-lg outline-none w-full mb-2"
        placeholder="🔍 Search transactions..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      {/* Filters */}
      <div className="flex gap-2 mb-3 flex-wrap">
        {["all", "income", "expense"].map((f) => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className={`px-3 py-1 rounded-lg text-xs font-semibold capitalize ${
              filter === f ? "bg-blue-600 text-white" : "bg-gray-700 text-gray-400"
            }`}
          >
            {f}
          </button>
        ))}
      </div>

      {/* Category Filter */}
      <select
        className="bg-gray-700 p-2 rounded-lg outline-none w-full mb-3 text-sm"
        value={categoryFilter}
        onChange={(e) => setCategoryFilter(e.target.value)}
      >
        {categories.map((cat) => (
          <option key={cat} value={cat}>{cat === "all" ? "All Categories" : cat}</option>
        ))}
      </select>

      {/* Results Count */}
      <p className="text-xs text-gray-400 mb-2">{filtered.length} transactions found</p>

      {filtered.length === 0 && (
        <p className="text-gray-400">No transactions found!</p>
      )}
      <ul className="flex flex-col gap-2">
        {filtered.map((t) => (
          <li key={t.id} className="bg-gray-700 p-3 rounded-lg">
            {editId === t.id ? (
              /* Edit Mode */
              <div className="flex flex-col gap-2">
                <input
                  className="bg-gray-600 p-2 rounded-lg outline-none text-sm"
                  value={editTitle}
                  onChange={(e) => setEditTitle(e.target.value)}
                />
                <input
                  className="bg-gray-600 p-2 rounded-lg outline-none text-sm"
                  type="number"
                  value={editAmount}
                  onChange={(e) => setEditAmount(e.target.value)}
                />
                <select
                  className="bg-gray-600 p-2 rounded-lg outline-none text-sm"
                  value={editType}
                  onChange={(e) => {
                    setEditType(e.target.value);
                    setEditCategory(CATEGORIES[e.target.value][0]);
                  }}
                >
                  <option value="income">Income</option>
                  <option value="expense">Expense</option>
                </select>
                <select
                  className="bg-gray-600 p-2 rounded-lg outline-none text-sm"
                  value={editCategory}
                  onChange={(e) => setEditCategory(e.target.value)}
                >
                  {CATEGORIES[editType].map((cat) => (
                    <option key={cat} value={cat}>{cat}</option>
                  ))}
                </select>
                <div className="flex gap-2">
                  <button
                    onClick={handleUpdate}
                    className="bg-green-600 hover:bg-green-700 text-white text-xs px-3 py-1 rounded-lg flex-1"
                  >
                    ✅ Save
                  </button>
                  <button
                    onClick={() => setEditId(null)}
                    className="bg-gray-600 hover:bg-gray-700 text-white text-xs px-3 py-1 rounded-lg flex-1"
                  >
                    ❌ Cancel
                  </button>
                </div>
              </div>
            ) : (
              /* View Mode */
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-2">
                  <span className="text-2xl">{categoryEmoji[t.category] || "📝"}</span>
                  <div>
                    <p className="font-medium">{t.title}</p>
                    <p className="text-xs text-gray-400">
                      {t.category} • {t.date?.toDate().toLocaleDateString()}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <span className={`font-bold ${t.type === "income" ? "text-green-400" : "text-red-400"}`}>
                    {t.type === "income" ? "+" : "-"}₹{t.amount}
                  </span>
                  <button
                    onClick={() => handleEdit(t)}
                    className="bg-blue-600 hover:bg-blue-700 text-white text-xs px-2 py-1 rounded-lg"
                  >
                    ✏️
                  </button>
                  <button
                    onClick={() => handleDelete(t.id)}
                    className="bg-red-600 hover:bg-red-700 text-white text-xs px-2 py-1 rounded-lg"
                  >
                    🗑️
                  </button>
                </div>
              </div>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}