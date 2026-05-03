import { db } from "@/lib/firebase";
import { doc, deleteDoc } from "firebase/firestore";

export default function TransactionList({ transactions, onDelete }) {
  const handleDelete = async (id) => {
    await deleteDoc(doc(db, "transactions", id));
    onDelete();
  };

  return (
    <div className="bg-gray-800 p-4 rounded-xl">
      <h2 className="text-lg font-semibold mb-3">Transactions</h2>
      {transactions.length === 0 && (
        <p className="text-gray-400">No transactions yet!</p>
      )}
      <ul className="flex flex-col gap-2">
        {transactions.map((t) => (
          <li
            key={t.id}
            className="flex justify-between items-center bg-gray-700 p-3 rounded-lg"
          >
            <div>
              <p className="font-medium">{t.title}</p>
              <p className="text-xs text-gray-400">
                {t.date?.toDate().toLocaleDateString()}
              </p>
            </div>
            <div className="flex items-center gap-3">
              <span
                className={`font-bold text-lg ${
                  t.type === "income" ? "text-green-400" : "text-red-400"
                }`}
              >
                {t.type === "income" ? "+" : "-"}₹{t.amount}
              </span>
              <button
                onClick={() => handleDelete(t.id)}
                className="bg-red-600 hover:bg-red-700 text-white text-xs px-2 py-1 rounded-lg"
              >
                🗑️
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}