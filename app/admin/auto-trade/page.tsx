"use client";

import { useUser } from "@clerk/nextjs";
import { useGabyBenchmark } from "@/app/simulator/hooks/useGabyBenchmark";

const ADMIN_EMAIL = "fernandoperes704@gmail.com";

export default function AutoTradeAdminPage() {
  const { user, isLoaded } = useUser();
  const benchmark = useGabyBenchmark();

  if (!isLoaded) {
    return (
      <main className="min-h-screen bg-[#050816] p-6 text-white">
        Loading...
      </main>
    );
  }

  const email = user?.primaryEmailAddress?.emailAddress;

  if (!user || email !== ADMIN_EMAIL) {
    return (
      <main className="min-h-screen bg-[#050816] p-6 text-white">
        <p className="text-red-400">Access denied.</p>
      </main>
    );
  }

  if (benchmark.loading) {
    return (
      <main className="min-h-screen bg-[#050816] p-6 text-white">
        Loading benchmark...
      </main>
    );
  }

  const pnlColor =
    benchmark.netPnl > 0
      ? "text-emerald-400"
      : benchmark.netPnl < 0
        ? "text-red-400"
        : "text-zinc-300";

  return (
    <main className="min-h-screen bg-[#050816] p-4 text-white sm:p-6">
      <div className="mx-auto max-w-5xl">
        <h1 className="text-2xl font-bold">Auto Trade Benchmark</h1>

        <p className="mt-1 text-sm text-zinc-400">
          Internal TradeNestX performance monitor
        </p>

        <div className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-4">
          <Stat
            label="Starting Balance"
            value={`$${benchmark.startingBalance.toFixed(2)}`}
          />

          <Stat
            label="Current Balance"
            value={`$${benchmark.currentBalance.toFixed(2)}`}
          />

          <Stat
            label="Net P&L"
            value={`$${benchmark.netPnl.toFixed(2)}`}
            valueClass={pnlColor}
          />

          <Stat
            label="Return"
            value={`${benchmark.returnPercent.toFixed(2)}%`}
            valueClass={pnlColor}
          />

          <Stat label="Trades" value={String(benchmark.totalTrades)} />

          <Stat label="Wins" value={String(benchmark.wins)} />

          <Stat label="Losses" value={String(benchmark.losses)} />

          <Stat
            label="Win Rate"
            value={
              benchmark.totalTrades
                ? `${benchmark.winRate.toFixed(1)}%`
                : "—"
            }
          />
        </div>

        <div className="mt-6 rounded-xl border border-white/10 bg-white/5 p-4">
          <h2 className="font-bold">Current Position</h2>

          {benchmark.openTrade ? (
            <div className="mt-3 grid grid-cols-2 gap-3 text-sm sm:grid-cols-5">
              <PositionValue
                label="Symbol"
                value={benchmark.openTrade.symbol ?? "—"}
              />

              <PositionValue
                label="Side"
                value={benchmark.openTrade.side ?? "—"}
              />

              <PositionValue
                label="Entry"
                value={
                  benchmark.openTrade.entryPrice != null
                    ? `$${benchmark.openTrade.entryPrice.toFixed(2)}`
                    : "—"
                }
              />

              <PositionValue
                label="Stop Loss"
                value={
                  benchmark.openTrade.stopLoss != null
                    ? `$${benchmark.openTrade.stopLoss.toFixed(2)}`
                    : "—"
                }
              />

              <PositionValue
                label="Take Profit"
                value={
                  benchmark.openTrade.takeProfit != null
                    ? `$${benchmark.openTrade.takeProfit.toFixed(2)}`
                    : "—"
                }
              />
            </div>
          ) : (
            <p className="mt-3 text-sm text-zinc-400">
              No open position.
            </p>
          )}
        </div>
      </div>
    </main>
  );
}

function Stat({
  label,
  value,
  valueClass = "text-cyan-400",
}: {
  label: string;
  value: string;
  valueClass?: string;
}) {
  return (
    <div className="rounded-xl border border-white/10 bg-white/5 p-4">
      <p className="text-xs uppercase text-zinc-500">{label}</p>
      <p className={`mt-1 text-lg font-bold ${valueClass}`}>{value}</p>
    </div>
  );
}

function PositionValue({
  label,
  value,
}: {
  label: string;
  value: string;
}) {
  return (
    <div>
      <p className="text-xs text-zinc-500">{label}</p>
      <p className="mt-1 font-bold">{value}</p>
    </div>
  );
}