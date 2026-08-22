import Link from "next/link";
import Navbar from "../components/Navbar";

const sections = [
  { id: "terms", label: "Terms" },
  { id: "privacy", label: "Privacy" },
  { id: "education", label: "Education" },
  { id: "risk", label: "Risk" },
  { id: "simulator", label: "Simulator" },
  { id: "ai", label: "Gaby & AI" },
  { id: "billing", label: "Billing" },
];

export default function LegalPage() {
  return (
    <>
      <Navbar />

      <main className="min-h-screen bg-black px-5 py-8 text-white md:px-10">
        <div className="mx-auto max-w-[1200px]">

          {/* HEADER */}
          <div className="text-center">
            <h1 className="text-3xl font-black md:text-4xl">
              Legal & Disclosures
            </h1>

            <p className="mx-auto mt-3 max-w-2xl text-sm leading-6 text-zinc-400">
              Important information about using TradeNestX, Gaby, the simulator,
              subscriptions, educational content, and market-related information.
            </p>
          </div>

          {/* QUICK NAV */}
          <div className="mt-6 flex flex-wrap justify-center gap-2">
            {sections.map((section) => (
              <a
                key={section.id}
                href={`#${section.id}`}
                className="rounded-lg border border-white/10 bg-[#111827] px-3 py-2 text-xs font-bold text-zinc-300 transition hover:border-cyan-400 hover:text-cyan-300"
              >
                {section.label}
              </a>
            ))}
          </div>

          {/* CONTENT */}
          <div className="mt-8 space-y-4">

            <LegalSection id="terms" title="Terms of Service">
              By accessing or using TradeNestX, you agree to use the platform
              lawfully and only for its intended educational and practice
              purposes. You are responsible for maintaining the security of
              your account and for activity performed through your account.
              TradeNestX may update, modify, suspend, or discontinue features
              as the platform evolves.
            </LegalSection>

            <LegalSection id="privacy" title="Privacy Policy">
              TradeNestX may process account information required to provide
              authentication, subscription access, saved simulator features,
              support, and other platform functionality. Third-party services
              such as Clerk, Stripe, and other infrastructure providers may
              process information necessary to provide their services.
              TradeNestX does not require access to your complete payment-card
              details.
            </LegalSection>

            <LegalSection id="education" title="Educational Disclaimer">
              TradeNestX provides educational and informational content only.
              Nothing on TradeNestX should be interpreted as personalized
              financial, investment, tax, legal, or professional advice.
              TradeNestX does not tell users what they should buy or sell and
              does not guarantee trading or investment results.
            </LegalSection>

            <LegalSection id="risk" title="Trading & Investment Risk">
              Trading and investing involve risk, including the possible loss
              of capital. Market prices can move quickly and unpredictably.
              Leverage can increase both gains and losses. Historical,
              hypothetical, educational, or simulated results do not guarantee
              future performance.
            </LegalSection>

            <LegalSection id="simulator" title="Simulator Disclosure">
              The TradeNestX simulator is for educational practice. Simulator
              balances, positions, profits, losses, margin, leverage, and other
              trading activity use simulated funds and are not real-money
              transactions. Simulator results may differ materially from actual
              trading because real markets can involve execution delays,
              liquidity differences, slippage, taxes, brokerage rules, and
              other factors.
            </LegalSection>

            <LegalSection id="ai" title="Gaby & AI Disclosure">
              Gaby is an AI-powered educational assistant. Gaby can explain
              trading concepts, TradeNestX features, simulator information,
              educational market facts, and supported platform data. AI systems
              can make mistakes or produce incomplete or inaccurate
              information. Important financial or market information should be
              independently verified before relying on it.
            </LegalSection>

            <LegalSection id="billing" title="Subscriptions, Billing & Cancellation">
              TradeNestX Pro is a recurring monthly subscription unless stated
              otherwise during checkout. Payments are processed through Stripe.
              Users can manage supported billing settings and cancel through
              the TradeNestX subscription-management flow. When a subscription
              is canceled, Pro access remains active through the end of the
              billing period already paid for unless otherwise required by law.
              Cancellation does not automatically create a refund.
            </LegalSection>

            <LegalSection id="market-data" title="Market Data">
              Market prices, financial information, news, company information,
              and other market-related data may originate from third-party or
              public sources. Data can be delayed, incomplete, unavailable, or
              incorrect. TradeNestX does not guarantee that market information
              is complete, real-time, or error-free unless explicitly stated.
            </LegalSection>

            <LegalSection id="community" title="Community & User Conduct">
              Users are expected to interact respectfully and lawfully when
              using TradeNestX community features. TradeNestX Community is an
              educational community and is not a trading-signals service.
              Abusive behavior, fraud, unlawful activity, impersonation, or
              misuse of the platform may result in restricted access.
            </LegalSection>

            <LegalSection id="liability" title="Limitation of Liability">
              To the extent permitted by applicable law, TradeNestX is provided
              without guarantees of trading performance, investment outcomes,
              uninterrupted availability, or error-free operation. Users remain
              responsible for their own financial decisions and for evaluating
              information before acting on it.
            </LegalSection>

          </div>

          {/* CONTACT */}
          <div className="mt-6 rounded-2xl border border-cyan-400/20 bg-cyan-400/5 p-5 text-center">
            <p className="font-black text-white">
              Questions about these terms?
            </p>

            <a
              href="mailto:support@tradenestxacademy.com"
              className="mt-2 inline-block text-sm font-bold text-cyan-400 hover:text-cyan-300"
            >
              support@tradenestxacademy.com
            </a>
          </div>

          <div className="mt-6 text-center">
            <Link
              href="/"
              className="text-sm font-bold text-zinc-500 hover:text-cyan-300"
            >
              ← Back to TradeNestX
            </Link>
          </div>

        </div>
      </main>
    </>
  );
}

function LegalSection({
  id,
  title,
  children,
}: {
  id: string;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section
      id={id}
      className="scroll-mt-20 rounded-2xl border border-white/10 bg-[#0f172a] p-5"
    >
      <h2 className="text-lg font-black text-white">
        {title}
      </h2>

      <p className="mt-2 text-sm leading-6 text-zinc-400">
        {children}
      </p>
    </section>
  );
}