import OpenAI from "openai";
import { buildTraderDevelopmentReport } from "@/lib/traderDevelopment/report";
import { GABY_CORE_PROMPT } from "@/lib/gaby/core/gabyCore";
import { tradenestxKnowledge } from "@/lib/gaby/core/tradenestxKnowledge";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

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
      "thank you": "You're very welcome!",
      ty: "You're welcome!",
      thx: "You're welcome!",
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

    // 2. Extract Context Elements
    const {
      conversationIntent,
      conversationSubject,
      conversationState,
      marketAnalysisSummary,
      ...marketFacts
    } = simulatorContext || {};

if (conversationIntent === "PRICE_PREDICTION") {
  return Response.json({
    answer:
      "I can't predict whether BTC will go up or down. I can explain the current market direction, structure, momentum, support, resistance, and other TradeNestX engine facts to help you understand the market, but I don't predict future price movements.",
  });
}

if (conversationIntent === "SIGNAL_REQUEST") {
  return Response.json({
    answer:
      "I can't answer yes or no to a buy, sell, long, or short decision. If you're referring to the support or resistance we were just discussing, remember that a single level is only one part of the TradeNestX analysis. Entry quality is evaluated using the overall market context, including direction, structure, momentum, volume, risk, and price location.",
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
  if (!traderDevelopmentReport) {
    return Response.json({
      answer: "I don't have enough simulator history yet to build your trader report.",
    });
  }

  const development = traderDevelopmentReport.developmentReport;
  const profile = traderDevelopmentReport.profileReport;

  return Response.json({
    answer: `**Development Report**

Total Trades: ${development?.totalTrades}
Wins: ${development?.wins}
Losses: ${development?.losses}
Win Rate: ${development?.winRate}%

Main Weaknesses:
${development?.weaknesses?.map((x: string) => `• ${x}`).join("\n")}

Recommendations:
${development?.recommendations?.map((x: string) => `• ${x}`).join("\n")}

Profile Summary:
Overall Score: ${profile?.overallScore}
Strongest Skill: ${profile?.strongestSkill}
Weakest Skill: ${profile?.weakestSkill}`,
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
Current Price: ${currentPrice ? `$${currentPrice.toFixed(2)}` : "N/A"}
${
  support.low === support.high
    ? `Nearest Support Level: $${support.low.toFixed(2)}`
    : `Nearest Support Zone: $${support.low.toFixed(2)} - $${support.high.toFixed(2)}`
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
      {
        role: "user",
        content: supportPrompt,
      },
    ],
  });

  return Response.json({
    answer:
      completion.choices[0].message.content ||
      `The nearest support on the selected **${timeframe}** timeframe is between **$${support.low.toFixed(2)}** and **$${support.high.toFixed(2)}**.`,
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
Current Price: ${currentPrice ? `$${currentPrice.toFixed(2)}` : "N/A"}

${
  resistance.low === resistance.high
    ? `Nearest Resistance Level: $${resistance.low.toFixed(2)}`
    : `Nearest Resistance Zone: $${resistance.low.toFixed(2)} - $${resistance.high.toFixed(2)}`
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
      {
        role: "user",
        content: resistancePrompt,
      },
    ],
  });

  return Response.json({
    answer:
      completion.choices[0].message.content ||
      `The nearest resistance on the selected **${timeframe}** timeframe is between **$${resistance.low.toFixed(2)}** and **$${resistance.high.toFixed(2)}**.`,
  });
}


// Handle overall market direction with focused GPT explanation
if (
  normalizedQuestion.includes("overall market direction") ||
  normalizedQuestion.includes("market direction") ||
  normalizedQuestion.includes("overall direction")
) {
  const direction = marketFacts.marketDirection;
  const structure = marketFacts.structure;
  const conviction = marketFacts.marketConviction;
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

  if (!direction) {
    return Response.json({
      answer: `I don't have enough moving average data to determine the market direction on the selected **${timeframe}** timeframe.`,
    });
  }

  const directionPrompt = `
User Question:
${question}

TradeNestX Engine Facts:

Coin: ${coin}
Selected Timeframe: ${timeframe}
Market Direction: ${direction}
Market Structure: ${structure}
Market Conviction: ${conviction}

Rules:

- Answer ONLY the user's market direction question.
- Mention the selected timeframe.
- Explain what the direction means in simple language.
- If the direction is TRANSITION, explain that the moving averages are not fully aligned.
- Do NOT mention support or resistance.
- Do NOT mention RSI.
- Do NOT mention momentum.
- Do NOT give trade advice.
- Keep the answer under 90 words.
- Use ONLY the engine facts above.
`;

  const completion = await openai.chat.completions.create({
    model: "gpt-4o-mini",
    messages: [
      {
        role: "system",
        content: GABY_CORE_PROMPT,
      },
      {
        role: "user",
        content: directionPrompt,
      },
    ],
  });

  return Response.json({
    answer:
      completion.choices[0].message.content ||
      `On the selected **${timeframe}** timeframe, the overall market direction is **${direction}**.`,
  });
}


    // 3. Fallback Short-circuit for Direct Market Updates
    // Expanded match strings to be slightly more forgiving
    const marketAnalysisKeywords = ["btc", "bitcoin", "market condition", "market outlook", "analyze"];
    const isDirectMarketAnalysisQuestion = marketAnalysisKeywords.some((keyword) =>
      normalizedQuestion.includes(keyword)
    );

    if (
      conversationIntent === "MARKET_ANALYSIS" &&
      marketAnalysisSummary &&
      isDirectMarketAnalysisQuestion
    ) {
      return Response.json({ answer: marketAnalysisSummary });
    }

const isTradeReviewFollowUp =
  conversationState?.intent === "TRADE_REVIEW";

    // 4. Setup Dynamic Engine Prompts & Context Payloads
    const isTradeReviewMode =
  !!lastReviewData &&
  (
    conversationIntent === "TRADE_REVIEW" ||
    conversationState?.intent === "TRADE_REVIEW"
  );
const systemPrompt = `
${GABY_CORE_PROMPT}

${tradenestxKnowledge}

IMPORTANT:
You explain TradeNestX engine facts only.
Do not create new market analysis.
Do not review trades yourself.
If trade review facts are provided, explain those facts only.
Always mention the selected timeframe when answering market levels, direction, support, resistance, RSI, momentum, or trade review.
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

TradeNestX Engine Review

Trading Timeframe:
${reviewTimeframe}

Market Direction:
${reviewEngine?.review?.marketDirection}

Explanation:
${reviewEngine?.review?.explanation}

Context:
${reviewEngine?.review?.context}

Lesson:
${reviewEngine?.review?.lesson}


Rules:

- Answer ONLY the user's question.
- Explain the trade review naturally and ensure correct causal logic.
- Use ONLY the Explanation, Context, Lesson, Market Direction, Entry Quality, Entry Review, and Entry Lesson provided.
- Treat follow-up questions as referring to the latest reviewed trade unless the user clearly asks about multiple trades or a trader report.
- If the user asks about the entry, answer using ONLY the Entry Quality, Entry Review, and Entry Lesson.
- Do NOT answer trade-review follow-up questions as general trading questions.
- Treat the Explanation and Market Direction as authoritative facts.
- If the trade was a loss but the market moved in the user's favor, explain that the loss occurred despite the favorable move because the move was too small to overcome fees or other stated costs. Never say the loss occurred because the market moved in the user's favor.
- If the user asks about the market direction, explain it using ONLY the provided Market Direction. Do not infer or analyze beyond it.
- Do NOT create a new trade review.
- Do NOT invent new reasons or market conditions.
- Do NOT explain support or resistance unless they are explicitly included in the review.
- Do NOT explain RSI, momentum, patterns, or other indicators unless they are explicitly included in the review.
- Keep the answer under 80 words.
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