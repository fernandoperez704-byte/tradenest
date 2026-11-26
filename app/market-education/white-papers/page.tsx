
import Link from "next/link";
import Navbar from "../../components/Navbar";

export default function WhitePapersPage() {
  return (
    <>
      <Navbar />

      <main className="min-h-screen bg-black px-6 py-8 text-white xl:px-10">
        <div className="mx-auto w-full max-w-[1200px]">

          <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
            <div>
              <h1 className="text-4xl font-black">
                Cryptocurrency White Papers
              </h1>

              <p className="mt-2 max-w-2xl text-sm leading-6 text-zinc-400">
                Understand how to read cryptocurrency white papers,
                interpret technical proposals, evaluate project
                objectives, and distinguish documented plans
                from demonstrated results.
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
                src="/market-education/white-papers.png"
                alt="Cryptocurrency white papers and technical research"
                className="h-full w-full object-cover"
              />

              <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#020617] via-transparent to-transparent" />
            </div>

            <div className="px-1 py-8 md:px-2">
              <h2 className="text-2xl font-black">
                Understanding Cryptocurrency White Papers
              </h2>

              <p className="mt-3 max-w-4xl text-sm leading-7 text-zinc-400">
                A cryptocurrency white paper is a document that
                presents the objectives, reasoning, and proposed
                design of a cryptocurrency or blockchain project.
                It may explain the problem the project intends to
                address, the mechanisms it proposes, and the
                assumptions behind its development.
              </p>

              <p className="mt-3 max-w-4xl text-sm leading-7 text-zinc-400">
                Unlike a standardized financial disclosure,
                cryptocurrency white papers do not follow a
                universal format. Their technical depth, accuracy,
                completeness, and legal significance can vary
                considerably between projects.
              </p>
            </div>
          </section>

          {/* HISTORICAL DEVELOPMENT */}

          <section className="mt-4 border-t border-white/10 px-1 py-8 md:px-2">
            <p className="text-xs font-black uppercase tracking-[0.2em] text-cyan-400">
              Historical Development
            </p>

            <h2 className="mt-2 text-2xl font-black">
              The Role of White Papers in Cryptocurrency
            </h2>

            <div className="mt-8 grid gap-8 md:grid-cols-2 md:gap-12">
              <div>
                <p className="text-3xl font-black text-cyan-400">
                  2008
                </p>

                <h3 className="mt-3 text-lg font-bold text-white">
                  Bitcoin White Paper
                </h3>

                <p className="mt-3 text-sm leading-7 text-zinc-400">
                  Bitcoin: A Peer-to-Peer Electronic Cash System
                  presented a proposal for electronic payments
                  without requiring a trusted financial intermediary.
                  The document described the problem of double
                  spending and proposed a mechanism for establishing
                  an agreed transaction history.
                </p>

                <a
                  href="https://bitcoin.org/bitcoin.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-4 inline-block text-sm font-bold text-cyan-400 transition hover:text-cyan-300"
                >
                  Read the Bitcoin White Paper →
                </a>
              </div>

              <div>
                <p className="text-3xl font-black text-cyan-400">
                  2013
                </p>

                <h3 className="mt-3 text-lg font-bold text-white">
                  Ethereum White Paper
                </h3>

                <p className="mt-3 text-sm leading-7 text-zinc-400">
                  Ethereum's original proposal described a
                  programmable blockchain capable of supporting
                  applications beyond electronic payments.
                  Its white paper introduced a broader vision
                  for executing application logic through a
                  shared decentralized infrastructure.
                </p>

                <a
                  href="https://ethereum.org/en/whitepaper/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-4 inline-block text-sm font-bold text-cyan-400 transition hover:text-cyan-300"
                >
                  Read the Ethereum White Paper →
                </a>
              </div>
            </div>


          </section>

          {/* DOCUMENT TYPES */}

          <section className="border-t border-white/10 px-1 py-8 md:px-2">
            <p className="text-xs font-black uppercase tracking-[0.2em] text-cyan-400">
              Documentation
            </p>

            <h2 className="mt-2 text-2xl font-black">
              Different Types of Project Documentation
            </h2>

            <div className="mt-8 grid gap-8 md:grid-cols-2 md:gap-12">
              <div>
                <h3 className="text-lg font-bold text-white">
                  White Paper
                </h3>

                <p className="mt-3 text-sm leading-7 text-zinc-400">
                  Typically provides more technical reasoning
                  than a litepaper while remaining less
                  implementation-specific than a formal
                  technical specification.
                </p>
              </div>

              <div>
                <h3 className="text-lg font-bold text-white">
                  Litepaper
                </h3>

                <p className="mt-3 text-sm leading-7 text-zinc-400">
                  Provides a shorter and more accessible overview
                  of a project. It typically emphasizes the main
                  objectives and features while omitting detailed
                  technical explanations and formal specifications.
                </p>
              </div>

              <div>
                <h3 className="text-lg font-bold text-white">
                  Technical Specification
                </h3>

                <p className="mt-3 text-sm leading-7 text-zinc-400">
                  Defines precise system behavior, mathematical
                  rules, data structures, interfaces, and other
                  requirements needed to implement or independently
                  verify a protocol.
                </p>
              </div>

              <div>
                <h3 className="text-lg font-bold text-white">
                  Developer Documentation
                </h3>

                <p className="mt-3 text-sm leading-7 text-zinc-400">
                  Explains how to interact with an implemented
                  system. It may include installation instructions,
                  programming interfaces, configuration examples,
                  and integration requirements.
                </p>
              </div>
            </div>
          </section>

          {/* DOCUMENT STRUCTURE */}

          <section className="border-t border-white/10 px-1 py-8 md:px-2">
            <p className="text-xs font-black uppercase tracking-[0.2em] text-cyan-400">
              Document Structure
            </p>

            <h2 className="mt-2 text-2xl font-black">
              Common Components of a White Paper
            </h2>

            <div className="mt-8 space-y-8">
              {[
                {
                  number: "01",
                  title: "Abstract",
                  description:
                    "Summarizes the central proposal and its intended contribution. It helps readers determine the document's purpose before examining the detailed explanation.",
                },
                {
                  number: "02",
                  title: "Problem Statement",
                  description:
                    "Identifies the limitations or challenges the project intends to address and explains why existing approaches may be insufficient.",
                },
                {
                  number: "03",
                  title: "Proposed Architecture",
                  description:
                    "Describes the system's components, their responsibilities, and how they are expected to interact.",
                },
                {
                  number: "04",
                  title: "Assumptions and Constraints",
                  description:
                    "Establishes the conditions under which the proposed mechanisms are expected to operate, including technical dependencies and limitations.",
                },
                {
                  number: "05",
                  title: "Evaluation and References",
                  description:
                    "May present experiments, mathematical analysis, comparisons, and references that support the document's technical reasoning.",
                },
              ].map((item, index, items) => (
                <div
                  key={item.number}
                  className="relative flex gap-5"
                >
                  {index < items.length - 1 && (
                    <div className="absolute left-[19px] top-10 h-[calc(100%+8px)] w-px bg-white/10" />
                  )}

                  <div className="relative flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-cyan-400/40 bg-black text-sm font-black text-cyan-400">
                    {item.number}
                  </div>

                  <div className="pb-2">
                    <h3 className="text-lg font-bold text-white">
                      {item.title}
                    </h3>

                    <p className="mt-2 max-w-4xl text-sm leading-7 text-zinc-400">
                      {item.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* PROBLEM AND SOLUTION */}

          <section className="border-t border-white/10 px-1 py-8 md:px-2">
            <p className="text-xs font-black uppercase tracking-[0.2em] text-cyan-400">
              Project Objectives
            </p>

            <h2 className="mt-2 text-2xl font-black">
              Evaluating the Problem and Proposed Solution
            </h2>

            <p className="mt-3 max-w-4xl text-sm leading-7 text-zinc-400">
              A project's proposed solution should be evaluated
              in relation to the specific problem it claims to
              address. Technical complexity alone does not
              establish that a solution is necessary or superior
              to existing alternatives.
            </p>

            <div className="mt-8 grid gap-8 md:grid-cols-3 md:gap-10">
              <div>
                <h3 className="text-lg font-bold text-white">
                  Problem Definition
                </h3>

                <p className="mt-3 text-sm leading-7 text-zinc-400">
                  A well-defined problem identifies who experiences
                  the difficulty, under what circumstances it
                  occurs, and why it remains unresolved.
                </p>
              </div>

              <div>
                <h3 className="text-lg font-bold text-white">
                  Existing Alternatives
                </h3>

                <p className="mt-3 text-sm leading-7 text-zinc-400">
                  Comparing the proposal with established
                  technologies helps determine whether it
                  introduces a meaningful improvement or
                  simply approaches an existing problem
                  differently.
                </p>
              </div>

              <div>
                <h3 className="text-lg font-bold text-white">
                  Measurable Improvement
                </h3>

                <p className="mt-3 text-sm leading-7 text-zinc-400">
                  Improvements should be connected to identifiable
                  outcomes, such as reduced processing costs,
                  shorter settlement times, or improved
                  accessibility under defined conditions.
                </p>
              </div>
            </div>

            <h3 className="mt-8 text-lg font-bold text-white">
              Practical Example
            </h3>

            <div className="mt-6 grid gap-8 md:grid-cols-2 md:gap-12">
              <div>
                <p className="text-sm font-black uppercase tracking-wider text-orange-400">
                  Broad Claim
                </p>

                <p className="mt-3 text-lg font-bold text-white">
                  "Our network will revolutionize global payments."
                </p>

                <p className="mt-3 text-sm leading-7 text-zinc-400">
                  The statement communicates an ambition but
                  does not identify a measurable problem or
                  explain how the proposed improvement would
                  be evaluated.
                </p>
              </div>

              <div>
                <p className="text-sm font-black uppercase tracking-wider text-green-400">
                  Defined Objective
                </p>

                <p className="mt-3 text-lg font-bold text-white">
                  "Our protocol aims to reduce settlement time
                  for cross-border payments."
                </p>

                <p className="mt-3 text-sm leading-7 text-zinc-400">
                  The objective identifies a specific area of
                  improvement that can be investigated through
                  settlement measurements and comparisons
                  with existing payment systems.
                </p>
              </div>
            </div>
          </section>

          {/* TECHNICAL FEASIBILITY */}

          <section className="border-t border-white/10 px-1 py-8 md:px-2">
            <p className="text-xs font-black uppercase tracking-[0.2em] text-cyan-400">
              Technical Analysis
            </p>

            <h2 className="mt-2 text-2xl font-black">
              Understanding Technical Feasibility
            </h2>

            <p className="mt-3 max-w-4xl text-sm leading-7 text-zinc-400">
              Technical feasibility concerns whether a proposed
              system can operate as described under realistic
              conditions. A theoretically possible mechanism
              may still face practical limitations when
              implemented at scale.
            </p>

            <div className="mt-8 grid gap-8 md:grid-cols-2 md:gap-12">
              <div>
                <h3 className="text-lg font-bold text-white">
                  Operating Assumptions
                </h3>

                <p className="mt-3 text-sm leading-7 text-zinc-400">
                  A design may depend on assumptions about
                  participant behavior, network connectivity,
                  available computing resources, or the
                  reliability of external systems.
                </p>
              </div>

              <div>
                <h3 className="text-lg font-bold text-white">
                  Resource Requirements
                </h3>

                <p className="mt-3 text-sm leading-7 text-zinc-400">
                  Storage, processing power, bandwidth, and
                  operational costs can influence whether a
                  proposed architecture remains practical as
                  usage increases.
                </p>
              </div>

              <div>
                <h3 className="text-lg font-bold text-white">
                  Technical Trade-Offs
                </h3>

                <p className="mt-3 text-sm leading-7 text-zinc-400">
                  Improving one system characteristic may
                  introduce disadvantages elsewhere. Greater
                  performance, for example, may require more
                  powerful infrastructure or additional
                  coordination between participants.
                </p>
              </div>

              <div>
                <h3 className="text-lg font-bold text-white">
                  Failure Conditions
                </h3>

                <p className="mt-3 text-sm leading-7 text-zinc-400">
                  Technical analysis should consider how the
                  proposed system behaves when components
                  become unavailable, communication is delayed,
                  or expected operating conditions are violated.
                </p>
              </div>
            </div>
          </section>

          {/* PERFORMANCE CLAIMS */}

          <section className="border-t border-white/10 px-1 py-8 md:px-2">
            <p className="text-xs font-black uppercase tracking-[0.2em] text-cyan-400">
              Performance Measurements
            </p>

            <h2 className="mt-2 text-2xl font-black">
              Interpreting Technical Performance Claims
            </h2>

            <p className="mt-3 max-w-4xl text-sm leading-7 text-zinc-400">
              Performance figures are meaningful only when
              their measurement conditions are understood.
              Results obtained in controlled environments may
              differ from performance observed during public
              network operation.
            </p>

            <h3 className="mt-6 text-lg font-bold text-white">
              Hypothetical Throughput Comparison
            </h3>

            <div className="mt-8 space-y-6">
              {[
                {
                  label: "Theoretical Maximum",
                  value: "100,000 TPS",
                  width: "100%",
                  barColor: "bg-cyan-500",
                  textColor: "text-cyan-400",
                },
                {
                  label: "Controlled Test Environment",
                  value: "25,000 TPS",
                  width: "25%",
                  barColor: "bg-yellow-500",
                  textColor: "text-yellow-400",
                },
                {
                  label: "Observed Public Network Throughput",
                  value: "4,000 TPS",
                  width: "4%",
                  barColor: "bg-green-500",
                  textColor: "text-green-400",
                },
              ].map((item) => (
                <div key={item.label}>
                  <div className="mb-2 flex items-center justify-between gap-4">
                    <p className="text-sm font-bold text-zinc-300">
                      {item.label}
                    </p>

                    <p className={`shrink-0 text-sm font-bold ${item.textColor}`}>
                      {item.value}
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
              These illustrative figures do not represent an
              actual cryptocurrency network. Observed throughput
              measures processed activity and may be limited
              by demand rather than maximum system capacity.
              A valid comparison requires equivalent workloads,
              measurement methods, and operating conditions.
            </p>

            <div className="mt-8 grid gap-8 md:grid-cols-3 md:gap-10">
              <div>
                <h3 className="text-lg font-bold text-white">
                  Throughput
                </h3>

                <p className="mt-3 text-sm leading-7 text-zinc-400">
                  Measures the amount of activity processed
                  within a given period. Transactions per
                  second, or TPS, is a commonly used unit.
                </p>
              </div>

              <div>
                <h3 className="text-lg font-bold text-white">
                  Latency
                </h3>

                <p className="mt-3 text-sm leading-7 text-zinc-400">
                  Measures the time between submitting an
                  operation and reaching a specified processing
                  or confirmation stage.
                </p>
              </div>

              <div>
                <h3 className="text-lg font-bold text-white">
                  Finality
                </h3>

                <p className="mt-3 text-sm leading-7 text-zinc-400">
                  Describes the degree of assurance that a
                  recorded transaction will not be reversed.
                  Confirmation and finality are not necessarily
                  equivalent.
                </p>
              </div>
            </div>
          </section>

          {/* SUPPORTING EVIDENCE */}

          <section className="border-t border-white/10 px-1 py-8 md:px-2">
            <p className="text-xs font-black uppercase tracking-[0.2em] text-cyan-400">
              Supporting Evidence
            </p>

            <h2 className="mt-2 text-2xl font-black">
              Distinguishing Claims from Evidence
            </h2>

            <div className="mt-6 overflow-x-auto education-scrollbar">
              <table className="w-full min-w-[680px] text-left text-sm">
                <thead className="border-b border-white/10 text-zinc-300">
                  <tr>
                    <th className="px-5 py-4">
                      Evidence Type
                    </th>
                    <th className="px-5 py-4">
                      What It Establishes
                    </th>
                    <th className="px-5 py-4">
                      Limitations
                    </th>
                  </tr>
                </thead>

                <tbody className="divide-y divide-white/10 text-zinc-400">
                  <tr>
                    <td className="px-5 py-4 font-bold text-white">
                      Written Proposal
                    </td>
                    <td className="px-5 py-4">
                      Intended system design
                    </td>
                    <td className="px-5 py-4">
                      Does not demonstrate implementation
                    </td>
                  </tr>

                  <tr>
                    <td className="px-5 py-4 font-bold text-white">
                      Mathematical Analysis
                    </td>
                    <td className="px-5 py-4">
                      Properties under defined assumptions
                    </td>
                    <td className="px-5 py-4">
                      Depends on the validity of the model
                    </td>
                  </tr>

                  <tr>
                    <td className="px-5 py-4 font-bold text-white">
                      Prototype
                    </td>
                    <td className="px-5 py-4">
                      Partial or experimental implementation
                    </td>
                    <td className="px-5 py-4">
                      May not support production requirements
                    </td>
                  </tr>

                  <tr>
                    <td className="px-5 py-4 font-bold text-white">
                      Independent Testing
                    </td>
                    <td className="px-5 py-4">
                      Observations under documented conditions
                    </td>
                    <td className="px-5 py-4">
                      Limited to the scope of the tests
                    </td>
                  </tr>

                  <tr>
                    <td className="px-5 py-4 font-bold text-white">
                      Production Data
                    </td>
                    <td className="px-5 py-4">
                      Observed real-world operation
                    </td>
                    <td className="px-5 py-4">
                      Historical results may not persist
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>


          </section>

          {/* RESEARCH QUALITY */}

          <section className="border-t border-white/10 px-1 py-8 md:px-2">
            <p className="text-xs font-black uppercase tracking-[0.2em] text-cyan-400">
              Research Quality
            </p>

            <h2 className="mt-2 text-2xl font-black">
              Evaluating Research and References
            </h2>

            <div className="mt-8 grid gap-8 md:grid-cols-2 md:gap-12">
              <div>
                <h3 className="text-lg font-bold text-white">
                  Primary Sources
                </h3>

                <p className="mt-3 text-sm leading-7 text-zinc-400">
                  References to original research, formal
                  specifications, and published experiments
                  allow readers to investigate the foundations
                  of a proposed mechanism directly.
                </p>
              </div>

              <div>
                <h3 className="text-lg font-bold text-white">
                  Reproducibility
                </h3>

                <p className="mt-3 text-sm leading-7 text-zinc-400">
                  Reproducible research provides sufficient
                  information about its methods, configurations,
                  and data for other researchers to repeat
                  the analysis and examine the results.
                </p>
              </div>

              <div>
                <h3 className="text-lg font-bold text-white">
                  Independent Review
                </h3>

                <p className="mt-3 text-sm leading-7 text-zinc-400">
                  External technical review can identify
                  overlooked assumptions, weaknesses, and
                  inconsistencies. Publication of a white
                  paper does not necessarily mean it has
                  undergone formal peer review.
                </p>
              </div>

              <div>
                <h3 className="text-lg font-bold text-white">
                  Original Contribution
                </h3>

                <p className="mt-3 text-sm leading-7 text-zinc-400">
                  Projects may legitimately build upon existing
                  research and open-source technology. Clear
                  attribution helps distinguish inherited
                  mechanisms from newly proposed contributions.
                </p>
              </div>
            </div>
          </section>

          {/* DEVELOPMENT ROADMAP */}

          <section className="border-t border-white/10 px-1 py-8 md:px-2">
            <p className="text-xs font-black uppercase tracking-[0.2em] text-cyan-400">
              Development Planning
            </p>

            <h2 className="mt-2 text-2xl font-black">
              Understanding Project Roadmaps
            </h2>

            <p className="mt-3 max-w-4xl text-sm leading-7 text-zinc-400">
              A roadmap communicates intended development
              milestones and the anticipated progression of
              a project. Its dates and objectives are planning
              estimates rather than guarantees of completion.
            </p>

            <div className="mt-8 grid gap-8 md:grid-cols-2 xl:grid-cols-4">
              {[
                {
                  number: "01",
                  title: "Research",
                  description:
                    "The proposed mechanisms are investigated and the initial technical design is established.",
                  color: "text-cyan-400",
                },
                {
                  number: "02",
                  title: "Prototype",
                  description:
                    "Selected components are implemented to explore technical feasibility and identify limitations.",
                  color: "text-green-400",
                },
                {
                  number: "03",
                  title: "Testnet",
                  description:
                    "An experimental network allows broader testing without relying on normal production activity.",
                  color: "text-yellow-400",
                },
                {
                  number: "04",
                  title: "Mainnet",
                  description:
                    "The production network becomes available for its intended operational use.",
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

            <p className="mt-6 max-w-4xl text-sm leading-7 text-zinc-400">
              This sequence illustrates a possible development
              lifecycle. Projects may use different stages,
              develop components simultaneously, or revise
              milestones as technical requirements change.
            </p>
          </section>

          {/* IMPLEMENTATION */}

          <section className="border-t border-white/10 px-1 py-8 md:px-2">
            <p className="text-xs font-black uppercase tracking-[0.2em] text-cyan-400">
              Implementation Verification
            </p>

            <h2 className="mt-2 text-2xl font-black">
              Comparing Published Proposals with Actual Development
            </h2>

            <div className="mt-8 grid gap-8 md:grid-cols-2 md:gap-12">
              <div>
                <h3 className="text-lg font-bold text-white">
                  Source Code Repositories
                </h3>

                <p className="mt-3 text-sm leading-7 text-zinc-400">
                  Public repositories can provide access to
                  implemented components, development history,
                  reported issues, and technical discussions.
                  The number of code changes alone does not
                  establish development quality.
                </p>
              </div>

              <div>
                <h3 className="text-lg font-bold text-white">
                  Release Documentation
                </h3>

                <p className="mt-3 text-sm leading-7 text-zinc-400">
                  Release notes identify features introduced,
                  modified, or removed in particular software
                  versions. They help distinguish available
                  functionality from features still under
                  development.
                </p>
              </div>

              <div>
                <h3 className="text-lg font-bold text-white">
                  Operational Availability
                </h3>

                <p className="mt-3 text-sm leading-7 text-zinc-400">
                  A published software component may exist
                  without being available on the production
                  network. Deployment records and network
                  activity help establish whether a feature
                  is operational.
                </p>
              </div>

              <div>
                <h3 className="text-lg font-bold text-white">
                  Implementation Differences
                </h3>

                <p className="mt-3 text-sm leading-7 text-zinc-400">
                  Developers may revise an original design
                  after discovering technical limitations.
                  Documented explanations help readers
                  understand why the implemented system
                  differs from the initial proposal.
                </p>
              </div>
            </div>
          </section>


          {/* LANGUAGE AND INTERPRETATION */}

          <section className="border-t border-white/10 px-1 py-8 md:px-2">
            <p className="text-xs font-black uppercase tracking-[0.2em] text-cyan-400">
              Critical Reading
            </p>

            <h2 className="mt-2 text-2xl font-black">
              Understanding the Language of Technical Proposals
            </h2>

            <p className="mt-3 max-w-4xl text-sm leading-7 text-zinc-400">
              Small differences in wording can significantly
              change the meaning of a technical statement.
              Readers should distinguish intended capabilities,
              conditional outcomes, and demonstrated behavior.
            </p>

            <div className="mt-6 overflow-x-auto education-scrollbar">
              <table className="w-full min-w-[620px] text-left text-sm">
                <thead className="border-b border-white/10 text-zinc-300">
                  <tr>
                    <th className="px-5 py-4">
                      Wording
                    </th>
                    <th className="px-5 py-4">
                      Interpretation
                    </th>
                  </tr>
                </thead>

                <tbody className="divide-y divide-white/10 text-zinc-400">
                  <tr>
                    <td className="px-5 py-4 font-bold text-cyan-400">
                      "Designed to support"
                    </td>
                    <td className="px-5 py-4">
                      Describes an intended design capability.
                    </td>
                  </tr>

                  <tr>
                    <td className="px-5 py-4 font-bold text-cyan-400">
                      "Expected to achieve"
                    </td>
                    <td className="px-5 py-4">
                      Expresses a projected outcome.
                    </td>
                  </tr>

                  <tr>
                    <td className="px-5 py-4 font-bold text-cyan-400">
                      "Under specified conditions"
                    </td>
                    <td className="px-5 py-4">
                      Restricts the claim to particular assumptions.
                    </td>
                  </tr>

                  <tr>
                    <td className="px-5 py-4 font-bold text-cyan-400">
                      "Demonstrated in testing"
                    </td>
                    <td className="px-5 py-4">
                      Reports a result within a test environment.
                    </td>
                  </tr>

                  <tr>
                    <td className="px-5 py-4 font-bold text-cyan-400">
                      "Currently operational"
                    </td>
                    <td className="px-5 py-4">
                      Claims present functionality that can be
                      investigated through implementation evidence.
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </section>

          {/* DOCUMENT VERSIONING */}

          <section className="border-t border-white/10 px-1 py-8 md:px-2">
            <p className="text-xs font-black uppercase tracking-[0.2em] text-cyan-400">
              Document Maintenance
            </p>

            <h2 className="mt-2 text-2xl font-black">
              White Paper Revisions and Version History
            </h2>

            <div className="mt-8 grid gap-8 md:grid-cols-3 md:gap-10">
              <div>
                <h3 className="text-lg font-bold text-white">
                  Publication Date
                </h3>

                <p className="mt-3 text-sm leading-7 text-zinc-400">
                  Establishes when the document's information
                  was presented. Older publications may describe
                  architectures or requirements that have since
                  been replaced.
                </p>
              </div>

              <div>
                <h3 className="text-lg font-bold text-white">
                  Revision History
                </h3>

                <p className="mt-3 text-sm leading-7 text-zinc-400">
                  Records changes between document versions,
                  allowing readers to identify modifications
                  to the project's objectives, assumptions,
                  and proposed mechanisms.
                </p>
              </div>

              <div>
                <h3 className="text-lg font-bold text-white">
                  Superseding Specifications
                </h3>

                <p className="mt-3 text-sm leading-7 text-zinc-400">
                  Later technical specifications and accepted
                  protocol proposals may replace portions of
                  the original white paper without requiring
                  the historical document to be rewritten.
                </p>
              </div>
            </div>
          </section>

          {/* DOCUMENT LIMITATIONS */}

          <section className="border-t border-white/10 px-1 py-8 md:px-2">
            <p className="text-xs font-black uppercase tracking-[0.2em] text-cyan-400">
              Document Limitations
            </p>

            <h2 className="mt-2 text-2xl font-black">
              What a White Paper Cannot Establish
            </h2>

            <div className="mt-8 grid gap-8 md:grid-cols-2 md:gap-12">
              <div>
                <h3 className="text-lg font-bold text-white">
                  Future Adoption
                </h3>

                <p className="mt-3 text-sm leading-7 text-zinc-400">
                  A technically sound proposal does not
                  establish that individuals, developers,
                  or businesses will adopt the resulting
                  technology.
                </p>
              </div>

              <div>
                <h3 className="text-lg font-bold text-white">
                  Financial Viability
                </h3>

                <p className="mt-3 text-sm leading-7 text-zinc-400">
                  Technical documentation may not provide
                  sufficient information about development
                  funding, operating expenses, or the
                  resources required to maintain a project.
                </p>
              </div>

              <div>
                <h3 className="text-lg font-bold text-white">
                  Regulatory Compliance
                </h3>

                <p className="mt-3 text-sm leading-7 text-zinc-400">
                  Publishing a white paper does not by itself
                  establish that a project satisfies applicable
                  financial, consumer protection, or other
                  regulatory requirements.
                </p>
              </div>

              <div>
                <h3 className="text-lg font-bold text-white">
                  Investment Performance
                </h3>

                <p className="mt-3 text-sm leading-7 text-zinc-400">
                  The quality of a technical proposal does
                  not determine the future market price of
                  an associated cryptocurrency. Technological
                  merit and investment performance are
                  separate considerations.
                </p>
              </div>
            </div>
          </section>

          {/* FINAL EXPLANATION */}

          <section className="mt-6 border-t border-white/10 px-2 py-5">
            <p className="text-xs font-black uppercase tracking-[0.2em] text-cyan-400">
              Important to Understand
            </p>

            <p className="mt-2 text-sm leading-6 text-zinc-400">
              A cryptocurrency white paper is a starting point
              for technical research, not a substitute for it.
              Its educational value comes from understanding
              the reasoning behind a proposal, examining its
              assumptions, and distinguishing its intended
              capabilities from independently established results.
            </p>
          </section>

        </div>
      </main>
    </>
  );
}
