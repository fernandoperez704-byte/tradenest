import Link from "next/link";
import Navbar from "../../components/Navbar";

export default function DeFiPage() {
  return (
    <>
      <Navbar />

      <main className="min-h-screen bg-black px-6 py-8 text-white xl:px-10">
        <div className="mx-auto w-full max-w-[1200px]">
          {/* HEADER */}
          <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
            <div>
              <h1 className="text-4xl font-black">
                Decentralized Finance (DeFi)
              </h1>

              <p className="mt-2 text-sm leading-7 text-zinc-400">
                Understand how decentralized financial services work,
                how liquidity is provided, and how participants
                access financial opportunities and manage risks.
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
              src="/market-education/defi.png"
              alt="Decentralized finance and interconnected financial protocols"
              className="h-full w-full object-cover"
            />
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent" />
          </div>

          {/* INTRODUCTION */}
          <section className="mt-8 px-1 pb-8 md:px-2">
            <h2 className="text-2xl font-black">
              Understanding Decentralized Finance
            </h2>

            <p className="mt-3 max-w-4xl text-sm leading-7 text-zinc-400">
              Decentralized finance, commonly known as DeFi,
              is an ecosystem of financial applications that
              use blockchain-based protocols to provide services
              such as trading, lending, borrowing, and asset
              management.
            </p>

            <p className="mt-3 max-w-4xl text-sm leading-7 text-zinc-400">
              Instead of relying entirely on traditional financial
              intermediaries, these applications execute financial
              operations through programmed rules. The degree of
              decentralization varies between protocols.
            </p>
          </section>

          {/* FINANCIAL SYSTEMS */}
          <section className="border-t border-white/10 px-1 py-8 md:px-2">
            <p className="text-xs font-black uppercase tracking-[0.2em] text-cyan-400">
              Financial Systems
            </p>

            <h2 className="mt-2 text-2xl font-black">
              Traditional Finance vs. DeFi
            </h2>

            <div className="mt-8 grid gap-8 md:grid-cols-2 md:gap-12">
              <div>
                <h3 className="text-lg font-bold text-white">
                  Traditional Finance
                </h3>

                <p className="mt-3 text-sm leading-7 text-zinc-400">
                  Banks, brokers, and other financial institutions
                  manage accounts, process transactions, evaluate
                  borrowers, and provide financial services.
                  Access may depend on identity verification,
                  credit history, location, and institutional
                  requirements.
                </p>

                <p className="mt-3 text-sm leading-7 text-zinc-400">
                  Customers may benefit from regulated consumer
                  protections, dispute resolution procedures,
                  and eligible deposit insurance, depending on
                  the institution and jurisdiction.
                </p>
              </div>

              <div>
                <h3 className="text-lg font-bold text-white">
                  Decentralized Finance
                </h3>

                <p className="mt-3 text-sm leading-7 text-zinc-400">
                  Many DeFi applications allow participants
                  to interact directly with financial protocols.
                  Services can operate continuously, with
                  eligibility determined by protocol rules
                  rather than traditional account approval.
                </p>

                <p className="mt-3 text-sm leading-7 text-zinc-400">
                  Participants generally assume greater
                  responsibility for their financial decisions,
                  and conventional consumer protections or
                  recovery procedures may not be available.
                </p>
              </div>
            </div>
          </section>

          {/* DECENTRALIZED EXCHANGES */}
          <section className="border-t border-white/10 px-1 py-8 md:px-2">
            <p className="text-xs font-black uppercase tracking-[0.2em] text-cyan-400">
              Decentralized Trading
            </p>

            <h2 className="mt-2 text-2xl font-black">
              Decentralized Exchanges (DEXs)
            </h2>

            <p className="mt-3 max-w-4xl text-sm leading-7 text-zinc-400">
              A decentralized exchange allows participants
              to exchange digital assets through a financial
              protocol without necessarily depositing funds
              into a centralized exchange account.
            </p>

            <div className="mt-8 grid gap-8 md:grid-cols-2 md:gap-12">
              <div>
                <h3 className="text-lg font-bold text-white">
                  Order Book Exchanges
                </h3>

                <p className="mt-3 text-sm leading-7 text-zinc-400">
                  Some decentralized exchanges match purchase
                  and sale orders submitted by participants.
                  Transactions occur when compatible orders
                  are matched, with execution and settlement
                  handled according to the exchange design.
                </p>
              </div>

              <div>
                <h3 className="text-lg font-bold text-white">
                  Automated Market Makers (AMMs)
                </h3>

                <p className="mt-3 text-sm leading-7 text-zinc-400">
                  Automated market makers allow participants
                  to exchange assets against available reserves
                  rather than requiring a matching order from
                  another participant. Mathematical formulas
                  determine exchange prices based on the
                  protocol's liquidity model.
                </p>
              </div>
            </div>
          </section>

          {/* LIQUIDITY POOLS */}
          <section className="border-t border-white/10 px-1 py-8 md:px-2">
            <p className="text-xs font-black uppercase tracking-[0.2em] text-cyan-400">
              Market Liquidity
            </p>

            <h2 className="mt-2 text-2xl font-black">
              Understanding Liquidity Pools
            </h2>

            <p className="mt-3 max-w-4xl text-sm leading-7 text-zinc-400">
              A liquidity pool contains assets committed to a
              protocol to support financial operations.
              Participants who contribute assets are known
              as liquidity providers.
            </p>

            <div className="mt-8 grid gap-8 md:grid-cols-2 md:gap-12">
              <div>
                <h3 className="text-lg font-bold text-white">
                  Providing Liquidity
                </h3>

                <p className="mt-3 text-sm leading-7 text-zinc-400">
                  Liquidity providers deposit assets according
                  to a pool's requirements. Their contribution
                  establishes a position that determines their
                  claim on the pool's assets and eligible fees.
                  The quantities of assets they withdraw may
                  differ from their original deposit.
                </p>
              </div>

              <div>
                <h3 className="text-lg font-bold text-white">
                  Pool Pricing
                </h3>

                <p className="mt-3 text-sm leading-7 text-zinc-400">
                  In a common constant-product AMM, the
                  quantities of two assets follow the formula
                  x × y = k, where x and y represent the
                  reserves and k remains constant during an
                  idealized swap without fees. Other AMMs use
                  different pricing models.
                </p>
              </div>

              <div>
                <h3 className="text-lg font-bold text-white">
                  Price Impact
                </h3>

                <p className="mt-3 text-sm leading-7 text-zinc-400">
                  A transaction can change the balance of
                  assets within a pool and affect its exchange
                  price. Larger transactions relative to
                  available liquidity generally produce
                  greater price impact.
                </p>
              </div>

              <div>
                <h3 className="text-lg font-bold text-white">
                  Slippage
                </h3>

                <p className="mt-3 text-sm leading-7 text-zinc-400">
                  Slippage is the difference between the
                  expected execution price and the actual
                  execution price. It can occur when market
                  conditions or pool balances change before
                  a transaction is completed. Slippage
                  tolerance defines the acceptable execution
                  deviation before a transaction is rejected.
                </p>
              </div>
            </div>
          </section>

          {/* LENDING AND BORROWING */}
          <section className="border-t border-white/10 px-1 py-8 md:px-2">
            <p className="text-xs font-black uppercase tracking-[0.2em] text-cyan-400">
              Decentralized Credit
            </p>

            <h2 className="mt-2 text-2xl font-black">
              Lending and Borrowing Protocols
            </h2>

            <div className="mt-8 grid gap-8 md:grid-cols-2 md:gap-12">
              <div>
                <h3 className="text-lg font-bold text-white">
                  Lending Assets
                </h3>

                <p className="mt-3 text-sm leading-7 text-zinc-400">
                  Participants can supply assets to lending
                  protocols, making them available to borrowers.
                  Suppliers may receive interest based on the
                  protocol's lending activity. Withdrawals
                  depend on available liquidity and applicable
                  protocol restrictions.
                </p>
              </div>

              <div>
                <h3 className="text-lg font-bold text-white">
                  Borrowing Assets
                </h3>

                <p className="mt-3 text-sm leading-7 text-zinc-400">
                  Many DeFi lending protocols require borrowers
                  to deposit assets as collateral before
                  accessing a loan. This allows participants
                  to obtain liquidity without immediately
                  selling the assets they have deposited.
                </p>
              </div>

              <div>
                <h3 className="text-lg font-bold text-white">
                  Utilization Rate
                </h3>

                <p className="mt-3 text-sm leading-7 text-zinc-400">
                  Utilization measures how much of a lending
                  market's supplied liquidity is currently
                  borrowed. For example, if a market contains
                  $1 million in supplied assets and $800,000
                  is borrowed, its utilization rate is
                  approximately 80%.
                </p>
              </div>

              <div>
                <h3 className="text-lg font-bold text-white">
                  Interest Rate Models
                </h3>

                <p className="mt-3 text-sm leading-7 text-zinc-400">
                  Many lending protocols adjust interest rates
                  according to utilization. Higher borrowing
                  demand can increase borrowing costs and
                  encourage additional deposits, while lower
                  utilization may result in lower rates.
                </p>
              </div>
            </div>
          </section>

          {/* COLLATERAL AND LIQUIDATION */}
          <section className="border-t border-white/10 px-1 py-8 md:px-2">
            <p className="text-xs font-black uppercase tracking-[0.2em] text-cyan-400">
              Borrowing Requirements
            </p>

            <h2 className="mt-2 text-2xl font-black">
              Collateral Ratios and Liquidations
            </h2>

            <div className="mt-8 grid gap-8 md:grid-cols-2 md:gap-12">
              <div>
                <h3 className="text-lg font-bold text-white">
                  Loan-to-Value Ratio (LTV)
                </h3>

                <p className="mt-3 text-sm leading-7 text-zinc-400">
                  The loan-to-value ratio compares the value
                  of borrowed assets with the value of the
                  collateral supporting the loan. Protocols
                  establish maximum borrowing limits based
                  on the assets involved.
                </p>

                <p className="mt-3 text-xs font-bold text-cyan-300">
                  LTV = Loan Value ÷ Collateral Value × 100
                </p>
              </div>

              <div>
                <h3 className="text-lg font-bold text-white">
                  Liquidation Threshold
                </h3>

                <p className="mt-3 text-sm leading-7 text-zinc-400">
                  When a borrowing position exceeds its
                  permitted liquidation threshold, part or
                  all of its collateral may be sold or seized
                  to repay outstanding debt. Liquidation
                  penalties may also apply.
                </p>
              </div>
            </div>

            <div className="mt-8">
              <h3 className="text-lg font-bold text-white">
                Practical Example
              </h3>

              <p className="mt-3 max-w-4xl text-sm leading-7 text-zinc-400">
                Suppose a participant deposits $2,000 worth
                of collateral and borrows $1,000. The initial
                loan-to-value ratio is 50%.
              </p>

              <div className="mt-6 grid gap-6 sm:grid-cols-3">
                <div>
                  <p className="text-xs font-bold text-zinc-400">
                    Initial Collateral
                  </p>

                  <p className="mt-2 text-2xl font-black text-white">
                    $2,000
                  </p>

                  <p className="mt-1 text-sm text-cyan-300">
                    50% LTV
                  </p>
                </div>

                <div>
                  <p className="text-xs font-bold text-zinc-400">
                    Collateral After Decline
                  </p>

                  <p className="mt-2 text-2xl font-black text-white">
                    $1,500
                  </p>

                  <p className="mt-1 text-sm text-yellow-400">
                    66.7% LTV
                  </p>
                </div>

                <div>
                  <p className="text-xs font-bold text-zinc-400">
                    Liquidation Threshold
                  </p>

                  <p className="mt-2 text-2xl font-black text-white">
                    $1,250
                  </p>

                  <p className="mt-1 text-sm text-red-400">
                    80% LTV
                  </p>
                </div>
              </div>

              <p className="mt-6 max-w-4xl text-sm leading-7 text-zinc-400">
                If the protocol uses an 80% liquidation
                threshold, the position becomes eligible
                for liquidation when collateral reaches
                $1,250, assuming the debt remains unchanged.
                Accrued interest and changes in the value of
                borrowed assets can also affect this calculation.
              </p>
            </div>
          </section>

          {/* YIELD GENERATION */}
          <section className="border-t border-white/10 px-1 py-8 md:px-2">
            <p className="text-xs font-black uppercase tracking-[0.2em] text-cyan-400">
              Financial Returns
            </p>

            <h2 className="mt-2 text-2xl font-black">
              Yield Farming and Sources of Returns
            </h2>

            <p className="mt-3 max-w-4xl text-sm leading-7 text-zinc-400">
              Yield farming involves allocating assets across
              DeFi protocols to pursue financial returns.
              Understanding where those returns originate
              helps participants evaluate whether a yield
              depends on economic activity or temporary
              incentives.
            </p>

            <div className="mt-8 grid gap-8 md:grid-cols-3 md:gap-10">
              <div>
                <h3 className="text-lg font-bold text-white">
                  Trading Fees
                </h3>

                <p className="mt-3 text-sm leading-7 text-zinc-400">
                  Exchange protocols may distribute a portion
                  of transaction fees to eligible liquidity
                  providers. Earnings depend on trading
                  activity, fee structures, and the provider's
                  share of eligible liquidity.
                </p>
              </div>

              <div>
                <h3 className="text-lg font-bold text-white">
                  Borrowing Interest
                </h3>

                <p className="mt-3 text-sm leading-7 text-zinc-400">
                  Lending returns can originate from interest
                  paid by borrowers. A portion of this interest
                  may be retained by the protocol for reserves
                  or operating purposes.
                </p>
              </div>

              <div>
                <h3 className="text-lg font-bold text-white">
                  Protocol Incentives
                </h3>

                <p className="mt-3 text-sm leading-7 text-zinc-400">
                  Protocols may distribute additional rewards
                  to attract participants and encourage
                  liquidity. These incentives may decrease
                  or end, and their market value can fluctuate.
                </p>
              </div>
            </div>

            <div className="mt-8 grid gap-8 md:grid-cols-2 md:gap-12">
              <div>
                <h3 className="text-lg font-bold text-white">
                  Annual Percentage Rate (APR)
                </h3>

                <p className="mt-3 text-sm leading-7 text-zinc-400">
                  APR expresses an annualized rate without
                  including the effect of compounding.
                  A constant 10% APR on $1,000 would
                  generate $100 over one year before fees
                  and changes in asset value.
                </p>
              </div>

              <div>
                <h3 className="text-lg font-bold text-white">
                  Annual Percentage Yield (APY)
                </h3>

                <p className="mt-3 text-sm leading-7 text-zinc-400">
                  APY includes the effect of compounding.
                  A constant 10% APR compounded monthly
                  corresponds to approximately 10.47% APY.
                  Actual DeFi returns may differ because
                  rates, rewards, fees, and asset prices change.
                </p>
              </div>
            </div>
          </section>

          {/* IMPERMANENT LOSS */}
          <section className="border-t border-white/10 px-1 py-8 md:px-2">
            <p className="text-xs font-black uppercase tracking-[0.2em] text-cyan-400">
              Liquidity Provider Exposure
            </p>

            <h2 className="mt-2 text-2xl font-black">
              Understanding Impermanent Loss
            </h2>

            <p className="mt-3 max-w-4xl text-sm leading-7 text-zinc-400">
              Impermanent loss occurs when changes in the
              relative prices of assets within a liquidity
              pool cause a provider's position to be worth
              less than if the original assets had simply
              been held outside the pool, before accounting
              for earned fees and rewards.
            </p>

            <div className="mt-8">
              <h3 className="text-lg font-bold text-white">
                Practical Example
              </h3>

              <p className="mt-3 max-w-4xl text-sm leading-7 text-zinc-400">
                Suppose a participant deposits one ETH worth
                $1,000 and 1,000 USDC worth $1,000 into a
                standard 50/50 constant-product liquidity pool.
                The initial position is worth $2,000.
              </p>

              <p className="mt-3 max-w-4xl text-sm leading-7 text-zinc-400">
                If ETH rises to $2,000 while USDC remains
                at $1, arbitrage activity adjusts the pool's
                asset balance to reflect the new relative price.
              </p>

              <div className="mt-6 grid gap-6 sm:grid-cols-3">
                <div>
                  <p className="text-xs font-bold text-zinc-400">
                    Holding Original Assets
                  </p>

                  <p className="mt-2 text-2xl font-black text-white">
                    $3,000
                  </p>
                </div>

                <div>
                  <p className="text-xs font-bold text-zinc-400">
                    Liquidity Pool Position
                  </p>

                  <p className="mt-2 text-2xl font-black text-white">
                    $2,828.43
                  </p>
                </div>

                <div>
                  <p className="text-xs font-bold text-zinc-400">
                    Impermanent Loss
                  </p>

                  <p className="mt-2 text-2xl font-black text-red-400">
                    5.72%
                  </p>
                </div>
              </div>

              <p className="mt-6 max-w-4xl text-sm leading-7 text-zinc-400">
                Although the liquidity position increased in
                value, it underperformed the original assets
                by approximately $171.57. This simplified
                example excludes trading fees, incentives,
                and transaction costs.
              </p>

              <p className="mt-3 max-w-4xl text-sm leading-7 text-zinc-400">
                The difference may decrease if relative prices
                return to their original relationship.
                Withdrawing the position realizes the
                difference at that time. Earned fees may
                offset the loss, but this is not guaranteed.
              </p>
            </div>
          </section>

          {/* PROTOCOL INFRASTRUCTURE */}
          <section className="border-t border-white/10 px-1 py-8 md:px-2">
            <p className="text-xs font-black uppercase tracking-[0.2em] text-cyan-400">
              Financial Infrastructure
            </p>

            <h2 className="mt-2 text-2xl font-black">
              How DeFi Protocols Work Together
            </h2>

            <div className="mt-8 grid gap-8 md:grid-cols-2 md:gap-12">
              <div>
                <h3 className="text-lg font-bold text-white">
                  Price Oracles
                </h3>

                <p className="mt-3 text-sm leading-7 text-zinc-400">
                  Price oracles provide financial protocols
                  with asset valuation data. Lending applications
                  may use this information to calculate borrowing
                  limits, evaluate collateral, and determine
                  whether positions are eligible for liquidation.
                </p>
              </div>

              <div>
                <h3 className="text-lg font-bold text-white">
                  Arbitrage
                </h3>

                <p className="mt-3 text-sm leading-7 text-zinc-400">
                  Arbitrage involves taking advantage of price
                  differences between markets. In DeFi, arbitrage
                  activity helps bring exchange prices closer
                  to prices available on other trading venues,
                  subject to transaction costs and execution risks.
                </p>
              </div>

              <div>
                <h3 className="text-lg font-bold text-white">
                  Composability
                </h3>

                <p className="mt-3 text-sm leading-7 text-zinc-400">
                  Composability allows financial applications
                  to interact with one another. For example,
                  an asset supplied to one protocol may create
                  a receipt token that another compatible
                  protocol accepts as collateral.
                </p>
              </div>

              <div>
                <h3 className="text-lg font-bold text-white">
                  Flash Loans
                </h3>

                <p className="mt-3 text-sm leading-7 text-zinc-400">
                  Flash loans allow assets to be borrowed
                  without conventional collateral when the
                  borrowed amount and applicable fees are
                  repaid within the same atomic transaction.
                  If repayment fails, the transaction reverts.
                  Common applications include arbitrage and
                  restructuring financial positions.
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
              Understanding DeFi Protocol Risks
            </h2>

            <ul className="mt-6 max-w-4xl list-disc space-y-3 pl-5 text-sm leading-7 text-zinc-400">
              <li>
                <strong className="text-white">Smart Contract Vulnerabilities:</strong>{" "}
                Programming errors or flawed financial logic
                may allow protocol assets to be exploited,
                even when the application has undergone
                security audits.
              </li>

              <li>
                <strong className="text-white">Oracle Failures:</strong>{" "}
                Incorrect, outdated, or manipulated price
                information may cause improper valuations
                and unintended financial outcomes.
              </li>

              <li>
                <strong className="text-white">Protocol Dependencies:</strong>{" "}
                Applications that depend on other financial
                protocols may experience losses when an
                interconnected service fails.
              </li>

              <li>
                <strong className="text-white">Governance and Administrative Control:</strong>{" "}
                Certain protocols allow administrators or
                governance participants to modify financial
                parameters, upgrade contracts, or restrict
                operations.
              </li>

              <li>
                <strong className="text-white">Transaction Ordering:</strong>{" "}
                The ordering of blockchain transactions can
                create opportunities for other participants
                to extract value, potentially resulting in
                less favorable execution.
              </li>

              <li>
                <strong className="text-white">Protocol Insolvency:</strong>{" "}
                When outstanding obligations exceed recoverable
                assets, a protocol may accumulate bad debt
                and become unable to fully repay participants.
              </li>

              <li>
                <strong className="text-white">Regulatory Uncertainty:</strong>{" "}
                Changes in financial regulations may affect
                protocol accessibility, operating requirements,
                and the legal responsibilities of participants.
              </li>
            </ul>
          </section>

          {/* FINAL EXPLANATION */}
          <section className="border-t border-white/10 px-1 py-8 md:px-2">
            <p className="text-xs font-black uppercase tracking-[0.2em] text-cyan-400">
              Important to Understand
            </p>

            <p className="mt-3 max-w-4xl text-sm leading-7 text-zinc-400">
              Evaluating a DeFi opportunity requires understanding
              the financial activity behind it, who assumes the
              associated obligations, and how losses are distributed
              when something goes wrong. An advertised return
              should never be evaluated independently of the
              financial exposure required to earn it.
            </p>
          </section>
        </div>
      </main>
    </>
  );
}