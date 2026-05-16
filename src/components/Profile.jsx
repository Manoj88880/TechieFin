"use client";
import { auth } from "@/lib/firebase";
import { signOut } from "firebase/auth";

export default function Profile({ user, transactions }) {
  const handleLogout = async () => {
    await signOut(auth);
  };

  const income = transactions
    .filter((t) => t.type === "income")
    .reduce((a, b) => a + b.amount, 0);

  const expense = transactions
    .filter((t) => t.type === "expense")
    .reduce((a, b) => a + b.amount, 0);

  const stats = [
    { label: "Total Transactions", value: transactions.length },
    { label: "Total Income", value: `₹${income.toLocaleString()}` },
    { label: "Total Expenses", value: `₹${expense.toLocaleString()}` },
    { label: "Net Balance", value: `₹${(income - expense).toLocaleString()}` },
  ];

  return (
    <div className="flex flex-col gap-4">
      {/* Profile Card */}
      <div
        className="p-6 rounded-2xl text-center"
        style={{ background: "linear-gradient(135deg, #6366f1, #ec4899)" }}
      >
        <img
          src={user.photoURL}
          alt="profile"
          className="w-20 h-20 rounded-full border-4 border-white mx-auto mb-3"
        />
        <h2 className="text-xl font-bold">{user.displayName}</h2>
        <p className="text-purple-200 text-sm">{user.email}</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 gap-3">
        {stats.map((stat) => (
          <div key={stat.label} className="bg-gray-800 p-4 rounded-xl text-center">
            <p className="text-xs text-gray-400 mb-1">{stat.label}</p>
            <p className="text-lg font-bold text-white">{stat.value}</p>
          </div>
        ))}
      </div>

      {/* Account Info */}
      <div className="bg-gray-800 p-4 rounded-xl">
        <h3 className="font-semibold mb-3">Account Info</h3>
        <div className="flex flex-col gap-2">
          <div className="flex justify-between">
            <p className="text-gray-400 text-sm">Name</p>
            <p className="text-sm font-medium">{user.displayName}</p>
          </div>
          <div className="flex justify-between">
            <p className="text-gray-400 text-sm">Email</p>
            <p className="text-sm font-medium">{user.email}</p>
          </div>
          <div className="flex justify-between">
            <p className="text-gray-400 text-sm">Login Method</p>
            <p className="text-sm font-medium">Google</p>
          </div>
        </div>
      </div>

      {/* Logout */}
      <button
        onClick={handleLogout}
        className="bg-red-600 hover:bg-red-700 text-white font-semibold px-4 py-3 rounded-xl w-full"
      >
        🚪 Logout
      </button>
    </div>
  );
}