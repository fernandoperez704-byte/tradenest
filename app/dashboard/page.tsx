import Link from "next/link";

export default function DashboardPage() {
  /*
    Temporary demo values.

    Later these will come from:
    - Clerk
    - Firestore lesson progress
    - Onboarding mode
    - Trader Development Engine
  */

  const firstName = "Fernando";

  const learningMode: "GUIDED" | "PERSONALIZED" = "GUIDED";

  const currentLesson = 4;
  const totalLessons = 15;

  const personalizedFocus = "Risk Management";

  const completedTrades = 7;
  const requiredTrades = 20;

  const enoughPerformanceData =
    completedTrades >= requiredTrades;

  const lessonProgress =
    totalLessons > 0
      ? Math.round(
          (currentLesson / totalLessons) * 100
        )
      : 0;

  const isGuided =
    learningMode === "GUIDED";

  const continueHref = isGuided
    ? "/learn"
    : "/simulator";

  const continueLabel = isGuided
    ? "Continue Learning"
    : "Continue Trading";

  return (
    <main className="min-h-screen bg-black text-white">
      <div className="mx-auto w-full max-w-5xl px-4 pb-10 pt-6 sm:px-6 sm:pb-12 sm:pt-8 lg:px-8 lg:py-12">
        {/* Welcome */}
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
            Let&apos;s continue building your
            trading skills.
          </p>
        </header>

        <div className="space-y-4 sm:space-y-5">
          {/* Current progress or focus */}
          <section className="rounded-2xl border border-white/5 bg-zinc-900/60 p-4 backdrop-blur-xl sm:p-6">
            {isGuided ? (
              <>
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <p className="text-[11px] font-black uppercase tracking-[0.18em] text-zinc-500 sm:text-xs">
                      Progress
                    </p>

                    <h2 className="mt-2 text-xl font-black text-white sm:text-2xl">
                      Beginner Academy
                    </h2>

                    <p className="mt-1.5 text-sm text-zinc-400">
                      Lesson {currentLesson} of{" "}
                      {totalLessons}
                    </p>
                  </div>

                  <div className="rounded-full border border-cyan-500/20 bg-cyan-500/10 px-3 py-1.5 text-sm font-black text-cyan-400">
                    {lessonProgress}%
                  </div>
                </div>

                <div className="mt-5 sm:mt-6">
                  <div className="h-2.5 overflow-hidden rounded-full bg-zinc-800 sm:h-3">
                    <div
                      className="h-full rounded-full bg-cyan-500 transition-all duration-500"
                      style={{
                        width: `${lessonProgress}%`,
                      }}
                    />
                  </div>

                  <p className="mt-3 text-sm leading-6 text-zinc-500">
                    Continue with Market vs Limit
                    Orders.
                  </p>
                </div>
              </>
            ) : (
              <>
                <p className="text-[11px] font-black uppercase tracking-[0.18em] text-zinc-500 sm:text-xs">
                  Current Focus
                </p>

                <h2 className="mt-2 text-2xl font-black text-white sm:text-3xl">
                  {personalizedFocus}
                </h2>

                <p className="mt-3 max-w-2xl text-sm leading-6 text-zinc-400 sm:text-base sm:leading-7">
                  Gaby will prioritize this area
                  during your simulator sessions,
                  trade reviews, and performance
                  analysis.
                </p>
              </>
            )}
          </section>

          {/* Gaby */}
          <section className="rounded-2xl border border-white/5 bg-zinc-900/60 p-4 backdrop-blur-xl sm:p-6">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-cyan-500/20 bg-cyan-500/10 text-sm font-black text-cyan-400 sm:h-11 sm:w-11">
                G
              </div>

              <h2 className="text-lg font-black text-white sm:text-xl">
                Gaby
              </h2>
            </div>

            <div className="mt-4 rounded-xl border border-white/5 bg-zinc-950/50 p-4 sm:mt-5 sm:p-5">
              <p className="text-sm leading-6 text-zinc-300 sm:text-base sm:leading-7">
                {isGuided
                  ? "You’re learning how trades are executed. Next, we’ll focus on the difference between market and limit orders and why the order you choose matters."
                  : "Your recent activity will help me identify what is improving and where you need more consistency. I’ll prioritize feedback related to your current focus."}
              </p>
            </div>
          </section>

          {/* Performance progress */}
          <section className="rounded-2xl border border-white/5 bg-zinc-900/60 p-4 backdrop-blur-xl sm:p-6">
            <p className="text-[11px] font-black uppercase tracking-[0.18em] text-zinc-500 sm:text-xs">
              Your Progress
            </p>

            {enoughPerformanceData ? (
              <div className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-5">
                <ProgressMetric
                  label="Risk"
                  value={72}
                />

                <ProgressMetric
                  label="Discipline"
                  value={68}
                />

                <ProgressMetric
                  label="Consistency"
                  value={61}
                />

                <ProgressMetric
                  label="Entry Quality"
                  value={74}
                />

                <ProgressMetric
                  label="Exit Management"
                  value={59}
                />
              </div>
            ) : (
              <div className="mt-4 rounded-xl border border-white/5 bg-zinc-950/50 p-4 sm:mt-5 sm:p-5">
                <h2 className="text-base font-black text-white sm:text-lg">
                  Performance report locked
                </h2>

                <p className="mt-2 max-w-2xl text-sm leading-6 text-zinc-400 sm:text-base">
                  Complete more trades to unlock
                  your personalized performance
                  report.
                </p>

                <div className="mt-4">
                  <div className="flex items-center justify-between gap-4 text-sm">
                    <span className="font-bold text-zinc-400">
                      Trade progress
                    </span>

                    <span className="font-black text-cyan-400">
                      {completedTrades} /{" "}
                      {requiredTrades}
                    </span>
                  </div>

                  <div className="mt-2 h-2.5 overflow-hidden rounded-full bg-zinc-800">
                    <div
                      className="h-full rounded-full bg-cyan-500"
                      style={{
                        width: `${Math.min(
                          100,
                          Math.round(
                            (completedTrades /
                              requiredTrades) *
                              100
                          )
                        )}%`,
                      }}
                    />
                  </div>
                </div>
              </div>
            )}
          </section>

          {/* Continue */}
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

type ProgressMetricProps = {
  label: string;
  value: number;
};

function ProgressMetric({
  label,
  value,
}: ProgressMetricProps) {
  return (
    <div className="rounded-xl border border-white/5 bg-zinc-950/50 p-4">
      <div className="flex items-start justify-between gap-3">
        <p className="text-sm font-bold leading-5 text-zinc-400">
          {label}
        </p>

        <span className="shrink-0 text-sm font-black text-white">
          {value}%
        </span>
      </div>

      <div className="mt-3 h-2 overflow-hidden rounded-full bg-zinc-800">
        <div
          className="h-full rounded-full bg-cyan-500"
          style={{
            width: `${value}%`,
          }}
        />
      </div>
    </div>
  );
}