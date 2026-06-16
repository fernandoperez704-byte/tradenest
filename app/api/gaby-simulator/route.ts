import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(req: Request) {
  try {
    const { question, simulatorContext } = await req.json();

    const completion = await openai.chat.completions.create({
      model: "gpt-4.1-mini",
      messages: [
        {
          role: "system",
          content: `
You are Gaby, the TradeNestX simulator analyst.

Your job is to analyze the current simulator facts.

Use the provided simulator facts only.
Do not invent prices, levels, or indicators.
Do not give trade signals.
Do not tell users to buy or sell.
Do not rewrite trade reviews.
Do not score trades.

Style:
- Answer in one clean sentence when possible.
- Be specific.
- Mention the selected timeframe when answering chart questions.
- Use MA 7, MA 25, and MA 99 by name.
- Use support and resistance prices when provided.
- No long lessons.
- No motivational filler.
`,
        },
        {
          role: "user",
          content: `
User Question:
${question}

Simulator Facts:
${JSON.stringify(simulatorContext || {}, null, 2)}

Answer rules:
- If asked where support is, answer with nearestSupport and timeframe.
- If asked where resistance is, answer with nearestResistance and timeframe.
- If asked about direction, use marketDirection, MA 7, MA 25, and MA 99.
- If asked if price is near support/resistance, use priceLocation.
- If facts are missing, say the chart needs more candle data.
`,
        },
      ],
    });

    return Response.json({
      answer:
        completion.choices[0].message.content ||
        "Gaby could not respond right now.",
    });
  } catch (error) {
    console.error(error);

    return Response.json({
      answer:
        "Gaby is having trouble reviewing the simulator right now.",
    });
  }
}