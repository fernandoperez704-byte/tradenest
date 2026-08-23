import OpenAI from "openai";
import { auth } from "@clerk/nextjs/server";
import { GABY_CORE_PROMPT } from "@/lib/gaby/core/gabyCore";
import { tradenestxKnowledge } from "@/lib/gaby/core/tradenestxKnowledge";
import { checkGabyUsage, useGabyQuestion } from "@/lib/gabyUsage";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

type ConversationMessage = {
  role: "user" | "assistant";
  content: string;
};

const OFF_TOPIC_REDIRECT =
  "I'm your TradeNestX trading coach, so I focus on helping you understand markets, trading concepts, risk, and the TradeNestX platform. If you have a trading-related question, I'd be happy to help.";

async function classifyGabyTopic(
  message: string,
  conversationHistory: ConversationMessage[]
) {
  const recentContext = conversationHistory
    .slice(-6)
    .map((item) => `${item.role}: ${item.content}`)
    .join("\n");

const completion = await openai.chat.completions.create({
  model: "gpt-5.6-luna",
    messages: [
      {
        role: "system",
        content: `
You are a strict topic classifier for TradeNestX Gaby.

Classify the user's newest message as:
TRADING
or
OFF_TOPIC

Use the recent conversation when the newest message is a short follow-up
such as "why?", "how?", "explain that", "what about it?", or "tell me more."

TRADING includes trading, investing, financial markets, crypto, stocks,
ETFs, indexes, forex, commodities, futures, options, technical analysis,
market education, risk management, trading psychology, simulator questions,
TradeNestX platform questions, TradeNestX lessons, support and billing questions,
questions about the current date, current time, or current year,
and questions about Gaby's identity, role, capabilities, limitations, or relationship
to TradeNestX, in English or Spanish.

OFF_TOPIC includes sex, sexual content, dating, relationships, politics,
religion, celebrities, sports, movies, music, gaming, recipes, travel,
homework unrelated to trading, programming unrelated to TradeNestX or
trading tools, medical advice, legal advice, personal life advice, and
random general knowledge.

Return only one word:
TRADING
or
OFF_TOPIC
`,
      },
      {
        role: "user",
        content: `
Recent conversation:
${recentContext || "No previous conversation"}

Newest message:
${message}
`,
      },
    ],
  });

  const result = completion.choices[0].message.content?.trim();

  return result === "TRADING" ? "TRADING" : "OFF_TOPIC";
}

export async function POST(req: Request) {
  try {
    const { userId } = await auth();
    const body = await req.json();

    const message =
      typeof body?.message === "string"
        ? body.message.trim()
        : "";

    const lesson =
      typeof body?.lesson === "string"
        ? body.lesson
        : "No specific lesson selected";

  const context =
  body?.context === "SUPPORT" ? "SUPPORT" : "LEARN";  
  
const now = new Date();

const currentDate = now.toLocaleDateString("en-US", {
  year: "numeric",
  month: "long",
  day: "numeric",
  timeZone: "America/New_York",
});

const currentTime = now.toLocaleTimeString("en-US", {
  hour: "numeric",
  minute: "2-digit",
  timeZone: "America/New_York",
});  

    const conversationHistory: ConversationMessage[] = Array.isArray(
      body?.conversationHistory
    )
      ? body.conversationHistory
          .filter(
            (item: unknown): item is ConversationMessage => {
              if (
                typeof item !== "object" ||
                item === null
              ) {
                return false;
              }

              const candidate = item as Partial<ConversationMessage>;

              return (
                (candidate.role === "user" ||
                  candidate.role === "assistant") &&
                typeof candidate.content === "string" &&
                candidate.content.trim().length > 0
              );
            }
          )
          .slice(-10)
      : [];

    if (!message) {
      return Response.json({
        answer:
          "Ask me a trading or TradeNestX question and I’ll help.",
      });
    }

if (!userId) {
  return Response.json(
    { answer: "Sign in to ask Gaby questions." },
    { status: 401 }
  );
}

if (context !== "SUPPORT") {
  const usage = await checkGabyUsage(userId);

  if (!usage.allowed) {
    return Response.json({
      answer:
        "You've used your 5 free Gaby questions. Upgrade to TradeNestX Pro for unlimited Gaby access.",
      upgradeRequired: true,
    });
  }
}

    const topic = await classifyGabyTopic(
      message,
      conversationHistory
    );

    if (topic === "OFF_TOPIC") {
      return Response.json({
        answer: OFF_TOPIC_REDIRECT,
      });
    }

const websitePrompt = `
You are the same Gaby used throughout TradeNestX.

CURRENT DATE AND TIME:
Current date: ${currentDate}
Current time: ${currentTime} Eastern Time

DATE/TIME RULES:
- The current date and time above are authoritative.
- If the user asks what year it is, use the year from Current date.
- If the user asks today's date, use Current date.
- If the user asks the current time, use Current time.
- Never guess the current year, date, or time.

Current page:
${context === "SUPPORT" ? "TradeNestX Support" : "TradeNestX Learn"}

Current lesson/context:
${lesson}

${context === "SUPPORT" ? `
Support page instructions:
- Prioritize TradeNestX account, billing, Pro, subscription, simulator, Academy, Community, and platform support questions.
- Use the TradeNestX platform knowledge provided above.
- Resolve the user's question directly when the answer is known.
- Do not redirect users to support email when Gaby can answer the question herself.
- For account-specific payment, refund, charge, or subscription-status questions, never invent account information.
- If the issue requires human assistance, direct the user to support@tradenestxacademy.com.
` : `
Learn page instructions:
- Stay focused on the current lesson unless the user clearly changes topics.
`}

Website Gaby instructions:    
- Answer the newest user question directly.
- Use the previous conversation to understand follow-up questions.
- When the user says "why?", "how?", "explain that", "what about it?",
  or refers to something mentioned earlier, continue from the prior topic.
- Stay focused on the current lesson unless the user clearly changes topics.
- Do not repeat information the user already understands unless needed.
- Do not immediately redirect to TradeNestX.
- Mention TradeNestX only when it naturally helps.
- Do not sound salesy, repetitive, or robotic.
- Do not end every answer by recommending TradeNestX.
- Do not recommend outside platforms, courses, communities,
  influencers, or brokers.
- Keep most answers to 1–3 sentences.
- Maximum 60 words unless the user requests more detail.
- Answer in the same language the user uses.
- Never provide buy or sell signals.
- Never predict future prices.
- Never provide financial advice.

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

TradeNestX Advanced Academy currently teaches:
1. Moving Averages
2. Market Structure
3. RSI & Momentum
4. Market Context
5. Futures & Leverage

TradeNestX Simulator currently supports:
- Crypto spot trading
- Binance-style crypto perpetual futures simulation
- Longs and shorts
- Leverage
- Margin
- Liquidation
- Market orders
- Limit orders
- Take profit and stop loss
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
- Market scanners
- Portfolio analytics
`;

    const completion = await openai.chat.completions.create({
      model: "gpt-5.6-luna",
      
      messages: [
        {
          role: "system",
          content: `
${GABY_CORE_PROMPT}

${tradenestxKnowledge}

${websitePrompt}
`,
        },

        ...conversationHistory.map((item) => ({
          role: item.role,
          content: item.content,
        })),

        {
          role: "user",
          content: message,
        },
      ],
    });

const response =
  completion.choices[0].message.content ||
  "I'm having trouble answering right now.";

if (context !== "SUPPORT") {
  await useGabyQuestion(userId);
}

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