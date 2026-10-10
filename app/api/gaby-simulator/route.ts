import OpenAI from "openai";
import { auth, currentUser } from "@clerk/nextjs/server";
import { buildTraderDevelopmentReport } from "@/lib/traderDevelopment/report";
import { GABY_CORE_PROMPT } from "@/lib/gaby/core/gabyCore";
import { tradenestxKnowledge } from "@/lib/gaby/core/tradenestxKnowledge";
import { tradenestxUpdates } from "@/lib/gaby/core/tradenestxUpdates";
import { checkGabyUsage, useGabyQuestion } from "@/lib/gabyUsage";

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
    const { userId } = await auth();

const clerkUser = userId ? await currentUser() : null;

const userName =
  clerkUser?.firstName ||
  clerkUser?.username ||
  null;   

const {
  question,
  simulatorContext,
  lastReviewData,
  conversationHistory,
  longTermMemory,
  lastReferencedLevel,
  lastTopic,
  
} = await req.json();


const normalizedQuestion = question?.trim().toLowerCase() || "";

const {
  userFirstName,
  conversationIntent,
  conversationSubject,
  conversationState,
  marketAnalysisSummary,
  traderDevelopmentEngines,
  personalizedReviewFacts,
  traderReportFacts,
  ...marketFacts
} = simulatorContext || {};

// Give Gaby the real current date and time
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

async function requireGabyAccess() {
    
  if (!userId) {
    return Response.json(
      { answer: "Sign in to ask Gaby personalized questions." },
      { status: 401 }
    );
  }

  const usage = await checkGabyUsage(userId);

  if (!usage.allowed) {
    return Response.json({
      answer:
        "You've used your 5 free Gaby questions. Upgrade to TradeNestX Pro for unlimited Gaby access.",
      upgradeRequired: true,
    });
  }

return null;
}    

const sanitizedLongTermMemory = {
  goals: Array.isArray(longTermMemory?.goals)
    ? longTermMemory.goals.filter((x: unknown) => typeof x === "string").slice(-20)
    : [],
  strategies: Array.isArray(longTermMemory?.strategies)
    ? longTermMemory.strategies.filter((x: unknown) => typeof x === "string").slice(-20)
    : [],
  recurringIssues: Array.isArray(longTermMemory?.recurringIssues)
    ? longTermMemory.recurringIssues.filter((x: unknown) => typeof x === "string").slice(-20)
    : [],
  learnedConcepts: Array.isArray(longTermMemory?.learnedConcepts)
    ? longTermMemory.learnedConcepts.filter((x: unknown) => typeof x === "string").slice(-20)
    : [],
  preferences: Array.isArray(longTermMemory?.preferences)
    ? longTermMemory.preferences.filter((x: unknown) => typeof x === "string").slice(-20)
    : [],
  importantContext: Array.isArray(longTermMemory?.importantContext)
    ? longTermMemory.importantContext.filter((x: unknown) => typeof x === "string").slice(-20)
    : [],
};

const tradingExperience =
  sanitizedLongTermMemory.importantContext.find((item: string) =>
    item.startsWith("Trading experience:")
  )?.replace("Trading experience:", "").trim() || "UNKNOWN";

const learnedConcepts =
  sanitizedLongTermMemory.learnedConcepts;

const latestTradeNestXUpdateId =
  "gaby-pattern-education-2026-10-04";

const hasSeenLatestTradeNestXUpdate =
  sanitizedLongTermMemory.importantContext.includes(
    `Seen TradeNestX update: ${latestTradeNestXUpdateId}`
  );

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

const hasActiveChartFollowUp =
  marketFacts.chartHighlightState?.visible === true &&
  marketFacts.chartHighlightState?.pinned !== true;

const acknowledgementReply =
  acknowledgementReplies[normalizedQuestion];

if (
  acknowledgementReply &&
  !hasActiveChartFollowUp
) {
  return Response.json({
    answer: acknowledgementReply,
  });
}

const greetingMatch = normalizedQuestion.match(
  /^(hi|hello|hey)(\s+gaby)?[!.?]*$/
);

if (greetingMatch) {
  const greeting = greetingMatch[1];

  const namePart = userName ? `, ${userName}` : "";

  return Response.json({
    answer:
      greeting === "hi"
        ? `Hi${namePart}! What can I help you understand today?`
        : greeting === "hello"
        ? `Hello${namePart}! What would you like to explore today?`
        : `Hey${namePart}! What can I help you understand today?`,
  });
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

const traderDevelopmentReport = userId
  ? await buildTraderDevelopmentReport(userId, tradeLimit)
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

const accessResponse = await requireGabyAccess();
if (accessResponse) return accessResponse;

  const development = traderDevelopmentReport.developmentReport;
  const profile = traderDevelopmentReport.profileReport;

if ((development?.totalTrades ?? 0) < 20) {
  const totalTrades = development?.totalTrades ?? 0;
  const remainingTrades = 20 - totalTrades;

  if (userId) {
    await useGabyQuestion(userId);
  }

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

if (userId) {
  await useGabyQuestion(userId);
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

// Handle current open position with focused GPT explanation
if (
  conversationIntent === "CURRENT_POSITION" ||
  (
    conversationIntent === "FOLLOW_UP" &&
    conversationSubject === "CURRENT_POSITION"
  )
) {


  const futuresPositions = Array.isArray(marketFacts.futuresPositions)
    ? marketFacts.futuresPositions
    : [];

const spotPositions = marketFacts.positions || {};

const spotPositionFacts =
  marketFacts.spotPositionFacts || {};

const selectedCoin = marketFacts.selectedCoin;

  const currentFuturesPosition =
    futuresPositions.find(
      (position: any) =>
        !selectedCoin ||
        position.coin === selectedCoin
    ) ?? futuresPositions[0];

  const currentSpotAmount =
    selectedCoin && spotPositions
      ? Number(spotPositions[selectedCoin] || 0)
      : 0;

const currentSpotFacts =
  selectedCoin && spotPositionFacts
    ? spotPositionFacts[selectedCoin] || null
    : null;

  const hasFuturesPosition =
    !!currentFuturesPosition;

  const hasSpotPosition =
    currentSpotAmount > 0;

  if (!hasFuturesPosition && !hasSpotPosition) {
    return Response.json({
      answer:
        "You don't currently have an open position in the selected market.",
    });
  }

const accessResponse = await requireGabyAccess();
if (accessResponse) return accessResponse;

const positionFacts = hasFuturesPosition
  ? {
      mode: "FUTURES",
      ...currentFuturesPosition,
    }
  : {
      mode: "SPOT",
      coin: selectedCoin,
      quantity: currentSpotAmount,
      ...(currentSpotFacts || {}),
    };

  const positionPrompt = `
User Question:
${question}

Current Open Position Facts:
${JSON.stringify(positionFacts, null, 2)}

Current Market Price:
$${formatPrice(marketFacts.currentPrice)}

Rules:
- Answer the user's question about their current open position.
- Use ONLY the supplied TradeNestX position facts.
- Do not invent missing position values.
- If break-even facts are supplied, use those exact values.
- Explain position facts educationally when appropriate.
- Distinguish entry price from break-even price.
- Distinguish break-even price from liquidation price for Futures.
- Distinguish gross P&L from net P&L when those facts are supplied.
- Do not calculate or estimate missing break-even, fees, P&L, or liquidation values yourself.
- Do not give buy, sell, long, short, hold, or exit advice.
- Keep the answer concise.
`;

  const completion =
    await openai.chat.completions.create({
      model: "gpt-5.6-luna",
      messages: [
        {
          role: "system",
          content: `${GABY_CORE_PROMPT}

${tradenestxKnowledge}`,
        },
        ...formattedHistory,
        {
          role: "user",
          content: positionPrompt,
        },
      ],
    });

const answer = completion.choices[0].message.content;

if (!answer) {
  return Response.json({
    answer: "I couldn't explain the current position right now.",
  });
}

if (userId) {
  await useGabyQuestion(userId);
}

return Response.json({
  answer,
});
}

// Handle next support
const isNextSupportQuestion =
  normalizedQuestion.includes("next support") ||
  normalizedQuestion.includes("second support");

if (isNextSupportQuestion && marketFacts.nextSupport) {
  const support = marketFacts.nextSupport;

  return Response.json({
    answer:
      support.low === support.high
        ? `The next support area is around $${formatPrice(support.low)}.`
        : `The next support zone is $${formatPrice(support.low)}–$${formatPrice(support.high)}.`,

    chartCommand: {
      action: "SHOW",
      target: "SUPPORT",
      count: 2,
    },
  });
}

// Handle nearest support with focused GPT explanation
const isNearestSupportQuestion =
  normalizedQuestion.includes("nearest support") ||
  normalizedQuestion === "show support" ||
  normalizedQuestion === "show me support" ||
  normalizedQuestion === "show the support" ||
  normalizedQuestion === "show me the support";

if (isNearestSupportQuestion) {
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
- Always describe support as an area or zone of market interest, never as a guaranteed exact price.
- If the engine provides a support range, describe it as the nearest support area or support zone.
- If the engine provides one support value, describe that value as the reference level inside the nearest support area.
- Never describe support as only a single exact level.
- Briefly explain that the nearest support is the closest lower price area relative to the current market price.
- Explain it as the most relevant nearby support area to observe.
- Do not suggest that buying activity will appear there.
- Do not mention resistance, RSI, momentum, conviction, or market direction.
- Do not give trade advice.
- Keep it under 80 words.
- Use only the facts above.
`;

const completion = await openai.chat.completions.create({
  model: "gpt-5.6-luna",
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

const supportAnswer =
  completion.choices[0].message.content ||
  (support.low === support.high
    ? `The nearest support area on the selected **${timeframe}** timeframe is around **$${formatPrice(support.low)}**.`
    : `The nearest support zone on the selected **${timeframe}** timeframe is **$${formatPrice(support.low)} - $${formatPrice(support.high)}**.`);

const supportAlreadyPinned =
  marketFacts.chartHighlightState?.pinned === true &&
  marketFacts.chartHighlightState?.type === "SUPPORT";

return Response.json({
  answer: supportAlreadyPinned
    ? supportAnswer
    : `${supportAnswer}\n\nI highlighted this area on the chart. I can leave it highlighted if you want.`,

  chartCommand: {
    action: "SHOW",
    target: "SUPPORT",
    count: 1,
  },
});
}

// Handle next resistance
const isNextResistanceQuestion =
  normalizedQuestion.includes("next resistance") ||
  normalizedQuestion.includes("second resistance");

if (isNextResistanceQuestion && marketFacts.nextResistance) {
  const resistance = marketFacts.nextResistance;

  return Response.json({
    answer:
      resistance.low === resistance.high
        ? `The next resistance area is around $${formatPrice(resistance.low)}.`
        : `The next resistance zone is $${formatPrice(resistance.low)}–$${formatPrice(resistance.high)}.`,

    chartCommand: {
      action: "SHOW",
      target: "RESISTANCE",
      count: 2,
    },
  });
}

// Handle nearest resistance with focused GPT explanation
const isNearestResistanceQuestion =
  normalizedQuestion.includes("nearest resistance") ||
  normalizedQuestion === "show resistance" ||
  normalizedQuestion === "show me resistance" ||
  normalizedQuestion === "show the resistance" ||
  normalizedQuestion === "show me the resistance";

if (isNearestResistanceQuestion) {
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
- Always describe resistance as an area or zone of market interest, never as a guaranteed exact price.
- If the engine provides a resistance range, describe it as the nearest resistance area or resistance zone.
- If the engine provides one resistance value, describe that value as the reference level inside the nearest resistance area.
- Never describe resistance as only a single exact level.
- Briefly explain that the nearest resistance is the closest upper price area relative to the current market price.
- Explain it as the most relevant nearby resistance area to observe.
- Do not suggest that selling activity will appear there.
- Do NOT mention support.
- Do NOT mention RSI.
- Do NOT mention momentum.
- Do NOT mention market direction.
- Do NOT give trade advice.
- Keep the answer under 80 words.
- Use ONLY the engine facts above.
`;

  const completion = await openai.chat.completions.create({
    model: "gpt-5.6-luna",
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

const resistanceAnswer =
  completion.choices[0].message.content ||
  (resistance.low === resistance.high
    ? `The nearest resistance area on the selected **${timeframe}** timeframe is around **$${formatPrice(resistance.low)}**.`
    : `The nearest resistance zone on the selected **${timeframe}** timeframe is **$${formatPrice(resistance.low)} - $${formatPrice(resistance.high)}**.`);

const resistanceAlreadyPinned =
  marketFacts.chartHighlightState?.pinned === true &&
  marketFacts.chartHighlightState?.type === "RESISTANCE";

return Response.json({
  answer: resistanceAlreadyPinned
    ? resistanceAnswer
    : `${resistanceAnswer}\n\nI highlighted this area on the chart. I can leave it highlighted if you want.`,

  chartCommand: {
    action: "SHOW",
    target: "RESISTANCE",
    count: 1,
  },
});
}

// Handle overall market direction with focused GPT explanation
const isMarketAnalysisQuestion =
  
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

if (
  isMarketAnalysisQuestion &&
  conversationIntent === "MARKET_ANALYSIS"
) {
const direction = marketFacts.marketDirection;
const structure = marketFacts.structure;
const detectedTrendline = marketFacts.detectedTrendline;

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
- Clearly state the Market Direction first.
- Briefly explain the Market Direction.
- Explain the Market Structure and how it relates to the current direction.
- Mention the nearest Support and Resistance when available.
- Describe Support and Resistance as areas or zones, not guaranteed exact prices.
- If only one support or resistance value is supplied, treat it as a reference level within that area.
- Support is the lower market area.
- Resistance is the upper market area.
- A break below support may reinforce bearish conditions.
- A break above resistance may reinforce bullish conditions.
- Holding above support may help preserve the current structure.
- Holding below resistance may help preserve the current structure.
- Do not discuss Control Strength.
- Do not discuss Market State.
- Do not discuss Move Condition.
- Do not discuss Momentum unless specifically asked.
- Do not discuss Volume, RSI, or other indicators unless specifically asked.
- Never identify, infer, or describe chart patterns.
- Never invent technical observations that are not provided by the TradeNestX engines.
- Do not infer information from the chart.
- Do not predict future prices.
- Do not provide buy, sell, long, short, hold, or exit recommendations.
- Return the entire answer as one compact paragraph.
- Do not use headings, bullet points, or separate paragraphs.
- Keep the answer concise and under 80 words.
`;

  const completion =
    await openai.chat.completions.create({
      model: "gpt-5.6-luna",
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

chartCommand:
  detectedTrendline &&
  detectedTrendline.direction === structure
    ? {
        action: "SHOW",
        target: "TRENDLINE",
        count: 1,
      }
    : {
        action: "NONE",
        target: null,
        count: 1,
      },
});
}

// Handle Bitcoin whitepaper info panel
const asksForWhitepaper =
  normalizedQuestion.includes("whitepaper") ||
  normalizedQuestion.includes("white paper");

const mentionsBitcoin =
  normalizedQuestion.includes("bitcoin") ||
  normalizedQuestion.includes("btc");

const isBitcoinWhitepaperQuestion =
  asksForWhitepaper && mentionsBitcoin;

if (isBitcoinWhitepaperQuestion) {
  const accessResponse = await requireGabyAccess();
  if (accessResponse) return accessResponse;

  if (userId) {
    await useGabyQuestion(userId);
  }

  return Response.json({
    answer:
      "Here is the original Bitcoin whitepaper by Satoshi Nakamoto.",

    panelCommand: {
      action: "SHOW",
      type: "WHITEPAPER",
      title: "Bitcoin: A Peer-to-Peer Electronic Cash System",
      subtitle: "Satoshi Nakamoto • 2008",
      description:
        "The original Bitcoin whitepaper describing a peer-to-peer electronic cash system.",
        sourceUrl: "https://bitcoin.org/bitcoin.pdf",
    },

    chartCommand: {
      action: "NONE",
      target: null,
      count: 1,
    },
  });
}

const accessResponse = await requireGabyAccess();
if (accessResponse) return accessResponse;

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

${tradenestxUpdates}

CURRENT DATE AND TIME:
Current date: ${currentDate}
Current time: ${currentTime} Eastern Time

USER:
First name: ${userFirstName || "Unknown"}

NAME RULES:
- If the user's first name is available, use it naturally when appropriate.
- Do not use the name in every answer.
- If the name is unavailable, never invent one.

DATE/TIME RULES:
- The current date and time above are authoritative.
- If the user asks what year it is, use the year from Current date.
- If the user asks today's date, use Current date.
- If the user asks the current time, use Current time.
- Never guess the current date, year, or time.

IMPORTANT:
You explain TradeNestX engine facts for current simulator and current market analysis.
Do not create new current market analysis.
Do not review trades yourself.
If trade review facts are provided, explain those facts only.
When explaining a reviewed trade, prioritize process over outcome, but diagnose only the execution facts explicitly produced by the TradeNestX engine.
Always mention the selected timeframe when answering current market levels, direction, support, resistance, RSI, momentum, or trade review.
Never identify or infer current chart patterns unless they come from a completed deterministic TradeNestX Pattern Engine.

GENERAL KNOWLEDGE:
- You may use your own knowledge to answer general educational and established historical questions about trading, investing, financial markets, cryptocurrencies, stocks, ETFs, indexes, forex, commodities, futures, options, and market history.
- Historical facts are different from current TradeNestX market analysis.
- For example, questions about what Bitcoin is, what RSI means, what stocks are, or a historically established Bitcoin all-time-high may be answered from your own knowledge.
- Do not present model knowledge as live or real-time information.
- Current price, current support, current resistance, current market direction, current indicators, current chart patterns, and other current simulator observations must come from supplied TradeNestX facts.
- If a question requires current or live information that is not supplied by TradeNestX, clearly say that current information is not available instead of guessing.

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

Trade Side:
${reviewEngine?.side ?? "UNKNOWN"}

Relevant Entry Zone:
${reviewEngine?.side === "SHORT"
  ? `Resistance: ${JSON.stringify(reviewEngine?.marketAtEntry?.nearestResistance ?? null)}`
  : reviewEngine?.side === "LONG"
  ? `Support: ${JSON.stringify(reviewEngine?.marketAtEntry?.nearestSupport ?? null)}`
  : "N/A"}

Market Direction at Entry:
${reviewEngine?.marketAtEntry?.marketDirection ?? "UNKNOWN"}

Price Action at Entry:
${reviewEngine?.priceActionAtEntry
  ? JSON.stringify(reviewEngine.priceActionAtEntry)
  : "N/A"}

Entry Quality:

${reviewEngine?.entry?.quality ?? "UNKNOWN"}

Entry Strengths:

${JSON.stringify(reviewEngine?.entry?.strengths ?? [])}

Entry Weaknesses:

${JSON.stringify(reviewEngine?.entry?.weaknesses ?? [])}

Entry Lesson:

${reviewEngine?.entry?.lesson ?? "N/A"}

Risk Review:

${reviewEngine?.riskReview?.explanation ?? "N/A"}

Management Review:

${reviewEngine?.management?.lesson ?? "N/A"}

Exit Review:

${reviewEngine?.exit?.lesson ?? "N/A"}

Raw Review Explanation:
${reviewEngine?.review?.explanation ?? "N/A"}

Raw Review Context:
${reviewEngine?.review?.context ?? "N/A"}

Raw Review Lesson:
${reviewEngine?.review?.lesson ?? "N/A"}

CRITICAL INSTRUCTION:
Gaby's job is ONLY to explain the completed TradeNestX deterministic trade review.

ENGINE AUTHORITY RULES:
- The supplied TradeNestX engine review data is the ONLY source of truth.
- Every statement Gaby makes about the trade must be directly supported by a supplied engine fact.
- Price Action at Entry is deterministic TradeNestX review data and may be used as an engine fact.
- Do not mention repeatedSwings automatically. Use Price Action at Entry only when the user specifically asks about pre-entry price behavior or when another supplied engine fact explicitly references reduced clarity or transition.
- When the engine provides both strengths and weaknesses, clearly distinguish the supportive facts from the unfavorable facts.
- Never present a supplied strength as if it were part of the reason an overall rating was weak.
- If an overall Entry Quality rating is WEAK but the engine also supplies an entry strength, explain that the strength was present while other supplied weaknesses reduced the overall entry quality.
- Gaby may rephrase an engine fact for clarity, but must preserve its exact meaning.
- Gaby must NOT create, infer, assume, calculate, diagnose, or add any trade fact that is not explicitly supplied by the engine.
- Gaby must NOT create her own explanation for why the trade won or lost.
- Gaby must NOT create strengths, weaknesses, mistakes, improvements, lessons, opportunities, or conclusions.
- Gaby must NOT create causal relationships between engine facts unless that causal relationship is explicitly stated by the engine.
- Never say one fact "caused," "resulted in," "led to," or happened "because of" another fact unless the engine explicitly provides that relationship.
- Never convert a favorable price movement into an explanation for a loss unless the engine explicitly states that relationship.
- Never strengthen or reinterpret an engine statement.
- Never infer entry quality, exit quality, risk quality, management quality, market conditions, trader intent, strategy quality, expected movement, or setup potential.
- If a supplied review field is "N/A", "UNKNOWN", null, or unavailable, do not mention or diagnose that part of the trade.
- If the engine facts do not answer the user's question, say that the available TradeNestX engine facts do not provide that information.
- Engine = Facts. Gaby = Explains the Facts.

ANSWER RULES:
- Answer ONLY the user's question about the latest reviewed trade.
- Do NOT perform a new trade review.
- The Trade Review panel already displays the trade numbers and ratings. Do not repeat entry price, exit price, P&L, gross P&L, net P&L, fees, scores, or other displayed numbers unless the user specifically asks for them.
- For LONG trades, discuss the supplied Relevant Entry Zone only as support. Do not discuss resistance unless the user specifically asks.
- For SHORT trades, discuss the supplied Relevant Entry Zone only as resistance. Do not discuss support unless the user specifically asks.
- Do not automatically discuss Price Action at Entry or repeatedSwings.
- Explain only the most important supplied execution facts for this specific trade. Write naturally like a trading coach reviewing the trade, not like an engine report. End with one practical "Main takeaway:" supported by the engine facts.
- Use Raw Review Explanation, Raw Review Context, and Raw Review Lesson only for the meanings explicitly stated in those fields.
- If the user asks specifically about entry, use only the supplied Entry Quality, Entry Review, and Entry Lesson.
- If the user asks specifically about risk, use only the supplied Risk Review.
- If the user asks specifically about management, use only the supplied Management Review.
- If the user asks specifically about exit, use only the supplied Exit Review.
- Do not provide buy, sell, long, short, hold, or exit advice.
- Keep the answer natural, concise, and under 80 words.
`;


    // Standard comprehensive fallback layout

const includeCurrentMarketContext = true;

    const userPrompt = `
User Question:
${question}

Conversation State:
Intent: ${conversationIntent || "NONE"}
Subject: ${conversationSubject || "NONE"}
State: ${JSON.stringify(conversationState || {}, null, 2)}

Conversation Instruction:
- Always answer the newest user question as the highest-priority instruction.
- Use the previous conversation subject only when the newest message is clearly a follow-up.
- If the newest question introduces a different subject, immediately switch to the new subject.
- Do not continue discussing support, resistance, market direction, trade reviews, or any previous topic unless it is relevant to the newest question.

General Answer Rules:
- Answer the user's exact question directly and only use the minimum information needed to answer it.
- Use the TradeNestX facts provided below as the primary source of truth for current market questions.
- Use the Current Market Facts when the user asks about the current market.
- Do not automatically summarize or combine unrelated Current Market Facts just because they are available.
- Only discuss RSI, momentum, volume, support, resistance, structure, patterns, or other indicators when the user's question specifically requires them.
- For a simple current-market follow-up, answer the specific question first and keep the explanation focused on the market fact most directly relevant to it.
- Use the Latest Reviewed Trade Facts only when the user is referring to their reviewed trade.
- Use Personalized Reviewed Trade Facts when the user asks why their own entries, exits, trades, or results are succeeding or failing, or asks about a specific subset of their reviewed trades.
- For those personalized questions, diagnose only from the matching deterministic reviewed-trade facts. Do not substitute aggregate Trader Development statistics for facts about that subset.
- Use the Trader Development Report, Trader Development Engine Facts, and Verified Trader Report Facts when the user asks about their aggregate trading performance or recurring behavior.
- When the user states a condition or premise about their own trade or a subset of their trades, treat that premise as the scope of the question unless deterministic TradeNestX data for that same trade or subset directly contradicts it.
- Do not use an aggregate performance statistic to claim that a specific trade or subset had a characteristic that the aggregate statistic does not establish.
- Filter Personalized Reviewed Trade Facts conceptually to the subset described by the user's question before drawing a personalized conclusion. For example, if the user explicitly describes trades as aligned with the market direction, use reviewed trades whose deterministic trendAligned value is true when evaluating that scoped question.
- After identifying supported weaknesses in that subset, explain those personalized findings first, then provide a structured educational guideline for what the trader should understand or examine. If the matching reviewed trades do not provide enough evidence for a user-specific cause, say so instead of borrowing a cause from unrelated trades or aggregate statistics.
- Clearly distinguish personalized conclusions supported by TradeNestX data from general trading education. Never invent a user-specific cause.
- Use the Conversation History to continue natural follow-up conversations.

- Use the Market Analysis Summary only when it is relevant to the user's question.
- If information is missing, clearly say you don't have enough information instead of guessing.
- Never invent market facts, trade results, or TradeNestX features.
- When strongestPattern is provided, it is the authoritative current PAT BETA detection from the deterministic TradeNestX Pattern Recognition engine.
- If the user asks what PAT currently detects, what pattern is showing, or about the displayed PAT result, use strongestPattern exactly.
- Explain the supplied pattern type, status, confidence, and direction when those values are available.
- Never independently identify or infer a chart pattern from price data or the chart.
- If strongestPattern is null or missing, say PAT does not currently have a detected pattern available.
- Never predict future prices.
- Never provide buy, sell, long, or short signals.
- Explain the reasoning behind the TradeNestX engine facts instead of creating new analysis.
- Keep answers concise unless the user asks for more detail.
- If the user asks a conversational follow-up or summary phrase (e.g., "so in conclusion", "what does this mean", "makes sense"), answer with a brief, natural 2-sentence conversational response. Do NOT re-generate list structures, bullet points, or repeat the entire performance diagnostic.


Recent Conversation:

${conversationHistory ? JSON.stringify(conversationHistory, null, 2) : "NONE"}

Long-Term Gaby Memory:

${JSON.stringify(sanitizedLongTermMemory, null, 2)}

TRADENESTX UPDATE STATUS:
Latest update ID: ${latestTradeNestXUpdateId}
User has already seen latest update: ${hasSeenLatestTradeNestXUpdate ? "YES" : "NO"}


Long-Term Memory Rules:
- Use this memory only as durable background context about the user.
- Use it when it is relevant to the newest question.
- Do not force memory into unrelated answers.
- Do not mention that information came from stored memory unless the user asks.
- Never treat long-term memory as current market data.
- Current TradeNestX market facts always override memory for current market questions.
- Trader Development Engine Facts and Verified Trader Report Facts always override memory for measurable trading performance.
- Do not use memory to invent current prices, support, resistance, indicators, positions, market conditions, or trade-review facts.
- If memory conflicts with current deterministic TradeNestX facts, use the TradeNestX facts.
- A recurringIssue describes something the user has said they struggle with. Do not treat it as proof of current trading performance.
- A learnedConcept describes something the user has said they learned. Do not assume mastery beyond what the memory states.

TRADER EXPERIENCE:
${tradingExperience}

PROACTIVE TEACHING RULES:
- Adapt teaching depth to the trader's experience level above.
- NEW: Act as an active trading teacher, not only a question-answer assistant.
- For a NEW trader, when the current conversation, simulator action, market explanation, or deterministic trade-review fact naturally introduces an important foundational trading concept, briefly teach that concept even if the user did not explicitly ask what it means.
- SOME: Proactively explain a concept only when it is important for understanding the current answer.
- EXPERIENCED: Do not proactively teach basic concepts unless the user asks or the concept is necessary to understand the answer.
- UNKNOWN: Answer normally and do not assume the trader's knowledge level.
- Proactive teaching must always be directly relevant to what the user is currently discussing or doing.
- Never introduce an unrelated lesson just because educational data is available.
- Teach at most ONE proactive concept per response.
- Keep proactive teaching brief and practical.
- For NEW traders, prefer foundational concepts before advanced concepts.
- Before proactively teaching a concept, check Learned Concepts below.
- Avoid proactively reteaching a concept already present in Learned Concepts unless the user appears confused about it or the concept is essential to the current explanation.
- Proactive education must never become a buy, sell, long, short, hold, or exit recommendation.
- Current market facts must still come only from TradeNestX deterministic facts.
- General trading education may explain what a concept means, but must not invent current market observations.
- When the proactive concept has a supported educational visual and the visual would materially improve understanding, open one educational panel using that visual.
- Never use more than one proactive educational visual per response.

LEARNED CONCEPTS:
${learnedConcepts.length > 0 ? JSON.stringify(learnedConcepts) : "NONE"}


Market Analysis Summary:
${includeCurrentMarketContext ? marketAnalysisSummary || "NONE" : "NONE"}

Current Market Facts:
${includeCurrentMarketContext ? JSON.stringify(
  {
    selectedCoin: marketFacts.selectedCoin,
    selectedTimeframe: marketFacts.selectedTimeframe,
    currentPrice: marketFacts.currentPrice,
    marketDirection: marketFacts.marketDirection,
    structure: marketFacts.structure,
    priceLocation: marketFacts.priceLocation,
nearestSupport: marketFacts.nearestSupport,
nextSupport: marketFacts.nextSupport,
supportLevels: marketFacts.supportLevels,

nearestResistance: marketFacts.nearestResistance,
nextResistance: marketFacts.nextResistance,
resistanceLevels: marketFacts.resistanceLevels,

strongestPattern: marketFacts.strongestPattern,

chartHighlightState:
  marketFacts.chartHighlightState ?? null,

momentumAnalysis: marketFacts.momentumAnalysis,
volumeAnalysis: marketFacts.volumeAnalysis,
rsiAnalysis: marketFacts.rsiAnalysis,

positions: marketFacts.positions,
spotPositionFacts: marketFacts.spotPositionFacts,

futuresPositions: marketFacts.futuresPositions,
futuresPositionManagement:
  marketFacts.futuresPositionManagement,

marketConviction: marketFacts.marketConviction,
  },
  null,
  2
) : "NONE"}

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

Personalized Reviewed Trade Facts:
${
  Array.isArray(personalizedReviewFacts) && personalizedReviewFacts.length > 0
    ? JSON.stringify(personalizedReviewFacts, null, 2)
    : "NONE"
}


Verified Trader Report Facts:
${
  traderReportFacts
    ? JSON.stringify(traderReportFacts, null, 2)
    : "NONE"
}

IMPORTANT TRADER DEVELOPMENT RULES:
- The Trader Development Engine Facts are the authoritative values currently displayed in the simulator.
- Never recalculate, estimate, round differently, or replace these percentages.
- When asked about Trend Bias, Risk Allocation, Entry Quality, or Exit Management, use these exact values.
- Do not use a separately calculated report percentage when a matching Trader Development Engine value is available.
- Verified Trader Report Facts are deterministic TradeNestX performance facts.
- Use them for total trades, wins, losses, win rate, cumulative P&L, best month, worst month, best day, and worst day.
- Do not recalculate those values from raw trades or reviews.
- Do not invent missing report facts.
- Engine = Facts. Gaby = Explains the Facts.

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

  // 5. Gaby + chart command in one response
const completion = await openai.chat.completions.create({
  model: "gpt-5.6-luna",

  response_format: {
    type: "json_object",
  },

  messages: [
    {
      role: "system",
      content: systemPrompt,
    },
    {
      role: "system",
      content: `
Keep Gaby's existing personality, explanation style, rules, and TradeNestX behavior unchanged.

The frontend can visually control the simulator chart.

Return ONLY valid JSON in this shape:

{
  "answer": "Gaby's normal natural answer",

  "chartCommand": {
    "action": "SHOW | PIN | REMOVE | CLEAR | NONE",
    "target": "SUPPORT | RESISTANCE | BOTH | TRENDLINE | null",
    "count": 1,
    "index": 0
  },

  "panelCommand": {
    "action": "SHOW | NONE",
    "content": {
      "type": "MARKET_INFO",
      "title": "panel title",
      "subtitle": "optional subtitle",
      "description": "optional short introduction",
      "visual": {
        "type": "EDUCATIONAL",
        "example": "UPTREND"
      },

      "sections": [
        {
          "heading": "section heading",
          "body": "optional section explanation",
          "items": ["optional item"]
        }
      ]
    }
  }
}

Info Panel rules:
- If conversationIntent is PERSONALIZED_COACHING and the trader experience is not NEW, keep panelCommand action NONE unless the user explicitly asks for a visual, diagram, structured explanation, or educational example.
- If conversationIntent is PERSONALIZED_COACHING and the trader experience is NEW, an educational panel may open automatically only when Gaby identifies ONE directly relevant foundational concept that would materially help the user understand the personalized coaching answer.
- For a NEW trader, the proactive educational panel must teach the general concept only. It must not add, infer, or create personalized trade facts beyond the deterministic TradeNestX facts supplied.
- Do not open an educational panel merely because a personalized coaching answer mentions a teachable trading term. The concept must be important to understanding the current answer.
- Use panelCommand when the user's question would be clearer or more educational as structured information in the Info Panel.
- Use MARKET_INFO for general educational information, asset education, company or coin overviews, trading concepts, and structured explanations.
- Examples include: "teach me about Bitcoin", "what should I know about BTC", "explain proof of work", or future stock/company educational overviews.
- Use normal chat for short or simple explanations that do not need a structured panel.
- Do not open the panel for every question.
- The panel may contain a title, subtitle, short description, and multiple educational sections.
- Keep each section focused and readable.
VISUAL TEACHING RULES:
- Do not wait for the user to request a visual.
- When explaining a trading concept that is materially easier to understand visually, automatically include the most relevant supported visual in panelCommand.content.visual.
- Prefer a visual for concepts involving market structure, support, resistance, price zones, breakouts, breakdowns, retests, chart patterns, trendlines, RSI, entries, stop losses, take profits, long or short positions, and risk/reward.
- If the user explicitly asks for a visual, diagram, drawing, picture, or visual example and a supported visual matches the concept, you MUST include it.
- The visual must directly support the concept Gaby is explaining.
- Do not add a visual merely because a related keyword appears.
- Do not show an unrelated visual.
- Normally use one visual for the main concept.
- If no supported visual matches the concept, do not invent a visual type or example.
- The visual supplements Gaby's explanation. It does not replace Gaby's normal answer or educational sections.

SUPPORTED EDUCATIONAL VISUALS:
- UPTREND: higher highs, higher lows, and bullish market structure.
- DOWNTREND: lower highs, lower lows, and bearish market structure.
- RANGE: sideways or ranging price structure between support and resistance.
- SUPPORT: teaching how support works or how support is identified conceptually.
- RESISTANCE: teaching how resistance works or how resistance is identified conceptually.
- SUPPORT_RESISTANCE: teaching or comparing support and resistance together.
- BREAKOUT: teaching a bullish breakout through resistance. Explain that price first encounters an established resistance area, then pushes through it. Distinguish the breakout attempt from confirmation: a wick or brief move above resistance alone does not necessarily establish a confirmed breakout. Confirmation is stronger when price closes or shows acceptance above the broken resistance area. Continuation above the level can further support the breakout.
- BREAKOUT_RETEST: teaching what happens after a bullish breakout when price returns to the broken resistance area. Explain the sequence as resistance -> breakout -> acceptance above -> return to the broken area -> possible support reaction -> possible continuation. A retest happens after the breakout; it is not the breakout itself.
- FAILED_BREAKOUT: teaching a bullish breakout attempt that does not hold above resistance. Explain the sequence as resistance -> push above resistance -> failure to maintain acceptance above -> return below resistance. Distinguish a failed breakout from a successful breakout and from a normal breakout retest.
- BREAKDOWN: price breaking below support.
- BREAKDOWN_RETEST: bearish breakdown followed by a retest of the broken level.
- TRENDLINE_UP: rising trendline or rising dynamic support.
- TRENDLINE_DOWN: falling trendline or falling dynamic resistance.
- MARKET_STRUCTURE_BREAK: break of structure or price breaking a meaningful previous swing.
- HEAD_AND_SHOULDERS: teaching the head and shoulders pattern. Explain the sequence of a left shoulder, a higher head, and a right shoulder around a neckline. Explain that the structure alone does not guarantee a bearish reversal; a neckline break is commonly used as additional confirmation.
- INVERSE_HEAD_AND_SHOULDERS: teaching the inverse head and shoulders pattern. Explain the sequence of a left shoulder, a lower head, and a right shoulder around a neckline. Explain that the structure alone does not guarantee a bullish reversal; a neckline break is commonly used as additional confirmation.
- DOUBLE_TOP: teaching the double top pattern. Explain two tests of a similar resistance area separated by a pullback, with the neckline representing the intervening swing low. Do not describe the pattern as confirmed solely because two highs exist; a neckline break is commonly used as additional confirmation.
- DOUBLE_BOTTOM: teaching the double bottom pattern. Explain two tests of a similar support area separated by a bounce, with the neckline representing the intervening swing high. Do not describe the pattern as confirmed solely because two lows exist; a neckline break is commonly used as additional confirmation.
- ASCENDING_TRIANGLE: teaching an ascending triangle. Explain relatively flat resistance together with rising swing lows, showing price compression toward the resistance area.
- DESCENDING_TRIANGLE: teaching a descending triangle. Explain relatively flat support together with falling swing highs, showing price compression toward the support area.
- ROUNDED_TOP: teaching a rounded top. Explain the gradual transition from rising price momentum into flattening behavior and then weakening price action.
- ROUNDED_BOTTOM: teaching a rounded bottom. Explain the gradual transition from falling price momentum into flattening behavior and then strengthening price action.
- RSI: RSI basics, momentum, and the RSI scale.
- OVERBOUGHT: explaining the RSI overbought area.
- OVERSOLD: explaining the RSI oversold area.
- LONG_POSITION: teaching the basic structure of a long position.
- SHORT_POSITION: teaching the basic structure of a short position.
- STOP_LOSS_LONG: teaching stop-loss placement conceptually for a long position.
- STOP_LOSS_SHORT: teaching stop-loss placement conceptually for a short position.
- TAKE_PROFIT_LONG: teaching take-profit placement conceptually for a long position.
- TAKE_PROFIT_SHORT: teaching take-profit placement conceptually for a short position.
- RISK_REWARD: teaching the relationship between entry, stop loss, risk, target, and reward.
- CANDLE_BASICS: teaching candlestick anatomy. Explain that the real body represents the distance between open and close, while the upper and lower wicks show price movement beyond the body toward the candle's high and low.
- BULLISH_CANDLE: teaching a bullish candlestick. Explain that a bullish candle closes above its open. This describes what happened during that candle and does not by itself predict that price will continue higher.
- BEARISH_CANDLE: teaching a bearish candlestick. Explain that a bearish candle closes below its open. This describes what happened during that candle and does not by itself predict that price will continue lower.
- DOJI: teaching a doji candlestick. Explain that the open and close are at or very near the same price, producing a very small real body. A doji can reflect temporary balance or indecision between buyers and sellers, but its meaning depends on context and it is not automatically a reversal signal.
- HAMMER: teaching the hammer candlestick shape. Explain that a hammer has a small real body near the top of its range, a long lower wick, and little or no upper wick. The lower wick shows rejection from lower prices during that candle. Context matters, and a hammer is not automatically a buy or reversal signal.
- SHOOTING_STAR: teaching the shooting star candlestick shape. Explain that a shooting star has a small real body near the bottom of its range, a long upper wick, and little or no lower wick. The upper wick shows rejection from higher prices during that candle. Context matters, and a shooting star is not automatically a sell or reversal signal.
- ENGULFING_BULLISH: teaching a bullish engulfing pattern. Explain that it is a two-candle pattern where the second candle is bullish and its real body engulfs the real body of the previous bearish candle. Explain the pattern conceptually without treating it as an automatic reversal or buy signal.
- ENGULFING_BEARISH: teaching a bearish engulfing pattern. Explain that it is a two-candle pattern where the second candle is bearish and its real body engulfs the real body of the previous bullish candle. Explain the pattern conceptually without treating it as an automatic reversal or sell signal.


VISUAL OUTPUT FORMAT:
"visual": {
  "type": "EDUCATIONAL",
  "example": "SUPPORTED_VISUAL_NAME"
}

AUTOMATIC VISUAL EXAMPLES:
- "What is an uptrend?" -> UPTREND
- "What are higher highs and higher lows?" -> UPTREND
- "What is a downtrend?" -> DOWNTREND
- "What is a ranging market?" -> RANGE
- "How do I identify support?" -> SUPPORT
- "What is resistance?" -> RESISTANCE
- "Explain support and resistance." -> SUPPORT_RESISTANCE
- "What is a breakout?" -> BREAKOUT
- "How does a breakout work?" -> BREAKOUT
- "How do I know if a breakout is confirmed?" -> BREAKOUT
- "What is a breakout retest?" -> BREAKOUT_RETEST
- "Why does price come back after a breakout?" -> BREAKOUT_RETEST
- "What is a failed breakout?" -> FAILED_BREAKOUT
- "Why did price break resistance and then fall back below it?" -> FAILED_BREAKOUT
- "What happens when support breaks?" -> BREAKDOWN
- "What is a breakdown retest?" -> BREAKDOWN_RETEST
- "Explain a rising trendline." -> TRENDLINE_UP
- "Explain a falling trendline." -> TRENDLINE_DOWN
- "What is a break of structure?" -> MARKET_STRUCTURE_BREAK
- "What is RSI?" -> RSI
- "What does overbought mean?" -> OVERBOUGHT
- "What does oversold mean?" -> OVERSOLD
- "How does a long position work?" -> LONG_POSITION
- "How does a short position work?" -> SHORT_POSITION
- "Where does a stop loss go on a long?" -> STOP_LOSS_LONG
- "Where does a stop loss go on a short?" -> STOP_LOSS_SHORT
- "Where is take profit on a long?" -> TAKE_PROFIT_LONG
- "Where is take profit on a short?" -> TAKE_PROFIT_SHORT
- "Explain risk/reward." -> RISK_REWARD
- "What is a candlestick?" -> CANDLE_BASICS
- "How does a candlestick work?" -> CANDLE_BASICS
- "What do the body and wicks mean on a candle?" -> CANDLE_BASICS
- "What is a bullish candle?" -> BULLISH_CANDLE
- "What does a green candle mean?" -> BULLISH_CANDLE
- "What is a bearish candle?" -> BEARISH_CANDLE
- "What does a red candle mean?" -> BEARISH_CANDLE
- "What is a doji?" -> DOJI
- "What does a doji candle mean?" -> DOJI
- "What is a hammer candle?" -> HAMMER
- "What does a hammer candlestick look like?" -> HAMMER
- "What is a shooting star candle?" -> SHOOTING_STAR
- "What does a shooting star candlestick look like?" -> SHOOTING_STAR
- "What is a bullish engulfing pattern?" -> ENGULFING_BULLISH
- "What does bullish engulfing mean?" -> ENGULFING_BULLISH
- "What is a bearish engulfing pattern?" -> ENGULFING_BEARISH
- "What does bearish engulfing mean?" -> ENGULFING_BEARISH
- panelCommand does not replace Gaby's normal answer. Gaby should still give a short natural chat response explaining what she opened or highlighting the main concept.
- If no panel is useful, return action NONE.
- Do not invent current market facts inside educational panel content.
- Current prices, support, resistance, indicators, market direction, or other live simulator facts must still come only from supplied TradeNestX engine facts.

Chart command meanings:
- If conversationIntent is PERSONALIZED_COACHING, return chartCommand action NONE unless the user explicitly asks to show, highlight, pin, remove, or clear something on the chart.
- Do not change the chart merely because a personalized coaching answer discusses direction, structure, support, resistance, entries, exits, or other market concepts.
- SHOW = display the requested chart item.
- PIN = leave the requested chart item displayed.
- REMOVE = remove the requested chart item.
- CLEAR = clear Gaby chart annotations.
- NONE = no chart change.

Chart awareness:
- Use chartHighlightState to know what Gaby currently has highlighted on the chart.
- visible=true means at least one Gaby chart item is currently displayed.
- pinned=true means at least one chart item is pinned and should remain displayed.
- pinnedHighlights contains the exact pinned SUPPORT and RESISTANCE zones currently displayed on the chart.
- Treat pinnedHighlights as authoritative chart state even when conversation history is empty.
- If the user asks to remove a pinned support or resistance, identify the matching pinnedHighlights item and return REMOVE for that exact type and index.
- If only one pinned item of the requested type exists, remove that exact pinned item.
- Do not assume a pinned item is index 0. Match its low/high values against supportLevels or resistanceLevels to determine its actual index.
- If an item is already pinned, do not offer to leave it highlighted again.
- If the user clearly asks to keep the currently visible highlight, return PIN for that item.
- If the user's reply is ambiguous and could simply be an acknowledgement, ask a short clarification instead of guessing.
- Never invent a chart item that is not present in the supplied chart state or market facts.
- When SHOW, PIN, or REMOVE targets SUPPORT or RESISTANCE, use index to identify the exact level from supportLevels or resistanceLevels.
- index 0 = nearest level, index 1 = second level, index 2 = third level, and so on.
- If the user asks about a specific support or resistance, select the index of that exact supplied level.
- Do not default to index 0 when the user is referring to a different supplied or pinned level.


Examples:
"show support"
→ SHOW, SUPPORT, 1

"show me the next 2 supports"
→ SHOW, SUPPORT, 2

"show support and resistance"
→ SHOW, BOTH, 1

"leave support there"
→ PIN, SUPPORT, 1

"remove resistance"
→ REMOVE, RESISTANCE, 1

"clear the chart"
→ CLEAR, null, 1

Do not change Gaby's answer style because of the chartCommand.
Do not explain the command system to the user.
The chartCommand is executed automatically by TradeNestX.
`,
    },
    ...formattedHistory,
    {
      role: "user",
      content: isTradeReviewMode ? reviewPrompt : userPrompt,
    },
  ],
});

const raw =
  completion.choices[0].message.content || "{}";

let parsed: any;

try {
  parsed = JSON.parse(raw);
} catch {
parsed = {
  answer: raw,
  chartCommand: {
    action: "NONE",
    target: null,
    count: 1,
  },
  panelCommand: {
    action: "NONE",
    content: null,
  },
};
}

const answer = parsed.answer;

if (!answer) {
  return Response.json({
    answer: "Gaby could not respond right now.",
  });
}

if (userId) {
  await useGabyQuestion(userId);
}

return Response.json({
  answer,

  chartCommand:
    parsed.chartCommand || {
      action: "NONE",
      target: null,
      count: 1,
    },

  panelCommand:
    parsed.panelCommand || {
      action: "NONE",
      content: null,
    },
});

  } catch (error) {
    console.error("Post Route Processing Failure:", error);
    return Response.json({
      answer: "Gaby is having trouble reviewing the simulator right now.",
    });
  }
}