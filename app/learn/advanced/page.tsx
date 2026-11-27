"use client";

import { useState, useRef, useEffect } from "react";
import Navbar from "@/app/components/Navbar";
import LearnSidebar from "../components/LearnSidebar";
import MovingAverageLesson from "./modules/MovingAverageLesson";
import MarketStructureLesson from "./modules/MarketStructureLesson";
import RsiMomentumLesson from "./modules/RsiMomentumLesson";

import FuturesLeverageLesson from "./modules/FuturesLeverageLesson";

const advancedLessons = [
  { id: "moving-averages", label: "Moving Averages" },
  { id: "market-structure", label: "Market Structure" },
  { id: "rsi-momentum", label: "RSI & Momentum" },

  { id: "futures-leverage", label: "Futures & Leverage" },
];

export default function AdvancedLearnPage() {
  const [activeLesson, setActiveLesson] = useState("moving-averages");
  const [mobileLessonOpen, setMobileLessonOpen] = useState(false);

  const lessonContentRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (lessonContentRef.current) {
      lessonContentRef.current.scrollTop = 0;
    }
  }, [activeLesson, mobileLessonOpen]);

  function handleSelectLesson(lesson: string) {
    setActiveLesson(lesson);
    setMobileLessonOpen(true);
  }

  return (
    <>
      <Navbar />

      <main className="page-shell !pt-0 !min-h-0 h-[calc(100dvh-78px)] overflow-hidden">
        <div className="mx-auto h-full w-full max-w-[1780px] px-1 xl:px-6">
          <div className="grid h-full min-h-0 grid-cols-1 grid-rows-[minmax(0,1fr)] gap-4 overflow-hidden pt-2 xl:grid-cols-[220px_minmax(0,1fr)]">

            {/* Lesson Selection */}

            <div
              className={`min-h-0 min-w-0 overflow-y-auto education-scrollbar ${
                mobileLessonOpen ? "hidden xl:block" : "block"
              }`}
            >
              <LearnSidebar
                mode="ADVANCED"
                lessons={advancedLessons}
                activeLesson={activeLesson}
                setActiveLesson={handleSelectLesson}
                isAdvancedUnlocked={true}
              />
            </div>

            {/* Lesson Content */}

            <section
              ref={lessonContentRef}
              className={`min-h-0 min-w-0 overflow-y-auto bg-black px-0 xl:pr-2 education-scrollbar ${
                mobileLessonOpen ? "block" : "hidden xl:block"
              }`}
            >

              {/* Mobile Back Navigation */}

              <div className="px-3 pt-3 xl:hidden">
                <button
                  type="button"
                  onClick={() => setMobileLessonOpen(false)}
                  className="text-sm font-medium text-cyan-400 transition hover:text-cyan-300"
                >
                  ← Back to Lessons
                </button>
              </div>

              {activeLesson === "moving-averages" && <MovingAverageLesson />}
              {activeLesson === "market-structure" && <MarketStructureLesson />}
              {activeLesson === "rsi-momentum" && <RsiMomentumLesson />}

              {activeLesson === "futures-leverage" && <FuturesLeverageLesson />}

            </section>

          </div>
        </div>
      </main>
    </>
  );
}