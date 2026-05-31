"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";


export default function LearnPage() {
  const [activeLesson, setActiveLesson] = useState("roadmap");
  const [selectedAsset, setSelectedAsset] = useState("stocks");
  const [selectedJourney, setSelectedJourney] = useState("crypto");
  const [selectedSupportType, setSelectedSupportType] = useState("support");
  
  const [selectedRiskType, setSelectedRiskType] = useState("stoploss");
  const [selectedTimeframe, setSelectedTimeframe] = useState("1min");
  const [selectedVolumeType, setSelectedVolumeType] = useState("high");
  const [selectedSupplyDemand, setSelectedSupplyDemand] = useState("demand");
  
  
  const [selectedCandleType, setSelectedCandleType] = useState("bullish");
  const [selectedOrderType, setSelectedOrderType] = useState("market");
  const [selectedPsychology, setSelectedPsychology] = useState("fear");
  const [selectedTradePlan, setSelectedTradePlan] = useState("entry");
  
  const [selectedMarketType, setSelectedMarketType] = useState("buyers");
  const [selectedChartReading, setSelectedChartReading] = useState("trend");
  const [selectedTradingTerm, setSelectedTradingTerm] = useState("spread");
  const [selectedCheckpoint, setSelectedCheckpoint] = useState("question1");
  const [selectedLiveTopic, setSelectedLiveTopic] = useState("small");
  const [selectedPainPoint, setSelectedPainPoint] = useState("charts");
  const [painPointDelay, setPainPointDelay] = useState(5000);
  const [selectedMarketImage, setSelectedMarketImage] = useState(-1);
  const [marketSlide, setMarketSlide] = useState(0);
  const [marketLessonSlide, setMarketLessonSlide] = useState(-1);
  const [riskLessonSlide, setRiskLessonSlide] = useState(-1);
  const [timeframeSlide, setTimeframeSlide] = useState(-1);
  const [candlestickSlide, setCandlestickSlide] = useState(-1);
  const [volumeSlide, setVolumeSlide] = useState(-1);
  const [supportSlide, setSupportSlide] = useState(-1);
  const [supplyDemandSlide, setSupplyDemandSlide] = useState(-1);
  const [patternSlide, setPatternSlide] = useState(-1);
  const [tradePlanSlide, setTradePlanSlide] = useState(-1);
  const [psychologySlide, setPsychologySlide] = useState(-1);
  const [termsSlide, setTermsSlide] = useState(-1);
  const [quizScore, setQuizScore] = useState(0);
const [quizSubmitted, setQuizSubmitted] = useState(false);
const [quizAnswers, setQuizAnswers] = useState<{ [key: number]: string }>({});
const [quizError, setQuizError] = useState("");
const [submittedAnswers, setSubmittedAnswers] = useState<{
  [key: number]: string;
}>({});
const [cooldownActive, setCooldownActive] = useState(false);
const [nextAttemptTime, setNextAttemptTime] = useState<number | null>(null);
  const [gabyQuestion, setGabyQuestion] = useState("");
  const [lastQuestion, setLastQuestion] = useState("");
  const [lastTopic, setLastTopic] = useState("");
const [gabyAnswer, setGabyAnswer] = useState(
  "Hi, I’m Gaby. Ask me anything about this lesson."
  
);
const [isGabyTyping, setIsGabyTyping] = useState(false);
useEffect(() => {
  setGabyAnswer("Hi, I’m Gaby. Ask me anything about this lesson.");
  setGabyQuestion("");
  setIsGabyTyping(false);
  setLastQuestion("");
}, []);

useEffect(() => {
  const savedCooldown = localStorage.getItem(
    "tradenestxQuizCooldown"
  );

  if (!savedCooldown) return;

  const cooldownEnd = Number(savedCooldown);

  if (Date.now() < cooldownEnd) {
    setCooldownActive(true);
    setNextAttemptTime(cooldownEnd);
  }
}, []);

useEffect(() => {
  const slides = [
    "charts",
    "fear",
    "info",
    "roadmap",
  ];

  const interval = setInterval(() => {
    setSelectedPainPoint((current) => {
      const index = slides.indexOf(current);
      return slides[(index + 1) % slides.length];
    });

    setPainPointDelay(5000);
  }, painPointDelay);

  return () => clearInterval(interval);
}, [painPointDelay]);

const checkpointQuestions = [
{
  question: "What does a bullish trend mean?",
  options: [
    "Price moving lower",
    "Price moving higher",
    "Price moving sideways",
    "Low volume",
  ],
  answer: "Price moving higher",
  reviewLesson: "Market Trends",
},

{
  question: "What does a support level represent?",
  options: [
    "A guaranteed buy signal",
    "A chart pattern",
    "Area where buyers may step in",
    "Area where sellers always win",
  ],
  answer: "Area where buyers may step in",
  reviewLesson: "Support & Resistance",
},

{
  question: "What does volume measure?",
  options: [
    "Volatility",
    "Profit",
    "Risk",
    "Amount traded",
  ],
  answer: "Amount traded",
  reviewLesson: "Volume Basics",
},

{
  question: "What is a pullback?",
  options: [
    "Temporary move against a trend",
    "A breakout",
    "A support zone",
    "A market order",
  ],
  answer: "Temporary move against a trend",
  reviewLesson: "Essential Trading Terms",
},

{
  question: "What is risk management designed to do?",
  options: [
    "Increase leverage",
    "Protect capital",
    "Predict markets",
    "Guarantee profits",
  ],
  answer: "Protect capital",
  reviewLesson: "Protecting Your Capital",
},

{
  question: "What does FOMO stand for?",
  options: [
    "Future Order Management Operation",
    "Fear Of Market Oscillation",
    "Fast Order Market Option",
    "Fear Of Missing Out",
  ],
  answer: "Fear Of Missing Out",
  reviewLesson: "Trading Psychology",
},

{
  question: "What is a spread?",
  options: [
    "Volume spike",
    "Market cap",
    "Difference between bid and ask",
    "Price trend",
  ],
  answer: "Difference between bid and ask",
  reviewLesson: "Essential Trading Terms",
},

{
  question: "What is liquidity?",
  options: [
    "Ease of buying and selling",
    "A trend reversal",
    "A chart timeframe",
    "A candlestick pattern",
  ],
  answer: "Ease of buying and selling",
  reviewLesson: "Essential Trading Terms",
},

{
  question: "What is a breakout?",
  options: [
    "A stop loss",
    "Price moves beyond a key level",
    "A losing trade",
    "A pullback",
  ],
  answer: "Price moves beyond a key level",
  reviewLesson: "Chart Patterns",
},

{
  question: "What does a portfolio represent?",
  options: [
    "A timeframe",
    "One trade",
    "A chart pattern",
    "All your investments together",
  ],
  answer: "All your investments together",
  reviewLesson: "Essential Trading Terms",
},
];

const lessons = [
  { id: "roadmap", label: "Beginner Introduction" },

  { id: "buying", label: "What Are You Buying?" },

  { id: "market", label: "How The Market Works" },

  { id: "orders", label: "Market vs Limit Orders" },

  { id: "risk", label: "Protecting Your Capital" },

  { id: "candlesticks", label: "Candlestick Basics" },

  { id: "timeframes", label: "Trading Timeframes" },

  { id: "volume", label: "Volume Basics" },

  { id: "support", label: "Support & Resistance" },

  { id: "supplydemand", label: "Supply & Demand" },

  { id: "patterns", label: "Chart Patterns" },

  { id: "setups", label: "Building A Trade Plan" },

  { id: "psychology", label: "Trading Psychology" },

  { id: "vocabulary", label: "Essential Trading Terms" },

  { id: "quiz", label: "Trader Checkpoint" },

  { id: "practice", label: "TradeNestX Simulator Guide" },

  { id: "account", label: "Going Live" },
];
const activeLessonIndex = lessons.findIndex(
  (lesson) => lesson.id === activeLesson
);


async function askGaby(customQuestion?: string) {
const question = (customQuestion || gabyQuestion).toLowerCase().trim();

const contextualQuestion =
  lastQuestion
    ? `Previous topic: ${lastTopic || "unknown"}
Previous question: ${lastQuestion}
Current question: ${question}`
    : question;
if (
  question.includes("market open") ||
  question.includes("stock market open") ||
  question.includes("market closed") ||
  question.includes("stock market closed")
) {
  setIsGabyTyping(true);

  try {
    const response = await fetch("/api/gaby", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        message: contextualQuestion,
        lesson: activeLesson,
      }),
    });

    const data = await response.json();
    setGabyAnswer(data.answer);
  } catch (error) {
    setGabyAnswer("Gaby is having trouble responding right now.");
  }

  setIsGabyTyping(false);
setLastQuestion(question);
setGabyQuestion("");
return;
}
const localQuestions = [
  "what is a stock?",
  "what is a stock",
  "why do prices move?",
  "why do prices move",
  "what is crypto?",
  "what is crypto",
  "what should beginners focus on?",
  "what should beginners focus on",

  "what is a market order?",
  "what is a market order",
  "what is a limit order?",
  "what is a limit order",
  "which order is safer?",
  "which order is safer",
  "why do traders use limit orders?",
  "why do traders use limit orders",

  "what is risk management?",
  "what is risk management",
  "why do traders use stop losses?",
  "why do traders use stop losses",
  "what is revenge trading?",
  "what is revenge trading",
  "why is protecting capital important?",
  "why is protecting capital important",

  "what is a timeframe?",
  "what is a timeframe",
  "why do timeframes matter?",
  "why do timeframes matter",

  "what is a candlestick?",
  "what is a candlestick",
  "what is a bullish candle?",
  "what is a bullish candle",
  "what is a bearish candle?",
  "what is a bearish candle",
  "what does a long wick mean?",
  "what does a long wick mean",

  "what is volume?",
  "what is volume",
  "why does volume matter?",
  "why does volume matter",
  "what is high volume?",
  "what is high volume",
  "what is low volume?",
  "what is low volume",

  "what is support?",
  "what is support",
  "what is resistance?",
  "what is resistance",
  "why do support and resistance matter?",
  "why do support and resistance matter",
  "what is a breakout?",
  "what is a breakout",

  "why do timeframes matter?",
"why do timeframes matter",

"which timeframe is best for beginners?",
"which timeframe is best for beginners",

"why do lower timeframes feel stressful?",
"why do lower timeframes feel stressful",

"what is volatility?",
"what is volatility",

"what is supply and demand?",
"what is supply and demand",

"why do markets panic?",
"why do markets panic",

"what is supply?",
"what is supply",
"what is demand?",
"what is demand",
"what is a demand zone?",
"what is a demand zone",
"what is a supply zone?",
"what is a supply zone",

"what is a chart pattern?",
"what is a chart pattern",

"what is a double top?",
"what is a double top",

"what is a double bottom?",
"what is a double bottom",

"what is a head and shoulders pattern?",
"what is a head and shoulders pattern",

"what is a trade plan?",
"what is a trade plan",

"why do traders use trade plans?",
"why do traders use trade plans",

"what is risk reward?",
"what is risk reward",

"why is a checklist important?",
"why is a checklist important",

"what is trading psychology?",
"what is trading psychology",

"what is fear in trading?",
"what is fear in trading",

"what is greed in trading?",
"what is greed in trading",

"what is fomo trading?",
"what is fomo trading",

"why is patience important?",
"why is patience important",

"what is a bid?",
"what is a bid",

"what is an ask?",
"what is an ask",

"what is a spread?",
"what is a spread",

"what is volatility?",
"what is volatility",

"what is liquidity?",
"what is liquidity",

"what is market cap?",
"what is market cap",

];

const cleanQuestion = question.replace(/[?.,!]/g, "").trim();

const cleanLocalQuestions = localQuestions.map((q) =>
  q.replace(/[?.,!]/g, "").trim()
);

if (cleanLocalQuestions.includes(cleanQuestion))
 {
  setIsGabyTyping(true);

setTimeout(() => {
  if (question.includes("crypto")) {
  setLastTopic("crypto");
} else if (question.includes("stock")) {
  setLastTopic("stocks");
} else if (question.includes("forex")) {
  setLastTopic("forex");
} else if (question.includes("volatility")) {
  setLastTopic("volatility");
} else if (question.includes("market order")) {
  setLastTopic("market orders");
} else if (question.includes("limit order")) {
  setLastTopic("limit orders");
} else if (question.includes("risk")) {
  setLastTopic("risk management");
} else if (question.includes("candlestick")) {
  setLastTopic("candlesticks");
} else if (question.includes("timeframe")) {
  setLastTopic("timeframes");
} else if (question.includes("1 minute")) {
  setLastTopic("timeframes");
} else if (question.includes("1 hour")) {
  setLastTopic("timeframes");
} else if (question.includes("daily")) {
  setLastTopic("timeframes");
}

  if (
  question.includes("best place") ||
  question.includes("where") ||
  question.includes("learn") ||
  question.includes("learning") 
  
) {
  setGabyAnswer(
    "The best place to start learning is inside TradeNestX. Start with the beginner lessons first, then practice safely on the TradeNestX simulator before risking real money. TradeNestX is built to help beginners learn charts, candlesticks, order types, volatility, risk management, and market basics step-by-step."
  );

} else if (
  question.includes("better than") ||
  question.includes("which is better") ||
  question.includes("better")
) {
  setGabyAnswer(
    "I can compare trading concepts for education, but I can’t tell you which asset is better to buy. Stocks and crypto have different risks. Stocks are tied to companies, while crypto is digital and usually more volatile. Beginners should learn both first and practice safely before risking real money."
  );

} else if (question.includes("stock")) {
  setGabyAnswer(
    "A stock represents small ownership in a company. When the company grows or loses value, the stock price can move up or down."
  );

} else if (
  question === "crypto" ||
  question === "what is crypto" ||
  question === "what is crypto?"
) {
  setGabyAnswer(
    "Crypto is a digital asset that trades online 24/7. Crypto markets can move very fast and are known for high volatility."
  );
} else if (
  question === "which timeframe is best for beginners" ||
  question === "which timeframe is best for beginners?"
) {
  setGabyAnswer(
    "Many beginners find higher timeframes easier to read because they contain less noise and clearer market direction."
  );


} else if (
  question.includes("beginner") ||
  question.includes("focus")
) {
  setGabyAnswer(
    "Beginners should focus on risk management, learning chart basics, controlling emotions, and practicing safely before trading real money."
  );

} else if (
  question.includes("price") ||
  question.includes("prices move")
) {
  setGabyAnswer(
    "Prices move because buyers and sellers constantly compete. More buyers can push price higher, while more sellers can push price lower."
  );

} else if (
  question.includes("volatility")
) {
  setGabyAnswer(
    "Volatility means how fast and how much price moves. High volatility means bigger price swings and more risk."
  );

} else if (
  question === "what is supply and demand" ||
  question === "what is supply and demand?"
) {
  setGabyAnswer(
    "Supply and demand means selling pressure versus buying pressure. More demand can push price up. More supply can push price down."
  );

} else if (
  question.includes("panic")
) {
  setGabyAnswer(
    "Markets panic when traders react emotionally to fear, bad news, uncertainty, or fast price drops."
  );

} else if (
  question === "market order" ||
  question === "what is a market order" ||
  question === "what is a market order?" ||
  question === "what is market order" ||
  question === "what is market order?"
) {
  setGabyAnswer(
    "A market order executes instantly at the current market price. Traders use it when speed matters more than precision."
  );

} else if (
  question === "limit order" ||
  question === "what is a limit order" ||
  question === "what is a limit order?" ||
  question === "what is limit order" ||
  question === "what is limit order?"
) {
  setGabyAnswer(
    "A limit order only executes at the exact price you choose. Traders use it when they want more price control."
  );

} else if (
  question.includes("safer")
) {
  setGabyAnswer(
    "Many beginners prefer limit orders because they control the exact entry price before entering a trade."
  );

} else if (
  question.includes("better")
) {
  setGabyAnswer(
    "Market orders focus on speed while limit orders focus on price precision and control."
  );

  } else if (
  question === "why do traders use limit orders" ||
  question === "why do traders use limit orders?"
) {
  setGabyAnswer(
    "Traders use limit orders to get better entries, reduce slippage, and wait for price to reach important levels."
  );

} else if (
  question.includes("forex")
) {
  setGabyAnswer(
    "Forex is the foreign exchange market where traders buy and sell currencies from around the world."
  );

} else if (
  question.includes("candlestick")
) {
  setGabyAnswer(
    "Candlesticks help traders understand price movement, momentum, and buyer versus seller behavior."
  );

} else if (
  question === "what is risk management" ||
  question === "what is risk management?"
) {
  setGabyAnswer(
    "Risk management helps traders protect their capital by controlling losses, position size, and emotional decisions."
  );

} else if (
  question === "why do traders use stop losses" ||
  question === "why do traders use stop losses?"
) {
  setGabyAnswer(
    "Traders use stop losses to automatically limit losses before one bad trade becomes too damaging."
  );

} else if (
  question === "what is revenge trading" ||
  question === "what is revenge trading?"
) {
  setGabyAnswer(
    "Revenge trading happens when traders become emotional after a loss and take impulsive trades trying to win money back quickly."
  );

} else if (
  question === "why is protecting capital important" ||
  question === "why is protecting capital important?"
) {
  setGabyAnswer(
    "Protecting capital helps traders survive long enough to improve. Good traders focus on consistency and risk control before profits."
  );

} else if (
  question.includes("risk")
) {
  setGabyAnswer(
    "Risk management helps traders protect their capital by controlling losses and position size."
  );
  } else if (
  question === "what is a timeframe" ||
  question === "what is a timeframe?"
) {
  setGabyAnswer(
    "A timeframe is the amount of time each candlestick represents on a chart. Examples include 1 minute, 5 minutes, 1 hour, and 1 day."
  );

} else if (
  question === "why do timeframes matter" ||
  question === "why do timeframes matter?"
) {
  setGabyAnswer(
    "Timeframes help traders understand market movement from different perspectives. Lower timeframes show more detail, while higher timeframes often show stronger trends."
  );



} else if (
  question === "why do lower timeframes feel stressful" ||
  question === "why do lower timeframes feel stressful?"
) {
  setGabyAnswer(
    "Lower timeframes move quickly and can create emotional decision-making. Many beginners overtrade when watching very fast charts."
  );

  } else if (
  question === "what is a candlestick?" ||
  question === "what is a candlestick"
) {
  setGabyAnswer(
    "A candlestick is a visual representation of price movement during a specific period of time. Every candlestick shows the open, high, low, and close price."
  );

} else if (
  question === "what is a bullish candle?" ||
  question === "what is a bullish candle"
) {
  setGabyAnswer(
    "A bullish candle closes higher than it opened. It shows buyers were stronger than sellers during that period."
  );

} else if (
  question === "what is a bearish candle?" ||
  question === "what is a bearish candle"
) {
  setGabyAnswer(
    "A bearish candle closes lower than it opened. It shows sellers were stronger than buyers during that period."
  );

} else if (
  question === "what does a long wick mean?" ||
  question === "what does a long wick mean"
) {
  setGabyAnswer(
    "A long wick can show price rejection. It means price moved in one direction but was pushed back before the candle closed."
  );

  } else if (
  question === "what is volume" ||
  question === "what is volume?"
) {
  setGabyAnswer(
    "Volume shows how much trading activity happened during a period of time. Higher volume means more buyers and sellers are participating."
  );

} else if (
  question === "why does volume matter" ||
  question === "why does volume matter?"
) {
  setGabyAnswer(
    "Volume matters because it can help confirm the strength behind a price move. A move with strong volume is usually more meaningful than a move with weak volume."
  );

} else if (
  question === "what is high volume" ||
  question === "what is high volume?"
) {
  setGabyAnswer(
    "High volume means a lot of trading activity is happening. It can show strong interest, momentum, or important market movement."
  );

} else if (
  question === "what is low volume" ||
  question === "what is low volume?"
) {
  setGabyAnswer(
    "Low volume means fewer traders are participating. Price movement on low volume can be weaker or less reliable."
  );
  
} else if (
  question === "what is support" ||
  question === "what is support?"
) {
  setGabyAnswer(
    "Support is a price area where buyers have previously stepped in and pushed price higher. It often acts like a floor beneath price."
  );

} else if (
  question === "what is resistance" ||
  question === "what is resistance?"
) {
  setGabyAnswer(
    "Resistance is a price area where sellers have previously stepped in and pushed price lower. It often acts like a ceiling above price."
  );

} else if (
  question === "why do support and resistance matter" ||
  question === "why do support and resistance matter?"
) {
  setGabyAnswer(
    "Support and resistance help traders identify important price levels where the market may react, reverse, pause, or break through."
  );

} else if (
  question === "what is a breakout" ||
  question === "what is a breakout?"
) {
  setGabyAnswer(
    "A breakout happens when price moves through support or resistance with strength. Breakouts can signal the beginning of a new trend or momentum move."
  );

} else if (
  question === "what is supply" ||
  question === "what is supply?"
) {
  setGabyAnswer(
    "Supply means selling pressure. When there is more supply than demand, sellers can push price lower."
  );

} else if (
  question === "what is demand" ||
  question === "what is demand?"
) {
  setGabyAnswer(
    "Demand means buying pressure. When there is more demand than supply, buyers can push price higher."
  );

} else if (
  question === "what is a demand zone" ||
  question === "what is a demand zone?"
) {
  setGabyAnswer(
    "A demand zone is an area where buyers previously stepped in strongly and pushed price higher."
  );

} else if (
  question === "what is a supply zone" ||
  question === "what is a supply zone?"
) {
  setGabyAnswer(
    "A supply zone is an area where sellers previously stepped in strongly and pushed price lower."
  );

} else if (
  question === "what is a chart pattern" ||
  question === "what is a chart pattern?"
) {
  setGabyAnswer(
    "A chart pattern is a repeating price formation that traders use to identify possible market direction and trading opportunities."
  );

} else if (
  question === "what is a double top" ||
  question === "what is a double top?"
) {
  setGabyAnswer(
    "A double top is a bearish chart pattern where price tests a resistance area twice and fails to move higher."
  );

} else if (
  question === "what is a double bottom" ||
  question === "what is a double bottom?"
) {
  setGabyAnswer(
    "A double bottom is a bullish chart pattern where price tests a support area twice and holds before moving higher."
  );

} else if (
  question === "what is a head and shoulders pattern" ||
  question === "what is a head and shoulders pattern?"
) {
  setGabyAnswer(
    "A head and shoulders pattern is a bearish reversal pattern that can signal a trend change from bullish to bearish."
  );

} else if (
  question === "what is a trade plan" ||
  question === "what is a trade plan?"
) {
  setGabyAnswer(
    "A trade plan is a set of rules that tells you when to enter, where to place your stop loss, where to take profit, and how much risk to take before entering a trade."
  );

} else if (
  question === "why do traders use trade plans" ||
  question === "why do traders use trade plans?"
) {
  setGabyAnswer(
    "Traders use trade plans to reduce emotional decisions and stay consistent. A plan helps you know what to do before the trade starts."
  );

} else if (
  question === "what is risk reward" ||
  question === "what is risk reward?"
) {
  setGabyAnswer(
    "Risk reward compares how much you are risking to how much you may gain. For example, risking $50 to try to make $100 is a 1 to 2 risk reward."
  );

} else if (
  question === "why is a checklist important" ||
  question === "why is a checklist important?"
) {
  setGabyAnswer(
    "A checklist helps you confirm your setup before entering a trade. It keeps you from rushing into random or emotional trades."
  );

} else if (
  question === "what is trading psychology" ||
  question === "what is trading psychology?"
) {
  setGabyAnswer(
    "Trading psychology is how your emotions and mindset affect your trading decisions. Fear, greed, patience, and discipline can all impact how you trade."
  );

} else if (
  question === "what is fear in trading" ||
  question === "what is fear in trading?"
) {
  setGabyAnswer(
    "Fear in trading can make beginners exit too early, avoid good setups, or panic when price moves against them."
  );

} else if (
  question === "what is greed in trading" ||
  question === "what is greed in trading?"
) {
  setGabyAnswer(
    "Greed in trading can make traders risk too much, ignore targets, hold too long, or chase bigger profits without a plan."
  );

} else if (
  question === "what is fomo trading" ||
  question === "what is fomo trading?"
) {
  setGabyAnswer(
    "FOMO trading means Fear Of Missing Out. It happens when a trader enters late because they are afraid of missing a big move."
  );

} else if (
  question === "why is patience important" ||
  question === "why is patience important?"
) {
  setGabyAnswer(
    "Patience helps traders wait for quality setups instead of forcing random trades. Many beginners lose money because they trade too often."
  );

} else if (
  question === "what is a bid" ||
  question === "what is a bid?"
) {
  setGabyAnswer(
    "A bid is the highest price a buyer is willing to pay for an asset."
  );

} else if (
  question === "what is an ask" ||
  question === "what is an ask?"
) {
  setGabyAnswer(
    "An ask is the lowest price a seller is willing to accept for an asset."
  );

} else if (
  question === "what is a spread" ||
  question === "what is a spread?"
) {
  setGabyAnswer(
    "The spread is the difference between the bid price and the ask price."
  );

} else if (
  question === "what is volatility" ||
  question === "what is volatility?"
) {
  setGabyAnswer(
    "Volatility measures how much and how quickly price moves up and down."
  );

} else if (
  question === "what is liquidity" ||
  question === "what is liquidity?"
) {
  setGabyAnswer(
    "Liquidity refers to how easily an asset can be bought or sold without significantly affecting its price."
  );

} else if (
  question === "what is market cap" ||
  question === "what is market cap?"
) {
  setGabyAnswer(
    "Market capitalization is the total value of an asset. It is calculated by multiplying price by the total circulating supply."
  );

} else {
  setGabyAnswer(
    "The best place to start learning is directly inside TradeNestX. Begin with the beginner lessons to understand charts, candlesticks, volatility, market orders, limit orders, and risk management step-by-step. After learning the basics, practice safely on the TradeNestX simulator before risking real money. TradeNestX is designed to help beginners build confidence through education and practice first."
  );
}


setIsGabyTyping(false);
setLastQuestion(question);
setGabyQuestion("");
}, 800);

return;

  return;
}

if (!question.trim()) return;

setIsGabyTyping(true);

try {
  const response = await fetch("/api/gaby", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },

    body: JSON.stringify({
      message: contextualQuestion,
      lesson: activeLesson,
    }),
  });

  const data = await response.json();

  setGabyAnswer(data.answer);
} catch (error) {
  setGabyAnswer(
    "Gaby is having trouble responding right now."
  );
}

setIsGabyTyping(false);

setLastQuestion(question);

if (!lastTopic) {
  setLastTopic(activeLesson);
}

setGabyQuestion("");
}
  return (
    <>
      <Navbar />

      <main className="page-shell">
        <div className="mx-auto w-full max-w-[1650px] px-4">
  <div className="mt-6 grid grid-cols-1 xl:grid-cols-[240px_minmax(0,1fr)] gap-4">
         <aside className="bg-[#111827] border border-zinc-700 rounded-2xl p-4 xl:sticky xl:top-24 max-h-[calc(100vh-120px)] overflow-y-auto scrollbar-hide">
  <p className="text-sm font-black tracking-wide text-zinc-500 mb-4">
    LESSONS
  </p>

  <div className="space-y-2">
    {lessons.map((lesson) => (
      <button
        key={lesson.id}
onClick={() => {
  setActiveLesson(lesson.id);
  setGabyQuestion("");
  setIsGabyTyping(false);
  setGabyAnswer("Hi, I’m Gaby. Ask me anything about this lesson.");
  setMarketSlide(0);
  setSelectedMarketImage(-1);
  setMarketLessonSlide(-1);
  setRiskLessonSlide(-1);
  setTimeframeSlide(-1);
  setCandlestickSlide(-1);
  setVolumeSlide(-1);
  setSupportSlide(-1);
  setSupplyDemandSlide(-1);
  setPatternSlide(-1);
  setTradePlanSlide(-1);
  setPsychologySlide(-1);
  setTermsSlide(-1);
  document.getElementById("lesson-content")?.scrollTo({
  top: 0,
  behavior: "auto",
});

window.scrollTo({
  top: 0,
  behavior: "auto",
});
}}
       className={`group relative w-full overflow-hidden rounded-2xl border px-4 py-4 text-left text-sm font-black tracking-wide transition-all duration-300 ${
  activeLesson === lesson.id
    ? "border-cyan-400 bg-cyan-400 text-black shadow-[0_0_25px_rgba(34,211,238,0.35)]"
    : "border-white/5 bg-[#0f172a] text-zinc-400 hover:border-cyan-400/30 hover:bg-[#131c2b] hover:text-cyan-300"
}`}
      >
        <div className="flex items-center">

  <span>
    {lesson.label}
  </span>



</div>
      </button>
    ))}
  </div>
</aside>

<section
  id="lesson-content"
  className="min-w-0 max-h-[calc(100vh-120px)] overflow-y-auto pr-2 scrollbar-hide"
>
          
      
{activeLesson === "roadmap" && (
<>
<div className="mb-8 overflow-hidden rounded-[40px] border border-cyan-500/10 bg-[#0f172a] shadow-[0_20px_80px_rgba(0,0,0,0.45)]">
  <img
    src="/learn/intro/tradenestx-education-intro.png"
    alt="TradeNestX Education Intro"
    className="block w-full object-contain"
  />
</div>



<div className="mt-8">

  <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">

    <button
      onClick={() => {
  setSelectedPainPoint("charts");
  setPainPointDelay(20000);
}}
      className={`rounded-[22px] border px-6 py-5 text-left transition-all duration-300 hover:-translate-y-[2px] shadow-[0_0_18px_rgba(34,211,238,0.05)] hover:shadow-[0_0_25px_rgba(34,211,238,0.18)] ${
        selectedPainPoint === "charts"
          ? "border-cyan-400 bg-cyan-500/10"
          : "border-white/10 bg-[#18181b] text-white hover:border-cyan-400/40 hover:bg-cyan-500/10 hover:text-cyan-300"
      }`}
    >
      <p className="text-white font-black text-[20px]">
        Learn Trading
      </p>
    </button>

    <button
      onClick={() => {
  setSelectedPainPoint("fear");
  setPainPointDelay(20000);
}}
      className={`rounded-[22px] border px-6 py-5 text-left transition-all duration-300 hover:-translate-y-[2px] shadow-[0_0_18px_rgba(34,211,238,0.05)] hover:shadow-[0_0_25px_rgba(34,211,238,0.18)] ${
        selectedPainPoint === "fear"
          ? "border-red-400 bg-red-500/10"
          : "border-white/10 bg-[#18181b] text-white hover:border-red-400/40 hover:bg-red-500/10 hover:text-red-300"
      }`}
    >
      <p className="text-white font-black text-[20px]">
        Build Confidence
      </p>
    </button>

    <button
      onClick={() => {
  setSelectedPainPoint("info");
  setPainPointDelay(20000);
}}
      className={`rounded-[22px] border px-6 py-5 text-left transition-all duration-300 hover:-translate-y-[2px] shadow-[0_0_18px_rgba(34,211,238,0.05)] hover:shadow-[0_0_25px_rgba(34,211,238,0.18)] ${
        selectedPainPoint === "info"
          ? "border-orange-400 bg-orange-500/10"
          : "border-white/10 bg-[#18181b] text-white hover:border-orange-400/40 hover:bg-orange-500/10 hover:text-orange-300"
      }`}
    >
      <p className="text-white font-black text-[20px]">
        Practice Risk-Free
      </p>
    </button>

    <button
      onClick={() => {
  setSelectedPainPoint("roadmap");
  setPainPointDelay(20000);
}}
      className={`rounded-[22px] border px-6 py-5 text-left transition-all duration-300 hover:-translate-y-[2px] shadow-[0_0_18px_rgba(34,211,238,0.05)] hover:shadow-[0_0_25px_rgba(34,211,238,0.18)] ${
        selectedPainPoint === "roadmap"
          ? "border-emerald-400 bg-emerald-500/10"
          : "border-white/10 bg-[#18181b] text-white hover:border-emerald-400/40 hover:bg-emerald-500/10 hover:text-emerald-300"
      }`}
    >
      <p className="text-white font-black text-[20px]">
        Follow A Roadmap
      </p>
    </button>

  </div>

  <div className="mt-8 rounded-[40px] border border-white/5 bg-[#0d111a]/95 backdrop-blur-xl p-8 lg:p-10">

    <div className="grid lg:grid-cols-[380px_1fr] gap-8 items-start">

      <div>

        {selectedPainPoint === "charts" && (
          <>
            <h3 className="text-4xl font-black text-white leading-tight">
  Learn Trading Step By Step
</h3>

            <p className="mt-5 text-zinc-400 text-lg leading-8">
              TradeNestX breaks trading into simple lessons designed for complete beginners. Learn one concept at a time and build a strong foundation.
            </p>

            <div className="mt-8 space-y-5">

              <div className="flex gap-4">
                <div className="flex h-11 w-11 items-center justify-center rounded-full bg-cyan-500/10 text-cyan-400 font-black">
                  1
                </div>

                <div>
                  <p className="text-white font-bold">
                    Understand charts
                  </p>

                  <p className="text-zinc-500 mt-1">
                    Learn what price movement is really telling you.
                  </p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="flex h-11 w-11 items-center justify-center rounded-full bg-cyan-500/10 text-cyan-400 font-black">
                  2
                </div>

                <div>
                  <p className="text-white font-bold">
                    Learn market structure
                  </p>

                  <p className="text-zinc-500 mt-1">
                    Understand trends, support, and resistance.
                  </p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="flex h-11 w-11 items-center justify-center rounded-full bg-cyan-500/10 text-cyan-400 font-black">
                  3
                </div>

                <div>
                  <p className="text-white font-bold">
                    Build a strong foundation
                  </p>

                  <p className="text-zinc-500 mt-1">
                    Master the basics before moving to advanced concepts.
                  </p>
                </div>
              </div>

            </div>
          </>
        )}
{selectedPainPoint === "fear" && (
  <>
    <h3 className="text-4xl font-black text-white leading-tight">
      Build Confidence Before You Trade
    </h3>

    <p className="mt-5 text-zinc-400 text-lg leading-8">
      Confidence comes from education, preparation, and practice — not from guessing or rushing into trades.
    </p>

    <div className="mt-8 space-y-5">
      <div className="flex gap-4">
        <div className="flex h-11 w-11 items-center justify-center rounded-full bg-red-500/10 text-red-400 font-black">1</div>
        <div>
          <p className="text-white font-bold">Learn risk control</p>
          <p className="text-zinc-500 mt-1">Understand how to protect your capital before entering trades.</p>
        </div>
      </div>

      <div className="flex gap-4">
        <div className="flex h-11 w-11 items-center justify-center rounded-full bg-red-500/10 text-red-400 font-black">2</div>
        <div>
          <p className="text-white font-bold">Manage emotions</p>
          <p className="text-zinc-500 mt-1">Build discipline so emotions do not control every decision.</p>
        </div>
      </div>

      <div className="flex gap-4">
        <div className="flex h-11 w-11 items-center justify-center rounded-full bg-red-500/10 text-red-400 font-black">3</div>
        <div>
          <p className="text-white font-bold">Follow a plan</p>
          <p className="text-zinc-500 mt-1">Use clear rules for entries, exits, and risk.</p>
        </div>
      </div>
    </div>
  </>
)}

{selectedPainPoint === "info" && (
  <>
    <h3 className="text-4xl font-black text-white leading-tight">
      Practice Without Risking Real Money
    </h3>

    <p className="mt-5 text-zinc-400 text-lg leading-8">
      Apply what you learn inside the TradeNestX simulator and gain experience in a safe environment before risking real money.
    </p>

    <div className="mt-8 space-y-5">
      <div className="flex gap-4">
        <div className="flex h-11 w-11 items-center justify-center rounded-full bg-orange-500/10 text-orange-400 font-black">1</div>
        <div>
          <p className="text-white font-bold">Paper trading</p>
          <p className="text-zinc-500 mt-1">Practice buying and selling without financial risk.</p>
        </div>
      </div>

      <div className="flex gap-4">
        <div className="flex h-11 w-11 items-center justify-center rounded-full bg-orange-500/10 text-orange-400 font-black">2</div>
        <div>
          <p className="text-white font-bold">Learn from mistakes</p>
          <p className="text-zinc-500 mt-1">Every trade becomes a learning opportunity.</p>
        </div>
      </div>

      <div className="flex gap-4">
        <div className="flex h-11 w-11 items-center justify-center rounded-full bg-orange-500/10 text-orange-400 font-black">3</div>
        <div>
          <p className="text-white font-bold">Build experience safely</p>
          <p className="text-zinc-500 mt-1">Develop confidence before entering live markets.</p>
        </div>
      </div>
    </div>
  </>
)}

{selectedPainPoint === "roadmap" && (
  <>
    <h3 className="text-4xl font-black text-white leading-tight">
      Follow A Proven Learning Path
    </h3>

    <p className="mt-5 text-zinc-400 text-lg leading-8">
      TradeNestX guides you from complete beginner to confident simulator trader through a structured step-by-step learning journey.
    </p>

    <div className="mt-8 space-y-5">
      <div className="flex gap-4">
        <div className="flex h-11 w-11 items-center justify-center rounded-full bg-emerald-500/10 text-emerald-400 font-black">1</div>
        <div>
          <p className="text-white font-bold">Learn</p>
          <p className="text-zinc-500 mt-1">Master the fundamentals through beginner-friendly lessons.</p>
        </div>
      </div>

      <div className="flex gap-4">
        <div className="flex h-11 w-11 items-center justify-center rounded-full bg-emerald-500/10 text-emerald-400 font-black">2</div>
        <div>
          <p className="text-white font-bold">Practice</p>
          <p className="text-zinc-500 mt-1">Apply what you learn inside the TradeNestX simulator.</p>
        </div>
      </div>

      <div className="flex gap-4">
        <div className="flex h-11 w-11 items-center justify-center rounded-full bg-emerald-500/10 text-emerald-400 font-black">3</div>
        <div>
          <p className="text-white font-bold">Graduate</p>
          <p className="text-zinc-500 mt-1">Complete the academy and continue building real trading skills.</p>
        </div>
      </div>
    </div>
  </>
)}
      </div>

      <div className="overflow-hidden rounded-[28px] border border-white/5 bg-[#0f172a]">

        <img
          src={
  selectedPainPoint === "charts"
    ? "/learn/journey/learn-trading.png"
    : selectedPainPoint === "fear"
    ? "/learn/journey/build-confidence.png"
    : selectedPainPoint === "info"
    ? "/learn/journey/practice-risk-free.png"
    : "/learn/journey/follow-roadmap.png"
}
          alt="TradeNestX Learning Journey"
          className="h-full w-full object-cover"
        />

      </div>

    </div>

  </div>

</div>

</>
)}
{activeLesson === "buying" && (
  <div className="rounded-[40px] border border-white/10 bg-[#0b0f1a] p-10 shadow-[0_20px_80px_rgba(0,0,0,0.45)]">
    <div className="grid grid-cols-1 lg:grid-cols-[300px_minmax(0,1fr)] gap-8 items-start">
      <div>
        <h2 className="text-4xl font-black tracking-tight text-white leading-tight">
          What Are You Buying?
        </h2>

        <p className="mt-5 text-zinc-400 text-[17px] leading-8 max-w-[280px]">
          Before placing a trade, beginners need to understand what they are actually buying and why the price moves.
        </p>

        <div className="mt-8 space-y-6 max-w-[290px]">
          <div className="flex gap-5">
            <div className="h-10 w-10 shrink-0 rounded-full bg-cyan-500/15 text-cyan-300 flex items-center justify-center font-black">
              1
            </div>
            <div>
              <h3 className="font-black text-white">You are buying ownership</h3>
              <p className="mt-1 text-zinc-500 leading-7">
                A stock represents a small piece of a company. Crypto represents a digital asset.
              </p>
            </div>
          </div>

          <div className="flex gap-5">
            <div className="h-10 w-10 shrink-0 rounded-full bg-cyan-500/15 text-cyan-300 flex items-center justify-center font-black">
              2
            </div>
            <div>
              <h3 className="font-black text-white">Price moves by supply and demand</h3>
              <p className="mt-1 text-zinc-500 leading-7">
                If more buyers step in, price can rise. If more sellers take control, price can fall.
              </p>
            </div>
          </div>

          <div className="flex gap-5">
            <div className="h-10 w-10 shrink-0 rounded-full bg-cyan-500/15 text-cyan-300 flex items-center justify-center font-black">
              3
            </div>
            <div>
              <h3 className="font-black text-white">You need a reason before entering</h3>
              <p className="mt-1 text-zinc-500 leading-7">
                Never buy just because price is moving. Know the setup, risk, and reason first.
              </p>
            </div>
          </div>
        </div>
      </div>

<div className="flex flex-col overflow-hidden rounded-[28px] border border-cyan-500/10 bg-black">
  <img
    src={
  selectedMarketImage === -1
    ? "/learn/markets/what-are-you-buying.png"
    : [
        "/learn/markets/stocks.png",
        "/learn/markets/crypto.png",
        "/learn/markets/forex.png",
        "/learn/markets/index.png",
        "/learn/markets/futures.png",
        "/learn/markets/options.png",
      ][selectedMarketImage]
}
    alt="Market example"
    className="block w-full h-auto object-contain"
  />

  <div className="grid grid-cols-3 lg:grid-cols-6 gap-3 border-t border-white/10 bg-[#050816] px-4 py-3 -mt-1">
{[
  { name: "Stocks", icon: "📈", color: "text-cyan-300" },
  { name: "Crypto", icon: "₿", color: "text-orange-400" },
  { name: "Forex", icon: "$€", color: "text-emerald-400" },
  { name: "Index", icon: "▮▮▮", color: "text-purple-400" },
  { name: "Futures", icon: "📅", color: "text-yellow-400" },
  { name: "Options", icon: "↕", color: "text-pink-400" },
].map((market, index) => (
      <button
        key={market.name}
        onClick={() => setSelectedMarketImage(index)}
        className={`rounded-2xl border p-4 text-center transition-all duration-300 hover:-translate-y-[2px] ${
          selectedMarketImage === index
            ? "border-cyan-400 bg-cyan-500/10 text-cyan-300 shadow-[0_0_25px_rgba(34,211,238,0.2)]"
            : "border-white/10 bg-[#0b0f1a] text-zinc-400 hover:border-cyan-400/40 hover:text-white"
        }`}
      >
        <div className={`text-2xl font-black ${market.color}`}>
  {market.icon}
</div>

        <div className="mt-2 text-sm font-black">
          {market.name}
        </div>
      </button>
    ))}
  </div>
</div>

    </div>

 <div className="mt-8 rounded-[34px] border border-cyan-400/40 bg-gradient-to-r from-[#07111f] via-[#0b1120] to-[#050816] p-5 shadow-[0_0_45px_rgba(34,211,238,0.18)] transition-all duration-500 hover:border-cyan-300 hover:shadow-[0_0_65px_rgba(34,211,238,0.28)]">
  <div className="grid grid-cols-1 lg:grid-cols-[140px_1fr] gap-4 items-center">
<div className="flex items-center justify-center pl-2">
  <img
    src="/gaby.png"
    alt="Gaby AI"
    className="h-[210px] w-[210px] object-contain drop-shadow-[0_0_45px_rgba(34,211,238,0.35)]"
  />
</div>

    <div>
      <div className="rounded-2xl border border-cyan-400/30 bg-[#0f172a] p-5">
        {isGabyTyping ? (
  <div className="flex items-center gap-3 pl-4">
    <div className="flex gap-1">
      <span className="h-2 w-2 animate-bounce rounded-full bg-cyan-400"></span>
      <span className="h-2 w-2 animate-bounce rounded-full bg-cyan-400 [animation-delay:0.2s]"></span>
      <span className="h-2 w-2 animate-bounce rounded-full bg-cyan-400 [animation-delay:0.4s]"></span>
    </div>

    <p className="text-cyan-300 font-bold">
      Gaby is typing...
    </p>
  </div>
) : (
  <p className="border-l-4 border-cyan-400 pl-4 text-zinc-100 leading-8">
    {gabyAnswer}
  </p>
)}
      </div>
<div className="mt-4 grid grid-cols-2 lg:grid-cols-4 gap-3">
  {[
    "What is a stock?",
    "Why do prices move?",
    "What is crypto?",
    "What should beginners focus on?",
  ].map((question) => (
    <button
      key={question}
      onClick={() => {
  askGaby(question);
  setGabyQuestion("");
}}
      className="rounded-xl border border-cyan-400/20 bg-[#0b1120] px-4 py-3 text-sm font-bold text-white transition-all duration-300 hover:-translate-y-[2px] hover:border-cyan-400 hover:bg-cyan-500/10 hover:text-cyan-300 hover:shadow-[0_0_20px_rgba(34,211,238,0.18)]"
    >
      {question}
    </button>
  ))}
</div>

      <div className="mt-4 flex gap-3">
        <input
          value={gabyQuestion}
          onChange={(e) => setGabyQuestion(e.target.value)}
          placeholder="Ask Gaby anything about this lesson..."
          className="flex-1 rounded-2xl border border-white/10 bg-[#0f172a] px-5 py-4 text-white outline-none transition-all duration-300 focus:border-cyan-400"
        />

        <button
  onClick={() => askGaby(gabyQuestion)}
  disabled={isGabyTyping}
  className="rounded-2xl bg-cyan-400 px-6 font-black text-black transition-all duration-300 hover:scale-[1.02] disabled:cursor-not-allowed disabled:opacity-50"
>
  {isGabyTyping ? "Thinking..." : "Ask Gaby"}
</button>
      </div>
    </div>

  </div>
</div>
    </div>
  
)}


{activeLesson === "market" && (
  <div className="rounded-[40px] border border-white/10 bg-[#0b0f1a] p-10 shadow-[0_20px_80px_rgba(0,0,0,0.45)]">

    <div className="grid grid-cols-1 lg:grid-cols-[300px_minmax(0,1fr)] gap-8 items-start">

      <div>

        <h2 className="text-4xl font-black tracking-tight text-white leading-tight">
          How The Market Works
        </h2>

        <p className="mt-5 text-zinc-400 text-[17px] leading-8 max-w-[280px]">
          Learn how buyers and sellers move price, why volatility happens, and how supply and demand control the market.
        </p>

        <div className="mt-8 space-y-6 max-w-[290px]">

          <div className="flex gap-5">
            <div className="h-10 w-10 shrink-0 rounded-full bg-cyan-500/15 text-cyan-300 flex items-center justify-center font-black">
              1
            </div>

            <div>
              <h3 className="font-black text-white">
                Buyers and sellers move price
              </h3>

              <p className="mt-1 text-zinc-500 leading-7">
                Markets rise when buyers become stronger than sellers.
              </p>
            </div>
          </div>

          <div className="flex gap-5">
            <div className="h-10 w-10 shrink-0 rounded-full bg-cyan-500/15 text-cyan-300 flex items-center justify-center font-black">
              2
            </div>

            <div>
              <h3 className="font-black text-white">
                Supply and demand create movement
              </h3>

              <p className="mt-1 text-zinc-500 leading-7">
                Price changes when buying demand or selling pressure increases.
              </p>
            </div>
          </div>

          <div className="flex gap-5">
            <div className="h-10 w-10 shrink-0 rounded-full bg-cyan-500/15 text-cyan-300 flex items-center justify-center font-black">
              3
            </div>

            <div>
              <h3 className="font-black text-white">
                Volatility creates opportunity and risk
              </h3>

              <p className="mt-1 text-zinc-500 leading-7">
                Crypto markets can move very fast during strong momentum.
              </p>
            </div>
          </div>

        </div>

      </div>

      <div className="flex flex-col overflow-hidden rounded-[28px] border border-cyan-500/10 bg-black">

        <img
src={
  marketLessonSlide === -1
    ? "/learn/market/how-market-works.png"
    : [
        "/learn/market/buyers.png",
        "/learn/market/sellers.png",
        "/learn/market/buyers-vs-sellers.png",
        "/learn/market/supply.png",
        "/learn/market/demand.png",
        "/learn/market/supply-vs-demand.png",
        "/learn/market/volatility.png",
      ][marketLessonSlide]
}
          alt="Market lesson"
          className="block w-full h-[625px] object-fill bg-white"
        />

<div className="flex items-center justify-between border-t border-white/10 bg-[#050816] px-6 py-4">

  <button
    onClick={() =>
      setMarketLessonSlide((prev) => (prev === -1 ? 6 : prev - 1))
    }
    className="rounded-2xl border border-white/10 bg-[#0b1120] px-5 py-3 font-bold text-white transition-all duration-300 hover:border-cyan-400 hover:text-cyan-300"
  >
    ← Previous
  </button>

  <div className="flex items-center gap-3">

    {[-1, 0, 1, 2, 3, 4, 5, 6].map((dot) => (
      <button
        key={dot}
        onClick={() => setMarketSlide(dot)}
        className={`h-3 w-3 rounded-full transition-all duration-300 ${
          marketLessonSlide === dot
            ? "bg-cyan-400 scale-125"
            : "bg-zinc-600 hover:bg-zinc-400"
        }`}
      />
    ))}

  </div>

  <button
    onClick={() =>
      setMarketLessonSlide((prev) => (prev === 6 ? -1 : prev + 1))
    }
    className="rounded-2xl border border-white/10 bg-[#0b1120] px-5 py-3 font-bold text-white transition-all duration-300 hover:border-cyan-400 hover:text-cyan-300"
  >
    Next →
  </button>

</div>

      </div>

    </div>

    <div className="mt-8 rounded-[34px] border border-cyan-400/40 bg-gradient-to-r from-[#07111f] via-[#0b1120] to-[#050816] p-5 shadow-[0_0_45px_rgba(34,211,238,0.18)] transition-all duration-500 hover:border-cyan-300 hover:shadow-[0_0_65px_rgba(34,211,238,0.28)]">

      <div className="grid grid-cols-1 lg:grid-cols-[140px_1fr] gap-4 items-center">

        <div className="flex items-center justify-center pl-2">
          <img
            src="/gaby.png"
            alt="Gaby AI"
            className="h-[210px] w-[210px] object-contain drop-shadow-[0_0_45px_rgba(34,211,238,0.35)]"
          />
        </div>

        <div>

         <div className="rounded-2xl border border-cyan-400/30 bg-[#0f172a] p-5">
  {isGabyTyping ? (
    <div className="flex items-center gap-3 pl-4">
      <div className="flex gap-1">
        <span className="h-2 w-2 animate-bounce rounded-full bg-cyan-400"></span>
        <span className="h-2 w-2 animate-bounce rounded-full bg-cyan-400 [animation-delay:0.2s]"></span>
        <span className="h-2 w-2 animate-bounce rounded-full bg-cyan-400 [animation-delay:0.4s]"></span>
      </div>

      <p className="text-cyan-300 font-bold">
        Gaby is typing...
      </p>
    </div>
  ) : (
    <p className="border-l-4 border-cyan-400 pl-4 text-zinc-100 leading-8">
      {gabyAnswer}
    </p>
  )}
</div>

          <div className="mt-4 grid grid-cols-2 lg:grid-cols-4 gap-3">

            {[
              "Why do prices move?",
              "What is volatility?",
              "What is supply and demand?",
              "Why do markets panic?",
            ].map((question) => (
              <button
                key={question}
                onClick={() => {
                  askGaby(question);
                  setGabyQuestion("");
                }}
                className="rounded-xl border border-cyan-400/20 bg-[#0b1120] px-4 py-3 text-sm font-bold text-white transition-all duration-300 hover:-translate-y-[2px] hover:border-cyan-400 hover:bg-cyan-500/10 hover:text-cyan-300 hover:shadow-[0_0_20px_rgba(34,211,238,0.18)]"
              >
                {question}
              </button>
            ))}

          </div>
          <div className="mt-4 flex gap-3">
            <input
              value={gabyQuestion}
              onChange={(e) => setGabyQuestion(e.target.value)}
              placeholder="Ask Gaby anything about this lesson..."
              className="flex-1 rounded-2xl border border-white/10 bg-[#0f172a] px-5 py-4 text-white outline-none transition-all duration-300 focus:border-cyan-400"
            />

            <button
              onClick={() => askGaby(gabyQuestion)}
              disabled={isGabyTyping}
              className="rounded-2xl bg-cyan-400 px-6 font-black text-black transition-all duration-300 hover:scale-[1.02] disabled:cursor-not-allowed disabled:opacity-50"
            >
              {isGabyTyping ? "Thinking..." : "Ask Gaby"}
            </button>
          </div>
        </div>

      </div>

    </div>

  </div>
)}

{activeLesson === "orders" && (
  <div className="rounded-[40px] border border-white/10 bg-[#0b0f1a] p-10 shadow-[0_20px_80px_rgba(0,0,0,0.45)]">

    <div className="grid grid-cols-1 lg:grid-cols-[300px_minmax(0,1fr)] gap-8 items-start">

      <div>

        <h2 className="text-4xl font-black tracking-tight text-white leading-tight">
          Market vs Limit Orders
        </h2>

        <p className="mt-5 text-zinc-400 text-[17px] leading-8 max-w-[280px]">
          Learn the difference between market and limit orders, how traders enter positions, and why order types matter.
        </p>

        <div className="mt-8 space-y-6 max-w-[290px]">

         <div className="flex gap-5">
  <div className="h-10 w-10 shrink-0 rounded-full bg-cyan-500/15 text-cyan-300 flex items-center justify-center font-black">
    1
  </div>

  <div>
    <h3 className="font-black text-white">
      Market orders execute instantly
    </h3>

    <p className="mt-1 text-zinc-500 leading-7">
      A market order buys or sells immediately at the current price.
    </p>
  </div>
</div>

<div className="flex gap-5">
  <div className="h-10 w-10 shrink-0 rounded-full bg-cyan-500/15 text-cyan-300 flex items-center justify-center font-black">
    2
  </div>

  <div>
    <h3 className="font-black text-white">
      Limit orders wait for your price
    </h3>

    <p className="mt-1 text-zinc-500 leading-7">
      A limit order only executes at the exact price you choose.
    </p>
  </div>
</div>

<div className="flex gap-5">
  <div className="h-10 w-10 shrink-0 rounded-full bg-cyan-500/15 text-cyan-300 flex items-center justify-center font-black">
    3
  </div>

  <div>
    <h3 className="font-black text-white">
      Traders use both differently
    </h3>

    <p className="mt-1 text-zinc-500 leading-7">
      Market orders focus on speed while limit orders focus on price precision.
    </p>
  </div>
</div>

        </div>

      </div>

      <div className="flex flex-col overflow-hidden rounded-[28px] border border-cyan-500/10 bg-black">

        <img

 src={[
  "/learn/orders/market-order.png",
  "/learn/orders/limit-order.png",
  "/learn/orders/market-vs-limit.png",
  "/learn/orders/speed-vs-precision.png",
][marketSlide]}
alt="Orders lesson"
          className="block w-full h-[625px] object-fill bg-white"
        />

<div className="flex items-center justify-between border-t border-white/10 bg-[#050816] px-6 py-4">

  <button
    onClick={() =>
      setMarketSlide((prev) => (prev === 0 ? 3 : prev - 1))
    }
    className="rounded-2xl border border-white/10 bg-[#0b1120] px-5 py-3 font-bold text-white transition-all duration-300 hover:border-cyan-400 hover:text-cyan-300"
  >
    ← Previous
  </button>

  <div className="flex items-center gap-3">

    {[0, 1, 2, 3].map((dot) => (
      <button
        key={dot}
        onClick={() => setMarketSlide(dot)}
        className={`h-3 w-3 rounded-full transition-all duration-300 ${
          marketSlide === dot
            ? "bg-cyan-400 scale-125"
            : "bg-zinc-600 hover:bg-zinc-400"
        }`}
      />
    ))}

  </div>

  <button
    onClick={() =>
      setMarketSlide((prev) => (prev === 3 ? 0 : prev + 1))
    }
    className="rounded-2xl border border-white/10 bg-[#0b1120] px-5 py-3 font-bold text-white transition-all duration-300 hover:border-cyan-400 hover:text-cyan-300"
  >
    Next →
  </button>

</div>

      </div>

    </div>

    <div className="mt-8 rounded-[34px] border border-cyan-400/40 bg-gradient-to-r from-[#07111f] via-[#0b1120] to-[#050816] p-5 shadow-[0_0_45px_rgba(34,211,238,0.18)] transition-all duration-500 hover:border-cyan-300 hover:shadow-[0_0_65px_rgba(34,211,238,0.28)]">

      <div className="grid grid-cols-1 lg:grid-cols-[140px_1fr] gap-4 items-center">

        <div className="flex items-center justify-center pl-2">
          <img
            src="/gaby.png"
            alt="Gaby AI"
            className="h-[210px] w-[210px] object-contain drop-shadow-[0_0_45px_rgba(34,211,238,0.35)]"
          />
        </div>

        <div>

         <div className="rounded-2xl border border-cyan-400/30 bg-[#0f172a] p-5">
  {isGabyTyping ? (
    <div className="flex items-center gap-3 pl-4">
      <div className="flex gap-1">
        <span className="h-2 w-2 animate-bounce rounded-full bg-cyan-400"></span>
        <span className="h-2 w-2 animate-bounce rounded-full bg-cyan-400 [animation-delay:0.2s]"></span>
        <span className="h-2 w-2 animate-bounce rounded-full bg-cyan-400 [animation-delay:0.4s]"></span>
      </div>

      <p className="text-cyan-300 font-bold">
        Gaby is typing...
      </p>
    </div>
  ) : (
    <p className="border-l-4 border-cyan-400 pl-4 text-zinc-100 leading-8">
      {gabyAnswer}
    </p>
  )}
</div>

          <div className="mt-4 grid grid-cols-2 lg:grid-cols-4 gap-3">

            {[
              "What is a market order?",
              "What is a limit order?",
              "Which order is safer?",
              "Why do traders use limit orders?",
            ].map((question) => (
              <button
                key={question}
                onClick={() => {
                  askGaby(question);
                  setGabyQuestion("");
                }}
                className="rounded-xl border border-cyan-400/20 bg-[#0b1120] px-4 py-3 text-sm font-bold text-white transition-all duration-300 hover:-translate-y-[2px] hover:border-cyan-400 hover:bg-cyan-500/10 hover:text-cyan-300 hover:shadow-[0_0_20px_rgba(34,211,238,0.18)]"
              >
                {question}
              </button>
            ))}

          </div>
          <div className="mt-4 flex gap-3">
            <input
            value={gabyQuestion}
              
              onChange={(e) => setGabyQuestion(e.target.value)}
              placeholder="Ask Gaby anything about this lesson..."
              className="flex-1 rounded-2xl border border-white/10 bg-[#0f172a] px-5 py-4 text-white outline-none transition-all duration-300 focus:border-cyan-400"
            />

            <button
              onClick={() => askGaby(gabyQuestion)}
              disabled={isGabyTyping}
              className="rounded-2xl bg-cyan-400 px-6 font-black text-black transition-all duration-300 hover:scale-[1.02] disabled:cursor-not-allowed disabled:opacity-50"
            >
              {isGabyTyping ? "Thinking..." : "Ask Gaby"}
            </button>
          </div>
        </div>

      </div>

    </div>

  </div>
)}


{activeLesson === "risk" && (
  <div className="rounded-[40px] border border-white/10 bg-[#0b0f1a] p-10 shadow-[0_20px_80px_rgba(0,0,0,0.45)]">
    <div className="grid grid-cols-1 lg:grid-cols-[300px_minmax(0,1fr)] gap-8 items-start">
      <div>
        <h2 className="text-4xl font-black tracking-tight text-white leading-tight">
          Protecting Your Capital
        </h2>

        <p className="mt-5 text-zinc-400 text-[17px] leading-8 max-w-[280px]">
          Protecting your money is more important than making fast money. Good traders survive by controlling risk first.
        </p>

        <div className="mt-8 space-y-6 max-w-[290px]">
          <div className="flex gap-5">
            <div className="h-10 w-10 shrink-0 rounded-full bg-cyan-500/15 text-cyan-300 flex items-center justify-center font-black">
              1
            </div>
            <div>
              <h3 className="font-black text-white">Small losses are normal</h3>
              <p className="mt-1 text-zinc-500 leading-7">
                Every trader loses sometimes. Good traders keep losses small and controlled.
              </p>
            </div>
          </div>

          <div className="flex gap-5">
            <div className="h-10 w-10 shrink-0 rounded-full bg-cyan-500/15 text-cyan-300 flex items-center justify-center font-black">
              2
            </div>
            <div>
              <h3 className="font-black text-white">Protect your account first</h3>
              <p className="mt-1 text-zinc-500 leading-7">
                Risking too much on one trade can destroy weeks of progress.
              </p>
            </div>
          </div>

          <div className="flex gap-5">
            <div className="h-10 w-10 shrink-0 rounded-full bg-cyan-500/15 text-cyan-300 flex items-center justify-center font-black">
              3
            </div>
            <div>
              <h3 className="font-black text-white">Discipline beats emotions</h3>
              <p className="mt-1 text-zinc-500 leading-7">
                Fear and revenge trading often cause bigger losses than bad strategies.
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="flex flex-col overflow-hidden rounded-[28px] border border-cyan-500/10 bg-black">
        <img
          src={
            riskLessonSlide === -1
              ? "/learn/risk/protecting-your-capital.png"
              : [
                  "/learn/risk/small-risk-vs-big-risk.png",
                  "/learn/risk/stop-loss-protection.png",
                  "/learn/risk/revenge-trading.png",               
                  "/learn/risk/risk-to-reward.png",
                  "/learn/risk/overtrading-warning.png",
                  "/learn/risk/protecting-capital-pyramid.png",
                  "/learn/risk/one-bad-trade.png",
                  "/learn/risk/demo-first.png",
                ][riskLessonSlide]
          }
          alt="Protecting Your Capital"
          className="block w-full h-[625px] object-fill bg-white"
        />

        <div className="flex items-center justify-between border-t border-white/10 bg-[#050816] px-6 py-4">
          <button
            onClick={() =>
              setRiskLessonSlide((prev) => (prev === -1 ? 7 : prev - 1))
            }
            className="rounded-2xl border border-white/10 bg-[#0b1120] px-5 py-3 font-bold text-white transition-all duration-300 hover:border-cyan-400 hover:text-cyan-300"
          >
            ← Previous
          </button>

          <div className="flex items-center gap-3">
            {[-1, 0, 1, 2, 3, 4, 5, 6, 7].map((dot) => (
              <button
                key={dot}
                onClick={() => setRiskLessonSlide(dot)}
                className={`h-3 w-3 rounded-full transition-all duration-300 ${
                  riskLessonSlide === dot
                    ? "bg-cyan-400 scale-125"
                    : "bg-zinc-600 hover:bg-zinc-400"
                }`}
              />
            ))}
          </div>

          <button
            onClick={() =>
              setRiskLessonSlide((prev) => (prev === 7 ? -1 : prev + 1))
            }
            className="rounded-2xl border border-white/10 bg-[#0b1120] px-5 py-3 font-bold text-white transition-all duration-300 hover:border-cyan-400 hover:text-cyan-300"
          >
            Next →
          </button>
        </div>
      </div>
    </div>


<div className="mt-8 rounded-[34px] border border-cyan-400/40 bg-gradient-to-r from-[#07111f] via-[#0b1120] to-[#050816] p-5 shadow-[0_0_45px_rgba(34,211,238,0.18)] transition-all duration-500 hover:border-cyan-300 hover:shadow-[0_0_65px_rgba(34,211,238,0.28)]">
  <div className="grid grid-cols-1 lg:grid-cols-[140px_1fr] gap-4 items-center">

    <div className="flex items-center justify-center pl-2">
      <img
        src="/gaby.png"
        alt="Gaby AI"
        className="h-[210px] w-[210px] object-contain drop-shadow-[0_0_45px_rgba(34,211,238,0.35)]"
      />
    </div>

    <div>
      <div className="rounded-2xl border border-cyan-400/30 bg-[#0f172a] p-5">
        {isGabyTyping ? (
          <div className="flex items-center gap-3 pl-4">
            <div className="flex gap-1">
              <span className="h-2 w-2 animate-bounce rounded-full bg-cyan-400"></span>
              <span className="h-2 w-2 animate-bounce rounded-full bg-cyan-400 [animation-delay:0.2s]"></span>
              <span className="h-2 w-2 animate-bounce rounded-full bg-cyan-400 [animation-delay:0.4s]"></span>
            </div>

            <p className="text-cyan-300 font-bold">
              Gaby is typing...
            </p>
          </div>
        ) : (
          <p className="border-l-4 border-cyan-400 pl-4 text-zinc-100 leading-8">
            {gabyAnswer}
          </p>
        )}
      </div>

      <div className="mt-4 grid grid-cols-2 lg:grid-cols-4 gap-3">
        {[
          "What is risk management?",
          "Why do traders use stop losses?",
          "What is revenge trading?",
          "Why is protecting capital important?",
        ].map((question) => (
          <button
            key={question}
            onClick={() => {
              askGaby(question);
              setGabyQuestion("");
            }}
            className="rounded-xl border border-cyan-400/20 bg-[#0b1120] px-4 py-3 text-sm font-bold text-white transition-all duration-300 hover:-translate-y-[2px] hover:border-cyan-400 hover:bg-cyan-500/10 hover:text-cyan-300 hover:shadow-[0_0_20px_rgba(34,211,238,0.18)]"
          >
            {question}
          </button>
        ))}
      </div>

      <div className="mt-4 flex gap-3">
        <input
          value={gabyQuestion}
          onChange={(e) => setGabyQuestion(e.target.value)}
          placeholder="Ask Gaby anything about this lesson..."
          className="flex-1 rounded-2xl border border-white/10 bg-[#0f172a] px-5 py-4 text-white outline-none transition-all duration-300 focus:border-cyan-400"
        />

        <button
          onClick={() => askGaby(gabyQuestion)}
          disabled={isGabyTyping}
          className="rounded-2xl bg-cyan-400 px-6 font-black text-black transition-all duration-300 hover:scale-[1.02] disabled:cursor-not-allowed disabled:opacity-50"
        >
          {isGabyTyping ? "Thinking..." : "Ask Gaby"}
        </button>
      </div>
    </div>

  </div>
</div>

</div>
)}

{activeLesson === "timeframes" && (
  <div className="rounded-[40px] border border-white/10 bg-[#0b0f1a] p-10 shadow-[0_20px_80px_rgba(0,0,0,0.45)]">
    <div className="grid grid-cols-1 lg:grid-cols-[300px_minmax(0,1fr)] gap-8 items-start">

      <div>
        <h2 className="text-4xl font-black tracking-tight text-white leading-tight">
          Trading Timeframes
        </h2>

        <p className="mt-5 text-zinc-400 text-[17px] leading-8 max-w-[280px]">
          Trading timeframes help traders understand how fast markets move and how long trades may last.
        </p>

        <div className="mt-8 space-y-6 max-w-[290px]">

          <div className="flex gap-5">
            <div className="h-10 w-10 shrink-0 rounded-full bg-cyan-500/15 text-cyan-300 flex items-center justify-center font-black">
              1
            </div>

            <div>
              <h3 className="font-black text-white">
                Lower timeframes move faster
              </h3>

              <p className="mt-1 text-zinc-500 leading-7">
                Smaller timeframes can feel fast, emotional, and noisy.
              </p>
            </div>
          </div>

          <div className="flex gap-5">
            <div className="h-10 w-10 shrink-0 rounded-full bg-cyan-500/15 text-cyan-300 flex items-center justify-center font-black">
              2
            </div>

            <div>
              <h3 className="font-black text-white">
                Higher timeframes show cleaner trends
              </h3>

              <p className="mt-1 text-zinc-500 leading-7">
                Bigger timeframes usually show stronger market direction.
              </p>
            </div>
          </div>

          <div className="flex gap-5">
            <div className="h-10 w-10 shrink-0 rounded-full bg-cyan-500/15 text-cyan-300 flex items-center justify-center font-black">
              3
            </div>

            <div>
              <h3 className="font-black text-white">
                Patience matters
              </h3>

              <p className="mt-1 text-zinc-500 leading-7">
                Many beginners overtrade because they focus only on fast charts.
              </p>
            </div>
          </div>

        </div>
      </div>

      <div className="flex flex-col overflow-hidden rounded-[28px] border border-cyan-500/10 bg-black">
        <img
          src={
            timeframeSlide === -1
              ? "/learn/timeframes/trading-timeframes.png"
              : [
                  "/learn/timeframes/1m-vs-1h.png",
                  "/learn/timeframes/scalping-vs-swing.png",
                  "/learn/timeframes/market-noise.png",
                  "/learn/timeframes/higher-timeframe-trend.png",
                  "/learn/timeframes/lower-timeframe-stress.png",
                  "/learn/timeframes/multi-timeframe-analysis.png",
                  "/learn/timeframes/timeframe-ladder.png",

                  

                ][timeframeSlide]
          }
          alt="Trading Timeframes"
          className="block w-full h-[625px] object-fill bg-white"
        />

        <div className="flex items-center justify-between border-t border-white/10 bg-[#050816] px-6 py-4">

          <button
            onClick={() =>
              setTimeframeSlide((prev) => (prev === -1 ? 6 : prev - 1))
            }
            className="rounded-2xl border border-white/10 bg-[#0b1120] px-5 py-3 font-bold text-white transition-all duration-300 hover:border-cyan-400 hover:text-cyan-300"
          >
            ← Previous
          </button>

          <div className="flex items-center gap-3">
            {[-1, 0, 1, 2, 3, 4, 5, 6, ].map((dot) => (
              <button
                key={dot}
                onClick={() => setTimeframeSlide(dot)}
                className={`h-3 w-3 rounded-full transition-all duration-300 ${
                  timeframeSlide === dot
                    ? "bg-cyan-400 scale-125"
                    : "bg-zinc-600 hover:bg-zinc-400"
                }`}
              />
            ))}
          </div>

          <button
            onClick={() =>
              setTimeframeSlide((prev) => (prev === 6 ? -1 : prev + 1))
            }
            className="rounded-2xl border border-white/10 bg-[#0b1120] px-5 py-3 font-bold text-white transition-all duration-300 hover:border-cyan-400 hover:text-cyan-300"
          >
            Next →
          </button>

        </div>
      </div>
    </div>

    <div className="mt-8 rounded-[34px] border border-cyan-400/40 bg-gradient-to-r from-[#07111f] via-[#0b1120] to-[#050816] p-5 shadow-[0_0_45px_rgba(34,211,238,0.18)] transition-all duration-500 hover:border-cyan-300 hover:shadow-[0_0_65px_rgba(34,211,238,0.28)]">
      <div className="grid grid-cols-1 lg:grid-cols-[140px_1fr] gap-4 items-center">
        <div className="flex items-center justify-center pl-2">
          <img
            src="/gaby.png"
            alt="Gaby AI"
            className="h-[210px] w-[210px] object-contain drop-shadow-[0_0_45px_rgba(34,211,238,0.35)]"
          />
        </div>

        <div>
          <div className="rounded-2xl border border-cyan-400/30 bg-[#0f172a] p-5">
            {isGabyTyping ? (
              <div className="flex items-center gap-3 pl-4">
                <div className="flex gap-1">
                  <span className="h-2 w-2 animate-bounce rounded-full bg-cyan-400"></span>
                  <span className="h-2 w-2 animate-bounce rounded-full bg-cyan-400 [animation-delay:0.2s]"></span>
                  <span className="h-2 w-2 animate-bounce rounded-full bg-cyan-400 [animation-delay:0.4s]"></span>
                </div>

                <p className="text-cyan-300 font-bold">
                  Gaby is typing...
                </p>
              </div>
            ) : (
              <p className="border-l-4 border-cyan-400 pl-4 text-zinc-100 leading-8">
                {gabyAnswer}
              </p>
            )}
          </div>

          <div className="mt-4 grid grid-cols-2 lg:grid-cols-4 gap-3">
            {[
              "What is a timeframe?",
              "Why do timeframes matter?",
              "Which timeframe is best for beginners?",
              "Why do lower timeframes feel stressful?",
            ].map((question) => (
              <button
                key={question}
                onClick={() => {
                  askGaby(question);
                  setGabyQuestion("");
                }}
                className="rounded-xl border border-cyan-400/20 bg-[#0b1120] px-4 py-3 text-sm font-bold text-white transition-all duration-300 hover:-translate-y-[2px] hover:border-cyan-400 hover:bg-cyan-500/10 hover:text-cyan-300 hover:shadow-[0_0_20px_rgba(34,211,238,0.18)]"
              >
                {question}
              </button>
            ))}
          </div>

          <div className="mt-4 flex gap-3">
            <input
              value={gabyQuestion}
              onChange={(e) => setGabyQuestion(e.target.value)}
              placeholder="Ask Gaby anything about this lesson..."
              className="flex-1 rounded-2xl border border-white/10 bg-[#0f172a] px-5 py-4 text-white outline-none transition-all duration-300 focus:border-cyan-400"
            />

            <button
              onClick={() => askGaby(gabyQuestion)}
              disabled={isGabyTyping}
              className="rounded-2xl bg-cyan-400 px-6 font-black text-black transition-all duration-300 hover:scale-[1.02] disabled:cursor-not-allowed disabled:opacity-50"
            >
              {isGabyTyping ? "Thinking..." : "Ask Gaby"}
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
)}
{activeLesson === "candlesticks" && (
  <div className="rounded-[40px] border border-white/10 bg-[#0b0f1a] p-10 shadow-[0_20px_80px_rgba(0,0,0,0.45)]">
    <div className="grid grid-cols-1 lg:grid-cols-[300px_minmax(0,1fr)] gap-8 items-start">

      <div>
        <h2 className="text-4xl font-black tracking-tight text-white leading-tight">
          Candlestick Basics
        </h2>

        <p className="mt-5 text-zinc-400 text-[17px] leading-8 max-w-[280px]">
          Candlesticks are the foundation of chart reading. Learning them helps traders understand price movement and market behavior.
        </p>

        <div className="mt-8 space-y-6 max-w-[290px]">

          <div className="flex gap-5">
            <div className="h-10 w-10 rounded-full bg-cyan-500/15 text-cyan-300 flex items-center justify-center font-black">
              1
            </div>

            <div>
              <h3 className="font-black text-white">
                One candle tells a story
              </h3>

              <p className="mt-1 text-zinc-500 leading-7">
                Every candle shows a battle between buyers and sellers.
              </p>
            </div>
          </div>

          <div className="flex gap-5">
            <div className="h-10 w-10 rounded-full bg-cyan-500/15 text-cyan-300 flex items-center justify-center font-black">
              2
            </div>

            <div>
              <h3 className="font-black text-white">
                Candle size matters
              </h3>

              <p className="mt-1 text-zinc-500 leading-7">
                Large candles often show stronger momentum than small candles.
              </p>
            </div>
          </div>

          <div className="flex gap-5">
            <div className="h-10 w-10 rounded-full bg-cyan-500/15 text-cyan-300 flex items-center justify-center font-black">
              3
            </div>

            <div>
              <h3 className="font-black text-white">
                Wicks show rejection
              </h3>

              <p className="mt-1 text-zinc-500 leading-7">
                Long wicks can reveal areas where price was rejected.
              </p>
            </div>
          </div>

        </div>
      </div>

      <div className="flex flex-col overflow-hidden rounded-[28px] border border-cyan-500/10 bg-black">

        <img
          src={
            candlestickSlide === -1
              ? "/learn/candlesticks/candlestick-basics.png"
              : [
                  "/learn/candlesticks/bullish-vs-bearish-candle.png",
                  "/learn/candlesticks/big-body-vs-small-body.png",
                  "/learn/candlesticks/long-wick-rejection.png",
                  "/learn/candlesticks/common-candlesticks.png",
                  "/learn/candlesticks/candles-tell-a-story.png",
                ][candlestickSlide]
          }
          alt="Candlestick Basics"
          className="block w-full h-[625px] object-fill bg-white"
        />

        <div className="flex items-center justify-between border-t border-white/10 bg-[#050816] px-6 py-4">
          <button
            onClick={() =>
              setCandlestickSlide((prev) => (prev === -1 ? 4 : prev - 1))
            }
            className="rounded-2xl border border-white/10 bg-[#0b1120] px-5 py-3 font-bold text-white transition-all duration-300 hover:border-cyan-400 hover:text-cyan-300"
          >
            ← Previous
          </button>

          <div className="flex items-center gap-3">
            {[-1, 0, 1, 2, 3, 4].map((dot) => (
              <button
                key={dot}
                onClick={() => setCandlestickSlide(dot)}
                className={`h-3 w-3 rounded-full transition-all duration-300 ${
                  candlestickSlide === dot
                    ? "bg-cyan-400 scale-125"
                    : "bg-zinc-600 hover:bg-zinc-400"
                }`}
              />
            ))}
          </div>

          <button
            onClick={() =>
              setCandlestickSlide((prev) => (prev === 4 ? -1 : prev + 1))
            }
            className="rounded-2xl border border-white/10 bg-[#0b1120] px-5 py-3 font-bold text-white transition-all duration-300 hover:border-cyan-400 hover:text-cyan-300"
          >
            Next →
          </button>
        </div>

      </div>
    </div>
    <div className="mt-8 rounded-[34px] border border-cyan-400/40 bg-gradient-to-r from-[#07111f] via-[#0b1120] to-[#050816] p-5 shadow-[0_0_45px_rgba(34,211,238,0.18)] transition-all duration-500 hover:border-cyan-300 hover:shadow-[0_0_65px_rgba(34,211,238,0.28)]">
      <div className="grid grid-cols-1 lg:grid-cols-[140px_1fr] gap-4 items-center">
        <div className="flex items-center justify-center pl-2">
          <img
            src="/gaby.png"
            alt="Gaby AI"
            className="h-[210px] w-[210px] object-contain drop-shadow-[0_0_45px_rgba(34,211,238,0.35)]"
          />
        </div>

        <div>
          <div className="rounded-2xl border border-cyan-400/30 bg-[#0f172a] p-5">
            {isGabyTyping ? (
              <div className="flex items-center gap-3 pl-4">
                <div className="flex gap-1">
                  <span className="h-2 w-2 animate-bounce rounded-full bg-cyan-400"></span>
                  <span className="h-2 w-2 animate-bounce rounded-full bg-cyan-400 [animation-delay:0.2s]"></span>
                  <span className="h-2 w-2 animate-bounce rounded-full bg-cyan-400 [animation-delay:0.4s]"></span>
                </div>

                <p className="text-cyan-300 font-bold">
                  Gaby is typing...
                </p>
              </div>
            ) : (
              <p className="border-l-4 border-cyan-400 pl-4 text-zinc-100 leading-8">
                {gabyAnswer}
              </p>
            )}
          </div>

          <div className="mt-4 grid grid-cols-2 lg:grid-cols-4 gap-3">
            {[
 "What is a candlestick?",
  "What is a bullish candle?",
  "What is a bearish candle?",
  "What does a long wick mean?",
            ].map((question) => (
              <button
                key={question}
                onClick={() => {
                  askGaby(question);
                  setGabyQuestion("");
                }}
                className="rounded-xl border border-cyan-400/20 bg-[#0b1120] px-4 py-3 text-sm font-bold text-white transition-all duration-300 hover:-translate-y-[2px] hover:border-cyan-400 hover:bg-cyan-500/10 hover:text-cyan-300 hover:shadow-[0_0_20px_rgba(34,211,238,0.18)]"
              >
                {question}
              </button>
            ))}
          </div>

          <div className="mt-4 flex gap-3">
            <input
              value={gabyQuestion}
              onChange={(e) => setGabyQuestion(e.target.value)}
              placeholder="Ask Gaby anything about this lesson..."
              className="flex-1 rounded-2xl border border-white/10 bg-[#0f172a] px-5 py-4 text-white outline-none transition-all duration-300 focus:border-cyan-400"
            />

            <button
              onClick={() => askGaby(gabyQuestion)}
              disabled={isGabyTyping}
              className="rounded-2xl bg-cyan-400 px-6 font-black text-black transition-all duration-300 hover:scale-[1.02] disabled:cursor-not-allowed disabled:opacity-50"
            >
              {isGabyTyping ? "Thinking..." : "Ask Gaby"}
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
)}

{activeLesson === "volume" && (
  <div className="rounded-[40px] border border-white/10 bg-[#0b0f1a] p-10 shadow-[0_20px_80px_rgba(0,0,0,0.45)]">
    <div className="grid grid-cols-1 lg:grid-cols-[300px_minmax(0,1fr)] gap-8 items-start">

      <div>
        <h2 className="text-4xl font-black tracking-tight text-white leading-tight">
          Volume Basics
        </h2>

        <p className="mt-5 text-zinc-400 text-[17px] leading-8 max-w-[280px]">
          Volume shows how much trading activity is happening. It helps beginners understand the strength behind price movement.
        </p>

        <div className="mt-8 space-y-6 max-w-[290px]">
          <div className="flex gap-5">
            <div className="h-10 w-10 shrink-0 rounded-full bg-cyan-500/15 text-cyan-300 flex items-center justify-center font-black">
              1
            </div>
            <div>
              <h3 className="font-black text-white">Volume shows activity</h3>
              <p className="mt-1 text-zinc-500 leading-7">
                High volume means more traders are participating in the move.
              </p>
            </div>
          </div>

          <div className="flex gap-5">
            <div className="h-10 w-10 shrink-0 rounded-full bg-cyan-500/15 text-cyan-300 flex items-center justify-center font-black">
              2
            </div>
            <div>
              <h3 className="font-black text-white">Volume confirms strength</h3>
              <p className="mt-1 text-zinc-500 leading-7">
                A price move with strong volume can be more meaningful than a move with weak volume.
              </p>
            </div>
          </div>

          <div className="flex gap-5">
            <div className="h-10 w-10 shrink-0 rounded-full bg-cyan-500/15 text-cyan-300 flex items-center justify-center font-black">
              3
            </div>
            <div>
              <h3 className="font-black text-white">Low volume can be weak</h3>
              <p className="mt-1 text-zinc-500 leading-7">
                Low volume may show less interest, weaker conviction, or slower market movement.
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="flex flex-col overflow-hidden rounded-[28px] border border-cyan-500/10 bg-black">
        <img
          src={
            volumeSlide === -1
              ? "/learn/volume/volume-basics.png"
              : [
                  "/learn/volume/high-vs-low-volume.png",
                  "/learn/volume/volume-confirms-move.png",
                  "/learn/volume/volume-breakout.png",
                  "/learn/volume/volume-spike.png",
                  "/learn/volume/volume-and-candlesticks.png",
                ][volumeSlide]
          }
          alt="Volume Basics"
          className="block w-full h-[625px] object-fill bg-white"
        />

        <div className="flex items-center justify-between border-t border-white/10 bg-[#050816] px-6 py-4">
          <button
            onClick={() =>
              setVolumeSlide((prev) => (prev === -1 ? 4 : prev - 1))
            }
            className="rounded-2xl border border-white/10 bg-[#0b1120] px-5 py-3 font-bold text-white transition-all duration-300 hover:border-cyan-400 hover:text-cyan-300"
          >
            ← Previous
          </button>

          <div className="flex items-center gap-3">
            {[-1, 0, 1, 2, 3, 4].map((dot) => (
              <button
                key={dot}
                onClick={() => setVolumeSlide(dot)}
                className={`h-3 w-3 rounded-full transition-all duration-300 ${
                  volumeSlide === dot
                    ? "bg-cyan-400 scale-125"
                    : "bg-zinc-600 hover:bg-zinc-400"
                }`}
              />
            ))}
          </div>

          <button
            onClick={() =>
              setVolumeSlide((prev) => (prev === 4 ? -1 : prev + 1))
            }
            className="rounded-2xl border border-white/10 bg-[#0b1120] px-5 py-3 font-bold text-white transition-all duration-300 hover:border-cyan-400 hover:text-cyan-300"
          >
            Next →
          </button>
        </div>
      </div>
    </div>
    <div className="mt-8 rounded-[34px] border border-cyan-400/40 bg-gradient-to-r from-[#07111f] via-[#0b1120] to-[#050816] p-5 shadow-[0_0_45px_rgba(34,211,238,0.18)] transition-all duration-500 hover:border-cyan-300 hover:shadow-[0_0_65px_rgba(34,211,238,0.28)]">
  <div className="grid grid-cols-1 lg:grid-cols-[140px_1fr] gap-4 items-center">

    <div className="flex items-center justify-center pl-2">
      <img
        src="/gaby.png"
        alt="Gaby AI"
        className="h-[210px] w-[210px] object-contain drop-shadow-[0_0_45px_rgba(34,211,238,0.35)]"
      />
    </div>

    <div>

      <div className="rounded-2xl border border-cyan-400/30 bg-[#0f172a] p-5">
        {isGabyTyping ? (
          <div className="flex items-center gap-3 pl-4">
            <div className="flex gap-1">
              <span className="h-2 w-2 animate-bounce rounded-full bg-cyan-400"></span>
              <span className="h-2 w-2 animate-bounce rounded-full bg-cyan-400 [animation-delay:0.2s]"></span>
              <span className="h-2 w-2 animate-bounce rounded-full bg-cyan-400 [animation-delay:0.4s]"></span>
            </div>

            <p className="text-cyan-300 font-bold">
              Gaby is typing...
            </p>
          </div>
        ) : (
          <p className="border-l-4 border-cyan-400 pl-4 text-zinc-100 leading-8">
            {gabyAnswer}
          </p>
        )}
      </div>

      <div className="mt-4 grid grid-cols-2 lg:grid-cols-4 gap-3">
        {[
          "What is volume?",
          "Why does volume matter?",
          "What is high volume?",
          "What is low volume?",
        ].map((question) => (
          <button
            key={question}
            onClick={() => {
              askGaby(question);
              setGabyQuestion("");
            }}
            className="rounded-xl border border-cyan-400/20 bg-[#0b1120] px-4 py-3 text-sm font-bold text-white transition-all duration-300 hover:-translate-y-[2px] hover:border-cyan-400 hover:bg-cyan-500/10 hover:text-cyan-300 hover:shadow-[0_0_20px_rgba(34,211,238,0.18)]"
          >
            {question}
          </button>
        ))}
      </div>

      <div className="mt-4 flex gap-3">
        <input
          value={gabyQuestion}
          onChange={(e) => setGabyQuestion(e.target.value)}
          placeholder="Ask Gaby anything about this lesson..."
          className="flex-1 rounded-2xl border border-white/10 bg-[#0f172a] px-5 py-4 text-white outline-none transition-all duration-300 focus:border-cyan-400"
        />

        <button
          onClick={() => askGaby(gabyQuestion)}
          disabled={isGabyTyping}
          className="rounded-2xl bg-cyan-400 px-6 font-black text-black transition-all duration-300 hover:scale-[1.02] disabled:cursor-not-allowed disabled:opacity-50"
        >
          {isGabyTyping ? "Thinking..." : "Ask Gaby"}
        </button>
      </div>

    </div>
  </div>
</div>
  </div>
)}

{activeLesson === "support" && (
  <div className="rounded-[40px] border border-white/10 bg-[#0b0f1a] p-10 shadow-[0_20px_80px_rgba(0,0,0,0.45)]">
    <div className="grid grid-cols-1 lg:grid-cols-[300px_minmax(0,1fr)] gap-8 items-start">

      <div>
        <h2 className="text-4xl font-black tracking-tight text-white leading-tight">
          Support & Resistance
        </h2>

        <p className="mt-5 text-zinc-400 text-[17px] leading-8 max-w-[280px]">
          Support and resistance are important price zones where buyers or sellers may react.
        </p>

        <div className="mt-8 space-y-6 max-w-[290px]">
          <div className="flex gap-5">
            <div className="h-10 w-10 shrink-0 rounded-full bg-cyan-500/15 text-cyan-300 flex items-center justify-center font-black">
              1
            </div>
            <div>
              <h3 className="font-black text-white">Support acts like a floor</h3>
              <p className="mt-1 text-zinc-500 leading-7">
                Support is an area where buyers may step in and push price higher.
              </p>
            </div>
          </div>

          <div className="flex gap-5">
            <div className="h-10 w-10 shrink-0 rounded-full bg-cyan-500/15 text-cyan-300 flex items-center justify-center font-black">
              2
            </div>
            <div>
              <h3 className="font-black text-white">Resistance acts like a ceiling</h3>
              <p className="mt-1 text-zinc-500 leading-7">
                Resistance is an area where sellers may step in and push price lower.
              </p>
            </div>
          </div>

          <div className="flex gap-5">
            <div className="h-10 w-10 shrink-0 rounded-full bg-cyan-500/15 text-cyan-300 flex items-center justify-center font-black">
              3
            </div>
            <div>
              <h3 className="font-black text-white">Breakouts can happen</h3>
              <p className="mt-1 text-zinc-500 leading-7">
                Price can bounce from these levels or break through them with strength.
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="flex flex-col overflow-hidden rounded-[28px] border border-cyan-500/10 bg-black">
        <img
          src={
            supportSlide === -1
              ? "/learn/support/support-resistance-basics.png"
              : [
                  "/learn/support/support-floor.png",
                  "/learn/support/resistance-ceiling.png",
                  "/learn/support/support-breakdown.png",
                  "/learn/support/resistance-breakout.png",
                  "/learn/support/role-reversal.png",
                ][supportSlide]
          }
          alt="Support and Resistance"
          className="block w-full h-[625px] object-fill bg-white"
        />

        <div className="flex items-center justify-between border-t border-white/10 bg-[#050816] px-6 py-4">
          <button
            onClick={() =>
              setSupportSlide((prev) => (prev === -1 ? 4 : prev - 1))
            }
            className="rounded-2xl border border-white/10 bg-[#0b1120] px-5 py-3 font-bold text-white transition-all duration-300 hover:border-cyan-400 hover:text-cyan-300"
          >
            ← Previous
          </button>

          <div className="flex items-center gap-3">
            {[-1, 0, 1, 2, 3, 4].map((dot) => (
              <button
                key={dot}
                onClick={() => setSupportSlide(dot)}
                className={`h-3 w-3 rounded-full transition-all duration-300 ${
                  supportSlide === dot
                    ? "bg-cyan-400 scale-125"
                    : "bg-zinc-600 hover:bg-zinc-400"
                }`}
              />
            ))}
          </div>

          <button
            onClick={() =>
              setSupportSlide((prev) => (prev === 4 ? -1 : prev + 1))
            }
            className="rounded-2xl border border-white/10 bg-[#0b1120] px-5 py-3 font-bold text-white transition-all duration-300 hover:border-cyan-400 hover:text-cyan-300"
          >
            Next →
          </button>
        </div>
      </div>
    </div>

    <div className="mt-8 rounded-[34px] border border-cyan-400/40 bg-gradient-to-r from-[#07111f] via-[#0b1120] to-[#050816] p-5 shadow-[0_0_45px_rgba(34,211,238,0.18)] transition-all duration-500 hover:border-cyan-300 hover:shadow-[0_0_65px_rgba(34,211,238,0.28)]">
      <div className="grid grid-cols-1 lg:grid-cols-[140px_1fr] gap-4 items-center">

        <div className="flex items-center justify-center pl-2">
          <img
            src="/gaby.png"
            alt="Gaby AI"
            className="h-[210px] w-[210px] object-contain drop-shadow-[0_0_45px_rgba(34,211,238,0.35)]"
          />
        </div>

        <div>
          <div className="rounded-2xl border border-cyan-400/30 bg-[#0f172a] p-5">
            {isGabyTyping ? (
              <div className="flex items-center gap-3 pl-4">
                <div className="flex gap-1">
                  <span className="h-2 w-2 animate-bounce rounded-full bg-cyan-400"></span>
                  <span className="h-2 w-2 animate-bounce rounded-full bg-cyan-400 [animation-delay:0.2s]"></span>
                  <span className="h-2 w-2 animate-bounce rounded-full bg-cyan-400 [animation-delay:0.4s]"></span>
                </div>

                <p className="text-cyan-300 font-bold">
                  Gaby is typing...
                </p>
              </div>
            ) : (
              <p className="border-l-4 border-cyan-400 pl-4 text-zinc-100 leading-8">
                {gabyAnswer}
              </p>
            )}
          </div>

          <div className="mt-4 grid grid-cols-2 lg:grid-cols-4 gap-3">
            {[
              "What is support?",
              "What is resistance?",
              "Why do support and resistance matter?",
              "What is a breakout?",
            ].map((question) => (
              <button
                key={question}
                onClick={() => {
                  askGaby(question);
                  setGabyQuestion("");
                }}
                className="rounded-xl border border-cyan-400/20 bg-[#0b1120] px-4 py-3 text-sm font-bold text-white transition-all duration-300 hover:-translate-y-[2px] hover:border-cyan-400 hover:bg-cyan-500/10 hover:text-cyan-300 hover:shadow-[0_0_20px_rgba(34,211,238,0.18)]"
              >
                {question}
              </button>
            ))}
          </div>

          <div className="mt-4 flex gap-3">
            <input
              value={gabyQuestion}
              onChange={(e) => setGabyQuestion(e.target.value)}
              placeholder="Ask Gaby anything about this lesson..."
              className="flex-1 rounded-2xl border border-white/10 bg-[#0f172a] px-5 py-4 text-white outline-none transition-all duration-300 focus:border-cyan-400"
            />

            <button
              onClick={() => askGaby(gabyQuestion)}
              disabled={isGabyTyping}
              className="rounded-2xl bg-cyan-400 px-6 font-black text-black transition-all duration-300 hover:scale-[1.02] disabled:cursor-not-allowed disabled:opacity-50"
            >
              {isGabyTyping ? "Thinking..." : "Ask Gaby"}
            </button>
          </div>
        </div>

      </div>
    </div>
  </div>
)}

{activeLesson === "supplydemand" && (
  <div className="rounded-[40px] border border-white/10 bg-[#0b0f1a] p-10 shadow-[0_20px_80px_rgba(0,0,0,0.45)]">
    <div className="grid grid-cols-1 lg:grid-cols-[300px_minmax(0,1fr)] gap-8 items-start">

      <div>
        <h2 className="text-4xl font-black tracking-tight text-white leading-tight">
          Supply & Demand
        </h2>

        <p className="mt-5 text-zinc-400 text-[17px] leading-8 max-w-[280px]">
          Supply and demand explain why price moves up, moves down, or reacts at important zones.
        </p>

        <div className="mt-8 space-y-6 max-w-[290px]">
          <div className="flex gap-5">
            <div className="h-10 w-10 shrink-0 rounded-full bg-cyan-500/15 text-cyan-300 flex items-center justify-center font-black">
              1
            </div>
            <div>
              <h3 className="font-black text-white">Demand pushes price up</h3>
              <p className="mt-1 text-zinc-500 leading-7">
                Demand means buyers are interested and may push price higher.
              </p>
            </div>
          </div>

          <div className="flex gap-5">
            <div className="h-10 w-10 shrink-0 rounded-full bg-cyan-500/15 text-cyan-300 flex items-center justify-center font-black">
              2
            </div>
            <div>
              <h3 className="font-black text-white">Supply pushes price down</h3>
              <p className="mt-1 text-zinc-500 leading-7">
                Supply means sellers are active and may push price lower.
              </p>
            </div>
          </div>

          <div className="flex gap-5">
            <div className="h-10 w-10 shrink-0 rounded-full bg-cyan-500/15 text-cyan-300 flex items-center justify-center font-black">
              3
            </div>
            <div>
              <h3 className="font-black text-white">Zones matter more than lines</h3>
              <p className="mt-1 text-zinc-500 leading-7">
                Traders often look for areas where buyers or sellers reacted strongly before.
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="flex flex-col overflow-hidden rounded-[28px] border border-cyan-500/10 bg-black">
        <img
          src={
            supplyDemandSlide === -1
              ? "/learn/supplydemand/supply-demand-basics.png"
              : [
                  "/learn/supplydemand/demand-zone.png",
                  "/learn/supplydemand/supply-zone.png",
                  "/learn/supplydemand/price-imbalance.png",
                  "/learn/supplydemand/zone-retest.png",
                  "/learn/supplydemand/supply-demand-vs-support-resistance.png",
                ][supplyDemandSlide]
          }
          alt="Supply and Demand"
          className="block w-full h-[625px] object-fill bg-white"
        />

        <div className="flex items-center justify-between border-t border-white/10 bg-[#050816] px-6 py-4">
          <button
            onClick={() =>
              setSupplyDemandSlide((prev) => (prev === -1 ? 4 : prev - 1))
            }
            className="rounded-2xl border border-white/10 bg-[#0b1120] px-5 py-3 font-bold text-white transition-all duration-300 hover:border-cyan-400 hover:text-cyan-300"
          >
            ← Previous
          </button>

          <div className="flex items-center gap-3">
            {[-1, 0, 1, 2, 3, 4].map((dot) => (
              <button
                key={dot}
                onClick={() => setSupplyDemandSlide(dot)}
                className={`h-3 w-3 rounded-full transition-all duration-300 ${
                  supplyDemandSlide === dot
                    ? "bg-cyan-400 scale-125"
                    : "bg-zinc-600 hover:bg-zinc-400"
                }`}
              />
            ))}
          </div>

          <button
            onClick={() =>
              setSupplyDemandSlide((prev) => (prev === 4 ? -1 : prev + 1))
            }
            className="rounded-2xl border border-white/10 bg-[#0b1120] px-5 py-3 font-bold text-white transition-all duration-300 hover:border-cyan-400 hover:text-cyan-300"
          >
            Next →
          </button>
        </div>
      </div>
    </div>

    <div className="mt-8 rounded-[34px] border border-cyan-400/40 bg-gradient-to-r from-[#07111f] via-[#0b1120] to-[#050816] p-5 shadow-[0_0_45px_rgba(34,211,238,0.18)] transition-all duration-500 hover:border-cyan-300 hover:shadow-[0_0_65px_rgba(34,211,238,0.28)]">
      <div className="grid grid-cols-1 lg:grid-cols-[140px_1fr] gap-4 items-center">

        <div className="flex items-center justify-center pl-2">
          <img
            src="/gaby.png"
            alt="Gaby AI"
            className="h-[210px] w-[210px] object-contain drop-shadow-[0_0_45px_rgba(34,211,238,0.35)]"
          />
        </div>

        <div>
          <div className="rounded-2xl border border-cyan-400/30 bg-[#0f172a] p-5">
            {isGabyTyping ? (
              <div className="flex items-center gap-3 pl-4">
                <div className="flex gap-1">
                  <span className="h-2 w-2 animate-bounce rounded-full bg-cyan-400"></span>
                  <span className="h-2 w-2 animate-bounce rounded-full bg-cyan-400 [animation-delay:0.2s]"></span>
                  <span className="h-2 w-2 animate-bounce rounded-full bg-cyan-400 [animation-delay:0.4s]"></span>
                </div>

                <p className="text-cyan-300 font-bold">
                  Gaby is typing...
                </p>
              </div>
            ) : (
              <p className="border-l-4 border-cyan-400 pl-4 text-zinc-100 leading-8">
                {gabyAnswer}
              </p>
            )}
          </div>

          <div className="mt-4 grid grid-cols-2 lg:grid-cols-4 gap-3">
            {[
              "What is supply?",
              "What is demand?",
              "What is a demand zone?",
              "What is a supply zone?",
            ].map((question) => (
              <button
                key={question}
                onClick={() => {
                  askGaby(question);
                  setGabyQuestion("");
                }}
                className="rounded-xl border border-cyan-400/20 bg-[#0b1120] px-4 py-3 text-sm font-bold text-white transition-all duration-300 hover:-translate-y-[2px] hover:border-cyan-400 hover:bg-cyan-500/10 hover:text-cyan-300 hover:shadow-[0_0_20px_rgba(34,211,238,0.18)]"
              >
                {question}
              </button>
            ))}
          </div>

          <div className="mt-4 flex gap-3">
            <input
              value={gabyQuestion}
              onChange={(e) => setGabyQuestion(e.target.value)}
              placeholder="Ask Gaby anything about this lesson..."
              className="flex-1 rounded-2xl border border-white/10 bg-[#0f172a] px-5 py-4 text-white outline-none transition-all duration-300 focus:border-cyan-400"
            />

            <button
              onClick={() => askGaby(gabyQuestion)}
              disabled={isGabyTyping}
              className="rounded-2xl bg-cyan-400 px-6 font-black text-black transition-all duration-300 hover:scale-[1.02] disabled:cursor-not-allowed disabled:opacity-50"
            >
              {isGabyTyping ? "Thinking..." : "Ask Gaby"}
            </button>
          </div>
        </div>

      </div>
    </div>
  </div>
)}

{activeLesson === "patterns" && (
  <div className="rounded-[40px] border border-white/10 bg-[#0b0f1a] p-10 shadow-[0_20px_80px_rgba(0,0,0,0.45)]">
    <div className="grid grid-cols-1 lg:grid-cols-[300px_minmax(0,1fr)] gap-8 items-start">

      <div>
        <h2 className="text-4xl font-black tracking-tight text-white leading-tight">
          Chart Patterns
        </h2>

        <p className="mt-5 text-zinc-400 text-[17px] leading-8 max-w-[280px]">
          Chart patterns help traders recognize repeated price behavior and possible market direction.
        </p>

        <div className="mt-8 space-y-6 max-w-[290px]">
          <div className="flex gap-5">
            <div className="h-10 w-10 shrink-0 rounded-full bg-cyan-500/15 text-cyan-300 flex items-center justify-center font-black">
              1
            </div>
            <div>
              <h3 className="font-black text-white">Patterns show market behavior</h3>
              <p className="mt-1 text-zinc-500 leading-7">
                Patterns form when buyers and sellers repeat similar reactions on a chart.
              </p>
            </div>
          </div>

          <div className="flex gap-5">
            <div className="h-10 w-10 shrink-0 rounded-full bg-cyan-500/15 text-cyan-300 flex items-center justify-center font-black">
              2
            </div>
            <div>
              <h3 className="font-black text-white">They are not guarantees</h3>
              <p className="mt-1 text-zinc-500 leading-7">
                Patterns can help with direction, but traders still need confirmation and risk control.
              </p>
            </div>
          </div>

          <div className="flex gap-5">
            <div className="h-10 w-10 shrink-0 rounded-full bg-cyan-500/15 text-cyan-300 flex items-center justify-center font-black">
              3
            </div>
            <div>
              <h3 className="font-black text-white">Context matters</h3>
              <p className="mt-1 text-zinc-500 leading-7">
                Strong patterns work best near support, resistance, supply, demand, or trend areas.
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="flex flex-col overflow-hidden rounded-[28px] border border-cyan-500/10 bg-black">
        <img
          src={
            patternSlide === -1
              ? "/learn/patterns/chart-patterns-basics.png"
              : [
                  "/learn/patterns/double-top.png",
                  "/learn/patterns/double-bottom.png",
                  "/learn/patterns/ascending-triangle.png",
                  "/learn/patterns/descending-triangle.png",
                  "/learn/patterns/head-and-shoulders.png",
                ][patternSlide]
          }
          alt="Chart Patterns"
          className="block w-full h-[625px] object-fill bg-white"
        />

        <div className="flex items-center justify-between border-t border-white/10 bg-[#050816] px-6 py-4">
          <button
            onClick={() =>
              setPatternSlide((prev) => (prev === -1 ? 4 : prev - 1))
            }
            className="rounded-2xl border border-white/10 bg-[#0b1120] px-5 py-3 font-bold text-white transition-all duration-300 hover:border-cyan-400 hover:text-cyan-300"
          >
            ← Previous
          </button>

          <div className="flex items-center gap-3">
            {[-1, 0, 1, 2, 3, 4].map((dot) => (
              <button
                key={dot}
                onClick={() => setPatternSlide(dot)}
                className={`h-3 w-3 rounded-full transition-all duration-300 ${
                  patternSlide === dot
                    ? "bg-cyan-400 scale-125"
                    : "bg-zinc-600 hover:bg-zinc-400"
                }`}
              />
            ))}
          </div>

          <button
            onClick={() =>
              setPatternSlide((prev) => (prev === 4 ? -1 : prev + 1))
            }
            className="rounded-2xl border border-white/10 bg-[#0b1120] px-5 py-3 font-bold text-white transition-all duration-300 hover:border-cyan-400 hover:text-cyan-300"
          >
            Next →
          </button>
        </div>
      </div>
    </div>

    <div className="mt-8 rounded-[34px] border border-cyan-400/40 bg-gradient-to-r from-[#07111f] via-[#0b1120] to-[#050816] p-5 shadow-[0_0_45px_rgba(34,211,238,0.18)] transition-all duration-500 hover:border-cyan-300 hover:shadow-[0_0_65px_rgba(34,211,238,0.28)]">
      <div className="grid grid-cols-1 lg:grid-cols-[140px_1fr] gap-4 items-center">

        <div className="flex items-center justify-center pl-2">
          <img
            src="/gaby.png"
            alt="Gaby AI"
            className="h-[210px] w-[210px] object-contain drop-shadow-[0_0_45px_rgba(34,211,238,0.35)]"
          />
        </div>

        <div>
          <div className="rounded-2xl border border-cyan-400/30 bg-[#0f172a] p-5">
            {isGabyTyping ? (
              <div className="flex items-center gap-3 pl-4">
                <div className="flex gap-1">
                  <span className="h-2 w-2 animate-bounce rounded-full bg-cyan-400"></span>
                  <span className="h-2 w-2 animate-bounce rounded-full bg-cyan-400 [animation-delay:0.2s]"></span>
                  <span className="h-2 w-2 animate-bounce rounded-full bg-cyan-400 [animation-delay:0.4s]"></span>
                </div>

                <p className="text-cyan-300 font-bold">
                  Gaby is typing...
                </p>
              </div>
            ) : (
              <p className="border-l-4 border-cyan-400 pl-4 text-zinc-100 leading-8">
                {gabyAnswer}
              </p>
            )}
          </div>

          <div className="mt-4 grid grid-cols-2 lg:grid-cols-4 gap-3">
            {[
              "What is a chart pattern?",
              "What is a double top?",
              "What is a double bottom?",
              "What is a head and shoulders pattern?",
            ].map((question) => (
              <button
                key={question}
                onClick={() => {
                  askGaby(question);
                  setGabyQuestion("");
                }}
                className="rounded-xl border border-cyan-400/20 bg-[#0b1120] px-4 py-3 text-sm font-bold text-white transition-all duration-300 hover:-translate-y-[2px] hover:border-cyan-400 hover:bg-cyan-500/10 hover:text-cyan-300 hover:shadow-[0_0_20px_rgba(34,211,238,0.18)]"
              >
                {question}
              </button>
            ))}
          </div>

          <div className="mt-4 flex gap-3">
            <input
              value={gabyQuestion}
              onChange={(e) => setGabyQuestion(e.target.value)}
              placeholder="Ask Gaby anything about this lesson..."
              className="flex-1 rounded-2xl border border-white/10 bg-[#0f172a] px-5 py-4 text-white outline-none transition-all duration-300 focus:border-cyan-400"
            />

            <button
              onClick={() => askGaby(gabyQuestion)}
              disabled={isGabyTyping}
              className="rounded-2xl bg-cyan-400 px-6 font-black text-black transition-all duration-300 hover:scale-[1.02] disabled:cursor-not-allowed disabled:opacity-50"
            >
              {isGabyTyping ? "Thinking..." : "Ask Gaby"}
            </button>
          </div>
        </div>

      </div>
    </div>
  </div>
)}

{activeLesson === "setups" && (
  <div className="rounded-[40px] border border-white/10 bg-[#0b0f1a] p-10 shadow-[0_20px_80px_rgba(0,0,0,0.45)]">
    <div className="grid grid-cols-1 lg:grid-cols-[300px_minmax(0,1fr)] gap-8 items-start">

      <div>
        <h2 className="text-4xl font-black tracking-tight text-white leading-tight">
          Building A Trade Plan
        </h2>

        <p className="mt-5 text-zinc-400 text-[17px] leading-8 max-w-[280px]">
          A trade plan helps traders make decisions before entering a trade instead of reacting emotionally.
        </p>

        <div className="mt-8 space-y-6 max-w-[290px]">
          <div className="flex gap-5">
            <div className="h-10 w-10 shrink-0 rounded-full bg-cyan-500/15 text-cyan-300 flex items-center justify-center font-black">1</div>
            <div>
              <h3 className="font-black text-white">Know your entry</h3>
              <p className="mt-1 text-zinc-500 leading-7">
                Decide exactly where your trade idea begins before entering.
              </p>
            </div>
          </div>

          <div className="flex gap-5">
            <div className="h-10 w-10 shrink-0 rounded-full bg-cyan-500/15 text-cyan-300 flex items-center justify-center font-black">2</div>
            <div>
              <h3 className="font-black text-white">Control your risk</h3>
              <p className="mt-1 text-zinc-500 leading-7">
                Set your stop loss and risk amount before the trade starts.
              </p>
            </div>
          </div>

          <div className="flex gap-5">
            <div className="h-10 w-10 shrink-0 rounded-full bg-cyan-500/15 text-cyan-300 flex items-center justify-center font-black">3</div>
            <div>
              <h3 className="font-black text-white">Plan your target</h3>
              <p className="mt-1 text-zinc-500 leading-7">
                Know where you may take profit before emotions take over.
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="flex flex-col overflow-hidden rounded-[28px] border border-cyan-500/10 bg-black">
        <img
          src={
            tradePlanSlide === -1
              ? "/learn/tradeplan/trade-plan-basics.png"
              : [
                  "/learn/tradeplan/entry-stop-target.png",
                  "/learn/tradeplan/risk-reward.png",
                  "/learn/tradeplan/checklist-before-trade.png",
                  "/learn/tradeplan/common-plan-mistakes.png",
                ][tradePlanSlide]
          }
          alt="Building A Trade Plan"
          className="block w-full h-[625px] object-fill bg-white"
        />

        <div className="flex items-center justify-between border-t border-white/10 bg-[#050816] px-6 py-4">
          <button
            onClick={() =>
              setTradePlanSlide((prev) => (prev === -1 ? 3 : prev - 1))
            }
            className="rounded-2xl border border-white/10 bg-[#0b1120] px-5 py-3 font-bold text-white transition-all duration-300 hover:border-cyan-400 hover:text-cyan-300"
          >
            ← Previous
          </button>

          <div className="flex items-center gap-3">
            {[-1, 0, 1, 2, 3, ].map((dot) => (
              <button
                key={dot}
                onClick={() => setTradePlanSlide(dot)}
                className={`h-3 w-3 rounded-full transition-all duration-300 ${
                  tradePlanSlide === dot
                    ? "bg-cyan-400 scale-125"
                    : "bg-zinc-600 hover:bg-zinc-400"
                }`}
              />
            ))}
          </div>

          <button
            onClick={() =>
              setTradePlanSlide((prev) => (prev === 3 ? -1 : prev + 1))
            }
            className="rounded-2xl border border-white/10 bg-[#0b1120] px-5 py-3 font-bold text-white transition-all duration-300 hover:border-cyan-400 hover:text-cyan-300"
          >
            Next →
          </button>
        </div>
      </div>
    </div>

    <div className="mt-8 rounded-[34px] border border-cyan-400/40 bg-gradient-to-r from-[#07111f] via-[#0b1120] to-[#050816] p-5 shadow-[0_0_45px_rgba(34,211,238,0.18)] transition-all duration-500 hover:border-cyan-300 hover:shadow-[0_0_65px_rgba(34,211,238,0.28)]">
      <div className="grid grid-cols-1 lg:grid-cols-[140px_1fr] gap-4 items-center">

        <div className="flex items-center justify-center pl-2">
          <img
            src="/gaby.png"
            alt="Gaby AI"
            className="h-[210px] w-[210px] object-contain drop-shadow-[0_0_45px_rgba(34,211,238,0.35)]"
          />
        </div>

        <div>
          <div className="rounded-2xl border border-cyan-400/30 bg-[#0f172a] p-5">
            {isGabyTyping ? (
              <div className="flex items-center gap-3 pl-4">
                <div className="flex gap-1">
                  <span className="h-2 w-2 animate-bounce rounded-full bg-cyan-400"></span>
                  <span className="h-2 w-2 animate-bounce rounded-full bg-cyan-400 [animation-delay:0.2s]"></span>
                  <span className="h-2 w-2 animate-bounce rounded-full bg-cyan-400 [animation-delay:0.4s]"></span>
                </div>
                <p className="text-cyan-300 font-bold">Gaby is typing...</p>
              </div>
            ) : (
              <p className="border-l-4 border-cyan-400 pl-4 text-zinc-100 leading-8">
                {gabyAnswer}
              </p>
            )}
          </div>

          <div className="mt-4 grid grid-cols-2 lg:grid-cols-4 gap-3">
            {[
              "What is a trade plan?",
              "Why do traders use trade plans?",
              "What is risk reward?",
              "Why is a checklist important?",
            ].map((question) => (
              <button
                key={question}
                onClick={() => {
                  askGaby(question);
                  setGabyQuestion("");
                }}
                className="rounded-xl border border-cyan-400/20 bg-[#0b1120] px-4 py-3 text-sm font-bold text-white transition-all duration-300 hover:-translate-y-[2px] hover:border-cyan-400 hover:bg-cyan-500/10 hover:text-cyan-300 hover:shadow-[0_0_20px_rgba(34,211,238,0.18)]"
              >
                {question}
              </button>
            ))}
          </div>

          <div className="mt-4 flex gap-3">
            <input
              value={gabyQuestion}
              onChange={(e) => setGabyQuestion(e.target.value)}
              placeholder="Ask Gaby anything about this lesson..."
              className="flex-1 rounded-2xl border border-white/10 bg-[#0f172a] px-5 py-4 text-white outline-none transition-all duration-300 focus:border-cyan-400"
            />

            <button
              onClick={() => askGaby(gabyQuestion)}
              disabled={isGabyTyping}
              className="rounded-2xl bg-cyan-400 px-6 font-black text-black transition-all duration-300 hover:scale-[1.02] disabled:cursor-not-allowed disabled:opacity-50"
            >
              {isGabyTyping ? "Thinking..." : "Ask Gaby"}
            </button>
          </div>
        </div>

      </div>
    </div>
  </div>
)}

{activeLesson === "psychology" && (
  <div className="rounded-[40px] border border-white/10 bg-[#0b0f1a] p-10 shadow-[0_20px_80px_rgba(0,0,0,0.45)]">
    <div className="grid grid-cols-1 lg:grid-cols-[300px_minmax(0,1fr)] gap-8 items-start">

      <div>
        <h2 className="text-4xl font-black tracking-tight text-white leading-tight">
          Trading Psychology
        </h2>

        <p className="mt-5 text-zinc-400 text-[17px] leading-8 max-w-[280px]">
          Trading psychology helps beginners understand how emotions affect decisions before, during, and after a trade.
        </p>

        <div className="mt-8 space-y-6 max-w-[290px]">
          <div className="flex gap-5">
            <div className="h-10 w-10 shrink-0 rounded-full bg-cyan-500/15 text-cyan-300 flex items-center justify-center font-black">1</div>
            <div>
              <h3 className="font-black text-white">Emotions affect decisions</h3>
              <p className="mt-1 text-zinc-500 leading-7">
                Fear and greed can make traders exit too early, chase price, or ignore their rules.
              </p>
            </div>
          </div>

          <div className="flex gap-5">
            <div className="h-10 w-10 shrink-0 rounded-full bg-cyan-500/15 text-cyan-300 flex items-center justify-center font-black">2</div>
            <div>
              <h3 className="font-black text-white">Patience protects beginners</h3>
              <p className="mt-1 text-zinc-500 leading-7">
                Waiting for a quality setup is better than forcing random trades.
              </p>
            </div>
          </div>

          <div className="flex gap-5">
            <div className="h-10 w-10 shrink-0 rounded-full bg-cyan-500/15 text-cyan-300 flex items-center justify-center font-black">3</div>
            <div>
              <h3 className="font-black text-white">Professional traders think long term</h3>
              <p className="mt-1 text-zinc-500 leading-7">
                They focus on process, consistency, and discipline instead of one trade.
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="flex flex-col overflow-hidden rounded-[28px] border border-cyan-500/10 bg-black">
        <img
          src={
            psychologySlide === -1
              ? "/learn/psychology/psychology-basics.png"
              : [
                  "/learn/psychology/fear-vs-greed.png",
                  "/learn/psychology/fomo-trading.png",
                  "/learn/psychology/patience-in-trading.png",
                  "/learn/psychology/thinking-like-a-professional.png",
                ][psychologySlide]
          }
          alt="Trading Psychology"
          className="block w-full h-[625px] object-fill bg-white"
        />

        <div className="flex items-center justify-between border-t border-white/10 bg-[#050816] px-6 py-4">
          <button
            onClick={() =>
              setPsychologySlide((prev) => (prev === -1 ? 3 : prev - 1))
            }
            className="rounded-2xl border border-white/10 bg-[#0b1120] px-5 py-3 font-bold text-white transition-all duration-300 hover:border-cyan-400 hover:text-cyan-300"
          >
            ← Previous
          </button>

          <div className="flex items-center gap-3">
            {[-1, 0, 1, 2, 3].map((dot) => (
              <button
                key={dot}
                onClick={() => setPsychologySlide(dot)}
                className={`h-3 w-3 rounded-full transition-all duration-300 ${
                  psychologySlide === dot
                    ? "bg-cyan-400 scale-125"
                    : "bg-zinc-600 hover:bg-zinc-400"
                }`}
              />
            ))}
          </div>

          <button
            onClick={() =>
              setPsychologySlide((prev) => (prev === 3 ? -1 : prev + 1))
            }
            className="rounded-2xl border border-white/10 bg-[#0b1120] px-5 py-3 font-bold text-white transition-all duration-300 hover:border-cyan-400 hover:text-cyan-300"
          >
            Next →
          </button>
        </div>
      </div>
    </div>

    <div className="mt-8 rounded-[34px] border border-cyan-400/40 bg-gradient-to-r from-[#07111f] via-[#0b1120] to-[#050816] p-5 shadow-[0_0_45px_rgba(34,211,238,0.18)] transition-all duration-500 hover:border-cyan-300 hover:shadow-[0_0_65px_rgba(34,211,238,0.28)]">
      <div className="grid grid-cols-1 lg:grid-cols-[140px_1fr] gap-4 items-center">

        <div className="flex items-center justify-center pl-2">
          <img
            src="/gaby.png"
            alt="Gaby AI"
            className="h-[210px] w-[210px] object-contain drop-shadow-[0_0_45px_rgba(34,211,238,0.35)]"
          />
        </div>

        <div>
          <div className="rounded-2xl border border-cyan-400/30 bg-[#0f172a] p-5">
            {isGabyTyping ? (
              <div className="flex items-center gap-3 pl-4">
                <div className="flex gap-1">
                  <span className="h-2 w-2 animate-bounce rounded-full bg-cyan-400"></span>
                  <span className="h-2 w-2 animate-bounce rounded-full bg-cyan-400 [animation-delay:0.2s]"></span>
                  <span className="h-2 w-2 animate-bounce rounded-full bg-cyan-400 [animation-delay:0.4s]"></span>
                </div>
                <p className="text-cyan-300 font-bold">Gaby is typing...</p>
              </div>
            ) : (
              <p className="border-l-4 border-cyan-400 pl-4 text-zinc-100 leading-8">
                {gabyAnswer}
              </p>
            )}
          </div>

          <div className="mt-4 grid grid-cols-2 lg:grid-cols-5 gap-3">
            {[
              "What is trading psychology?",
              "What is fear in trading?",
              "What is greed in trading?",
              "What is FOMO trading?",
              "Why is patience important?",
            ].map((question) => (
              <button
                key={question}
                onClick={() => {
                  askGaby(question);
                  setGabyQuestion("");
                }}
                className="rounded-xl border border-cyan-400/20 bg-[#0b1120] px-4 py-3 text-sm font-bold text-white transition-all duration-300 hover:-translate-y-[2px] hover:border-cyan-400 hover:bg-cyan-500/10 hover:text-cyan-300 hover:shadow-[0_0_20px_rgba(34,211,238,0.18)]"
              >
                {question}
              </button>
            ))}
          </div>

          <div className="mt-4 flex gap-3">
            <input
              value={gabyQuestion}
              onChange={(e) => setGabyQuestion(e.target.value)}
              placeholder="Ask Gaby anything about this lesson..."
              className="flex-1 rounded-2xl border border-white/10 bg-[#0f172a] px-5 py-4 text-white outline-none transition-all duration-300 focus:border-cyan-400"
            />

            <button
              onClick={() => askGaby(gabyQuestion)}
              disabled={isGabyTyping}
              className="rounded-2xl bg-cyan-400 px-6 font-black text-black transition-all duration-300 hover:scale-[1.02] disabled:cursor-not-allowed disabled:opacity-50"
            >
              {isGabyTyping ? "Thinking..." : "Ask Gaby"}
            </button>
          </div>
        </div>

      </div>
    </div>
  </div>
)}

{activeLesson === "vocabulary" && (
  <div className="rounded-[40px] border border-white/10 bg-[#0b0f1a] p-10 shadow-[0_20px_80px_rgba(0,0,0,0.45)]">
    <div className="grid grid-cols-1 lg:grid-cols-[300px_minmax(0,1fr)] gap-8 items-start">

      <div>
        <h2 className="text-4xl font-black tracking-tight text-white leading-tight">
          Essential Trading Terms
        </h2>

        <p className="mt-5 text-zinc-400 text-[17px] leading-8 max-w-[280px]">
          Learn the common trading words you will see on charts, platforms, and market discussions.
        </p>

        <div className="mt-8 space-y-6 max-w-[290px]">
          <div className="flex gap-5">
            <div className="h-10 w-10 shrink-0 rounded-full bg-cyan-500/15 text-cyan-300 flex items-center justify-center font-black">1</div>
            <div>
              <h3 className="font-black text-white">Learn common terms</h3>
              <p className="mt-1 text-zinc-500 leading-7">
                Understanding trading terms helps you read charts and follow market discussions.
              </p>
            </div>
          </div>

          <div className="flex gap-5">
            <div className="h-10 w-10 shrink-0 rounded-full bg-cyan-500/15 text-cyan-300 flex items-center justify-center font-black">2</div>
            <div>
              <h3 className="font-black text-white">Understand market language</h3>
              <p className="mt-1 text-zinc-500 leading-7">
                Most trading platforms and communities use these words every day.
              </p>
            </div>
          </div>

          <div className="flex gap-5">
            <div className="h-10 w-10 shrink-0 rounded-full bg-cyan-500/15 text-cyan-300 flex items-center justify-center font-black">3</div>
            <div>
              <h3 className="font-black text-white">Build trading confidence</h3>
              <p className="mt-1 text-zinc-500 leading-7">
                The more terms you understand, the easier it becomes to make informed decisions.
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="flex flex-col overflow-hidden rounded-[28px] border border-cyan-500/10 bg-black">
        <img
          src={
            termsSlide === -1
              ? "/learn/terms/trading-terms-basics.png"
              : [
    "/learn/terms/spread.png",
  "/learn/terms/liquidity.png",
  "/learn/terms/market-cap.png",
  "/learn/terms/common-trading-words.png",
                ][termsSlide]
          }
          alt="Essential Trading Terms"
          className="block w-full h-[625px] object-fill bg-white"
        />

        <div className="flex items-center justify-between border-t border-white/10 bg-[#050816] px-6 py-4">
          <button
            onClick={() =>
              setTermsSlide((prev) => (prev === -1 ? 3 : prev - 1))
            }
            className="rounded-2xl border border-white/10 bg-[#0b1120] px-5 py-3 font-bold text-white transition-all duration-300 hover:border-cyan-400 hover:text-cyan-300"
          >
            ← Previous
          </button>

          <div className="flex items-center gap-3">
            {[-1, 0, 1, 2, 3, ].map((dot) => (
              <button
                key={dot}
                onClick={() => setTermsSlide(dot)}
                className={`h-3 w-3 rounded-full transition-all duration-300 ${
                  termsSlide === dot
                    ? "bg-cyan-400 scale-125"
                    : "bg-zinc-600 hover:bg-zinc-400"
                }`}
              />
            ))}
          </div>

          <button
            onClick={() =>
              setTermsSlide((prev) => (prev === 3 ? -1 : prev + 1))
            }
            className="rounded-2xl border border-white/10 bg-[#0b1120] px-5 py-3 font-bold text-white transition-all duration-300 hover:border-cyan-400 hover:text-cyan-300"
          >
            Next →
          </button>
        </div>
      </div>
    </div>

    <div className="mt-8 rounded-[34px] border border-cyan-400/40 bg-gradient-to-r from-[#07111f] via-[#0b1120] to-[#050816] p-5 shadow-[0_0_45px_rgba(34,211,238,0.18)] transition-all duration-500 hover:border-cyan-300 hover:shadow-[0_0_65px_rgba(34,211,238,0.28)]">
      <div className="grid grid-cols-1 lg:grid-cols-[140px_1fr] gap-4 items-center">

        <div className="flex items-center justify-center pl-2">
          <img
            src="/gaby.png"
            alt="Gaby AI"
            className="h-[210px] w-[210px] object-contain drop-shadow-[0_0_45px_rgba(34,211,238,0.35)]"
          />
        </div>

        <div>
          <div className="rounded-2xl border border-cyan-400/30 bg-[#0f172a] p-5">
            {isGabyTyping ? (
              <div className="flex items-center gap-3 pl-4">
                <div className="flex gap-1">
                  <span className="h-2 w-2 animate-bounce rounded-full bg-cyan-400"></span>
                  <span className="h-2 w-2 animate-bounce rounded-full bg-cyan-400 [animation-delay:0.2s]"></span>
                  <span className="h-2 w-2 animate-bounce rounded-full bg-cyan-400 [animation-delay:0.4s]"></span>
                </div>
                <p className="text-cyan-300 font-bold">Gaby is typing...</p>
              </div>
            ) : (
              <p className="border-l-4 border-cyan-400 pl-4 text-zinc-100 leading-8">
                {gabyAnswer}
              </p>
            )}
          </div>

          <div className="mt-4 grid grid-cols-2 lg:grid-cols-3 gap-3">
            {[
              "What is a bid?",
              "What is an ask?",
              "What is a spread?",
              "What is volatility?",
              "What is liquidity?",
              "What is market cap?",
            ].map((question) => (
              <button
                key={question}
                onClick={() => {
                  askGaby(question);
                  setGabyQuestion("");
                }}
                className="rounded-xl border border-cyan-400/20 bg-[#0b1120] px-4 py-3 text-sm font-bold text-white transition-all duration-300 hover:-translate-y-[2px] hover:border-cyan-400 hover:bg-cyan-500/10 hover:text-cyan-300 hover:shadow-[0_0_20px_rgba(34,211,238,0.18)]"
              >
                {question}
              </button>
            ))}
          </div>

          <div className="mt-4 flex gap-3">
            <input
              value={gabyQuestion}
              onChange={(e) => setGabyQuestion(e.target.value)}
              placeholder="Ask Gaby anything about this lesson..."
              className="flex-1 rounded-2xl border border-white/10 bg-[#0f172a] px-5 py-4 text-white outline-none transition-all duration-300 focus:border-cyan-400"
            />

            <button
              onClick={() => askGaby(gabyQuestion)}
              disabled={isGabyTyping}
              className="rounded-2xl bg-cyan-400 px-6 font-black text-black transition-all duration-300 hover:scale-[1.02] disabled:cursor-not-allowed disabled:opacity-50"
            >
              {isGabyTyping ? "Thinking..." : "Ask Gaby"}
            </button>
          </div>
        </div>

      </div>
    </div>
  </div>
)}

{activeLesson === "quiz" && (
  <div className="rounded-[40px] border border-white/10 bg-[#0b0f1a] p-10 shadow-[0_20px_80px_rgba(0,0,0,0.45)]">

    <div>
<h2 className="text-5xl md:text-6xl font-black tracking-tight leading-tight">
  <span className="text-white">TradeNest</span>
  <span className="text-cyan-400">X</span>
  <span className="text-white"> Graduation Challenge</span>
</h2>

<p className="mt-5 text-zinc-400 text-lg leading-8 max-w-3xl">
  Complete the final assessment and prove you're ready for the simulator.
</p>

<div className="mt-6 flex flex-wrap gap-4">
  <div className="rounded-2xl border border-cyan-400/20 bg-cyan-500/10 px-5 py-3">
    <p className="text-cyan-300 font-black">10 Questions</p>
  </div>

  <div className="rounded-2xl border border-emerald-400/20 bg-emerald-500/10 px-5 py-3">
    <p className="text-emerald-300 font-black">Pass Score: 80%</p>
  </div>

  <div className="rounded-2xl border border-yellow-400/20 bg-yellow-500/10 px-5 py-3">
    <p className="text-yellow-300 font-black">Required: 8 / 10</p>
  </div>
</div>
    </div>

    <div className="mt-8 space-y-6">
      {checkpointQuestions.map((item, index) => (
        <div
          key={index}
          className="rounded-[28px] border border-white/10 bg-[#111827] p-6"
        >
          <p className="text-cyan-300 font-black">
            Question {index + 1}
          </p>

          <h3 className="mt-3 text-2xl font-black text-white">
            {item.question}
          </h3>

          <div className="mt-5 grid grid-cols-1 md:grid-cols-2 gap-3">
            {item.options.map((option, optionIndex) => (
              <button
                key={option}
                onClick={() =>
                  setQuizAnswers({
                    ...quizAnswers,
                    [index]: option,
                  })
                }
                className={`rounded-2xl border px-5 py-4 text-left font-bold transition-all duration-300 ${
                  quizAnswers[index] === option
                    ? "border-cyan-400 bg-cyan-500/10 text-cyan-300"
                    : "border-white/10 bg-[#0b1120] text-zinc-300 hover:border-cyan-400/40 hover:text-white"
                }`}
              >
                <>
  <span className="mr-3 font-black text-cyan-300">
    {["A", "B", "C", "D"][optionIndex]}.
  </span>
  {option}
</>
              </button>
            ))}
          </div>
        </div>
      ))}
    </div>
{quizError && (
  <div className="mt-8 rounded-2xl border border-orange-400/30 bg-orange-500/10 p-5">
    <div className="flex items-center gap-3">
      <div className="flex h-10 w-10 items-center justify-center rounded-full bg-orange-500/20 text-orange-300 font-black">
        !
      </div>

      <div>
        <p className="font-black text-orange-300">
          Checkpoint Cooldown Active
        </p>

        <p className="text-zinc-300 mt-1">
          {quizError}
        </p>
      </div>
    </div>
  </div>
)}
    <div className="mt-8 flex flex-wrap gap-4">
      <button
onClick={() => {
  if (cooldownActive && nextAttemptTime) {
    if (Date.now() < nextAttemptTime) {
      setQuizError(
        "You recently completed the checkpoint. Please review your lessons and try again in 30 minutes."
      );
      return;
    }

    setCooldownActive(false);
  }

  if (Object.keys(quizAnswers).length < checkpointQuestions.length) {
    setQuizError(
      `Please answer all ${
        checkpointQuestions.length
      } questions before submitting. You still have ${
        checkpointQuestions.length - Object.keys(quizAnswers).length
      } remaining.`
    );
    return;
  }

  const score = checkpointQuestions.reduce((total, item, index) => {
    return quizAnswers[index] === item.answer ? total + 1 : total;
  }, 0);

  const nextTime = Date.now() + 30 * 60 * 1000;

  setCooldownActive(true);
  setNextAttemptTime(nextTime);

  localStorage.setItem(
    "tradenestxQuizCooldown",
    nextTime.toString()
  );

setQuizError("");
setQuizScore(score);
setQuizSubmitted(true);
setSubmittedAnswers(quizAnswers);

setQuizAnswers({});
}}
        className="rounded-2xl bg-cyan-400 px-8 py-4 font-black text-black transition-all duration-300 hover:scale-[1.02]"
      >
        Submit Checkpoint
      </button>

   
    </div>

    {quizSubmitted && (
      <div className="mt-8 rounded-[34px] border border-cyan-400/40 bg-gradient-to-r from-[#07111f] via-[#0b1120] to-[#050816] p-8 shadow-[0_0_45px_rgba(34,211,238,0.18)]">
        <p className="text-cyan-300 font-black text-lg">
          Your Score
        </p>

<h3 className="mt-3 text-6xl font-black text-white">
  {quizScore} / {checkpointQuestions.length}
</h3>

<p className="mt-2 text-cyan-300 text-xl font-black">
  {Math.round(
    (quizScore / checkpointQuestions.length) * 100
  )}%
</p>

{quizScore < 8 && checkpointQuestions
  .map((item, index) => ({
    ...item,
    index,
    userAnswer: submittedAnswers[index],
  }))
  .filter((item) => item.userAnswer !== item.answer)
  .length > 0 && (
  <div className="mt-6 rounded-2xl border border-orange-400/30 bg-orange-500/10 p-5">
    <p className="text-orange-300 font-black text-lg">
      Lessons To Review
    </p>

    <div className="mt-4 space-y-3">
      {checkpointQuestions
        .map((item, index) => ({
          ...item,
          index,
          userAnswer: submittedAnswers[index],
        }))
        .filter((item) => item.userAnswer !== item.answer)
        .map((item) => (
          <div key={item.index} className="text-zinc-300">
            Question {item.index + 1}: Review{" "}
            <span className="font-black text-white">
              {item.reviewLesson}
            </span>
          </div>
        ))}
    </div>
  </div>
)}

        {quizScore >= 8 ? (
          <>
            <p className="mt-5 text-2xl font-black text-emerald-300">
              Congratulations! You completed the TradeNestX Beginner Academy.
            </p>

            <p className="mt-3 text-zinc-400 leading-8 max-w-3xl">
              You now understand the foundation of trading. Before entering the simulator, complete the TradeNestX Simulator Guide to learn every tool, panel, and feature available on the platform.
            </p>

<button
  onClick={() => setActiveLesson("simulator-guide")}
  className="mt-6 inline-flex rounded-2xl bg-cyan-400 px-8 py-4 font-black text-black transition-all duration-300 hover:scale-[1.02]"
>
  Go To Simulator Guide
</button>
          </>
        ) : (
          <>
            <p className="mt-5 text-2xl font-black text-orange-300">
              Keep practicing. Review the beginner lessons and try again.
            </p>

            <p className="mt-3 text-zinc-400 leading-8 max-w-3xl">
              A strong trader builds confidence through repetition. Go back through the lessons you missed and retake the checkpoint.
            </p>
          </>
        )}
      </div>
    )}

  </div>
)}


{activeLesson === "practice" && (
<div className="mt-14 bg-gradient-to-r from-cyan-500/10 to-blue-500/10 rounded-[28px] border border-cyan-500/20 p-10 text-center">
  <h2 className="text-5xl font-black text-cyan-300">
    TradeNestX Simulator Guide
  </h2>

  <p className="mt-6 text-xl text-zinc-300 leading-9 max-w-4xl mx-auto">
    Now that you understand the basics of trading, candlestick patterns, risk management, trends, and technical analysis, the next step is practicing in the simulator.
  </p>

  <p className="mt-6 text-lg text-zinc-400 leading-8 max-w-4xl mx-auto">
    TradeNestX allows beginners to practice trading strategies, manage risk, and learn market behavior without using real money.
  </p>

  <div className="mt-10">
    <Link
      href="/simulator"
      className="inline-flex items-center justify-center rounded-2xl bg-cyan-500 px-10 py-5 text-xl font-black text-black transition-all duration-300 ease-out hover:-translate-y-[4px] hover:-translate-y-[4px] hover:-translate-y-[4px] hover:scale-[1.02] hover:bg-cyan-400"
    >
      Start Practicing On The Simulator
    </Link>
  </div>
</div>
)}
{activeLesson === "account" && (
<div className="mt-14 bg-[#131722] rounded-[32px] shadow-[0_10px_40px_rgba(0,0,0,0.35)] p-8 border border-white/5">

  <h2 className="text-4xl md:text-5xl font-black tracking-tight leading-tight text-white">
    Going Live
  </h2>

  <p className="text-zinc-500 text-lg mt-4 leading-8 max-w-4xl">
    Trading with real money feels very different from paper trading. Beginners should transition slowly and focus on consistency instead of fast profits.
  </p>

  <div className="mt-10 grid md:grid-cols-2 xl:grid-cols-4 gap-6">

    {[
      {
        id: "small",
        title: "Start Small",
        color: "text-green-400",
        text: "Use small position sizes while learning.",
      },
      {
        id: "emotion",
        title: "Real Emotions",
        color: "text-red-400",
        text: "Real money creates fear and greed.",
      },
      {
        id: "expectations",
        title: "Realistic Expectations",
        color: "text-cyan-400",
        text: "Consistency matters more than fast profits.",
      },
      {
        id: "discipline",
        title: "Discipline",
        color: "text-orange-400",
        text: "Avoid revenge trading and overtrading.",
      },
    ].map((item) => (
      <button
        key={item.id}
        onClick={() => setSelectedLiveTopic(item.id)}
        className={`text-left rounded-[28px] border bg-[#18181b] p-7 transition-all duration-300 hover:-translate-y-[4px] ${
          selectedLiveTopic === item.id
            ? "border-cyan-400 bg-cyan-500/10 shadow-[0_0_30px_rgba(34,211,238,0.12)]"
            : "border-white/5 hover:border-cyan-400/30"
        }`}
      >
        <h3 className={`text-2xl font-black ${item.color}`}>
          {item.title}
        </h3>

        <p className="mt-4 text-zinc-300 leading-7">
          {item.text}
        </p>
      </button>
    ))}

  </div>

  <div className="mt-10 rounded-[32px] border border-cyan-500/20 bg-gradient-to-br from-cyan-500/10 via-[#111827] to-[#0f172a] p-8">

    {selectedLiveTopic === "small" && (
      <div className="grid lg:grid-cols-2 gap-8 items-center">

        <div>

          <h3 className="text-3xl font-black text-white">
            Start With Small Risk
          </h3>

          <p className="mt-4 text-zinc-300 text-[17px] leading-8">
            New traders should begin with very small position sizes while adjusting to real market emotions and execution.
          </p>

          <div className="mt-6 space-y-3 text-zinc-400">
            <p>• Protect your capital first</p>
            <p>• Focus on consistency</p>
            <p>• Build confidence slowly</p>
            <p>• Avoid oversized trades</p>
          </div>

        </div>

        <div className="rounded-[28px] border border-green-500/20 bg-[#050816] p-6">

          <div className="grid grid-cols-3 gap-4 h-56">

            <div className="rounded-2xl bg-green-500/10 border border-green-400/20 flex items-center justify-center text-green-400 text-2xl font-black">
              1%
            </div>

            <div className="rounded-2xl bg-orange-500/10 border border-orange-400/20 flex items-center justify-center text-orange-400 text-2xl font-black">
              2%
            </div>

            <div className="rounded-2xl bg-red-500/10 border border-red-400/20 flex items-center justify-center text-red-400 text-2xl font-black">
              10%
            </div>

          </div>

          <p className="mt-4 text-center text-zinc-400 font-bold">
            Smaller risk improves survival
          </p>

        </div>

      </div>
    )}

    {selectedLiveTopic === "emotion" && (
      <div className="grid lg:grid-cols-2 gap-8 items-center">

        <div>

          <h3 className="text-3xl font-black text-white">
            Real Money Changes Emotions
          </h3>

          <p className="mt-4 text-zinc-300 text-[17px] leading-8">
            Fear and greed become much stronger when real money is involved. Emotional control is critical.
          </p>

          <div className="mt-6 space-y-3 text-zinc-400">
            <p>• Fear causes hesitation</p>
            <p>• Greed increases risk</p>
            <p>• Emotional trading creates mistakes</p>
            <p>• Discipline matters more than excitement</p>
          </div>

        </div>

        <div className="rounded-[28px] border border-red-500/20 bg-[#050816] p-6">

          <div className="grid gap-4 h-56">

            <div className="rounded-2xl bg-red-500/10 border border-red-400/20 flex items-center justify-center text-red-400 text-2xl font-black">
              FEAR
            </div>

            <div className="rounded-2xl bg-orange-500/10 border border-orange-400/20 flex items-center justify-center text-orange-400 text-2xl font-black">
              GREED
            </div>

          </div>

        </div>

      </div>
    )}

    {selectedLiveTopic === "expectations" && (
      <div className="grid lg:grid-cols-2 gap-8 items-center">

        <div>

          <h3 className="text-3xl font-black text-white">
            Keep Realistic Expectations
          </h3>

          <p className="mt-4 text-zinc-300 text-[17px] leading-8">
            Trading is a skill that takes time to develop. Beginners should focus on improving decision making instead of chasing fast profits.
          </p>

          <div className="mt-6 space-y-3 text-zinc-400">
            <p>• Consistency matters most</p>
            <p>• Avoid unrealistic profit goals</p>
            <p>• Small progress compounds</p>
            <p>• Long-term survival is the goal</p>
          </div>

        </div>

        <div className="rounded-[28px] border border-cyan-500/20 bg-[#050816] p-6 flex items-center justify-center h-56">

          <div className="text-center">
            <p className="text-cyan-400 text-5xl font-black">
              +1%
            </p>

            <p className="mt-4 text-zinc-400 font-bold">
              Small consistent growth
            </p>
          </div>

        </div>

      </div>
    )}

    {selectedLiveTopic === "discipline" && (
      <div className="grid lg:grid-cols-2 gap-8 items-center">

        <div>

          <h3 className="text-3xl font-black text-white">
            Discipline Protects Traders
          </h3>

          <p className="mt-4 text-zinc-300 text-[17px] leading-8">
            Overtrading, revenge trading, and emotional decisions often destroy beginner accounts.
          </p>

          <div className="mt-6 space-y-3 text-zinc-400">
            <p>• Follow your trade plan</p>
            <p>• Avoid emotional revenge trades</p>
            <p>• Patience improves execution</p>
            <p>• Discipline builds consistency</p>
          </div>

        </div>

        <div className="rounded-[28px] border border-orange-500/20 bg-[#050816] p-6">

          <div className="grid gap-4 h-56">

            <div className="rounded-2xl bg-green-500/10 border border-green-400/20 flex items-center justify-center text-green-400 text-2xl font-black">
              PLAN
            </div>

            <div className="rounded-2xl bg-orange-500/10 border border-orange-400/20 flex items-center justify-center text-orange-400 text-2xl font-black">
              PATIENCE
            </div>

            <div className="rounded-2xl bg-red-500/10 border border-red-400/20 flex items-center justify-center text-red-400 text-2xl font-black">
              REVENGE
            </div>

          </div>

        </div>

      </div>
    )}

  </div>

</div>
)}

</section>



</div>
</div>
</main>



    </>
  );
}