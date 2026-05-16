"use client";

const TIPS = [
  "💡 Save at least 20% of your income every month!",
  "📈 Invest early — compound interest is your best friend!",
  "🛒 Always make a shopping list before going to the store!",
  "☕ Skip one coffee a day and save ₹1500/month!",
  "📱 Cancel subscriptions you don't use regularly!",
  "🏦 Keep 3-6 months of expenses as emergency fund!",
  "💳 Pay credit card bills on time to avoid interest!",
  "🎯 Set specific financial goals with deadlines!",
  "📊 Review your expenses every week to stay on track!",
  "🌱 Start investing even with small amounts like ₹500/month!",
  "🏠 Spend no more than 30% of income on rent!",
  "🍔 Cook at home more often to save on food expenses!",
  "📚 Learn about personal finance — knowledge is wealth!",
  "🎁 Buy gifts in advance to avoid last minute expensive purchases!",
  "💰 Automate your savings so you don't have to think about it!",
];

export default function DailyTips() {
  const today = new Date().getDate();
  const tip = TIPS[today % TIPS.length];

  return (
    <div
      className="p-4 rounded-xl mb-4"
      style={{ background: "linear-gradient(135deg, #0f172a, #1e1b4b)" }}
    >
      <p className="text-xs text-purple-400 font-semibold mb-1">💬 TIP OF THE DAY</p>
      <p className="text-sm text-white">{tip}</p>
    </div>
  );
}