"use client";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

export default function ExportPDF({ transactions }) {
  const exportPDF = () => {
    const doc = new jsPDF();

    const income = transactions
      .filter((t) => t.type === "income")
      .reduce((a, b) => a + b.amount, 0);

    const expense = transactions
      .filter((t) => t.type === "expense")
      .reduce((a, b) => a + b.amount, 0);

    // Title
    doc.setFontSize(20);
    doc.text("Finance Tracker Report", 14, 20);

    // Date
    doc.setFontSize(10);
    doc.text(`Generated: ${new Date().toLocaleDateString()}`, 14, 30);

    // Summary
    doc.setFontSize(14);
    doc.text("Summary", 14, 45);
    doc.setFontSize(11);
    doc.text(`Total Income: Rs.${income}`, 14, 55);
    doc.text(`Total Expense: Rs.${expense}`, 14, 63);
    doc.text(`Balance: Rs.${income - expense}`, 14, 71);

    // Transactions Table
    autoTable(doc, {
      startY: 85,
      head: [["Title", "Category", "Type", "Amount", "Date"]],
      body: transactions.map((t) => [
        t.title,
        t.category || "Other",
        t.type,
        `Rs.${t.amount}`,
        t.date?.toDate().toLocaleDateString(),
      ]),
      headStyles: { fillColor: [99, 102, 241] },
    });

    doc.save("finance-report.pdf");
  };

  return (
    <div className="bg-gray-800 p-4 rounded-xl mb-6">
      <h2 className="text-lg font-semibold mb-3">📤 Export Report</h2>
      <button
        onClick={exportPDF}
        className="bg-green-600 hover:bg-green-700 text-white font-semibold px-4 py-2 rounded-lg w-full"
      >
        📄 Download PDF Report
      </button>
    </div>
  );
}