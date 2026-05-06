"use client";
import "./globals.css";
import { useState } from "react";

export default function RootLayout({ children }) {
  const [dark, setDark] = useState(true);

  return (
    <html lang="en">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="theme-color" content="#030712" />
        <title>💰 Finance Tracker</title>
      </head>
      <body
        style={{
          backgroundColor: dark ? "#030712" : "#f3f4f6",
          color: dark ? "#ffffff" : "#111827",
          minHeight: "100vh",
          transition: "all 0.3s ease",
        }}
      >
        <div className="flex justify-between items-center p-4 sticky top-0 z-10"
          style={{ backgroundColor: dark ? "#030712" : "#f3f4f6" }}
        >
          <p className="font-bold text-lg">💰 TechieFin</p>
          <button
            onClick={() => setDark(!dark)}
            style={{
              backgroundColor: dark ? "#facc15" : "#1f2937",
              color: dark ? "#111827" : "#ffffff",
              padding: "8px 16px",
              borderRadius: "12px",
              fontWeight: "600",
              fontSize: "14px",
              border: "none",
              cursor: "pointer",
            }}
          >
            {dark ? "☀️ Light" : "🌙 Dark"}
          </button>
        </div>
        {children}
      </body>
    </html>
  );
}