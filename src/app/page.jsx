"use client";
import { useEffect, useState } from "react";
import { db, auth } from "@/lib/firebase";
import { collection, getDocs, orderBy, query, where } from "firebase/firestore";
import { onAuthStateChanged } from "firebase/auth";
import Login from "@/components/Login";
import Summary from "@/components/Summary";
import AddTransaction from "@/components/AddTransaction";
import TransactionList from "@/components/TransactionList";
import Chart from "@/components/Chart";
import AIAdvice from "@/components/AIAdvice";
import HealthScore from "@/components/HealthScore";
import FuturePredictor from "@/components/FuturePredictor";
import SplitBill from "@/components/SplitBill";
import MoodTracker from "@/components/MoodTracker";
import SavingsChallenge from "@/components/SavingsChallenge";
import ExportPDF from "@/components/ExportPDF";
import BudgetAlert from "@/components/BudgetAlert";
import CurrencyConverter from "@/components/CurrencyConverter";
import Accounts from "@/components/Accounts";
import MonthlyReport from "@/components/MonthlyReport";
import EMICalculator from "@/components/EMICalculator";
import GoalTracker from "@/components/GoalTracker";
import BillReminders from "@/components/BillReminders";
import SpendingInsights from "@/components/SpendingInsights";
import RecurringTransactions from "@/components/RecurringTransactions";
import Statistics from "@/components/Statistics";
import Profile from "@/components/Profile";
import DailyTips from "@/components/DailyTips";
import Achievements from "@/components/Achievements";
import Chatbot from "@/components/Chatbot";
import InvestmentAdvice from "@/components/InvestmentAdvice";
import NewsFeed from "@/components/NewsFeed";
import ReferFriend from "@/components/ReferFriend";
import TaxCalculator from "@/components/TaxCalculator";
import NetWorth from "@/components/NetWorth";
import CashbackTracker from "@/components/CashbackTracker";
import CarbonFootprint from "@/components/CarbonFootprint";
import SupplyChain from "@/components/SupplyChain";
import DemandPlanner from "@/components/DemandPlanner";

export default function Home() {
  const [transactions, setTransactions] = useState([]);
  const [user, setUser] = useState(null);
  const [activeTab, setActiveTab] = useState("home");

  const fetchTransactions = async (currentUser) => {
    if (!currentUser) return;
    const q = query(
      collection(db, "transactions"),
      where("userId", "==", currentUser.uid),
      orderBy("date", "desc")
    );
    const snapshot = await getDocs(q);
    const data = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
    setTransactions(data);
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      fetchTransactions(currentUser);
    });
    return () => unsubscribe();
  }, []);

  const tabs = [
    { id: "home", icon: "🏠", label: "Home" },
    { id: "analytics", icon: "📊", label: "Analytics" },
    { id: "tools", icon: "🛠️", label: "Tools" },
    { id: "goals", icon: "🎯", label: "Goals" },
    { id: "profile", icon: "👤", label: "Profile" },
  ];

  if (!user) {
    return (
      <main className="max-w-xl mx-auto p-6 flex flex-col items-center justify-center min-h-screen">
        <div
          className="w-20 h-20 rounded-2xl flex items-center justify-center text-4xl mb-4"
          style={{ background: "linear-gradient(135deg, #6366f1, #ec4899)" }}
        >
          💰
        </div>
        <h1 className="text-3xl font-bold mb-2">TechieFin</h1>
        <p className="text-gray-400 mb-8 text-center">Your personal finance manager</p>
        <Login user={user} />
      </main>
    );
  }

  return (
    <main className="max-w-xl mx-auto pb-24">
      {activeTab !== "profile" && (
        <div
          className="p-6 mb-4"
          style={{ background: "linear-gradient(135deg, #6366f1, #8b5cf6, #ec4899)" }}
        >
          <div className="flex justify-between items-center mb-4">
            <div>
              <p className="text-purple-200 text-sm">Welcome back!</p>
              <p className="text-xl font-bold">{user.displayName} 👋</p>
            </div>
            <img
              src={user.photoURL}
              alt="profile"
              className="w-12 h-12 rounded-full border-2 border-white cursor-pointer"
              onClick={() => setActiveTab("profile")}
            />
          </div>
          <Summary transactions={transactions} />
        </div>
      )}

      <div className="px-4">
        <DailyTips />

        {activeTab === "home" && (
          <>
            <BudgetAlert transactions={transactions} />
            <NewsFeed />
            <Chatbot transactions={transactions} />
            <AddTransaction onAdd={() => fetchTransactions(user)} user={user} />
            <RecurringTransactions user={user} onAdd={() => fetchTransactions(user)} />
            <TransactionList transactions={transactions} onDelete={() => fetchTransactions(user)} />
          </>
        )}

        {activeTab === "analytics" && (
          <>
            <Statistics transactions={transactions} />
            <Achievements transactions={transactions} />
            <NetWorth />
            <CashbackTracker />
            <MonthlyReport transactions={transactions} />
            <SpendingInsights transactions={transactions} />
            <CarbonFootprint transactions={transactions} />
            <InvestmentAdvice transactions={transactions} />
            <Chart transactions={transactions} />
            <HealthScore transactions={transactions} />
            <FuturePredictor transactions={transactions} />
            <AIAdvice transactions={transactions} />
            <ExportPDF transactions={transactions} />
          </>
        )}

        {activeTab === "tools" && (
          <>
            <TaxCalculator />
            <CurrencyConverter />
            <EMICalculator />
            <SplitBill />
            <MoodTracker />
            <BillReminders />
            <SupplyChain />
            <DemandPlanner />
          </>
        )}

        {activeTab === "goals" && (
          <>
            <GoalTracker />
            <SavingsChallenge />
            <Accounts transactions={transactions} />
            <ReferFriend user={user} />
          </>
        )}

        {activeTab === "profile" && (
          <Profile user={user} transactions={transactions} />
        )}
      </div>

      <div
        className="fixed bottom-0 left-0 right-0 flex justify-around items-center p-3 z-50"
        style={{ backgroundColor: "#111827", borderTop: "1px solid #1f2937" }}
      >
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className="flex flex-col items-center gap-1"
          >
            <span className="text-2xl">{tab.icon}</span>
            <span className={`text-xs font-semibold ${activeTab === tab.id ? "text-purple-400" : "text-gray-500"}`}>
              {tab.label}
            </span>
          </button>
        ))}
      </div>
    </main>
  );
}