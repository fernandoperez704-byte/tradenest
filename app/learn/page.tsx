"use client";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import {
  collection,
  doc,
  getDoc,
  getDocs,
  query,
  setDoc,
  updateDoc,
  where,
} from "firebase/firestore";
import { db } from "../firebase";
import { useUser } from "@clerk/nextjs";
import Navbar from "../components/Navbar";
import GabyCoach from "../components/GabyCoach";
import GabyIntro from "../components/GabyIntro";
export default function LearnPage() {
  const { user } = useUser();

  const [activeLesson, setActiveLesson] = useState("roadmap");
  const [mobileLearnView, setMobileLearnView] = useState<"LESSONS" | "LESSON">("LESSONS");
  const [completedLessons, setCompletedLessons] = useState<string[]>([]);
  const [lessonCompletionDates, setLessonCompletionDates] = useState<{
  [key: string]: string;
}>({});
  const [progressLoaded, setProgressLoaded] = useState(false);
  const [nextLessonUnlockTime, setNextLessonUnlockTime] = useState<number | null>(null);
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
  async function loadProgress() {
    if (!user) {
  const savedProgress = localStorage.getItem(
    "tradenestxLearnProgress"
  );

  if (savedProgress) {
    setCompletedLessons(JSON.parse(savedProgress));
  }

  const savedDates = localStorage.getItem(
    "tradenestxLessonDates"
  );

  if (savedDates) {
    setLessonCompletionDates(JSON.parse(savedDates));
  }

  setProgressLoaded(true);
  return;
}

    try {
      const progressRef = doc(
        db,
        "lessonProgress",
        user.id
      );

      const progressSnap = await getDoc(progressRef);

if (progressSnap.exists()) {
  const data = progressSnap.data();

  setCompletedLessons(
    data.completedLessons || []
  );

  setLessonCompletionDates(
    data.lessonCompletionDates || {}
  );

  if (data.currentLesson) {
    setActiveLesson(data.currentLesson);
  }
} else {
        const savedProgress = localStorage.getItem(
          "tradenestxLearnProgress"
        );

        if (savedProgress) {
          setCompletedLessons(
            JSON.parse(savedProgress)
          );
        }

        const savedDates = localStorage.getItem(
          "tradenestxLessonDates"
        );

        if (savedDates) {
          setLessonCompletionDates(
            JSON.parse(savedDates)
          );
        }
      }

      setProgressLoaded(true);
    } catch (error) {
      console.error(error);
      setProgressLoaded(true);
    }
  }

  loadProgress();
}, [user]);

useEffect(() => {
  if (!progressLoaded || !user) return;

async function saveProgress() {
  if (!user) return;

  localStorage.setItem(
      "tradenestxLearnProgress",
      JSON.stringify(completedLessons)
    );

    localStorage.setItem(
      "tradenestxLessonDates",
      JSON.stringify(lessonCompletionDates)
    );

    await setDoc(
      doc(db, "lessonProgress", user.id),
{
  userId: user.id,
  userEmail: user.primaryEmailAddress?.emailAddress || "",
  userName: user.firstName || user.username || "TradeNestX Student",
  completedLessons,
  lessonCompletionDates,
  currentLesson: activeLesson,
lastCompletedLesson:
  completedLessons[completedLessons.length - 1] || "",

updatedAt: new Date().toISOString(),
},
{ merge: true }
    );
  }

  saveProgress();
}, [
  completedLessons,
  lessonCompletionDates,
  activeLesson,
  progressLoaded,
  user,
]);

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
  { id: "roadmap", label: "Meet Gaby" },

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


];
const activeLessonIndex = lessons.findIndex(
  (lesson) => lesson.id === activeLesson
);
const academyLessons = lessons.filter(
  (lesson) => lesson.id !== "roadmap"
);

const progressPercent = Math.round(
  (completedLessons.length / academyLessons.length) * 100
);

async function queueDiscordLessonMessage(lessonId: string) {
  if (!user) return;

  const lesson = lessons.find((item) => item.id === lessonId);

  if (!lesson) return;

const progressSnap = await getDoc(
  doc(db, "lessonProgress", user.id)
);

const progressData = progressSnap.exists()
  ? progressSnap.data()
  : null;

const oldQueues = await getDocs(
  query(
    collection(db, "discordLessonQueue"),
    where("userId", "==", user.id)
  )
);

for (const queueDoc of oldQueues.docs) {
  const queueData = queueDoc.data();

  if (
    queueData.status === "sent" ||
    queueData.status === "pending"
  ) {
    await updateDoc(queueDoc.ref, {
      status: "superseded",
      supersededAt: new Date().toISOString(),
    });
  }
}

await setDoc(
  doc(
    db,
    "discordLessonQueue",
    `${user.id}_${lessonId}_${Date.now()}`
  ),
  {
    userId: user.id,
    userEmail: user.primaryEmailAddress?.emailAddress || "",
    userName: user.firstName || user.username || "TradeNestX Student",
    lessonId,
    lessonTitle: lesson.label,
    discordUserId: progressData?.discordUserId || "",
    discordLinked: progressData?.discordLinked || false,
    status: "pending",
    createdAt: new Date().toISOString(),
  }
);
}

function completeLesson() {
  const today = new Date().toDateString();

  if (!completedLessons.includes(activeLesson)) {
    setCompletedLessons((prev) => [
      ...new Set([...prev, activeLesson]),
    ]);

setLessonCompletionDates((prev) => ({
  ...prev,
  [activeLesson]: today,
}));

queueDiscordLessonMessage(activeLesson);

return;
  }

  const nextLesson = lessons[activeLessonIndex + 1];

  if (!nextLesson) return;

  const nextLessonIndex = lessons.findIndex(
    (lesson) => lesson.id === nextLesson.id
  );

  const isDayOneLesson = nextLessonIndex <= 2;

  if (isDayOneLesson) {
    setActiveLesson(nextLesson.id);
    window.scrollTo({ top: 0, behavior: "smooth" });
    document.getElementById("lesson-content")?.scrollTo({
      top: 0,
      behavior: "smooth",
    });
    return;
  }

  const lastCompletedLessonId =
    completedLessons[completedLessons.length - 1];

  const lastCompletedDate =
    lastCompletedLessonId
      ? lessonCompletionDates[lastCompletedLessonId]
      : null;

  const completedToday = lastCompletedDate === today;

  if (completedToday) {
    return;
  }

  setActiveLesson(nextLesson.id);

  window.scrollTo({ top: 0, behavior: "smooth" });
  document.getElementById("lesson-content")?.scrollTo({
    top: 0,
    behavior: "smooth",
  });
}
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
         <aside
  className={`bg-[#111827] border border-zinc-700 rounded-2xl p-4 xl:sticky xl:top-24 max-h-[calc(100vh-120px)] overflow-y-auto scrollbar-hide ${
    mobileLearnView === "LESSONS" ? "block" : "hidden xl:block"
  }`}
>
<div className="mb-4 flex items-center justify-between gap-3">
  <p className="text-sm font-black tracking-wide text-zinc-500">
    LESSONS
  </p>

  {activeLesson !== "roadmap" && (
<p className="shrink-0 rounded-xl border border-cyan-400/20 bg-cyan-500/10 px-3 py-1.5 text-sm font-black text-cyan-300 shadow-[0_0_15px_rgba(34,211,238,0.15)]">
  {completedLessons.length}/{academyLessons.length}
</p>
  )}
</div>
<button
  onClick={async () => {
    localStorage.removeItem("tradenestxLearnProgress");
    localStorage.removeItem("tradenestxLessonDates");

    setCompletedLessons([]);
    setLessonCompletionDates({});

    if (user) {
      await setDoc(
        doc(db, "lessonProgress", user.id),
{
  completedLessons: [],
  lessonCompletionDates: {},
  currentLesson: "roadmap",
  lastCompletedLesson: "",

updatedAt: new Date().toISOString(),
},
{ merge: true }
      );
    }
  }}
  className="mb-4 w-full rounded-xl border border-red-400/20 bg-red-500/10 px-3 py-2 text-xs font-black text-red-300 transition-all duration-300 hover:bg-red-500/20"
>
  Reset Progress
</button>

  <div className="space-y-2">
{lessons.map((lesson, index) => {
  const isCompleted = completedLessons.includes(lesson.id);

const today = new Date().toDateString();

const lastCompletedLessonId =
  completedLessons[completedLessons.length - 1];

const lastCompletedDate =
  lastCompletedLessonId
    ? lessonCompletionDates[lastCompletedLessonId]
    : null;

const completedToday = lastCompletedDate === today;

const isDayOneLesson = index <= 2;

const isNextLesson =
  index === completedLessons.length + 1;

const isUnlocked =
  lesson.id === "roadmap" ||
  isDayOneLesson ||
  isCompleted ||
  (isNextLesson && !completedToday);

  return (
    <button
      key={lesson.id}
onClick={() => {
  if (!isUnlocked) return;

  setActiveLesson(lesson.id);

  if (window.innerWidth < 1280) {
    setMobileLearnView("LESSON");
  }
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
    : isUnlocked
  ? "border-white/5 bg-[#0f172a] text-zinc-400 hover:border-cyan-400/30 hover:bg-[#131c2b] hover:text-cyan-300"
  : "cursor-not-allowed border-white/5 bg-[#0b0f1a] text-zinc-600 opacity-60"
}`}
      >
<div className="flex items-center justify-between gap-2">
  <span className="leading-5">
    {lesson.label}
  </span>

{isCompleted ? (
  <span className="shrink-0 text-emerald-400 font-black">
    ✓
  </span>
) : !isUnlocked ? (
<span className="shrink-0 text-[10px] font-black uppercase tracking-wide text-zinc-500">
  Tomorrow
</span>
) : null}
</div>
      </button>
  );
})}
  </div>
</aside>

<section
  id="lesson-content"
  className={`min-w-0 max-h-[calc(100vh-120px)] overflow-y-auto pr-2 scrollbar-hide ${
    mobileLearnView === "LESSON" ? "block" : "hidden xl:block"
  }`}
>
  
<button
  onClick={() => setMobileLearnView("LESSONS")}
  className="mb-4 block rounded-xl border border-cyan-400/30 bg-cyan-500/10 px-4 py-3 text-sm font-black text-cyan-300 xl:hidden"
>
  ← Back to Lessons
</button>

      {activeLesson === "roadmap" && (
  <GabyIntro
    onStartLesson={() => {
      setActiveLesson("buying");

      setTimeout(() => {
        document.getElementById("lesson-content")?.scrollTo({
          top: 0,
          behavior: "auto",
        });

        window.scrollTo({
          top: 0,
          behavior: "auto",
        });
      }, 0);
    }}
  />
)}

{activeLesson === "buying" && (
  <div className="rounded-[40px] border border-white/10 bg-[#0b0f1a] p-10 shadow-[0_20px_80px_rgba(0,0,0,0.45)]">
    <div className="grid grid-cols-1 lg:grid-cols-[300px_minmax(0,1fr)] gap-8 items-start">
<div>
  <p className="mt-5 text-white text-[17px] leading-8 max-w-[300px]">
    Every trader starts by asking the same question:
    what am I actually buying?
  </p>

  <p className="mt-5 text-white text-[17px] leading-8 max-w-[300px]">
    Before learning charts, indicators, or trading strategies, you need
    to understand the assets that make up the financial markets.
  </p>

  <p className="mt-5 text-white text-[17px] leading-8 max-w-[300px]">
    Stocks, crypto, forex, and futures all move for different reasons.
    Understanding those differences will help you make better decisions
    as you continue through TradeNestX.
  </p>

  <div className="mt-8 rounded-2xl border border-cyan-500/20 bg-cyan-500/5 p-5">
    <p className="text-sm font-black uppercase tracking-wider text-cyan-300">
      Why This Matters
    </p>

    <p className="mt-3 text-white leading-7">
      Many beginners focus on price before understanding the asset itself.
      The more you understand what you're buying, the easier it becomes to
      manage risk, build confidence, and avoid costly mistakes.
    </p>
  </div>
</div>

<div className="flex flex-col overflow-hidden rounded-[28px] border border-cyan-500/10 bg-black">
<Image
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
  width={1200}
  height={800}
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
<GabyCoach
  gabyQuestion={gabyQuestion}
  setGabyQuestion={setGabyQuestion}
  gabyAnswer={gabyAnswer}
  isGabyTyping={isGabyTyping}
  askGaby={askGaby}
  questions={[
    "What is a stock?",
    "Why do prices move?",
    "What is crypto?",
    "What should beginners focus on?",
  ]}
/>
<div className="mt-6 flex justify-end">
  <button
onClick={completeLesson}
    className={`group rounded-xl border px-6 py-3 font-black transition-all duration-300 hover:-translate-y-1 ${
      completedLessons.includes(activeLesson)
        ? "border-emerald-400/30 bg-emerald-500/10 text-emerald-300 hover:border-emerald-300 hover:bg-emerald-500/20"
        : "border-cyan-400/30 bg-cyan-500/10 text-cyan-300 hover:border-cyan-300 hover:bg-cyan-500/20 hover:text-white"
    }`}
  >
{completedLessons.includes(activeLesson)
  ? activeLessonIndex < 2
    ? "✓ Lesson Complete • Next Lesson →"
    : "✓ Lesson Complete • Practice In Simulator"
  : "✓ Mark Lesson Complete"}
  </button>
</div>
    </div>
  
)}


{activeLesson === "market" && (
  <div className="rounded-[40px] border border-white/10 bg-[#0b0f1a] p-10 shadow-[0_20px_80px_rgba(0,0,0,0.45)]">

    <div className="grid grid-cols-1 lg:grid-cols-[300px_minmax(0,1fr)] gap-8 items-start">

<div>
  <p className="mt-5 text-white text-[17px] leading-8 max-w-[300px]">
    Now that you understand what you're buying, it's time to understand
    why prices move.
  </p>

  <p className="mt-5 text-white text-[17px] leading-8 max-w-[300px]">
    Every market is driven by buyers and sellers competing for price.
    When demand becomes stronger than supply, prices can rise. When
    selling pressure takes over, prices can fall.
  </p>

  <p className="mt-5 text-white text-[17px] leading-8 max-w-[300px]">
    Understanding this concept will help you make sense of charts,
    trends, volatility, and market behavior throughout your trading
    journey.
  </p>

  <div className="mt-8 rounded-2xl border border-cyan-500/20 bg-cyan-500/5 p-5">
    <p className="text-sm font-black uppercase tracking-wider text-cyan-300">
      Why This Matters
    </p>

    <p className="mt-3 text-white leading-7">
      Many beginners think markets move randomly. In reality, every price
      movement is the result of buyers and sellers reacting to opportunity,
      risk, and information.
    </p>
  </div>
</div>

      <div className="flex flex-col overflow-hidden rounded-[28px] border border-cyan-500/10 bg-black">

<Image
  src={
    marketLessonSlide === -1
      ? "/learn/market/how-market-works.webp"
      : [
          "/learn/market/buyers.webp",
          "/learn/market/sellers.webp",
          "/learn/market/buyers-vs-sellers.webp",
          "/learn/market/supply.webp",
          "/learn/market/demand.webp",
          "/learn/market/supply-vs-demand.webp",
          "/learn/market/volatility.webp",
        ][marketLessonSlide]
  }
  alt="Market lesson"
  width={1200}
  height={800}
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

<GabyCoach
  gabyQuestion={gabyQuestion}
  setGabyQuestion={setGabyQuestion}
  gabyAnswer={gabyAnswer}
  isGabyTyping={isGabyTyping}
  askGaby={askGaby}
  questions={[
    "Why do prices move?",
    "What is volatility?",
    "What is supply and demand?",
    "Why do markets panic?",
  ]}
/>
<div className="mt-6 flex justify-end">
  <button
onClick={completeLesson}
    className={`group rounded-xl border px-6 py-3 font-black transition-all duration-300 hover:-translate-y-1 ${
      completedLessons.includes(activeLesson)
        ? "border-emerald-400/30 bg-emerald-500/10 text-emerald-300 hover:border-emerald-300 hover:bg-emerald-500/20"
        : "border-cyan-400/30 bg-cyan-500/10 text-cyan-300 hover:border-cyan-300 hover:bg-cyan-500/20 hover:text-white"
    }`}
  >
{completedLessons.includes(activeLesson)
  ? activeLessonIndex < 2
    ? "✓ Lesson Complete • Next Lesson →"
    : "✓ Lesson Complete • Practice In Simulator"
  : "✓ Mark Lesson Complete"}
  </button>
</div>
  </div>
)}

{activeLesson === "orders" && (
  <div className="rounded-[40px] border border-white/10 bg-[#0b0f1a] p-10 shadow-[0_20px_80px_rgba(0,0,0,0.45)]">

    <div className="grid grid-cols-1 lg:grid-cols-[300px_minmax(0,1fr)] gap-8 items-start">

<div>
  <p className="mt-5 text-white text-[17px] leading-8 max-w-[300px]">
    You now understand what you're buying and why prices move.
    The next step is learning how traders actually enter and exit the market.
  </p>

  <p className="mt-5 text-white text-[17px] leading-8 max-w-[300px]">
    Every trade begins with an order. The type of order you choose can
    affect your entry price, execution speed, and overall trade quality.
  </p>

  <p className="mt-5 text-white text-[17px] leading-8 max-w-[300px]">
    Market and limit orders are the most common tools traders use to
    enter positions. Learning when to use each one gives you more control
    over your trades.
  </p>

  <div className="mt-8 rounded-2xl border border-cyan-500/20 bg-cyan-500/5 p-5">
    <p className="text-sm font-black uppercase tracking-wider text-cyan-300">
      Why This Matters
    </p>

    <p className="mt-3 text-white leading-7">
      Many beginners focus on finding a trade. Experienced traders also
      focus on execution because the way you enter a trade can impact both
      risk and results.
    </p>
  </div>
</div>
      <div className="flex flex-col overflow-hidden rounded-[28px] border border-cyan-500/10 bg-black">

<Image
  src={[
    "/learn/orders/market-order.webp",
    "/learn/orders/limit-order.webp",
    "/learn/orders/market-vs-limit.webp",
    "/learn/orders/speed-vs-precision.webp",
  ][marketSlide]}
  alt="Orders lesson"
  width={1200}
  height={800}
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

<GabyCoach
  gabyQuestion={gabyQuestion}
  setGabyQuestion={setGabyQuestion}
  gabyAnswer={gabyAnswer}
  isGabyTyping={isGabyTyping}
  askGaby={askGaby}
  questions={[
    "What is a market order?",
    "What is a limit order?",
    "Which order is safer?",
    "Why do traders use limit orders?",
  ]}
/>
<div className="mt-6 flex justify-end">
  <button
onClick={completeLesson}
    className={`group rounded-xl border px-6 py-3 font-black transition-all duration-300 hover:-translate-y-1 ${
      completedLessons.includes(activeLesson)
        ? "border-emerald-400/30 bg-emerald-500/10 text-emerald-300 hover:border-emerald-300 hover:bg-emerald-500/20"
        : "border-cyan-400/30 bg-cyan-500/10 text-cyan-300 hover:border-cyan-300 hover:bg-cyan-500/20 hover:text-white"
    }`}
  >
{completedLessons.includes(activeLesson)
  ? activeLessonIndex < 2
    ? "✓ Lesson Complete • Next Lesson →"
    : "✓ Lesson Complete • Practice In Simulator"
  : "✓ Mark Lesson Complete"}
  </button>
</div>
  </div>
)}

{activeLesson === "risk" && (
  <div className="rounded-[40px] border border-white/10 bg-[#0b0f1a] p-10 shadow-[0_20px_80px_rgba(0,0,0,0.45)]">
    <div className="grid grid-cols-1 lg:grid-cols-[300px_minmax(0,1fr)] gap-8 items-start">
<div>
  <p className="mt-5 text-white text-[17px] leading-8 max-w-[300px]">
    You now know what you're buying, why markets move, and how traders
    enter positions.
  </p>

  <p className="mt-5 text-white text-[17px] leading-8 max-w-[300px]">
    Before focusing on profits, it's important to learn how traders
    protect themselves from unnecessary losses. Every trade carries risk,
    and managing that risk is what keeps traders in the game.
  </p>

  <p className="mt-5 text-white text-[17px] leading-8 max-w-[300px]">
    In this lesson, you'll learn why protecting your capital is more
    important than chasing quick gains and why discipline matters more
    than any strategy.
  </p>

  <div className="mt-8 rounded-2xl border border-cyan-500/20 bg-cyan-500/5 p-5">
    <p className="text-sm font-black uppercase tracking-wider text-cyan-300">
      Why This Matters
    </p>

    <p className="mt-3 text-white leading-7">
      Most traders don't fail because they can't find opportunities.
      They fail because they risk too much. Protecting your capital allows
      you to learn, improve, and take advantage of future opportunities.
    </p>
  </div>
</div>
      <div className="flex flex-col overflow-hidden rounded-[28px] border border-cyan-500/10 bg-black">
        <Image
          src={
            riskLessonSlide === -1
              ? "/learn/risk/protecting-your-capital.webp"
              : [
                  "/learn/risk/small-risk-vs-big-risk.webp",
                  "/learn/risk/stop-loss-protection.webp",
                  "/learn/risk/revenge-trading.webp",
                  "/learn/risk/risk-to-reward.webp",
                  "/learn/risk/overtrading-warning.webp",
                  "/learn/risk/protecting-capital-pyramid.webp",
                  "/learn/risk/one-bad-trade.webp",
                  "/learn/risk/demo-first.webp",
                ][riskLessonSlide]
          }
          alt="Protecting Your Capital"
          width={1200}
          height={800}
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

    <GabyCoach
      gabyQuestion={gabyQuestion}
      setGabyQuestion={setGabyQuestion}
      gabyAnswer={gabyAnswer}
      isGabyTyping={isGabyTyping}
      askGaby={askGaby}
      questions={[
        "What is risk management?",
        "Why do traders use stop losses?",
        "What is revenge trading?",
        "Why is protecting capital important?",
      ]}
    />
    <div className="mt-6 flex justify-end">
  <button
onClick={completeLesson}
    className={`group rounded-xl border px-6 py-3 font-black transition-all duration-300 hover:-translate-y-1 ${
      completedLessons.includes(activeLesson)
        ? "border-emerald-400/30 bg-emerald-500/10 text-emerald-300 hover:border-emerald-300 hover:bg-emerald-500/20"
        : "border-cyan-400/30 bg-cyan-500/10 text-cyan-300 hover:border-cyan-300 hover:bg-cyan-500/20 hover:text-white"
    }`}
  >
{completedLessons.includes(activeLesson)
  ? activeLessonIndex < 2
    ? "✓ Lesson Complete • Next Lesson →"
    : "✓ Lesson Complete • Practice In Simulator"
  : "✓ Mark Lesson Complete"}
  </button>
</div>
  </div>
)}

{activeLesson === "timeframes" && (
  <div className="rounded-[40px] border border-white/10 bg-[#0b0f1a] p-10 shadow-[0_20px_80px_rgba(0,0,0,0.45)]">
    <div className="grid grid-cols-1 lg:grid-cols-[300px_minmax(0,1fr)] gap-8 items-start">

<div>
  <p className="mt-5 text-white text-[17px] leading-8 max-w-[300px]">
    You now know how to read individual candlesticks. The next step is
    understanding how those candles look across different timeframes.
  </p>

  <p className="mt-5 text-white text-[17px] leading-8 max-w-[300px]">
    A 1-minute chart and a daily chart can show very different views of
    the same market. Traders use timeframes to match their strategy,
    risk tolerance, and trading goals.
  </p>

  <p className="mt-5 text-white text-[17px] leading-8 max-w-[300px]">
    Learning how timeframes work will help you avoid tunnel vision and
    better understand the bigger picture behind market movements.
  </p>

  <div className="mt-8 rounded-2xl border border-cyan-500/20 bg-cyan-500/5 p-5">
    <p className="text-sm font-black uppercase tracking-wider text-cyan-300">
      Why This Matters
    </p>

    <p className="mt-3 text-white leading-7">
      Many beginners focus on a single chart and miss important context.
      Understanding multiple timeframes helps traders make more informed
      decisions and identify stronger trends.
    </p>
  </div>
</div>

      <div className="flex flex-col overflow-hidden rounded-[28px] border border-cyan-500/10 bg-black">
<Image
  src={
    timeframeSlide === -1
      ? "/learn/timeframes/trading-timeframes.webp"
      : [
          "/learn/timeframes/1m-vs-1h.webp",
          "/learn/timeframes/scalping-vs-swing.webp",
          "/learn/timeframes/market-noise.webp",
          "/learn/timeframes/higher-timeframe-trend.webp",
          "/learn/timeframes/lower-timeframe-stress.webp",
          "/learn/timeframes/multi-timeframe-analysis.webp",
          "/learn/timeframes/timeframe-ladder.webp",
        ][timeframeSlide]
  }
  alt="Trading Timeframes"
  width={1200}
  height={800}
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
<GabyCoach
  gabyQuestion={gabyQuestion}
  setGabyQuestion={setGabyQuestion}
  gabyAnswer={gabyAnswer}
  isGabyTyping={isGabyTyping}
  askGaby={askGaby}
  questions={[
    "What is a timeframe?",
    "Why do timeframes matter?",
    "Which timeframe is best for beginners?",
    "Why do lower timeframes feel stressful?",
  ]}
/>
<div className="mt-6 flex justify-end">
  <button
onClick={completeLesson}
    className={`group rounded-xl border px-6 py-3 font-black transition-all duration-300 hover:-translate-y-1 ${
      completedLessons.includes(activeLesson)
        ? "border-emerald-400/30 bg-emerald-500/10 text-emerald-300 hover:border-emerald-300 hover:bg-emerald-500/20"
        : "border-cyan-400/30 bg-cyan-500/10 text-cyan-300 hover:border-cyan-300 hover:bg-cyan-500/20 hover:text-white"
    }`}
  >
{completedLessons.includes(activeLesson)
  ? activeLessonIndex < 2
    ? "✓ Lesson Complete • Next Lesson →"
    : "✓ Lesson Complete • Practice In Simulator"
  : "✓ Mark Lesson Complete"}
  </button>
</div>
  </div>
)}
{activeLesson === "candlesticks" && (
  <div className="rounded-[40px] border border-white/10 bg-[#0b0f1a] p-10 shadow-[0_20px_80px_rgba(0,0,0,0.45)]">
    <div className="grid grid-cols-1 lg:grid-cols-[300px_minmax(0,1fr)] gap-8 items-start">

<div>
  <p className="mt-5 text-white text-[17px] leading-8 max-w-[300px]">
    Now that you understand risk management, it's time to start reading
    the language of the market.
  </p>

  <p className="mt-5 text-white text-[17px] leading-8 max-w-[300px]">
    Every chart is made up of candlesticks. Each candle tells a story
    about what buyers and sellers were doing during a specific period of time.
  </p>

  <p className="mt-5 text-white text-[17px] leading-8 max-w-[300px]">
    Learning how to read candlesticks is one of the first steps toward
    understanding price action and making informed trading decisions.
  </p>

  <div className="mt-8 rounded-2xl border border-cyan-500/20 bg-cyan-500/5 p-5">
    <p className="text-sm font-black uppercase tracking-wider text-cyan-300">
      Why This Matters
    </p>

    <p className="mt-3 text-white leading-7">
      Before traders can identify trends, patterns, or setups, they must
      first understand what individual candles are communicating about
      market behavior.
    </p>
  </div>
</div>

      <div className="flex flex-col overflow-hidden rounded-[28px] border border-cyan-500/10 bg-black">

<Image
  src={
    candlestickSlide === -1
      ? "/learn/candlesticks/candlestick-basics.webp"
      : [
          "/learn/candlesticks/bullish-vs-bearish-candle.webp",
          "/learn/candlesticks/big-body-vs-small-body.webp",
          "/learn/candlesticks/long-wick-rejection.webp",
          "/learn/candlesticks/common-candlesticks.webp",
          "/learn/candlesticks/candles-tell-a-story.webp",
        ][candlestickSlide]
  }
  alt="Candlestick Basics"
  width={1200}
  height={800}
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
<GabyCoach
  gabyQuestion={gabyQuestion}
  setGabyQuestion={setGabyQuestion}
  gabyAnswer={gabyAnswer}
  isGabyTyping={isGabyTyping}
  askGaby={askGaby}
  questions={[
    "What is a candlestick?",
    "What is a bullish candle?",
    "What is a bearish candle?",
    "What does a long wick mean?",
  ]}
/>
<div className="mt-6 flex justify-end">
  <button
onClick={completeLesson}
    className={`group rounded-xl border px-6 py-3 font-black transition-all duration-300 hover:-translate-y-1 ${
      completedLessons.includes(activeLesson)
        ? "border-emerald-400/30 bg-emerald-500/10 text-emerald-300 hover:border-emerald-300 hover:bg-emerald-500/20"
        : "border-cyan-400/30 bg-cyan-500/10 text-cyan-300 hover:border-cyan-300 hover:bg-cyan-500/20 hover:text-white"
    }`}
  >
{completedLessons.includes(activeLesson)
  ? activeLessonIndex < 2
    ? "✓ Lesson Complete • Next Lesson →"
    : "✓ Lesson Complete • Practice In Simulator"
  : "✓ Mark Lesson Complete"}
  </button>
</div>

  </div>
)}

{activeLesson === "volume" && (
  <div className="rounded-[40px] border border-white/10 bg-[#0b0f1a] p-10 shadow-[0_20px_80px_rgba(0,0,0,0.45)]">
    <div className="grid grid-cols-1 lg:grid-cols-[300px_minmax(0,1fr)] gap-8 items-start">

<div>
  <p className="mt-5 text-white text-[17px] leading-8 max-w-[300px]">
    You now understand candlesticks and timeframes. The next question is:
    how much participation is behind a price move?
  </p>

  <p className="mt-5 text-white text-[17px] leading-8 max-w-[300px]">
    Volume measures how active the market is during a specific period.
    It helps traders understand whether buyers and sellers are truly
    supporting a move or if momentum may be weakening.
  </p>

  <p className="mt-5 text-white text-[17px] leading-8 max-w-[300px]">
    By combining price action with volume, traders gain a deeper view of
    market strength and can better evaluate potential opportunities.
  </p>

  <div className="mt-8 rounded-2xl border border-cyan-500/20 bg-cyan-500/5 p-5">
    <p className="text-sm font-black uppercase tracking-wider text-cyan-300">
      Why This Matters
    </p>

    <p className="mt-3 text-white leading-7">
      Price tells you what the market is doing. Volume helps explain how
      much conviction is behind that move. Together they provide a clearer
      picture than either one alone.
    </p>
  </div>
</div>

      <div className="flex flex-col overflow-hidden rounded-[28px] border border-cyan-500/10 bg-black">
  <Image
  src={
    volumeSlide === -1
      ? "/learn/volume/volume-basics.webp"
      : [
          "/learn/volume/high-vs-low-volume.webp",
          "/learn/volume/volume-confirms-move.webp",
          "/learn/volume/volume-breakout.webp",
          "/learn/volume/volume-spike.webp",
          "/learn/volume/volume-and-candlesticks.webp",
        ][volumeSlide]
  }
  alt="Volume Basics"
  width={1200}
  height={800}
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
<GabyCoach
  gabyQuestion={gabyQuestion}
  setGabyQuestion={setGabyQuestion}
  gabyAnswer={gabyAnswer}
  isGabyTyping={isGabyTyping}
  askGaby={askGaby}
  questions={[
    "What is volume?",
    "Why does volume matter?",
    "What is high volume?",
    "What is low volume?",
  ]}
/>
<div className="mt-6 flex justify-end">
  <button
onClick={completeLesson}
    className={`group rounded-xl border px-6 py-3 font-black transition-all duration-300 hover:-translate-y-1 ${
      completedLessons.includes(activeLesson)
        ? "border-emerald-400/30 bg-emerald-500/10 text-emerald-300 hover:border-emerald-300 hover:bg-emerald-500/20"
        : "border-cyan-400/30 bg-cyan-500/10 text-cyan-300 hover:border-cyan-300 hover:bg-cyan-500/20 hover:text-white"
    }`}
  >
{completedLessons.includes(activeLesson)
  ? activeLessonIndex < 2
    ? "✓ Lesson Complete • Next Lesson →"
    : "✓ Lesson Complete • Practice In Simulator"
  : "✓ Mark Lesson Complete"}
  </button>
</div>

  </div>
)}

{activeLesson === "support" && (
  <div className="rounded-[40px] border border-white/10 bg-[#0b0f1a] p-10 shadow-[0_20px_80px_rgba(0,0,0,0.45)]">
    <div className="grid grid-cols-1 lg:grid-cols-[300px_minmax(0,1fr)] gap-8 items-start">

<div>
  <p className="mt-5 text-white text-[17px] leading-8 max-w-[300px]">
    You can now read candles, understand timeframes, and evaluate volume.
    The next step is learning where buyers and sellers have historically
    taken action.
  </p>

  <p className="mt-5 text-white text-[17px] leading-8 max-w-[300px]">
    Support and resistance are areas where price has previously reacted.
    These zones often become important decision points for traders looking
    for entries, exits, and potential reversals.
  </p>

  <p className="mt-5 text-white text-[17px] leading-8 max-w-[300px]">
    Learning to identify these levels will help you understand market
    structure and where risk and opportunity may exist.
  </p>

  <div className="mt-8 rounded-2xl border border-cyan-500/20 bg-cyan-500/5 p-5">
    <p className="text-sm font-black uppercase tracking-wider text-cyan-300">
      Why This Matters
    </p>

    <p className="mt-3 text-white leading-7">
      Markets rarely move randomly. Important support and resistance levels
      often influence trader decisions and can become key areas to watch
      when planning a trade.
    </p>
  </div>
</div>

      <div className="flex flex-col overflow-hidden rounded-[28px] border border-cyan-500/10 bg-black">
<Image
  src={
    supportSlide === -1
      ? "/learn/support/support-resistance-basics.webp"
      : [
          "/learn/support/support-floor.webp",
          "/learn/support/resistance-ceiling.webp",
          "/learn/support/support-breakdown.webp",
          "/learn/support/resistance-breakout.webp",
          "/learn/support/role-reversal.webp",
        ][supportSlide]
  }
  alt="Support and Resistance"
  width={1200}
  height={800}
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
<GabyCoach
  gabyQuestion={gabyQuestion}
  setGabyQuestion={setGabyQuestion}
  gabyAnswer={gabyAnswer}
  isGabyTyping={isGabyTyping}
  askGaby={askGaby}
  questions={[
    "What is support?",
    "What is resistance?",
    "Why do support and resistance matter?",
    "What is a breakout?",
  ]}
/>
 <div className="mt-6 flex justify-end">
  <button
onClick={completeLesson}
    className={`group rounded-xl border px-6 py-3 font-black transition-all duration-300 hover:-translate-y-1 ${
      completedLessons.includes(activeLesson)
        ? "border-emerald-400/30 bg-emerald-500/10 text-emerald-300 hover:border-emerald-300 hover:bg-emerald-500/20"
        : "border-cyan-400/30 bg-cyan-500/10 text-cyan-300 hover:border-cyan-300 hover:bg-cyan-500/20 hover:text-white"
    }`}
  >
{completedLessons.includes(activeLesson)
  ? activeLessonIndex < 2
    ? "✓ Lesson Complete • Next Lesson →"
    : "✓ Lesson Complete • Practice In Simulator"
  : "✓ Mark Lesson Complete"}
  </button>
</div>
  </div>
)}

{activeLesson === "supplydemand" && (
  <div className="rounded-[40px] border border-white/10 bg-[#0b0f1a] p-10 shadow-[0_20px_80px_rgba(0,0,0,0.45)]">
    <div className="grid grid-cols-1 lg:grid-cols-[300px_minmax(0,1fr)] gap-8 items-start">

<div>
  <p className="mt-5 text-white text-[17px] leading-8 max-w-[300px]">
    Support and resistance help identify important price levels. The next
    step is understanding why those levels exist in the first place.
  </p>

  <p className="mt-5 text-white text-[17px] leading-8 max-w-[300px]">
    Supply and demand zones form when large groups of buyers or sellers
    enter the market. These areas can influence future price movement and
    often attract trader attention.
  </p>

  <p className="mt-5 text-white text-[17px] leading-8 max-w-[300px]">
    Learning to recognize supply and demand can help you better understand
    where momentum may slow, reverse, or continue.
  </p>

  <div className="mt-8 rounded-2xl border border-cyan-500/20 bg-cyan-500/5 p-5">
    <p className="text-sm font-black uppercase tracking-wider text-cyan-300">
      Why This Matters
    </p>

    <p className="mt-3 text-white leading-7">
      Price reacts because buyers and sellers make decisions. Supply and
      demand help explain the forces behind those reactions and provide
      additional context beyond simple price levels.
    </p>
  </div>
</div>

      <div className="flex flex-col overflow-hidden rounded-[28px] border border-cyan-500/10 bg-black">
<Image
  src={
    supplyDemandSlide === -1
      ? "/learn/supplydemand/supply-demand-basics.webp"
      : [
          "/learn/supplydemand/demand-zone.webp",
          "/learn/supplydemand/supply-zone.webp",
          "/learn/supplydemand/price-imbalance.webp",
          "/learn/supplydemand/zone-retest.webp",
          "/learn/supplydemand/supply-demand-vs-support-resistance.webp",
        ][supplyDemandSlide]
  }
  alt="Supply and Demand"
  width={1200}
  height={800}
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
<GabyCoach
  gabyQuestion={gabyQuestion}
  setGabyQuestion={setGabyQuestion}
  gabyAnswer={gabyAnswer}
  isGabyTyping={isGabyTyping}
  askGaby={askGaby}
  questions={[
    "What is supply?",
    "What is demand?",
    "What is a demand zone?",
    "What is a supply zone?",
  ]}
/>
<div className="mt-6 flex justify-end">
  <button
onClick={completeLesson}
    className={`group rounded-xl border px-6 py-3 font-black transition-all duration-300 hover:-translate-y-1 ${
      completedLessons.includes(activeLesson)
        ? "border-emerald-400/30 bg-emerald-500/10 text-emerald-300 hover:border-emerald-300 hover:bg-emerald-500/20"
        : "border-cyan-400/30 bg-cyan-500/10 text-cyan-300 hover:border-cyan-300 hover:bg-cyan-500/20 hover:text-white"
    }`}
  >
{completedLessons.includes(activeLesson)
  ? activeLessonIndex < 2
    ? "✓ Lesson Complete • Next Lesson →"
    : "✓ Lesson Complete • Practice In Simulator"
  : "✓ Mark Lesson Complete"}
  </button>
</div>
  </div>
)}

{activeLesson === "patterns" && (
  <div className="rounded-[40px] border border-white/10 bg-[#0b0f1a] p-10 shadow-[0_20px_80px_rgba(0,0,0,0.45)]">
    <div className="grid grid-cols-1 lg:grid-cols-[300px_minmax(0,1fr)] gap-8 items-start">

<div>
  <p className="mt-5 text-white text-[17px] leading-8 max-w-[300px]">
    You now understand price action, volume, support and resistance, and
    supply and demand. The next step is learning how these pieces can
    combine to create recognizable market patterns.
  </p>

  <p className="mt-5 text-white text-[17px] leading-8 max-w-[300px]">
    Chart patterns are formations created by price movement over time.
    Traders use them to identify potential continuation and reversal
    opportunities within a trend.
  </p>

  <p className="mt-5 text-white text-[17px] leading-8 max-w-[300px]">
    No pattern guarantees a result, but understanding them can help you
    better recognize market behavior and improve trade planning.
  </p>

  <div className="mt-8 rounded-2xl border border-cyan-500/20 bg-cyan-500/5 p-5">
    <p className="text-sm font-black uppercase tracking-wider text-cyan-300">
      Why This Matters
    </p>

    <p className="mt-3 text-white leading-7">
      Patterns help traders organize information. Instead of viewing every
      chart as random movement, traders can identify recurring structures
      that may provide insight into future price behavior.
    </p>
  </div>
</div>

      <div className="flex flex-col overflow-hidden rounded-[28px] border border-cyan-500/10 bg-black">
<Image
  src={
    patternSlide === -1
      ? "/learn/patterns/chart-patterns-basics.webp"
      : [
          "/learn/patterns/double-top.webp",
          "/learn/patterns/double-bottom.webp",
          "/learn/patterns/ascending-triangle.webp",
          "/learn/patterns/descending-triangle.webp",
          "/learn/patterns/head-and-shoulders.webp",
        ][patternSlide]
  }
  alt="Chart Patterns"
  width={1200}
  height={800}
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

<GabyCoach
  gabyQuestion={gabyQuestion}
  setGabyQuestion={setGabyQuestion}
  gabyAnswer={gabyAnswer}
  isGabyTyping={isGabyTyping}
  askGaby={askGaby}
  questions={[
    "What is a chart pattern?",
    "What is a double top?",
    "What is a double bottom?",
    "What is a head and shoulders pattern?",
  ]}
/>
<div className="mt-6 flex justify-end">
  <button
onClick={completeLesson}
    className={`group rounded-xl border px-6 py-3 font-black transition-all duration-300 hover:-translate-y-1 ${
      completedLessons.includes(activeLesson)
        ? "border-emerald-400/30 bg-emerald-500/10 text-emerald-300 hover:border-emerald-300 hover:bg-emerald-500/20"
        : "border-cyan-400/30 bg-cyan-500/10 text-cyan-300 hover:border-cyan-300 hover:bg-cyan-500/20 hover:text-white"
    }`}
  >
{completedLessons.includes(activeLesson)
  ? activeLessonIndex < 2
    ? "✓ Lesson Complete • Next Lesson →"
    : "✓ Lesson Complete • Practice In Simulator"
  : "✓ Mark Lesson Complete"}
  </button>
</div>

  </div>
)}

{activeLesson === "setups" && (
  <div className="rounded-[40px] border border-white/10 bg-[#0b0f1a] p-10 shadow-[0_20px_80px_rgba(0,0,0,0.45)]">
    <div className="grid grid-cols-1 lg:grid-cols-[300px_minmax(0,1fr)] gap-8 items-start">

<div>
  <p className="mt-5 text-white text-[17px] leading-8 max-w-[300px]">
    You now understand how markets move, how to read charts, and how to
    identify important levels and patterns. The next step is putting those
    skills together into a structured trading plan.
  </p>

  <p className="mt-5 text-white text-[17px] leading-8 max-w-[300px]">
    A trade plan gives you a clear reason for entering a trade, managing
    risk, and deciding when to exit. It helps remove emotion and creates
    consistency in your decision making.
  </p>

  <p className="mt-5 text-white text-[17px] leading-8 max-w-[300px]">
    Professional traders don't rely on hope or guesswork. They follow a
    process before risking capital, and that process begins with a plan.
  </p>

  <div className="mt-8 rounded-2xl border border-cyan-500/20 bg-cyan-500/5 p-5">
    <p className="text-sm font-black uppercase tracking-wider text-cyan-300">
      Why This Matters
    </p>

    <p className="mt-3 text-white leading-7">
      A good trade plan helps traders stay disciplined, avoid impulsive
      decisions, and evaluate opportunities using a repeatable process.
    </p>
  </div>
</div>

      <div className="flex flex-col overflow-hidden rounded-[28px] border border-cyan-500/10 bg-black">
<Image
  src={
    tradePlanSlide === -1
      ? "/learn/tradeplan/trade-plan-basics.webp"
      : [
          "/learn/tradeplan/entry-stop-target.webp",
          "/learn/tradeplan/risk-reward.webp",
          "/learn/tradeplan/checklist-before-trade.webp",
          "/learn/tradeplan/common-plan-mistakes.webp",
        ][tradePlanSlide]
  }
  alt="Building A Trade Plan"
  width={1200}
  height={800}
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

<GabyCoach
  gabyQuestion={gabyQuestion}
  setGabyQuestion={setGabyQuestion}
  gabyAnswer={gabyAnswer}
  isGabyTyping={isGabyTyping}
  askGaby={askGaby}
  questions={[
    "What is a trade plan?",
    "Why do traders use trade plans?",
    "What is risk reward?",
    "Why is a checklist important?",
  ]}
/>
<div className="mt-6 flex justify-end">
  <button
onClick={completeLesson}
    className={`group rounded-xl border px-6 py-3 font-black transition-all duration-300 hover:-translate-y-1 ${
      completedLessons.includes(activeLesson)
        ? "border-emerald-400/30 bg-emerald-500/10 text-emerald-300 hover:border-emerald-300 hover:bg-emerald-500/20"
        : "border-cyan-400/30 bg-cyan-500/10 text-cyan-300 hover:border-cyan-300 hover:bg-cyan-500/20 hover:text-white"
    }`}
  >
{completedLessons.includes(activeLesson)
  ? activeLessonIndex < 2
    ? "✓ Lesson Complete • Next Lesson →"
    : "✓ Lesson Complete • Practice In Simulator"
  : "✓ Mark Lesson Complete"}
  </button>
</div>

  </div>
)}

{activeLesson === "psychology" && (
  <div className="rounded-[40px] border border-white/10 bg-[#0b0f1a] p-10 shadow-[0_20px_80px_rgba(0,0,0,0.45)]">
    <div className="grid grid-cols-1 lg:grid-cols-[300px_minmax(0,1fr)] gap-8 items-start">

<div>
  <p className="mt-5 text-white text-[17px] leading-8 max-w-[300px]">
    You now have the tools to build a trade plan, but knowledge alone
    doesn't guarantee success.
  </p>

  <p className="mt-5 text-white text-[17px] leading-8 max-w-[300px]">
    Fear, greed, impatience, and overconfidence can cause traders to
    ignore their plan and make emotional decisions. Managing emotions is
    often harder than learning chart analysis.
  </p>

  <p className="mt-5 text-white text-[17px] leading-8 max-w-[300px]">
    Developing discipline and consistency will help you follow your
    strategy through both winning and losing periods.
  </p>

  <div className="mt-8 rounded-2xl border border-cyan-500/20 bg-cyan-500/5 p-5">
    <p className="text-sm font-black uppercase tracking-wider text-cyan-300">
      Why This Matters
    </p>

    <p className="mt-3 text-white leading-7">
      Many traders know what they should do but struggle to do it
      consistently. Psychology often determines whether a trader follows
      their plan or lets emotions take control.
    </p>
  </div>
</div>
      <div className="flex flex-col overflow-hidden rounded-[28px] border border-cyan-500/10 bg-black">
<Image
  src={
    psychologySlide === -1
      ? "/learn/psychology/psychology-basics.webp"
      : [
          "/learn/psychology/fear-vs-greed.webp",
          "/learn/psychology/fomo-trading.webp",
          "/learn/psychology/patience-in-trading.webp",
          "/learn/psychology/thinking-like-a-professional.webp",
        ][psychologySlide]
  }
  alt="Trading Psychology"
  width={1200}
  height={800}
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

<GabyCoach
  gabyQuestion={gabyQuestion}
  setGabyQuestion={setGabyQuestion}
  gabyAnswer={gabyAnswer}
  isGabyTyping={isGabyTyping}
  askGaby={askGaby}
  questions={[
    "What is trading psychology?",
    "What is fear in trading?",
    "What is greed in trading?",
    "What is FOMO trading?",
    "Why is patience important?",
  ]}
/>
<div className="mt-6 flex justify-end">
  <button
onClick={completeLesson}
    className={`group rounded-xl border px-6 py-3 font-black transition-all duration-300 hover:-translate-y-1 ${
      completedLessons.includes(activeLesson)
        ? "border-emerald-400/30 bg-emerald-500/10 text-emerald-300 hover:border-emerald-300 hover:bg-emerald-500/20"
        : "border-cyan-400/30 bg-cyan-500/10 text-cyan-300 hover:border-cyan-300 hover:bg-cyan-500/20 hover:text-white"
    }`}
  >
{completedLessons.includes(activeLesson)
  ? activeLessonIndex < 2
    ? "✓ Lesson Complete • Next Lesson →"
    : "✓ Lesson Complete • Practice In Simulator"
  : "✓ Mark Lesson Complete"}
  </button>
</div>

  </div>
)}

{activeLesson === "vocabulary" && (
  <div className="rounded-[40px] border border-white/10 bg-[#0b0f1a] p-10 shadow-[0_20px_80px_rgba(0,0,0,0.45)]">
    <div className="grid grid-cols-1 lg:grid-cols-[300px_minmax(0,1fr)] gap-8 items-start">

<div>
  <p className="mt-5 text-white text-[17px] leading-8 max-w-[300px]">
    You've now learned the core foundations of trading. The final step
    before your checkpoint is becoming familiar with the language traders
    use every day.
  </p>

  <p className="mt-5 text-white text-[17px] leading-8 max-w-[300px]">
    Terms like bullish, bearish, support, resistance, leverage, and
    volatility appear constantly in trading discussions. Understanding
    them will help you communicate and learn more effectively.
  </p>

  <p className="mt-5 text-white text-[17px] leading-8 max-w-[300px]">
    Think of this lesson as building your trading vocabulary so you can
    confidently understand educational content, market analysis, and
    conversations with other traders.
  </p>

  <div className="mt-8 rounded-2xl border border-cyan-500/20 bg-cyan-500/5 p-5">
    <p className="text-sm font-black uppercase tracking-wider text-cyan-300">
      Why This Matters
    </p>

    <p className="mt-3 text-white leading-7">
      Every profession has its own language. Learning common trading terms
      makes it easier to understand markets, follow discussions, and
      continue building your knowledge.
    </p>
  </div>
</div>

      <div className="flex flex-col overflow-hidden rounded-[28px] border border-cyan-500/10 bg-black">
<Image
  src={
    termsSlide === -1
      ? "/learn/terms/trading-terms-basics.webp"
      : [
          "/learn/terms/spread.webp",
          "/learn/terms/liquidity.webp",
          "/learn/terms/market-cap.webp",
          "/learn/terms/common-trading-words.webp",
        ][termsSlide]
  }
  alt="Essential Trading Terms"
  width={1200}
  height={800}
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

<GabyCoach
  gabyQuestion={gabyQuestion}
  setGabyQuestion={setGabyQuestion}
  gabyAnswer={gabyAnswer}
  isGabyTyping={isGabyTyping}
  askGaby={askGaby}
  questions={[
    "What is a bid?",
    "What is an ask?",
    "What is a spread?",
    "What is volatility?",
    "What is liquidity?",
    "What is market cap?",
  ]}
/>
<div className="mt-6 flex justify-end">
  <button
onClick={completeLesson}
    className={`group rounded-xl border px-6 py-3 font-black transition-all duration-300 hover:-translate-y-1 ${
      completedLessons.includes(activeLesson)
        ? "border-emerald-400/30 bg-emerald-500/10 text-emerald-300 hover:border-emerald-300 hover:bg-emerald-500/20"
        : "border-cyan-400/30 bg-cyan-500/10 text-cyan-300 hover:border-cyan-300 hover:bg-cyan-500/20 hover:text-white"
    }`}
  >
{completedLessons.includes(activeLesson)
  ? activeLessonIndex < 2
    ? "✓ Lesson Complete • Next Lesson →"
    : "✓ Lesson Complete • Practice In Simulator"
  : "✓ Mark Lesson Complete"}
  </button>
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
    <p className="mt-5 text-3xl font-black text-emerald-300">
      🎓 TradeNestX Beginner Academy Complete
    </p>

    <p className="mt-4 text-zinc-400 leading-8 max-w-3xl">
      Congratulations. You've completed the TradeNestX Beginner Academy and built a foundation in market basics, chart reading, risk management, trading psychology, and simulator practice.
    </p>

    <div className="mt-6 rounded-3xl border border-emerald-400/20 bg-emerald-500/10 p-6">
      <p className="font-black text-emerald-300">
        ✓ Beginner Academy Complete
      </p>

      <p className="mt-2 text-zinc-300">
        You are now ready to continue building experience inside the TradeNestX Simulator.
      </p>
    </div>

    <div className="mt-5 rounded-3xl border border-cyan-400/20 bg-cyan-500/10 p-6">
      <h3 className="text-xl font-black text-cyan-300">
        🚀 Advanced Academy Coming Soon
      </h3>

      <ul className="mt-4 space-y-2 text-zinc-300">
        <li>• Market Structure</li>
        <li>• Trend Analysis</li>
        <li>• Breakouts & Pullbacks</li>
        <li>• Advanced Risk Management</li>
        <li>• Trade Reviews</li>
        <li>• Professional Trading Workflows</li>
      </ul>
    </div>

    <Link
      href="/simulator"
      className="mt-6 inline-flex rounded-2xl bg-cyan-400 px-8 py-4 font-black text-black transition-all duration-300 hover:scale-[1.02]"
    >
      Continue To Simulator →
    </Link>
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

</section>

</div>
</div>
</main>


    </>
  );
}