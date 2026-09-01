"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { useClerk, useUser } from "@clerk/nextjs";

type ExperienceLevel =
  | "BEGINNER"
  | "EXPERIENCED";

type OnboardingStep =
  | "EXPERIENCE"
  | "BEGINNER_CONFIRM"
  | "BEGINNER_READY"
  | "FULL_ACCESS_CONFIRM"
  | "FULL_ACCESS_READY";

type GabyIntroProps = {
  onStartLesson: () => void;
  onUnlockAllLessons: () => void;

  learningMode: "GUIDED" | "FULL_ACCESS" | null;
  onboardingCompleted: boolean;
};

export default function GabyIntro({
  onStartLesson,
  onUnlockAllLessons,
  learningMode,
  onboardingCompleted,
}: GabyIntroProps) {



  const { user, isLoaded } = useUser();
  const { openSignIn } = useClerk();

  const [experienceLevel, setExperienceLevel] =
    useState<ExperienceLevel | null>(null);

  const [step, setStep] =
    useState<OnboardingStep>("EXPERIENCE");

useEffect(() => {
  if (!onboardingCompleted || !learningMode) {
    return;
  }

  if (learningMode === "GUIDED") {
    setExperienceLevel("BEGINNER");
    setStep("BEGINNER_READY");
    return;
  }

  setExperienceLevel("EXPERIENCED");
  setStep("FULL_ACCESS_READY");
}, [learningMode, onboardingCompleted]);


    function requireSignIn() {
  if (!isLoaded) {
    return false;
  }

  if (user) {
    return true;
  }

  const currentPage =
    window.location.pathname +
    window.location.search +
    window.location.hash;

  openSignIn({
    forceRedirectUrl: currentPage,
  });

  return false;
}

function chooseBeginner() {
  if (!requireSignIn()) {
    return;
  }

  setExperienceLevel("BEGINNER");
  setStep("BEGINNER_CONFIRM");
}

  function confirmBeginnerPath() {
    setStep("BEGINNER_READY");
  }

function chooseExperienced() {
  if (!requireSignIn()) {
    return;
  }

  setExperienceLevel("EXPERIENCED");
  setStep("FULL_ACCESS_CONFIRM");
}

  function confirmFullAccess() {
    setStep("FULL_ACCESS_READY");
  }

  function continueWithFullAccess() {
    onUnlockAllLessons();
  }

function returnToExperienceSelection() {
  if (onboardingCompleted && learningMode) {
    return;
  }

  setExperienceLevel(null);
  setStep("EXPERIENCE");
}

  return (
    <div className="relative min-h-[calc(100vh-110px)] overflow-hidden rounded-[32px] border border-cyan-400/20 bg-[#070b14] p-5 shadow-[0_20px_80px_rgba(0,0,0,0.45)] lg:p-6">
      <div className="pointer-events-none absolute -left-32 top-20 h-[420px] w-[420px] rounded-full bg-cyan-400/10 blur-[100px]" />

      <div className="pointer-events-none absolute right-0 top-0 h-[260px] w-[260px] rounded-full bg-blue-500/10 blur-[90px]" />

      <div className="relative grid w-full grid-cols-1 items-start gap-6 lg:grid-cols-[240px_minmax(0,1fr)]">
        <div className="hidden justify-center pt-4 lg:flex">
          <div className="relative animate-[gabyFloat_4s_ease-in-out_infinite]">
            <div className="absolute inset-0 rounded-full bg-cyan-400/20 blur-[60px] animate-[gabyPulse_3s_ease-in-out_infinite]" />

            <Image
              src="/gaby.png"
              alt="Gaby AI Coach"
              width={280}
              height={280}
              className="relative h-auto w-[135px] object-contain drop-shadow-[0_0_55px_rgba(34,211,238,0.45)] lg:w-[250px]"
            />


          </div>
        </div>

        <div>
          <div className="flex items-center gap-3">
            <p className="text-2xl font-black uppercase tracking-[0.18em] md:text-3xl">
              <span className="text-white">
                Welcome To TradeNest
              </span>

              <span className="text-cyan-400">X</span>
            </p>

            <div className="h-[2px] flex-1 bg-gradient-to-r from-cyan-400/60 to-transparent" />
          </div>

<div className="mt-4 flex items-center gap-4 lg:hidden">
  <Image
    src="/gaby.png"
    alt="Gaby AI Coach"
    width={140}
    height={140}
    className="h-auto w-[120px] shrink-0 object-contain drop-shadow-[0_0_35px_rgba(34,211,238,0.45)]"
  />

  <div className="flex-1 rounded-2xl border border-cyan-400/25 bg-[#0f172a]/90 p-4">
    <p className="text-lg font-black text-cyan-300">
      Hi, I&apos;m Gaby.
    </p>

    <p className="mt-2 text-sm leading-6 text-zinc-300">
      I&apos;ll help you choose the learning path that best fits your trading experience.
    </p>
  </div>
</div>

          <div className="relative mt-4 hidden rounded-2xl border border-cyan-400/25 bg-[#0f172a]/90 p-4 shadow-[0_0_35px_rgba(34,211,238,0.08)] lg:block">
            <div className="absolute -left-3 top-8 hidden h-6 w-6 rotate-45 border-b border-l border-cyan-400/25 bg-[#0f172a] lg:block" />

            <p className="text-xl font-black text-cyan-300">
              Hi, I&apos;m Gaby.
            </p>

            <p className="mt-2 text-base leading-7 text-zinc-300">
              I&apos;ll help you choose the learning path that best
              fits your current trading experience.
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
        className="group relative overflow-hidden rounded-2xl border border-cyan-400/25 bg-gradient-to-br from-[#10283a] via-[#0b1b2c] to-[#08111f] p-5 text-left hover:border-cyan-300/70"
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
        className="group relative overflow-hidden rounded-2xl border border-violet-400/25 bg-gradient-to-br from-[#211b3f] via-[#15162d] to-[#08111f] p-5 text-left hover:border-violet-300/70"
      >
        <div className="pointer-events-none absolute -left-16 -top-20 h-56 w-56 rounded-full bg-violet-400/15 blur-[75px]" />

        <div className="pointer-events-none absolute -bottom-20 -right-16 h-56 w-56 rounded-full bg-fuchsia-500/10 blur-[80px]" />

        <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(135deg,rgba(255,255,255,0.04),transparent_45%)]" />

        <div className="relative flex items-start justify-between gap-4">
          <div>
            <p className="text-sm font-black uppercase tracking-[0.14em] text-violet-300">
              Full Academy Access
            </p>

            <h3 className="mt-1 text-xl font-black text-white transition-colors group-hover:text-violet-300">
              I Have Trading Experience
            </h3>

            <p className="mt-2 leading-6 text-zinc-400">
              Unlock the complete academy and study the lessons most
              relevant to you.
            </p>
          </div>

          <span className="text-xl text-violet-400 transition-transform group-hover:translate-x-1">
            →
          </span>
        </div>

        <div className="relative mt-5 space-y-3 border-t border-violet-400/10 pt-4 text-sm text-zinc-300">
          <p>✓ All Basic lessons unlocked</p>
          <p>✓ All Advanced lessons unlocked</p>
          <p>✓ Choose lessons in any order</p>
          <p>✓ Practice concepts in the simulator</p>
        </div>

        <div className="relative mt-5 rounded-xl border border-violet-400/30 bg-violet-400/10 px-4 py-3 text-center font-black text-violet-200 transition-all group-hover:border-violet-300/60 group-hover:bg-violet-400/15">
          Unlock All Lessons
        </div>
      </button>
    </div>
  </div>
)}

{step === "BEGINNER_CONFIRM" &&
  experienceLevel === "BEGINNER" && (
    <div className="mt-3 rounded-2xl border border-cyan-400/20 bg-[#0f172a]/80 p-5">
      <div className="relative overflow-hidden rounded-2xl border border-cyan-400/25 bg-gradient-to-br from-[#10283a] via-[#0b1b2c] to-[#08111f] p-5 shadow-[0_0_35px_rgba(34,211,238,0.08)]">
        <div className="pointer-events-none absolute -left-20 -top-24 h-64 w-64 rounded-full bg-cyan-400/15 blur-[90px]" />

        <div className="pointer-events-none absolute -bottom-24 -right-20 h-64 w-64 rounded-full bg-blue-500/10 blur-[90px]" />

        <div className="relative">
          <p className="text-sm font-black uppercase tracking-[0.16em] text-cyan-300">
            Before You Begin
          </p>

          <h2 className="mt-2 text-2xl font-black text-white">
            Confirm Guided Learning
          </h2>

          <p className="mt-3 max-w-3xl text-base leading-7 text-zinc-300">
            You&apos;re about to begin TradeNestX&apos;s Guided
            Learning path.
          </p>

          <p className="mt-3 max-w-3xl text-base leading-7 text-zinc-400">
            Guided Learning is designed specifically for new
            traders. Each lesson builds on the previous one so you
            can develop a strong foundation before moving on to
            more advanced concepts.
          </p>

          <div className="mt-5 rounded-xl border border-cyan-400/20 bg-cyan-500/10 p-4">
            <p className="font-black text-cyan-200">
              Lessons will unlock as you progress.
            </p>

            <p className="mt-2 text-sm leading-6 text-zinc-300">
              This keeps your learning structured, prevents
              information overload, and makes sure you always know
              what to learn next.
            </p>
          </div>

          <div className="mt-4 rounded-xl border border-amber-400/25 bg-amber-500/10 p-4">
            <p className="font-black text-amber-300">
              Your choice becomes final after you begin.
            </p>

            <p className="mt-2 text-sm leading-6 text-zinc-300">
              Once you start Guided Learning, your learning path
              will be locked to preserve the structured curriculum.
            </p>
          </div>

          <p className="mt-4 max-w-3xl text-sm leading-6 text-zinc-400">
            If you already understand the basics and prefer
            immediate access to all Basic and Advanced lessons,
            return and choose Full Academy Access instead.
          </p>

          <div className="mt-5 flex flex-col gap-3 sm:flex-row">
            <button
              type="button"
              onClick={returnToExperienceSelection}
              className="rounded-xl border border-zinc-700 bg-zinc-900/50 px-5 py-3 font-black text-zinc-300 transition hover:border-violet-400/50 hover:bg-violet-500/10 hover:text-violet-200"
            >
              Choose Full Access Instead
            </button>

            <button
              type="button"
              onClick={confirmBeginnerPath}
              className="group flex-1 rounded-xl border border-cyan-400/30 bg-cyan-500/10 px-6 py-3 font-black text-cyan-300 transition-all duration-300 hover:border-cyan-300 hover:bg-cyan-500/20 hover:text-white hover:shadow-[0_0_25px_rgba(34,211,238,0.25)]"
            >
              <span className="flex items-center justify-center gap-2">
                Confirm Guided Learning

                <span className="transition-transform duration-300 group-hover:translate-x-1">
                  →
                </span>
              </span>
            </button>
          </div>
        </div>
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

          {step === "FULL_ACCESS_CONFIRM" &&
  experienceLevel === "EXPERIENCED" && (
    <div className="mt-3 rounded-2xl border border-violet-400/20 bg-[#0f172a]/80 p-5">
      <div className="relative overflow-hidden rounded-2xl border border-violet-400/25 bg-gradient-to-br from-[#211b3f] via-[#15162d] to-[#08111f] p-5 shadow-[0_0_35px_rgba(139,92,246,0.08)]">
        <div className="pointer-events-none absolute -left-20 -top-24 h-64 w-64 rounded-full bg-violet-400/15 blur-[90px]" />
        <div className="pointer-events-none absolute -bottom-24 -right-20 h-64 w-64 rounded-full bg-fuchsia-500/10 blur-[90px]" />

        <div className="relative">
          <p className="text-sm font-black uppercase tracking-[0.16em] text-violet-300">
            Before You Begin
          </p>

          <h2 className="mt-2 text-2xl font-black text-white">
            Confirm Full Academy Access
          </h2>

          <p className="mt-3 max-w-3xl text-base leading-7 text-zinc-300">
            You&apos;re about to unlock all Basic and Advanced
            TradeNestX lessons.
          </p>

          <p className="mt-3 max-w-3xl text-base leading-7 text-zinc-400">
            This option is designed for traders who already understand
            the foundations and prefer to choose what they study.
          </p>

          <div className="mt-5 rounded-xl border border-violet-400/20 bg-violet-500/10 p-4">
            <p className="font-black text-violet-200">
              Every academy lesson will be available.
            </p>

            <p className="mt-2 text-sm leading-6 text-zinc-300">
              You can open Basic and Advanced lessons in any order and
              practice the concepts you choose in the simulator.
            </p>
          </div>

          <div className="mt-4 rounded-xl border border-amber-400/25 bg-amber-500/10 p-4">
            <p className="font-black text-amber-300">
              Your choice becomes final after you continue.
            </p>

            <p className="mt-2 text-sm leading-6 text-zinc-300">
              Full Academy Access does not provide a personalized
              curriculum. It gives you control over which lessons you
              study and when.
            </p>
          </div>

          <p className="mt-4 max-w-3xl text-sm leading-6 text-zinc-400">
            If you prefer lessons to unlock in order with a clear
            beginner path, return and choose Guided Learning.
          </p>

          <div className="mt-5 flex flex-col gap-3 sm:flex-row">
            <button
              type="button"
              onClick={returnToExperienceSelection}
              className="rounded-xl border border-zinc-700 bg-zinc-900/50 px-5 py-3 font-black text-zinc-300 transition hover:border-cyan-400/50 hover:bg-cyan-500/10 hover:text-cyan-200"
            >
              Choose Guided Instead
            </button>

            <button
              type="button"
              onClick={confirmFullAccess}
              className="group flex-1 rounded-xl border border-violet-400/30 bg-violet-500/10 px-6 py-3 font-black text-violet-200 transition-all duration-300 hover:border-violet-300 hover:bg-violet-500/20 hover:text-white hover:shadow-[0_0_25px_rgba(139,92,246,0.22)]"
            >
              <span className="flex items-center justify-center gap-2">
                Confirm Full Academy Access

                <span className="transition-transform duration-300 group-hover:translate-x-1">
                  →
                </span>
              </span>
            </button>
          </div>
        </div>
      </div>
    </div>
  )}

{step === "FULL_ACCESS_READY" &&
  experienceLevel === "EXPERIENCED" && (
    <div className="mt-3 rounded-2xl border border-violet-400/20 bg-[#0f172a]/80 p-5">
      <div className="rounded-2xl border border-violet-400/25 bg-violet-500/10 p-5">
        <p className="text-sm font-black uppercase tracking-[0.16em] text-violet-300">
          Full Academy Access
        </p>

        <h2 className="mt-2 text-2xl font-black text-white">
          The Complete Academy Is Ready
        </h2>

        <p className="mt-3 max-w-3xl text-base leading-7 text-zinc-300">
          All Basic and Advanced lessons will be unlocked. You can
          choose what to study and move through the academy at your
          own pace.
        </p>

        <div className="mt-5 grid gap-3 md:grid-cols-3">
          <div className="rounded-xl border border-white/5 bg-black/20 p-4">
            <p className="text-sm font-black text-violet-200">
              What is unlocked?
            </p>

            <p className="mt-2 text-sm leading-6 text-zinc-400">
              Every Basic and Advanced academy lesson.
            </p>
          </div>

          <div className="rounded-xl border border-white/5 bg-black/20 p-4">
            <p className="text-sm font-black text-violet-200">
              How do you learn?
            </p>

            <p className="mt-2 text-sm leading-6 text-zinc-400">
              Choose lessons in any order based on what you want to
              study.
            </p>
          </div>

          <div className="rounded-xl border border-white/5 bg-black/20 p-4">
            <p className="text-sm font-black text-violet-200">
              What&apos;s next?
            </p>

            <p className="mt-2 text-sm leading-6 text-zinc-400">
              Enter the academy and select your first lesson.
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
            onClick={continueWithFullAccess}
            className="group flex-1 rounded-xl border border-violet-400/30 bg-violet-500/10 px-6 py-3 font-black text-violet-200 transition-all duration-300 hover:border-violet-300 hover:bg-violet-500/20 hover:text-white hover:shadow-[0_0_25px_rgba(139,92,246,0.22)]"
          >
            <span className="flex items-center justify-center gap-2">
              Unlock All Lessons

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