
import Link from "next/link";
import Navbar from "../../components/Navbar";

export default function NFTsPage() {
  return (
    <>
      <Navbar />

      <main className="min-h-screen bg-black px-6 py-8 text-white xl:px-10">
        <div className="mx-auto w-full max-w-[1200px]">
          {/* HEADER */}
          <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
            <div>
              <h1 className="text-4xl font-black">
                NFTs (Non-Fungible Tokens)
              </h1>

              <p className="mt-2 text-sm leading-7 text-zinc-400">
                Understand how NFTs represent unique assets,
                how digital ownership works, and the opportunities
                and risks associated with non-fungible tokens.
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
              src="/market-education/nfts.png"
              alt="Unique digital assets and NFT ownership visualization"
              className="h-full w-full object-cover"
            />
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent" />
          </div>

          {/* INTRODUCTION */}
          <section className="mt-8 px-1 pb-8 md:px-2">
            <h2 className="text-2xl font-black">
              Understanding Non-Fungible Tokens
            </h2>

            <p className="mt-3 max-w-4xl text-sm leading-7 text-zinc-400">
              A non-fungible token, commonly known as an NFT,
              is a digital token that represents an individually
              identifiable asset, entitlement, or record.
            </p>


          </section>

          {/* FUNGIBILITY */}
          <section className="border-t border-white/10 px-1 py-8 md:px-2">
            <p className="text-xs font-black uppercase tracking-[0.2em] text-cyan-400">
              Understanding Fungibility
            </p>

            <h2 className="mt-2 text-2xl font-black">
              Fungible vs. Non-Fungible Assets
            </h2>

            <p className="mt-3 max-w-4xl text-sm leading-7 text-zinc-400">
              Fungibility describes whether individual units
              of an asset are interchangeable with other units
              of the same type and value.
            </p>

            <div className="mt-8 grid gap-8 md:grid-cols-2 md:gap-12">
              <div>
                <h3 className="text-lg font-bold text-white">
                  Fungible Assets
                </h3>

                <p className="mt-3 text-sm leading-7 text-zinc-400">
                  Fungible assets consist of interchangeable
                  units. For example, one US dollar generally
                  has the same monetary value as another
                  US dollar.
                </p>

                <p className="mt-3 text-xs font-bold text-cyan-300">
                  Examples: currencies and standard cryptocurrency units.
                </p>
              </div>

              <div>
                <h3 className="text-lg font-bold text-white">
                  Non-Fungible Assets
                </h3>

                <p className="mt-3 text-sm leading-7 text-zinc-400">
                  Non-fungible assets have individual identities
                  or characteristics that distinguish them from
                  other assets. Two items from the same collection
                  may have different attributes and market values.
                </p>

                <p className="mt-3 text-xs font-bold text-cyan-300">
                  Examples: original artwork and individually numbered collectibles.
                </p>
              </div>
            </div>
          </section>

          {/* NFT STRUCTURE */}
          <section className="border-t border-white/10 px-1 py-8 md:px-2">
            <p className="text-xs font-black uppercase tracking-[0.2em] text-cyan-400">
              NFT Structure
            </p>

            <h2 className="mt-2 text-2xl font-black">
              What Makes an NFT Unique?
            </h2>

            <p className="mt-3 max-w-4xl text-sm leading-7 text-zinc-400">
              An NFT is generally identified by its blockchain
              network, contract address, and token identifier.
            </p>

            <div className="mt-8 grid gap-8 md:grid-cols-3 md:gap-10">
              <div>
                <h3 className="text-lg font-bold text-white">
                  Token ID
                </h3>

                <p className="mt-3 text-sm leading-7 text-zinc-400">
                  A token identifier distinguishes an individual
                  NFT within its associated contract. Two NFTs
                  may display identical artwork while remaining
                  separate tokens.
                </p>
              </div>

              <div>
                <h3 className="text-lg font-bold text-white">
                  Metadata
                </h3>

                <p className="mt-3 text-sm leading-7 text-zinc-400">
                  Metadata describes an NFT and may include
                  its name, description, visual content,
                  attributes, and other information associated
                  with the token.
                </p>
              </div>

              <div>
                <h3 className="text-lg font-bold text-white">
                  Provenance
                </h3>

                <p className="mt-3 text-sm leading-7 text-zinc-400">
                  Provenance refers to the recorded history
                  of an asset, including its creation and
                  subsequent transfers. This history does not
                  automatically verify the authenticity of
                  the underlying content.
                </p>
              </div>
            </div>
          </section>

          {/* MINTING */}
          <section className="border-t border-white/10 px-1 py-8 md:px-2">
            <p className="text-xs font-black uppercase tracking-[0.2em] text-cyan-400">
              NFT Creation
            </p>

            <h2 className="mt-2 text-2xl font-black">
              Understanding NFT Minting
            </h2>

            <p className="mt-3 max-w-4xl text-sm leading-7 text-zinc-400">
              Minting is the process of creating an NFT
              within a blockchain contract. During this process,
              a token identifier is established and associated
              with ownership information and, where applicable,
              metadata.
            </p>

            <p className="mt-3 max-w-4xl text-sm leading-7 text-zinc-400">
              Creators may issue individual NFTs or collections
              containing multiple tokens. Collections can include
              different visual characteristics, access privileges,
              or other attributes.
            </p>


          </section>

          {/* STORAGE */}
          <section className="border-t border-white/10 px-1 py-8 md:px-2">
            <p className="text-xs font-black uppercase tracking-[0.2em] text-cyan-400">
              Digital Content
            </p>

            <h2 className="mt-2 text-2xl font-black">
              On-Chain vs. Off-Chain Storage
            </h2>

            <p className="mt-3 max-w-4xl text-sm leading-7 text-zinc-400">
              Owning an NFT does not necessarily mean that
              its associated image, video, or other digital
              content is stored directly on the blockchain.
            </p>

            <div className="mt-8 grid gap-8 md:grid-cols-2 md:gap-12">
              <div>
                <h3 className="text-lg font-bold text-white">
                  On-Chain Storage
                </h3>

                <p className="mt-3 text-sm leading-7 text-zinc-400">
                  Some NFTs store their metadata or digital
                  content directly on the blockchain. This can
                  reduce dependence on external storage services,
                  although storage costs and technical limitations
                  may restrict the amount of information stored.
                </p>
              </div>

              <div>
                <h3 className="text-lg font-bold text-white">
                  Off-Chain Storage
                </h3>

                <p className="mt-3 text-sm leading-7 text-zinc-400">
                  Other NFTs reference content stored outside
                  the blockchain through web servers or
                  distributed storage systems such as IPFS.
                  Continued access depends on how the referenced
                  content is maintained and made available.
                </p>
              </div>
            </div>
          </section>

          {/* OWNERSHIP */}
          <section className="border-t border-white/10 px-1 py-8 md:px-2">
            <p className="text-xs font-black uppercase tracking-[0.2em] text-cyan-400">
              Ownership and Rights
            </p>

            <h2 className="mt-2 text-2xl font-black">
              What Do NFT Owners Actually Own?
            </h2>

            <p className="mt-3 max-w-4xl text-sm leading-7 text-zinc-400">
              NFT ownership generally refers to control of
              the token itself. Ownership of the token and
              legal ownership of the associated content are
              not necessarily the same thing.
            </p>

            <div className="mt-8 grid gap-8 md:grid-cols-3 md:gap-10">
              <div>
                <h3 className="text-lg font-bold text-white">
                  Token Ownership
                </h3>

                <p className="mt-3 text-sm leading-7 text-zinc-400">
                  The holder may be able to transfer or sell
                  the NFT, subject to the rules and restrictions
                  of its associated contract.
                </p>
              </div>

              <div>
                <h3 className="text-lg font-bold text-white">
                  Copyright
                </h3>

                <p className="mt-3 text-sm leading-7 text-zinc-400">
                  Minting an NFT does not establish copyright
                  ownership, and purchasing one does not
                  automatically transfer intellectual property
                  rights. These rights generally remain with
                  their legal owner unless separately transferred.
                </p>
              </div>

              <div>
                <h3 className="text-lg font-bold text-white">
                  Usage Rights
                </h3>

                <p className="mt-3 text-sm leading-7 text-zinc-400">
                  Some NFTs include licenses, commercial usage
                  rights, memberships, or access privileges.
                  These benefits depend on the applicable
                  terms and agreements.
                </p>
              </div>
            </div>
          </section>

          {/* MARKETPLACES */}
          <section className="border-t border-white/10 px-1 py-8 md:px-2">
            <p className="text-xs font-black uppercase tracking-[0.2em] text-cyan-400">
              NFT Markets
            </p>

            <h2 className="mt-2 text-2xl font-black">
              Marketplaces, Pricing, and Royalties
            </h2>

            <p className="mt-3 max-w-4xl text-sm leading-7 text-zinc-400">
              NFT marketplaces allow participants to discover,
              list, purchase, and sell NFTs. Transactions may
              occur through fixed-price listings, auctions,
              or negotiated offers.
            </p>

            <div className="mt-8 grid gap-8 md:grid-cols-2 md:gap-12">
              <div>
                <h3 className="text-lg font-bold text-white">
                  Floor Price
                </h3>

                <p className="mt-3 text-sm leading-7 text-zinc-400">
                  The floor price generally represents the
                  lowest active asking price within an NFT
                  collection on a marketplace. It does not
                  guarantee that an NFT can be sold at that
                  price or that every item has the same value.
                </p>
              </div>

              <div>
                <h3 className="text-lg font-bold text-white">
                  Rarity and Attributes
                </h3>

                <p className="mt-3 text-sm leading-7 text-zinc-400">
                  Some collections contain tokens with different
                  characteristics and levels of rarity. Rare
                  attributes may attract additional interest,
                  but rarity alone does not guarantee demand
                  or financial value.
                </p>
              </div>

              <div>
                <h3 className="text-lg font-bold text-white">
                  Creator Royalties
                </h3>

                <p className="mt-3 text-sm leading-7 text-zinc-400">
                  Some NFT collections specify royalties intended
                  to compensate creators when tokens are resold.
                  Royalty enforcement varies between contracts,
                  marketplaces, and transaction methods.
                </p>
              </div>

              <div>
                <h3 className="text-lg font-bold text-white">
                  Market Liquidity
                </h3>

                <p className="mt-3 text-sm leading-7 text-zinc-400">
                  Because NFTs are individually identifiable,
                  finding someone willing to purchase a particular
                  token can be difficult. A high listing price
                  does not necessarily indicate an active market
                  or an achievable selling price.
                </p>
              </div>
            </div>
          </section>

          {/* REAL WORLD USES */}
          <section className="border-t border-white/10 px-1 py-8 md:px-2">
            <p className="text-xs font-black uppercase tracking-[0.2em] text-cyan-400">
              Real-World Applications
            </p>

            <h2 className="mt-2 text-2xl font-black">
              NFTs Beyond Digital Art
            </h2>

            <div className="mt-8 grid gap-x-12 gap-y-8 md:grid-cols-2">
              <div>
                <h3 className="text-lg font-bold text-white">
                  Digital Art and Collectibles
                </h3>

                <p className="mt-3 text-sm leading-7 text-zinc-400">
                  Artists and creators can issue individually
                  identifiable tokens associated with artwork,
                  limited editions, and digital collectibles.
                </p>
              </div>

              <div>
                <h3 className="text-lg font-bold text-white">
                  Gaming Assets
                </h3>

                <p className="mt-3 text-sm leading-7 text-zinc-400">
                  Games may use NFTs to represent characters,
                  equipment, virtual land, or other items.
                </p>
              </div>

              <div>
                <h3 className="text-lg font-bold text-white">
                  Tickets and Memberships
                </h3>

                <p className="mt-3 text-sm leading-7 text-zinc-400">
                  NFTs can represent event tickets, memberships,
                  subscriptions, or access privileges. Organizers
                  may establish rules governing expiration,
                  eligibility, and transferability.
                </p>
              </div>

              <div>
                <h3 className="text-lg font-bold text-white">
                  Certificates and Credentials
                </h3>

                <p className="mt-3 text-sm leading-7 text-zinc-400">
                  Organizations may use NFTs to represent
                  certificates, qualifications, or records
                  associated with individual achievements.
                  Their validity depends on the credibility
                  and recognition of the issuing organization.
                </p>
              </div>

              <div>
                <h3 className="text-lg font-bold text-white">
                  Physical Asset Representation
                </h3>

                <p className="mt-3 text-sm leading-7 text-zinc-400">
                  NFTs may represent claims or rights associated
                  with physical collectibles, luxury goods,
                  or other assets. Enforcing those rights requires
                  appropriate legal agreements and reliable
                  connections between the token and physical asset.
                </p>
              </div>

              <div>
                <h3 className="text-lg font-bold text-white">
                  Product Authentication
                </h3>

                <p className="mt-3 text-sm leading-7 text-zinc-400">
                  Businesses may associate NFTs with individual
                  products to record their origin or ownership
                  history. The reliability of authentication
                  depends on the accuracy of the original
                  information and the connection to the product.
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
              Understanding NFT Market Risks
            </h2>

            <p className="mt-3 max-w-4xl text-sm leading-7 text-zinc-400">
              NFTs can provide useful applications, but their
              individual characteristics and dependence on
              associated projects introduce specific risks.
            </p>

            <ul className="mt-6 max-w-4xl list-disc space-y-3 pl-5 text-sm leading-7 text-zinc-400">


              <li>
                <strong className="text-white">Counterfeit Collections:</strong>{" "}
                Unauthorized creators may issue NFTs using
                copied artwork or misleading collection identities.
              </li>

              <li>
                <strong className="text-white">Wash Trading:</strong>{" "}
                Participants may trade NFTs between related
                accounts to create misleading impressions
                of demand, trading activity, or market value.
              </li>

              <li>
                <strong className="text-white">Metadata Changes:</strong>{" "}
                Some NFT designs allow associated metadata
                to be modified after creation, potentially
                changing the content or attributes.
              </li>



              <li>
                <strong className="text-white">Project Abandonment:</strong>{" "}
                Promised benefits, gaming functionality, or
                membership privileges may disappear if the
                associated project stops operating.
              </li>

              <li>
                <strong className="text-white">Legal Uncertainty:</strong>{" "}
                Ownership claims, licensing agreements, and
                intellectual property rights may be disputed
                or difficult to enforce.
              </li>
            </ul>
          </section>

          {/* FINAL EXPLANATION */}
          <section className="border-t border-white/10 px-1 py-8 md:px-2">
            <p className="text-xs font-black uppercase tracking-[0.2em] text-cyan-400">
              Important to Understand
            </p>

            <p className="mt-3 max-w-4xl text-sm leading-7 text-zinc-400">
              Before evaluating an NFT, consider what it
              represents, what rights it provides, and whether
              its intended purpose can be sustained over time.
              Evaluate its usefulness independently of its
              advertised market price.
            </p>
          </section>
        </div>
      </main>
    </>
  );
}
