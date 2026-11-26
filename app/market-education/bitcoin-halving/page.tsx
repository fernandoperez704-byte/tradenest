import Link from "next/link";

export default function BitcoinHalvingPage() {
  return (
    <main className="min-h-screen bg-black px-6 py-8 text-white xl:px-10">
      <div className="mx-auto w-full max-w-[1200px]">

        <div className="mb-8 flex flex-wrap items-start justify-between gap-4">
          <div>
            <h1 className="text-4xl font-black">
              Bitcoin Halving
            </h1>

            <p className="mt-3 max-w-3xl text-sm leading-7 text-zinc-400">
              Understand how Bitcoin halving works, how it changes
              Bitcoin issuance, and why it matters to miners and
              cryptocurrency markets.
            </p>
          </div>

          <Link
            href="/market-education"
            className="w-fit shrink-0 rounded-xl border border-white/10 bg-[#111827] px-4 py-2 text-sm font-bold text-zinc-300 transition hover:border-cyan-400 hover:text-cyan-300"
          >
            ← Market Education
          </Link>
        </div>

        <div className="relative mb-8 overflow-hidden rounded-2xl border border-white/10">
          <img
            src="/market-education/bitcoin-halving.png"
            alt="Bitcoin halving and declining Bitcoin block subsidies"
            className="h-[260px] w-full object-cover sm:h-[340px] lg:h-[420px]"
          />

          <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
        </div>

        {/* Introduction */}

        <section className="px-1 pb-8 md:px-2">
          <h2 className="text-2xl font-black">
            Understanding Bitcoin Halving
          </h2>

          <p className="mt-3 max-w-4xl text-sm leading-7 text-zinc-400">
            Bitcoin halving is a scheduled event that reduces the amount
            of newly created Bitcoin awarded to miners for producing
            a valid block by 50%. This newly issued Bitcoin is known
            as the block subsidy.
          </p>

          <p className="mt-3 max-w-4xl text-sm leading-7 text-zinc-400">
            The halving mechanism was incorporated into Bitcoin's
            original monetary design. It gradually reduces the rate
            at which new Bitcoin enters circulation without removing
            Bitcoin that already exists.
          </p>
        </section>

        {/* Halving Schedule */}

        <section className="border-t border-white/10 px-1 py-8 md:px-2">
          <p className="text-xs font-black uppercase tracking-[0.2em] text-cyan-400">
            Bitcoin Issuance
          </p>

          <h2 className="mt-2 text-2xl font-black">
            How the Halving Schedule Works
          </h2>

          <p className="mt-3 max-w-4xl text-sm leading-7 text-zinc-400">
            Bitcoin's block subsidy is reduced every 210,000 blocks.
            Because the network targets an average block production
            time of approximately ten minutes, halvings generally
            occur about once every four years.
          </p>

          <div className="mt-6 grid gap-6 md:grid-cols-3">
            <div>
              <p className="text-sm font-bold text-zinc-400">
                Halving Interval
              </p>

              <p className="mt-2 text-3xl font-black text-cyan-400">
                210,000
              </p>

              <p className="mt-2 text-sm text-zinc-400">
                Blocks
              </p>
            </div>

            <div>
              <p className="text-sm font-bold text-zinc-400">
                Average Interval
              </p>

              <p className="mt-2 text-3xl font-black text-white">
                4 Years
              </p>

              <p className="mt-2 text-sm text-zinc-400">
                Approximately
              </p>
            </div>

            <div>
              <p className="text-sm font-bold text-zinc-400">
                Subsidy Reduction
              </p>

              <p className="mt-2 text-3xl font-black text-cyan-400">
                50%
              </p>

              <p className="mt-2 text-sm text-zinc-400">
                At each halving
              </p>
            </div>
          </div>

          <p className="mt-6 max-w-4xl text-sm leading-7 text-zinc-400">
            Halvings are determined by block height rather than a
            fixed calendar date. The exact timing depends on how
            quickly the network produces blocks.
          </p>
        </section>

        {/* Historical Halvings */}

        <section className="border-t border-white/10 px-1 py-8 md:px-2">
          <p className="text-xs font-black uppercase tracking-[0.2em] text-cyan-400">
            Historical and Projected Events
          </p>

          <h2 className="mt-2 text-2xl font-black">
            Bitcoin Halving Schedule
          </h2>

          <p className="mt-3 max-w-4xl text-sm leading-7 text-zinc-400">
            Bitcoin launched in 2009 with an initial block subsidy
            of 50 BTC. Each subsequent halving reduced that amount
            according to the network's predetermined schedule.
          </p>

          <div className="mt-6 overflow-x-auto education-scrollbar">
            <table className="w-full min-w-[620px] text-left text-sm">
              <thead className="border-b border-white/10 text-zinc-300">
                <tr>
                  <th className="px-5 py-4">Event</th>
                  <th className="px-5 py-4">Date</th>
                  <th className="px-5 py-4">Block Height</th>
                  <th className="px-5 py-4">Block Subsidy</th>
                </tr>
              </thead>

              <tbody className="divide-y divide-white/10 text-zinc-400">
                <tr>
                  <td className="px-5 py-4 font-bold text-white">
                    Bitcoin Launch
                  </td>
                  <td className="px-5 py-4">January 2009</td>
                  <td className="px-5 py-4">0</td>
                  <td className="px-5 py-4">50 BTC</td>
                </tr>

                <tr>
                  <td className="px-5 py-4 font-bold text-white">
                    First Halving
                  </td>
                  <td className="px-5 py-4">November 28, 2012</td>
                  <td className="px-5 py-4">210,000</td>
                  <td className="px-5 py-4">25 BTC</td>
                </tr>

                <tr>
                  <td className="px-5 py-4 font-bold text-white">
                    Second Halving
                  </td>
                  <td className="px-5 py-4">July 9, 2016</td>
                  <td className="px-5 py-4">420,000</td>
                  <td className="px-5 py-4">12.5 BTC</td>
                </tr>

                <tr>
                  <td className="px-5 py-4 font-bold text-white">
                    Third Halving
                  </td>
                  <td className="px-5 py-4">May 11, 2020</td>
                  <td className="px-5 py-4">630,000</td>
                  <td className="px-5 py-4">6.25 BTC</td>
                </tr>

                <tr>
                  <td className="px-5 py-4 font-bold text-white">
                    Fourth Halving
                  </td>
                  <td className="px-5 py-4">April 20, 2024 (UTC)</td>
                  <td className="px-5 py-4">840,000</td>
                  <td className="px-5 py-4 text-cyan-400">
                    3.125 BTC
                  </td>
                </tr>

                <tr>
                  <td className="px-5 py-4 font-bold text-white">
                    Fifth Halving
                  </td>
                  <td className="px-5 py-4">Estimated 2028</td>
                  <td className="px-5 py-4">1,050,000</td>
                  <td className="px-5 py-4 text-cyan-400">
                    1.5625 BTC
                  </td>
                </tr>

                <tr>
                  <td className="px-5 py-4 font-bold text-white">
                    Sixth Halving
                  </td>
                  <td className="px-5 py-4">Estimated 2032</td>
                  <td className="px-5 py-4">1,260,000</td>
                  <td className="px-5 py-4 text-cyan-400">
                    0.78125 BTC
                  </td>
                </tr>

                <tr>
                  <td className="px-5 py-4 font-bold text-white">
                    Seventh Halving
                  </td>
                  <td className="px-5 py-4">Estimated 2036</td>
                  <td className="px-5 py-4">1,470,000</td>
                  <td className="px-5 py-4 text-cyan-400">
                    0.390625 BTC
                  </td>
                </tr>

                <tr>
                  <td className="px-5 py-4 font-bold text-white">
                    Eighth Halving
                  </td>
                  <td className="px-5 py-4">Estimated 2040</td>
                  <td className="px-5 py-4">1,680,000</td>
                  <td className="px-5 py-4 text-cyan-400">
                    0.1953125 BTC
                  </td>
                </tr>

                <tr>
                  <td className="px-5 py-4 font-bold text-white">
                    Ninth Halving
                  </td>
                  <td className="px-5 py-4">Estimated 2044</td>
                  <td className="px-5 py-4">1,890,000</td>
                  <td className="px-5 py-4 text-cyan-400">
                    0.09765625 BTC
                  </td>
                </tr>

                <tr>
                  <td className="px-5 py-4 font-bold text-white">
                    Tenth Halving
                  </td>
                  <td className="px-5 py-4">Estimated 2048</td>
                  <td className="px-5 py-4">2,100,000</td>
                  <td className="px-5 py-4 text-cyan-400">
                    0.04882812 BTC
                  </td>
                </tr>

                <tr>
                  <td className="px-5 py-4 font-bold text-white">
                    Eleventh Halving
                  </td>
                  <td className="px-5 py-4">Estimated 2052</td>
                  <td className="px-5 py-4">2,310,000</td>
                  <td className="px-5 py-4 text-cyan-400">
                    0.02441406 BTC
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        {/* Daily Issuance */}

        <section className="border-t border-white/10 px-1 py-8 md:px-2">
          <p className="text-xs font-black uppercase tracking-[0.2em] text-cyan-400">
            New Bitcoin Production
          </p>

          <h2 className="mt-2 text-2xl font-black">
            How Halving Changes Daily Issuance
          </h2>

          <p className="mt-3 max-w-4xl text-sm leading-7 text-zinc-400">
            At an average of one block every ten minutes, Bitcoin
            produces approximately 144 blocks per day. Multiplying
            the block subsidy by this average provides an estimate
            of daily Bitcoin issuance.
          </p>

          <div className="mt-6">
            <p className="text-center text-sm font-bold text-zinc-300">
              Estimated Daily Issuance = Block Subsidy × 144
            </p>
          </div>

          <div className="mt-6 space-y-5">
            {[
              {
                period: "Before the 2024 Halving",
                amount: "900 BTC",
                width: "100%",
                barColor: "bg-cyan-500",
                textColor: "text-cyan-400",
              },
              {
                period: "After the 2024 Halving",
                amount: "450 BTC",
                width: "50%",
                barColor: "bg-yellow-500",
                textColor: "text-yellow-400",
              },
              {
                period: "After the Fifth Halving",
                amount: "225 BTC",
                width: "25%",
                barColor: "bg-orange-500",
                textColor: "text-orange-400",
              },
            ].map((item) => (
              <div key={item.period}>
                <div className="mb-2 flex items-center justify-between gap-4">
                  <p className="text-sm font-bold text-zinc-300">
                    {item.period}
                  </p>

                  <p className={`shrink-0 text-sm font-bold ${item.textColor}`}>
                    {item.amount}
                  </p>
                </div>

                <div className="h-3 overflow-hidden rounded-full bg-white/5">
                  <div
                    className={`h-full rounded-full ${item.barColor}`}
                    style={{ width: item.width }}
                  />
                </div>
              </div>
            ))}
          </div>

          <p className="mt-6 max-w-4xl text-sm leading-7 text-zinc-400">
            Actual daily issuance can vary because the number of
            blocks produced each day is not constant. These figures
            represent estimated production under Bitcoin's target
            block interval.
          </p>
        </section>

        {/* Mining Economics */}

        <section className="border-t border-white/10 px-1 py-8 md:px-2">
          <p className="text-xs font-black uppercase tracking-[0.2em] text-cyan-400">
            Mining Economics
          </p>

          <h2 className="mt-2 text-2xl font-black">
            How Halving Affects Bitcoin Miners
          </h2>

          <p className="mt-3 max-w-4xl text-sm leading-7 text-zinc-400">
            Halving changes the economics of Bitcoin mining by
            reducing the newly issued Bitcoin miners receive for
            producing blocks. Mining businesses must continue
            covering operating expenses even when their subsidy
            revenue decreases.
          </p>

          <div className="mt-6 grid gap-6 md:grid-cols-2">
            <div>
              <h3 className="text-lg font-bold text-white">
                Operating Costs
              </h3>

              <p className="mt-3 text-sm leading-7 text-zinc-400">
                Mining operations require electricity, specialized
                equipment, cooling systems, maintenance, and other
                infrastructure. These expenses do not automatically
                decrease when a halving occurs.
              </p>
            </div>

            <div>
              <h3 className="text-lg font-bold text-white">
                Mining Efficiency
              </h3>

              <p className="mt-3 text-sm leading-7 text-zinc-400">
                Miners using more energy-efficient equipment or
                lower-cost electricity may be better positioned
                to operate under reduced subsidy revenue.
              </p>
            </div>

            <div>
              <h3 className="text-lg font-bold text-white">
                Hash Rate
              </h3>

              <p className="mt-3 text-sm leading-7 text-zinc-400">
                Hash rate measures the computational activity
                dedicated to Bitcoin mining. If mining becomes
                unprofitable for some operators, they may disconnect
                equipment, potentially reducing network hash rate.
              </p>
            </div>

            <div>
              <h3 className="text-lg font-bold text-white">
                Difficulty Adjustment
              </h3>

              <p className="mt-3 text-sm leading-7 text-zinc-400">
                Bitcoin adjusts mining difficulty every 2,016 blocks
                to help maintain its target block production interval.
                Changes in mining participation can therefore influence
                the difficulty faced by remaining miners.
              </p>
            </div>
          </div>
        </section>

        {/* Miner Revenue */}

        <section className="border-t border-white/10 px-1 py-8 md:px-2">
          <p className="text-xs font-black uppercase tracking-[0.2em] text-cyan-400">
            Mining Revenue
          </p>

          <h2 className="mt-2 text-2xl font-black">
            Block Subsidies and Transaction Fees
          </h2>

          <p className="mt-3 max-w-4xl text-sm leading-7 text-zinc-400">
            A miner's total block reward consists of two separate
            components: the newly issued Bitcoin subsidy and the
            transaction fees associated with transactions included
            in the block.
          </p>

          <div className="mt-6">
            <p className="text-center text-sm font-bold text-zinc-300">
              Total Block Reward = Block Subsidy + Transaction Fees
            </p>
          </div>

          <h3 className="mt-6 text-lg font-bold text-white">
            Practical Example
          </h3>

          <p className="mt-3 max-w-4xl text-sm leading-7 text-zinc-400">
            Suppose transaction fees total 0.5 BTC per block both
            before and after the 2024 halving.
          </p>

          <div className="mt-6 grid gap-6 md:grid-cols-3">
            <div>
              <p className="text-sm font-bold text-zinc-400">
                Before Halving
              </p>

              <p className="mt-2 text-2xl font-black text-white">
                6.75 BTC
              </p>

              <p className="mt-2 text-sm text-zinc-400">
                6.25 BTC + 0.5 BTC
              </p>
            </div>

            <div>
              <p className="text-sm font-bold text-zinc-400">
                After Halving
              </p>

              <p className="mt-2 text-2xl font-black text-white">
                3.625 BTC
              </p>

              <p className="mt-2 text-sm text-zinc-400">
                3.125 BTC + 0.5 BTC
              </p>
            </div>

            <div>
              <p className="text-sm font-bold text-zinc-400">
                Total Reward Reduction
              </p>

              <p className="mt-2 text-2xl font-black text-cyan-400">
                46.30%
              </p>

              <p className="mt-2 text-sm text-zinc-400">
                Under these assumptions
              </p>
            </div>
          </div>

          <p className="mt-6 max-w-4xl text-sm leading-7 text-zinc-400">
            The block subsidy decreases by exactly 50%, but total
            mining revenue does not necessarily decrease by the
            same percentage. Transaction fees and Bitcoin's market
            price also influence the financial outcome for miners.
          </p>
        </section>

        {/* Market Behavior */}

        <section className="border-t border-white/10 px-1 py-8 md:px-2">
          <p className="text-xs font-black uppercase tracking-[0.2em] text-cyan-400">
            Market Behavior
          </p>

          <h2 className="mt-2 text-2xl font-black">
            Bitcoin Halving and Market Expectations
          </h2>

          <p className="mt-3 max-w-4xl text-sm leading-7 text-zinc-400">
            Previous Bitcoin halvings have attracted significant
            market attention. Investors often examine these events
            because they change the rate of new Bitcoin production
            and can influence expectations about future market
            conditions.
          </p>

          <div className="mt-6 grid gap-6 md:grid-cols-2">
            <div>
              <h3 className="text-lg font-bold text-white">
                Anticipation Before the Event
              </h3>

              <p className="mt-3 text-sm leading-7 text-zinc-400">
                Because the halving schedule is publicly known,
                participants can adjust their expectations and
                positions before the event occurs. Some anticipated
                effects may already be reflected in market prices.
              </p>
            </div>

            <div>
              <h3 className="text-lg font-bold text-white">
                Newly Issued Bitcoin
              </h3>

              <p className="mt-3 text-sm leading-7 text-zinc-400">
                Reduced issuance can decrease the amount of newly
                created Bitcoin available for miners to sell.
                However, existing holders can continue selling
                Bitcoin independently of mining activity.
              </p>
            </div>

            <div>
              <h3 className="text-lg font-bold text-white">
                Historical Price Behavior
              </h3>

              <p className="mt-3 text-sm leading-7 text-zinc-400">
                Previous post-halving periods have included
                substantial price appreciation as well as significant
                corrections. The limited number of historical events
                makes it difficult to isolate halving as the cause
                of those movements.
              </p>
            </div>

            <div>
              <h3 className="text-lg font-bold text-white">
                Broader Market Conditions
              </h3>

              <p className="mt-3 text-sm leading-7 text-zinc-400">
                Interest rates, global liquidity, institutional
                participation, regulatory developments, and investor
                confidence can influence Bitcoin's performance
                regardless of its halving schedule.
              </p>
            </div>
          </div>
        </section>

        {/* Final Issuance */}

        <section className="border-t border-white/10 px-1 py-8 md:px-2">
          <p className="text-xs font-black uppercase tracking-[0.2em] text-cyan-400">
            Long-Term Monetary Design
          </p>

          <h2 className="mt-2 text-2xl font-black">
            What Happens When Bitcoin Issuance Ends?
          </h2>

          <p className="mt-3 max-w-4xl text-sm leading-7 text-zinc-400">
            Bitcoin's repeated halvings gradually reduce its block
            subsidy until no additional Bitcoin can be issued under
            the existing protocol rules. This is expected to occur
            around the year 2140.
          </p>

          <div className="mt-6 grid gap-6 md:grid-cols-2">
            <div>
              <h3 className="text-lg font-bold text-white">
                Continued Network Operation
              </h3>

              <p className="mt-3 text-sm leading-7 text-zinc-400">
                The end of new Bitcoin issuance does not mean
                Bitcoin transactions must stop. Miners can continue
                producing blocks and receiving transaction fees
                without receiving newly created Bitcoin.
              </p>
            </div>

            <div>
              <h3 className="text-lg font-bold text-white">
                Long-Term Security Economics
              </h3>

              <p className="mt-3 text-sm leading-7 text-zinc-400">
                As the block subsidy declines, transaction fees
                become increasingly important to mining incentives.
                Whether future fee revenue will support sufficient
                mining participation remains an important question
                in Bitcoin's long-term economic design.
              </p>
            </div>
          </div>
        </section>

        {/* Important Considerations */}

        <section className="border-t border-white/10 px-1 py-8 md:px-2">
          <p className="text-xs font-black uppercase tracking-[0.2em] text-cyan-400">
            Common Misconceptions
          </p>

          <h2 className="mt-2 text-2xl font-black">
            Important Halving Considerations
          </h2>

          <ul className="mt-5 space-y-4 text-sm leading-7 text-zinc-400">


            <li>
              <span className="font-bold text-white">
                Transaction Capacity:
              </span>{" "}
              A halving does not directly reduce the number of
              transactions the network can process.
            </li>

            <li>
              <span className="font-bold text-white">
                Network Rules:
              </span>{" "}
              Halvings occur automatically under Bitcoin's existing
              protocol rules and do not require a central authority
              to approve each event.
            </li>

            <li>
              <span className="font-bold text-white">
                Market Pricing:
              </span>{" "}
              Bitcoin's market price is not programmed to double
              when its block subsidy is reduced by half.
            </li>


          </ul>
        </section>

        {/* Conclusion */}

        <section className="border-t border-white/10 px-1 py-8 md:px-2">
          <h2 className="text-2xl font-black">
            Important to Understand
          </h2>

          <p className="mt-3 max-w-4xl text-sm leading-7 text-zinc-400">
            Bitcoin halving is a predictable monetary event, but
            its financial consequences are not predetermined.
            Understanding the distinction between Bitcoin's
            programmed issuance schedule and the unpredictable
            behavior of financial markets is essential when
            evaluating the significance of a halving.
          </p>
        </section>

      </div>
    </main>
  );
}