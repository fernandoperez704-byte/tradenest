import OpenAI from "openai";
import { buildTraderDevelopmentReport } from "@/lib/traderDevelopment/report";
import { GABY_CORE_PROMPT } from "@/lib/gaby/core/gabyCore";
import { tradenestxKnowledge } from "@/lib/gaby/core/tradenestxKnowledge";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

function formatPrice(price: number | null | undefined) {
  if (price == null || !Number.isFinite(price)) {
    return "N/A";
  }

  if (price >= 1000) return price.toLocaleString("en-US", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });

  if (price >= 1) return price.toFixed(2);

  if (price >= 0.01) return price.toFixed(4);

  if (price >= 0.0001) return price.toFixed(6);

  return price.toFixed(8);
}

export async function POST(req: Request) {
  try {
    const {
      question,
      simulatorContext,
      lastReviewData,
      conversationHistory,
      lastReferencedLevel,
      lastTopic,
    } = await req.json();

    const normalizedQuestion = question?.trim().toLowerCase() || "";


const formattedHistory: {
  role: "user" | "assistant";
  content: string;
}[] = [];
if (Array.isArray(conversationHistory)) {
  conversationHistory.forEach((turn) => {
    if (turn.user) formattedHistory.push({ role: "user", content: turn.user });
    if (turn.gaby) formattedHistory.push({ role: "assistant", content: turn.gaby });
  });
}

    // 1. Instant Acknowledgement Handlers
    const acknowledgementReplies: Record<string, string> = {
      ok: "Great. What would you like to explore next?",
      okay: "Great. What would you like to explore next?",
      yes: "Perfect.",
      yep: "Perfect.",
      yup: "Perfect.",
      cool: "Glad that helped.",
      nice: "Happy to help.",
      "got it": "Perfect.",
      understood: "Excellent.",
      "makes sense": "I'm glad it makes sense.",
thanks: "You're welcome!",
thank: "You're welcome!",
"thank you": "You're very welcome!",
ty: "You're welcome!",
thx: "You're welcome!",
thk: "You're welcome!",
      hi: "Hi! What can I help you understand today?",
      hello: "Hello! What would you like to explore today?",
      hey: "Hey! What can I help you understand today?",
      "good morning": "Good morning! Ready to learn something new?",
      "good afternoon": "Good afternoon! What can I help you with today?",
      "good evening": "Good evening! What would you like to discuss?",
      bye: "Take care! Keep practicing, and I'll be here whenever you're ready.",
      goodbye: "Take care! See you next time.",
      "see you": "See you next time!",
      "talk later": "Sounds good. I'll be here when you're back.",
      "good night": "Good night! See you soon.",
    };

    const acknowledgementReply = acknowledgementReplies[normalizedQuestion];
    if (acknowledgementReply) {
      return Response.json({ answer: acknowledgementReply });
    }

// 🚨 Short-circuit immediately if trying to review a trade but no active trade data exists
const isAskingToReviewLastTrade = 
  normalizedQuestion.includes("review my last trade") || 
  normalizedQuestion.includes("review last trade") ||
  normalizedQuestion.includes("review my trade");

if (isAskingToReviewLastTrade && !lastReviewData) {
  return Response.json({
    answer: "You haven't executed or selected a trade in the simulator to review yet. Try opening and closing a practice position first!",
  });
}

// 2. Extract Context Elements
const {
  conversationIntent,
  conversationSubject,
  conversationState,
  marketAnalysisSummary,
  traderDevelopmentEngines,
  ...marketFacts
} = simulatorContext || {};

    // 🛑 STRICTOR GUARDRAIL: Intercept bypass phrases that act like signals or predictions
    const lowerQuestion = normalizedQuestion.toLowerCase();
const isAskingForSignalOrAdvice =
  conversationIntent === "SIGNAL_REQUEST" ||
  lowerQuestion.includes("good time to short") ||
  lowerQuestion.includes("good to short") ||
  lowerQuestion.includes("should i short") ||
  lowerQuestion.includes("when to short") ||
  lowerQuestion.includes("good time to buy") ||
  lowerQuestion.includes("good to buy") ||
  lowerQuestion.includes("should i buy") ||
  lowerQuestion.includes("when to buy") ||
  lowerQuestion.includes("should i long") ||
  lowerQuestion.includes("should i sell");

    if (conversationIntent === "PRICE_PREDICTION") {
      return Response.json({
        answer:
          "I can't predict whether BTC will go up or down. I can explain the current market direction, structure, momentum, support, resistance, and other TradeNestX engine facts to help you understand the market, but I don't predict future price movements.",
      });
    }

    if (isAskingForSignalOrAdvice) {
      return Response.json({
        answer:
          "I can't provide specific buy, sell, long, or short recommendations or financial advice. I can explain the technical factors—like how traders view a resistance zone or bearish momentum conceptually—but individual entry quality depends entirely on your own risk management and execution criteria.",
      });
    }

    // Fetch the development report async if a userId exists
const tradeLimitMatch = normalizedQuestion.match(/last\s+(\d+)\s+trades/);

const tradeLimit = tradeLimitMatch
  ? Number(tradeLimitMatch[1])
  : undefined;

const traderDevelopmentReport = simulatorContext?.userId
  ? await buildTraderDevelopmentReport(simulatorContext.userId, tradeLimit)
  : null;

// Handle trader report questions directly
if (
  normalizedQuestion.includes("trade report") ||
  normalizedQuestion.includes("trades report") ||
  normalizedQuestion.includes("trader report") ||
  normalizedQuestion.includes("development report") ||
  normalizedQuestion.includes("progress report") ||
  /last\s+\d+\s+trades/.test(normalizedQuestion) ||
  normalizedQuestion.includes("last 10 trades") ||
  normalizedQuestion.includes("last ten trades") ||
  normalizedQuestion.includes("last 20 trades") ||
  normalizedQuestion.includes("last trades") ||
  normalizedQuestion.includes("recent trades") ||
  normalizedQuestion.includes("my last trades")
) {
// 🚨 Short-circuit immediately if no history exists for reports or reviews
if (!traderDevelopmentReport) {
  return Response.json({
    answer: "I don't have any reviewed trades available for your account to analyze yet. Please complete or save some practice trades in the simulator first!",
  });
}

  const development = traderDevelopmentReport.developmentReport;
  const profile = traderDevelopmentReport.profileReport;

if ((development?.totalTrades ?? 0) < 20) {
  const totalTrades = development?.totalTrades ?? 0;
  const remainingTrades = 20 - totalTrades;

  return Response.json({
    answer: `Complete ${remainingTrades} more reviewed trades to unlock your full Trader Development Report.

Once you've reached 20 reviewed trades, you'll receive:

• Overall Performance Score
• Strongest Skill
• Weakest Skill
• Personalized Strengths
• Areas for Improvement
• Trading Recommendations`,
  });
}

  return Response.json({
    answer: `**Development Report**

Total Trades: ${development?.totalTrades}
Wins: ${development?.wins}
Losses: ${development?.losses}
Win Rate: ${development?.winRate}%

Main Weaknesses:
${development?.weaknesses?.map((x: string) => `• ${x}`).join("\n")}

Recommendations:
${development?.recommendations
  ?.filter((x: string) => !x.toLowerCase().includes("interval") && !x.toLowerCase().includes("chart"))
  ?.map((x: string) => `• ${x}`)
  .join("\n")}

Profile Summary:
Overall Score: ${profile?.overallScore}
Strongest Skill: ${profile?.strongestSkill?.name ?? "N/A"}
Weakest Skill: ${profile?.weakestSkill?.name ?? "N/A"}`,
  });
}

// Handle nearest support with focused GPT explanation
if (normalizedQuestion.includes("nearest support")) {
  const support = marketFacts.nearestSupport;
  const timeframe =
  marketFacts.selectedTimeframe === "1M"
    ? "1 Minute"
    : marketFacts.selectedTimeframe === "5M"
    ? "5 Minutes"
    : marketFacts.selectedTimeframe === "15M"
    ? "15 Minutes"
    : marketFacts.selectedTimeframe === "1H"
    ? "1 Hour"
    : marketFacts.selectedTimeframe === "4H"
    ? "4 Hours"
    : marketFacts.selectedTimeframe === "1D"
    ? "1 Day"
    : marketFacts.selectedTimeframe || "Selected";
  const coin = marketFacts.selectedCoin || "the selected market";
  const currentPrice = marketFacts.currentPrice;

  if (!support) {
    return Response.json({
      answer: `I don't see a clear support level on the selected **${timeframe}** timeframe right now.`,
    });
  }

  const supportPrompt = `
User Question:
${question}

TradeNestX Engine Facts:
Coin: ${coin}
Selected Timeframe: ${timeframe}
Current Price: $${formatPrice(currentPrice)}

${
  support.low === support.high
    ? `Nearest Support Level: $${formatPrice(support.low)}`
    : `Nearest Support Zone: $${formatPrice(support.low)} - $${formatPrice(support.high)}`
}

Rules:
- Answer only the nearest support question.
- Mention the selected timeframe.
- If a Support Zone is provided, explain that support is a zone, not one exact price.
- If a Support Level is provided, refer to it as a single support level.
- Do not mention resistance, RSI, momentum, conviction, or market direction.
- Do not give trade advice.
- Keep it under 80 words.
- Use only the facts above.
`;

  const completion = await openai.chat.completions.create({
    model: "gpt-4o-mini",
    messages: [
      {
        role: "system",
        content: GABY_CORE_PROMPT,
      },
      ...formattedHistory,
      {
        role: "user",
        content: supportPrompt,
      },
    ],
  });

return Response.json({
  answer:
    completion.choices[0].message.content ||
    `The nearest support on the selected **${timeframe}** timeframe is between **$${formatPrice(support.low)}** and **$${formatPrice(support.high)}**.`,
});
}

// Handle nearest resistance with focused GPT explanation
if (normalizedQuestion.includes("nearest resistance")) {
  const resistance = marketFacts.nearestResistance;
  const timeframe =
  marketFacts.selectedTimeframe === "1M"
    ? "1 Minute"
    : marketFacts.selectedTimeframe === "5M"
    ? "5 Minutes"
    : marketFacts.selectedTimeframe === "15M"
    ? "15 Minutes"
    : marketFacts.selectedTimeframe === "1H"
    ? "1 Hour"
    : marketFacts.selectedTimeframe === "4H"
    ? "4 Hours"
    : marketFacts.selectedTimeframe === "1D"
    ? "1 Day"
    : marketFacts.selectedTimeframe || "Selected";
  const coin = marketFacts.selectedCoin || "the selected market";
  const currentPrice = marketFacts.currentPrice;

  if (!resistance) {
    return Response.json({
      answer: `I don't see a clear resistance level on the selected **${timeframe}** timeframe right now.`,
    });
  }

  const resistancePrompt = `
User Question:
${question}

TradeNestX Engine Facts:

Coin: ${coin}
Selected Timeframe: ${timeframe}
Current Price: $${formatPrice(currentPrice)}

${
  resistance.low === resistance.high
    ? `Nearest Resistance Level: $${formatPrice(resistance.low)}`
    : `Nearest Resistance Zone: $${formatPrice(resistance.low)} - $${formatPrice(resistance.high)}`
}

Rules:

- Answer ONLY the nearest resistance question.
- Mention the selected timeframe.
- If a Resistance Zone is provided, explain that resistance is a zone, not one exact price.
- If a Resistance Level is provided, refer to it as a single resistance level.
- Do NOT mention support.
- Do NOT mention RSI.
- Do NOT mention momentum.
- Do NOT mention market direction.
- Do NOT give trade advice.
- Keep the answer under 80 words.
- Use ONLY the engine facts above.
`;

  const completion = await openai.chat.completions.create({
    model: "gpt-4o-mini",
    messages: [
      {
        role: "system",
        content: GABY_CORE_PROMPT,
      },
      ...formattedHistory,
      {
        role: "user",
        content: resistancePrompt,
      },
    ],
  });

return Response.json({
  answer:
    completion.choices[0].message.content ||
    `The nearest resistance on the selected **${timeframe}** timeframe is between **$${formatPrice(resistance.low)}** and **$${formatPrice(resistance.high)}**.`,
});
}

// Handle overall market direction with focused GPT explanation
const isMarketAnalysisQuestion =
  conversationIntent === "MARKET_ANALYSIS" ||
  normalizedQuestion.includes("overall market direction") ||
  normalizedQuestion.includes("market direction") ||
  normalizedQuestion.includes("overall direction") ||
  normalizedQuestion.includes("market condition") ||
  normalizedQuestion.includes("market outlook") ||
  normalizedQuestion.includes("current market") ||
  normalizedQuestion.includes("current trend") ||
  normalizedQuestion.includes("what is the market doing") ||
  normalizedQuestion.includes("analyze btc") ||
  normalizedQuestion.includes("analyze bitcoin");

if (isMarketAnalysisQuestion) {
const direction = marketFacts.marketDirection;
const structure = marketFacts.structure;

const marketState = marketFacts.marketState;
const controlStrength = marketFacts.controlStrength;
const moveCondition = marketFacts.moveCondition;
const momentumStage = marketFacts.momentumStage;
const momentumAnalysis = marketFacts.momentumAnalysis;
const nearestSupport = marketFacts.nearestSupport;
const nearestResistance = marketFacts.nearestResistance;
const currentPrice = marketFacts.currentPrice;


  const timeframe =
    marketFacts.selectedTimeframe === "1M"
      ? "1 Minute"
      : marketFacts.selectedTimeframe === "5M"
      ? "5 Minutes"
      : marketFacts.selectedTimeframe === "15M"
      ? "15 Minutes"
      : marketFacts.selectedTimeframe === "1H"
      ? "1 Hour"
      : marketFacts.selectedTimeframe === "4H"
      ? "4 Hours"
      : marketFacts.selectedTimeframe === "1D"
      ? "1 Day"
      : marketFacts.selectedTimeframe || "Selected";

  const coin =
    marketFacts.selectedCoin || "the selected market";

  if (!direction) {
    return Response.json({
      answer: `I don't have enough market data to determine the overall direction on the selected **${timeframe}** timeframe.`,
    });
  }

const directionPrompt = `
User Question:
${question}

TradeNestX Engine Facts:

Coin: ${coin}
Selected Timeframe: ${timeframe}
Current Price: $${formatPrice(currentPrice)}

Market Direction: ${direction}
Market Structure: ${structure || "UNKNOWN"}
Market State: ${marketState || "UNKNOWN"}

Control Strength: ${controlStrength || "UNKNOWN"}
Move Condition: ${moveCondition || "UNKNOWN"}


Nearest Support:
${
  nearestSupport
    ? nearestSupport.low === nearestSupport.high
      ? `$${formatPrice(nearestSupport.low)}`
      : `$${formatPrice(nearestSupport.low)} - $${formatPrice(nearestSupport.high)}`
    : "NONE"
}

Nearest Resistance:
${
  nearestResistance
    ? nearestResistance.low === nearestResistance.high
      ? `$${formatPrice(nearestResistance.low)}`
      : `$${formatPrice(nearestResistance.low)} - $${formatPrice(nearestResistance.high)}`
    : "NONE"
}

Rules:

- Answer only the user's overall market direction question.
- Mention the coin and selected timeframe.
- Use ONLY the supplied TradeNestX engine facts.
- Explain the Market Direction.
- Explain the Market Structure.
- Mention the nearest Support and Resistance when available.
- Use support and resistance correctly:
  - Support is the lower market level.
  - Resistance is the upper market level.
  - A break below support may reinforce bearish conditions.
  - A break above resistance may reinforce bullish conditions.
  - Holding above support may help preserve the current structure.
  - Holding below resistance may help preserve the current structure.
- Do not discuss Momentum unless the user specifically asks about Momentum.
- Do not discuss Volume, RSI, or other indicators unless the user specifically asks about them.
- Never identify, infer, or describe chart patterns.
- Never invent technical observations that are not provided by the TradeNestX engines.
- Do not infer information from the chart.
- Do not predict future prices.
- Do not provide buy, sell, long, or short recommendations.
- Keep the answer under 100 words.
`;

  const completion =
    await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        {
          role: "system",
          content: GABY_CORE_PROMPT,
        },
        ...formattedHistory,
        {
          role: "user",
          content: directionPrompt,
        },
      ],
    });

  return Response.json({
    answer:
      completion.choices[0].message.content ||
      `The overall market direction for **${coin}** on the selected **${timeframe}** timeframe is **${direction}**.`,
  });
}


    // 3. Fallback Short-circuit for Direct Market Updates
    // Expanded match strings to be slightly more forgiving

const isTradeReviewFollowUp =
  conversationState?.intent === "TRADE_REVIEW";

    // 4. Setup Dynamic Engine Prompts & Context Payloads
    const isTradeReviewMode =
  !!lastReviewData &&
  (
    conversationIntent === "TRADE_REVIEW" ||
    (
      conversationState?.intent === "TRADE_REVIEW" &&
      conversationIntent === "FOLLOW_UP"
    )
  );
const systemPrompt = `
${GABY_CORE_PROMPT}

${tradenestxKnowledge}

IMPORTANT:
You explain TradeNestX engine facts only.
Do not create new market analysis.
Do not review trades yourself.
If trade review facts are provided, explain those facts only.
When explaining a reviewed trade, prioritize process over outcome, but diagnose only the execution facts explicitly produced by the TradeNestX engine.
Always mention the selected timeframe when answering market levels, direction, support, resistance, RSI, momentum, or trade review.
Never identify or infer chart patterns unless they come from a completed deterministic TradeNestX Pattern Engine. If no Pattern Engine facts are supplied, do not mention or imply any chart pattern.
Keep direct questions short and focused.
`;
    
    const reviewEngine = lastReviewData?.engine ?? null;
    
const reviewTimeframe =
  reviewEngine?.timeframe === "1M"
    ? "1 Minute"
    : reviewEngine?.timeframe === "5M"
    ? "5 Minutes"
    : reviewEngine?.timeframe === "15M"
    ? "15 Minutes"
    : reviewEngine?.timeframe === "1H"
    ? "1 Hour"
    : reviewEngine?.timeframe === "4H"
    ? "4 Hours"
    : reviewEngine?.timeframe === "1D"
    ? "1 Day"
    : reviewEngine?.timeframe || "Unknown";

    // Safely structure condensed trade data to save token overhead
    const condensedTradeFacts = reviewEngine
      ? {
          result: reviewEngine.result,
          finalQuality: reviewEngine.finalQuality,
          review: reviewEngine.review,
        }
      : null;

const reviewPrompt = `
User Question:
${question}

TradeNestX Engine Review Data

Trading Timeframe:
${reviewTimeframe}

Market Direction at Entry:
${reviewEngine?.marketAtEntry?.marketDirection ?? "UNKNOWN"}

Entry Quality:
${reviewEngine?.entryReview?.quality ?? "UNKNOWN"}

Entry Review:
${reviewEngine?.entryReview?.review ?? "N/A"}

Entry Lesson:
${reviewEngine?.entryReview?.lesson ?? "N/A"}

Risk Review:
${reviewEngine?.riskReview?.review ?? "N/A"}

Management Review:
${reviewEngine?.managementReview?.lesson ?? "N/A"}

Exit Review:
${reviewEngine?.exitReview?.explanation ?? "N/A"}

Raw Review Explanation:
${reviewEngine?.review?.explanation ?? "N/A"}

Raw Review Context:
${reviewEngine?.review?.context ?? "N/A"}

Raw Review Lesson:
${reviewEngine?.review?.lesson ?? "N/A"}

CRITICAL INSTRUCTION:
Perform a process-based critique of this reviewed trade using only the TradeNestX engine facts above.

- Do not merely repeat whether the trade won or lost.
- Explain what happened only briefly, then focus on why the process produced that result.
- Separate the financial outcome from the quality of the trading process.
- Identify the strongest part of the process when the facts support one.
- Identify one main weakness supported by the facts.
- End with one specific improvement supported by the facts.
- If fees caused the loss, explain the break-even hurdle as an execution or trade-selection consideration.
- Do not claim the entry was late, emotional, overextended, poorly timed, or misaligned unless the engine explicitly says so.
- Do not claim the user violated a personal rule unless such a rule appears in the engine facts.
- A losing trade may still have a sound process.
- A profitable trade may still have weak execution.

Rules:
- Answer ONLY the user's question about the latest reviewed trade.
- Explain the existing engine review; do not create a new trade review.
- Use ONLY the supplied TradeNestX engine facts.
- Treat follow-up questions as referring to the latest reviewed trade unless the user clearly asks about multiple trades or a trader report.
- If the user asks specifically about the entry, focus on Entry Quality, Entry Review, and Entry Lesson.
- If the user asks specifically about risk, focus on Risk Review.
- If the user asks specifically about management or exit, focus on Management Review and Exit Review.
- If the supplied facts are insufficient for the requested diagnosis, clearly say so.
- Do not invent emotions, volatility, support, resistance, indicators, strategy rules, or market conditions.
- Do not provide buy, sell, long, or short advice.
- Keep the answer under 100 words.
`;

    // Standard comprehensive fallback layout
    const userPrompt = `
User Question:
${question}

Conversation State:
Intent: ${conversationIntent || "NONE"}
Subject: ${conversationSubject || "NONE"}
State: ${JSON.stringify(conversationState || {}, null, 2)}

Conversation Instruction:
- If the conversation subject exists, remain on that subject until the user clearly changes topics.
- Treat the conversation state as the highest-priority context for follow-up questions.

General Answer Rules:
- Answer the user's question directly before adding extra information.
- Use the TradeNestX facts provided below as the primary source of truth.
- Use the Current Market Facts when the user asks about the market.
- Use the Latest Reviewed Trade Facts only when the user is referring to their reviewed trade.
- Use the Trader Development Report only when the user asks about their trading performance or multiple trades.
- Use the Conversation History to continue natural follow-up conversations.

- Use the Market Analysis Summary only when it is relevant to the user's question.
- If information is missing, clearly say you don't have enough information instead of guessing.
- Never invent market facts, trade results, or TradeNestX features.
- Never predict future prices.
- Never provide buy, sell, long, or short signals.
- Explain the reasoning behind the TradeNestX engine facts instead of creating new analysis.
- Keep answers concise unless the user asks for more detail.
- If the user asks a conversational follow-up or summary phrase (e.g., "so in conclusion", "what does this mean", "makes sense"), answer with a brief, natural 2-sentence conversational response. Do NOT re-generate list structures, bullet points, or repeat the entire performance diagnostic.


Recent Conversation:
${conversationHistory ? JSON.stringify(conversationHistory, null, 2) : "NONE"}

Market Analysis Summary:
${marketAnalysisSummary || "NONE"}

Current Market Facts:
${JSON.stringify(
  {
    selectedCoin: marketFacts.selectedCoin,
    selectedTimeframe: marketFacts.selectedTimeframe,
    currentPrice: marketFacts.currentPrice,
    marketDirection: marketFacts.marketDirection,
    structure: marketFacts.structure,
    priceLocation: marketFacts.priceLocation,
    nearestSupport: marketFacts.nearestSupport,
    nextSupport: marketFacts.nextSupport,
    nearestResistance: marketFacts.nearestResistance,
    nextResistance: marketFacts.nextResistance,
    momentumAnalysis: marketFacts.momentumAnalysis,
    volumeAnalysis: marketFacts.volumeAnalysis,
    rsiAnalysis: marketFacts.rsiAnalysis,
    marketConviction: marketFacts.marketConviction,
  },
  null,
  2
)}

Latest Reviewed Trade Facts:
${
  isTradeReviewMode
    ? JSON.stringify(condensedTradeFacts, null, 2)
    : "NONE"
}

Trader Development Engine Facts:
${
  traderDevelopmentEngines
    ? JSON.stringify(traderDevelopmentEngines, null, 2)
    : "NONE"
}

IMPORTANT TRADER DEVELOPMENT RULES:
- The Trader Development Engine Facts are the authoritative values currently displayed in the simulator.
- Never recalculate, estimate, round differently, or replace these percentages.
- When asked about Trend Bias, Risk Allocation, Entry Quality, or Exit Management, use these exact values.
- Do not use a separately calculated report percentage when a matching Trader Development Engine value is available.

Trader Development Report:
${traderDevelopmentReport?.developmentReport ? JSON.stringify(traderDevelopmentReport.developmentReport, null, 2) : "NONE"}

Trader Progress Report:
${traderDevelopmentReport?.progressReport ? JSON.stringify(traderDevelopmentReport.progressReport, null, 2) : "NONE"}

Trader Profile Report:
${traderDevelopmentReport?.profileReport ? JSON.stringify(traderDevelopmentReport.profileReport, null, 2) : "NONE"}

Last Referenced Level:
${lastReferencedLevel ? JSON.stringify(lastReferencedLevel, null, 2) : "NONE"}

Last Topic:
${lastTopic || "NONE"}
`;

    // 5. Query LLM Instance Engine
    const completion = await openai.chat.completions.create({
      model: "gpt-4o-mini", // Fixed target ID from non-existent gpt-4.1-mini
messages: [
  {
    role: "system",
    content: systemPrompt,
  },
  ...formattedHistory, // ✨ Splice the conversation thread into the middle here
  {
    role: "user",
    content: isTradeReviewMode ? reviewPrompt : userPrompt,
  },
],
      
    });

    return Response.json({
      answer: completion.choices[0].message.content || "Gaby could not respond right now.",
    });

  } catch (error) {
    console.error("Post Route Processing Failure:", error);
    return Response.json({
      answer: "Gaby is having trouble reviewing the simulator right now.",
    });
  }
}