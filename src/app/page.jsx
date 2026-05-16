"use client";
import { useEffect, useState } from "react";
import { db, auth } from "@/lib/firebase";
import { collection, getDocs, orderBy, query, where } from "firebase/firestore";
import { onAuthStateChanged } from "firebase/auth";
import Summary from "@/components/Summary";
import AddTransaction from "@/components/AddTransaction";
import TransactionList from "@/components/TransactionList";
import Chart from "@/components/Chart";
import Login from "@/components/Login";
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

export default function Home() {
  const [transactions, setTransactions] = useState([]);
  const [user, setUser] = useState(null);

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

  return (
    <main className="max-w-xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6 text-center">💰 Finance Tracker</h1>
      <Login user={user} />
      {user ? (
        <>
          <Summary transactions={transactions} />
          <Statistics transactions={transactions} />
          <Accounts transactions={transactions} />
          <BudgetAlert transactions={transactions} />
          <MonthlyReport transactions={transactions} />
          <SpendingInsights transactions={transactions} />
          <HealthScore transactions={transactions} />
          <FuturePredictor transactions={transactions} />
          <GoalTracker />
          <BillReminders />
          <EMICalculator />
          <RecurringTransactions user={user} onAdd={() => fetchTransactions(user)} />
          <CurrencyConverter />
          <MoodTracker />
          <SavingsChallenge />
          <SplitBill />
          <Chart transactions={transactions} />
          <AIAdvice transactions={transactions} />
          <ExportPDF transactions={transactions} />
          <AddTransaction onAdd={() => fetchTransactions(user)} user={user} />
          <TransactionList transactions={transactions} onDelete={() => fetchTransactions(user)} />
        </>
      ) : (
        <p className="text-center text-gray-400">Please login to see your transactions!</p>
      )}
    </main>
  );
}