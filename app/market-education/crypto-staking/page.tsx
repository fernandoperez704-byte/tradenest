import Link from "next/link";

export default function CryptoStakingPage() {
  return (
    <main className="min-h-screen bg-black px-6 py-8 text-white xl:px-10">
      <div className="mx-auto w-full max-w-[1200px]">

        <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
          <div>
            <h1 className="text-4xl font-black">
              Crypto Staking
            </h1>

            <p className="mt-2 max-w-2xl text-sm leading-6 text-zinc-400">
              Understand how cryptocurrency staking works, how staking
              rewards are generated, and the responsibilities and risks
              associated with participating in blockchain networks.
            </p>
          </div>

          <Link
            href="/market-education"
            className="w-fit shrink-0 rounded-xl border border-white/10 bg-[#111827] px-4 py-2 text-sm font-bold text-zinc-300 transition hover:border-cyan-400 hover:text-cyan-300"
          >
            ← Market Education
          </Link>
        </div>

        {/* Introduction */}

        <section className="mt-8 overflow-hidden">
          <div className="relative h-[260px] overflow-hidden sm:h-[340px] lg:h-[420px]">
            <img
              src="/market-education/crypto-staking.png"
              alt="Cryptocurrency staking and network participation"
              className="h-full w-full object-cover"
            />

            <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#020617] via-transparent to-transparent" />
          </div>

          <div className="px-1 py-8 md:px-2">
          <h2 className="text-2xl font-black">
            Understanding Crypto Staking
          </h2>

          <p className="mt-3 max-w-4xl text-sm leading-7 text-zinc-400">
            Crypto staking is the process of committing eligible
            cryptocurrency to participate in the operation and
            security of a Proof of Stake blockchain. Participants
            may receive rewards in exchange for supporting the
            network according to its protocol rules.
          </p>

          <p className="mt-3 max-w-4xl text-sm leading-7 text-zinc-400">
            Staking is not available for every cryptocurrency.
            Eligibility, minimum requirements, reward distribution,
            and withdrawal conditions depend on the network and
            the staking method used.
          </p>
          </div>
        </section>

        {/* Staking Methods */}

        <section className="border-t border-white/10 px-1 py-8 md:px-2">
          <p className="text-xs font-black uppercase tracking-[0.2em] text-cyan-400">
            Participation Methods
          </p>

          <h2 className="mt-2 text-2xl font-black">
            Different Ways to Stake Cryptocurrency
          </h2>

          <div className="mt-8 grid gap-8 md:grid-cols-2 md:gap-12">
            <div>
              <h3 className="text-lg font-bold text-white">
                Solo Staking
              </h3>

              <p className="mt-3 text-sm leading-7 text-zinc-400">
                Participants operate their own validator and
                manage the necessary hardware, software, and
                network connectivity. This method provides direct
                control but may require substantial capital and
                technical knowledge.
              </p>
            </div>

            <div>
              <h3 className="text-lg font-bold text-white">
                Delegated Staking
              </h3>

              <p className="mt-3 text-sm leading-7 text-zinc-400">
                On networks that support delegation, participants
                assign staking power to an existing validator
                without operating their own infrastructure.
                Rewards are distributed according to the network's
                rules and the validator's commission structure.
              </p>
            </div>

            <div>
              <h3 className="text-lg font-bold text-white">
                Pooled Staking
              </h3>

              <p className="mt-3 text-sm leading-7 text-zinc-400">
                Multiple participants combine their cryptocurrency
                through a staking pool to meet participation
                requirements. Rewards are generally distributed
                according to each participant's contribution,
                after applicable fees.
              </p>
            </div>

            <div>
              <h3 className="text-lg font-bold text-white">
                Exchange-Based Staking
              </h3>

              <p className="mt-3 text-sm leading-7 text-zinc-400">
                Some centralized exchanges manage staking
                operations on behalf of customers. The exchange
                handles technical requirements and distributes
                rewards under its own service terms, introducing
                additional reliance on the service provider.
              </p>
            </div>
          </div>
        </section>

        {/* Network Requirements */}

        <section className="border-t border-white/10 px-1 py-8 md:px-2">
          <p className="text-xs font-black uppercase tracking-[0.2em] text-cyan-400">
            Network Requirements
          </p>

          <h2 className="mt-2 text-2xl font-black">
            Staking Across Different Blockchains
          </h2>



          <div className="mt-6 overflow-x-auto education-scrollbar">
            <table className="w-full min-w-[620px] text-left text-sm">
              <thead className="border-b border-white/10 text-zinc-300">
                <tr>
                  <th className="px-5 py-4">Network</th>
                  <th className="px-5 py-4">Asset</th>
                  <th className="px-5 py-4">Participation Examples</th>
                </tr>
              </thead>

              <tbody className="divide-y divide-white/10 text-zinc-400">
                <tr>
                  <td className="px-5 py-4 font-bold text-white">
                    Ethereum
                  </td>
                  <td className="px-5 py-4">ETH</td>
                  <td className="px-5 py-4">
                    Solo validators and third-party staking pools
                  </td>
                </tr>

                <tr>
                  <td className="px-5 py-4 font-bold text-white">
                    Solana
                  </td>
                  <td className="px-5 py-4">SOL</td>
                  <td className="px-5 py-4">
                    Validators and native delegation
                  </td>
                </tr>

                <tr>
                  <td className="px-5 py-4 font-bold text-white">
                    Cardano
                  </td>
                  <td className="px-5 py-4">ADA</td>
                  <td className="px-5 py-4">
                    Stake pools and native delegation
                  </td>
                </tr>

                <tr>
                  <td className="px-5 py-4 font-bold text-white">
                    Cosmos Hub
                  </td>
                  <td className="px-5 py-4">ATOM</td>
                  <td className="px-5 py-4">
                    Validators and native delegation
                  </td>
                </tr>

                <tr>
                  <td className="px-5 py-4 font-bold text-white">
                    Bitcoin
                  </td>
                  <td className="px-5 py-4">BTC</td>
                  <td className="px-5 py-4">
                    No native Proof of Stake participation
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          <p className="mt-6 max-w-4xl text-sm leading-7 text-zinc-400">
            Third-party products advertised as Bitcoin staking
            use mechanisms outside Bitcoin's native consensus
            system. Their rewards and risks depend on the
            external service or protocol involved.
          </p>
        </section>

        {/* Reward Sources */}

        <section className="border-t border-white/10 px-1 py-8 md:px-2">
          <p className="text-xs font-black uppercase tracking-[0.2em] text-cyan-400">
            Reward Economics
          </p>

          <h2 className="mt-2 text-2xl font-black">
            Where Staking Rewards Come From
          </h2>

          <div className="mt-8 grid gap-8 md:grid-cols-3 md:gap-10">
            <div>
              <h3 className="text-lg font-bold text-white">
                Protocol Issuance
              </h3>

              <p className="mt-3 text-sm leading-7 text-zinc-400">
                Some networks distribute newly issued cryptocurrency
                to eligible staking participants. These rewards
                are determined by the network's monetary and
                participation rules.
              </p>
            </div>

            <div>
              <h3 className="text-lg font-bold text-white">
                Transaction Revenue
              </h3>

              <p className="mt-3 text-sm leading-7 text-zinc-400">
                Depending on the blockchain, validators may receive
                a portion of transaction fees or other execution
                revenue. The amount distributed can depend on
                network activity and protocol design.
              </p>
            </div>

            <div>
              <h3 className="text-lg font-bold text-white">
                Participation Levels
              </h3>

              <p className="mt-3 text-sm leading-7 text-zinc-400">
                On some networks, the amount of cryptocurrency
                participating in staking influences the reward
                rate available to individual participants.
                Increasing participation may reduce individual
                reward rates under certain issuance models.
              </p>
            </div>


          </div>
        </section>

        {/* Reward Calculations */}

        <section className="border-t border-white/10 px-1 py-8 md:px-2">
          <p className="text-xs font-black uppercase tracking-[0.2em] text-cyan-400">
            Practical Calculations
          </p>

          <h2 className="mt-2 text-2xl font-black">
            Calculating Staking Rewards
          </h2>

          <p className="mt-3 max-w-4xl text-sm leading-7 text-zinc-400">
            Validator commissions and service fees can reduce
            the amount of cryptocurrency a participant receives.
            A validator commission is generally charged against
            earned rewards rather than the entire staked balance,
            although arrangements vary.
          </p>

          <div className="mt-6">
            <p className="text-center text-sm font-bold text-zinc-300">
              Net Rewards = Gross Rewards − Applicable Fees
            </p>
          </div>

          <h3 className="mt-6 text-lg font-bold text-white">
            Practical Example
          </h3>

          <p className="mt-3 max-w-4xl text-sm leading-7 text-zinc-400">
            Suppose a participant stakes 1,000 tokens at a
            hypothetical annual reward rate of 8%, with a
            validator commission of 10% of earned rewards.
            Assume the rate remains constant and rewards
            are not compounded.
          </p>

          <div className="mt-6 grid gap-4 md:grid-cols-3">
            <div>
              <p className="text-sm font-bold text-zinc-400">
                Gross Annual Rewards
              </p>

              <p className="mt-2 text-2xl font-black text-cyan-400">
                80 Tokens
              </p>

              <p className="mt-2 text-sm text-zinc-400">
                1,000 × 8%
              </p>
            </div>

            <div>
              <p className="text-sm font-bold text-zinc-400">
                Validator Commission
              </p>

              <p className="mt-2 text-2xl font-black text-orange-400">
                8 Tokens
              </p>

              <p className="mt-2 text-sm text-zinc-400">
                80 × 10%
              </p>
            </div>

            <div>
              <p className="text-sm font-bold text-zinc-400">
                Net Annual Rewards
              </p>

              <p className="mt-2 text-2xl font-black text-green-400">
                72 Tokens
              </p>

              <p className="mt-2 text-sm text-zinc-400">
                Effective reward rate: 7.2%
              </p>
            </div>
          </div>

          <p className="mt-6 max-w-4xl text-sm leading-7 text-zinc-400">
            This example excludes additional service fees,
            penalties, taxes, and changes in network reward
            rates. Actual rewards may differ substantially.
          </p>
        </section>

        {/* Staking Lifecycle */}

        <section className="border-t border-white/10 px-1 py-8 md:px-2">
          <p className="text-xs font-black uppercase tracking-[0.2em] text-cyan-400">
            Staking Lifecycle
          </p>

          <h2 className="mt-2 text-2xl font-black">
            From Staking to Withdrawal
          </h2>

          <p className="mt-3 max-w-4xl text-sm leading-7 text-zinc-400">
            Staking may involve several stages before
            cryptocurrency begins earning rewards or becomes
            available for withdrawal. Not every network uses
            all of these stages.
          </p>

          <div className="mt-6 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
            {[
              {
                number: "01",
                title: "Activation",
                description:
                  "The stake is registered and may enter a waiting period before becoming eligible for rewards.",
                color: "text-cyan-400",
              },
              {
                number: "02",
                title: "Active Staking",
                description:
                  "The stake participates in network operations and may generate rewards.",
                color: "text-green-400",
              },
              {
                number: "03",
                title: "Unbonding",
                description:
                  "The participant initiates the process of ending their staking participation.",
                color: "text-yellow-400",
              },
              {
                number: "04",
                title: "Withdrawal",
                description:
                  "The released cryptocurrency becomes available for transfer or other uses.",
                color: "text-orange-400",
              },
            ].map((item) => (
              <div key={item.number}>
                <p className={`text-3xl font-black ${item.color}`}>
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
        </section>

        {/* Withdrawal Conditions */}

        <section className="border-t border-white/10 px-1 py-8 md:px-2">
          <p className="text-xs font-black uppercase tracking-[0.2em] text-cyan-400">
            Asset Availability
          </p>

          <h2 className="mt-2 text-2xl font-black">
            Lockups, Unbonding, and Exit Queues
          </h2>

          <div className="mt-8 grid gap-8 md:grid-cols-3 md:gap-10">
            <div>
              <h3 className="text-lg font-bold text-white">
                Lockup Periods
              </h3>

              <p className="mt-3 text-sm leading-7 text-zinc-400">
                A lockup restricts access to committed assets
                for a specified period or until certain
                conditions are satisfied. Restrictions may
                originate from the network or a staking provider.
              </p>
            </div>

            <div>
              <h3 className="text-lg font-bold text-white">
                Unbonding Periods
              </h3>

              <p className="mt-3 text-sm leading-7 text-zinc-400">
                An unbonding period is a waiting interval after
                a participant requests to stop staking.
                During this period, assets may remain unavailable
                for transfer and may stop generating rewards.
              </p>
            </div>

            <div>
              <h3 className="text-lg font-bold text-white">
                Exit Queues
              </h3>

              <p className="mt-3 text-sm leading-7 text-zinc-400">
                Some networks limit how quickly validators can
                exit. When many participants request withdrawals,
                waiting times can increase according to network
                capacity and protocol rules.
              </p>
            </div>
          </div>
        </section>

        {/* Liquid Staking */}

        <section className="border-t border-white/10 px-1 py-8 md:px-2">
          <p className="text-xs font-black uppercase tracking-[0.2em] text-cyan-400">
            Alternative Participation
          </p>

          <h2 className="mt-2 text-2xl font-black">
            Liquid Staking
          </h2>

          <p className="mt-3 max-w-4xl text-sm leading-7 text-zinc-400">
            Liquid staking allows participants to receive a
            transferable token representing an economic claim
            on cryptocurrency committed through a staking
            protocol. This token is commonly known as a
            liquid staking token, or LST.
          </p>

          <div className="mt-6 grid gap-4 md:grid-cols-3">
            <div>
              <p className="text-sm font-bold text-cyan-400">
                Step 1
              </p>

              <h3 className="mt-2 text-lg font-bold text-white">
                Deposit Assets
              </h3>

              <p className="mt-3 text-sm leading-7 text-zinc-400">
                Cryptocurrency is deposited into a liquid
                staking protocol.
              </p>
            </div>

            <div>
              <p className="text-sm font-bold text-cyan-400">
                Step 2
              </p>

              <h3 className="mt-2 text-lg font-bold text-white">
                Receive an LST
              </h3>

              <p className="mt-3 text-sm leading-7 text-zinc-400">
                The protocol issues liquid staking tokens
                according to its conversion rate and the
                amount deposited.
              </p>
            </div>

            <div>
              <p className="text-sm font-bold text-cyan-400">
                Step 3
              </p>

              <h3 className="mt-2 text-lg font-bold text-white">
                Transfer or Redeem
              </h3>

              <p className="mt-3 text-sm leading-7 text-zinc-400">
                The token may be transferred, exchanged,
                or redeemed according to available liquidity
                and redemption conditions.
              </p>
            </div>
          </div>

          <h3 className="mt-6 text-lg font-bold text-white">
            Liquid Staking Token Valuation
          </h3>

          <p className="mt-3 max-w-4xl text-sm leading-7 text-zinc-400">
            Liquid staking tokens can account for rewards through
            an increasing token balance or an increasing redemption
            value per token. The mechanism depends on the protocol.
          </p>

          <p className="mt-3 max-w-4xl text-sm leading-7 text-zinc-400">
            Their secondary market price may differ from the
            value of the underlying staking position, particularly
            during periods of market stress or limited liquidity.
            Selling a liquid staking token does not necessarily
            provide its full underlying redemption value.
          </p>
        </section>

        {/* Validator Selection */}

        <section className="border-t border-white/10 px-1 py-8 md:px-2">
          <p className="text-xs font-black uppercase tracking-[0.2em] text-cyan-400">
            Validator Evaluation
          </p>

          <h2 className="mt-2 text-2xl font-black">
            Understanding Validator Quality
          </h2>

          <div className="mt-8 grid gap-8 md:grid-cols-2 md:gap-12">
            <div>
              <h3 className="text-lg font-bold text-white">
                Operational Reliability
              </h3>

              <p className="mt-3 text-sm leading-7 text-zinc-400">
                Historical uptime and successful completion
                of assigned duties provide information about
                a validator's operational reliability.
                Past performance does not guarantee future results.
              </p>
            </div>

            <div>
              <h3 className="text-lg font-bold text-white">
                Commission Policies
              </h3>

              <p className="mt-3 text-sm leading-7 text-zinc-400">
                Some validators can modify their commission
                rates within network-defined limits. A low
                initial commission may not remain unchanged
                throughout the staking period.
              </p>
            </div>

            <div>
              <h3 className="text-lg font-bold text-white">
                Operator Transparency
              </h3>

              <p className="mt-3 text-sm leading-7 text-zinc-400">
                Public operational information, documented
                policies, and accessible performance records
                can help participants understand how a
                validator manages its responsibilities.
              </p>
            </div>

            <div>
              <h3 className="text-lg font-bold text-white">
                Stake Concentration
              </h3>

              <p className="mt-3 text-sm leading-7 text-zinc-400">
                Concentrating substantial staking power among
                a small number of operators can create network
                dependencies and reduce the distribution of
                operational control.
              </p>
            </div>
          </div>
        </section>

        {/* Slashing */}

        <section className="border-t border-white/10 px-1 py-8 md:px-2">
          <p className="text-xs font-black uppercase tracking-[0.2em] text-cyan-400">
            Network Accountability
          </p>

          <h2 className="mt-2 text-2xl font-black">
            Slashing and Validator Penalties
          </h2>

          <p className="mt-3 max-w-4xl text-sm leading-7 text-zinc-400">
            Slashing is a protocol-defined penalty that can
            remove a portion of committed cryptocurrency when
            a validator violates specific network rules.
            Not every staking network implements slashing
            in the same way.
          </p>

          <div className="mt-8 grid gap-8 md:grid-cols-2 md:gap-12">
            <div>
              <h3 className="text-lg font-bold text-white">
                Conflicting Signatures
              </h3>

              <p className="mt-3 text-sm leading-7 text-zinc-400">
                Signing conflicting blocks or consensus
                messages can violate network security rules
                and trigger penalties on networks that
                implement slashing.
              </p>
            </div>

            <div>
              <h3 className="text-lg font-bold text-white">
                Missed Responsibilities
              </h3>

              <p className="mt-3 text-sm leading-7 text-zinc-400">
                Validators that fail to complete assigned
                duties may lose rewards, receive inactivity
                penalties, or face other consequences
                depending on the network.
              </p>
            </div>
          </div>

          <p className="mt-6 max-w-4xl text-sm leading-7 text-zinc-400">
            Delegators and staking pool participants may also
            experience financial losses resulting from validator
            penalties, depending on how responsibility is
            distributed by the network or service provider.
          </p>
        </section>

        {/* Financial Performance */}

        <section className="border-t border-white/10 px-1 py-8 md:px-2">
          <p className="text-xs font-black uppercase tracking-[0.2em] text-cyan-400">
            Investment Economics
          </p>

          <h2 className="mt-2 text-2xl font-black">
            Staking Rewards vs. Actual Financial Returns
          </h2>

          <p className="mt-3 max-w-4xl text-sm leading-7 text-zinc-400">
            Receiving additional cryptocurrency does not
            necessarily increase the monetary value of a
            staking position. Financial performance also
            depends on changes in the cryptocurrency's
            market price.
          </p>

          <h3 className="mt-6 text-lg font-bold text-white">
            Practical Example
          </h3>

          <p className="mt-3 max-w-4xl text-sm leading-7 text-zinc-400">
            Suppose a participant stakes 1,000 tokens valued
            at $10 each and receives 80 additional tokens.
            During the same period, the token price declines
            to $7.
          </p>

          <div className="mt-6 space-y-5">
            {[
              {
                label: "Initial Position — 1,000 Tokens",
                amount: "$10,000",
                width: "100%",
                barColor: "bg-cyan-500",
                textColor: "text-cyan-400",
              },
              {
                label: "Final Position — 1,080 Tokens",
                amount: "$7,560",
                width: "75.6%",
                barColor: "bg-yellow-500",
                textColor: "text-yellow-400",
              },
              {
                label: "Financial Loss",
                amount: "$2,440",
                width: "24.4%",
                barColor: "bg-red-500",
                textColor: "text-red-400",
              },
            ].map((item) => (
              <div key={item.label}>
                <div className="mb-2 flex items-center justify-between gap-4">
                  <p className="text-sm font-bold text-zinc-300">
                    {item.label}
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

          <div className="mt-6 grid gap-4 md:grid-cols-2">
            <div>
              <p className="text-sm font-bold text-zinc-400">
                Token Balance Growth
              </p>

              <p className="mt-2 text-3xl font-black text-green-400">
                +8%
              </p>
            </div>

            <div>
              <p className="text-sm font-bold text-zinc-400">
                Monetary Return
              </p>

              <p className="mt-2 text-3xl font-black text-red-400">
                −24.4%
              </p>
            </div>
          </div>

          <p className="mt-6 max-w-4xl text-sm leading-7 text-zinc-400">
            This hypothetical example excludes fees and taxes.
          </p>
        </section>

        {/* Supply Adjusted Rewards */}

        <section className="border-t border-white/10 px-1 py-8 md:px-2">
          <p className="text-xs font-black uppercase tracking-[0.2em] text-cyan-400">
            Reward Sustainability
          </p>

          <h2 className="mt-2 text-2xl font-black">
            Staking Rewards and Ownership Dilution
          </h2>

          <p className="mt-3 max-w-4xl text-sm leading-7 text-zinc-400">
            When staking rewards are funded through new token
            issuance, participants should distinguish growth
            in their personal token balance from growth in
            their proportional ownership of the network's
            token supply.
          </p>

          <div className="mt-6">
            <p className="text-center text-sm font-bold text-zinc-300">
              Supply-Adjusted Growth = (1 + Net Reward Rate) /
              (1 + Supply Growth Rate) − 1
            </p>
          </div>

          <div className="mt-8 grid gap-8 md:grid-cols-3 md:gap-10">
            <div>
              <p className="text-sm font-bold text-zinc-400">
                Net Reward Rate
              </p>

              <p className="mt-2 text-3xl font-black text-cyan-400">
                10%
              </p>
            </div>

            <div>
              <p className="text-sm font-bold text-zinc-400">
                Token Supply Growth
              </p>

              <p className="mt-2 text-3xl font-black text-orange-400">
                7%
              </p>
            </div>

            <div>
              <p className="text-sm font-bold text-zinc-400">
                Supply-Adjusted Growth
              </p>

              <p className="mt-2 text-3xl font-black text-green-400">
                2.80%
              </p>
            </div>
          </div>

          <p className="mt-6 max-w-4xl text-sm leading-7 text-zinc-400">
            In this hypothetical example, the participant's
            token balance grows by 10%, but their proportional
            share of the token supply increases by approximately
            2.80%. This calculation assumes consistent supply
            measurement and does not represent a monetary
            or purchasing-power return.
          </p>
        </section>

        {/* Staking vs Lending */}

        <section className="border-t border-white/10 px-1 py-8 md:px-2">
          <p className="text-xs font-black uppercase tracking-[0.2em] text-cyan-400">
            Financial Distinctions
          </p>

          <h2 className="mt-2 text-2xl font-black">
            Staking vs. Cryptocurrency Lending
          </h2>

          <p className="mt-3 max-w-4xl text-sm leading-7 text-zinc-400">
            Cryptocurrency platforms sometimes group staking
            and lending under similar reward programs.
            However, these activities serve different
            economic purposes.
          </p>

          <div className="mt-6 overflow-x-auto education-scrollbar">
            <table className="w-full min-w-[620px] text-left text-sm">
              <thead className="border-b border-white/10 text-zinc-300">
                <tr>
                  <th className="px-5 py-4">Characteristic</th>
                  <th className="px-5 py-4">Staking</th>
                  <th className="px-5 py-4">Lending</th>
                </tr>
              </thead>

              <tbody className="divide-y divide-white/10 text-zinc-400">
                <tr>
                  <td className="px-5 py-4 font-bold text-white">
                    Primary Purpose
                  </td>
                  <td className="px-5 py-4">
                    Network participation
                  </td>
                  <td className="px-5 py-4">
                    Providing capital to borrowers
                  </td>
                </tr>

                <tr>
                  <td className="px-5 py-4 font-bold text-white">
                    Reward Source
                  </td>
                  <td className="px-5 py-4">
                    Protocol rewards and eligible fees
                  </td>
                  <td className="px-5 py-4">
                    Borrowing interest and incentives
                  </td>
                </tr>

                <tr>
                  <td className="px-5 py-4 font-bold text-white">
                    Primary Dependency
                  </td>
                  <td className="px-5 py-4">
                    Network and validator performance
                  </td>
                  <td className="px-5 py-4">
                    Borrower and protocol solvency
                  </td>
                </tr>

                <tr>
                  <td className="px-5 py-4 font-bold text-white">
                    Asset Availability
                  </td>
                  <td className="px-5 py-4">
                    Network and provider withdrawal rules
                  </td>
                  <td className="px-5 py-4">
                    Available liquidity and lending terms
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          <p className="mt-6 max-w-4xl text-sm leading-7 text-zinc-400">
            Understanding the underlying activity is more
            important than the marketing name assigned
            to a cryptocurrency reward product.
          </p>
        </section>

        {/* Additional Risks */}

        <section className="border-t border-white/10 px-1 py-8 md:px-2">
          <p className="text-xs font-black uppercase tracking-[0.2em] text-cyan-400">
            Risk Awareness
          </p>

          <h2 className="mt-2 text-2xl font-black">
            Additional Staking Considerations
          </h2>

          <div className="mt-8 grid gap-8 md:grid-cols-2 md:gap-12">
            <div>
              <h3 className="text-lg font-bold text-white">
                Provider Insolvency
              </h3>

              <p className="mt-3 text-sm leading-7 text-zinc-400">
                Custodial staking providers may experience
                financial difficulties that prevent customers
                from recovering their assets, even when the
                underlying blockchain continues operating.
              </p>
            </div>

            <div>
              <h3 className="text-lg font-bold text-white">
                Changing Protocol Rules
              </h3>

              <p className="mt-3 text-sm leading-7 text-zinc-400">
                Blockchain upgrades and governance decisions
                can modify staking requirements, reward
                distribution, withdrawal conditions, and
                participation incentives.
              </p>
            </div>

            <div>
              <h3 className="text-lg font-bold text-white">
                Additional Protocol Exposure
              </h3>

              <p className="mt-3 text-sm leading-7 text-zinc-400">
                Liquid staking and other third-party staking
                arrangements may introduce smart contract
                dependencies beyond those of the underlying
                blockchain.
              </p>
            </div>

            <div>
              <h3 className="text-lg font-bold text-white">
                Tax Considerations
              </h3>

              <p className="mt-3 text-sm leading-7 text-zinc-400">
                Staking rewards may create taxable income
                or reporting obligations before the received
                cryptocurrency is sold. Treatment depends
                on the participant's jurisdiction and
                applicable tax rules.
              </p>
            </div>
          </div>
        </section>

        {/* Conclusion */}

        <section className="mt-6 border-t border-white/10 px-2 py-5">
          <p className="text-xs font-black uppercase tracking-[0.2em] text-cyan-400">
            Important to Understand
          </p>

          <p className="mt-2 text-sm leading-6 text-zinc-400">
            Staking is a form of network participation,
            not a guaranteed savings product. Evaluating
            a staking arrangement requires understanding
            its underlying economic mechanism, participation
            requirements, and financial obligations rather
            than relying solely on an advertised reward rate.
          </p>
        </section>

      </div>
    </main>
  );
}