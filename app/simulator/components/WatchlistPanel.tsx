type WatchlistPanelProps = {
  children: React.ReactNode;
  mobileView: "WATCHLIST" | "TRADE" | "ORDER";
  tourStep: number | null;
};

export default function WatchlistPanel({
  children,
  mobileView,
  tourStep,
}: WatchlistPanelProps) {
  return (
    <div
      className={`bg-[#111827] border border-zinc-700 rounded-2xl p-4 h-[760px] flex flex-col overflow-hidden ${
        mobileView === "WATCHLIST" ? "block" : "hidden xl:flex"
      } ${
        tourStep === 1
          ? "relative z-50 ring-4 ring-cyan-400 shadow-[0_0_45px_rgba(34,211,238,0.45)]"
          : ""
      }`}
    >
      {children}
    </div>
  );
}