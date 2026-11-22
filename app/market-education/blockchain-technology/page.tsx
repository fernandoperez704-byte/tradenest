
import Link from "next/link";
import Navbar from "../../components/Navbar";

const transactionSteps = [
  {
    title: "Transaction Created",
    description:
      "A user initiates a transaction and authorizes it with a digital signature.",
  },
  {
    title: "Network Verification",
    description:
      "Network participants check the transaction against the blockchain's rules.",
  },
  {
    title: "Block Formation",
    description:
      "Valid transactions are collected into a block through the network's consensus process.",
  },
  {
    title: "Blockchain Updated",
    description:
      "The accepted block becomes part of the shared transaction history.",
  },
];

const applications = [
  {
    title: "Cryptocurrencies",
    description:
      "Blockchain networks can record and verify transfers of digital assets such as Bitcoin.",
  },
  {
    title: "Smart Contracts",
    description:
      "Programs stored on certain blockchains can execute predefined rules automatically.",
  },
  {
    title: "Supply Chains",
    description:
      "Shared records can help organizations track the movement and history of goods.",
  },
  {
    title: "Financial Services",
    description:
      "Blockchain can support asset tokenization, transfers, and settlement systems.",
  },
];

export default function BlockchainTechnologyPage() {
  return (
    <>
      <Navbar />

      <main className="min-h-screen bg-black px-6 py-8 text-white xl:px-10">
        <div className="mx-auto w-full max-w-[1200px]">
          {/* HEADER */}
          <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
            <div>
              <h1 className="text-4xl font-black">
                Blockchain Technology
              </h1>

              <p className="mt-2 max-w-2xl text-sm leading-6 text-zinc-400">
                Understand the technology behind cryptocurrencies,
                decentralized networks, and shared digital records.
              </p>
            </div>

            <Link
              href="/market-education"
              className="w-fit shrink-0 rounded-xl border border-white/10 bg-[#111827] px-4 py-2 text-sm font-bold text-zinc-300 transition hover:border-cyan-400 hover:text-cyan-300"
            >
              ← Market Education
            </Link>
          </div>


          {/* INTRODUCTION */}
          <section className="mt-8 overflow-hidden">
            <div className="relative h-[260px] overflow-hidden sm:h-[340px] lg:h-[420px]">
              <img
                src="/market-education/blockchain-technology.png"
                alt="Blockchain network with interconnected digital blocks"
                className="h-full w-full object-cover"
              />
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#020617] via-transparent to-transparent" />
            </div>

            <div className="px-1 py-8 md:px-2">
              <h2 className="text-2xl font-black">
                A Shared Digital Record
              </h2>

              <p className="mt-3 max-w-4xl text-sm leading-7 text-zinc-400">
                Blockchain is a digital system that records information
                in a sequence of connected blocks. It creates a
                chronological history of transactions that can be
                verified according to the network's rules.
              </p>

              <p className="mt-3 max-w-4xl text-sm leading-7 text-zinc-400">
                Information is organized into blocks that are linked
                using cryptographic hashes. Each block references the
                previous block, making changes to historical records
                difficult without detection.
              </p>
            </div>
          </section>



          {/* HOW BLOCKCHAIN WORKS */}
          <section className="mt-4 border-t border-white/10 px-1 py-8 md:px-2">
            <p className="text-xs font-black uppercase tracking-[0.2em] text-cyan-400">
              How Blockchain Works
            </p>

            <h2 className="mt-2 text-2xl font-black">
              From Transaction to Permanent Record
            </h2>

            <p className="mt-3 max-w-4xl text-sm leading-7 text-zinc-400">
              Blockchain networks use verification and consensus processes
              to agree on which transactions become part of their shared
              history. The process generally follows four stages.
            </p>

            <div className="mt-8 grid gap-6 md:grid-cols-4 md:gap-4">
              {transactionSteps.map((step, index) => (
                <div key={step.title} className="relative">
                  <div className="flex items-center gap-3">
                    <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-cyan-400/40 text-sm font-black text-cyan-300">
                      {index + 1}
                    </span>

                    {index < transactionSteps.length - 1 && (
                      <div className="hidden h-px flex-1 bg-cyan-400/40 md:block" />
                    )}
                  </div>

                  <h3 className="mt-4 text-base font-bold text-white">
                    {step.title}
                  </h3>

                  <p className="mt-2 text-sm leading-7 text-zinc-400">
                    {step.description}
                  </p>
                </div>
              ))}
            </div>

            <p className="mt-7 text-xs leading-6 text-zinc-500">
              The exact verification and confirmation process varies
              depending on the blockchain network.
            </p>
          </section>



          {/* DECENTRALIZATION */}
          <section className="border-t border-white/10 px-1 py-8 md:px-2">
            <p className="text-xs font-black uppercase tracking-[0.2em] text-cyan-400">
              Decentralization
            </p>

            <h2 className="mt-2 text-2xl font-black">
              Centralized vs. Decentralized Networks
            </h2>

            <p className="mt-3 max-w-4xl text-sm leading-7 text-zinc-400">
              Traditional systems often depend on a central organization
              to manage records. Public blockchains distribute verification
              and recordkeeping across participating computers.
            </p>

            <div className="mt-8 grid gap-8 md:grid-cols-2 md:gap-12">
              {/* CENTRALIZED */}
              <div>
                <h3 className="text-lg font-bold text-white">
                  Centralized System
                </h3>

                <svg
                  viewBox="0 0 300 140"
                  className="mt-4 h-40 w-full"
                  aria-label="Centralized network diagram"
                  role="img"
                >
                  {[
                    [55, 25],
                    [245, 25],
                    [55, 115],
                    [245, 115],
                  ].map(([x, y], index) => (
                    <g key={index}>
                      <line
                        x1="150"
                        y1="70"
                        x2={x}
                        y2={y}
                        stroke="#64748b"
                        strokeWidth="2"
                      />
                      <circle cx={x} cy={y} r="11" fill="#64748b" />
                    </g>
                  ))}

                  <circle
                    cx="150"
                    cy="70"
                    r="23"
                    fill="#164e63"
                    stroke="#22d3ee"
                    strokeWidth="2"
                  />
                </svg>

                <p className="mt-3 text-sm leading-7 text-zinc-400">
                  One central authority controls the main record
                  and manages access to the system.
                </p>
              </div>

              {/* DECENTRALIZED */}
              <div>
                <h3 className="text-lg font-bold text-white">
                  Decentralized System
                </h3>

                <svg
                  viewBox="0 0 300 140"
                  className="mt-4 h-40 w-full"
                  aria-label="Decentralized network diagram"
                  role="img"
                >
                  {[
                    [55, 25],
                    [150, 20],
                    [245, 25],
                    [55, 115],
                    [150, 120],
                    [245, 115],
                  ].map(([x, y], index, nodes) => (
                    <g key={index}>
                      {nodes.slice(index + 1).map(([x2, y2], next) => (
                        <line
                          key={next}
                          x1={x}
                          y1={y}
                          x2={x2}
                          y2={y2}
                          stroke="#155e75"
                          strokeWidth="1.5"
                        />
                      ))}

                      <circle
                        cx={x}
                        cy={y}
                        r="11"
                        fill="#164e63"
                        stroke="#22d3ee"
                        strokeWidth="2"
                      />
                    </g>
                  ))}
                </svg>

                <p className="mt-3 text-sm leading-7 text-zinc-400">
                  Multiple participants help maintain and verify
                  the network without relying on one recordkeeper.
                </p>
              </div>
            </div>
          </section>



          {/* BLOCKCHAIN TYPES */}
          <section className="border-t border-white/10 px-1 py-8 md:px-2">
            <p className="text-xs font-black uppercase tracking-[0.2em] text-cyan-400">
              Blockchain Networks
            </p>

            <h2 className="mt-2 text-2xl font-black">
              Not All Blockchains Work the Same Way
            </h2>

            <p className="mt-3 max-w-4xl text-sm leading-7 text-zinc-400">
              Blockchain networks can differ in who can access them,
              verify transactions, and manage their records.
              Three common types are public, private, and consortium
              blockchains.
            </p>

            <div className="mt-8 grid gap-8 md:grid-cols-3 md:gap-10">
              <div>
                <h3 className="text-lg font-bold text-white">
                  Public Blockchain
                </h3>

                <p className="mt-3 text-sm leading-7 text-zinc-400">
                  An open network where anyone can generally view
                  records and participate according to the
                  protocol's rules.
                </p>

                <p className="mt-3 text-xs font-bold text-cyan-300">
                  Examples: Bitcoin and Ethereum
                </p>
              </div>

              <div>
                <h3 className="text-lg font-bold text-white">
                  Private Blockchain
                </h3>

                <p className="mt-3 text-sm leading-7 text-zinc-400">
                  A restricted network managed by an organization
                  that determines who can access information,
                  validate transactions, or participate.
                </p>

                <p className="mt-3 text-xs font-bold text-cyan-300">
                  Common Use: Internal Business Systems
                </p>
              </div>

              <div>
                <h3 className="text-lg font-bold text-white">
                  Consortium Blockchain
                </h3>

                <p className="mt-3 text-sm leading-7 text-zinc-400">
                  A network governed by multiple organizations
                  that share responsibility for maintaining
                  records and controlling participation.
                </p>

                <p className="mt-3 text-xs font-bold text-cyan-300">
                  Common Use: Business Partnerships
                </p>
              </div>
            </div>
          </section>



          {/* CONSENSUS */}
          <section className="border-t border-white/10 px-1 py-8 md:px-2">
            <p className="text-xs font-black uppercase tracking-[0.2em] text-cyan-400">
              Network Consensus
            </p>

            <h2 className="mt-2 text-2xl font-black">
              Proof of Work vs. Proof of Stake
            </h2>

            <p className="mt-3 max-w-4xl text-sm leading-7 text-zinc-400">
              Consensus mechanisms help blockchain networks agree
              on valid records and resist fraudulent changes.
              Two widely used approaches are Proof of Work and
              Proof of Stake.
            </p>

            <div className="mt-8 grid gap-8 md:grid-cols-2 md:gap-12">
              <div>
                <h3 className="text-lg font-bold text-white">
                  Proof of Work (PoW)
                </h3>

                <p className="mt-3 text-sm leading-7 text-zinc-400">
                  Miners use computing power to compete in solving
                  cryptographic puzzles. The successful miner can
                  propose a new block, which other network participants
                  verify according to the blockchain's rules.
                </p>

                <p className="mt-3 text-sm leading-7 text-zinc-400">
                  This process helps secure the network but requires
                  substantial computational resources and electricity.
                </p>

                <p className="mt-4 text-xs font-bold text-cyan-300">
                  Example: Bitcoin
                </p>
              </div>

              <div>
                <h3 className="text-lg font-bold text-white">
                  Proof of Stake (PoS)
                </h3>

                <p className="mt-3 text-sm leading-7 text-zinc-400">
                  Validators commit cryptocurrency as stake to
                  participate in securing the network. The protocol
                  selects validators to propose or confirm blocks
                  according to its consensus rules.
                </p>

                <p className="mt-3 text-sm leading-7 text-zinc-400">
                  Proof of Stake generally requires much less
                  electricity than Proof of Work because it does
                  not depend on competitive mining.
                </p>

                <p className="mt-4 text-xs font-bold text-cyan-300">
                  Example: Ethereum
                </p>
              </div>
            </div>
          </section>



          {/* APPLICATIONS */}
          <section className="border-t border-white/10 px-1 py-8 md:px-2">
            <p className="text-xs font-black uppercase tracking-[0.2em] text-cyan-400">
              Real-World Applications
            </p>

            <h2 className="mt-2 text-2xl font-black">
              Blockchain Beyond Cryptocurrency
            </h2>

            <p className="mt-3 max-w-4xl text-sm leading-7 text-zinc-400">
              Although blockchain is best known for cryptocurrencies,
              the technology can also support other systems that
              benefit from shared, verifiable records.
            </p>

            <div className="mt-8 grid gap-x-12 gap-y-8 md:grid-cols-2">
              {applications.map((item) => (
                <div key={item.title}>
                  <h3 className="text-lg font-bold text-white">
                    {item.title}
                  </h3>

                  <p className="mt-3 text-sm leading-7 text-zinc-400">
                    {item.description}
                  </p>
                </div>
              ))}
            </div>
          </section>



          {/* BENEFITS AND LIMITATIONS */}
          <section className="border-t border-white/10 px-1 py-8 md:px-2">
            <p className="text-xs font-black uppercase tracking-[0.2em] text-cyan-400">
              Benefits and Limitations
            </p>

            <h2 className="mt-2 text-2xl font-black">
              What Blockchain Can and Cannot Do
            </h2>

            <p className="mt-3 max-w-4xl text-sm leading-7 text-zinc-400">
              Blockchain offers advantages for maintaining shared
              records, but it also introduces technical challenges
              and risks that are important to understand.
            </p>

            <div className="mt-8 grid gap-8 md:grid-cols-2 md:gap-12">
              <div>
                <h3 className="text-lg font-bold text-white">
                  Potential Benefits
                </h3>

                <ul className="mt-4 list-disc space-y-3 pl-5 text-sm leading-7 text-zinc-400">
                  <li>Cryptographic links help make unauthorized changes detectable.</li>
                  <li>Records can be independently audited on public networks.</li>
                  <li>Greater transparency into transaction history.</li>
                  <li>Automated processes can reduce manual coordination.</li>
                </ul>
              </div>

              <div>
                <h3 className="text-lg font-bold text-white">
                  Limitations and Risks
                </h3>

                <ul className="mt-4 list-disc space-y-3 pl-5 text-sm leading-7 text-zinc-400">
                  <li>Network congestion and transaction fees.</li>
                  <li>Scalability and performance limitations.</li>
                  <li>Smart contract vulnerabilities and scams.</li>
                  <li>Difficult or impossible transaction reversals.</li>
                </ul>
              </div>
            </div>
          </section>


          {/* FINAL EXPLANATION */}
          <section className="mt-6 border-t border-white/10 px-2 py-5">
            <p className="text-xs font-black uppercase tracking-[0.2em] text-cyan-400">
              Important to Understand
            </p>

            <p className="mt-2 text-sm leading-6 text-zinc-400">
              Blockchain technology provides a way to maintain
              shared and verifiable records, but using blockchain
              does not automatically make a project trustworthy,
              an investment safe, or its information accurate.
            </p>
          </section>
        </div>
      </main>
    </>
  );
}
