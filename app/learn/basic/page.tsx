"use client";

import { useEffect, useState } from "react";
import { useUser } from "@clerk/nextjs";

import Navbar from "@/app/components/Navbar";
import LearnSidebar from "../components/LearnSidebar";

import WhatAreYouBuyingLesson from "./modules/WhatAreYouBuyingLesson";
import HowMarketWorksLesson from "./modules/HowMarketWorksLesson";
import MarketLimitOrdersLesson from "./modules/MarketLimitOrdersLesson";
import ProtectingCapitalLesson from "./modules/ProtectingCapitalLesson";
import CandlestickBasicsLesson from "./modules/CandlestickBasicsLesson";
import TradingTimeframesLesson from "./modules/TradingTimeframesLesson";
import VolumeBasicsLesson from "./modules/VolumeBasicsLesson";
import SupportResistanceLesson from "./modules/SupportResistanceLesson";
import SupplyDemandLesson from "./modules/SupplyDemandLesson";
import ChartPatternsLesson from "./modules/ChartPatternsLesson";
import TradePlanLesson from "./modules/TradePlanLesson";
import TradingPsychologyLesson from "./modules/TradingPsychologyLesson";
import TradingTermsLesson from "./modules/TradingTermsLesson";
import TraderCheckpointLesson from "./modules/TraderCheckpointLesson";

const lessons = [
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

export default function LearnPage() {
  const { user } = useUser();

  return <LearnPageContent key={user?.id ?? "guest"} />;
}

function LearnPageContent() {
  const { user, isLoaded } = useUser();

  const [activeLesson, setActiveLesson] = useState("buying");

  const [mobileLearnView, setMobileLearnView] = useState<
    "LESSONS" | "LESSON"
  >("LESSONS");

  const [completedLessons, setCompletedLessons] = useState<
    string[]
  >([]);

  const [lessonCompletionDates, setLessonCompletionDates] =
    useState<Record<string, string>>({});

  const [progressLoaded, setProgressLoaded] = useState(false);

  // Retained for existing lesson progress API compatibility.
  const [onboardingCompleted, setOnboardingCompleted] =
    useState(false);

  const [learningMode, setLearningMode] = useState<
    "GUIDED" | "FULL_ACCESS" | null
  >(null);

  // Load saved lesson progress.
  useEffect(() => {
    if (!isLoaded) return;

    async function loadProgress() {
      setProgressLoaded(false);

      if (!user) {
        setCompletedLessons([]);
        setLessonCompletionDates({});
        setLearningMode(null);
        setOnboardingCompleted(false);
        setActiveLesson("buying");
        setProgressLoaded(true);

        return;
      }

      try {
        const response = await fetch("/api/lesson-progress", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            action: "GET_PROGRESS",
            expectedUserId: user.id,
          }),
        });

        if (!response.ok) {
          throw new Error("Failed to load lesson progress");
        }

        const result = await response.json();

        if (result.progress) {
          const data = result.progress;

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

          const savedLesson = lessons.find(
            (lesson) => lesson.id === data.currentLesson
          );

          setActiveLesson(savedLesson?.id ?? "buying");
        } else {
          setCompletedLessons([]);
          setLessonCompletionDates({});
          setLearningMode(null);
          setOnboardingCompleted(false);
          setActiveLesson("buying");
        }

        setProgressLoaded(true);
      } catch (error) {
        console.error(
          "Failed to load lesson progress:",
          error
        );

        setProgressLoaded(false);
      }
    }

    loadProgress();
  }, [isLoaded, user?.id]);

  // Save lesson progress.
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

      try {
        const response = await fetch("/api/lesson-progress", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            action: "SAVE_PROGRESS",
            expectedUserId: user.id,
            progress: {
              completedLessons,
              lessonCompletionDates,
              currentLesson: activeLesson,
              onboardingCompleted,
              learningMode,
            },
          }),
        });

        if (!response.ok) {
          throw new Error("Failed to save lesson progress");
        }
      } catch (error) {
        console.error(
          "Failed to save lesson progress:",
          error
        );
      }
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

  // Return to the top when switching lessons.
  useEffect(() => {
    document.getElementById("lesson-content")?.scrollTo({
      top: 0,
      behavior: "auto",
    });

    window.scrollTo({
      top: 0,
      behavior: "auto",
    });
  }, [activeLesson, mobileLearnView]);

  // Queue Discord educational reinforcement.
  async function queueDiscordLessonMessage(lessonId: string) {
    if (!user) return;

    const lesson = lessons.find(
      (item) => item.id === lessonId
    );

    if (!lesson) return;

    try {
      const response = await fetch("/api/lesson-progress", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          action: "QUEUE_DISCORD_LESSON",
          expectedUserId: user.id,
          lessonId,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to queue Discord lesson");
      }
    } catch (error) {
      console.error(
        "Failed to queue Discord lesson:",
        error
      );
    }
  }

  // Select any available lesson.
  function handleSelectLesson(lesson: string) {
    setActiveLesson(lesson);

    if (window.innerWidth < 1280) {
      setMobileLearnView("LESSON");
    }
  }

  // Record regular lesson completion.
  function completeLesson() {
    if (completedLessons.includes(activeLesson)) return;

    const today = new Date().toDateString();

    setCompletedLessons((prev) => [
      ...new Set([...prev, activeLesson]),
    ]);

    setLessonCompletionDates((prev) => ({
      ...prev,
      [activeLesson]: today,
    }));

    queueDiscordLessonMessage(activeLesson);
  }

  // Record successful checkpoint completion.
  function completeCheckpoint() {
    if (completedLessons.includes("quiz")) return;

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
  }

  return (
    <>
      <Navbar />

      <main className="page-shell !pt-0 !min-h-0 !pb-0 h-[calc(100dvh/0.9-78px)] overflow-hidden xl:!pb-8 xl:h-[calc(100dvh-78px)]">

        <div className="mx-auto h-full w-full max-w-[1780px] px-1 xl:px-6">

          <div className="grid h-full min-h-0 grid-cols-1 grid-rows-[minmax(0,1fr)] gap-4 overflow-hidden pt-2 xl:grid-cols-[220px_minmax(0,1fr)]">

            <div
              className={`min-h-0 min-w-0 overflow-y-auto education-scrollbar ${
                mobileLearnView === "LESSONS"
                  ? "block"
                  : "hidden xl:block"
              }`}
            >
              <LearnSidebar
                mode="BASIC"
                lessons={lessons}
                activeLesson={activeLesson}
                setActiveLesson={handleSelectLesson}
                completedLessons={completedLessons}
              />
            </div>

            <section
              id="lesson-content"
              className={`min-h-0 min-w-0 overflow-y-auto bg-black px-0 xl:pr-2 education-scrollbar ${
                mobileLearnView === "LESSON"
                  ? "block"
                  : "hidden xl:block"
              }`}
            >

              <button
                onClick={() => setMobileLearnView("LESSONS")}
                className="mb-4 block rounded-xl border border-cyan-400/30 bg-cyan-500/10 px-4 py-3 text-sm font-black text-cyan-300 xl:hidden"
              >
                ← Back to Lessons
              </button>

              {activeLesson === "buying" && (
                <WhatAreYouBuyingLesson
                  isCompleted={completedLessons.includes("buying")}
                  onComplete={completeLesson}
                />
              )}

              {activeLesson === "market" && (
                <HowMarketWorksLesson
                  isCompleted={completedLessons.includes("market")}
                  onComplete={completeLesson}
                />
              )}

              {activeLesson === "orders" && (
                <MarketLimitOrdersLesson
                  isCompleted={completedLessons.includes("orders")}
                  onComplete={completeLesson}
                />
              )}

              {activeLesson === "risk" && (
                <ProtectingCapitalLesson
                  isCompleted={completedLessons.includes("risk")}
                  onComplete={completeLesson}
                />
              )}

              {activeLesson === "candlesticks" && (
                <CandlestickBasicsLesson
                  isCompleted={completedLessons.includes("candlesticks")}
                  onComplete={completeLesson}
                />
              )}

              {activeLesson === "timeframes" && (
                <TradingTimeframesLesson
                  isCompleted={completedLessons.includes("timeframes")}
                  onComplete={completeLesson}
                />
              )}

              {activeLesson === "volume" && (
                <VolumeBasicsLesson
                  isCompleted={completedLessons.includes("volume")}
                  onComplete={completeLesson}
                />
              )}

              {activeLesson === "support" && (
                <SupportResistanceLesson
                  isCompleted={completedLessons.includes("support")}
                  onComplete={completeLesson}
                />
              )}

              {activeLesson === "supplydemand" && (
                <SupplyDemandLesson
                  isCompleted={completedLessons.includes("supplydemand")}
                  onComplete={completeLesson}
                />
              )}

              {activeLesson === "patterns" && (
                <ChartPatternsLesson
                  isCompleted={completedLessons.includes("patterns")}
                  onComplete={completeLesson}
                />
              )}

              {activeLesson === "setups" && (
                <TradePlanLesson
                  isCompleted={completedLessons.includes("setups")}
                  onComplete={completeLesson}
                />
              )}

              {activeLesson === "psychology" && (
                <TradingPsychologyLesson
                  isCompleted={completedLessons.includes("psychology")}
                  onComplete={completeLesson}
                />
              )}

              {activeLesson === "vocabulary" && (
                <TradingTermsLesson
                  isCompleted={completedLessons.includes("vocabulary")}
                  onComplete={completeLesson}
                />
              )}

              <div
                className={
                  activeLesson === "quiz" ? "block" : "hidden"
                }
              >
                <TraderCheckpointLesson
                  isCompleted={completedLessons.includes("quiz")}
                  onComplete={completeCheckpoint}
                />
              </div>

            </section>

          </div>

        </div>

      </main>
    </>
  );
}