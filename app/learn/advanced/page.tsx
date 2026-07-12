"use client";

import { useState } from "react";
import Navbar from "@/app/components/Navbar";
import LearnSidebar from "../components/LearnSidebar";
import MovingAverageLesson from "./modules/MovingAverageLesson";
import MarketStructureLesson from "./modules/MarketStructureLesson";
import RsiMomentumLesson from "./modules/RsiMomentumLesson";
import ReadingMarketContextLesson from "./modules/ReadingMarketContextLesson";
import FuturesLeverageLesson from "./modules/FuturesLeverageLesson";





const advancedLessons = [
  { id: "moving-averages", label: "Moving Averages" },
  { id: "market-structure", label: "Market Structure" },
  { id: "rsi-momentum", label: "RSI & Momentum" },
  { id: "market-context", label: "Market Context" },
  { id: "futures-leverage", label: "Futures & Leverage" },
];

export default function AdvancedLearnPage() {
  const [activeLesson, setActiveLesson] = useState("moving-averages");

  return (
    <>
      <Navbar />

<main className="page-shell !pt-0 xl:h-[calc(100dvh-78px)] xl:overflow-hidden">
  <div className="mx-auto h-full w-full max-w-[1780px] px-6">
    <div className="grid h-full min-h-0 grid-cols-1 gap-4 pt-2 xl:grid-cols-[220px_minmax(0,1fr)] xl:overflow-hidden">

            <LearnSidebar
              mode="ADVANCED"
              lessons={advancedLessons}
              activeLesson={activeLesson}
              setActiveLesson={setActiveLesson}
              isAdvancedUnlocked={true}
            />
          
<section className="min-h-0 min-w-0 overflow-y-auto pb-6 pr-2 scrollbar-hide">

{activeLesson === "moving-averages" && <MovingAverageLesson />}
{activeLesson === "market-structure" && <MarketStructureLesson />}
{activeLesson === "rsi-momentum" && <RsiMomentumLesson />}
{activeLesson === "market-context" && <ReadingMarketContextLesson />}
{activeLesson === "futures-leverage" && <FuturesLeverageLesson />}


</section>

          </div>
        </div>
      </main>
    </>
  );
}