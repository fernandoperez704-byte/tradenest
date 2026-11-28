"use client";

import Image from "next/image";
import { useState } from "react";
import { useUser } from "@clerk/nextjs";

export type AdvancedLessonSection = {
  label?: string;
  heading: string;
  paragraphs?: string[];
  image?: string;
  imageAlt?: string;
  caption?: string;
  points?: {
    title: string;
    description: string;
    color?: string;
  }[];
};

type AdvancedLessonLayoutProps = {
  title: string;
  description?: string;
  images?: string[];
  sections?: AdvancedLessonSection[];
  questions: string[];
};

export default function AdvancedLessonLayout(
  props: AdvancedLessonLayoutProps
) {
  const { user } = useUser();

  return (
    <AdvancedLessonContent
      key={user?.id ?? "guest"}
      {...props}
    />
  );
}

function AdvancedLessonContent({
  title,
  description,
  images = [],
  sections = [],
  questions,
}: AdvancedLessonLayoutProps) {
  const { user } = useUser();
  const [slide, setSlide] = useState(0);
  const [message, setMessage] = useState("");
  const [gabyAnswer, setGabyAnswer] = useState("");
  const [loading, setLoading] = useState(false);
  const [showQuestions, setShowQuestions] = useState(false);

  const [conversationHistory, setConversationHistory] = useState<
    { role: "user" | "assistant"; content: string }[]
  >([]);

  const currentImage = images[slide];

  async function askGaby(question?: string) {
    const finalQuestion = (question || message).trim();

    if (!finalQuestion || loading) return;

    const previousHistory = conversationHistory;

    setLoading(true);
    setMessage("");
    setShowQuestions(false);

    try {
      const res = await fetch("/api/gaby", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          expectedUserId: user?.id ?? null,
          message: finalQuestion,
          lesson: `advanced-${title}`,
          conversationHistory: previousHistory,
        }),
      });

      const data = await res.json();

      const answer =
        data.answer || "Gaby could not respond right now.";

      setGabyAnswer(answer);

      setConversationHistory((prev) =>
        [
          ...prev,
          {
            role: "user" as const,
            content: finalQuestion,
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
      setLoading(false);
    }
  }

  return (
    <article className="mx-auto w-full max-w-[1200px] px-3 pt-3 md:px-8 md:pt-4">

      {/* Lesson Header */}

      <header className="border-b border-zinc-800 pb-4">
        <p className="text-xs font-bold uppercase tracking-[0.2em] text-cyan-400">
          Advanced Trading Education
        </p>

        <h1 className="mt-2 text-2xl font-bold tracking-tight text-white md:text-3xl">
          {title}
        </h1>

        {description && (
          <p className="mt-2 text-sm leading-6 text-zinc-400 md:text-base">
            {description}
          </p>
        )}
      </header>

      {/* Educational Sections */}

      {sections.map((section, index) => (
        <section
          key={`${section.heading}-${index}`}
          className="border-b border-zinc-800 py-8 md:py-10"
        >
          {section.label && (
            <p className="mb-3 text-xs font-bold uppercase tracking-[0.15em] text-cyan-400">
              {section.label}
            </p>
          )}

          <h2 className="text-2xl font-bold text-white">
            {section.heading}
          </h2>

          {section.paragraphs?.map((paragraph, paragraphIndex) => (
            <p
              key={paragraphIndex}
              className="mt-4 text-base leading-7 text-zinc-400"
            >
              {paragraph}
            </p>
          ))}

          {section.image && (
            <figure className="mt-6">
              <div className="overflow-x-auto rounded-lg education-scrollbar">
                <Image
                  src={section.image}
                  alt={section.imageAlt || section.heading}
                  width={1600}
                  height={900}
                  className="block h-auto w-full min-w-[700px] rounded-lg object-contain md:min-w-0"
                />
              </div>

              <p className="mt-2 text-center text-xs text-zinc-500 md:hidden">
                Swipe horizontally to explore the chart
              </p>

              {section.caption && (
                <figcaption className="mt-3 text-sm leading-6 text-zinc-500">
                  {section.caption}
                </figcaption>
              )}
            </figure>
          )}

          {section.points && section.points.length > 0 && (
            <div className="mt-6 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
              {section.points.map((point, pointIndex) => (
                <div key={pointIndex}>
                  <h3
                    className="text-lg font-bold"
                    style={{ color: point.color || "#ffffff" }}
                  >
                    {point.title}
                  </h3>

                  <p className="mt-2 text-sm leading-7 text-zinc-400">
                    {point.description}
                  </p>
                </div>
              ))}
            </div>
          )}
        </section>
      ))}

      {/* Temporary Support for Existing Lessons */}

      {sections.length === 0 && currentImage && (
        <section className="border-b border-zinc-800 py-8">
          <div className="overflow-hidden rounded-lg">
            <Image
              src={currentImage}
              alt={title}
              width={1200}
              height={800}
              className="block h-auto w-full object-contain"
            />
          </div>

          <div className="mt-4 flex items-center justify-between gap-2">
            <button
              onClick={() =>
                setSlide((prev) =>
                  prev === 0 ? images.length - 1 : prev - 1
                )
              }
              className="rounded-lg border border-zinc-700 px-4 py-2 text-sm font-bold text-white transition hover:border-cyan-400 hover:text-cyan-400"
            >
              ← Previous
            </button>

            <div className="flex items-center gap-2">
              {images.map((_, index) => (
                <button
                  key={index}
                  aria-label={`Go to slide ${index + 1}`}
                  onClick={() => setSlide(index)}
                  className={`h-2.5 w-2.5 rounded-full transition ${
                    slide === index
                      ? "bg-cyan-400"
                      : "bg-zinc-600 hover:bg-zinc-400"
                  }`}
                />
              ))}
            </div>

            <button
              onClick={() =>
                setSlide((prev) =>
                  prev === images.length - 1 ? 0 : prev + 1
                )
              }
              className="rounded-lg border border-zinc-700 px-4 py-2 text-sm font-bold text-white transition hover:border-cyan-400 hover:text-cyan-400"
            >
              Next →
            </button>
          </div>
        </section>
      )}

      {/* Gaby Learning Assistant */}

      <section className="sticky bottom-0 z-40 border-t border-zinc-800 bg-black py-3">
        <div>

          {(loading || gabyAnswer) && (
            <div className="relative mb-3 rounded-xl border border-zinc-600 bg-black p-3">

              {!loading && (
                <button
                  type="button"
                  onClick={() => setGabyAnswer("")}
                  className="absolute right-3 top-3 text-sm text-zinc-400 transition hover:text-white"
                >
                  Close
                </button>
              )}

              <div
                aria-live="polite"
                className="max-h-[400px] overflow-y-auto whitespace-pre-wrap pr-14 text-base leading-6 text-zinc-300 education-scrollbar"
              >
                {loading ? "Gaby is thinking..." : gabyAnswer.replace(/\n{2,}/g, "\n")}
              </div>

            </div>
          )}

          <div className="relative">

            {showQuestions && questions.length > 0 && (
              <div className="absolute bottom-full left-0 z-30 mb-2 w-full max-w-[620px] rounded-2xl border border-zinc-700 bg-[#050816] p-4 shadow-xl sm:p-5">

                <div className="mb-4 flex items-start justify-between gap-3">
                  <p className="text-sm font-bold text-white sm:text-base">
                    Not sure what to ask? Ask me about:
                  </p>

                  <button
                    type="button"
                    onClick={() => setShowQuestions(false)}
                    className="shrink-0 text-sm text-zinc-400 transition hover:text-white"
                  >
                    Close
                  </button>
                </div>

                <div className="grid max-h-[260px] grid-cols-2 gap-2 overflow-y-auto education-scrollbar">
                  {questions.map((question) => (
                    <button
                      key={question}
                      type="button"
                      onClick={() => askGaby(question)}
                      disabled={loading}
                      className="min-h-[60px] rounded-lg border border-zinc-700 bg-[#111827] px-3 py-3 text-center text-xs font-bold text-zinc-200 transition hover:border-cyan-400 hover:text-cyan-400 disabled:opacity-50 sm:text-sm"
                    >
                      {question}
                    </button>
                  ))}
                </div>

              </div>
            )}

            <div className="flex items-center gap-2">
              <input
                value={message}
                onFocus={() => {
                  if (!message.trim() && !loading) {
                    setShowQuestions(true);
                  }
                }}
                onClick={() => {
                  if (!message.trim() && !loading) {
                    setShowQuestions(true);
                  }
                }}
                onChange={(e) => {
                  setMessage(e.target.value);
                  setShowQuestions(!e.target.value.trim() && !loading);
                }}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    askGaby();
                  }

                  if (e.key === "Escape") {
                    setShowQuestions(false);
                  }
                }}
                placeholder={`Ask me about ${title}...`}
                className="h-10 min-w-0 flex-1 rounded-lg border border-cyan-500/30 bg-black px-3 text-base text-white outline-none placeholder:text-zinc-500 shadow-[0_0_8px_rgba(34,211,238,0.12)] transition-all duration-200 hover:border-cyan-500/60 focus:border-cyan-400 focus:shadow-[0_0_15px_rgba(34,211,238,0.25)] sm:h-12 sm:text-sm"
              />

              <button
                onClick={() => askGaby()}
                disabled={loading}
                className="h-10 shrink-0 whitespace-nowrap rounded-lg bg-cyan-500 px-4 text-sm font-bold text-black transition hover:bg-cyan-400 disabled:opacity-50 sm:h-12"
              >
                {loading ? "Wait..." : "Ask"}
              </button>
            </div>

          </div>
        </div>
      </section>
    </article>
  );
}