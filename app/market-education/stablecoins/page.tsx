
import Link from "next/link";
import Navbar from "../../components/Navbar";

export default function StablecoinsPage() {
  return (
    <>
      <Navbar />

      <main className="min-h-screen bg-black px-6 py-8 text-white xl:px-10">
        <div className="mx-auto w-full max-w-[1200px]">
          {/* HEADER */}
          <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
            <div>
              <h1 className="text-4xl font-black">Stablecoins</h1>

              <p className="mt-2 text-sm leading-7 text-zinc-400">
                Understand how stablecoins work, how they maintain
                their value, and the risks behind digital assets
                designed for price stability.
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
              src="/market-education/stablecoins.png"
              alt="Stablecoin representing digital dollar payments and global blockchain networks"
              className="h-full w-full object-cover"
            />
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent" />
          </div>

          {/* INTRODUCTION */}
          <section className="mt-8 px-1 pb-8 md:px-2">
            <h2 className="text-2xl font-black">
              Digital Assets Designed for Stability
            </h2>

            <p className="mt-3 max-w-4xl text-sm leading-7 text-zinc-400">
              Stablecoins are cryptocurrencies designed to maintain
              a relatively stable value compared with a reference
              asset, such as the US dollar. Unlike Bitcoin and many
              other cryptocurrencies, which can experience large
              price movements, dollar-pegged stablecoins generally
              aim to remain close to one dollar per token.
            </p>

            <p className="mt-3 max-w-4xl text-sm leading-7 text-zinc-400">
              Stablecoins are not all built the same way.
              Their reliability depends on the assets,
              collateral, or mechanisms supporting their value.
            </p>
          </section>

          {/* TYPES */}
          <section className="border-t border-white/10 px-1 py-8 md:px-2">
            <p className="text-xs font-black uppercase tracking-[0.2em] text-cyan-400">
              Types of Stablecoins
            </p>

            <h2 className="mt-2 text-2xl font-black">
              Different Ways to Maintain a Stable Value
            </h2>

            <p className="mt-3 max-w-4xl text-sm leading-7 text-zinc-400">
              Not all stablecoins operate the same way. Their
              stability mechanisms depend on the assets, collateral,
              or systems supporting them.
            </p>

            <div className="mt-8 grid gap-8 md:grid-cols-3 md:gap-10">
              <div>
                <h3 className="text-lg font-bold text-white">
                  Fiat-Backed Stablecoins
                </h3>

                <p className="mt-3 text-sm leading-7 text-zinc-400">
                  These stablecoins are issued by organizations
                  that hold reserve assets, such as cash and
                  short-term government securities, to support
                  the tokens in circulation.
                </p>

                <p className="mt-3 text-xs font-bold text-cyan-300">
                  Examples: USDT and USDC
                </p>
              </div>

              <div>
                <h3 className="text-lg font-bold text-white">
                  Crypto-Backed Stablecoins
                </h3>

                <p className="mt-3 text-sm leading-7 text-zinc-400">
                  These stablecoins use cryptocurrency collateral
                  and blockchain-based mechanisms to help maintain
                  their target value. Some systems require more
                  collateral than the value of the stablecoins issued.
                </p>

                <p className="mt-3 text-xs font-bold text-cyan-300">
                  Example: DAI
                </p>
              </div>

              <div>
                <h3 className="text-lg font-bold text-white">
                  Algorithmic Stablecoins
                </h3>

                <p className="mt-3 text-sm leading-7 text-zinc-400">
                  These systems attempt to maintain a target price
                  using automated supply adjustments, incentives,
                  or related tokens rather than relying entirely
                  on traditional reserve assets.
                </p>

                <p className="mt-3 text-xs font-bold text-cyan-300">
                  Important: Some designs have failed to maintain
                  their peg.
                </p>
              </div>
            </div>
          </section>

          {/* HOW STABLECOINS WORK */}
          <section className="border-t border-white/10 px-1 py-8 md:px-2">
            <p className="text-xs font-black uppercase tracking-[0.2em] text-cyan-400">
              How Stablecoins Work
            </p>

            <h2 className="mt-2 text-2xl font-black">
              Understanding the Price Peg
            </h2>

            <p className="mt-3 max-w-4xl text-sm leading-7 text-zinc-400">
              A price peg is the target value a stablecoin attempts
              to maintain. For example, a dollar-pegged stablecoin
              aims to trade near $1, although its market price can
              temporarily move above or below that amount.
            </p>

            <div className="mt-8 grid gap-6 md:grid-cols-3 md:gap-10">
              <div>
                <h3 className="text-lg font-bold text-white">
                  Reserve Assets
                </h3>

                <p className="mt-3 text-sm leading-7 text-zinc-400">
                  Some issuers hold assets intended to support
                  the value of their outstanding stablecoins.
                  The quality, liquidity, and transparency of
                  these reserves matter.
                </p>
              </div>

              <div>
                <h3 className="text-lg font-bold text-white">
                  Issuance and Redemption
                </h3>

                <p className="mt-3 text-sm leading-7 text-zinc-400">
                  Eligible customers may exchange qualifying
                  assets for newly issued stablecoins or redeem
                  stablecoins through an issuer. These processes
                  can help keep the market price near its peg.
                </p>
              </div>

              <div>
                <h3 className="text-lg font-bold text-white">
                  Market Demand
                </h3>

                <p className="mt-3 text-sm leading-7 text-zinc-400">
                  Stablecoin prices also respond to supply,
                  demand, liquidity, and market confidence.
                  A stablecoin can lose its peg when its
                  supporting mechanisms come under pressure.
                </p>
              </div>
            </div>
          </section>


          {/* POPULAR STABLECOINS */}
          <section className="border-t border-white/10 px-1 py-8 md:px-2">
            <p className="text-xs font-black uppercase tracking-[0.2em] text-cyan-400">
              Stablecoin Examples
            </p>

            <h2 className="mt-2 text-2xl font-black">
              USDT, USDC, and DAI
            </h2>

            <p className="mt-3 max-w-4xl text-sm leading-7 text-zinc-400">
              Although these stablecoins all target the US dollar,
              they differ in their issuers, governance, reserve
              arrangements, and redemption mechanisms.
            </p>

            <div className="mt-8 grid gap-8 md:grid-cols-3 md:gap-10">
              <div>
                <h3 className="text-lg font-bold text-white">
                  Tether (USDT)
                </h3>

                <p className="mt-3 text-sm leading-7 text-zinc-400">
                  Issued by Tether, USDT is available on multiple
                  blockchain networks. Direct redemption through
                  the issuer is subject to eligibility requirements,
                  minimum amounts, and applicable fees.
                </p>
              </div>

              <div>
                <h3 className="text-lg font-bold text-white">
                  USD Coin (USDC)
                </h3>

                <p className="mt-3 text-sm leading-7 text-zinc-400">
                  Issued by Circle, USDC is also available across
                  multiple blockchain networks. Circle publishes
                  information about its reserves, and direct
                  redemption is available to eligible customers.
                </p>
              </div>

              <div>
                <h3 className="text-lg font-bold text-white">
                  DAI
                </h3>

                <p className="mt-3 text-sm leading-7 text-zinc-400">
                  DAI operates within the Sky ecosystem,
                  formerly MakerDAO. Unlike USDT and USDC,
                  it is governed through a decentralized
                  protocol with collateral and stability
                  mechanisms that can evolve over time.
                </p>
              </div>
            </div>
          </section>


          {/* COMPARISON */}
          <section className="border-t border-white/10 px-1 py-8 md:px-2">
            <p className="text-xs font-black uppercase tracking-[0.2em] text-cyan-400">
              Understanding the Difference
            </p>

            <h2 className="mt-2 text-2xl font-black">
              Stablecoins vs. Other Cryptocurrencies
            </h2>

            <p className="mt-3 max-w-4xl text-sm leading-7 text-zinc-400">
              Stablecoins and cryptocurrencies such as Bitcoin
              can both operate on blockchain networks, but
              they are designed for different purposes.
            </p>

            <div className="mt-8 grid gap-8 md:grid-cols-2 md:gap-12">
              <div>
                <h3 className="text-lg font-bold text-white">
                  Stablecoins
                </h3>

                <p className="mt-3 text-sm leading-7 text-zinc-400">
                  Designed to track a reference value, often
                  a national currency. Their main purpose is
                  to provide a relatively stable unit for
                  digital transfers, payments, and other uses.
                </p>
              </div>

              <div>
                <h3 className="text-lg font-bold text-white">
                  Bitcoin and Other Cryptocurrencies
                </h3>

                <p className="mt-3 text-sm leading-7 text-zinc-400">
                  Their market prices generally fluctuate
                  according to supply, demand, adoption,
                  and investor expectations. They are not
                  necessarily designed to maintain a fixed
                  value against a currency.
                </p>
              </div>
            </div>
          </section>

          {/* REAL WORLD USES */}
          <section className="border-t border-white/10 px-1 py-8 md:px-2">
            <p className="text-xs font-black uppercase tracking-[0.2em] text-cyan-400">
              Real-World Uses
            </p>

            <h2 className="mt-2 text-2xl font-black">
              Why People Use Stablecoins
            </h2>

            <div className="mt-8 grid gap-x-12 gap-y-8 md:grid-cols-2">
              <div>
                <h3 className="text-lg font-bold text-white">
                  Digital Payments and Transfers
                </h3>

                <p className="mt-3 text-sm leading-7 text-zinc-400">
                  Stablecoins allow digital value to move between
                  compatible blockchain addresses, including
                  across borders. Transfers may involve network
                  fees, restrictions, and processing delays.
                </p>
              </div>

              <div>
                <h3 className="text-lg font-bold text-white">
                  Cryptocurrency Trading
                </h3>

                <p className="mt-3 text-sm leading-7 text-zinc-400">
                  Stablecoins are commonly used as trading
                  pairs and as a way to hold dollar-denominated
                  digital value between transactions.
                </p>
              </div>

              <div>
                <h3 className="text-lg font-bold text-white">
                  Decentralized Finance
                </h3>

                <p className="mt-3 text-sm leading-7 text-zinc-400">
                  Some decentralized finance applications
                  use stablecoins for lending, borrowing,
                  liquidity, and other financial activities.
                </p>
              </div>


            </div>
          </section>

          {/* RISKS */}
          <section className="border-t border-white/10 px-1 py-8 md:px-2">
            <p className="text-xs font-black uppercase tracking-[0.2em] text-cyan-400">
              Risks and Limitations
            </p>

            <h2 className="mt-2 text-2xl font-black">
              Stable Does Not Mean Risk-Free
            </h2>

            <p className="mt-3 max-w-4xl text-sm leading-7 text-zinc-400">
              Stablecoins are designed to reduce price
              fluctuations relative to their target assets,
              but they can still expose users to significant
              financial and technical risks.
            </p>

            <ul className="mt-6 max-w-4xl list-disc space-y-3 pl-5 text-sm leading-7 text-zinc-400">
              <li>
                <strong className="text-white">Depegging:</strong>{" "}
                The stablecoin's market price can move away
                from its intended value.
              </li>
              <li>
                <strong className="text-white">Reserve Risk:</strong>{" "}
                Reserve assets may be insufficient, illiquid,
                or difficult to access during market stress.
              </li>
              <li>
                <strong className="text-white">Issuer Risk:</strong>{" "}
                Centralized stablecoins depend on the
                financial and operational reliability of
                their issuers.
              </li>
              <li>
                <strong className="text-white">Technical Risk:</strong>{" "}
                Smart contract vulnerabilities, wallet errors,
                and blockchain disruptions can affect users.
              </li>
              <li>
                <strong className="text-white">Regulatory Risk:</strong>{" "}
                Legal requirements and access restrictions
                may change across jurisdictions.
              </li>
            </ul>
          </section>

          {/* FINAL EXPLANATION */}
          <section className="border-t border-white/10 px-1 py-8 md:px-2">
            <p className="text-xs font-black uppercase tracking-[0.2em] text-cyan-400">
              Important to Understand
            </p>

            <p className="mt-3 max-w-4xl text-sm leading-7 text-zinc-400">
              Stablecoins serve different purposes and carry
              different risks. Understanding their structure
              and limitations is essential before using them.
            </p>
          </section>
        </div>
      </main>
    </>
  );
}
