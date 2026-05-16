"use client";
import { useState } from "react";

export default function BillReminders() {
  const [bills, setBills] = useState([
    { id: 1, name: "📱 Phone Bill", amount: 499, dueDay: 5, paid: false },
    { id: 2, name: "🌐 Internet", amount: 999, dueDay: 10, paid: false },
    { id: 3, name: "💡 Electricity", amount: 1500, dueDay: 15, paid: false },
  ]);
  const [showAdd, setShowAdd] = useState(false);
  const [name, setName] = useState("");
  const [amount, setAmount] = useState("");
  const [dueDay, setDueDay] = useState("");

  const today = new Date().getDate();

  const handleAdd = () => {
    if (!name || !amount || !dueDay) return;
    setBills([...bills, {
      id: Date.now(),
      name,
      amount: parseFloat(amount),
      dueDay: parseInt(dueDay),
      paid: false,
    }]);
    setName("");
    setAmount("");
    setDueDay("");
    setShowAdd(false);
  };

  const togglePaid = (id) => {
    setBills(bills.map((b) => b.id === id ? { ...b, paid: !b.paid } : b));
  };

  const handleDelete = (id) => {
    setBills(bills.filter((b) => b.id !== id));
  };

  const getDueStatus = (dueDay, paid) => {
    if (paid) return { color: "text-green-400", label: "✅ Paid" };
    const diff = dueDay - today;
    if (diff < 0) return { color: "text-red-400", label: "🚨 Overdue!" };
    if (diff === 0) return { color: "text-red-400", label: "🚨 Due Today!" };
    if (diff <= 3) return { color: "text-orange-400", label: `⚠️ Due in ${diff} days` };
    return { color: "text-gray-400", label: `📅 Due on day ${dueDay}` };
  };

  return (
    <div className="bg-gray-800 p-4 rounded-xl mb-6">
      <h2 className="text-lg font-semibold mb-3">📆 Bill Reminders</h2>
      <div className="flex flex-col gap-2 mb-3">
        {bills.map((bill) => {
          const status = getDueStatus(bill.dueDay, bill.paid);
          return (
            <div key={bill.id} className={`bg-gray-700 p-3 rounded-lg ${bill.paid ? "opacity-60" : ""}`}>
              <div className="flex justify-between items-center">
                <div>
                  <p className={`font-medium ${bill.paid ? "line-through" : ""}`}>{bill.name}</p>
                  <p className={`text-xs ${status.color}`}>{status.label}</p>
                </div>
                <div className="flex items-center gap-2">
                  <p className="font-bold text-white">₹{bill.amount}</p>
                  <button
                    onClick={() => togglePaid(bill.id)}
                    className={`text-xs px-2 py-1 rounded-lg ${bill.paid ? "bg-gray-600" : "bg-green-600 hover:bg-green-700"} text-white`}
                  >
                    {bill.paid ? "Undo" : "Pay"}
                  </button>
                  <button
                    onClick={() => handleDelete(bill.id)}
                    className="bg-red-600 hover:bg-red-700 text-white text-xs px-2 py-1 rounded-lg"
                  >
                    🗑️
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>
      {showAdd ? (
        <div className="flex flex-col gap-2">
          <input
            className="bg-gray-700 p-2 rounded-lg outline-none"
            placeholder="Bill Name (e.g. 📱 Phone Bill)"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <input
            className="bg-gray-700 p-2 rounded-lg outline-none"
            placeholder="Amount (₹)"
            type="number"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
          />
          <input
            className="bg-gray-700 p-2 rounded-lg outline-none"
            placeholder="Due Day of Month (1-31)"
            type="number"
            value={dueDay}
            onChange={(e) => setDueDay(e.target.value)}
          />
          <div className="flex gap-2">
            <button
              onClick={handleAdd}
              className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-4 py-2 rounded-lg flex-1"
            >
              Add Bill
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
          + Add Bill Reminder
        </button>
      )}
    </div>
  );
}