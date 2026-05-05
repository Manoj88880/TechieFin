"use client";
import { useEffect, useState } from "react";
import { db, auth } from "@/lib/firebase";
import { collection, getDocs, orderBy, query } from "firebase/firestore";
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

export default function Home() {
  const [transactions, setTransactions] = useState([]);
  const [user, setUser] = useState(null);

  const fetchTransactions = async () => {
    const q = query(collection(db, "transactions"), orderBy("date", "desc"));
    const snapshot = await getDocs(q);
    const data = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
    setTransactions(data);
  };

  useEffect(() => {
    fetchTransactions();
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
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
          <HealthScore transactions={transactions} />
          <FuturePredictor transactions={transactions} />
          <MoodTracker />
          <SavingsChallenge />
          <SplitBill />
          <Chart transactions={transactions} />
          <AIAdvice transactions={transactions} />
          <AddTransaction onAdd={fetchTransactions} />
          <TransactionList transactions={transactions} onDelete={fetchTransactions} />
        </>
      ) : (
        <p className="text-center text-gray-400">Please login to see your transactions!</p>
      )}
    </main>
  );
}