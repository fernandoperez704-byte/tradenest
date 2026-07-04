"use client";

import Image from "next/image";
import { useState } from "react";



type AdvancedLessonLayoutProps = {
  title: string;
  images: string[];
  questions: string[];
};

export default function AdvancedLessonLayout({
  title,
  images,
  questions,
}: AdvancedLessonLayoutProps) {

const [slide, setSlide] = useState(0);
const [message, setMessage] = useState("");
const [gabyAnswer, setGabyAnswer] = useState(
  "Ask me anything about this lesson. I'll help you understand the concepts and answer any follow-up questions."
);
const [loading, setLoading] = useState(false);

  const currentImage = images[slide];

async function askGaby(question?: string) {
  const finalQuestion = question || message;

  if (!finalQuestion.trim()) return;

  setLoading(true);

  try {
    const res = await fetch("/api/gaby", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        message: finalQuestion,
        lesson: `advanced-${title}`,
      }),
    });

    const data = await res.json();

    setGabyAnswer(data.answer || "Gaby could not respond right now.");
    setMessage("");
  } catch (error) {
    setGabyAnswer("Gaby is having trouble responding right now.");
  } finally {
    setLoading(false);
  }
}

  return (
    <div className="rounded-[24px] md:rounded-[40px] border border-white/10 bg-[#0b0f1a] p-5 md:p-8 shadow-[0_20px_80px_rgba(0,0,0,0.45)]">
      <div className="grid grid-cols-1 xl:grid-cols-[420px_minmax(0,1fr)] gap-6 items-start">

<div className="flex h-[646px] min-h-0 flex-col rounded-2xl border border-cyan-500/20 bg-[#111827] p-5">


  <div className="h-[250px] overflow-y-auto pr-1 scrollbar-hide flex flex-wrap gap-2">
    {questions.map((question) => (

<button
  key={question}
  onClick={() => askGaby(question)}
  className="rounded-lg border border-zinc-600 bg-[#0f172a] px-4 py-3 text-sm font-black text-zinc-200 transition-all hover:border-cyan-400 hover:text-cyan-300"
>
  {question}
</button>

    ))}

  </div>

  <div className="mt-6 flex flex-1 flex-col border-t border-white/10 pt-5">

<div className="flex-1 min-h-0 overflow-y-auto rounded-2xl border border-white/10 bg-[#020617] px-5 py-6">

<p className="mb-4 text-base font-black text-cyan-300">
  Gaby
</p>

<p className="whitespace-pre-wrap text-[16px] leading-6 text-zinc-100">
  {loading ? "Gaby is thinking..." : gabyAnswer}
</p>

</div>

  <div className="mt-auto flex gap-2 pt-4">

<input
  value={message}
  onChange={(e) => setMessage(e.target.value)}
  placeholder={`Ask me about ${title}...`}
 className="min-w-0 flex-1 rounded-xl border border-zinc-700 bg-[#020617] px-4 py-3 text-sm text-white outline-none placeholder:text-zinc-500 transition-all duration-200 hover:border-cyan-400 hover:shadow-[0_0_18px_rgba(34,211,238,0.18)] focus:border-cyan-400 focus:shadow-[0_0_22px_rgba(34,211,238,0.28)]"
/>
<button
  onClick={() => askGaby()}
  disabled={loading}
  className="rounded-xl bg-cyan-500 px-5 py-3 font-black text-black transition-all duration-200 hover:-translate-y-[1px] hover:bg-cyan-400 hover:shadow-[0_0_18px_rgba(34,211,238,0.25)] disabled:opacity-50"
>
  {loading ? "Thinking..." : "Ask"}
</button>

    </div>

  </div>

</div>

        <div className="overflow-hidden rounded-[28px] border border-cyan-500/10 bg-black">
          <Image
            src={currentImage}
            alt={title}
            width={1200}
            height={800}
            className="block w-full h-auto md:h-[560px] object-contain md:object-fill bg-white"
          />

          <div className="flex items-center justify-between gap-2 border-t border-white/10 bg-[#050816] px-2 md:px-6 py-4">
            <button
              onClick={() =>
                setSlide((prev) =>
                  prev === 0 ? images.length - 1 : prev - 1
                )
              }
              className="rounded-2xl border border-white/10 bg-[#0b1120] px-3 py-3 text-xs md:px-5 md:text-base font-bold text-white transition-all hover:border-cyan-400 hover:text-cyan-300"
            >
              ← Previous
            </button>

            <div className="flex items-center gap-1 md:gap-3">
              {images.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setSlide(index)}
                  className={`h-3 w-3 rounded-full transition-all ${
                    slide === index
                      ? "bg-cyan-400 scale-125"
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
              className="rounded-2xl border border-white/10 bg-[#0b1120] px-3 py-3 text-xs md:px-5 md:text-base font-bold text-white transition-all hover:border-cyan-400 hover:text-cyan-300"
            >
              Next →
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}