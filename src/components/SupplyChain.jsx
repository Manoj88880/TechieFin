"use client";
import { useState } from "react";

export default function SupplyChain() {
  const [items, setItems] = useState([
    { id: 1, name: "Raw Materials", cost: 50000, supplier: "ABC Suppliers", status: "In Stock" },
    { id: 2, name: "Packaging", cost: 10000, supplier: "XYZ Pack Co", status: "Low Stock" },
    { id: 3, name: "Logistics", cost: 20000, supplier: "Fast Freight", status: "In Transit" },
  ]);
  const [showAdd, setShowAdd] = useState(false);
  const [name, setName] = useState("");
  const [cost, setCost] = useState("");
  const [supplier, setSupplier] = useState("");
  const [status, setStatus] = useState("In Stock");
  const [shown, setShown] = useState(false);

  const totalCost = items.reduce((a, b) => a + b.cost, 0);

  const handleAdd = () => {
    if (!name || !cost || !supplier) return;
    setItems([...items, { id: Date.now(), name, cost: parseFloat(cost), supplier, status }]);
    setName(""); setCost(""); setSupplier("");
    setShowAdd(false);
  };

  const getStatusColor = (status) => {
    if (status === "In Stock") return "text-green-400";
    if (status === "Low Stock") return "text-yellow-400";
    if (status === "Out of Stock") return "text-red-400";
    return "text-blue-400";
  };

  return (
    <div className="bg-gray-800 p-4 rounded-xl mb-6">
      <h2 className="text-lg font-semibold mb-3">🚚 Supply Chain Tracker</h2>
      <button
        onClick={() => setShown(!shown)}
        className="bg-orange-600 hover:bg-orange-700 text-white font-semibold px-4 py-2 rounded-lg w-full mb-3"
      >
        {shown ? "Hide" : "View Supply Chain"}
      </button>
      {shown && (
        <>
          <div className="bg-gray-700 p-3 rounded-xl text-center mb-3">
            <p className="text-xs text-gray-400">Total Supply Chain Cost</p>
            <p className="text-2xl font-bold text-orange-400">₹{totalCost.toLocaleString()}</p>
          </div>
          <div className="flex flex-col gap-2 mb-3">
            {items.map((item) => (
              <div key={item.id} className="bg-gray-700 p-3 rounded-xl">
                <div className="flex justify-between items-start">
                  <div>
                    <p className="font-medium text-sm">{item.name}</p>
                    <p className="text-xs text-gray-400">{item.supplier}</p>
                  </div>
                  <div className="text-right">
                    <p className="font-bold text-orange-400">₹{item.cost.toLocaleString()}</p>
                    <p className={`text-xs ${getStatusColor(item.status)}`}>{item.status}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
          {showAdd ? (
            <div className="flex flex-col gap-2">
              <input className="bg-gray-700 p-2 rounded-lg outline-none text-sm" placeholder="Item Name" value={name} onChange={(e) => setName(e.target.value)} />
              <input className="bg-gray-700 p-2 rounded-lg outline-none text-sm" placeholder="Cost (₹)" type="number" value={cost} onChange={(e) => setCost(e.target.value)} />
              <input className="bg-gray-700 p-2 rounded-lg outline-none text-sm" placeholder="Supplier Name" value={supplier} onChange={(e) => setSupplier(e.target.value)} />
              <select className="bg-gray-700 p-2 rounded-lg outline-none text-sm" value={status} onChange={(e) => setStatus(e.target.value)}>
                <option>In Stock</option>
                <option>Low Stock</option>
                <option>Out of Stock</option>
                <option>In Transit</option>
              </select>
              <div className="flex gap-2">
                <button onClick={handleAdd} className="bg-orange-600 hover:bg-orange-700 text-white font-semibold px-4 py-2 rounded-lg flex-1">Add</button>
                <button onClick={() => setShowAdd(false)} className="bg-gray-600 text-white font-semibold px-4 py-2 rounded-lg flex-1">Cancel</button>
              </div>
            </div>
          ) : (
            <button onClick={() => setShowAdd(true)} className="bg-orange-600 hover:bg-orange-700 text-white font-semibold px-4 py-2 rounded-lg w-full">
              + Add Supply Item
            </button>
          )}
        </>
      )}
    </div>
  );
}