"use client";
import "./globals.css";

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="theme-color" content="#030712" />
        <title>💰 TechieFin</title>
      </head>
      <body style={{
        background: "linear-gradient(135deg, #030712 0%, #0f0a1e 50%, #030712 100%)",
        minHeight: "100vh",
        color: "#ffffff",
      }}>
        {children}
      </body>
    </html>
  );
}