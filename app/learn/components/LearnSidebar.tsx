"use client";

import Link from "next/link";

type LessonItem = {
  id: string;
  label: string;
};

type LearnSidebarProps = {
  mode: "BASIC" | "ADVANCED";
  lessons: LessonItem[];
  activeLesson: string;
  setActiveLesson: (lesson: string) => void;
  completedLessons?: string[];
  isAdvancedUnlocked?: boolean;
};

export default function LearnSidebar({
  mode,
  lessons,
  activeLesson,
  setActiveLesson,
  completedLessons = [],
  isAdvancedUnlocked = false,
}: LearnSidebarProps) {
  return (
    <aside className="bg-[#111827] border border-zinc-700 rounded-2xl p-4 max-h-[calc(100vh-120px)] overflow-y-auto scrollbar-hide">
      <div className="mb-4 flex items-center justify-between gap-3">
        <p className="text-sm font-black tracking-wide text-zinc-500">
          LESSONS
        </p>

        {mode === "BASIC" && (
          <p className="shrink-0 rounded-xl border border-cyan-400/20 bg-cyan-500/10 px-3 py-1.5 text-sm font-black text-cyan-300 shadow-[0_0_15px_rgba(34,211,238,0.15)]">
            {completedLessons.length}/14
          </p>
        )}
      </div>

      <div className="mb-4 grid grid-cols-2 gap-2">
        <Link
          href="/learn"
          className={`rounded-xl border px-3 py-2 text-center text-xs font-black transition-all ${
            mode === "BASIC"
              ? "border-cyan-400 bg-cyan-400 text-black"
              : "border-white/10 bg-[#0f172a] text-zinc-400 hover:border-cyan-400/40 hover:text-cyan-300"
          }`}
        >
          Basic
        </Link>

        <Link
          href={isAdvancedUnlocked ? "/learn/advanced" : "#"}
          className={`rounded-xl border px-3 py-2 text-center text-xs font-black transition-all ${
            mode === "ADVANCED"
              ? "border-cyan-400 bg-cyan-400 text-black"
              : isAdvancedUnlocked
              ? "border-white/10 bg-[#0f172a] text-zinc-400 hover:border-cyan-400/40 hover:text-cyan-300"
              : "cursor-not-allowed border-white/5 bg-[#0b0f1a] text-zinc-600"
          }`}
        >
          Advanced
        </Link>
      </div>

      <div className="space-y-2">
        {lessons.map((lesson) => {
          const isCompleted = completedLessons.includes(lesson.id);
          const isActive = activeLesson === lesson.id;

          return (
            <button
              key={lesson.id}
              onClick={() => setActiveLesson(lesson.id)}
              className={`group relative w-full overflow-hidden rounded-2xl border px-4 py-4 text-left text-sm font-black tracking-wide transition-all duration-300 ${
                isActive
                  ? "border-cyan-400 bg-cyan-400 text-black shadow-[0_0_25px_rgba(34,211,238,0.35)]"
                  : "border-white/5 bg-[#0f172a] text-zinc-400 hover:border-cyan-400/30 hover:bg-[#131c2b] hover:text-cyan-300"
              }`}
            >
              <div className="flex items-center justify-between gap-2">
                <span className="leading-5">{lesson.label}</span>

                {mode === "BASIC" && isCompleted && (
                  <span className="shrink-0 text-emerald-400 font-black">
                    ✓
                  </span>
                )}
              </div>
            </button>
          );
        })}
      </div>
    </aside>
  );
}