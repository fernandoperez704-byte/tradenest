"use client";

import Image from "next/image";
import { useState } from "react";

export type PersonalizedLearningPath =
  | "READING_MARKET"
  | "RISK_MANAGEMENT"
  | "TRADE_EXECUTION"
  | "TRADING_PSYCHOLOGY"
  | "COMPLETE_TRADER";

type ExperienceLevel = "BEGINNER" | "EXPERIENCED";

type OnboardingStep =
  | "EXPERIENCE"
  | "BEGINNER_READY"
  | "PERSONALIZED_FOCUS"
  | "PERSONALIZED_READY";

type GabyIntroProps = {
  onStartLesson: () => void;
  onContinuePersonalized: (
    learningPath: PersonalizedLearningPath
  ) => void;
};

type LearningPathOption = {
  id: PersonalizedLearningPath;
  icon: string;
  label: string;
  description: string;
};

const learningPathOptions: LearningPathOption[] = [
  {
    id: "READING_MARKET",
    icon: "📈",
    label: "Reading the Market",
    description:
      "Learn to understand trends, market structure, support and resistance, chart patterns, and indicators.",
  },
  {
    id: "RISK_MANAGEMENT",
    icon: "🛡️",
    label: "Risk Management",
    description:
      "Protect your capital through better position sizing, leverage, stop losses, and risk control.",
  },
  {
    id: "TRADE_EXECUTION",
    icon: "🎯",
    label: "Trade Execution",
    description:
      "Improve entries, exits, trade planning, trade management, and overall execution.",
  },
  {
    id: "TRADING_PSYCHOLOGY",
    icon: "🧠",
    label: "Trading Psychology",
    description:
      "Build discipline, confidence, emotional control, and more consistent trading habits.",
  },
  {
    id: "COMPLETE_TRADER",
    icon: "🌟",
    label: "Complete Trading Mastery",
    description:
      "Build confidence across every area of trading with balanced guidance from Gaby.",
  },
];

export default function GabyIntro({
  onStartLesson,
  onContinuePersonalized,
}: GabyIntroProps) {
  const [experienceLevel, setExperienceLevel] =
    useState<ExperienceLevel | null>(null);

  const [step, setStep] =
    useState<OnboardingStep>("EXPERIENCE");

  const [selectedLearningPath, setSelectedLearningPath] =
    useState<PersonalizedLearningPath | null>(null);

  const selectedPathDetails = learningPathOptions.find(
    (option) => option.id === selectedLearningPath
  );

  function chooseBeginner() {
    setExperienceLevel("BEGINNER");
    setSelectedLearningPath(null);
    setStep("BEGINNER_READY");
  }

  function chooseExperienced() {
    setExperienceLevel("EXPERIENCED");
    setSelectedLearningPath(null);
    setStep("PERSONALIZED_FOCUS");
  }

  function chooseLearningPath(
    path: PersonalizedLearningPath
  ) {
    setSelectedLearningPath(path);
  }

  function confirmLearningPath() {
    if (!selectedLearningPath) {
      return;
    }

    setStep("PERSONALIZED_READY");
  }

  function continuePersonalized() {
    if (!selectedLearningPath) {
      return;
    }

    onContinuePersonalized(selectedLearningPath);
  }

  function returnToExperienceSelection() {
    setExperienceLevel(null);
    setSelectedLearningPath(null);
    setStep("EXPERIENCE");
  }

  function returnToLearningPaths() {
    setStep("PERSONALIZED_FOCUS");
  }

  return (
    <div className="relative min-h-[calc(100vh-110px)] overflow-hidden rounded-[32px] border border-cyan-400/20 bg-[#070b14] p-5 shadow-[0_20px_80px_rgba(0,0,0,0.45)] lg:p-6">
      <div className="pointer-events-none absolute -left-32 top-20 h-[420px] w-[420px] rounded-full bg-cyan-400/10 blur-[100px]" />

      <div className="pointer-events-none absolute right-0 top-0 h-[260px] w-[260px] rounded-full bg-blue-500/10 blur-[90px]" />

      <div className="relative grid w-full grid-cols-1 items-start gap-6 lg:grid-cols-[240px_minmax(0,1fr)]">
        <div className="flex justify-center pt-4">
          <div className="relative animate-[gabyFloat_4s_ease-in-out_infinite]">
            <div className="absolute inset-0 rounded-full bg-cyan-400/20 blur-[60px] animate-[gabyPulse_3s_ease-in-out_infinite]" />

            <Image
              src="/gaby.png"
              alt="Gaby AI Coach"
              width={280}
              height={280}
              className="relative h-[250px] w-[250px] object-contain drop-shadow-[0_0_55px_rgba(34,211,238,0.45)]"
            />

            <div className="mt-3 rounded-2xl border border-cyan-400/20 bg-[#0f172a]/80 p-3 text-center">
              <p className="text-sm font-black leading-6 text-cyan-300">
                Gaby guides your learning, explains each concept,
                and helps you improve.
              </p>
            </div>
          </div>
        </div>

        <div className="animate-[fadeUp_0.8s_ease-out_both]">
          <div className="flex items-center gap-3">
            <p className="text-2xl font-black uppercase tracking-[0.18em] md:text-3xl">
              <span className="text-white">
                Welcome To TradeNest
              </span>

              <span className="text-cyan-400">X</span>
            </p>

            <div className="h-[2px] flex-1 bg-gradient-to-r from-cyan-400/60 to-transparent" />
          </div>

          <div className="relative mt-4 rounded-2xl border border-cyan-400/25 bg-[#0f172a]/90 p-4 shadow-[0_0_35px_rgba(34,211,238,0.08)]">
            <div className="absolute -left-3 top-8 hidden h-6 w-6 rotate-45 border-b border-l border-cyan-400/25 bg-[#0f172a] lg:block" />

            <p className="text-xl font-black text-cyan-300">
              Hi, I&apos;m Gaby.
            </p>

            <p className="mt-2 text-base leading-7 text-zinc-300">
              I&apos;ll personalize your learning experience and
              help you become a more confident trader. Before we
              begin, I&apos;d like to learn a little about you.
            </p>
          </div>

{step === "EXPERIENCE" && (
  <div className="mt-3 rounded-2xl border border-cyan-400/20 bg-[#0f172a]/80 p-5">
    <div>
      <p className="mt-3 max-w-2xl text-base leading-7 text-zinc-400">
        Choose the option that best describes your current trading experience.
      </p>
    </div>

    <div className="mt-5 grid gap-4 xl:grid-cols-2">
      <button
        type="button"
        onClick={chooseBeginner}
        className="group relative overflow-hidden rounded-2xl border border-cyan-400/25 bg-gradient-to-br from-[#10283a] via-[#0b1b2c] to-[#08111f] p-5 text-left transition-all duration-300 hover:-translate-y-1 hover:border-cyan-300/70 hover:shadow-[0_0_40px_rgba(34,211,238,0.18)]"
      >
        <div className="pointer-events-none absolute -left-16 -top-20 h-56 w-56 rounded-full bg-cyan-400/15 blur-[75px]" />

        <div className="pointer-events-none absolute -bottom-20 -right-16 h-56 w-56 rounded-full bg-blue-500/10 blur-[80px]" />

        <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(135deg,rgba(255,255,255,0.04),transparent_45%)]" />

        <div className="relative flex items-start justify-between gap-4">
          <div>
            <p className="text-sm font-black uppercase tracking-[0.14em] text-cyan-300">
              Guided Learning
            </p>

            <h3 className="mt-1 text-xl font-black text-white transition-colors group-hover:text-cyan-300">
              I&apos;m New to Trading
            </h3>

            <p className="mt-2 leading-6 text-zinc-400">
              Follow a structured learning path from the foundations to
              confident simulator practice.
            </p>
          </div>

          <span className="text-xl text-cyan-400 transition-transform group-hover:translate-x-1">
            →
          </span>
        </div>

        <div className="relative mt-5 space-y-3 border-t border-cyan-400/10 pt-4 text-sm text-zinc-300">
          <p>✓ Step-by-step lessons</p>
          <p>✓ Practice after each lesson</p>
          <p>✓ Gaby guides your progress</p>
          <p>✓ Always know what comes next</p>
        </div>

        <div className="relative mt-5 rounded-xl border border-cyan-400/30 bg-cyan-400/10 px-4 py-3 text-center font-black text-cyan-300 transition-all group-hover:border-cyan-300/60 group-hover:bg-cyan-400/15">
          Choose Guided Learning
        </div>
      </button>

      <button
        type="button"
        onClick={chooseExperienced}
        className="group relative overflow-hidden rounded-2xl border border-violet-400/25 bg-gradient-to-br from-[#211b3f] via-[#15162d] to-[#08111f] p-5 text-left transition-all duration-300 hover:-translate-y-1 hover:border-violet-300/70 hover:shadow-[0_0_40px_rgba(139,92,246,0.18)]"
      >
        <div className="pointer-events-none absolute -left-16 -top-20 h-56 w-56 rounded-full bg-violet-400/15 blur-[75px]" />

        <div className="pointer-events-none absolute -bottom-20 -right-16 h-56 w-56 rounded-full bg-fuchsia-500/10 blur-[80px]" />

        <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(135deg,rgba(255,255,255,0.04),transparent_45%)]" />

        <div className="relative flex items-start justify-between gap-4">
          <div>
            <p className="text-sm font-black uppercase tracking-[0.14em] text-violet-300">
              Personalized Learning
            </p>

            <h3 className="mt-1 text-xl font-black text-white transition-colors group-hover:text-violet-300">
              I Have Trading Experience
            </h3>

            <p className="mt-2 leading-6 text-zinc-400">
              Learn at your own pace with recommendations tailored to the
              area you want to improve first.
            </p>
          </div>

          <span className="text-xl text-violet-400 transition-transform group-hover:translate-x-1">
            →
          </span>
        </div>

        <div className="relative mt-5 space-y-3 border-t border-violet-400/10 pt-4 text-sm text-zinc-300">
          <p>✓ All Basic &amp; Advanced lessons unlocked</p>
          <p>✓ Personalized lesson recommendations</p>
          <p>✓ Relevant simulator exercises</p>
          <p>✓ Coaching focused on your improvement</p>
        </div>

        <div className="relative mt-5 rounded-xl border border-violet-400/30 bg-violet-400/10 px-4 py-3 text-center font-black text-violet-200 transition-all group-hover:border-violet-300/60 group-hover:bg-violet-400/15">
          Choose Personalized Learning
        </div>
      </button>
    </div>
  </div>
)}

          {step === "BEGINNER_READY" &&
            experienceLevel === "BEGINNER" && (
              <div className="mt-3 rounded-2xl border border-cyan-400/20 bg-[#0f172a]/80 p-5">
                <div className="rounded-2xl border border-emerald-400/20 bg-emerald-500/10 p-5">
                  <p className="text-sm font-black uppercase tracking-[0.16em] text-emerald-300">
                    Guided Learning
                  </p>

                  <h2 className="mt-2 text-2xl font-black text-white">
                    Your Learning Path Is Ready
                  </h2>

                  <p className="mt-3 max-w-3xl text-base leading-7 text-zinc-300">
                    We&apos;ll begin with the foundations and
                    unlock each lesson as you progress. Gaby will
                    explain where you are, why each concept matters,
                    and what you should do next.
                  </p>

                  <div className="mt-5 grid gap-3 md:grid-cols-3">
                    <div className="rounded-xl border border-white/5 bg-black/20 p-4">
                      <p className="text-sm font-black text-cyan-300">
                        Where are you?
                      </p>

                      <p className="mt-2 text-sm leading-6 text-zinc-400">
                        You&apos;re beginning with the foundations
                        of trading.
                      </p>
                    </div>

                    <div className="rounded-xl border border-white/5 bg-black/20 p-4">
                      <p className="text-sm font-black text-cyan-300">
                        Why does it matter?
                      </p>

                      <p className="mt-2 text-sm leading-6 text-zinc-400">
                        A strong foundation helps every later
                        concept make sense.
                      </p>
                    </div>

                    <div className="rounded-xl border border-white/5 bg-black/20 p-4">
                      <p className="text-sm font-black text-cyan-300">
                        What&apos;s next?
                      </p>

                      <p className="mt-2 text-sm leading-6 text-zinc-400">
                        Start Lesson 1 and follow the guided
                        learning path.
                      </p>
                    </div>
                  </div>

                  <div className="mt-5 flex flex-col gap-3 sm:flex-row">
                    <button
                      type="button"
                      onClick={returnToExperienceSelection}
                      className="rounded-xl border border-zinc-700 bg-zinc-900/50 px-5 py-3 font-black text-zinc-300 transition hover:border-zinc-500 hover:text-white"
                    >
                      Back
                    </button>

                    <button
                      type="button"
                      onClick={onStartLesson}
                      className="group flex-1 rounded-xl border border-cyan-400/30 bg-cyan-500/10 px-6 py-3 font-black text-cyan-300 transition-all duration-300 hover:border-cyan-300 hover:bg-cyan-500/20 hover:text-white hover:shadow-[0_0_25px_rgba(34,211,238,0.25)]"
                    >
                      <span className="flex items-center justify-center gap-2">
                        Start Lesson 1

                        <span className="transition-transform duration-300 group-hover:translate-x-1">
                          →
                        </span>
                      </span>
                    </button>
                  </div>
                </div>
              </div>
            )}

          {step === "PERSONALIZED_FOCUS" &&
            experienceLevel === "EXPERIENCED" && (
              <div className="mt-3 rounded-2xl border border-violet-400/20 bg-[#0f172a]/80 p-5">
                <p className="text-sm font-black uppercase tracking-[0.16em] text-violet-300">
                  Personalized Learning
                </p>

                <h2 className="mt-2 text-2xl font-black text-white">
                  What would you like to improve first?
                </h2>

                <p className="mt-2 text-base leading-7 text-zinc-400">
                  Choose the area that would have the biggest impact
                  on your trading. You can change this later from
                  your profile.
                </p>

                <div className="mt-5 grid gap-3 md:grid-cols-2">
                  {learningPathOptions.map((option) => {
                    const isSelected =
                      selectedLearningPath === option.id;

                    return (
                      <button
                        key={option.id}
                        type="button"
                        onClick={() =>
                          chooseLearningPath(option.id)
                        }
                        aria-pressed={isSelected}
                        className={`group rounded-2xl border p-5 text-left transition-all duration-300 ${
                          isSelected
                            ? "border-violet-300 bg-violet-500/20 shadow-[0_0_28px_rgba(139,92,246,0.2)]"
                            : "border-white/10 bg-black/20 hover:-translate-y-1 hover:border-violet-400/50 hover:bg-violet-500/5"
                        } ${
                          option.id === "COMPLETE_TRADER"
                            ? "md:col-span-2"
                            : ""
                        }`}
                      >
                        <div className="flex items-start gap-4">
                          <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl border border-violet-400/20 bg-violet-500/10 text-2xl">
                            {option.icon}
                          </span>

                          <div className="min-w-0 flex-1">
                            <div className="flex items-center justify-between gap-3">
                              <h3
                                className={`text-lg font-black ${
                                  isSelected
                                    ? "text-violet-200"
                                    : "text-white group-hover:text-violet-300"
                                }`}
                              >
                                {option.label}
                              </h3>

                              <span
                                className={`flex h-6 w-6 shrink-0 items-center justify-center rounded-full border text-xs font-black ${
                                  isSelected
                                    ? "border-violet-300 bg-violet-400 text-[#070b14]"
                                    : "border-zinc-600 text-transparent"
                                }`}
                              >
                                ✓
                              </span>
                            </div>

                            <p className="mt-2 text-sm leading-6 text-zinc-400">
                              {option.description}
                            </p>
                          </div>
                        </div>
                      </button>
                    );
                  })}
                </div>

                <div className="mt-5 flex flex-col gap-3 sm:flex-row">
                  <button
                    type="button"
                    onClick={returnToExperienceSelection}
                    className="rounded-xl border border-zinc-700 bg-zinc-900/50 px-5 py-3 font-black text-zinc-300 transition hover:border-zinc-500 hover:text-white"
                  >
                    Back
                  </button>

                  <button
                    type="button"
                    disabled={!selectedLearningPath}
                    onClick={confirmLearningPath}
                    className="group flex-1 rounded-xl border border-violet-400/30 bg-violet-500/10 px-6 py-3 font-black text-violet-200 transition-all duration-300 enabled:hover:border-violet-300 enabled:hover:bg-violet-500/20 enabled:hover:text-white enabled:hover:shadow-[0_0_25px_rgba(139,92,246,0.22)] disabled:cursor-not-allowed disabled:opacity-40"
                  >
                    <span className="flex items-center justify-center gap-2">
                      Personalize My Learning

                      <span className="transition-transform duration-300 group-enabled:group-hover:translate-x-1">
                        →
                      </span>
                    </span>
                  </button>
                </div>
              </div>
            )}

          {step === "PERSONALIZED_READY" &&
            experienceLevel === "EXPERIENCED" &&
            selectedPathDetails && (
              <div className="mt-3 rounded-2xl border border-violet-400/20 bg-[#0f172a]/80 p-5">
                <div className="rounded-2xl border border-violet-400/25 bg-violet-500/10 p-5">
                  <div className="flex items-start gap-4">
                    <span className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl border border-violet-400/30 bg-violet-500/10 text-3xl">
                      {selectedPathDetails.icon}
                    </span>

                    <div>
                      <p className="text-sm font-black uppercase tracking-[0.16em] text-violet-300">
                        Excellent Choice
                      </p>

                      <h2 className="mt-2 text-2xl font-black text-white">
                        Your Personalized Path Is Ready
                      </h2>
                    </div>
                  </div>

                  <p className="mt-5 text-base leading-7 text-zinc-300">
                    I&apos;ll personalize your TradeNestX experience
                    around{" "}
                    <span className="font-black text-violet-200">
                      {selectedPathDetails.label}
                    </span>
                    . Throughout your journey, I&apos;ll recommend
                    lessons, simulator exercises, and coaching that
                    strengthen this area while continuing to build
                    your overall trading skills.
                  </p>

                  <div className="mt-5 rounded-xl border border-white/10 bg-black/20 p-4">
                    <p className="text-sm font-black text-violet-200">
                      Your first focus
                    </p>

                    <p className="mt-2 text-sm leading-6 text-zinc-400">
                      {selectedPathDetails.description}
                    </p>
                  </div>

                  <p className="mt-4 text-sm text-zinc-500">
                    You can change your learning focus later from
                    your profile.
                  </p>

                  <div className="mt-5 flex flex-col gap-3 sm:flex-row">
                    <button
                      type="button"
                      onClick={returnToLearningPaths}
                      className="rounded-xl border border-zinc-700 bg-zinc-900/50 px-5 py-3 font-black text-zinc-300 transition hover:border-zinc-500 hover:text-white"
                    >
                      Change Focus
                    </button>

                    <button
                      type="button"
                      onClick={continuePersonalized}
                      className="group flex-1 rounded-xl border border-violet-400/30 bg-violet-500/10 px-6 py-3 font-black text-violet-200 transition-all duration-300 hover:border-violet-300 hover:bg-violet-500/20 hover:text-white hover:shadow-[0_0_25px_rgba(139,92,246,0.22)]"
                    >
                      <span className="flex items-center justify-center gap-2">
                        Continue to TradeNestX

                        <span className="transition-transform duration-300 group-hover:translate-x-1">
                          →
                        </span>
                      </span>
                    </button>
                  </div>
                </div>
              </div>
            )}

          <div className="mt-3 rounded-2xl border border-orange-400/30 bg-orange-500/10 p-4">
            <h3 className="flex items-center gap-2 text-lg font-black text-orange-300">
              <span>⚠️</span>
              Important Disclaimer
            </h3>

            <p className="mt-2 text-sm leading-6 text-zinc-300">
              TradeNestX is education only. We do not provide
              financial advice, investment recommendations, or
              trading signals.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}