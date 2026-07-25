import { currentUser } from "@clerk/nextjs/server";
import Link from "next/link";
import { adminDb } from "@/lib/firebaseAdmin";

type LearningMode =
  | "GUIDED"
  | "FULL_ACCESS";

type LessonProgressData = {
  learningMode?: LearningMode | "PERSONALIZED";
  completedLessons?: string[];
  currentLesson?: string;
  onboardingCompleted?: boolean;
};

const academyLessons = [
  {
    id: "buying",
    label: "What Are You Buying?",
  },
  {
    id: "market",
    label: "How The Market Works",
  },
  {
    id: "orders",
    label: "Market vs Limit Orders",
  },
  {
    id: "risk",
    label: "Protecting Your Capital",
  },
  {
    id: "candlesticks",
    label: "Candlestick Basics",
  },
  {
    id: "timeframes",
    label: "Trading Timeframes",
  },
  {
    id: "volume",
    label: "Volume Basics",
  },
  {
    id: "support",
    label: "Support & Resistance",
  },
  {
    id: "supplydemand",
    label: "Supply & Demand",
  },
  {
    id: "patterns",
    label: "Chart Patterns",
  },
  {
    id: "setups",
    label: "Building A Trade Plan",
  },
  {
    id: "psychology",
    label: "Trading Psychology",
  },
  {
    id: "vocabulary",
    label: "Essential Trading Terms",
  },
  {
    id: "quiz",
    label: "Trader Checkpoint",
  },
];

export default async function DashboardPage() {
  const user = await currentUser();

  const firstName =
    user?.firstName ||
    user?.username ||
    "Trader";

  let learningMode: LearningMode = "GUIDED";


  let completedLessons: string[] = [];
  let completedTrades = 0;

  if (user) {
    const [
      progressSnapshot,
      reviewsSnapshot,
    ] = await Promise.all([
      adminDb
        .collection("lessonProgress")
        .doc(user.id)
        .get(),

      adminDb
        .collection("tradeReviews")
        .where("userId", "==", user.id)
        .get(),
    ]);

    if (progressSnapshot.exists) {
      const progressData =
        progressSnapshot.data() as LessonProgressData;

      const savedLearningMode =
        progressData.learningMode;

      learningMode =
        savedLearningMode === "PERSONALIZED"
          ? "FULL_ACCESS"
          : savedLearningMode === "FULL_ACCESS"
            ? "FULL_ACCESS"
            : "GUIDED";

      completedLessons = Array.isArray(
        progressData.completedLessons
      )
        ? progressData.completedLessons
        : [];
    }

    completedTrades = reviewsSnapshot.size;
  }

  const totalLessons =
    academyLessons.length;

  const completedLessonCount =
    academyLessons.filter((lesson) =>
      completedLessons.includes(lesson.id)
    ).length;

  const nextLesson =
    academyLessons.find(
      (lesson) =>
        !completedLessons.includes(lesson.id)
    ) ?? null;

  const academyCompleted =
    completedLessonCount >= totalLessons;

  const learningModeLabel =
    learningMode === "GUIDED"
      ? "Guided Learning"
      : "Full Academy Access";


  const continueHref =
    academyCompleted
      ? "/learn/advanced"
      : "/learn";

  const continueLabel =
    academyCompleted
      ? "Start Advanced Academy"
      : learningMode === "FULL_ACCESS"
        ? "Continue Learning"
        : "Continue Beginner Academy";

  const gabyMessage = buildGabyMessage({
    learningMode,
    completedLessonCount,
    totalLessons,
    academyCompleted,
    nextLessonLabel:
      nextLesson?.label ?? null,
    completedTrades,
  });

  return (
    <main className="min-h-screen bg-black text-white">
      <div className="mx-auto w-full max-w-5xl px-4 pb-10 pt-6 sm:px-6 sm:pb-12 sm:pt-8 lg:px-8 lg:py-12">
        <header className="mb-7 sm:mb-9">
          <p className="text-[11px] font-black uppercase tracking-[0.22em] sm:text-xs">
            <span className="text-white">
              TRADENEST
            </span>

            <span className="text-cyan-400">
              X
            </span>

            <span className="text-zinc-500">
              {" "}
              DASHBOARD
            </span>
          </p>

          <h1 className="mt-3 text-3xl font-black tracking-tight sm:text-4xl lg:text-[42px]">
            Welcome back, {firstName}
          </h1>

          <p className="mt-2 max-w-2xl text-sm leading-6 text-zinc-400 sm:text-base">
            Here&apos;s where you are and what
            to focus on next.
          </p>
        </header>

        <div className="space-y-4 sm:space-y-5">
          {/* Gaby progress briefing */}
          <section className="rounded-2xl border border-white/5 bg-zinc-900/60 p-4 backdrop-blur-xl sm:p-6">
            <div className="flex items-center gap-3">
              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-cyan-500/20 bg-cyan-500/10 text-sm font-black text-cyan-400">
                G
              </div>

              <div>
                <h2 className="text-lg font-black text-white sm:text-xl">
                  Gaby
                </h2>

                <p className="text-xs font-bold uppercase tracking-[0.14em] text-zinc-500">
                  Your progress update
                </p>
              </div>
            </div>

            <div className="mt-5 rounded-xl border border-white/5 bg-zinc-950/50 p-4 sm:p-5">
              <p className="whitespace-pre-line text-sm leading-7 text-zinc-300 sm:text-base sm:leading-8">
                {gabyMessage}
              </p>
            </div>
          </section>

          {/* Quick snapshot */}
          <section className="rounded-2xl border border-white/5 bg-zinc-900/60 p-4 backdrop-blur-xl sm:p-6">
            <p className="text-[11px] font-black uppercase tracking-[0.18em] text-zinc-500 sm:text-xs">
              Quick Snapshot
            </p>

            <div className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
              <SnapshotItem
                label="Beginner Lessons"
                value={`${completedLessonCount} / ${totalLessons}`}
              />

              <SnapshotItem
                label="Completed Trades"
                value={String(completedTrades)}
              />

              <SnapshotItem
                label="Learning Mode"
                value={learningModeLabel}
              />
            </div>
          </section>

          {/* Primary next action */}
          <Link
            href={continueHref}
            className="flex min-h-14 w-full items-center justify-center rounded-2xl bg-cyan-500 px-5 py-4 text-sm font-black text-black transition-all duration-300 hover:bg-cyan-400 sm:text-base"
          >
            {continueLabel} →
          </Link>
        </div>
      </div>
    </main>
  );
}

type BuildGabyMessageInput = {
  learningMode: LearningMode;
  completedLessonCount: number;
  totalLessons: number;
  academyCompleted: boolean;
  nextLessonLabel: string | null;
  completedTrades: number;
};

function buildGabyMessage({
  learningMode,
  completedLessonCount,
  totalLessons,
  academyCompleted,
  nextLessonLabel,
  completedTrades,
}: BuildGabyMessageInput) {
  if (learningMode === "FULL_ACCESS") {
    if (completedTrades === 0) {
      return (
        "You chose Full Academy Access, so every Beginner and Advanced lesson is available to you. " +
        "Choose the lessons most relevant to your goals, practice the concepts in the simulator, and review your completed trades with me so I can help you improve your decision-making."
      );
    }

    return (
      `You chose Full Academy Access and have completed ${completedTrades} practice ${
        completedTrades === 1 ? "trade" : "trades"
      }. ` +
      "Continue studying the lessons most relevant to you, apply them in the simulator, and review each completed trade with me so we can improve one decision at a time."
    );
  }

  if (completedLessonCount === 0) {
    return (
      "You’re at the beginning of your trading journey. " +
      "Start with the first Beginner Academy lesson to understand what you’re buying when you trade. " +
      "Once you finish it, I’ll guide you to the next lesson and help you connect what you learned to the simulator."
    );
  }

  if (!academyCompleted && nextLessonLabel) {
    return (
      `You’ve completed ${completedLessonCount} of ${totalLessons} Beginner Academy lessons. ` +
      `Your next step is ${nextLessonLabel}. ` +
      "Finish that lesson before moving forward, and I’ll help you understand how to apply it in practice."
    );
  }

  if (
    academyCompleted &&
    completedTrades === 0
  ) {
    return (
      "You completed the Beginner Academy and now have a strong foundation in trading fundamentals. " +
      "Your next step is to begin the Advanced Academy and start practicing in the simulator. " +
      "As you complete trades, I’ll review your decisions and guide you through what to improve next."
    );
  }

  if (
    academyCompleted &&
    completedTrades < 20
  ) {
    const remainingTrades =
      20 - completedTrades;

    return (
      `You completed the Beginner Academy and ${completedTrades} practice ${
        completedTrades === 1
          ? "trade"
          : "trades"
      }. ` +
      `Continue through the Advanced Academy and complete ${remainingTrades} more practice ${
        remainingTrades === 1
          ? "trade"
          : "trades"
      }. ` +
      "After each trade, review your result with me so I can begin identifying the habits we should work on."
    );
  }

  return (
    `You completed the Beginner Academy and ${completedTrades} practice trades. ` +
    "Your next step is to begin the Advanced Academy and apply each lesson in the simulator. " +
    "After every completed trade, review it with me, and I’ll guide you toward the next skill you should improve."
  );
}

type SnapshotItemProps = {
  label: string;
  value: string;
};

function SnapshotItem({
  label,
  value,
}: SnapshotItemProps) {
  return (
    <div className="rounded-xl border border-white/5 bg-zinc-950/50 p-4">
      <p className="text-xs font-bold uppercase tracking-[0.12em] text-zinc-500">
        {label}
      </p>

      <p className="mt-2 text-lg font-black text-white">
        {value}
      </p>
    </div>
  );
}