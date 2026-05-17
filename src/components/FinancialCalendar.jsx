"use client";
import { useState } from "react";

export default function FinancialCalendar({ transactions }) {
  const [shown, setShown] = useState(false);

  const today = new Date();
  const daysInMonth = new Date(today.getFullYear(), today.getMonth() + 1, 0).getDate();
  const firstDay = new Date(today.getFullYear(), today.getMonth(), 1).getDay();

  const getTransactionsForDay = (day) => {
    return transactions.filter((t) => {
      if (!t.date) return false;
      const date = t.date.toDate();
      return date.getDate() === day &&
        date.getMonth() === today.getMonth() &&
        date.getFullYear() === today.getFullYear();
    });
  };

  const days = Array.from({ length: daysInMonth }, (_, i) => i + 1);
  const blanks = Array.from({ length: firstDay }, (_, i) => i);

  return (
    <div className="bg-gray-800 p-4 rounded-xl mb-6">
      <h2 className="text-lg font-semibold mb-3">📅 Financial Calendar</h2>
      <button
        onClick={() => setShown(!shown)}
        className="bg-teal-600 hover:bg-teal-700 text-white font-semibold px-4 py-2 rounded-lg w-full mb-3"
      >
        {shown ? "Hide Calendar" : "View Calendar"}
      </button>
      {shown && (
        <>
          <p className="text-center font-semibold mb-3">
            {today.toLocaleString("default", { month: "long", year: "numeric" })}
          </p>
          <div className="grid grid-cols-7 gap-1 mb-2">
            {["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"].map((d) => (
              <p key={d} className="text-center text-xs text-gray-400 font-semibold">{d}</p>
            ))}
          </div>
          <div className="grid grid-cols-7 gap-1">
            {blanks.map((b) => <div key={b}></div>)}
            {days.map((day) => {
              const txs = getTransactionsForDay(day);
              const hasIncome = txs.some((t) => t.type === "income");
              const hasExpense = txs.some((t) => t.type === "expense");
              return (
                <div
                  key={day}
                  className={`aspect-square rounded-lg flex flex-col items-center justify-center text-xs ${
                    day === today.getDate() ? "bg-purple-600 text-white" : "bg-gray-700"
                  }`}
                >
                  <p className="font-medium">{day}</p>
                  <div className="flex gap-0.5">
                    {hasIncome && <div className="w-1.5 h-1.5 rounded-full bg-green-400"></div>}
                    {hasExpense && <div className="w-1.5 h-1.5 rounded-full bg-red-400"></div>}
                  </div>
                </div>
              );
            })}
          </div>
          <div className="flex gap-4 mt-3 justify-center">
            <div className="flex items-center gap-1">
              <div className="w-2 h-2 rounded-full bg-green-400"></div>
              <p className="text-xs text-gray-400">Income</p>
            </div>
            <div className="flex items-center gap-1">
              <div className="w-2 h-2 rounded-full bg-red-400"></div>
              <p className="text-xs text-gray-400">Expense</p>
            </div>
            <div className="flex items-center gap-1">
              <div className="w-2 h-2 rounded-full bg-purple-600"></div>
              <p className="text-xs text-gray-400">Today</p>
            </div>
          </div>
        </>
      )}
    </div>
  );
}