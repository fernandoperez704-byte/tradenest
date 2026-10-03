"use client";

type Props = {
  type: string;
};

export default function GabyCandlestickVisual({ type }: Props) {
  const visual = type.toUpperCase();

  if (visual === "CANDLE_BASICS") {
    return (
      <div className="mt-4 overflow-hidden rounded-xl border border-cyan-400/15 bg-[#080f1e]">
        <div className="p-4">
          <svg viewBox="0 0 760 390" className="h-auto w-full" role="img">
            <line
              x1="380"
              y1="55"
              x2="380"
              y2="335"
              stroke="#94a3b8"
              strokeWidth="4"
              strokeLinecap="round"
            />

            <rect
              x="325"
              y="135"
              width="110"
              height="120"
              rx="4"
              fill="#10b981"
              opacity="0.9"
            />

            <line x1="380" y1="55" x2="380" y2="135" stroke="#34d399" strokeWidth="4" />
            <line x1="380" y1="255" x2="380" y2="335" stroke="#34d399" strokeWidth="4" />

            <circle cx="380" cy="55" r="6" fill="#22d3ee" />
            <circle cx="380" cy="335" r="6" fill="#22d3ee" />

            <text x="405" y="61" fill="#67e8f9" fontSize="17" fontWeight="700">
              HIGH
            </text>

            <text x="405" y="330" fill="#67e8f9" fontSize="17" fontWeight="700">
              LOW
            </text>

            <text x="455" y="100" fill="#94a3b8" fontSize="16" fontWeight="700">
              UPPER WICK
            </text>

            <line
              x1="445"
              y1="95"
              x2="395"
              y2="95"
              stroke="#64748b"
              strokeWidth="2"
              strokeDasharray="6 5"
            />

            <text x="455" y="300" fill="#94a3b8" fontSize="16" fontWeight="700">
              LOWER WICK
            </text>

            <line
              x1="445"
              y1="295"
              x2="395"
              y2="295"
              stroke="#64748b"
              strokeWidth="2"
              strokeDasharray="6 5"
            />

            <text x="270" y="143" textAnchor="end" fill="#6ee7b7" fontSize="17" fontWeight="700">
              CLOSE
            </text>

            <line x1="280" y1="138" x2="320" y2="138" stroke="#34d399" strokeWidth="2" />

            <text x="270" y="258" textAnchor="end" fill="#6ee7b7" fontSize="17" fontWeight="700">
              OPEN
            </text>

            <line x1="280" y1="253" x2="320" y2="253" stroke="#34d399" strokeWidth="2" />

            <text x="380" y="202" textAnchor="middle" fill="#ecfdf5" fontSize="18" fontWeight="800">
              BODY
            </text>

            <text x="380" y="375" textAnchor="middle" fill="#94a3b8" fontSize="14">
              High • Open • Close • Low
            </text>
          </svg>
        </div>
      </div>
    );
  }

  if (visual === "BULLISH_CANDLE" || visual === "BEARISH_CANDLE") {
    const bullish = visual === "BULLISH_CANDLE";

    return (
      <div className="mt-4 overflow-hidden rounded-xl border border-cyan-400/15 bg-[#080f1e]">
        <div className="p-4">
          <svg viewBox="0 0 760 390" className="h-auto w-full" role="img">
            <line
              x1="380"
              y1="45"
              x2="380"
              y2="340"
              stroke={bullish ? "#34d399" : "#fb7185"}
              strokeWidth="4"
              strokeLinecap="round"
            />
            <rect
              x="325"
              y="120"
              width="110"
              height="150"
              rx="4"
              fill={bullish ? "#10b981" : "#ef4444"}
              opacity="0.9"
            />
            <circle cx="380" cy="45" r="6" fill="#22d3ee" />
            <circle cx="380" cy="340" r="6" fill="#22d3ee" />
            <text x="405" y="51" fill="#67e8f9" fontSize="16" fontWeight="700">
              HIGH
            </text>
            <text x="405" y="345" fill="#67e8f9" fontSize="16" fontWeight="700">
              LOW
            </text>
            <text
              x="270"
              y="128"
              textAnchor="end"
              fill={bullish ? "#6ee7b7" : "#fda4af"}
              fontSize="17"
              fontWeight="700"
            >
              {bullish ? "CLOSE" : "OPEN"}
            </text>
            <line
              x1="280"
              y1="123"
              x2="320"
              y2="123"
              stroke={bullish ? "#34d399" : "#fb7185"}
              strokeWidth="2"
            />
            <text
              x="270"
              y="273"
              textAnchor="end"
              fill={bullish ? "#6ee7b7" : "#fda4af"}
              fontSize="17"
              fontWeight="700"
            >
              {bullish ? "OPEN" : "CLOSE"}
            </text>
            <line
              x1="280"
              y1="268"
              x2="320"
              y2="268"
              stroke={bullish ? "#34d399" : "#fb7185"}
              strokeWidth="2"
            />
            <path
              d={bullish ? "M500 260 L500 135" : "M500 130 L500 255"}
              stroke="#22d3ee"
              strokeWidth="4"
              strokeLinecap="round"
            />
            <path
              d={
                bullish
                  ? "M488 150 L500 132 L512 150"
                  : "M488 240 L500 258 L512 240"
              }
              fill="none"
              stroke="#22d3ee"
              strokeWidth="4"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <text
              x="525"
              y="195"
              fill="#67e8f9"
              fontSize="16"
              fontWeight="700"
            >
              {bullish ? "PRICE MOVED UP" : "PRICE MOVED DOWN"}
            </text>
            <text
              x="380"
              y="375"
              textAnchor="middle"
              fill={bullish ? "#6ee7b7" : "#fda4af"}
              fontSize="16"
              fontWeight="700"
            >
              {bullish
                ? "Opened lower → Closed higher"
                : "Opened higher → Closed lower"}
            </text>
          </svg>
        </div>
      </div>
    );
  }

  if (visual === "DOJI") {
    return (
      <div className="mt-4 overflow-hidden rounded-xl border border-cyan-400/15 bg-[#080f1e]">
        <div className="p-4">
          <svg viewBox="0 0 760 390" className="h-auto w-full" role="img">
            <line
              x1="380"
              y1="55"
              x2="380"
              y2="335"
              stroke="#a78bfa"
              strokeWidth="4"
              strokeLinecap="round"
            />

            <rect
              x="325"
              y="190"
              width="110"
              height="10"
              rx="3"
              fill="#a78bfa"
            />

            <text x="405" y="61" fill="#67e8f9" fontSize="17" fontWeight="700">
              HIGH
            </text>

            <text x="405" y="330" fill="#67e8f9" fontSize="17" fontWeight="700">
              LOW
            </text>

            <text x="275" y="185" textAnchor="end" fill="#c4b5fd" fontSize="17" fontWeight="700">
              OPEN
            </text>

            <text x="275" y="215" textAnchor="end" fill="#c4b5fd" fontSize="17" fontWeight="700">
              CLOSE
            </text>

            <line
              x1="285"
              y1="195"
              x2="320"
              y2="195"
              stroke="#a78bfa"
              strokeWidth="2"
            />

            <text x="455" y="150" fill="#94a3b8" fontSize="16" fontWeight="700">
              UPPER WICK
            </text>

            <line
              x1="445"
              y1="145"
              x2="395"
              y2="145"
              stroke="#64748b"
              strokeWidth="2"
              strokeDasharray="6 5"
            />

            <text x="455" y="255" fill="#94a3b8" fontSize="16" fontWeight="700">
              LOWER WICK
            </text>

            <line
              x1="445"
              y1="250"
              x2="395"
              y2="250"
              stroke="#64748b"
              strokeWidth="2"
              strokeDasharray="6 5"
            />

            <text x="380" y="365" textAnchor="middle" fill="#c4b5fd" fontSize="16" fontWeight="700">
              Open and close are at or near the same price
            </text>
          </svg>
        </div>
      </div>
    );
  }


  if (visual === "HAMMER") {
    return (
      <div className="mt-4 overflow-hidden rounded-xl border border-cyan-400/15 bg-[#080f1e]">
        <div className="p-4">
          <svg viewBox="0 0 760 390" className="h-auto w-full" role="img">
            <line
              x1="380"
              y1="80"
              x2="380"
              y2="325"
              stroke="#34d399"
              strokeWidth="4"
              strokeLinecap="round"
            />

            <rect
              x="325"
              y="105"
              width="110"
              height="65"
              rx="4"
              fill="#10b981"
              opacity="0.9"
            />

            <text x="455" y="135" fill="#6ee7b7" fontSize="16" fontWeight="700">
              SMALL BODY
            </text>

            <line
              x1="445"
              y1="130"
              x2="435"
              y2="130"
              stroke="#34d399"
              strokeWidth="2"
            />

            <text x="455" y="255" fill="#94a3b8" fontSize="16" fontWeight="700">
              LONG LOWER WICK
            </text>

            <line
              x1="445"
              y1="250"
              x2="395"
              y2="250"
              stroke="#64748b"
              strokeWidth="2"
              strokeDasharray="6 5"
            />

            <path
              d="M300 300 L300 210"
              stroke="#22d3ee"
              strokeWidth="3"
            />

            <path
              d="M290 225 L300 207 L310 225"
              fill="none"
              stroke="#22d3ee"
              strokeWidth="3"
            />

            <text x="280" y="345" textAnchor="middle" fill="#67e8f9" fontSize="15" fontWeight="700">
              PRICE REJECTION
            </text>

            <text x="380" y="365" textAnchor="middle" fill="#94a3b8" fontSize="14">
              Long lower wick • Small body near the top of the range
            </text>
          </svg>
        </div>
      </div>
    );
  }

  if (visual === "SHOOTING_STAR") {
    return (
      <div className="mt-4 overflow-hidden rounded-xl border border-cyan-400/15 bg-[#080f1e]">
        <div className="p-4">
          <svg viewBox="0 0 760 390" className="h-auto w-full" role="img">
            <line
              x1="380"
              y1="65"
              x2="380"
              y2="310"
              stroke="#fb7185"
              strokeWidth="4"
              strokeLinecap="round"
            />

            <rect
              x="325"
              y="220"
              width="110"
              height="65"
              rx="4"
              fill="#ef4444"
              opacity="0.9"
            />

            <text x="455" y="255" fill="#fda4af" fontSize="16" fontWeight="700">
              SMALL BODY
            </text>

            <line
              x1="445"
              y1="250"
              x2="435"
              y2="250"
              stroke="#fb7185"
              strokeWidth="2"
            />

            <text x="455" y="135" fill="#94a3b8" fontSize="16" fontWeight="700">
              LONG UPPER WICK
            </text>

            <line
              x1="445"
              y1="130"
              x2="395"
              y2="130"
              stroke="#64748b"
              strokeWidth="2"
              strokeDasharray="6 5"
            />

            <path
              d="M300 90 L300 180"
              stroke="#22d3ee"
              strokeWidth="3"
            />

            <path
              d="M290 165 L300 183 L310 165"
              fill="none"
              stroke="#22d3ee"
              strokeWidth="3"
            />

            <text x="280" y="65" textAnchor="middle" fill="#67e8f9" fontSize="15" fontWeight="700">
              PRICE REJECTION
            </text>

            <text x="380" y="365" textAnchor="middle" fill="#94a3b8" fontSize="14">
              Long upper wick • Small body near the bottom of the range
            </text>
          </svg>
        </div>
      </div>
    );
  }

  if (visual === "ENGULFING_BULLISH" || visual === "ENGULFING_BEARISH") {
    const bullish = visual === "ENGULFING_BULLISH";

    return (
      <div className="mt-4 overflow-hidden rounded-xl border border-cyan-400/15 bg-[#080f1e]">
        <div className="p-4">
          <svg viewBox="0 0 760 390" className="h-auto w-full" role="img">
            <line
              x1="300"
              y1="115"
              x2="300"
              y2="285"
              stroke={bullish ? "#fb7185" : "#34d399"}
              strokeWidth="4"
              strokeLinecap="round"
            />

            <rect
              x="265"
              y="155"
              width="70"
              height="90"
              rx="4"
              fill={bullish ? "#ef4444" : "#10b981"}
              opacity="0.9"
            />

            <line
              x1="455"
              y1="65"
              x2="455"
              y2="325"
              stroke={bullish ? "#34d399" : "#fb7185"}
              strokeWidth="4"
              strokeLinecap="round"
            />

            <rect
              x="405"
              y="105"
              width="100"
              height="180"
              rx="4"
              fill={bullish ? "#10b981" : "#ef4444"}
              opacity="0.9"
            />

            <text
              x="300"
              y="315"
              textAnchor="middle"
              fill={bullish ? "#fda4af" : "#6ee7b7"}
              fontSize="15"
              fontWeight="700"
            >
              FIRST CANDLE
            </text>

            <text
              x="455"
              y="350"
              textAnchor="middle"
              fill={bullish ? "#6ee7b7" : "#fda4af"}
              fontSize="15"
              fontWeight="700"
            >
              ENGULFING CANDLE
            </text>

            <line
              x1="385"
              y1="105"
              x2="385"
              y2="285"
              stroke="#67e8f9"
              strokeWidth="2"
              strokeDasharray="6 5"
            />

            <path
              d="M375 115 L385 100 L395 115"
              fill="none"
              stroke="#67e8f9"
              strokeWidth="2"
            />

            <path
              d="M375 275 L385 290 L395 275"
              fill="none"
              stroke="#67e8f9"
              strokeWidth="2"
            />

            <text
              x="365"
              y="200"
              textAnchor="end"
              fill="#67e8f9"
              fontSize="14"
              fontWeight="700"
            >
              LARGER BODY
            </text>

            <text x="380" y="375" textAnchor="middle" fill="#94a3b8" fontSize="14">
              Second candle body engulfs the first candle body
            </text>
          </svg>
        </div>
      </div>
    );
  }

  return null;
}