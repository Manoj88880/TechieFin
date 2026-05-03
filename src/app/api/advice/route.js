import Anthropic from "@anthropic-ai/sdk";

const client = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY,
});

export async function POST(request) {
  try {
    const { transactions } = await request.json();

    const income = transactions
      .filter((t) => t.type === "income")
      .reduce((a, b) => a + b.amount, 0);

    const expense = transactions
      .filter((t) => t.type === "expense")
      .reduce((a, b) => a + b.amount, 0);

    const transactionList = transactions
      .map((t) => `${t.title}: ₹${t.amount} (${t.type})`)
      .join("\n");

    const message = await client.messages.create({
      model: "claude-sonnet-4-20250514",
      max_tokens: 1024,
      messages: [
        {
          role: "user",
          content: `You are a personal finance advisor. Analyze these transactions and give 3 short, practical spending tips:

Total Income: ₹${income}
Total Expenses: ₹${expense}
Balance: ₹${income - expense}

Transactions:
${transactionList}

Give exactly 3 bullet points of advice. Keep each point short and actionable.`,
        },
      ],
    });

    return Response.json({ advice: message.content[0].text });
  } catch (error) {
    console.error("API Error:", error.message);
    return Response.json({ error: error.message }, { status: 500 });
  }
}