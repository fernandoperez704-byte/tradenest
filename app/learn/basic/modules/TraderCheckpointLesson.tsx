"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

type TraderCheckpointLessonProps = {
  isCompleted: boolean;
  onComplete: () => void;
};

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
    reviewLesson: "Essential Trading Terms",
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
    reviewLesson: "Protecting Your Capital",
  },
];

const passingScore = 8;
const cooldownDuration = 30 * 60 * 1000;

export default function TraderCheckpointLesson({
  isCompleted,
  onComplete,
}: TraderCheckpointLessonProps) {
  const [quizScore, setQuizScore] = useState(0);
  const [quizSubmitted, setQuizSubmitted] = useState(false);

  const [quizAnswers, setQuizAnswers] = useState<
    Record<number, string>
  >({});

  const [submittedAnswers, setSubmittedAnswers] = useState<
    Record<number, string>
  >({});

  const [quizError, setQuizError] = useState("");
  const [nextAttemptTime, setNextAttemptTime] = useState<
    number | null
  >(null);

  const [remainingSeconds, setRemainingSeconds] = useState(0);
  const [checkpointLoaded, setCheckpointLoaded] = useState(false);

  useEffect(() => {
    const savedCooldown = Number(
      localStorage.getItem("tradenestxQuizCooldown") || "0"
    );

    if (Number.isFinite(savedCooldown) && savedCooldown > Date.now()) {
      setNextAttemptTime(savedCooldown);

      setRemainingSeconds(
        Math.ceil((savedCooldown - Date.now()) / 1000)
      );
    } else {
      localStorage.removeItem("tradenestxQuizCooldown");
    }

    setCheckpointLoaded(true);
  }, []);

  useEffect(() => {
    if (!isCompleted) return;

    const savedScore = Number(
      localStorage.getItem("tradenestxQuizScore") || "8"
    );

    setQuizScore(
      Number.isInteger(savedScore) &&
        savedScore >= passingScore &&
        savedScore <= checkpointQuestions.length
        ? savedScore
        : passingScore
    );

    setQuizSubmitted(true);
  }, [isCompleted]);

  useEffect(() => {
    if (!nextAttemptTime) return;

    function updateCooldown() {
      const remaining = Math.max(
        0,
        Math.ceil((nextAttemptTime! - Date.now()) / 1000)
      );

      setRemainingSeconds(remaining);

      if (remaining === 0) {
        setNextAttemptTime(null);
        setQuizError("");
        localStorage.removeItem("tradenestxQuizCooldown");
      }
    }

    updateCooldown();

    const interval = setInterval(updateCooldown, 1000);

    return () => clearInterval(interval);
  }, [nextAttemptTime]);

  const answeredCount = Object.keys(quizAnswers).length;

  const progressPercent = Math.round(
    (answeredCount / checkpointQuestions.length) * 100
  );

  const cooldownActive =
    nextAttemptTime !== null && remainingSeconds > 0;

  const cooldownMinutes = Math.floor(remainingSeconds / 60);

  const cooldownSeconds = String(
    remainingSeconds % 60
  ).padStart(2, "0");

  const incorrectAnswers = checkpointQuestions
    .map((item, index) => ({
      ...item,
      index,
      userAnswer: submittedAnswers[index],
    }))
    .filter((item) => item.userAnswer !== item.answer);

  function submitCheckpoint() {
    if (!checkpointLoaded || isCompleted) return;

    const savedCooldown = Number(
      localStorage.getItem("tradenestxQuizCooldown") || "0"
    );

    const cooldownEnd = Math.max(
      nextAttemptTime || 0,
      Number.isFinite(savedCooldown) ? savedCooldown : 0
    );

    if (Date.now() < cooldownEnd) {
      setNextAttemptTime(cooldownEnd);

      setRemainingSeconds(
        Math.ceil((cooldownEnd - Date.now()) / 1000)
      );

      setQuizError(
        "Review your lessons and try again when the cooldown ends."
      );

      return;
    }

    if (answeredCount < checkpointQuestions.length) {
      setQuizError(
        `Please answer all ${checkpointQuestions.length} questions before submitting. You still have ${
          checkpointQuestions.length - answeredCount
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
    setSubmittedAnswers({ ...quizAnswers });

    if (score >= passingScore) {
      localStorage.setItem(
        "tradenestxQuizScore",
        score.toString()
      );

      localStorage.removeItem("tradenestxQuizCooldown");

      setNextAttemptTime(null);
      setRemainingSeconds(0);

      onComplete();

      return;
    }

    const nextTime = Date.now() + cooldownDuration;

    localStorage.setItem(
      "tradenestxQuizCooldown",
      nextTime.toString()
    );

    setNextAttemptTime(nextTime);

    setRemainingSeconds(
      Math.ceil(cooldownDuration / 1000)
    );
  }

  return (
    <article className="mx-auto w-full max-w-[1200px] px-3 pt-3 md:px-8 md:pt-4">

      <header className="border-b border-zinc-800 pb-8">
        <p className="text-xs font-bold uppercase tracking-[0.15em] text-cyan-400">
          Basic Trading Education
        </p>

        <h1 className="mt-3 text-2xl font-bold text-white md:text-3xl">
          Trader Checkpoint
        </h1>

        <p className="mt-4 max-w-4xl text-base leading-7 text-zinc-400">
          Evaluate your understanding of essential trading concepts,
          identify areas that need additional practice, and reinforce
          the knowledge developed throughout the Basic Academy.
        </p>
      </header>

      {!checkpointLoaded ? (
        <div className="py-10 text-sm text-zinc-400">
          Loading checkpoint...
        </div>
      ) : isCompleted ? (
        <section className="py-10">

          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-emerald-500/10 text-emerald-400">
            <svg
              className="h-7 w-7"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M5 12l4 4L19 6" />
            </svg>
          </div>

          <p className="mt-6 text-xs font-bold uppercase tracking-[0.15em] text-emerald-400">
            Assessment Completed
          </p>

          <h2 className="mt-3 text-2xl font-bold text-white md:text-3xl">
            Congratulations!
          </h2>

          <p className="mt-4 max-w-3xl text-base leading-7 text-zinc-400">
            You have successfully passed the TradeNestX Trader
            Checkpoint and demonstrated your understanding of
            fundamental trading concepts.
          </p>

          <div className="mt-8 grid grid-cols-2 gap-6 border-y border-zinc-800 py-8 md:grid-cols-3">

            <div>
              <p className="text-sm text-zinc-500">
                Final Score
              </p>

              <p className="mt-2 text-3xl font-bold text-white">
                {quizScore}
                <span className="text-lg text-zinc-500">
                  {" "}/ {checkpointQuestions.length}
                </span>
              </p>
            </div>

            <div>
              <p className="text-sm text-zinc-500">
                Percentage
              </p>

              <p className="mt-2 text-3xl font-bold text-emerald-400">
                {Math.round(
                  (quizScore / checkpointQuestions.length) * 100
                )}%
              </p>
            </div>

            <div>
              <p className="text-sm text-zinc-500">
                Assessment Status
              </p>

              <p className="mt-2 text-xl font-bold text-emerald-400">
                Passed
              </p>
            </div>

          </div>

          <h3 className="mt-10 text-xl font-bold text-white">
            Continue Your Trading Education
          </h3>

          <p className="mt-4 max-w-3xl text-base leading-7 text-zinc-400">
            Passing this assessment demonstrates foundational
            knowledge, but it does not guarantee trading proficiency
            or profitability. Continue developing your understanding
            through advanced education and simulated trading practice.
          </p>

          <div className="mt-6 grid grid-cols-2 gap-2 md:flex md:flex-wrap md:gap-3">

            <Link
              href="/learn/advanced"
              className="flex items-center justify-center rounded-xl border border-zinc-700 px-2 py-3 text-center text-xs font-bold text-white transition hover:border-cyan-400 hover:text-cyan-300 md:px-6 md:text-sm"
            >
              Explore Advanced Academy
            </Link>

            <Link
              href="/simulator"
              className="flex items-center justify-center rounded-xl border border-zinc-700 px-2 py-3 text-center text-xs font-bold text-white transition hover:border-cyan-400 hover:text-cyan-300 md:px-6 md:text-sm"
            >
              Practice in Simulator
            </Link>

          </div>

        </section>
      ) : (
        <>

          <section className="border-b border-zinc-800 py-8">

            <p className="text-xs font-bold uppercase tracking-[0.15em] text-cyan-400">
              Knowledge Assessment
            </p>

            <h2 className="mt-3 text-2xl font-bold text-white">
              Test Your Understanding
            </h2>

            <p className="mt-4 max-w-3xl text-base leading-7 text-zinc-400">
              Answer each question using the knowledge you have
              developed throughout the Basic Academy. If you do not
              achieve the required passing score, review the suggested
              lessons before attempting the checkpoint again.
            </p>

            <div className="mt-8 grid grid-cols-2 gap-6 md:grid-cols-4">

              <div>
                <p className="text-sm text-zinc-500">
                  Questions
                </p>

                <p className="mt-2 text-2xl font-bold text-white">
                  {checkpointQuestions.length}
                </p>
              </div>

              <div>
                <p className="text-sm text-zinc-500">
                  Passing Score
                </p>

                <p className="mt-2 text-2xl font-bold text-emerald-400">
                  80%
                </p>
              </div>

              <div>
                <p className="text-sm text-zinc-500">
                  Correct Answers Required
                </p>

                <p className="mt-2 text-2xl font-bold text-white">
                  {passingScore} / {checkpointQuestions.length}
                </p>
              </div>

              <div>
                <p className="text-sm text-zinc-500">
                  Retry Cooldown
                </p>

                <p className="mt-2 text-2xl font-bold text-white">
                  30 min
                </p>
              </div>

            </div>

          </section>

          <section className="border-b border-zinc-800 py-6">

            <div className="flex items-center justify-between gap-4">

              <p className="text-sm font-medium text-zinc-400">
                Assessment Progress
              </p>

              <p className="text-sm font-bold text-cyan-400">
                {answeredCount} / {checkpointQuestions.length}
              </p>

            </div>

            <div className="mt-3 h-2 overflow-hidden rounded-full bg-zinc-800">
              <div
                className="h-full rounded-full bg-cyan-400 transition-all duration-300"
                style={{
                  width: `${progressPercent}%`,
                }}
              />
            </div>

            {cooldownActive && (
              <div className="mt-6 border-l-2 border-orange-400 pl-4">

                <p className="text-sm font-bold text-orange-400">
                  Checkpoint Cooldown Active
                </p>

                <p className="mt-2 text-2xl font-bold tabular-nums text-white">
                  {cooldownMinutes}:{cooldownSeconds}
                </p>

                <p className="mt-2 text-sm leading-6 text-zinc-400">
                  Use this time to review your lessons before
                  submitting another attempt.
                </p>

              </div>
            )}

          </section>

          <section>

            {checkpointQuestions.map((item, index) => (
              <div
                key={index}
                className="border-b border-zinc-800 py-8 md:py-10"
              >

                <p className="text-xs font-bold uppercase tracking-[0.15em] text-cyan-400">
                  Question {index + 1}
                </p>

                <h3 className="mt-3 text-lg font-bold text-white md:text-xl">
                  {item.question}
                </h3>

                <div className="mt-5 grid grid-cols-1 gap-3 md:grid-cols-2">

                  {item.options.map((option, optionIndex) => (
                    <button
                      key={option}
                      type="button"
                      aria-pressed={quizAnswers[index] === option}
                      onClick={() => {
                        setQuizAnswers((prev) => ({
                          ...prev,
                          [index]: option,
                        }));

                        setQuizError("");
                      }}
                      className={`flex items-center gap-3 rounded-lg border px-4 py-4 text-left text-sm font-medium transition ${
                        quizAnswers[index] === option
                          ? "border-cyan-400 bg-cyan-400/5 text-cyan-300"
                          : "border-zinc-800 bg-black text-zinc-400 hover:border-zinc-600 hover:text-white"
                      }`}
                    >

                      <span
                        className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-md text-xs font-bold ${
                          quizAnswers[index] === option
                            ? "bg-cyan-400 text-black"
                            : "bg-zinc-900 text-zinc-400"
                        }`}
                      >
                        {["A", "B", "C", "D"][optionIndex]}
                      </span>

                      <span>{option}</span>

                    </button>
                  ))}

                </div>

              </div>
            ))}

          </section>

          <section className="py-8">

            {quizError && (
              <p
                role="alert"
                className="mb-5 text-sm leading-6 text-orange-400"
              >
                {quizError}
              </p>
            )}

            <div className="flex flex-wrap items-center justify-between gap-4">

              <p className="text-sm text-zinc-500">
                {answeredCount === checkpointQuestions.length
                  ? "All questions answered."
                  : `${
                      checkpointQuestions.length - answeredCount
                    } questions remaining.`}
              </p>

              <button
                type="button"
                onClick={submitCheckpoint}
                disabled={cooldownActive || !checkpointLoaded}
                className="rounded-xl bg-cyan-400 px-6 py-3 text-sm font-bold text-black transition hover:bg-cyan-300 disabled:cursor-not-allowed disabled:bg-zinc-800 disabled:text-zinc-500"
              >
                {cooldownActive
                  ? `Try Again in ${cooldownMinutes}:${cooldownSeconds}`
                  : "Submit Checkpoint"}
              </button>

            </div>

          </section>

          {quizSubmitted && quizScore < passingScore && (
            <section className="border-t border-zinc-800 py-8">

              <p className="text-xs font-bold uppercase tracking-[0.15em] text-orange-400">
                Assessment Results
              </p>

              <h2 className="mt-3 text-2xl font-bold text-white">
                Continue Building Your Knowledge
              </h2>

              <div className="mt-6 grid grid-cols-2 gap-6 md:grid-cols-3">

                <div>
                  <p className="text-sm text-zinc-500">
                    Your Score
                  </p>

                  <p className="mt-2 text-3xl font-bold text-white">
                    {quizScore} / {checkpointQuestions.length}
                  </p>
                </div>

                <div>
                  <p className="text-sm text-zinc-500">
                    Percentage
                  </p>

                  <p className="mt-2 text-3xl font-bold text-orange-400">
                    {Math.round(
                      (quizScore / checkpointQuestions.length) * 100
                    )}%
                  </p>
                </div>

                <div>
                  <p className="text-sm text-zinc-500">
                    Required Score
                  </p>

                  <p className="mt-2 text-3xl font-bold text-white">
                    80%
                  </p>
                </div>

              </div>

              <p className="mt-6 max-w-3xl text-base leading-7 text-zinc-400">
                Your results identify concepts that may require
                additional study. Review the recommended lessons
                before attempting the assessment again.
              </p>

              <h3 className="mt-8 text-xl font-bold text-white">
                Lessons to Review
              </h3>

              <div className="mt-4 divide-y divide-zinc-800">

                {incorrectAnswers.map((item) => (
                  <div
                    key={item.index}
                    className="py-5"
                  >

                    <p className="text-xs font-bold uppercase tracking-wider text-orange-400">
                      Question {item.index + 1}
                    </p>

                    <p className="mt-2 font-medium text-white">
                      {item.question}
                    </p>

                    <p className="mt-2 text-sm text-zinc-400">
                      Your answer: {item.userAnswer || "Not answered"}
                    </p>

                    <p className="mt-2 text-sm text-cyan-400">
                      Review: {item.reviewLesson}
                    </p>

                  </div>
                ))}

              </div>

            </section>
          )}

        </>
      )}

    </article>
  );
}