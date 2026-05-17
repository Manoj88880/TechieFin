"use client";
import { useState } from "react";

const INDUSTRY_DATA = {
  "Software Engineering": { entry: 600000, mid: 1200000, senior: 2500000, lead: 4000000 },
  "Data Science": { entry: 700000, mid: 1400000, senior: 2800000, lead: 4500000 },
  "Product Management": { entry: 800000, mid: 1600000, senior: 3000000, lead: 5000000 },
  "Marketing": { entry: 400000, mid: 800000, senior: 1500000, lead: 2500000 },
  "Finance": { entry: 500000, mid: 1000000, senior: 2000000, lead: 3500000 },
  "HR": { entry: 350000, mid: 700000, senior: 1200000, lead: 2000000 },
  "Sales": { entry: 400000, mid: 900000, senior: 1800000, lead: 3000000 },
  "Design": { entry: 500000, mid: 1000000, senior: 2000000, lead: 3200000 },
};

const CITIES = {
  "Bangalore": 1.3,
  "Mumbai": 1.2,
  "Delhi": 1.15,
  "Hyderabad": 1.1,
  "Pune": 1.0,
  "Chennai": 1.0,
  "Kolkata": 0.9,
  "Other": 0.85,
};

export default function SalaryNegotiation() {
  const [industry, setIndustry] = useState("Software Engineering");
  const [experience, setExperience] = useState("");
  const [city, setCity] = useState("Bangalore");
  const [current, setCurrent] = useState("");
  const [result, setResult] = useState(null);
  const [shown, setShown] = useState(false);

  const calculate = () => {
    if (!experience) return;
    const exp = parseInt(experience);
    const data = INDUSTRY_DATA[industry];
    const cityMultiplier = CITIES[city];

    let level, base;
    if (exp <= 2) { level = "Entry Level"; base = data.entry; }
    else if (exp <= 5) { level = "Mid Level"; base = data.mid; }
    else if (exp <= 10) { level = "Senior Level"; base = data.senior; }
    else { level = "Lead/Manager"; base = data.lead; }

    const marketSalary = Math.round(base * cityMultiplier);
    const minAsk = Math.round(marketSalary * 0.9);
    const maxAsk = Math.round(marketSalary * 1.2);
    const idealAsk = Math.round(marketSalary * 1.1);

    let negotiationTip = "";
    if (current) {
      const curr = parseFloat(current);
      const diff = ((marketSalary - curr) / curr * 100).toFixed(1);
      if (curr < marketSalary * 0.8) negotiationTip = `💡 You are underpaid by ${Math.abs(diff)}%! Negotiate confidently for a big raise!`;
      else if (curr < marketSalary) negotiationTip = `📈 You are slightly below market. Ask for ${diff}% raise!`;
      else negotiationTip = `✅ You are paid at or above market rate. Focus on growth opportunities!`;
    }

    setResult({ level, marketSalary, minAsk, maxAsk, idealAsk, negotiationTip });
    setShown(true);
  };

  return (
    <div className="bg-gray-800 p-4 rounded-xl mb-6">
      <h2 className="text-lg font-semibold mb-3">💰 Salary Negotiation Helper</h2>
      <div className="flex flex-col gap-3">
        <select
          className="bg-gray-700 p-2 rounded-lg outline-none"
          value={industry}
          onChange={(e) => setIndustry(e.target.value)}
        >
          {Object.keys(INDUSTRY_DATA).map((i) => (
            <option key={i} value={i}>{i}</option>
          ))}
        </select>
        <input
          className="bg-gray-700 p-2 rounded-lg outline-none"
          placeholder="Years of Experience"
          type="number"
          value={experience}
          onChange={(e) => setExperience(e.target.value)}
        />
        <select
          className="bg-gray-700 p-2 rounded-lg outline-none"
          value={city}
          onChange={(e) => setCity(e.target.value)}
        >
          {Object.keys(CITIES).map((c) => (
            <option key={c} value={c}>{c}</option>
          ))}
        </select>
        <input
          className="bg-gray-700 p-2 rounded-lg outline-none"
          placeholder="Current Salary (₹) - Optional"
          type="number"
          value={current}
          onChange={(e) => setCurrent(e.target.value)}
        />
        <button
          onClick={calculate}
          className="bg-green-600 hover:bg-green-700 text-white font-semibold px-4 py-2 rounded-lg"
        >
          Get Salary Insights
        </button>
      </div>

      {shown && result && (
        <div className="mt-4 flex flex-col gap-3">
          {/* Level Badge */}
          <div className="bg-gray-700 p-3 rounded-xl text-center">
            <p className="text-xs text-gray-400">Your Level</p>
            <p className="text-lg font-bold text-blue-400">{result.level}</p>
          </div>

          {/* Market Salary */}
          <div
            className="p-4 rounded-xl text-center"
            style={{ background: "linear-gradient(135deg, #059669, #10b981)" }}
          >
            <p className="text-sm text-green-100">Market Salary in {city}</p>
            <p className="text-3xl font-bold text-white">₹{result.marketSalary.toLocaleString()}</p>
            <p className="text-green-200 text-xs">per year</p>
          </div>

          {/* Negotiation Range */}
          <div className="grid grid-cols-3 gap-2">
            <div className="bg-gray-700 p-3 rounded-xl text-center">
              <p className="text-xs text-gray-400">Min Ask</p>
              <p className="text-sm font-bold text-yellow-400">₹{(result.minAsk / 100000).toFixed(1)}L</p>
            </div>
            <div className="bg-green-900 p-3 rounded-xl text-center border border-green-500">
              <p className="text-xs text-green-300">Ideal Ask</p>
              <p className="text-sm font-bold text-green-400">₹{(result.idealAsk / 100000).toFixed(1)}L</p>
            </div>
            <div className="bg-gray-700 p-3 rounded-xl text-center">
              <p className="text-xs text-gray-400">Max Ask</p>
              <p className="text-sm font-bold text-blue-400">₹{(result.maxAsk / 100000).toFixed(1)}L</p>
            </div>
          </div>

          {/* Negotiation Tips */}
          {result.negotiationTip && (
            <div className="bg-gray-700 p-3 rounded-xl">
              <p className="text-sm">{result.negotiationTip}</p>
            </div>
          )}

          {/* Tips */}
          <div className="bg-gray-700 p-3 rounded-xl">
            <p className="text-sm font-semibold mb-2">🎯 Negotiation Tips:</p>
            <ul className="flex flex-col gap-1">
              <li className="text-xs text-gray-300">✅ Always negotiate — 85% of employers expect it!</li>
              <li className="text-xs text-gray-300">✅ Start with the ideal ask, not the minimum</li>
              <li className="text-xs text-gray-300">✅ Mention your achievements and impact</li>
              <li className="text-xs text-gray-300">✅ Research company salary ranges on Glassdoor</li>
              <li className="text-xs text-gray-300">✅ Consider total package — benefits, stocks, bonus</li>
            </ul>
          </div>
        </div>
      )}
    </div>
  );
}