export default function Summary({ transactions }) {
  const income = transactions
    .filter((t) => t.type === "income")
    .reduce((a, b) => a + b.amount, 0);

  const expense = transactions
    .filter((t) => t.type === "expense")
    .reduce((a, b) => a + b.amount, 0);

  const balance = income - expense;

  return (
    <div className="grid grid-cols-3 gap-4 mb-6">
      <div className="bg-green-800 p-4 rounded-xl text-center">
        <p className="text-sm text-green-300">Income</p>
        <p className="text-2xl font-bold">₹{income}</p>
      </div>
      <div className="bg-red-800 p-4 rounded-xl text-center">
        <p className="text-sm text-red-300">Expenses</p>
        <p className="text-2xl font-bold">₹{expense}</p>
      </div>
      <div className="bg-blue-800 p-4 rounded-xl text-center">
        <p className="text-sm text-blue-300">Balance</p>
        <p className="text-2xl font-bold">₹{balance}</p>
      </div>
    </div>
  );
}