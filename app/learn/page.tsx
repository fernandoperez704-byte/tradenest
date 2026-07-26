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
  const { user, isLoaded } = useUser();

  const [activeLesson, setActiveLesson] = useState("roadmap");

  const [onboardingCompleted, setOnboardingCompleted] =
  useState(false);

const [learningMode, setLearningMode] = useState<
  "GUIDED" | "FULL_ACCESS" | null
>(null);

  const [mobileLearnView, setMobileLearnView] = useState<"LESSONS" | "LESSON">("LESSONS");
  const [completedLessons, setCompletedLessons] = useState<string[]>([]);

const quizCompleted = completedLessons.includes("quiz");

const isAdvancedUnlocked =
  learningMode === "FULL_ACCESS" ||
  quizCompleted;

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

type GabyMessage = {
  role: "user" | "assistant";
  content: string;
};

const [conversationHistory, setConversationHistory] =
  useState<GabyMessage[]>([]);

useEffect(() => {
  setGabyAnswer("Hi, I’m Gaby. Ask me anything about this lesson.");
  setGabyQuestion("");
  setIsGabyTyping(false);
  setLastQuestion("");
}, []);

useEffect(() => {
  if (!isLoaded) return;

  async function loadProgress() {
    setProgressLoaded(false);

    if (!user) {
      setCompletedLessons([]);
      setLessonCompletionDates({});
      setLearningMode(null);
      setOnboardingCompleted(false);
      setActiveLesson("roadmap");
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

        setOnboardingCompleted(
          data.onboardingCompleted === true
        );

        const savedLearningMode =
          data.learningMode === "PERSONALIZED"
            ? "FULL_ACCESS"
            : data.learningMode;

        if (
          savedLearningMode === "GUIDED" ||
          savedLearningMode === "FULL_ACCESS"
        ) {
          setLearningMode(savedLearningMode);
        } else {
          setLearningMode(null);
        }

        setActiveLesson(
          data.currentLesson || "roadmap"
        );
      } else {
        setCompletedLessons([]);
        setLessonCompletionDates({});
        setLearningMode(null);
        setOnboardingCompleted(false);
        setActiveLesson("roadmap");
      }
    } catch (error) {
      console.error(
        "Failed to load lesson progress:",
        error
      );
    } finally {
      setProgressLoaded(true);
    }
  }

  loadProgress();
}, [isLoaded, user?.id]);

useEffect(() => {
  if (!isLoaded || !progressLoaded || !user) {
    return;
  }

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

onboardingCompleted,
learningMode,

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
  onboardingCompleted,
  learningMode,
  progressLoaded,
  isLoaded,
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
  if (!quizCompleted) return;

  const savedScore = Number(
    localStorage.getItem("tradenestxQuizScore") || "8"
  );

  setQuizScore(savedScore);
  setQuizSubmitted(true);
}, [quizCompleted]);

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

if (completedToday && nextLesson.id !== "quiz") {
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
  const question = (customQuestion || gabyQuestion).trim();

  if (!question || isGabyTyping) return;

  const previousHistory = conversationHistory;

  setIsGabyTyping(true);
  setGabyQuestion("");

  try {
    const response = await fetch("/api/gaby", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
body: JSON.stringify({
  message: question,
  lesson: activeLesson,
  conversationHistory: previousHistory,
}),
    });

    const data = await response.json();

    const answer =
      data.answer || "Gaby is having trouble responding right now.";

    setGabyAnswer(answer);

    setConversationHistory((prev) =>
      [
        ...prev,
        {
          role: "user" as const,
          content: question,
        },
        {
          role: "assistant" as const,
          content: answer,
        },
      ].slice(-10)
    );
  } catch (error) {
    setGabyAnswer(
      "Gaby is having trouble responding right now."
    );
  } finally {
    setIsGabyTyping(false);
  }
}
return (
    <>
      <Navbar />

<main className="page-shell !pt-0 xl:h-[calc(100dvh-78px)] xl:overflow-hidden">
  <div className="mx-auto h-full w-full max-w-[1780px] px-1 xl:px-6">
    <div className="grid h-full min-h-0 grid-cols-1 gap-4 pt-2 xl:grid-cols-[220px_minmax(0,1fr)] xl:overflow-hidden">

<div
  className={`min-h-0 ${
    mobileLearnView === "LESSONS" ? "block" : "hidden xl:block"
  }`}
>
  <aside className="flex h-[calc(100%-12px)] min-h-0 flex-col rounded-2xl border border-zinc-700 bg-[#111827] p-4">

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

<div className="mb-4 grid grid-cols-2 gap-2">

  <Link
    href="/learn"
    className="rounded-xl border border-cyan-400 bg-cyan-400 px-3 py-2 text-center text-xs font-black text-black"
  >
    Basic
  </Link>

<Link
  href={isAdvancedUnlocked ? "/learn/advanced" : "#"}
  onClick={(event) => {
    if (!isAdvancedUnlocked) {
      event.preventDefault();
    }
  }}
  className={`rounded-xl border px-3 py-2 text-center text-xs font-black transition-all ${
    isAdvancedUnlocked
      ? "border-white/10 bg-[#0f172a] text-zinc-300 hover:border-cyan-400 hover:text-cyan-300"
      : "cursor-not-allowed border-white/5 bg-[#0b0f1a] text-zinc-600"
  }`}
>
  Advanced
</Link>

</div>

{process.env.NODE_ENV === "development" && (
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
)}

<div className="min-h-0 flex-1 overflow-y-auto pr-1 scrollbar-hide">
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

const vocabularyCompleted =
  completedLessons.includes("vocabulary");

const hasSelectedLearningPath =
  onboardingCompleted &&
  learningMode !== null;

const hasFullAcademyAccess =
  hasSelectedLearningPath &&
  learningMode === "FULL_ACCESS";

const isUnlocked =
  lesson.id === "roadmap" ||
  (
    hasSelectedLearningPath &&
    (
      hasFullAcademyAccess ||
      isDayOneLesson ||
      isCompleted ||
      (lesson.id === "quiz" && vocabularyCompleted) ||
      (isNextLesson && !completedToday)
    )
  );

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
  setConversationHistory([]);
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
) : learningMode === "GUIDED" && !isUnlocked ? (
  <span className="shrink-0 text-[10px] font-black uppercase tracking-wide text-zinc-500">
    Tomorrow
  </span>
) : null}
</div>
      </button>
  );
    })}
  </div>
</div>
</aside>
</div>

<section
  id="lesson-content"
  className={`min-h-0 min-w-0 overflow-y-auto px-3 pb-6 xl:px-0 xl:pr-2 scrollbar-hide ${
    mobileLearnView === "LESSON" ? "block" : "hidden xl:block"
  }`}
>
  
<button
  onClick={() => setMobileLearnView("LESSONS")}
  className="mb-4 block rounded-xl border border-cyan-400/30 bg-cyan-500/10 px-4 py-3 text-sm font-black text-cyan-300 xl:hidden"
>
  ← Back to Lessons
</button>

{activeLesson === "roadmap" && !progressLoaded && (
  <div className="flex min-h-[500px] items-center justify-center rounded-[24px] border border-white/10 bg-[#0b0f1a]">
    <p className="text-sm font-black uppercase tracking-wider text-cyan-300">
      Loading your learning path...
    </p>
  </div>
)}

{activeLesson === "roadmap" && progressLoaded && (
  <GabyIntro
  learningMode={learningMode}
  onboardingCompleted={onboardingCompleted}
  onStartLesson={() => {
    setLearningMode("GUIDED");
    setOnboardingCompleted(true);
    setActiveLesson("buying");

    setTimeout(() => {
      document
        .getElementById("lesson-content")
        ?.scrollTo({
          top: 0,
          behavior: "auto",
        });

      window.scrollTo({
        top: 0,
        behavior: "auto",
      });
    }, 0);
  }}

  onUnlockAllLessons={() => {
    setLearningMode("FULL_ACCESS");
    setOnboardingCompleted(true);
    setActiveLesson("buying");

    setTimeout(() => {
      document
        .getElementById("lesson-content")
        ?.scrollTo({
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
  <div className="rounded-[24px] md:rounded-[40px] border border-white/10 bg-[#0b0f1a] p-3 md:p-4 shadow-[0_20px_80px_rgba(0,0,0,0.45)]">
    <div className="grid grid-cols-1 items-start gap-4 lg:grid-cols-[340px_minmax(0,1fr)]">
<div>
  <p className="mt-5 text-white text-[17px] leading-8 max-w-full xl:max-w-[300px]">
    Every trader starts by asking the same question:
    what am I actually buying?
  </p>

  <p className="mt-5 text-white text-[17px] leading-8 max-w-full xl:max-w-[300px]">
    Before learning charts, indicators, or trading strategies, you need
    to understand the assets that make up the financial markets.
  </p>

  <p className="mt-5 text-white text-[17px] leading-8 max-w-full xl:max-w-[300px]">
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
  <div className="rounded-[24px] md:rounded-[40px] border border-white/10 bg-[#0b0f1a] p-3 md:p-4 shadow-[0_20px_80px_rgba(0,0,0,0.45)]">

    <div className="grid grid-cols-1 items-start gap-4 lg:grid-cols-[340px_minmax(0,1fr)]">

<div>
  <p className="mt-5 text-white text-[17px] leading-8 max-w-full xl:max-w-[300px]">
    Now that you understand what you're buying, it's time to understand
    why prices move.
  </p>

  <p className="mt-5 text-white text-[17px] leading-8 max-w-full xl:max-w-[300px]">
    Every market is driven by buyers and sellers competing for price.
    When demand becomes stronger than supply, prices can rise. When
    selling pressure takes over, prices can fall.
  </p>

  <p className="mt-5 text-white text-[17px] leading-8 max-w-full xl:max-w-[300px]">
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
  className="block w-full h-auto md:h-[625px] object-contain md:object-fill bg-white"
/>

<div className="flex items-center justify-between gap-2 border-t border-white/10 bg-[#050816] px-2 md:px-6 py-4">

  <button
    onClick={() =>
      setMarketLessonSlide((prev) => (prev === -1 ? 6 : prev - 1))
    }
    className="rounded-2xl border border-white/10 bg-[#0b1120] px-3 py-3 text-xs md:px-5 md:text-base font-bold text-white transition-all duration-300 hover:border-cyan-400 hover:text-cyan-300"
  >
    ← Previous
  </button>

  <div className="flex items-center gap-1 md:gap-3">

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
    className="rounded-2xl border border-white/10 bg-[#0b1120] px-3 py-3 text-xs md:px-5 md:text-base font-bold text-white transition-all duration-300 hover:border-cyan-400 hover:text-cyan-300"
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
  <div className="rounded-[24px] md:rounded-[40px] border border-white/10 bg-[#0b0f1a] p-3 md:p-4 shadow-[0_20px_80px_rgba(0,0,0,0.45)]">

    <div className="grid grid-cols-1 items-start gap-4 lg:grid-cols-[340px_minmax(0,1fr)]">

<div>
  <p className="mt-5 text-white text-[17px] leading-8 max-w-full xl:max-w-[300px]">
    You now understand what you're buying and why prices move.
    The next step is learning how traders actually enter and exit the market.
  </p>

  <p className="mt-5 text-white text-[17px] leading-8 max-w-full xl:max-w-[300px]">
    Every trade begins with an order. The type of order you choose can
    affect your entry price, execution speed, and overall trade quality.
  </p>

  <p className="mt-5 text-white text-[17px] leading-8 max-w-full xl:max-w-[300px]">
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
  className="block w-full h-auto md:h-[625px] object-contain md:object-fill bg-white"
/>

<div className="flex items-center justify-between gap-2 border-t border-white/10 bg-[#050816] px-2 md:px-6 py-4">

  <button
    onClick={() =>
      setMarketSlide((prev) => (prev === 0 ? 3 : prev - 1))
    }
    className="rounded-2xl border border-white/10 bg-[#0b1120] px-3 py-3 text-xs md:px-5 md:text-base font-bold text-white transition-all duration-300 hover:border-cyan-400 hover:text-cyan-300"
  >
    ← Previous
  </button>

  <div className="flex items-center gap-1 md:gap-3">

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
    className="rounded-2xl border border-white/10 bg-[#0b1120] px-3 py-3 text-xs md:px-5 md:text-base font-bold text-white transition-all duration-300 hover:border-cyan-400 hover:text-cyan-300"
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
  <div className="rounded-[24px] md:rounded-[40px] border border-white/10 bg-[#0b0f1a] p-3 md:p-4 shadow-[0_20px_80px_rgba(0,0,0,0.45)]">
    <div className="grid grid-cols-1 items-start gap-4 lg:grid-cols-[340px_minmax(0,1fr)]">
<div>
  <p className="mt-5 text-white text-[17px] leading-8 max-w-full xl:max-w-[300px]">
    You now know what you're buying, why markets move, and how traders
    enter positions.
  </p>

  <p className="mt-5 text-white text-[17px] leading-8 max-w-full xl:max-w-[300px]">
    Before focusing on profits, it's important to learn how traders
    protect themselves from unnecessary losses. Every trade carries risk,
    and managing that risk is what keeps traders in the game.
  </p>

  <p className="mt-5 text-white text-[17px] leading-8 max-w-full xl:max-w-[300px]">
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
          className="block w-full h-auto md:h-[625px] object-contain md:object-fill bg-white"
        />

        <div className="flex items-center justify-between gap-2 border-t border-white/10 bg-[#050816] px-2 md:px-6 py-4">
          <button
            onClick={() =>
              setRiskLessonSlide((prev) => (prev === -1 ? 7 : prev - 1))
            }
            className="rounded-2xl border border-white/10 bg-[#0b1120] px-3 py-3 text-xs md:px-5 md:text-base font-bold text-white transition-all duration-300 hover:border-cyan-400 hover:text-cyan-300"
          >
            ← Previous
          </button>

          <div className="flex items-center gap-1 md:gap-3">
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
            className="rounded-2xl border border-white/10 bg-[#0b1120] px-3 py-3 text-xs md:px-5 md:text-base font-bold text-white transition-all duration-300 hover:border-cyan-400 hover:text-cyan-300"
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
  <div className="rounded-[24px] md:rounded-[40px] border border-white/10 bg-[#0b0f1a] p-3 md:p-4 shadow-[0_20px_80px_rgba(0,0,0,0.45)]">
    <div className="grid grid-cols-1 items-start gap-4 lg:grid-cols-[340px_minmax(0,1fr)]">

<div>
  <p className="mt-5 text-white text-[17px] leading-8 max-w-full xl:max-w-[300px]">
    You now know how to read individual candlesticks. The next step is
    understanding how those candles look across different timeframes.
  </p>

  <p className="mt-5 text-white text-[17px] leading-8 max-w-full xl:max-w-[300px]">
    A 1-minute chart and a daily chart can show very different views of
    the same market. Traders use timeframes to match their strategy,
    risk tolerance, and trading goals.
  </p>

  <p className="mt-5 text-white text-[17px] leading-8 max-w-full xl:max-w-[300px]">
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
  className="block w-full h-auto md:h-[625px] object-contain md:object-fill bg-white"
/>

        <div className="flex items-center justify-between gap-2 border-t border-white/10 bg-[#050816] px-2 md:px-6 py-4">

          <button
            onClick={() =>
              setTimeframeSlide((prev) => (prev === -1 ? 6 : prev - 1))
            }
            className="rounded-2xl border border-white/10 bg-[#0b1120] px-3 py-3 text-xs md:px-5 md:text-base font-bold text-white transition-all duration-300 hover:border-cyan-400 hover:text-cyan-300"
          >
            ← Previous
          </button>

          <div className="flex items-center gap-1 md:gap-3">
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
            className="rounded-2xl border border-white/10 bg-[#0b1120] px-3 py-3 text-xs md:px-5 md:text-base font-bold text-white transition-all duration-300 hover:border-cyan-400 hover:text-cyan-300"
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
  <div className="rounded-[24px] md:rounded-[40px] border border-white/10 bg-[#0b0f1a] p-3 md:p-4 shadow-[0_20px_80px_rgba(0,0,0,0.45)]">
    <div className="grid grid-cols-1 items-start gap-4 lg:grid-cols-[340px_minmax(0,1fr)]">

<div>
  <p className="mt-5 text-white text-[17px] leading-8 max-w-full xl:max-w-[300px]">
    Now that you understand risk management, it's time to start reading
    the language of the market.
  </p>

  <p className="mt-5 text-white text-[17px] leading-8 max-w-full xl:max-w-[300px]">
    Every chart is made up of candlesticks. Each candle tells a story
    about what buyers and sellers were doing during a specific period of time.
  </p>

  <p className="mt-5 text-white text-[17px] leading-8 max-w-full xl:max-w-[300px]">
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
  className="block w-full h-auto md:h-[625px] object-contain md:object-fill bg-white"
/>

        <div className="flex items-center justify-between gap-2 border-t border-white/10 bg-[#050816] px-2 md:px-6 py-4">
          <button
            onClick={() =>
              setCandlestickSlide((prev) => (prev === -1 ? 4 : prev - 1))
            }
            className="rounded-2xl border border-white/10 bg-[#0b1120] px-3 py-3 text-xs md:px-5 md:text-base font-bold text-white transition-all duration-300 hover:border-cyan-400 hover:text-cyan-300"
          >
            ← Previous
          </button>

          <div className="flex items-center gap-1 md:gap-3">
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
            className="rounded-2xl border border-white/10 bg-[#0b1120] px-3 py-3 text-xs md:px-5 md:text-base font-bold text-white transition-all duration-300 hover:border-cyan-400 hover:text-cyan-300"
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
  <div className="rounded-[24px] md:rounded-[40px] border border-white/10 bg-[#0b0f1a] p-3 md:p-4 shadow-[0_20px_80px_rgba(0,0,0,0.45)]">
    <div className="grid grid-cols-1 items-start gap-4 lg:grid-cols-[340px_minmax(0,1fr)]">

<div>
  <p className="mt-5 text-white text-[17px] leading-8 max-w-full xl:max-w-[300px]">
    You now understand candlesticks and timeframes. The next question is:
    how much participation is behind a price move?
  </p>

  <p className="mt-5 text-white text-[17px] leading-8 max-w-full xl:max-w-[300px]">
    Volume measures how active the market is during a specific period.
    It helps traders understand whether buyers and sellers are truly
    supporting a move or if momentum may be weakening.
  </p>

  <p className="mt-5 text-white text-[17px] leading-8 max-w-full xl:max-w-[300px]">
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
  className="block w-full h-auto md:h-[625px] object-contain md:object-fill bg-white"
/>

        <div className="flex items-center justify-between gap-2 border-t border-white/10 bg-[#050816] px-2 md:px-6 py-4">
          <button
            onClick={() =>
              setVolumeSlide((prev) => (prev === -1 ? 4 : prev - 1))
            }
            className="rounded-2xl border border-white/10 bg-[#0b1120] px-3 py-3 text-xs md:px-5 md:text-base font-bold text-white transition-all duration-300 hover:border-cyan-400 hover:text-cyan-300"
          >
            ← Previous
          </button>

          <div className="flex items-center gap-1 md:gap-3">
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
            className="rounded-2xl border border-white/10 bg-[#0b1120] px-3 py-3 text-xs md:px-5 md:text-base font-bold text-white transition-all duration-300 hover:border-cyan-400 hover:text-cyan-300"
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
  <div className="rounded-[24px] md:rounded-[40px] border border-white/10 bg-[#0b0f1a] p-3 md:p-4 shadow-[0_20px_80px_rgba(0,0,0,0.45)]">
    <div className="grid grid-cols-1 items-start gap-4 lg:grid-cols-[340px_minmax(0,1fr)]">

<div>
  <p className="mt-5 text-white text-[17px] leading-8 max-w-full xl:max-w-[300px]">
    You can now read candles, understand timeframes, and evaluate volume.
    The next step is learning where buyers and sellers have historically
    taken action.
  </p>

  <p className="mt-5 text-white text-[17px] leading-8 max-w-full xl:max-w-[300px]">
    Support and resistance are areas where price has previously reacted.
    These zones often become important decision points for traders looking
    for entries, exits, and potential reversals.
  </p>

  <p className="mt-5 text-white text-[17px] leading-8 max-w-full xl:max-w-[300px]">
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
  className="block w-full h-auto md:h-[625px] object-contain md:object-fill bg-white"
/>

        <div className="flex items-center justify-between gap-2 border-t border-white/10 bg-[#050816] px-2 md:px-6 py-4">
          <button
            onClick={() =>
              setSupportSlide((prev) => (prev === -1 ? 4 : prev - 1))
            }
            className="rounded-2xl border border-white/10 bg-[#0b1120] px-3 py-3 text-xs md:px-5 md:text-base font-bold text-white transition-all duration-300 hover:border-cyan-400 hover:text-cyan-300"
          >
            ← Previous
          </button>

          <div className="flex items-center gap-1 md:gap-3">
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
            className="rounded-2xl border border-white/10 bg-[#0b1120] px-3 py-3 text-xs md:px-5 md:text-base font-bold text-white transition-all duration-300 hover:border-cyan-400 hover:text-cyan-300"
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
  <div className="rounded-[24px] md:rounded-[40px] border border-white/10 bg-[#0b0f1a] p-3 md:p-4 shadow-[0_20px_80px_rgba(0,0,0,0.45)]">
    <div className="grid grid-cols-1 items-start gap-4 lg:grid-cols-[340px_minmax(0,1fr)]">

<div>
  <p className="mt-5 text-white text-[17px] leading-8 max-w-full xl:max-w-[300px]">
    Support and resistance help identify important price levels. The next
    step is understanding why those levels exist in the first place.
  </p>

  <p className="mt-5 text-white text-[17px] leading-8 max-w-full xl:max-w-[300px]">
    Supply and demand zones form when large groups of buyers or sellers
    enter the market. These areas can influence future price movement and
    often attract trader attention.
  </p>

  <p className="mt-5 text-white text-[17px] leading-8 max-w-full xl:max-w-[300px]">
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
  className="block w-full h-auto md:h-[625px] object-contain md:object-fill bg-white"
/>

        <div className="flex items-center justify-between gap-2 border-t border-white/10 bg-[#050816] px-2 md:px-6 py-4">
          <button
            onClick={() =>
              setSupplyDemandSlide((prev) => (prev === -1 ? 4 : prev - 1))
            }
            className="rounded-2xl border border-white/10 bg-[#0b1120] px-3 py-3 text-xs md:px-5 md:text-base font-bold text-white transition-all duration-300 hover:border-cyan-400 hover:text-cyan-300"
          >
            ← Previous
          </button>

          <div className="flex items-center gap-1 md:gap-3">
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
            className="rounded-2xl border border-white/10 bg-[#0b1120] px-3 py-3 text-xs md:px-5 md:text-base font-bold text-white transition-all duration-300 hover:border-cyan-400 hover:text-cyan-300"
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
  <div className="rounded-[24px] md:rounded-[40px] border border-white/10 bg-[#0b0f1a] p-3 md:p-4 shadow-[0_20px_80px_rgba(0,0,0,0.45)]">
    <div className="grid grid-cols-1 items-start gap-4 lg:grid-cols-[340px_minmax(0,1fr)]">

<div>
  <p className="mt-5 text-white text-[17px] leading-8 max-w-full xl:max-w-[300px]">
    You now understand price action, volume, support and resistance, and
    supply and demand. The next step is learning how these pieces can
    combine to create recognizable market patterns.
  </p>

  <p className="mt-5 text-white text-[17px] leading-8 max-w-full xl:max-w-[300px]">
    Chart patterns are formations created by price movement over time.
    Traders use them to identify potential continuation and reversal
    opportunities within a trend.
  </p>

  <p className="mt-5 text-white text-[17px] leading-8 max-w-full xl:max-w-[300px]">
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
  className="block w-full h-auto md:h-[625px] object-contain md:object-fill bg-white"
/>

        <div className="flex items-center justify-between gap-2 border-t border-white/10 bg-[#050816] px-2 md:px-6 py-4">
          <button
            onClick={() =>
              setPatternSlide((prev) => (prev === -1 ? 4 : prev - 1))
            }
            className="rounded-2xl border border-white/10 bg-[#0b1120] px-3 py-3 text-xs md:px-5 md:text-base font-bold text-white transition-all duration-300 hover:border-cyan-400 hover:text-cyan-300"
          >
            ← Previous
          </button>

          <div className="flex items-center gap-1 md:gap-3">
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
            className="rounded-2xl border border-white/10 bg-[#0b1120] px-3 py-3 text-xs md:px-5 md:text-base font-bold text-white transition-all duration-300 hover:border-cyan-400 hover:text-cyan-300"
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
  <div className="rounded-[24px] md:rounded-[40px] border border-white/10 bg-[#0b0f1a] p-3 md:p-4 shadow-[0_20px_80px_rgba(0,0,0,0.45)]">
    <div className="grid grid-cols-1 items-start gap-4 lg:grid-cols-[340px_minmax(0,1fr)]">

<div>
  <p className="mt-5 text-white text-[17px] leading-8 max-w-full xl:max-w-[300px]">
    You now understand how markets move, how to read charts, and how to
    identify important levels and patterns. The next step is putting those
    skills together into a structured trading plan.
  </p>

  <p className="mt-5 text-white text-[17px] leading-8 max-w-full xl:max-w-[300px]">
    A trade plan gives you a clear reason for entering a trade, managing
    risk, and deciding when to exit. It helps remove emotion and creates
    consistency in your decision making.
  </p>

  <p className="mt-5 text-white text-[17px] leading-8 max-w-full xl:max-w-[300px]">
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
  className="block w-full h-auto md:h-[625px] object-contain md:object-fill bg-white"
/>

        <div className="flex items-center justify-between gap-2 border-t border-white/10 bg-[#050816] px-2 md:px-6 py-4">
          <button
            onClick={() =>
              setTradePlanSlide((prev) => (prev === -1 ? 3 : prev - 1))
            }
            className="rounded-2xl border border-white/10 bg-[#0b1120] px-3 py-3 text-xs md:px-5 md:text-base font-bold text-white transition-all duration-300 hover:border-cyan-400 hover:text-cyan-300"
          >
            ← Previous
          </button>

          <div className="flex items-center gap-1 md:gap-3">
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
            className="rounded-2xl border border-white/10 bg-[#0b1120] px-3 py-3 text-xs md:px-5 md:text-base font-bold text-white transition-all duration-300 hover:border-cyan-400 hover:text-cyan-300"
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
  <div className="rounded-[24px] md:rounded-[40px] border border-white/10 bg-[#0b0f1a] p-3 md:p-4 shadow-[0_20px_80px_rgba(0,0,0,0.45)]">
    <div className="grid grid-cols-1 items-start gap-4 lg:grid-cols-[340px_minmax(0,1fr)]">

<div>
  <p className="mt-5 text-white text-[17px] leading-8 max-w-full xl:max-w-[300px]">
    You now have the tools to build a trade plan, but knowledge alone
    doesn't guarantee success.
  </p>

  <p className="mt-5 text-white text-[17px] leading-8 max-w-full xl:max-w-[300px]">
    Fear, greed, impatience, and overconfidence can cause traders to
    ignore their plan and make emotional decisions. Managing emotions is
    often harder than learning chart analysis.
  </p>

  <p className="mt-5 text-white text-[17px] leading-8 max-w-full xl:max-w-[300px]">
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
  className="block w-full h-auto md:h-[625px] object-contain md:object-fill bg-white"
/>

        <div className="flex items-center justify-between gap-2 border-t border-white/10 bg-[#050816] px-2 md:px-6 py-4">
          <button
            onClick={() =>
              setPsychologySlide((prev) => (prev === -1 ? 3 : prev - 1))
            }
            className="rounded-2xl border border-white/10 bg-[#0b1120] px-3 py-3 text-xs md:px-5 md:text-base font-bold text-white transition-all duration-300 hover:border-cyan-400 hover:text-cyan-300"
          >
            ← Previous
          </button>

          <div className="flex items-center gap-1 md:gap-3">
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
            className="rounded-2xl border border-white/10 bg-[#0b1120] px-3 py-3 text-xs md:px-5 md:text-base font-bold text-white transition-all duration-300 hover:border-cyan-400 hover:text-cyan-300"
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
  <div className="rounded-[24px] md:rounded-[40px] border border-white/10 bg-[#0b0f1a] p-3 md:p-4 shadow-[0_20px_80px_rgba(0,0,0,0.45)]">
    <div className="grid grid-cols-1 items-start gap-4 lg:grid-cols-[340px_minmax(0,1fr)]">

<div>
  <p className="mt-5 text-white text-[17px] leading-8 max-w-full xl:max-w-[300px]">
    You've now learned the core foundations of trading. The final step
    before your checkpoint is becoming familiar with the language traders
    use every day.
  </p>

  <p className="mt-5 text-white text-[17px] leading-8 max-w-full xl:max-w-[300px]">
    Terms like bullish, bearish, support, resistance, leverage, and
    volatility appear constantly in trading discussions. Understanding
    them will help you communicate and learn more effectively.
  </p>

  <p className="mt-5 text-white text-[17px] leading-8 max-w-full xl:max-w-[300px]">
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
  className="block w-full h-auto md:h-[625px] object-contain md:object-fill bg-white"
/>

        <div className="flex items-center justify-between gap-2 border-t border-white/10 bg-[#050816] px-2 md:px-6 py-4">
          <button
            onClick={() =>
              setTermsSlide((prev) => (prev === -1 ? 3 : prev - 1))
            }
            className="rounded-2xl border border-white/10 bg-[#0b1120] px-3 py-3 text-xs md:px-5 md:text-base font-bold text-white transition-all duration-300 hover:border-cyan-400 hover:text-cyan-300"
          >
            ← Previous
          </button>

          <div className="flex items-center gap-1 md:gap-3">
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
            className="rounded-2xl border border-white/10 bg-[#0b1120] px-3 py-3 text-xs md:px-5 md:text-base font-bold text-white transition-all duration-300 hover:border-cyan-400 hover:text-cyan-300"
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
  <div className="rounded-[24px] md:rounded-[40px] border border-white/10 bg-[#0b0f1a] p-3 md:p-4 shadow-[0_20px_80px_rgba(0,0,0,0.45)]">

    
{quizCompleted ? (
  <div className="rounded-3xl border border-emerald-400/30 bg-gradient-to-br from-emerald-500/10 via-[#0b1120] to-[#050816] p-6">
    <p className="text-sm font-black uppercase tracking-widest text-emerald-300">
      Beginner Academy Completed
    </p>

<h2 className="mt-2 text-3xl font-black">
  <span className="text-white">🎓 TradeNest</span>
  <span className="text-cyan-400">X</span>
  <span className="text-white"> Graduation Complete</span>
</h2>

    <p className="mt-3 max-w-3xl text-sm leading-6 text-zinc-300">
      You passed the Trader Checkpoint with a score of{" "}
      <span className="font-black text-emerald-300">
        {quizScore} / {checkpointQuestions.length}
      </span>
      . Your completion is saved and the Advanced Academy is unlocked.
    </p>

    <div className="mt-5 flex flex-wrap gap-3">
      <Link
        href="/learn/advanced"
        className="rounded-xl bg-cyan-400 px-6 py-3 font-black text-black transition hover:scale-[1.02]"
      >
        Start Advanced Academy →
      </Link>

      <Link
        href="/simulator"
        className="rounded-xl border border-white/10 bg-[#0f172a] px-6 py-3 font-black text-white transition hover:border-cyan-400 hover:text-cyan-300"
      >
        Practice In Simulator →
      </Link>
    </div>
  </div>
) : (
  <>
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
    <div className="flex items-center gap-1 md:gap-3">
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
    if (quizCompleted) return;

    if (cooldownActive && nextAttemptTime) {
      if (Date.now() < nextAttemptTime) {
        setQuizError(
          "You recently attempted the checkpoint. Review your lessons and try again when the cooldown ends."
        );
        return;
      }

      setCooldownActive(false);
      setNextAttemptTime(null);
      localStorage.removeItem("tradenestxQuizCooldown");
    }

    if (
      Object.keys(quizAnswers).length <
      checkpointQuestions.length
    ) {
      setQuizError(
        `Please answer all ${
          checkpointQuestions.length
        } questions before submitting. You still have ${
          checkpointQuestions.length -
          Object.keys(quizAnswers).length
        } remaining.`
      );
      return;
    }

    const score = checkpointQuestions.reduce(
      (total, item, index) =>
        quizAnswers[index] === item.answer
          ? total + 1
          : total,
      0
    );

    setQuizError("");
    setQuizScore(score);
    setQuizSubmitted(true);
    setSubmittedAnswers(quizAnswers);

    if (score >= 8) {
      const today = new Date().toDateString();

      setCompletedLessons((prev) =>
        prev.includes("quiz")
          ? prev
          : [...prev, "quiz"]
      );

      setLessonCompletionDates((prev) => ({
        ...prev,
        quiz: today,
      }));

      localStorage.setItem(
        "tradenestxQuizScore",
        score.toString()
      );

      localStorage.removeItem(
        "tradenestxQuizCooldown"
      );

      setCooldownActive(false);
      setNextAttemptTime(null);

      return;
    }

    const nextTime =
      Date.now() + 30 * 60 * 1000;

    setCooldownActive(true);
    setNextAttemptTime(nextTime);

    localStorage.setItem(
      "tradenestxQuizCooldown",
      nextTime.toString()
    );
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

    <p className="mt-3 max-w-3xl leading-7 text-zinc-300">
      You passed the Trader Checkpoint with a score of{" "}
      <span className="font-black text-emerald-300">
        {quizScore} / {checkpointQuestions.length}
      </span>
      . Your completion is saved and the Advanced Academy is now unlocked.
    </p>

    <div className="mt-5 rounded-2xl border border-cyan-400/20 bg-cyan-500/10 p-5">
      <h3 className="text-lg font-black text-cyan-300">
        Advanced Academy Unlocked
      </h3>

      <p className="mt-2 text-sm leading-6 text-zinc-300">
        You can now continue with Moving Averages, Market Structure,
        RSI & Momentum, Market Context, and Futures & Leverage.
      </p>
    </div>

    <div className="mt-5 flex flex-wrap gap-3">
      <Link
        href="/learn/advanced"
        className="rounded-xl bg-cyan-400 px-6 py-3 font-black text-black transition hover:scale-[1.02]"
      >
        Start Advanced Academy →
      </Link>

      <Link
        href="/simulator"
        className="rounded-xl border border-white/10 bg-[#0f172a] px-6 py-3 font-black text-white transition hover:border-cyan-400 hover:text-cyan-300"
      >
        Practice In Simulator →
      </Link>
    </div>
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

      </>
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