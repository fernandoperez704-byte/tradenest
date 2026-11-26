type PortfolioPanelProps = {
  children: React.ReactNode;
  mobileView: "WATCHLIST" | "TRADE" | "ORDER";
  tourStep: number | null;
};

export default function PortfolioPanel({
  children,
  mobileView,
  tourStep,
}: PortfolioPanelProps) {
  return (
<div
  className={`min-w-0 w-full xl:col-span-2 ${
    mobileView === "ORDER" ? "block" : "hidden xl:block"
  }`}
>
  <div
    className={`w-full bg-[#111827] border border-zinc-700 rounded-2xl p-2.5 min-h-[90px] ${
          tourStep === 4
            ? "relative z-50 ring-4 ring-cyan-400 shadow-[0_0_45px_rgba(34,211,238,0.45)]"
            : ""
        }`}
      >
        {children}
      </div>
    </div>
  );
}