import OpenAI from "openai";
import { GABY_CORE_PROMPT } from "@/lib/gaby/core/gabyCore";
import { tradenestxKnowledge } from "@/lib/gaby/core/tradenestxKnowledge";






const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

const OFF_TOPIC_REDIRECT =
  "I'm your TradeNestX trading coach, so I focus on helping you understand markets, trading concepts, risk, and the TradeNestX platform. If you have a trading-related question, I'd be happy to help.";

async function classifyGabyTopic(message: string) {
  const completion = await openai.chat.completions.create({
    model: "gpt-4.1-mini",
    temperature: 0,
    messages: [
      {
        role: "system",
        content: `
You are a strict topic classifier for TradeNestX Gaby.

Classify the user's message as:
TRADING
or
OFF_TOPIC

TRADING includes trading, investing, financial markets, crypto, stocks, ETFs, indexes, forex, commodities, futures, options, technical analysis, market news education, risk management, trading psychology, simulator questions, TradeNestX platform questions, TradeNestX lessons, and English or Spanish trading questions.

OFF_TOPIC includes sex, sexual content, dating, relationships, politics, religion, celebrities, sports, movies, music, gaming, recipes, travel, homework unrelated to trading, programming unrelated to TradeNestX or trading tools, medical advice, legal advice, personal life advice, and random general knowledge.

Return only one word:
TRADING
or
OFF_TOPIC
`,
      },
      {
        role: "user",
        content: message,
      },
    ],
  });

  const result = completion.choices[0].message.content?.trim();

  return result === "TRADING" ? "TRADING" : "OFF_TOPIC";
}

export async function POST(req: Request) {
  try {
    const { message, lesson } = await req.json();

    if (!message || typeof message !== "string") {
      return Response.json({
        answer: "Ask me a trading or TradeNestX question and I’ll help.",
      });
    }

const topic = await classifyGabyTopic(message);

if (topic === "OFF_TOPIC") {
  return Response.json({
    answer: OFF_TOPIC_REDIRECT,
  });
}

    const websitePrompt = `
You are answering inside the TradeNestX Learn page.

Current TradeNestX lesson:
${lesson || "No specific lesson selected"}

User question:
${message}

Website Gaby instructions:
- Focus on the current lesson when it helps.
- Answer the user's question first.
- Do not immediately redirect to TradeNestX.
- Mention TradeNestX only when it naturally helps.
- Do not sound salesy, repetitive, or robotic.
- Do not end every answer by recommending TradeNestX.
- Do not recommend outside platforms, courses, communities, influencers, or brokers.
- Keep most answers 1-2 sentences.
- Maximum 40 words unless the user asks for more detail.
- Answer in the same language the user uses.

TradeNestX Beginner Academy currently teaches:
1. What Are You Buying?
2. How The Market Works
3. Market vs Limit Orders
4. Protecting Your Capital
5. Candlestick Basics
6. Trading Timeframes
7. Volume Basics
8. Support & Resistance
9. Supply & Demand
10. Chart Patterns
11. Building A Trade Plan
12. Trading Psychology
13. Essential Trading Terms
14. Trader Checkpoint

TradeNestX Simulator currently supports:
- Crypto spot trading
- Crypto futures trading
- Longs and shorts
- Leverage
- Liquidation
- Market orders
- Limit orders
- Open positions
- Trade history
- Paper trading only

Future TradeNestX topics may include:
- Stocks
- Options
- Forex
- Indexes
- ETFs
- Commodities
- Advanced indicators
- Advanced market structure
- Market scanners
- Portfolio analytics
`;

    const completion = await openai.chat.completions.create({
      model: "gpt-4.1-mini",
      messages: [
        {
          role: "system",
          content: `
${GABY_CORE_PROMPT}

${tradenestxKnowledge}

${websitePrompt}
`,
        },
        {
          role: "user",
          content: message,
        },
      ],
    });

    const response =
      completion.choices[0].message.content ||
      "I'm having trouble answering right now.";

    return Response.json({
      answer: response,
    });
  } catch (error) {
    console.error("GABY API ERROR:", error);

    return Response.json({
      answer: "Gaby is having trouble responding right now.",
    });
  }
}