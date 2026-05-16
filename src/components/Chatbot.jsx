"use client";
import { useState } from "react";

const getResponse = (message, transactions) => {
  const msg = message.toLowerCase();
  const income = transactions.filter((t) => t.type === "income").reduce((a, b) => a + b.amount, 0);
  const expense = transactions.filter((t) => t.type === "expense").reduce((a, b) => a + b.amount, 0);
  const balance = income - expense;

  if (msg.includes("balance")) return `Your current balance is ₹${balance.toLocaleString()} 💰`;
  if (msg.includes("income")) return `Your total income is ₹${income.toLocaleString()} 💚`;
  if (msg.includes("expense") || msg.includes("spend")) return `Your total expenses are ₹${expense.toLocaleString()} ❤️`;
  if (msg.includes("save") || msg.includes("saving")) {
    const rate = income > 0 ? ((balance / income) * 100).toFixed(1) : 0;
    return `Your saving rate is ${rate}%. ${rate >= 20 ? "Great job! 🎉" : "Try to save more! 💪"}`;
  }
  if (msg.includes("tip") || msg.includes("advice")) return "💡 Try to save at least 20% of your income every month!";
  if (msg.includes("invest")) return "📈 Consider investing in index funds, SIP, or fixed deposits for stable returns!";
  if (msg.includes("hello") || msg.includes("hi")) return "Hello! 👋 I'm your finance assistant. Ask me about your balance, income, expenses, or savings!";
  if (msg.includes("help")) return "I can help with: balance, income, expenses, savings, tips, investments! Just ask! 😊";
  return "I'm not sure about that. Try asking about your balance, income, expenses, or savings! 😊";
};

export default function Chatbot({ transactions }) {
  const [messages, setMessages] = useState([
    { from: "bot", text: "Hi! 👋 I'm your finance assistant. Ask me anything about your finances!" },
  ]);
  const [input, setInput] = useState("");
  const [shown, setShown] = useState(false);

  const handleSend = () => {
    if (!input.trim()) return;
    const userMsg = { from: "user", text: input };
    const botMsg = { from: "bot", text: getResponse(input, transactions) };
    setMessages([...messages, userMsg, botMsg]);
    setInput("");
  };

  return (
    <div className="bg-gray-800 p-4 rounded-xl mb-6">
      <h2 className="text-lg font-semibold mb-3">🤖 Finance Chatbot</h2>
      <button
        onClick={() => setShown(!shown)}
        className="bg-indigo-600 hover:bg-indigo-700 text-white font-semibold px-4 py-2 rounded-lg w-full mb-3"
      >
        {shown ? "Hide Chatbot" : "Chat with Finance Bot"}
      </button>
      {shown && (
        <>
          <div className="flex flex-col gap-2 mb-3 max-h-60 overflow-y-auto">
            {messages.map((msg, i) => (
              <div
                key={i}
                className={`p-2 rounded-lg text-sm max-w-xs ${
                  msg.from === "bot"
                    ? "bg-indigo-900 text-white self-start"
                    : "bg-blue-600 text-white self-end ml-auto"
                }`}
              >
                {msg.text}
              </div>
            ))}
          </div>
          <div className="flex gap-2">
            <input
              className="bg-gray-700 p-2 rounded-lg outline-none flex-1 text-sm"
              placeholder="Ask about your finances..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSend()}
            />
            <button
              onClick={handleSend}
              className="bg-indigo-600 hover:bg-indigo-700 text-white px-3 py-2 rounded-lg"
            >
              Send
            </button>
          </div>
        </>
      )}
    </div>
  );
}