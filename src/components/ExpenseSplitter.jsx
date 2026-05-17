"use client";
import { useState } from "react";

export default function ExpenseSplitter() {
  const [friends, setFriends] = useState(["You", "Friend 1", "Friend 2"]);
  const [expenses, setExpenses] = useState([
    { id: 1, title: "Dinner", amount: 1500, paidBy: "You" },
    { id: 2, title: "Movie", amount: 900, paidBy: "Friend 1" },
  ]);
  const [title, setTitle] = useState("");
  const [amount, setAmount] = useState("");
  const [paidBy, setPaidBy] = useState("You");
  const [newFriend, setNewFriend] = useState("");
  const [shown, setShown] = useState(false);

  const totalExpense = expenses.reduce((a, b) => a + b.amount, 0);
  const perPerson = friends.length > 0 ? totalExpense / friends.length : 0;

  const getBalance = (person) => {
    const paid = expenses.filter((e) => e.paidBy === person).reduce((a, b) => a + b.amount, 0);
    return paid - perPerson;
  };

  const handleAddExpense = () => {
    if (!title || !amount) return;
    setExpenses([...expenses, { id: Date.now(), title, amount: parseFloat(amount), paidBy }]);
    setTitle(""); setAmount("");
  };

  const handleAddFriend = () => {
    if (!newFriend) return;
    setFriends([...friends, newFriend]);
    setNewFriend("");
  };

  return (
    <div className="bg-gray-800 p-4 rounded-xl mb-6">
      <h2 className="text-lg font-semibold mb-3">💵 Expense Splitter</h2>
      <button
        onClick={() => setShown(!shown)}
        className="bg-pink-600 hover:bg-pink-700 text-white font-semibold px-4 py-2 rounded-lg w-full mb-3"
      >
        {shown ? "Hide Splitter" : "Split Expenses"}
      </button>
      {shown && (
        <>
          {/* Friends */}
          <div className="flex gap-2 flex-wrap mb-3">
            {friends.map((f) => (
              <span key={f} className="bg-gray-700 px-3 py-1 rounded-full text-sm">{f}</span>
            ))}
          </div>
          <div className="flex gap-2 mb-3">
            <input className="bg-gray-700 p-2 rounded-lg outline-none text-sm flex-1" placeholder="Add friend name" value={newFriend} onChange={(e) => setNewFriend(e.target.value)} />
            <button onClick={handleAddFriend} className="bg-gray-600 text-white px-3 py-2 rounded-lg text-sm">Add</button>
          </div>

          {/* Add Expense */}
          <div className="flex flex-col gap-2 mb-3">
            <input className="bg-gray-700 p-2 rounded-lg outline-none text-sm" placeholder="Expense Title" value={title} onChange={(e) => setTitle(e.target.value)} />
            <input className="bg-gray-700 p-2 rounded-lg outline-none text-sm" placeholder="Amount (₹)" type="number" value={amount} onChange={(e) => setAmount(e.target.value)} />
            <select className="bg-gray-700 p-2 rounded-lg outline-none text-sm" value={paidBy} onChange={(e) => setPaidBy(e.target.value)}>
              {friends.map((f) => <option key={f} value={f}>{f} paid</option>)}
            </select>
            <button onClick={handleAddExpense} className="bg-pink-600 hover:bg-pink-700 text-white font-semibold px-4 py-2 rounded-lg">+ Add Expense</button>
          </div>

          {/* Summary */}
          <div className="bg-gray-700 p-3 rounded-xl mb-3">
            <p className="text-sm font-semibold mb-2">💰 Settlement Summary</p>
            <p className="text-xs text-gray-400 mb-2">Each person owes: ₹{perPerson.toFixed(0)}</p>
            {friends.map((f) => {
              const bal = getBalance(f);
              return (
                <div key={f} className="flex justify-between items-center py-1">
                  <p className="text-sm">{f}</p>
                  <p className={`text-sm font-bold ${bal >= 0 ? "text-green-400" : "text-red-400"}`}>
                    {bal >= 0 ? `gets back ₹${bal.toFixed(0)}` : `owes ₹${Math.abs(bal).toFixed(0)}`}
                  </p>
                </div>
              );
            })}
          </div>

          {/* Expense List */}
          <div className="flex flex-col gap-2">
            {expenses.map((e) => (
              <div key={e.id} className="flex justify-between items-center bg-gray-700 p-2 rounded-lg">
                <div>
                  <p className="text-sm font-medium">{e.title}</p>
                  <p className="text-xs text-gray-400">Paid by {e.paidBy}</p>
                </div>
                <p className="font-bold text-pink-400">₹{e.amount}</p>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
}