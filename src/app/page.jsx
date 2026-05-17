"use client";
import { useEffect, useState } from "react";
import { db, auth } from "@/lib/firebase";
import { collection, getDocs, orderBy, query, where } from "firebase/firestore";
import { onAuthStateChanged } from "firebase/auth";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
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
import SalaryNegotiation from "@/components/SalaryNegotiation";
import FinancialCoach from "@/components/FinancialCoach";
import BusinessTracker from "@/components/BusinessTracker";
import MarketOverview from "@/components/MarketOverview";
import SecurityScore from "@/components/SecurityScore";
import ExpenseSplitter from "@/components/ExpenseSplitter";
import RiskAnalyzer from "@/components/RiskAnalyzer";
import FinancialCalendar from "@/components/FinancialCalendar";

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
      <main className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flex items-center justify-center p-4">
        <div className="w-full max-w-md space-y-8">
          {/* Logo Section */}
          <div className="text-center space-y-4">
            <div className="flex justify-center">
              <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-indigo-500 to-pink-500 flex items-center justify-center text-5xl shadow-lg shadow-indigo-500/50">
                💰
              </div>
            </div>
            <div>
              <h1 className="text-4xl font-bold text-white">TechieFin</h1>
              <p className="text-slate-400 text-sm mt-2">Your personal finance companion</p>
            </div>
          </div>

          {/* Login Card */}
          <Card className="border-slate-700 bg-slate-800/50 backdrop-blur-xl shadow-xl">
            <CardHeader className="space-y-2">
              <CardTitle className="text-white">Welcome Back</CardTitle>
              <CardDescription className="text-slate-400">
                Sign in to manage your finances
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Login user={user} />
            </CardContent>
          </Card>

          {/* Features */}
          <div className="grid grid-cols-3 gap-4">
            <div className="text-center p-3 rounded-lg bg-slate-700/30 border border-slate-700">
              <p className="text-2xl font-bold text-indigo-400">30+</p>
              <p className="text-xs text-slate-400 mt-1">Features</p>
            </div>
            <div className="text-center p-3 rounded-lg bg-slate-700/30 border border-slate-700">
              <p className="text-2xl font-bold text-pink-400">100%</p>
              <p className="text-xs text-slate-400 mt-1">Free</p>
            </div>
            <div className="text-center p-3 rounded-lg bg-slate-700/30 border border-slate-700">
              <p className="text-2xl font-bold text-cyan-400">🔒</p>
              <p className="text-xs text-slate-400 mt-1">Secure</p>
            </div>
          </div>

          {/* Footer */}
          <p className="text-center text-xs text-slate-500">
            Track • Analyze • Grow your wealth
          </p>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      {/* Header with Profile */}
      {activeTab !== "profile" && (
        <div className="bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 pt-6 pb-8 px-4 rounded-b-3xl shadow-lg">
          <div className="max-w-xl mx-auto">
            <div className="flex justify-between items-center">
              <div>
                <p className="text-indigo-100 text-sm">Welcome back 👋</p>
                <p className="text-2xl font-bold text-white">{user.displayName}</p>
              </div>
              <button
                onClick={() => setActiveTab("profile")}
                className="ring-2 ring-white/30 hover:ring-white/50 rounded-full transition-all"
              >
                <img
                  src={user.photoURL}
                  alt="profile"
                  className="w-12 h-12 rounded-full"
                />
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Main Content */}
      <div className="max-w-xl mx-auto px-4 py-6 pb-32">
        {/* Navigation Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full mb-6">
          <TabsList className="grid w-full grid-cols-5 bg-slate-700/50 border border-slate-600">
            <TabsTrigger value="home" className="text-xs">🏠</TabsTrigger>
            <TabsTrigger value="analytics" className="text-xs">📊</TabsTrigger>
            <TabsTrigger value="tools" className="text-xs">🛠️</TabsTrigger>
            <TabsTrigger value="goals" className="text-xs">🎯</TabsTrigger>
            <TabsTrigger value="profile" className="text-xs">👤</TabsTrigger>
          </TabsList>

          {/* Home Tab */}
          <TabsContent value="home" className="space-y-4">
            <Summary transactions={transactions} />
            <DailyTips />
            <BudgetAlert transactions={transactions} />
            <FinancialCalendar transactions={transactions} />
            <NewsFeed />
            <Chatbot transactions={transactions} />
            <AddTransaction onAdd={() => fetchTransactions(user)} user={user} />
            <RecurringTransactions user={user} onAdd={() => fetchTransactions(user)} />
            <TransactionList transactions={transactions} onDelete={() => fetchTransactions(user)} />
          </TabsContent>

          {/* Analytics Tab */}
          <TabsContent value="analytics" className="space-y-4">
            <Statistics transactions={transactions} />
            <RiskAnalyzer transactions={transactions} />
            <SecurityScore transactions={transactions} />
            <Achievements transactions={transactions} />
            <FinancialCoach transactions={transactions} />
            <NetWorth />
            <CashbackTracker />
            <BusinessTracker />
            <MarketOverview />
            <MonthlyReport transactions={transactions} />
            <SpendingInsights transactions={transactions} />
            <CarbonFootprint transactions={transactions} />
            <InvestmentAdvice transactions={transactions} />
            <Chart transactions={transactions} />
            <HealthScore transactions={transactions} />
            <FuturePredictor transactions={transactions} />
            <AIAdvice transactions={transactions} />
            <ExportPDF transactions={transactions} />
          </TabsContent>

          {/* Tools Tab */}
          <TabsContent value="tools" className="space-y-4">
            <SalaryNegotiation />
            <TaxCalculator />
            <CurrencyConverter />
            <EMICalculator />
            <ExpenseSplitter />
            <SplitBill />
            <MoodTracker />
            <BillReminders />
            <SupplyChain />
            <DemandPlanner />
          </TabsContent>

          {/* Goals Tab */}
          <TabsContent value="goals" className="space-y-4">
            <GoalTracker />
            <SavingsChallenge />
            <Accounts transactions={transactions} />
            <ReferFriend user={user} />
          </TabsContent>

          {/* Profile Tab */}
          <TabsContent value="profile">
            <Profile user={user} transactions={transactions} />
          </TabsContent>
        </Tabs>
      </div>
    </main>
  );
}