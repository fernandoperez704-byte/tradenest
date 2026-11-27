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
    <aside className="flex h-fit min-w-0 self-start flex-col bg-black px-3 py-4 xl:sticky xl:top-0 xl:border-r xl:border-zinc-800 xl:pr-4">

      {/* Sidebar Header */}

      <div className="shrink-0">
        <div className="mb-4 flex items-center justify-between gap-2">
          <p className="text-xs font-bold uppercase tracking-[0.15em] text-cyan-400">
            Lessons
          </p>

          {mode === "BASIC" && (
            <p className="shrink-0 text-xs font-bold text-cyan-400">
              {completedLessons.length}/14
            </p>
          )}
        </div>

        {/* Learning Mode */}

        <div className="mb-4 grid grid-cols-2 gap-2 border-b border-zinc-800 pb-4">
          <Link
            href="/learn"
            className={`rounded-md border px-2 py-2 text-center text-xs font-bold transition ${
              mode === "BASIC"
                ? "border-cyan-400 bg-cyan-400 text-black"
                : "border-zinc-700 text-zinc-400 hover:border-cyan-400 hover:text-cyan-400"
            }`}
          >
            Basic
          </Link>

          <Link
            href={isAdvancedUnlocked ? "/learn/advanced" : "#"}
            className={`rounded-md border px-2 py-2 text-center text-xs font-bold transition ${
              mode === "ADVANCED"
                ? "border-cyan-400 bg-cyan-400 text-black"
                : isAdvancedUnlocked
                ? "border-zinc-700 text-zinc-400 hover:border-cyan-400 hover:text-cyan-400"
                : "cursor-not-allowed border-zinc-800 text-zinc-600"
            }`}
          >
            Advanced
          </Link>
        </div>
      </div>

      {/* Lesson Navigation */}

      <nav className="w-full space-y-5 xl:space-y-1">
        {lessons.map((lesson) => {
          const isCompleted = completedLessons.includes(lesson.id);
          const isActive = activeLesson === lesson.id;

          return (
            <button
              key={lesson.id}
              type="button"
              onClick={() => setActiveLesson(lesson.id)}
              aria-current={isActive ? "page" : undefined}
              className={`block min-h-[48px] w-full border-b border-white/10 px-1 py-3 text-left text-base font-black transition-colors xl:min-h-0 xl:rounded-r-md xl:border-b-0 xl:border-l-[3px] xl:px-3 xl:text-sm xl:font-medium ${
                isActive
                  ? "text-cyan-400 xl:border-cyan-400 xl:bg-cyan-400/10"
                  : "text-white hover:text-cyan-400 xl:border-transparent xl:text-zinc-400 xl:hover:bg-zinc-900 xl:hover:text-white"
              }`}
            >
              <div className="flex items-center justify-between gap-2">
                <span className="leading-5">
                  {lesson.label}
                </span>

                {mode === "BASIC" && isCompleted && (
                  <span className="shrink-0 font-bold text-emerald-400">
                    ✓
                  </span>
                )}
              </div>
            </button>
          );
        })}
      </nav>
    </aside>
  );
}