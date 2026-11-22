
import Link from "next/link";
import Navbar from "../../components/Navbar";

export default function TokenomicsPage() {
  return (
    <>
      <Navbar />

      <main className="min-h-screen bg-black px-6 py-8 text-white xl:px-10">
        <div className="mx-auto w-full max-w-[1200px]">
          {/* HEADER */}
          <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
            <div>
              <h1 className="text-4xl font-black">
                Tokenomics
              </h1>

              <p className="mt-2 text-sm leading-7 text-zinc-400">
                Understand cryptocurrency supply, token distribution,
                issuance, and the economic factors that influence
                digital asset markets.
              </p>
            </div>

            <Link
              href="/market-education"
              className="w-fit shrink-0 rounded-xl border border-white/10 bg-[#111827] px-4 py-2 text-sm font-bold text-zinc-300 transition hover:border-cyan-400 hover:text-cyan-300"
            >
              ← Market Education
            </Link>
          </div>

          {/* HERO IMAGE */}
          <div className="relative mt-8 h-[260px] overflow-hidden sm:h-[340px] lg:h-[420px]">
            <img
              src="/market-education/tokenomics.png"
              alt="Digital token supply and distribution visualization"
              className="h-full w-full object-cover"
            />
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent" />
          </div>

          {/* INTRODUCTION */}
          <section className="mt-8 px-1 pb-8 md:px-2">
            <h2 className="text-2xl font-black">
              Understanding Token Economics
            </h2>

            <p className="mt-3 max-w-4xl text-sm leading-7 text-zinc-400">
              Tokenomics refers to the economic design of a
              cryptocurrency or digital token. It describes how
              tokens are created, distributed, used, and managed
              within a blockchain ecosystem.
            </p>

            <p className="mt-4 max-w-4xl text-sm leading-7 text-zinc-400">
              Understanding tokenomics helps investors evaluate
              supply conditions, potential dilution, and the
              incentives that influence a cryptocurrency&apos;s
              long-term sustainability.
            </p>
          </section>

          {/* TOKEN SUPPLY */}
          <section className="border-t border-white/10 px-1 py-8 md:px-2">
            <span className="text-xs font-bold uppercase tracking-widest text-cyan-400">
              Supply Fundamentals
            </span>

            <h2 className="mt-2 text-2xl font-black">
              Circulating, Total, and Maximum Supply
            </h2>

            <p className="mt-3 text-sm leading-7 text-zinc-400">
              Cryptocurrency projects may report several supply
              measurements. Each describes a different aspect
              of how many tokens exist or may become available.
            </p>

            <div className="mt-6 space-y-5">
              <div>
                <h3 className="text-lg font-bold">
                  Circulating Supply
                </h3>
                <p className="mt-2 text-sm leading-7 text-zinc-400">
                  The estimated number of tokens currently
                  available in the market, excluding certain
                  locked or restricted holdings. Reporting
                  methods can vary between data providers.
                </p>
              </div>

              <div>
                <h3 className="text-lg font-bold">
                  Total Supply
                </h3>
                <p className="mt-2 text-sm leading-7 text-zinc-400">
                  The number of tokens that currently exist,
                  generally excluding tokens permanently
                  removed through burning. This may include
                  tokens that are locked or not yet circulating.
                </p>
              </div>

              <div>
                <h3 className="text-lg font-bold">
                  Maximum Supply
                </h3>
                <p className="mt-2 text-sm leading-7 text-zinc-400">
                  The maximum number of tokens permitted under
                  a cryptocurrency&apos;s supply rules, when a
                  fixed limit exists. Some cryptocurrencies
                  have no predetermined maximum supply.
                </p>
              </div>
            </div>
          </section>

          {/* MARKET CAP */}
          <section className="border-t border-white/10 px-1 py-8 md:px-2">
            <span className="text-xs font-bold uppercase tracking-widest text-cyan-400">
              Valuation
            </span>

            <h2 className="mt-2 text-2xl font-black">
              Market Capitalization and Dilution
            </h2>

            <p className="mt-3 text-sm leading-7 text-zinc-400">
              Market capitalization is calculated by multiplying
              a cryptocurrency&apos;s current price by its
              circulating supply. It provides a measure of the
              market value assigned to circulating tokens.
            </p>

            <p className="mt-4 text-sm font-bold text-white">
              Market Cap = Token Price × Circulating Supply
            </p>

            <p className="mt-4 text-sm leading-7 text-zinc-400">
              Fully diluted valuation, or FDV, estimates a
              token&apos;s value using a broader supply figure,
              commonly its maximum or total supply. A large
              difference between market cap and FDV can
              indicate substantial future token supply,
              although it does not predict future prices.
            </p>
          </section>

          {/* ISSUANCE */}
          <section className="border-t border-white/10 px-1 py-8 md:px-2">
            <span className="text-xs font-bold uppercase tracking-widest text-cyan-400">
              Supply Changes
            </span>

            <h2 className="mt-2 text-2xl font-black">
              Token Issuance, Inflation, and Deflation
            </h2>

            <p className="mt-3 text-sm leading-7 text-zinc-400">
              Some blockchain networks create additional
              tokens over time through mining rewards,
              staking rewards, or scheduled issuance.
              Increasing the token supply can dilute
              existing holders if demand does not grow
              proportionally.
            </p>

            <p className="mt-4 text-sm leading-7 text-zinc-400">
              Other projects use mechanisms that reduce
              supply, such as permanently burning tokens.
              However, reducing supply does not guarantee
              an increase in price because demand, liquidity,
              and market conditions also matter.
            </p>
          </section>

          {/* DISTRIBUTION */}
          <section className="border-t border-white/10 px-1 py-8 md:px-2">
            <span className="text-xs font-bold uppercase tracking-widest text-cyan-400">
              Token Allocation
            </span>

            <h2 className="mt-2 text-2xl font-black">
              Distribution, Vesting, and Token Unlocks
            </h2>

            <p className="mt-3 text-sm leading-7 text-zinc-400">
              Projects may allocate tokens to development
              teams, early investors, communities, treasuries,
              and ecosystem incentives. How these tokens are
              distributed can influence ownership concentration
              and market supply.
            </p>

            <p className="mt-4 text-sm leading-7 text-zinc-400">
              Vesting schedules restrict when certain holders
              can access their tokens. When locked tokens
              become available, the event is called a token
              unlock. Unlocks may increase circulating supply,
              but they do not necessarily result in immediate
              selling.
            </p>
          </section>

          {/* UTILITY */}
          <section className="border-t border-white/10 px-1 py-8 md:px-2">
            <span className="text-xs font-bold uppercase tracking-widest text-cyan-400">
              Token Purpose
            </span>

            <h2 className="mt-2 text-2xl font-black">
              Utility and Economic Incentives
            </h2>

            <p className="mt-3 text-sm leading-7 text-zinc-400">
              Tokens can serve different purposes within
              blockchain ecosystems, including paying network
              fees, participating in governance, accessing
              services, or supporting network security.
            </p>

            <p className="mt-4 text-sm leading-7 text-zinc-400">
              A token&apos;s usefulness does not automatically
              translate into investment value. Its economic
              design also determines whether increased
              activity creates meaningful demand for the token.
            </p>
          </section>

          {/* RISKS */}
          <section className="border-t border-white/10 px-1 py-8 md:px-2">
            <span className="text-xs font-bold uppercase tracking-widest text-cyan-400">
              Evaluation Risks
            </span>

            <h2 className="mt-2 text-2xl font-black">
              Common Tokenomics Risks
            </h2>

            <ul className="mt-4 list-disc space-y-3 pl-5 text-sm leading-7 text-zinc-400">
              <li>
                <strong className="text-white">Supply Concentration:</strong>{" "}
                Large holdings controlled by a small number
                of participants may increase market risk.
              </li>
              <li>
                <strong className="text-white">Unexpected Supply Changes:</strong>{" "}
                Changes to issuance schedules or token
                allocation rules may create uncertainty
                and affect investor confidence.
              </li>
              <li>
                <strong className="text-white">Unclear Supply Rules:</strong>{" "}
                Token supply mechanisms may be difficult
                to verify or subject to governance changes.
              </li>
              <li>
                <strong className="text-white">Weak Token Demand:</strong>{" "}
                A project may attract users without creating
                sustained demand for its token.
              </li>
              <li>
                <strong className="text-white">Unsustainable Incentives:</strong>{" "}
                Excessive token rewards may attract short-term
                participation without supporting lasting
                network activity or demand.
              </li>
            </ul>
          </section>

          {/* CONCLUSION */}
          <section className="border-t border-white/10 px-1 py-8 md:px-2">
            <span className="text-xs font-bold uppercase tracking-widest text-cyan-400">
              Important to Understand
            </span>

            <p className="mt-3 text-sm leading-7 text-zinc-400">
              Before evaluating a cryptocurrency, consider
              how many tokens are currently circulating,
              when additional tokens may enter the market,
              and whether the project creates sustainable
              demand. These factors provide useful context,
              but no tokenomics model can guarantee future
              performance.
            </p>
          </section>
        </div>
      </main>
    </>
  );
}
