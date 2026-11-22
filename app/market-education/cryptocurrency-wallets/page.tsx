
import Link from "next/link";
import Navbar from "../../components/Navbar";

export default function CryptocurrencyWalletsPage() {
  return (
    <>
      <Navbar />

      <main className="min-h-screen bg-black px-6 py-8 text-white xl:px-10">
        <div className="mx-auto w-full max-w-[1200px]">
          {/* HEADER */}
          <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
            <div>
              <h1 className="text-4xl font-black">
                Cryptocurrency Wallets
              </h1>

              <p className="mt-2 text-sm leading-7 text-zinc-400">
                Understand how crypto wallets work, how digital
                assets are accessed, and how to protect your
                private keys and recovery information.
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
              src="/market-education/cryptocurrency-wallets.png"
              alt="Cryptocurrency hardware wallet with digital security protection and blockchain networks"
              className="h-full w-full object-cover"
            />
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent" />
          </div>

          {/* INTRODUCTION */}
          <section className="mt-8 px-1 pb-8 md:px-2">
            <h2 className="text-2xl font-black">
              Your Access to Digital Assets
            </h2>

            <p className="mt-3 max-w-4xl text-sm leading-7 text-zinc-400">
              A cryptocurrency wallet is a digital tool that
              allows users to interact with their assets on
              blockchain networks. Wallets are available as
              mobile applications, desktop software, browser
              extensions, and dedicated hardware devices.
            </p>

            <p className="mt-3 max-w-4xl text-sm leading-7 text-zinc-400">
              Cryptocurrencies are recorded on their respective
              blockchains rather than stored inside the wallet
              itself. The wallet provides a way to authorize
              transactions and interact with those blockchain
              records.
            </p>
          </section>

          {/* HOW WALLETS WORK */}
          <section className="border-t border-white/10 px-1 py-8 md:px-2">
            <p className="text-xs font-black uppercase tracking-[0.2em] text-cyan-400">
              How Crypto Wallets Work
            </p>

            <h2 className="mt-2 text-2xl font-black">
              Public Addresses and Private Keys
            </h2>

            <p className="mt-3 max-w-4xl text-sm leading-7 text-zinc-400">
              Cryptocurrency wallets use cryptographic keys to
              help users receive digital assets and authorize
              transactions. Public addresses and private keys
              serve different purposes.
            </p>

            <div className="mt-8 grid gap-8 md:grid-cols-2 md:gap-12">
              <div>
                <h3 className="text-lg font-bold text-white">
                  Public Address
                </h3>

                <p className="mt-3 text-sm leading-7 text-zinc-400">
                  A public address identifies a destination
                  for receiving compatible digital assets.
                  It can generally be shared with others,
                  although transactions associated with
                  an address may be publicly visible.
                </p>
              </div>

              <div>
                <h3 className="text-lg font-bold text-white">
                  Private Key
                </h3>

                <p className="mt-3 text-sm leading-7 text-zinc-400">
                  A private key is secret cryptographic
                  information used to authorize transactions.
                  Anyone who obtains the key may be able
                  to control the assets associated with it.
                </p>
              </div>
            </div>
          </section>

          {/* HOT VS COLD WALLETS */}
          <section className="border-t border-white/10 px-1 py-8 md:px-2">
            <p className="text-xs font-black uppercase tracking-[0.2em] text-cyan-400">
              Wallet Types
            </p>

            <h2 className="mt-2 text-2xl font-black">
              Hot Wallets vs. Cold Wallets
            </h2>

            <p className="mt-3 max-w-4xl text-sm leading-7 text-zinc-400">
              Wallets are often classified by whether
              their signing keys are kept in an
              internet-connected environment.
            </p>

            <div className="mt-8 grid gap-8 md:grid-cols-2 md:gap-12">
              <div>
                <h3 className="text-lg font-bold text-white">
                  Hot Wallets
                </h3>

                <p className="mt-3 text-sm leading-7 text-zinc-400">
                  Hot wallets operate in connected environments,
                  such as smartphones, computers, or browsers.
                  They offer convenient access for frequent
                  transactions but may face greater exposure
                  to online threats.
                </p>
              </div>

              <div>
                <h3 className="text-lg font-bold text-white">
                  Cold Wallets
                </h3>

                <p className="mt-3 text-sm leading-7 text-zinc-400">
                  Cold wallets keep private keys offline
                  during storage and signing. They can reduce
                  exposure to online attacks, but users still
                  need to protect their devices, recovery
                  information, and transaction details.
                </p>
              </div>
            </div>
          </section>

          {/* CUSTODY */}
          <section className="border-t border-white/10 px-1 py-8 md:px-2">
            <p className="text-xs font-black uppercase tracking-[0.2em] text-cyan-400">
              Wallet Ownership
            </p>

            <h2 className="mt-2 text-2xl font-black">
              Custodial vs. Non-Custodial Wallets
            </h2>

            <p className="mt-3 max-w-4xl text-sm leading-7 text-zinc-400">
              Another important distinction is who
              controls the private keys and authorizes
              transactions.
            </p>

            <div className="mt-8 grid gap-8 md:grid-cols-2 md:gap-12">
              <div>
                <h3 className="text-lg font-bold text-white">
                  Custodial Wallets
                </h3>

                <p className="mt-3 text-sm leading-7 text-zinc-400">
                  A third-party provider, such as a
                  cryptocurrency exchange, controls the
                  private keys on behalf of customers.
                  Users depend on the provider for access,
                  security, and withdrawal services.
                </p>
              </div>

              <div>
                <h3 className="text-lg font-bold text-white">
                  Non-Custodial Wallets
                </h3>

                <p className="mt-3 text-sm leading-7 text-zinc-400">
                  Users control their own private keys
                  and can authorize transactions without
                  relying on a custodian. This also makes
                  them responsible for protecting their
                  keys and recovery information.
                </p>
              </div>
            </div>
          </section>

          {/* RECOVERY */}
          <section className="border-t border-white/10 px-1 py-8 md:px-2">
            <p className="text-xs font-black uppercase tracking-[0.2em] text-cyan-400">
              Wallet Recovery
            </p>

            <h2 className="mt-2 text-2xl font-black">
              Seed Phrases and Recovery
            </h2>

            <p className="mt-3 max-w-4xl text-sm leading-7 text-zinc-400">
              Many non-custodial wallets provide a recovery
              phrase, often consisting of 12 or 24 words.
              This phrase can be used to restore access
              to wallet keys if a device is lost or replaced.
              Not every wallet uses this recovery method.
            </p>

            <p className="mt-3 max-w-4xl text-sm leading-7 text-zinc-400">
              Recovery phrases must be kept private.
              Anyone who obtains a valid recovery phrase
              may be able to access the associated assets.
              Losing the phrase and all other recovery
              options can result in permanent loss of access.
            </p>
          </section>

          {/* TRANSACTIONS */}
          <section className="border-t border-white/10 px-1 py-8 md:px-2">
            <p className="text-xs font-black uppercase tracking-[0.2em] text-cyan-400">
              Using a Crypto Wallet
            </p>

            <h2 className="mt-2 text-2xl font-black">
              Sending and Receiving Cryptocurrency
            </h2>

            <p className="mt-3 max-w-4xl text-sm leading-7 text-zinc-400">
              Sending cryptocurrency generally involves
              selecting a compatible network, entering
              the recipient's address, specifying an
              amount, reviewing fees, and authorizing
              the transaction.
            </p>

            <p className="mt-3 max-w-4xl text-sm leading-7 text-zinc-400">
              Blockchain transactions can be difficult
              or impossible to reverse. Using an
              incorrect address or unsupported network
              may result in lost funds, so transaction
              details should be verified before sending.
            </p>
          </section>

          {/* RISKS */}
          <section className="border-t border-white/10 px-1 py-8 md:px-2">
            <p className="text-xs font-black uppercase tracking-[0.2em] text-cyan-400">
              Security and Risks
            </p>

            <h2 className="mt-2 text-2xl font-black">
              Common Wallet Security Risks
            </h2>

            <ul className="mt-5 list-disc space-y-3 pl-5 text-sm leading-7 text-zinc-400">
              <li>
                <strong className="text-white">Phishing:</strong>{" "}
                Fraudulent websites or messages may attempt
                to steal wallet credentials or recovery phrases.
              </li>

              <li>
                <strong className="text-white">Malicious Approvals:</strong>{" "}
                Some blockchain applications request permissions
                that can expose tokens to unauthorized transfers.
              </li>

              <li>
                <strong className="text-white">Fake Wallet Applications:</strong>{" "}
                Fraudulent wallet apps may imitate legitimate
                services to steal private keys or trick users
                into authorizing unauthorized transactions.
              </li>

              <li>
                <strong className="text-white">Device Compromise:</strong>{" "}
                Malware or unauthorized device access
                can put wallet information at risk.
              </li>

              <li>
                <strong className="text-white">Unsafe Wallet Connections:</strong>{" "}
                Connecting a wallet to untrusted applications
                may expose users to deceptive transaction
                requests or harmful smart contract permissions.
              </li>
            </ul>
          </section>

          {/* FINAL EXPLANATION */}
          <section className="mt-6 border-t border-white/10 px-2 py-5">
            <p className="text-xs font-black uppercase tracking-[0.2em] text-cyan-400">
              Important to Understand
            </p>

            <p className="mt-2 text-sm leading-6 text-zinc-400">
              Choosing a cryptocurrency wallet involves balancing
              convenience, security, and personal responsibility.
              Understanding how a wallet operates can help users
              make informed decisions about managing their
              digital assets.
            </p>
          </section>
        </div>
      </main>
    </>
  );
}
