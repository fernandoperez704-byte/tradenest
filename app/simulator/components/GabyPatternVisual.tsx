"use client";

type Props = {
  type: string;
};

export default function GabyPatternVisual({ type }: Props) {
  const visual = type.toUpperCase();

  if (visual === "DOUBLE_TOP") {
    return (
      <div className="mt-4 overflow-hidden rounded-xl border border-cyan-400/15 bg-[#080f1e]">
        <div className="p-4">
          <svg
            viewBox="0 0 760 360"
            className="h-auto w-full"
            role="img"
          >
            <line
              x1="70"
              y1="85"
              x2="690"
              y2="85"
              stroke="#fb7185"
              strokeWidth="3"
              strokeDasharray="10 7"
            />

            <polyline
              points="70,285 170,205 265,85 365,205 465,85 555,210 650,275 705,315"
              fill="none"
              stroke="#22d3ee"
              strokeWidth="4"
              strokeLinecap="round"
              strokeLinejoin="round"
            />

            <circle
              cx="265"
              cy="85"
              r="8"
              fill="#fb7185"
            />

            <circle
              cx="465"
              cy="85"
              r="8"
              fill="#fb7185"
            />

            <text
              x="365"
              y="55"
              textAnchor="middle"
              fill="#fda4af"
              fontSize="17"
              fontWeight="700"
            >
              RESISTANCE
            </text>

            <text
              x="265"
              y="120"
              textAnchor="middle"
              fill="#fda4af"
              fontSize="15"
              fontWeight="700"
            >
              FIRST TOP
            </text>

            <text
              x="465"
              y="120"
              textAnchor="middle"
              fill="#fda4af"
              fontSize="15"
              fontWeight="700"
            >
              SECOND TOP
            </text>

            <line
              x1="325"
              y1="205"
              x2="565"
              y2="205"
              stroke="#f59e0b"
              strokeWidth="3"
              strokeDasharray="9 7"
            />

            <text
              x="445"
              y="195"
              textAnchor="middle"
              fill="#fbbf24"
              fontSize="15"
              fontWeight="700"
            >
              NECKLINE
            </text>

            <text
              x="650"
              y="250"
              textAnchor="middle"
              fill="#67e8f9"
              fontSize="16"
              fontWeight="700"
            >
              BREAK
            </text>

            <path
              d="M665 260 L665 305"
              stroke="#f43f5e"
              strokeWidth="3"
            />

            <path
              d="M655 294 L665 309 L675 294"
              fill="none"
              stroke="#f43f5e"
              strokeWidth="3"
            />

            <text
              x="380"
              y="345"
              textAnchor="middle"
              fill="#94a3b8"
              fontSize="14"
            >
              First top → Pullback → Second top → Neckline break
            </text>
          </svg>
        </div>
      </div>
    );
  }

  if (visual === "DOUBLE_BOTTOM") {
    return (
      <div className="mt-4 overflow-hidden rounded-xl border border-cyan-400/15 bg-[#080f1e]">
        <div className="p-4">
          <svg
            viewBox="0 0 760 360"
            className="h-auto w-full"
            role="img"
          >
            <line
              x1="70"
              y1="275"
              x2="690"
              y2="275"
              stroke="#34d399"
              strokeWidth="3"
              strokeDasharray="10 7"
            />

            <polyline
              points="70,75 170,155 265,275 365,155 465,275 555,150 650,85 705,45"
              fill="none"
              stroke="#22d3ee"
              strokeWidth="4"
              strokeLinecap="round"
              strokeLinejoin="round"
            />

            <circle
              cx="265"
              cy="275"
              r="8"
              fill="#34d399"
            />

            <circle
              cx="465"
              cy="275"
              r="8"
              fill="#34d399"
            />

            <text
              x="365"
              y="315"
              textAnchor="middle"
              fill="#6ee7b7"
              fontSize="17"
              fontWeight="700"
            >
              SUPPORT
            </text>

            <text
              x="265"
              y="250"
              textAnchor="middle"
              fill="#6ee7b7"
              fontSize="15"
              fontWeight="700"
            >
              FIRST BOTTOM
            </text>

            <text
              x="465"
              y="250"
              textAnchor="middle"
              fill="#6ee7b7"
              fontSize="15"
              fontWeight="700"
            >
              SECOND BOTTOM
            </text>

            <line
              x1="325"
              y1="155"
              x2="565"
              y2="155"
              stroke="#f59e0b"
              strokeWidth="3"
              strokeDasharray="9 7"
            />

            <text
              x="445"
              y="145"
              textAnchor="middle"
              fill="#fbbf24"
              fontSize="15"
              fontWeight="700"
            >
              NECKLINE
            </text>

            <text
              x="650"
              y="105"
              textAnchor="middle"
              fill="#67e8f9"
              fontSize="16"
              fontWeight="700"
            >
              BREAK
            </text>

            <path
              d="M665 100 L665 55"
              stroke="#34d399"
              strokeWidth="3"
            />

            <path
              d="M655 66 L665 51 L675 66"
              fill="none"
              stroke="#34d399"
              strokeWidth="3"
            />

            <text
              x="380"
              y="345"
              textAnchor="middle"
              fill="#94a3b8"
              fontSize="14"
            >
              First bottom → Bounce → Second bottom → Neckline break
            </text>
          </svg>
        </div>
      </div>
    );
  }

  if (visual === "ASCENDING_TRIANGLE") {
    return (
      <div className="mt-4 overflow-hidden rounded-xl border border-cyan-400/15 bg-[#080f1e]">
        <div className="p-4">
          <svg
            viewBox="0 0 760 360"
            className="h-auto w-full"
            role="img"
          >
            <line
              x1="90"
              y1="85"
              x2="625"
              y2="85"
              stroke="#fb7185"
              strokeWidth="3"
              strokeDasharray="10 7"
            />

            <line
              x1="90"
              y1="285"
              x2="625"
              y2="85"
              stroke="#34d399"
              strokeWidth="3"
              strokeDasharray="10 7"
            />

            <polyline
              points="90,280 175,85 250,225 335,85 405,175 490,85 550,130 625,85 700,45"
              fill="none"
              stroke="#22d3ee"
              strokeWidth="4"
              strokeLinecap="round"
              strokeLinejoin="round"
            />

            <circle cx="175" cy="85" r="7" fill="#fb7185" />
            <circle cx="335" cy="85" r="7" fill="#fb7185" />
            <circle cx="490" cy="85" r="7" fill="#fb7185" />

            <circle cx="250" cy="225" r="7" fill="#34d399" />
            <circle cx="405" cy="175" r="7" fill="#34d399" />
            <circle cx="550" cy="130" r="7" fill="#34d399" />

            <text
              x="275"
              y="60"
              textAnchor="middle"
              fill="#fda4af"
              fontSize="17"
              fontWeight="700"
            >
              FLAT RESISTANCE
            </text>

            <text
              x="275"
              y="285"
              textAnchor="middle"
              fill="#6ee7b7"
              fontSize="17"
              fontWeight="700"
            >
              RISING LOWS
            </text>

            <text
              x="655"
              y="70"
              fill="#67e8f9"
              fontSize="16"
              fontWeight="700"
            >
              BREAKOUT
            </text>

            <path
              d="M650 105 L690 60"
              stroke="#34d399"
              strokeWidth="3"
            />

            <path
              d="M674 65 L694 56 L687 77"
              fill="none"
              stroke="#34d399"
              strokeWidth="3"
            />

            <text
              x="380"
              y="340"
              textAnchor="middle"
              fill="#94a3b8"
              fontSize="14"
            >
              Flat resistance + Higher lows → Price compression
            </text>
          </svg>
        </div>
      </div>
    );
  }

  if (visual === "DESCENDING_TRIANGLE") {
    return (
      <div className="mt-4 overflow-hidden rounded-xl border border-cyan-400/15 bg-[#080f1e]">
        <div className="p-4">
          <svg
            viewBox="0 0 760 360"
            className="h-auto w-full"
            role="img"
          >
            <line
              x1="90"
              y1="275"
              x2="625"
              y2="275"
              stroke="#34d399"
              strokeWidth="3"
              strokeDasharray="10 7"
            />

            <line
              x1="90"
              y1="75"
              x2="625"
              y2="275"
              stroke="#fb7185"
              strokeWidth="3"
              strokeDasharray="10 7"
            />

            <polyline
              points="90,80 175,275 250,135 335,275 405,185 490,275 550,230 625,275 700,320"
              fill="none"
              stroke="#22d3ee"
              strokeWidth="4"
              strokeLinecap="round"
              strokeLinejoin="round"
            />

            <circle cx="175" cy="275" r="7" fill="#34d399" />
            <circle cx="335" cy="275" r="7" fill="#34d399" />
            <circle cx="490" cy="275" r="7" fill="#34d399" />

            <circle cx="250" cy="135" r="7" fill="#fb7185" />
            <circle cx="405" cy="185" r="7" fill="#fb7185" />
            <circle cx="550" cy="230" r="7" fill="#fb7185" />

            <text
              x="275"
              y="315"
              textAnchor="middle"
              fill="#6ee7b7"
              fontSize="17"
              fontWeight="700"
            >
              FLAT SUPPORT
            </text>

            <text
              x="275"
              y="65"
              textAnchor="middle"
              fill="#fda4af"
              fontSize="17"
              fontWeight="700"
            >
              FALLING HIGHS
            </text>

            <text
              x="650"
              y="300"
              fill="#67e8f9"
              fontSize="16"
              fontWeight="700"
            >
              BREAKDOWN
            </text>

            <path
              d="M650 260 L690 305"
              stroke="#f43f5e"
              strokeWidth="3"
            />

            <path
              d="M684 286 L694 309 L672 302"
              fill="none"
              stroke="#f43f5e"
              strokeWidth="3"
            />

            <text
              x="380"
              y="345"
              textAnchor="middle"
              fill="#94a3b8"
              fontSize="14"
            >
              Flat support + Lower highs → Price compression
            </text>
          </svg>
        </div>
      </div>
    );
  }

  if (visual === "ROUNDED_TOP") {
    return (
      <div className="mt-4 overflow-hidden rounded-xl border border-cyan-400/15 bg-[#080f1e]">
        <div className="p-4">
          <svg
            viewBox="0 0 760 360"
            className="h-auto w-full"
            role="img"
          >
            <path
              d="M70 285 C140 220 185 145 260 100 C330 58 430 58 500 100 C575 145 620 220 690 285"
              fill="none"
              stroke="#22d3ee"
              strokeWidth="4"
              strokeLinecap="round"
            />

            <circle
              cx="380"
              cy="70"
              r="8"
              fill="#f59e0b"
            />

            <text
              x="380"
              y="45"
              textAnchor="middle"
              fill="#fbbf24"
              fontSize="17"
              fontWeight="700"
            >
              MOMENTUM SLOWS
            </text>

            <text
              x="150"
              y="205"
              textAnchor="middle"
              fill="#6ee7b7"
              fontSize="16"
              fontWeight="700"
            >
              BUYERS IN CONTROL
            </text>

            <text
              x="610"
              y="205"
              textAnchor="middle"
              fill="#fda4af"
              fontSize="16"
              fontWeight="700"
            >
              SELLERS TAKE CONTROL
            </text>

            <path
              d="M605 245 L655 295"
              stroke="#f43f5e"
              strokeWidth="3"
            />

            <path
              d="M647 276 L659 299 L636 291"
              fill="none"
              stroke="#f43f5e"
              strokeWidth="3"
            />

            <text
              x="380"
              y="335"
              textAnchor="middle"
              fill="#94a3b8"
              fontSize="14"
            >
              Rising momentum → Gradual top → Weakening momentum
            </text>
          </svg>
        </div>
      </div>
    );
  }

  if (visual === "ROUNDED_BOTTOM") {
    return (
      <div className="mt-4 overflow-hidden rounded-xl border border-cyan-400/15 bg-[#080f1e]">
        <div className="p-4">
          <svg
            viewBox="0 0 760 360"
            className="h-auto w-full"
            role="img"
          >
            <path
              d="M70 75 C140 140 185 215 260 260 C330 302 430 302 500 260 C575 215 620 140 690 75"
              fill="none"
              stroke="#22d3ee"
              strokeWidth="4"
              strokeLinecap="round"
            />

            <circle
              cx="380"
              cy="290"
              r="8"
              fill="#f59e0b"
            />

            <text
              x="380"
              y="325"
              textAnchor="middle"
              fill="#fbbf24"
              fontSize="17"
              fontWeight="700"
            >
              MOMENTUM SHIFTS
            </text>

            <text
              x="150"
              y="155"
              textAnchor="middle"
              fill="#fda4af"
              fontSize="16"
              fontWeight="700"
            >
              SELLERS IN CONTROL
            </text>

            <text
              x="610"
              y="155"
              textAnchor="middle"
              fill="#6ee7b7"
              fontSize="16"
              fontWeight="700"
            >
              BUYERS TAKE CONTROL
            </text>

            <path
              d="M605 115 L655 65"
              stroke="#34d399"
              strokeWidth="3"
            />

            <path
              d="M636 72 L659 61 L648 84"
              fill="none"
              stroke="#34d399"
              strokeWidth="3"
            />

            <text
              x="380"
              y="345"
              textAnchor="middle"
              fill="#94a3b8"
              fontSize="14"
            >
              Falling momentum → Gradual bottom → Strengthening momentum
            </text>
          </svg>
        </div>
      </div>
    );
  }

  if (visual === "HEAD_AND_SHOULDERS") {
    return (
      <div className="mt-4 overflow-hidden rounded-xl border border-cyan-400/15 bg-[#080f1e]">
        <div className="p-4">
          <svg
            viewBox="0 0 760 360"
            className="h-auto w-full"
            role="img"
          >
            <polyline
              points="60,285 125,220 190,125 255,220 380,55 505,220 570,125 635,220 705,290"
              fill="none"
              stroke="#22d3ee"
              strokeWidth="4"
              strokeLinecap="round"
              strokeLinejoin="round"
            />

            <circle cx="190" cy="125" r="8" fill="#fb7185" />
            <circle cx="380" cy="55" r="8" fill="#fb7185" />
            <circle cx="570" cy="125" r="8" fill="#fb7185" />

            <text
              x="190"
              y="105"
              textAnchor="middle"
              fill="#fda4af"
              fontSize="15"
              fontWeight="700"
            >
              LEFT SHOULDER
            </text>

            <text
              x="380"
              y="35"
              textAnchor="middle"
              fill="#fda4af"
              fontSize="16"
              fontWeight="700"
            >
              HEAD
            </text>

            <text
              x="570"
              y="105"
              textAnchor="middle"
              fill="#fda4af"
              fontSize="15"
              fontWeight="700"
            >
              RIGHT SHOULDER
            </text>

            <line
              x1="230"
              y1="220"
              x2="640"
              y2="220"
              stroke="#f59e0b"
              strokeWidth="3"
              strokeDasharray="9 7"
            />

            <text
              x="435"
              y="210"
              textAnchor="middle"
              fill="#fbbf24"
              fontSize="15"
              fontWeight="700"
            >
              NECKLINE
            </text>

            <text
              x="660"
              y="255"
              textAnchor="middle"
              fill="#67e8f9"
              fontSize="16"
              fontWeight="700"
            >
              BREAK
            </text>

            <path
              d="M665 245 L665 300"
              stroke="#f43f5e"
              strokeWidth="3"
            />

            <path
              d="M655 289 L665 304 L675 289"
              fill="none"
              stroke="#f43f5e"
              strokeWidth="3"
            />

            <text
              x="380"
              y="345"
              textAnchor="middle"
              fill="#94a3b8"
              fontSize="14"
            >
              Left shoulder → Head → Right shoulder → Neckline break
            </text>
          </svg>
        </div>
      </div>
    );
  }

  if (visual === "INVERSE_HEAD_AND_SHOULDERS") {
    return (
      <div className="mt-4 overflow-hidden rounded-xl border border-cyan-400/15 bg-[#080f1e]">
        <div className="p-4">
          <svg
            viewBox="0 0 760 360"
            className="h-auto w-full"
            role="img"
          >
            <polyline
              points="60,75 125,140 190,235 255,140 380,305 505,140 570,235 635,140 705,70"
              fill="none"
              stroke="#22d3ee"
              strokeWidth="4"
              strokeLinecap="round"
              strokeLinejoin="round"
            />

            <circle cx="190" cy="235" r="8" fill="#34d399" />
            <circle cx="380" cy="305" r="8" fill="#34d399" />
            <circle cx="570" cy="235" r="8" fill="#34d399" />

            <text
              x="190"
              y="265"
              textAnchor="middle"
              fill="#6ee7b7"
              fontSize="15"
              fontWeight="700"
            >
              LEFT SHOULDER
            </text>

            <text
              x="380"
              y="335"
              textAnchor="middle"
              fill="#6ee7b7"
              fontSize="16"
              fontWeight="700"
            >
              HEAD
            </text>

            <text
              x="570"
              y="265"
              textAnchor="middle"
              fill="#6ee7b7"
              fontSize="15"
              fontWeight="700"
            >
              RIGHT SHOULDER
            </text>

            <line
              x1="230"
              y1="140"
              x2="640"
              y2="140"
              stroke="#f59e0b"
              strokeWidth="3"
              strokeDasharray="9 7"
            />

            <text
              x="435"
              y="130"
              textAnchor="middle"
              fill="#fbbf24"
              fontSize="15"
              fontWeight="700"
            >
              NECKLINE
            </text>

            <text
              x="660"
              y="110"
              textAnchor="middle"
              fill="#67e8f9"
              fontSize="16"
              fontWeight="700"
            >
              BREAK
            </text>

            <path
              d="M665 120 L665 65"
              stroke="#34d399"
              strokeWidth="3"
            />

            <path
              d="M655 76 L665 61 L675 76"
              fill="none"
              stroke="#34d399"
              strokeWidth="3"
            />

            <text
              x="380"
              y="25"
              textAnchor="middle"
              fill="#94a3b8"
              fontSize="14"
            >
              Left shoulder → Head → Right shoulder → Neckline break
            </text>
          </svg>
        </div>
      </div>
    );
  }

  return null;
}