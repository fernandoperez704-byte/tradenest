import Link from "next/link";

export default function CryptoScamsPage() {
  return (
    <main className="min-h-screen bg-black px-6 py-8 text-white xl:px-10">
      <div className="mx-auto w-full max-w-[1200px]">

        <div className="mb-8 flex flex-wrap items-start justify-between gap-4">
          <div>
            <h1 className="text-4xl font-black">
              Crypto Scams &amp; Fraud
            </h1>

            <p className="mt-3 max-w-3xl text-sm leading-7 text-zinc-400">
              Understand common cryptocurrency scams, recognize
              fraudulent investment practices, and learn how to
              evaluate suspicious projects and financial offers.
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
            src="/market-education/crypto-scams.png"
            alt="Cryptocurrency fraud and financial deception"
            className="h-[260px] w-full object-cover sm:h-[340px] lg:h-[420px]"
          />

          <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
        </div>

        {/* Introduction */}

        <section className="px-1 pb-8 md:px-2">
          <h2 className="text-2xl font-black">
            Understanding Cryptocurrency Fraud
          </h2>

          <p className="mt-3 max-w-4xl text-sm leading-7 text-zinc-400">
            Cryptocurrency fraud involves deliberate deception
            intended to obtain money, digital assets, or other
            financial benefits from individuals. Fraudulent
            operations may present themselves as investment
            opportunities, trading platforms, cryptocurrency
            projects, or professional financial services.
          </p>

          <p className="mt-3 max-w-4xl text-sm leading-7 text-zinc-400">
            Not every unsuccessful cryptocurrency project is a
            scam. Legitimate projects can fail because of poor
            management, technical difficulties, or unfavorable
            market conditions. Fraud involves intentional
            deception rather than financial losses alone.
          </p>
        </section>

        {/* Rug Pulls */}

        <section className="border-t border-white/10 px-1 py-8 md:px-2">
          <p className="text-xs font-black uppercase tracking-[0.2em] text-cyan-400">
            Project Fraud
          </p>

          <h2 className="mt-2 text-2xl font-black">
            Rug Pulls
          </h2>

          <p className="mt-3 max-w-4xl text-sm leading-7 text-zinc-400">
            A rug pull occurs when individuals controlling a
            cryptocurrency project deliberately exploit or abandon
            it to extract value from participants. These schemes
            can involve tokens, decentralized finance protocols,
            NFT collections, and other digital asset projects.
          </p>

          <div className="mt-6 grid gap-6 md:grid-cols-3">
            <div>
              <h3 className="text-lg font-bold text-white">
                Liquidity Removal
              </h3>

              <p className="mt-3 text-sm leading-7 text-zinc-400">
                Project operators withdraw assets from a trading
                liquidity pool, leaving participants with limited
                opportunities to exchange their tokens.
              </p>
            </div>

            <div>
              <h3 className="text-lg font-bold text-white">
                Insider Exploitation
              </h3>

              <p className="mt-3 text-sm leading-7 text-zinc-400">
                Individuals associated with a project exploit
                undisclosed privileges or token holdings for
                personal financial benefit at the expense
                of other participants.
              </p>
            </div>

            <div>
              <h3 className="text-lg font-bold text-white">
                Fraudulent Abandonment
              </h3>

              <p className="mt-3 text-sm leading-7 text-zinc-400">
                Operators collect funds for promised products
                or services and deliberately disappear without
                fulfilling their commitments.
              </p>
            </div>
          </div>

          <p className="mt-6 max-w-4xl text-sm leading-7 text-zinc-400">
            Locked liquidity alone does not establish that a
            project is legitimate. Other contract permissions,
            financial arrangements, and operational dependencies
            may still expose participants to fraudulent activity.
          </p>
        </section>

        {/* Market Manipulation */}

        <section className="border-t border-white/10 px-1 py-8 md:px-2">
          <p className="text-xs font-black uppercase tracking-[0.2em] text-cyan-400">
            Market Manipulation
          </p>

          <h2 className="mt-2 text-2xl font-black">
            Pump-and-Dump Schemes
          </h2>

          <p className="mt-3 max-w-4xl text-sm leading-7 text-zinc-400">
            A pump-and-dump scheme involves artificially
            encouraging demand for an asset through misleading
            promotion or coordinated manipulation, allowing
            participants behind the scheme to profit by selling
            into the resulting demand.
          </p>

          <div className="mt-6 overflow-hidden">
            <svg
              viewBox="0 0 800 260"
              className="h-auto w-full"
              role="img"
              aria-label="Illustrative pump-and-dump price movement"
            >
              <line
                x1="40"
                y1="220"
                x2="760"
                y2="220"
                stroke="#52525b"
                strokeWidth="1"
              />

              <line
                x1="40"
                y1="30"
                x2="40"
                y2="220"
                stroke="#52525b"
                strokeWidth="1"
              />

              {[60, 100, 140, 180].map((y) => (
                <line
                  key={y}
                  x1="40"
                  y1={y}
                  x2="760"
                  y2={y}
                  stroke="#ffffff"
                  strokeOpacity="0.06"
                  strokeDasharray="5 5"
                />
              ))}

              <path
                d="M 50 195 L 100 190 L 150 198 L 200 185 L 250 190"
                fill="none"
                stroke="#06b6d4"
                strokeWidth="4"
                strokeLinecap="round"
                strokeLinejoin="round"
              />

              <path
                d="M 250 190 L 290 165 L 320 175 L 350 120 L 380 135 L 420 65 L 460 40"
                fill="none"
                stroke="#22c55e"
                strokeWidth="4"
                strokeLinecap="round"
                strokeLinejoin="round"
              />

              <path
                d="M 460 40 L 490 80 L 520 65 L 550 145 L 580 130 L 620 195 L 660 205 L 710 198 L 750 212"
                fill="none"
                stroke="#ef4444"
                strokeWidth="4"
                strokeLinecap="round"
                strokeLinejoin="round"
              />

              <text
                x="140"
                y="165"
                fill="#22d3ee"
                fontSize="16"
                fontWeight="bold"
                textAnchor="middle"
              >
                Initial Trading
              </text>

              <text
                x="365"
                y="75"
                fill="#4ade80"
                fontSize="16"
                fontWeight="bold"
                textAnchor="middle"
              >
                Artificial Demand
              </text>

              <text
                x="625"
                y="100"
                fill="#f87171"
                fontSize="16"
                fontWeight="bold"
                textAnchor="middle"
              >
                Price Collapse
              </text>

              <text
                x="400"
                y="250"
                fill="#a1a1aa"
                fontSize="13"
                textAnchor="middle"
              >
                Illustrative price movement — not historical market data
              </text>
            </svg>
          </div>

          <div className="mt-6 grid gap-6 md:grid-cols-2">
            <div>
              <h3 className="text-lg font-bold text-white">
                Misleading Promotion
              </h3>

              <p className="mt-3 text-sm leading-7 text-zinc-400">
                Promotional campaigns may rely on fabricated
                announcements, undisclosed paid endorsements,
                exaggerated price expectations, or claims of
                exclusive investment opportunities.
              </p>
            </div>

            <div>
              <h3 className="text-lg font-bold text-white">
                Unequal Information
              </h3>

              <p className="mt-3 text-sm leading-7 text-zinc-400">
                Individuals behind a manipulation scheme may
                possess information about planned promotional
                activity that is unavailable to ordinary
                market participants.
              </p>
            </div>
          </div>

          <p className="mt-6 max-w-4xl text-sm leading-7 text-zinc-400">
            Rapid price appreciation followed by a sharp decline
            does not independently prove manipulation. Evidence
            of deceptive conduct or coordinated activity is
            necessary to distinguish fraud from ordinary
            market volatility.
          </p>
        </section>

        {/* Ponzi and Pyramid Schemes */}

        <section className="border-t border-white/10 px-1 py-8 md:px-2">
          <p className="text-xs font-black uppercase tracking-[0.2em] text-cyan-400">
            Fraudulent Financial Models
          </p>

          <h2 className="mt-2 text-2xl font-black">
            Ponzi and Pyramid Schemes
          </h2>

          <div className="mt-6 grid gap-6 md:grid-cols-2">
            <div>
              <h3 className="text-lg font-bold text-white">
                Ponzi Schemes
              </h3>

              <p className="mt-3 text-sm leading-7 text-zinc-400">
                A Ponzi scheme uses funds collected from newer
                participants to pay supposed investment returns
                to earlier participants, rather than generating
                sufficient legitimate investment profits.
              </p>
            </div>

            <div>
              <h3 className="text-lg font-bold text-white">
                Pyramid Schemes
              </h3>

              <p className="mt-3 text-sm leading-7 text-zinc-400">
                A pyramid scheme primarily depends on recruiting
                additional participants and collecting money
                from new members. Compensation is driven mainly
                by recruitment rather than genuine economic
                activity.
              </p>
            </div>
          </div>

          <h3 className="mt-6 text-lg font-bold text-white">
            Why Recruitment-Based Models Become Unsustainable
          </h3>

          <p className="mt-3 max-w-4xl text-sm leading-7 text-zinc-400">
            Consider a hypothetical arrangement requiring every
            participant to recruit five additional people.
            The number of new participants required increases
            exponentially at each recruitment level.
          </p>

          <div className="mt-6 overflow-x-auto education-scrollbar">
            <table className="w-full min-w-[520px] text-left text-sm">
              <thead className="border-b border-white/10 text-zinc-300">
                <tr>
                  <th className="px-5 py-4">
                    Recruitment Level
                  </th>
                  <th className="px-5 py-4">
                    New Participants Required
                  </th>
                </tr>
              </thead>

              <tbody className="divide-y divide-white/10 text-zinc-400">
                {[
                  { level: "Level 1", people: "5" },
                  { level: "Level 2", people: "25" },
                  { level: "Level 3", people: "125" },
                  { level: "Level 4", people: "625" },
                  { level: "Level 5", people: "3,125" },
                  { level: "Level 10", people: "9,765,625" },
                  { level: "Level 15", people: "30,517,578,125" },
                ].map((item) => (
                  <tr key={item.level}>
                    <td className="px-5 py-4 font-bold text-white">
                      {item.level}
                    </td>

                    <td className="px-5 py-4">
                      {item.people}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <p className="mt-6 max-w-4xl text-sm leading-7 text-zinc-400">
            By the fifteenth level, the number of additional
            participants required would exceed the world's
            population. Such recruitment requirements cannot
            continue indefinitely.
          </p>

          <p className="mt-3 max-w-4xl text-sm leading-7 text-zinc-400">
            Referral programs are not automatically pyramid
            schemes. The important distinction is whether
            compensation depends primarily on recruitment
            payments or genuine products and services.
          </p>
        </section>

        {/* Guaranteed Returns */}

        <section className="border-t border-white/10 px-1 py-8 md:px-2">
          <p className="text-xs font-black uppercase tracking-[0.2em] text-cyan-400">
            Unrealistic Financial Claims
          </p>

          <h2 className="mt-2 text-2xl font-black">
            Guaranteed Returns and Unrealistic Profits
          </h2>

          <p className="mt-3 max-w-4xl text-sm leading-7 text-zinc-400">
            Fraudulent investment programs frequently advertise
            unusually high returns while claiming that financial
            losses are impossible. These promises may be
            presented as automated trading, artificial
            intelligence strategies, mining operations, or
            exclusive investment systems.
          </p>

          <h3 className="mt-6 text-lg font-bold text-white">
            Understanding the Numbers
          </h3>

          <p className="mt-3 max-w-4xl text-sm leading-7 text-zinc-400">
            Suppose an investment program promises a guaranteed
            daily return of 1%, with all profits reinvested.
            A hypothetical initial investment of $1,000 would
            produce the following balances if that promise
            were consistently fulfilled.
          </p>

          <div className="mt-6 grid gap-6 md:grid-cols-3">
            <div>
              <p className="text-sm font-bold text-zinc-400">
                After 30 Days
              </p>

              <p className="mt-2 text-2xl font-black text-cyan-400">
                $1,347.85
              </p>
            </div>

            <div>
              <p className="text-sm font-bold text-zinc-400">
                After 180 Days
              </p>

              <p className="mt-2 text-2xl font-black text-yellow-400">
                $5,995.80
              </p>
            </div>

            <div>
              <p className="text-sm font-bold text-zinc-400">
                After 365 Days
              </p>

              <p className="mt-2 text-2xl font-black text-orange-400">
                $37,783.43
              </p>
            </div>
          </div>

          <p className="mt-6 max-w-4xl text-sm leading-7 text-zinc-400">
            This would represent an annual profit of approximately
            3,678.34%. The example illustrates why apparently
            modest daily return promises can imply extraordinary
            and economically questionable long-term performance.
          </p>

          <p className="mt-3 max-w-4xl text-sm leading-7 text-zinc-400">
            These calculations illustrate the advertised promise,
            not an achievable or expected investment outcome.
            A high return alone does not establish fraud, but
            guaranteed extraordinary returns without credible
            supporting evidence are a major warning sign.
          </p>
        </section>

        {/* Fake Investment Platforms */}

        <section className="border-t border-white/10 px-1 py-8 md:px-2">
          <p className="text-xs font-black uppercase tracking-[0.2em] text-cyan-400">
            Platform Fraud
          </p>

          <h2 className="mt-2 text-2xl font-black">
            Fake Trading and Investment Platforms
          </h2>

          <p className="mt-3 max-w-4xl text-sm leading-7 text-zinc-400">
            Fraudulent trading platforms imitate legitimate
            financial services to attract deposits from
            unsuspecting participants. A professional interface
            does not establish that a platform provides genuine
            access to financial markets.
          </p>

          <div className="mt-6 grid gap-6 md:grid-cols-2">
            <div>
              <h3 className="text-lg font-bold text-white">
                Fabricated Performance
              </h3>

              <p className="mt-3 text-sm leading-7 text-zinc-400">
                A platform may display profitable transactions
                or increasing account balances without providing
                independently verifiable evidence that genuine
                trading activity occurred.
              </p>
            </div>

            <div>
              <h3 className="text-lg font-bold text-white">
                Withdrawal Restrictions
              </h3>

              <p className="mt-3 text-sm leading-7 text-zinc-400">
                Participants may discover that displayed profits
                cannot be withdrawn. Operators may demand
                additional deposits, fabricated taxes, or
                unexpected account verification payments.
              </p>
            </div>

            <div>
              <h3 className="text-lg font-bold text-white">
                Misleading Early Withdrawals
              </h3>

              <p className="mt-3 text-sm leading-7 text-zinc-400">
                Some fraudulent platforms permit small initial
                withdrawals. Successful withdrawal of a limited
                amount does not establish the legitimacy or
                solvency of the entire operation.
              </p>
            </div>

            <div>
              <h3 className="text-lg font-bold text-white">
                Fabricated Credentials
              </h3>

              <p className="mt-3 text-sm leading-7 text-zinc-400">
                Fraudulent services may display copied regulatory
                certificates, false business registrations, or
                unauthorized affiliations with established
                financial institutions.
              </p>
            </div>
          </div>
        </section>

        {/* Presale Fraud */}

        <section className="border-t border-white/10 px-1 py-8 md:px-2">
          <p className="text-xs font-black uppercase tracking-[0.2em] text-cyan-400">
            Fundraising Fraud
          </p>

          <h2 className="mt-2 text-2xl font-black">
            Fake Cryptocurrency Presales
          </h2>

          <p className="mt-3 max-w-4xl text-sm leading-7 text-zinc-400">
            Cryptocurrency presales allow participants to acquire
            tokens before a planned public distribution or
            trading launch. Fraudulent presales exploit this
            fundraising model by collecting money through
            deceptive or nonexistent projects.
          </p>

          <div className="mt-6 grid gap-6 md:grid-cols-2">
            <div>
              <h3 className="text-lg font-bold text-white">
                False Exchange Listings
              </h3>

              <p className="mt-3 text-sm leading-7 text-zinc-400">
                Promoters may claim that a token has secured
                listings on major exchanges without confirmation
                from the exchanges themselves.
              </p>
            </div>

            <div>
              <h3 className="text-lg font-bold text-white">
                Fabricated Fundraising Progress
              </h3>

              <p className="mt-3 text-sm leading-7 text-zinc-400">
                Websites may display misleading fundraising
                totals or participation statistics to create
                the appearance of widespread investor interest.
              </p>
            </div>

            <div>
              <h3 className="text-lg font-bold text-white">
                Undelivered Tokens
              </h3>

              <p className="mt-3 text-sm leading-7 text-zinc-400">
                Participants may receive website-based allocation
                records without receiving actual blockchain
                tokens. A displayed allocation does not establish
                that transferable cryptocurrency exists.
              </p>
            </div>

            <div>
              <h3 className="text-lg font-bold text-white">
                Impersonated Projects
              </h3>

              <p className="mt-3 text-sm leading-7 text-zinc-400">
                Fraudulent presales may imitate existing
                cryptocurrency projects or announce token
                launches that the genuine project has
                never authorized.
              </p>
            </div>
          </div>
        </section>

        {/* Honeypot Tokens */}

        <section className="border-t border-white/10 px-1 py-8 md:px-2">
          <p className="text-xs font-black uppercase tracking-[0.2em] text-cyan-400">
            Token-Level Fraud
          </p>

          <h2 className="mt-2 text-2xl font-black">
            Honeypot Tokens
          </h2>

          <p className="mt-3 max-w-4xl text-sm leading-7 text-zinc-400">
            In cryptocurrency trading, a honeypot token commonly
            refers to a token designed to allow purchases while
            preventing or severely restricting ordinary holders
            from selling their positions.
          </p>

          <div className="mt-6 grid gap-6 md:grid-cols-2">
            <div>
              <p className="text-sm font-bold text-zinc-400">
                Purchase Transaction
              </p>

              <p className="mt-2 text-2xl font-black text-green-400">
                Successful
              </p>

              <p className="mt-3 text-sm leading-7 text-zinc-400">
                The participant acquires the token and sees
                it appear in their holdings.
              </p>
            </div>

            <div>
              <p className="text-sm font-bold text-zinc-400">
                Sale Transaction
              </p>

              <p className="mt-2 text-2xl font-black text-red-400">
                Restricted
              </p>

              <p className="mt-3 text-sm leading-7 text-zinc-400">
                Contract restrictions or excessive transaction
                charges prevent the participant from recovering
                the expected value of the position.
              </p>
            </div>
          </div>

          <p className="mt-6 max-w-4xl text-sm leading-7 text-zinc-400">
            A failed sale does not automatically establish
            that a token is a honeypot. Network congestion,
            insufficient liquidity, and transaction settings
            can also cause unsuccessful transactions.
            Contract behavior must be evaluated in context.
          </p>
        </section>

        {/* Social Engineering */}

        <section className="border-t border-white/10 px-1 py-8 md:px-2">
          <p className="text-xs font-black uppercase tracking-[0.2em] text-cyan-400">
            Social Engineering
          </p>

          <h2 className="mt-2 text-2xl font-black">
            Impersonation and Trust-Based Scams
          </h2>

          <p className="mt-3 max-w-4xl text-sm leading-7 text-zinc-400">
            Social engineering exploits human trust and
            emotional responses rather than relying exclusively
            on technical vulnerabilities. Fraudsters may
            establish credibility by imitating trusted
            individuals, organizations, or personal relationships.
          </p>

          <div className="mt-6 grid gap-6 md:grid-cols-2">
            <div>
              <h3 className="text-lg font-bold text-white">
                Celebrity and Influencer Impersonation
              </h3>

              <p className="mt-3 text-sm leading-7 text-zinc-400">
                Fraudulent accounts may use stolen photographs,
                copied profiles, or artificially generated
                videos to create the false impression that
                a public figure endorses a cryptocurrency project.
              </p>
            </div>

            <div>
              <h3 className="text-lg font-bold text-white">
                Fake Financial Professionals
              </h3>

              <p className="mt-3 text-sm leading-7 text-zinc-400">
                Individuals may falsely present themselves as
                licensed advisers, professional traders, or
                account managers to obtain control over
                another person's investment funds.
              </p>
            </div>

            <div>
              <h3 className="text-lg font-bold text-white">
                Relationship Investment Scams
              </h3>

              <p className="mt-3 text-sm leading-7 text-zinc-400">
                Fraudsters may develop personal or romantic
                relationships before introducing fraudulent
                investment opportunities. The established
                relationship becomes a source of financial trust.
              </p>
            </div>

            <div>
              <h3 className="text-lg font-bold text-white">
                Cryptocurrency Giveaway Scams
              </h3>

              <p className="mt-3 text-sm leading-7 text-zinc-400">
                Fake promotions may request an initial
                cryptocurrency payment in exchange for a
                promised larger payment. The advertised
                reward is never delivered.
              </p>
            </div>
          </div>
        </section>

        {/* Recovery Fraud */}

        <section className="border-t border-white/10 px-1 py-8 md:px-2">
          <p className="text-xs font-black uppercase tracking-[0.2em] text-cyan-400">
            Secondary Fraud
          </p>

          <h2 className="mt-2 text-2xl font-black">
            Cryptocurrency Recovery Scams
          </h2>

          <p className="mt-3 max-w-4xl text-sm leading-7 text-zinc-400">
            Recovery scams target individuals who have already
            experienced financial losses. Fraudulent recovery
            services claim they can retrieve stolen cryptocurrency
            through specialized technology, legal connections,
            or privileged access to blockchain networks.
          </p>

          <div className="mt-6 grid gap-6 md:grid-cols-2">
            <div>
              <h3 className="text-lg font-bold text-white">
                Guaranteed Recovery Claims
              </h3>

              <p className="mt-3 text-sm leading-7 text-zinc-400">
                No recovery service can guarantee the return
                of stolen cryptocurrency in every situation.
                Recovery depends on the circumstances,
                available evidence, asset location, and
                cooperation from relevant parties.
              </p>
            </div>

            <div>
              <h3 className="text-lg font-bold text-white">
                Tracing vs. Recovering Assets
              </h3>

              <p className="mt-3 text-sm leading-7 text-zinc-400">
                Identifying the movement of cryptocurrency
                through public blockchain records does not
                provide automatic authority or technical
                control to retrieve those assets.
              </p>
            </div>
          </div>
        </section>

        {/* Warning Signs */}

        <section className="border-t border-white/10 px-1 py-8 md:px-2">
          <p className="text-xs font-black uppercase tracking-[0.2em] text-cyan-400">
            Fraud Recognition
          </p>

          <h2 className="mt-2 text-2xl font-black">
            Common Warning Signs
          </h2>

          <div className="mt-6 grid gap-6 md:grid-cols-2">
            {[
              {
                title: "Artificial Urgency",
                description:
                  "Pressure to make immediate financial decisions before independently evaluating the opportunity.",
              },
              {
                title: "Restricted Communication",
                description:
                  "Requests to keep an investment arrangement secret or avoid discussing it with independent professionals.",
              },
              {
                title: "Unverifiable Testimonials",
                description:
                  "Claims of financial success supported only by anonymous reviews, screenshots, or promotional videos.",
              },
              {
                title: "Changing Payment Instructions",
                description:
                  "Unexpected requests to transfer funds to different recipients without a verifiable business explanation.",
              },
              {
                title: "Inconsistent Documentation",
                description:
                  "Contradictory information about project ownership, financial obligations, or contractual terms.",
              },
              {
                title: "Unexplained Revenue Sources",
                description:
                  "An inability to explain how the business generates sufficient revenue to support its advertised financial commitments.",
              },
            ].map((item) => (
              <div key={item.title}>
                <h3 className="text-lg font-bold text-orange-400">
                  {item.title}
                </h3>

                <p className="mt-3 text-sm leading-7 text-zinc-400">
                  {item.description}
                </p>
              </div>
            ))}
          </div>

          <p className="mt-6 max-w-4xl text-sm leading-7 text-zinc-400">
            Individual warning signs do not necessarily prove
            fraudulent activity. Multiple unexplained
            inconsistencies increase the importance of
            independent investigation.
          </p>
        </section>

        {/* Independent Verification */}

        <section className="border-t border-white/10 px-1 py-8 md:px-2">
          <p className="text-xs font-black uppercase tracking-[0.2em] text-cyan-400">
            Due Diligence
          </p>

          <h2 className="mt-2 text-2xl font-black">
            How to Evaluate Suspicious Opportunities
          </h2>

          <div className="mt-6 grid gap-6 md:grid-cols-2">
            <div>
              <h3 className="text-lg font-bold text-white">
                Verify Business Identity
              </h3>

              <p className="mt-3 text-sm leading-7 text-zinc-400">
                Investigate the legal entity, responsible
                individuals, business history, and independently
                available records rather than relying exclusively
                on information supplied by promoters.
              </p>
            </div>

            <div>
              <h3 className="text-lg font-bold text-white">
                Confirm Regulatory Claims
              </h3>

              <p className="mt-3 text-sm leading-7 text-zinc-400">
                Check claimed registrations and authorizations
                directly through the relevant regulatory
                authority. Business registration alone does
                not establish investment authorization.
              </p>
            </div>

            <div>
              <h3 className="text-lg font-bold text-white">
                Examine Independent Evidence
              </h3>

              <p className="mt-3 text-sm leading-7 text-zinc-400">
                Compare promotional claims with independently
                available transaction records, financial
                disclosures, product demonstrations, and
                statements from confirmed business partners.
              </p>
            </div>

            <div>
              <h3 className="text-lg font-bold text-white">
                Understand Audit Limitations
              </h3>

              <p className="mt-3 text-sm leading-7 text-zinc-400">
                A technical audit evaluates a defined scope
                at a particular point in time. It does not
                automatically verify business solvency,
                management integrity, or future contract changes.
              </p>
            </div>
          </div>
        </section>

        {/* Reporting Fraud */}

        <section className="border-t border-white/10 px-1 py-8 md:px-2">
          <p className="text-xs font-black uppercase tracking-[0.2em] text-cyan-400">
            Incident Response
          </p>

          <h2 className="mt-2 text-2xl font-black">
            What to Do If You Suspect Fraud
          </h2>

          <div className="mt-6 grid gap-6 md:grid-cols-2">
            {[
              {
                number: "01",
                title: "Stop Additional Payments",
                description:
                  "Avoid sending further funds while the legitimacy of the arrangement remains unresolved.",
              },
              {
                number: "02",
                title: "Preserve Evidence",
                description:
                  "Retain transaction identifiers, payment records, communications, website addresses, and account information.",
              },
              {
                number: "03",
                title: "Contact Relevant Providers",
                description:
                  "Notify the exchange, bank, payment provider, or other financial service involved as soon as possible.",
              },
              {
                number: "04",
                title: "Report the Incident",
                description:
                  "Submit available evidence to appropriate law enforcement and financial regulatory authorities.",
              },
            ].map((item) => (
              <div
                key={item.number}
                className=""
              >
                <p className="text-3xl font-black text-cyan-400">
                  {item.number}
                </p>

                <h3 className="mt-3 text-lg font-bold text-white">
                  {item.title}
                </h3>

                <p className="mt-3 text-sm leading-7 text-zinc-400">
                  {item.description}
                </p>
              </div>
            ))}
          </div>

          <h3 className="mt-6 text-lg font-bold text-white">
            Official Reporting Resources
          </h3>

          <p className="mt-3 max-w-4xl text-sm leading-7 text-zinc-400">
            Individuals in the United States can use the
            following official resources to report suspected
            fraud or investigate financial service providers.
            Individuals in other countries should contact
            their corresponding local authorities.
          </p>

          <div className="mt-6 grid gap-6 md:grid-cols-2">
            {[
              {
                name: "FBI Internet Crime Complaint Center",
                description: "Report suspected internet-related financial crimes.",
                href: "https://www.ic3.gov/",
              },
              {
                name: "Federal Trade Commission",
                description: "Report scams and deceptive business practices.",
                href: "https://reportfraud.ftc.gov/",
              },
              {
                name: "U.S. Securities and Exchange Commission",
                description: "Submit tips and complaints involving potential securities violations.",
                href: "https://www.sec.gov/submit-tip-or-complaint",
              },
              {
                name: "FINRA BrokerCheck",
                description: "Research registered brokerage firms and financial professionals.",
                href: "https://brokercheck.finra.org/",
              },
            ].map((item) => (
              <a
                key={item.name}
                href={item.href}
                target="_blank"
                rel="noopener noreferrer"
                className="transition hover:opacity-80"
              >
                <h3 className="text-lg font-bold text-cyan-400">
                  {item.name} ↗
                </h3>

                <p className="mt-3 text-sm leading-7 text-zinc-400">
                  {item.description}
                </p>
              </a>
            ))}
          </div>
        </section>

        {/* Conclusion */}

        <section className="border-t border-white/10 px-1 py-8 md:px-2">
          <h2 className="text-2xl font-black">
            Important to Understand
          </h2>

          <p className="mt-3 max-w-4xl text-sm leading-7 text-zinc-400">
            Professional presentation, technological complexity,
            and public popularity are not substitutes for
            independently verifiable evidence. Understanding
            the difference between promotional claims and
            genuine economic activity is fundamental to
            evaluating cryptocurrency opportunities.
          </p>
        </section>

      </div>
    </main>
  );
}