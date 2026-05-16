"use client";
import { useState } from "react";

export default function ReferFriend({ user }) {
  const [copied, setCopied] = useState(false);

  const referralLink = `https://finance-tracker-zeta-vert.vercel.app/?ref=${user?.uid?.slice(0, 8)}`;

  const handleCopy = () => {
    navigator.clipboard.writeText(referralLink);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: "TechieFin - Personal Finance App",
        text: "Check out this amazing finance tracker app!",
        url: referralLink,
      });
    } else {
      handleCopy();
    }
  };

  return (
    <div className="bg-gray-800 p-4 rounded-xl mb-6">
      <h2 className="text-lg font-semibold mb-3">🤝 Refer a Friend</h2>
      <div
        className="p-4 rounded-xl mb-3 text-center"
        style={{ background: "linear-gradient(135deg, #6366f1, #ec4899)" }}
      >
        <p className="text-2xl mb-1">🎁</p>
        <p className="font-bold">Share TechieFin!</p>
        <p className="text-purple-200 text-xs mt-1">Help your friends manage their finances better</p>
      </div>
      <div className="bg-gray-700 p-3 rounded-xl mb-3">
        <p className="text-xs text-gray-400 mb-1">Your referral link:</p>
        <p className="text-xs text-blue-400 break-all">{referralLink}</p>
      </div>
      <div className="flex gap-2">
        <button
          onClick={handleCopy}
          className="bg-gray-700 hover:bg-gray-600 text-white font-semibold px-4 py-2 rounded-lg flex-1"
        >
          {copied ? "✅ Copied!" : "📋 Copy Link"}
        </button>
        <button
          onClick={handleShare}
          className="bg-purple-600 hover:bg-purple-700 text-white font-semibold px-4 py-2 rounded-lg flex-1"
        >
          📤 Share
        </button>
      </div>
    </div>
  );
}