"use client";

type Props = {
  type: string;
  example?: string;
};

const VisualShell = ({
  children,
}: {
  title: string;
  subtitle: string;
  children: React.ReactNode;
}) => (
  <div className="mt-4 overflow-hidden rounded-xl border border-cyan-400/15 bg-[#080f1e]">
    <div className="p-4">{children}</div>
  </div>
);

const Legend = ({
  items,
}: {
  items: { label: string; meaning: string; className: string }[];
}) => (
  <div className="mt-3 flex flex-wrap gap-2">
    {items.map((item) => (
      <div
        key={item.label}
        className="rounded-md border border-white/10 bg-white/[0.03] px-2.5 py-1.5 text-xs text-zinc-400"
      >
        <strong className={item.className}>{item.label}</strong>
        <span className="ml-1.5">= {item.meaning}</span>
      </div>
    ))}
  </div>
);

export default function GabyEducationalVisual({
  type,
  example,
}: Props) {
  const visual = example || type;

  if (visual === "UPTREND") {
    return (
      <VisualShell
        title="Uptrend Structure"
        subtitle="Price forms higher highs and higher lows."
      >
        <svg viewBox="0 0 760 300" className="h-auto w-full" role="img">
          <defs>
            <linearGradient id="uptrendGlow" x1="0" y1="1" x2="1" y2="0">
              <stop offset="0%" stopColor="#0891b2" />
              <stop offset="100%" stopColor="#22d3ee" />
            </linearGradient>
          </defs>

          <line x1="45" y1="260" x2="715" y2="260" stroke="#334155" strokeWidth="1" />

          <polyline
            points="55,245 170,145 255,205 385,95 475,155 625,45 710,100"
            fill="none"
            stroke="url(#uptrendGlow)"
            strokeWidth="4"
            strokeLinecap="round"
            strokeLinejoin="round"
          />

          <g>
            <circle cx="170" cy="145" r="8" fill="#22d3ee" />
            <text x="170" y="116" textAnchor="middle" fill="#67e8f9" fontSize="17" fontWeight="700">
              Higher High
            </text>

            <circle cx="255" cy="205" r="8" fill="#34d399" />
            <text x="255" y="238" textAnchor="middle" fill="#6ee7b7" fontSize="17" fontWeight="700">
              Higher Low
            </text>

            <circle cx="385" cy="95" r="8" fill="#22d3ee" />
            <text x="385" y="66" textAnchor="middle" fill="#67e8f9" fontSize="17" fontWeight="700">
              Higher High
            </text>

            <circle cx="475" cy="155" r="8" fill="#34d399" />
            <text x="475" y="188" textAnchor="middle" fill="#6ee7b7" fontSize="17" fontWeight="700">
              Higher Low
            </text>

            <circle cx="625" cy="45" r="8" fill="#22d3ee" />
          </g>

          <text x="650" y="30" fill="#67e8f9" fontSize="17" fontWeight="700">
            HH
          </text>

          <text x="585" y="275" fill="#64748b" fontSize="14">
            Time →
          </text>
        </svg>

        <Legend
          items={[
            { label: "HH", meaning: "Higher High", className: "text-cyan-300" },
            { label: "HL", meaning: "Higher Low", className: "text-emerald-300" },
          ]}
        />
      </VisualShell>
    );
  }

  if (visual === "DOWNTREND") {
    return (
      <VisualShell
        title="Downtrend Structure"
        subtitle="Price forms lower highs and lower lows."
      >
        <svg viewBox="0 0 760 300" className="h-auto w-full" role="img">
          <polyline
            points="55,45 170,145 255,85 385,195 475,135 625,245 710,190"
            fill="none"
            stroke="#f43f5e"
            strokeWidth="4"
            strokeLinecap="round"
            strokeLinejoin="round"
          />

          <circle cx="170" cy="145" r="8" fill="#fb7185" />
          <text x="170" y="180" textAnchor="middle" fill="#fda4af" fontSize="17" fontWeight="700">
            Lower Low
          </text>

          <circle cx="255" cy="85" r="8" fill="#f59e0b" />
          <text x="255" y="56" textAnchor="middle" fill="#fbbf24" fontSize="17" fontWeight="700">
            Lower High
          </text>

          <circle cx="385" cy="195" r="8" fill="#fb7185" />
          <text x="385" y="230" textAnchor="middle" fill="#fda4af" fontSize="17" fontWeight="700">
            Lower Low
          </text>

          <circle cx="475" cy="135" r="8" fill="#f59e0b" />
          <text x="475" y="106" textAnchor="middle" fill="#fbbf24" fontSize="17" fontWeight="700">
            Lower High
          </text>

          <circle cx="625" cy="245" r="8" fill="#fb7185" />


        </svg>

        <Legend
          items={[
            { label: "LH", meaning: "Lower High", className: "text-amber-300" },
            { label: "LL", meaning: "Lower Low", className: "text-rose-300" },
          ]}
        />
      </VisualShell>
    );
  }

  if (visual === "RANGE" || visual === "SUPPORT_RESISTANCE") {
    return (
      <VisualShell
        title={visual === "RANGE" ? "Ranging Market" : "Support & Resistance"}
        subtitle="Price reacts repeatedly between important upper and lower zones."
      >
        <svg viewBox="0 0 760 320" className="h-auto w-full" role="img">
          <rect x="45" y="45" width="670" height="38" rx="8" fill="#ef4444" opacity="0.12" />
          <rect x="45" y="237" width="670" height="38" rx="8" fill="#10b981" opacity="0.12" />

          <line x1="45" y1="64" x2="715" y2="64" stroke="#fb7185" strokeWidth="3" strokeDasharray="10 7" />
          <line x1="45" y1="256" x2="715" y2="256" stroke="#34d399" strokeWidth="3" strokeDasharray="10 7" />

          <polyline
            points="65,230 155,90 245,225 340,95 430,220 525,90 620,225 700,120"
            fill="none"
            stroke="#22d3ee"
            strokeWidth="4"
            strokeLinecap="round"
            strokeLinejoin="round"
          />

          <text x="60" y="35" fill="#fda4af" fontSize="17" fontWeight="700">
            RESISTANCE ZONE
          </text>
          <text x="60" y="300" fill="#6ee7b7" fontSize="17" fontWeight="700">
            SUPPORT ZONE
          </text>
        </svg>

        <Legend
          items={[
            { label: "Resistance", meaning: "Area where selling pressure may appear", className: "text-rose-300" },
            { label: "Support", meaning: "Area where buying pressure may appear", className: "text-emerald-300" },
          ]}
        />
      </VisualShell>
    );
  }

  if (visual === "SUPPORT") {
    return (
      <VisualShell
        title="Support"
        subtitle="A zone where falling price repeatedly finds buyers."
      >
        <svg viewBox="0 0 760 300" className="h-auto w-full" role="img">
          <rect x="45" y="210" width="670" height="45" rx="8" fill="#10b981" opacity="0.14" />
          <line x1="45" y1="232" x2="715" y2="232" stroke="#34d399" strokeWidth="3" strokeDasharray="10 7" />

          <polyline
            points="55,65 155,215 245,105 340,220 435,115 530,218 635,90 705,125"
            fill="none"
            stroke="#22d3ee"
            strokeWidth="4"
            strokeLinecap="round"
            strokeLinejoin="round"
          />

          <circle cx="155" cy="215" r="8" fill="#34d399" />
          <circle cx="340" cy="220" r="8" fill="#34d399" />
          <circle cx="530" cy="218" r="8" fill="#34d399" />

          <text x="60" y="275" fill="#6ee7b7" fontSize="18" fontWeight="700">
            SUPPORT ZONE
          </text>
        </svg>
      </VisualShell>
    );
  }

  if (visual === "RESISTANCE") {
    return (
      <VisualShell
        title="Resistance"
        subtitle="A zone where rising price repeatedly finds sellers."
      >
        <svg viewBox="0 0 760 300" className="h-auto w-full" role="img">
          <rect x="45" y="45" width="670" height="45" rx="8" fill="#ef4444" opacity="0.14" />
          <line x1="45" y1="68" x2="715" y2="68" stroke="#fb7185" strokeWidth="3" strokeDasharray="10 7" />

          <polyline
            points="55,235 155,85 245,190 340,80 435,180 530,83 635,205 705,165"
            fill="none"
            stroke="#22d3ee"
            strokeWidth="4"
            strokeLinecap="round"
            strokeLinejoin="round"
          />

          <circle cx="155" cy="85" r="8" fill="#fb7185" />
          <circle cx="340" cy="80" r="8" fill="#fb7185" />
          <circle cx="530" cy="83" r="8" fill="#fb7185" />

          <text x="60" y="32" fill="#fda4af" fontSize="18" fontWeight="700">
            RESISTANCE ZONE
          </text>
        </svg>
      </VisualShell>
    );
  }

  if (visual === "BREAKOUT" || visual === "BREAKOUT_RETEST") {
    const retest = visual === "BREAKOUT_RETEST";

    return (
      <VisualShell
        title={retest ? "Breakout & Retest" : "Breakout"}
        subtitle={
          retest
            ? "Price breaks resistance, returns to test it, then continues higher."
            : "Price pushes decisively above resistance."
        }
      >
        <svg viewBox="0 0 760 330" className="h-auto w-full" role="img">
          <rect x="45" y="175" width="670" height="34" rx="8" fill="#ef4444" opacity="0.12" />
          <line x1="45" y1="192" x2="715" y2="192" stroke="#fb7185" strokeWidth="3" strokeDasharray="10 7" />

          <polyline
            points={
              retest
                ? "55,270 145,220 235,250 325,205 405,225 475,145 535,190 600,115 705,55"
                : "55,270 145,220 235,250 325,205 405,225 485,140 590,90 705,45"
            }
            fill="none"
            stroke="#22d3ee"
            strokeWidth="4"
            strokeLinecap="round"
            strokeLinejoin="round"
          />

          <text x="60" y="170" fill="#fda4af" fontSize="16" fontWeight="700">
            OLD RESISTANCE
          </text>

          <text x="465" y="125" fill="#67e8f9" fontSize="17" fontWeight="700">
            BREAKOUT
          </text>

          {retest && (
            <>
              <circle cx="535" cy="190" r="8" fill="#34d399" />
              <text x="535" y="225" textAnchor="middle" fill="#6ee7b7" fontSize="17" fontWeight="700">
                RETEST
              </text>
              <text x="535" y="280" textAnchor="middle" fill="#6ee7b7" fontSize="15">
                Old resistance can become support
              </text>
            </>
          )}
        </svg>
      </VisualShell>
    );
  }

  if (visual === "BREAKDOWN" || visual === "BREAKDOWN_RETEST") {
    const retest = visual === "BREAKDOWN_RETEST";

    return (
      <VisualShell
        title={retest ? "Breakdown & Retest" : "Breakdown"}
        subtitle={
          retest
            ? "Price breaks support, retests it from below, then continues lower."
            : "Price pushes decisively below support."
        }
      >
        <svg viewBox="0 0 760 330" className="h-auto w-full" role="img">
          <rect x="45" y="120" width="670" height="34" rx="8" fill="#10b981" opacity="0.12" />
          <line x1="45" y1="137" x2="715" y2="137" stroke="#34d399" strokeWidth="3" strokeDasharray="10 7" />

          <polyline
            points={
              retest
                ? "55,55 145,105 235,75 325,125 405,105 475,190 535,140 600,215 705,280"
                : "55,55 145,105 235,75 325,125 405,105 485,195 590,245 705,290"
            }
            fill="none"
            stroke="#f43f5e"
            strokeWidth="4"
            strokeLinecap="round"
            strokeLinejoin="round"
          />

          <text x="60" y="112" fill="#6ee7b7" fontSize="16" fontWeight="700">
            OLD SUPPORT
          </text>

          <text x="465" y="220" fill="#fda4af" fontSize="17" fontWeight="700">
            BREAKDOWN
          </text>

          {retest && (
            <>
              <circle cx="535" cy="140" r="8" fill="#f59e0b" />
              <text x="535" y="115" textAnchor="middle" fill="#fbbf24" fontSize="17" fontWeight="700">
                RETEST
              </text>
            </>
          )}
        </svg>
      </VisualShell>
    );
  }

  if (visual === "TRENDLINE_UP" || visual === "TRENDLINE_DOWN") {
    const up = visual === "TRENDLINE_UP";

    return (
      <VisualShell
        title={up ? "Rising Trendline" : "Falling Trendline"}
        subtitle={
          up
            ? "A trendline connects rising swing lows."
            : "A trendline connects falling swing highs."
        }
      >
        <svg viewBox="0 0 760 300" className="h-auto w-full" role="img">
          <line
            x1="70"
            y1={up ? "245" : "55"}
            x2="690"
            y2={up ? "70" : "230"}
            stroke={up ? "#34d399" : "#fb7185"}
            strokeWidth="4"
            strokeDasharray="10 7"
          />

          <polyline
            points={
              up
                ? "65,225 150,135 225,200 330,100 405,155 530,65 650,110"
                : "65,75 150,165 225,105 330,205 405,150 530,245 650,195"
            }
            fill="none"
            stroke="#22d3ee"
            strokeWidth="4"
            strokeLinecap="round"
            strokeLinejoin="round"
          />

          <text
            x="470"
            y={up ? "235" : "55"}
            fill={up ? "#6ee7b7" : "#fda4af"}
            fontSize="18"
            fontWeight="700"
          >
            {up ? "RISING SUPPORT" : "FALLING RESISTANCE"}
          </text>
        </svg>
      </VisualShell>
    );
  }

  if (visual === "MARKET_STRUCTURE_BREAK") {
    return (
      <VisualShell
        title="Break of Structure"
        subtitle="Price breaks a meaningful previous swing point."
      >
        <svg viewBox="0 0 760 320" className="h-auto w-full" role="img">
          <line x1="45" y1="115" x2="715" y2="115" stroke="#f59e0b" strokeWidth="3" strokeDasharray="9 7" />

          <polyline
            points="55,260 145,175 225,220 330,135 415,190 505,110 590,150 700,45"
            fill="none"
            stroke="#22d3ee"
            strokeWidth="4"
            strokeLinecap="round"
            strokeLinejoin="round"
          />

          <circle cx="505" cy="110" r="8" fill="#f59e0b" />

          <text x="465" y="92" fill="#fbbf24" fontSize="16" fontWeight="700">
            PREVIOUS HIGH
          </text>
          <text x="700" y="80" textAnchor="end" fill="#67e8f9" fontSize="20" fontWeight="800">
            BREAK OF STRUCTURE
          </text>
        </svg>
      </VisualShell>
    );
  }

  if (visual === "RSI" || visual === "OVERBOUGHT" || visual === "OVERSOLD") {
    return (
      <VisualShell
        title="RSI — Relative Strength Index"
        subtitle="RSI measures momentum on a scale from 0 to 100."
      >
        <svg viewBox="0 0 760 330" className="h-auto w-full" role="img">
          <rect x="55" y="45" width="650" height="65" rx="8" fill="#ef4444" opacity="0.1" />
          <rect x="55" y="220" width="650" height="65" rx="8" fill="#10b981" opacity="0.1" />

          <line x1="55" y1="95" x2="705" y2="95" stroke="#fb7185" strokeWidth="2" strokeDasharray="8 7" />
          <line x1="55" y1="165" x2="705" y2="165" stroke="#64748b" strokeWidth="2" strokeDasharray="8 7" />
          <line x1="55" y1="235" x2="705" y2="235" stroke="#34d399" strokeWidth="2" strokeDasharray="8 7" />

          <polyline
            points="60,200 120,180 180,125 240,80 300,115 360,155 420,205 480,250 540,215 600,150 655,105 700,130"
            fill="none"
            stroke="#a78bfa"
            strokeWidth="4"
            strokeLinecap="round"
            strokeLinejoin="round"
          />

          <text x="15" y="100" fill="#fda4af" fontSize="16" fontWeight="700">70</text>
          <text x="15" y="170" fill="#94a3b8" fontSize="16" fontWeight="700">50</text>
          <text x="15" y="240" fill="#6ee7b7" fontSize="16" fontWeight="700">30</text>

          <text x="690" y="70" textAnchor="end" fill="#fda4af" fontSize="16" fontWeight="700">
            OVERBOUGHT AREA
          </text>
          <text x="690" y="275" textAnchor="end" fill="#6ee7b7" fontSize="16" fontWeight="700">
            OVERSOLD AREA
          </text>
        </svg>

        <p className="mt-2 text-xs leading-5 text-zinc-400">
          RSI above 70 is commonly described as overbought and below 30 as
          oversold. These levels are context, not automatic buy or sell signals.
        </p>
      </VisualShell>
    );
  }

  if (
    visual === "LONG_POSITION" ||
    visual === "STOP_LOSS_LONG" ||
    visual === "TAKE_PROFIT_LONG" ||
    visual === "RISK_REWARD"
  ) {
    return (
      <VisualShell
        title="Long Trade — Risk & Reward"
        subtitle="The stop is below entry while the profit target is above entry."
      >
        <svg viewBox="0 0 760 340" className="h-auto w-full" role="img">
          <rect x="175" y="45" width="410" height="105" rx="10" fill="#10b981" opacity="0.12" />
          <rect x="175" y="175" width="410" height="100" rx="10" fill="#ef4444" opacity="0.12" />

          <line x1="140" y1="55" x2="620" y2="55" stroke="#34d399" strokeWidth="3" />
          <line x1="140" y1="162" x2="620" y2="162" stroke="#22d3ee" strokeWidth="4" />
          <line x1="140" y1="275" x2="620" y2="275" stroke="#fb7185" strokeWidth="3" />

          <text x="610" y="61" fill="#6ee7b7" fontSize="17" fontWeight="700">
            TAKE PROFIT
          </text>
          <text x="610" y="168" fill="#67e8f9" fontSize="17" fontWeight="700">
            ENTRY
          </text>
          <text x="610" y="281" fill="#fda4af" fontSize="17" fontWeight="700">
            STOP LOSS
          </text>

          <text x="320" y="105" fill="#6ee7b7" fontSize="18" fontWeight="700">
            REWARD
          </text>
          <text x="330" y="230" fill="#fda4af" fontSize="18" fontWeight="700">
            RISK
          </text>

          <path d="M115 270 L115 65" stroke="#22d3ee" strokeWidth="4" />
          <path d="M102 80 L115 60 L128 80" fill="none" stroke="#22d3ee" strokeWidth="4" />

          <text x="70" y="170" fill="#67e8f9" fontSize="17" fontWeight="700" transform="rotate(-90 70 170)">
            LONG
          </text>
        </svg>
      </VisualShell>
    );
  }

  if (
    visual === "SHORT_POSITION" ||
    visual === "STOP_LOSS_SHORT" ||
    visual === "TAKE_PROFIT_SHORT"
  ) {
    return (
      <VisualShell
        title="Short Trade — Risk & Reward"
        subtitle="The stop is above entry while the profit target is below entry."
      >
        <svg viewBox="0 0 760 340" className="h-auto w-full" role="img">
          <rect x="175" y="65" width="410" height="100" rx="10" fill="#ef4444" opacity="0.12" />
          <rect x="175" y="190" width="410" height="105" rx="10" fill="#10b981" opacity="0.12" />

          <line x1="140" y1="65" x2="620" y2="65" stroke="#fb7185" strokeWidth="3" />
          <line x1="140" y1="178" x2="620" y2="178" stroke="#22d3ee" strokeWidth="4" />
          <line x1="140" y1="295" x2="620" y2="295" stroke="#34d399" strokeWidth="3" />

          <text x="610" y="71" fill="#fda4af" fontSize="17" fontWeight="700">
            STOP LOSS
          </text>
          <text x="610" y="184" fill="#67e8f9" fontSize="17" fontWeight="700">
            ENTRY
          </text>
          <text x="610" y="301" fill="#6ee7b7" fontSize="17" fontWeight="700">
            TAKE PROFIT
          </text>

          <text x="330" y="120" fill="#fda4af" fontSize="18" fontWeight="700">
            RISK
          </text>
          <text x="320" y="250" fill="#6ee7b7" fontSize="18" fontWeight="700">
            REWARD
          </text>

          <path d="M115 70 L115 285" stroke="#f43f5e" strokeWidth="4" />
          <path d="M102 270 L115 290 L128 270" fill="none" stroke="#f43f5e" strokeWidth="4" />

          <text x="70" y="190" fill="#fda4af" fontSize="17" fontWeight="700" transform="rotate(-90 70 190)">
            SHORT
          </text>
        </svg>
      </VisualShell>
    );
  }

  return null;
}