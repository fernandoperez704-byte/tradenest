export type CryptoHistorySeedEvent = {
  id: string;
  month: number;
  day: number;
  year: number;
  title: string;
  whatHappened: string;
  whyItMatters: string;
  sources: {
    name: string;
    url: string;
  }[];
  verified: boolean;
  status: "PUBLISHED";
};

export const cryptoHistoryEvents: CryptoHistorySeedEvent[] = [
  {
    id: "bitcoin-pizza-day",
    month: 5,
    day: 22,
    year: 2010,
    title: "Bitcoin Pizza Day",
    whatHappened:
      "A Bitcoin user paid 10,000 BTC for two pizzas in one of the earliest widely recognized purchases of physical goods using Bitcoin.",
    whyItMatters:
      "The transaction demonstrated that Bitcoin could function as a medium of exchange rather than existing only as an experimental digital asset.",
    sources: [],
    verified: true,
    status: "PUBLISHED",
  },

{
  id: "bitcoin-whitepaper",
  month: 10,
  day: 31,
  year: 2008,
  title: "Bitcoin Whitepaper Published",
  whatHappened:
    "Satoshi Nakamoto published the Bitcoin whitepaper describing a peer-to-peer electronic cash system.",
  whyItMatters:
    "The paper introduced the concepts that became the foundation of blockchain technology and Bitcoin.",
  sources: [],
  verified: true,
  status: "PUBLISHED",
},

{
  id: "bitcoin-genesis-block",
  month: 1,
  day: 3,
  year: 2009,
  title: "Genesis Block Mined",
  whatHappened:
    "Satoshi Nakamoto mined Bitcoin's first block, known as the Genesis Block.",
  whyItMatters:
    "This marked the official launch of the Bitcoin blockchain.",
  sources: [],
  verified: true,
  status: "PUBLISHED",
},

{
  id: "bitcoin-network-launch",
  month: 1,
  day: 9,
  year: 2009,
  title: "Bitcoin Network Released",
  whatHappened:
    "Bitcoin version 0.1 software was released publicly, allowing others to join the network.",
  whyItMatters:
    "The release enabled decentralized participation and mining.",
  sources: [],
  verified: true,
  status: "PUBLISHED",
},

{
  id: "first-bitcoin-halving",
  month: 11,
  day: 28,
  year: 2012,
  title: "First Bitcoin Halving",
  whatHappened:
    "The block reward decreased from 50 BTC to 25 BTC.",
  whyItMatters:
    "Bitcoin's programmed supply reduction reinforces its fixed supply model.",
  sources: [],
  verified: true,
  status: "PUBLISHED",
},

{
  id: "second-bitcoin-halving",
  month: 7,
  day: 9,
  year: 2016,
  title: "Second Bitcoin Halving",
  whatHappened:
    "The mining reward decreased from 25 BTC to 12.5 BTC.",
  whyItMatters:
    "The event continued Bitcoin's predictable monetary policy.",
  sources: [],
  verified: true,
  status: "PUBLISHED",
},

{
  id: "third-bitcoin-halving",
  month: 5,
  day: 11,
  year: 2020,
  title: "Third Bitcoin Halving",
  whatHappened:
    "The mining reward was reduced from 12.5 BTC to 6.25 BTC.",
  whyItMatters:
    "The halving further slowed the creation of new Bitcoin.",
  sources: [],
  verified: true,
  status: "PUBLISHED",
},

{
  id: "fourth-bitcoin-halving",
  month: 4,
  day: 20,
  year: 2024,
  title: "Fourth Bitcoin Halving",
  whatHappened:
    "Bitcoin's mining reward decreased from 6.25 BTC to 3.125 BTC.",
  whyItMatters:
    "The event continued Bitcoin's fixed issuance schedule and reduced new supply entering circulation.",
  sources: [],
  verified: true,
  status: "PUBLISHED",
},

{
  id: "bitcoin-all-time-high-2017",
  month: 12,
  day: 17,
  year: 2017,
  title: "Bitcoin Reaches New High in 2017",
  whatHappened:
    "Bitcoin reached a record price during the 2017 bull market.",
  whyItMatters:
    "The rally introduced millions of people to cryptocurrency and increased global awareness.",
  sources: [],
  verified: true,
  status: "PUBLISHED",
},

{
  id: "bitcoin-all-time-high-2021",
  month: 11,
  day: 10,
  year: 2021,
  title: "Bitcoin Sets New All-Time High",
  whatHappened:
    "Bitcoin reached a new record price during the 2021 market cycle.",
  whyItMatters:
    "The milestone reflected growing institutional participation and mainstream adoption.",
  sources: [],
  verified: true,
  status: "PUBLISHED",
},

{
  id: "ethereum-whitepaper",
  month: 11,
  day: 27,
  year: 2013,
  title: "Ethereum Whitepaper Published",
  whatHappened:
    "Vitalik Buterin published the Ethereum whitepaper outlining a blockchain capable of running decentralized applications and smart contracts.",
  whyItMatters:
    "Ethereum expanded blockchain technology beyond digital payments by introducing programmable smart contracts.",
  sources: [],
  verified: true,
  status: "PUBLISHED",
},

{
  id: "ethereum-mainnet-launch",
  month: 7,
  day: 30,
  year: 2015,
  title: "Ethereum Mainnet Launch",
  whatHappened:
    "Ethereum officially launched its main network, allowing developers to deploy decentralized applications.",
  whyItMatters:
    "The launch established Ethereum as the leading smart contract platform.",
  sources: [],
  verified: true,
  status: "PUBLISHED",
},

{
  id: "the-dao-launch",
  month: 4,
  day: 30,
  year: 2016,
  title: "The DAO Launch",
  whatHappened:
    "The DAO launched as one of the first large decentralized autonomous organizations built on Ethereum.",
  whyItMatters:
    "It demonstrated how blockchain could be used to coordinate investment decisions without centralized management.",
  sources: [],
  verified: true,
  status: "PUBLISHED",
},

{
  id: "dao-hack",
  month: 6,
  day: 17,
  year: 2016,
  title: "The DAO Hack",
  whatHappened:
    "A vulnerability in The DAO smart contract allowed an attacker to drain a large amount of ETH.",
  whyItMatters:
    "The incident highlighted the importance of smart contract security and led to one of crypto's most significant governance debates.",
  sources: [],
  verified: true,
  status: "PUBLISHED",
},

{
  id: "ethereum-hard-fork",
  month: 7,
  day: 20,
  year: 2016,
  title: "Ethereum Hard Fork",
  whatHappened:
    "The Ethereum community approved a hard fork to recover funds lost in The DAO exploit, creating Ethereum and Ethereum Classic as separate blockchains.",
  whyItMatters:
    "The split demonstrated how blockchain governance decisions can permanently divide a network.",
  sources: [],
  verified: true,
  status: "PUBLISHED",
},

{
  id: "cryptokitties-launch",
  month: 11,
  day: 28,
  year: 2017,
  title: "CryptoKitties Goes Viral",
  whatHappened:
    "CryptoKitties became one of the first blockchain games to gain widespread popularity, causing heavy congestion on Ethereum.",
  whyItMatters:
    "The event exposed Ethereum's scalability limitations while demonstrating demand for blockchain applications beyond finance.",
  sources: [],
  verified: true,
  status: "PUBLISHED",
},

{
  id: "defi-summer",
  month: 7,
  day: 1,
  year: 2020,
  title: "DeFi Summer Begins",
  whatHappened:
    "Decentralized finance applications experienced rapid growth, attracting billions of dollars into lending, trading, and yield farming protocols.",
  whyItMatters:
    "DeFi demonstrated how financial services could be built and accessed without traditional intermediaries.",
  sources: [],
  verified: true,
  status: "PUBLISHED",
},

{
  id: "london-upgrade",
  month: 8,
  day: 5,
  year: 2021,
  title: "London Upgrade Activated",
  whatHappened:
    "Ethereum activated the London Upgrade, introducing EIP-1559 and a new transaction fee mechanism.",
  whyItMatters:
    "The upgrade improved fee predictability and introduced the burning of a portion of transaction fees.",
  sources: [],
  verified: true,
  status: "PUBLISHED",
},

{
  id: "ethereum-merge",
  month: 9,
  day: 15,
  year: 2022,
  title: "The Merge",
  whatHappened:
    "Ethereum transitioned from Proof of Work to Proof of Stake through an event known as The Merge.",
  whyItMatters:
    "The transition significantly reduced Ethereum's energy consumption while changing how the network reaches consensus.",
  sources: [],
  verified: true,
  status: "PUBLISHED",
},

{
  id: "shapella-upgrade",
  month: 4,
  day: 12,
  year: 2023,
  title: "Shapella Upgrade",
  whatHappened:
    "Ethereum enabled validator withdrawals for staked ETH through the Shapella upgrade.",
  whyItMatters:
    "The upgrade completed a major milestone in Ethereum's Proof of Stake roadmap by allowing validators to access their staked funds.",
  sources: [],
  verified: true,
  status: "PUBLISHED",
},

{
  id: "mt-gox-launch",
  month: 7,
  day: 18,
  year: 2010,
  title: "Mt. Gox Launches",
  whatHappened:
    "Mt. Gox began operating and eventually became the world's largest Bitcoin exchange.",
  whyItMatters:
    "The exchange helped grow Bitcoin trading but also demonstrated the risks of centralized custodians.",
  sources: [],
  verified: true,
  status: "PUBLISHED",
},

{
  id: "mt-gox-collapse",
  month: 2,
  day: 28,
  year: 2014,
  title: "Mt. Gox Files for Bankruptcy",
  whatHappened:
    "Mt. Gox suspended trading and filed for bankruptcy after losing hundreds of thousands of Bitcoin.",
  whyItMatters:
    "The collapse highlighted the importance of exchange security and self-custody.",
  sources: [],
  verified: true,
  status: "PUBLISHED",
},

{
  id: "binance-launch",
  month: 7,
  day: 14,
  year: 2017,
  title: "Binance Launches",
  whatHappened:
    "Binance officially launched as a cryptocurrency exchange.",
  whyItMatters:
    "It quickly became one of the world's largest crypto exchanges and expanded access to digital assets.",
  sources: [],
  verified: true,
  status: "PUBLISHED",
},

{
  id: "coinbase-direct-listing",
  month: 4,
  day: 14,
  year: 2021,
  title: "Coinbase Goes Public",
  whatHappened:
    "Coinbase became the first major cryptocurrency exchange to trade publicly on the Nasdaq.",
  whyItMatters:
    "The listing marked a significant milestone in the mainstream adoption of the crypto industry.",
  sources: [],
  verified: true,
  status: "PUBLISHED",
},

{
  id: "bitcoin-etf-approved",
  month: 1,
  day: 10,
  year: 2024,
  title: "Spot Bitcoin ETFs Approved",
  whatHappened:
    "The U.S. Securities and Exchange Commission approved the first spot Bitcoin exchange-traded funds.",
  whyItMatters:
    "The approvals expanded regulated access to Bitcoin for traditional investors.",
  sources: [],
  verified: true,
  status: "PUBLISHED",
},

{
  id: "ethereum-etf-approved",
  month: 5,
  day: 23,
  year: 2024,
  title: "Spot Ethereum ETFs Approved",
  whatHappened:
    "The SEC approved rule changes allowing the launch of spot Ethereum exchange-traded funds.",
  whyItMatters:
    "The decision represented another step toward broader institutional participation in digital assets.",
  sources: [],
  verified: true,
  status: "PUBLISHED",
},

{
  id: "el-salvador-bitcoin",
  month: 9,
  day: 7,
  year: 2021,
  title: "El Salvador Adopts Bitcoin",
  whatHappened:
    "El Salvador became the first country to recognize Bitcoin as legal tender.",
  whyItMatters:
    "The move demonstrated that governments could experiment with cryptocurrency in national financial systems.",
  sources: [],
  verified: true,
  status: "PUBLISHED",
},

{
  id: "terra-collapse",
  month: 5,
  day: 12,
  year: 2022,
  title: "Terra Ecosystem Collapse",
  whatHappened:
    "The TerraUSD stablecoin lost its peg, leading to the collapse of the Terra ecosystem.",
  whyItMatters:
    "The event exposed the risks associated with algorithmic stablecoins and affected the broader crypto market.",
  sources: [],
  verified: true,
  status: "PUBLISHED",
},

{
  id: "ftx-collapse",
  month: 11,
  day: 11,
  year: 2022,
  title: "FTX Files for Bankruptcy",
  whatHappened:
    "FTX and affiliated companies filed for bankruptcy after a severe liquidity crisis.",
  whyItMatters:
    "The collapse increased industry focus on transparency, proof of reserves, and risk management.",
  sources: [],
  verified: true,
  status: "PUBLISHED",
},

{
  id: "usdc-depeg",
  month: 3,
  day: 11,
  year: 2023,
  title: "USDC Temporarily Loses Its Peg",
  whatHappened:
    "USDC briefly traded below one U.S. dollar following concerns surrounding Silicon Valley Bank.",
  whyItMatters:
    "The event highlighted how traditional banking risks can affect digital asset markets.",
  sources: [],
  verified: true,
  status: "PUBLISHED",
},

{
  id: "cme-bitcoin-futures",
  month: 12,
  day: 18,
  year: 2017,
  title: "CME Launches Bitcoin Futures",
  whatHappened:
    "The Chicago Mercantile Exchange launched regulated Bitcoin futures trading.",
  whyItMatters:
    "It marked one of the first major institutional products tied to Bitcoin.",
  sources: [],
  verified: true,
  status: "PUBLISHED",
},

{
  id: "microstrategy-bitcoin",
  month: 8,
  day: 11,
  year: 2020,
  title: "MicroStrategy Buys Bitcoin",
  whatHappened:
    "MicroStrategy announced its first Bitcoin purchase as a treasury reserve asset.",
  whyItMatters:
    "The decision encouraged other public companies to consider holding Bitcoin on their balance sheets.",
  sources: [],
  verified: true,
  status: "PUBLISHED",
},

{
  id: "tesla-bitcoin-purchase",
  month: 2,
  day: 8,
  year: 2021,
  title: "Tesla Announces Bitcoin Purchase",
  whatHappened:
    "Tesla disclosed a $1.5 billion investment in Bitcoin.",
  whyItMatters:
    "The announcement accelerated institutional interest and increased public awareness of Bitcoin.",
  sources: [],
  verified: true,
  status: "PUBLISHED",
},

{
  id: "taproot-activation",
  month: 11,
  day: 14,
  year: 2021,
  title: "Bitcoin Taproot Activated",
  whatHappened:
    "Bitcoin activated the Taproot upgrade, improving privacy, efficiency, and smart contract capabilities.",
  whyItMatters:
    "Taproot became Bitcoin's most significant protocol upgrade in several years.",
  sources: [],
  verified: true,
  status: "PUBLISHED",
},

{
  id: "china-bitcoin-ban",
  month: 9,
  day: 24,
  year: 2021,
  title: "China Expands Crypto Ban",
  whatHappened:
    "Chinese regulators declared cryptocurrency-related transactions illegal and intensified enforcement.",
  whyItMatters:
    "The announcement accelerated the migration of mining operations to other countries.",
  sources: [],
  verified: true,
  status: "PUBLISHED",
},

{
  id: "silk-road-shutdown",
  month: 10,
  day: 2,
  year: 2013,
  title: "Silk Road Shut Down",
  whatHappened:
    "U.S. authorities shut down the Silk Road online marketplace and seized Bitcoin connected to the platform.",
  whyItMatters:
    "The event became one of the earliest major regulatory actions involving cryptocurrency.",
  sources: [],
  verified: true,
  status: "PUBLISHED",
},

{
  id: "bitcoin-100k",
  month: 12,
  day: 5,
  year: 2024,
  title: "Bitcoin Surpasses $100,000",
  whatHappened:
    "Bitcoin traded above the $100,000 level for the first time.",
  whyItMatters:
    "Crossing a six-figure price marked a major psychological and historical milestone for the asset.",
  sources: [],
  verified: true,
  status: "PUBLISHED",
},

{
  id: "ordinals-launch",
  month: 1,
  day: 21,
  year: 2023,
  title: "Bitcoin Ordinals Introduced",
  whatHappened:
    "The Ordinals protocol enabled inscriptions directly on individual satoshis.",
  whyItMatters:
    "The protocol expanded Bitcoin's use cases beyond payments by supporting digital artifacts and collectibles.",
  sources: [],
  verified: true,
  status: "PUBLISHED",
},

{
  id: "lightning-mainstream-growth",
  month: 6,
  day: 1,
  year: 2021,
  title: "Lightning Network Adoption Accelerates",
  whatHappened:
    "The Lightning Network experienced rapid growth in users, nodes, and payment capacity.",
  whyItMatters:
    "Lightning demonstrated how Bitcoin can support faster and lower-cost transactions.",
  sources: [],
  verified: true,
  status: "PUBLISHED",
},

{
  id: "grayscale-etf-conversion",
  month: 1,
  day: 11,
  year: 2024,
  title: "Grayscale Converts GBTC to Spot ETF",
  whatHappened:
    "Following SEC approval, Grayscale converted its Bitcoin trust into a spot Bitcoin ETF.",
  whyItMatters:
    "The conversion represented one of the largest transitions of digital assets into a regulated ETF structure.",
  sources: [],
  verified: true,
  status: "PUBLISHED",
},

{
  id: "erc20-standard",
  month: 11,
  day: 19,
  year: 2015,
  title: "ERC-20 Token Standard Proposed",
  whatHappened:
    "Ethereum's ERC-20 token standard was introduced, defining a common interface for fungible tokens.",
  whyItMatters:
    "The standard made it much easier to create compatible tokens and accelerated the growth of blockchain projects.",
  sources: [],
  verified: true,
  status: "PUBLISHED",
},

{
  id: "uniswap-launch",
  month: 11,
  day: 2,
  year: 2018,
  title: "Uniswap Launches",
  whatHappened:
    "Uniswap introduced an automated market maker (AMM) model for decentralized token trading.",
  whyItMatters:
    "It transformed decentralized exchanges by allowing users to trade directly from their wallets without a traditional order book.",
  sources: [],
  verified: true,
  status: "PUBLISHED",
},

{
  id: "chainlink-mainnet",
  month: 5,
  day: 30,
  year: 2019,
  title: "Chainlink Mainnet Launches",
  whatHappened:
    "Chainlink launched its decentralized oracle network on Ethereum.",
  whyItMatters:
    "Reliable off-chain data became possible for smart contracts, enabling many DeFi applications.",
  sources: [],
  verified: true,
  status: "PUBLISHED",
},

{
  id: "makerdao-multi-collateral",
  month: 11,
  day: 18,
  year: 2019,
  title: "MakerDAO Launches Multi-Collateral DAI",
  whatHappened:
    "MakerDAO upgraded DAI to support multiple crypto assets as collateral.",
  whyItMatters:
    "The upgrade expanded the flexibility and resilience of one of the largest decentralized stablecoins.",
  sources: [],
  verified: true,
  status: "PUBLISHED",
},

{
  id: "compound-governance",
  month: 6,
  day: 15,
  year: 2020,
  title: "Compound Launches Governance Token",
  whatHappened:
    "Compound introduced the COMP governance token, rewarding users for participating in the protocol.",
  whyItMatters:
    "The launch helped popularize liquidity mining and accelerated the growth of decentralized finance.",
  sources: [],
  verified: true,
  status: "PUBLISHED",
},

{
  id: "opensea-launch",
  month: 12,
  day: 20,
  year: 2017,
  title: "OpenSea Launches",
  whatHappened:
    "OpenSea launched as one of the first large NFT marketplaces.",
  whyItMatters:
    "The platform became a major hub for trading digital collectibles and NFTs.",
  sources: [],
  verified: true,
  status: "PUBLISHED",
},

{
  id: "beeple-nft-sale",
  month: 3,
  day: 11,
  year: 2021,
  title: "Beeple NFT Sells for $69 Million",
  whatHappened:
    "Beeple's digital artwork was sold at Christie's for approximately $69 million.",
  whyItMatters:
    "The sale brought NFTs into mainstream public awareness.",
  sources: [],
  verified: true,
  status: "PUBLISHED",
},

{
  id: "arbitrum-mainnet",
  month: 8,
  day: 31,
  year: 2021,
  title: "Arbitrum Mainnet Launches",
  whatHappened:
    "Arbitrum launched its Layer 2 scaling solution for Ethereum.",
  whyItMatters:
    "Layer 2 networks reduced transaction costs and increased scalability for Ethereum users.",
  sources: [],
  verified: true,
  status: "PUBLISHED",
},

{
  id: "optimism-mainnet",
  month: 12,
  day: 16,
  year: 2021,
  title: "Optimism Opens to Developers",
  whatHappened:
    "Optimism expanded access to its optimistic rollup network for Ethereum.",
  whyItMatters:
    "The network helped improve Ethereum scalability through Layer 2 technology.",
  sources: [],
  verified: true,
  status: "PUBLISHED",
},

{
  id: "polygon-growth",
  month: 5,
  day: 1,
  year: 2021,
  title: "Polygon Ecosystem Rapidly Expands",
  whatHappened:
    "Polygon experienced significant growth as developers and users adopted its scaling solutions.",
  whyItMatters:
    "The expansion demonstrated strong demand for lower-cost blockchain transactions.",
  sources: [],
  verified: true,
  status: "PUBLISHED",
},

{
  id: "bitfinex-hack",
  month: 8,
  day: 2,
  year: 2016,
  title: "Bitfinex Suffers Major Bitcoin Hack",
  whatHappened:
    "Bitfinex lost approximately 120,000 BTC after a security breach, making it one of the largest exchange hacks at the time.",
  whyItMatters:
    "The incident highlighted the importance of exchange security and risk management.",
  sources: [],
  verified: true,
  status: "PUBLISHED",
},

{
  id: "coincheck-hack",
  month: 1,
  day: 26,
  year: 2018,
  title: "Coincheck Hack",
  whatHappened:
    "Japanese exchange Coincheck lost over $500 million worth of NEM tokens in a cyberattack.",
  whyItMatters:
    "The event led to increased regulatory oversight of cryptocurrency exchanges in Japan.",
  sources: [],
  verified: true,
  status: "PUBLISHED",
},

{
  id: "poly-network-hack",
  month: 8,
  day: 10,
  year: 2021,
  title: "Poly Network Exploited",
  whatHappened:
    "An attacker exploited Poly Network and moved hundreds of millions of dollars in digital assets before later returning most of the funds.",
  whyItMatters:
    "The incident demonstrated both the risks of cross-chain infrastructure and the importance of smart contract security.",
  sources: [],
  verified: true,
  status: "PUBLISHED",
},

{
  id: "wormhole-exploit",
  month: 2,
  day: 2,
  year: 2022,
  title: "Wormhole Bridge Exploit",
  whatHappened:
    "A vulnerability in the Wormhole bridge resulted in one of the largest bridge exploits in crypto history.",
  whyItMatters:
    "The exploit emphasized the security challenges facing cross-chain bridges.",
  sources: [],
  verified: true,
  status: "PUBLISHED",
},

{
  id: "ronin-bridge-hack",
  month: 3,
  day: 23,
  year: 2022,
  title: "Ronin Bridge Hack",
  whatHappened:
    "Attackers compromised the Ronin Network bridge, stealing more than $600 million in crypto assets.",
  whyItMatters:
    "The event became one of the largest cryptocurrency thefts ever recorded and highlighted bridge security risks.",
  sources: [],
  verified: true,
  status: "PUBLISHED",
},

{
  id: "tornado-cash-sanctions",
  month: 8,
  day: 8,
  year: 2022,
  title: "Tornado Cash Sanctioned",
  whatHappened:
    "The U.S. Treasury sanctioned Tornado Cash, a cryptocurrency privacy protocol.",
  whyItMatters:
    "The action sparked industry-wide discussions about privacy, decentralization, and regulation.",
  sources: [],
  verified: true,
  status: "PUBLISHED",
},

{
  id: "sec-binance-lawsuit",
  month: 6,
  day: 5,
  year: 2023,
  title: "SEC Files Lawsuit Against Binance",
  whatHappened:
    "The U.S. SEC filed a civil lawsuit against Binance and related entities.",
  whyItMatters:
    "The case became one of the most significant regulatory actions affecting the cryptocurrency industry.",
  sources: [],
  verified: true,
  status: "PUBLISHED",
},

{
  id: "sec-coinbase-lawsuit",
  month: 6,
  day: 6,
  year: 2023,
  title: "SEC Files Lawsuit Against Coinbase",
  whatHappened:
    "The SEC filed a lawsuit against Coinbase alleging violations of U.S. securities laws.",
  whyItMatters:
    "The case became central to ongoing debates about cryptocurrency regulation in the United States.",
  sources: [],
  verified: true,
  status: "PUBLISHED",
},

{
  id: "blackrock-bitcoin-etf-filing",
  month: 6,
  day: 15,
  year: 2023,
  title: "BlackRock Files for Spot Bitcoin ETF",
  whatHappened:
    "BlackRock submitted an application for a spot Bitcoin ETF in the United States.",
  whyItMatters:
    "The filing significantly increased optimism about institutional participation in digital assets.",
  sources: [],
  verified: true,
  status: "PUBLISHED",
},

{
  id: "ethereum-name-service",
  month: 5,
  day: 4,
  year: 2017,
  title: "Ethereum Name Service Launches",
  whatHappened:
    "The Ethereum Name Service (ENS) introduced human-readable names for blockchain addresses.",
  whyItMatters:
    "ENS improved usability by making wallet addresses easier to use and remember.",
  sources: [],
  verified: true,
  status: "PUBLISHED",
},

{
  id: "ripple-sec-lawsuit",
  month: 12,
  day: 22,
  year: 2020,
  title: "SEC Files Lawsuit Against Ripple",
  whatHappened:
    "The SEC filed a lawsuit alleging Ripple conducted an unregistered securities offering through XRP.",
  whyItMatters:
    "The case became one of the most influential legal battles shaping cryptocurrency regulation in the United States.",
  sources: [],
  verified: true,
  status: "PUBLISHED",
},

{
  id: "ripple-summary-judgment",
  month: 7,
  day: 13,
  year: 2023,
  title: "Ripple Wins Partial Court Ruling",
  whatHappened:
    "A federal court ruled that certain XRP sales on public exchanges were not securities transactions.",
  whyItMatters:
    "The decision became a landmark moment for how digital assets may be treated under U.S. securities laws.",
  sources: [],
  verified: true,
  status: "PUBLISHED",
},

{
  id: "mica-approved",
  month: 5,
  day: 16,
  year: 2023,
  title: "European Union Approves MiCA",
  whatHappened:
    "The European Union adopted the Markets in Crypto-Assets (MiCA) regulatory framework.",
  whyItMatters:
    "MiCA established one of the world's first comprehensive regulatory frameworks for crypto assets.",
  sources: [],
  verified: true,
  status: "PUBLISHED",
},

{
  id: "irs-crypto-guidance",
  month: 10,
  day: 9,
  year: 2019,
  title: "IRS Issues Cryptocurrency Tax Guidance",
  whatHappened:
    "The IRS released updated guidance explaining how cryptocurrency transactions should be reported for tax purposes.",
  whyItMatters:
    "The guidance reinforced that digital assets are treated as property for U.S. tax reporting.",
  sources: [],
  verified: true,
  status: "PUBLISHED",
},

{
  id: "china-mining-ban",
  month: 5,
  day: 21,
  year: 2021,
  title: "China Announces Bitcoin Mining Crackdown",
  whatHappened:
    "Chinese authorities announced measures targeting cryptocurrency mining operations.",
  whyItMatters:
    "The crackdown accelerated the migration of miners to countries around the world.",
  sources: [],
  verified: true,
  status: "PUBLISHED",
},

{
  id: "bitcoin-2013-bull-market",
  month: 11,
  day: 30,
  year: 2013,
  title: "Bitcoin Completes 2013 Bull Market",
  whatHappened:
    "Bitcoin experienced one of its first major global bull markets before entering a prolonged correction.",
  whyItMatters:
    "The cycle demonstrated that crypto markets can experience rapid expansions followed by significant declines.",
  sources: [],
  verified: true,
  status: "PUBLISHED",
},

{
  id: "crypto-winter-2018",
  month: 12,
  day: 15,
  year: 2018,
  title: "2018 Crypto Winter",
  whatHappened:
    "Digital asset prices declined sharply throughout 2018 following the previous year's bull market.",
  whyItMatters:
    "The bear market emphasized the cyclical nature of cryptocurrency investing.",
  sources: [],
  verified: true,
  status: "PUBLISHED",
},

{
  id: "covid-market-crash",
  month: 12,
  day: 12,
  year: 2020,
  title: "COVID-19 Market Crash",
  whatHappened:
    "Global financial markets, including cryptocurrencies, experienced a rapid selloff during the COVID-19 pandemic.",
  whyItMatters:
    "The event demonstrated how crypto markets can react to major global economic shocks.",
  sources: [],
  verified: true,
  status: "PUBLISHED",
},

{
  id: "crypto-bear-market-2022",
  month: 6,
  day: 18,
  year: 2022,
  title: "2022 Crypto Bear Market",
  whatHappened:
    "The cryptocurrency market experienced widespread declines as macroeconomic uncertainty and major industry failures affected investor confidence.",
  whyItMatters:
    "The bear market reinforced the importance of risk management and long-term market cycles.",
  sources: [],
  verified: true,
  status: "PUBLISHED",
},

{
  id: "etf-driven-rally",
  month: 1,
  day: 11,
  year: 2024,
  title: "ETF Era Begins",
  whatHappened:
    "Spot Bitcoin ETF approvals marked the beginning of a new phase of institutional participation in cryptocurrency markets.",
  whyItMatters:
    "The event highlighted how new financial products can influence long-term market trends.",
  sources: [],
 verified: true,
 status: "PUBLISHED",
},

{
  id: "paypal-crypto",
  month: 10,
  day: 21,
  year: 2020,
  title: "PayPal Adds Cryptocurrency Support",
  whatHappened:
    "PayPal announced that customers could buy, hold, and sell select cryptocurrencies through its platform.",
  whyItMatters:
    "The announcement exposed millions of users to digital assets through a familiar financial service.",
  sources: [],
  verified: true,
  status: "PUBLISHED",
},

{
  id: "visa-usdc",
  month: 3,
  day: 29,
  year: 2021,
  title: "Visa Announces USDC Settlement",
  whatHappened:
    "Visa announced support for settling certain payment transactions using the USDC stablecoin.",
  whyItMatters:
    "The announcement demonstrated growing interest in blockchain technology from global payment companies.",
  sources: [],
  verified: true,
  status: "PUBLISHED",
},

{
  id: "mastercard-crypto",
  month: 2,
  day: 10,
  year: 2021,
  title: "Mastercard Expands Cryptocurrency Support",
  whatHappened:
    "Mastercard announced plans to support select cryptocurrencies across its payment network.",
  whyItMatters:
    "The move reflected increasing interest from traditional financial institutions in digital assets.",
  sources: [],
  verified: true,
  status: "PUBLISHED",
},

{
  id: "fidelity-bitcoin",
  month: 11,
  day: 3,
  year: 2021,
  title: "Fidelity Expands Digital Asset Services",
  whatHappened:
    "Fidelity continued expanding institutional cryptocurrency services through Fidelity Digital Assets.",
  whyItMatters:
    "The expansion reflected increasing demand for digital asset services from institutional investors.",
  sources: [],
  verified: true,
  status: "PUBLISHED",
},

{
  id: "blackrock-bitcoin-etf-launch",
  month: 1,
  day: 11,
  year: 2024,
  title: "BlackRock Spot Bitcoin ETF Begins Trading",
  whatHappened:
    "BlackRock's spot Bitcoin ETF began trading following SEC approval.",
  whyItMatters:
    "The launch represented one of the largest institutional entries into the cryptocurrency market.",
  sources: [],
  verified: true,
  status: "PUBLISHED",
},

{
  id: "lightning-el-salvador",
  month: 9,
  day: 7,
  year: 2021,
  title: "El Salvador Launches Chivo Wallet",
  whatHappened:
    "El Salvador launched the Chivo wallet alongside Bitcoin becoming legal tender, using the Lightning Network for many transactions.",
  whyItMatters:
    "The rollout demonstrated how Layer 2 technology could support faster and lower-cost Bitcoin payments.",
  sources: [],
  verified: true,
  status: "PUBLISHED",
},

{
  id: "cash-app-bitcoin",
  month: 1,
  day: 31,
  year: 2018,
  title: "Cash App Adds Bitcoin Trading",
  whatHappened:
    "Cash App expanded Bitcoin buying and selling to customers across the United States.",
  whyItMatters:
    "The feature made Bitcoin more accessible to millions of retail users.",
  sources: [],
  verified: true,
  status: "PUBLISHED",
},

{
  id: "square-bitcoin-treasury",
  month: 10,
  day: 8,
  year: 2020,
  title: "Square Adds Bitcoin to Treasury",
  whatHappened:
    "Square announced a significant Bitcoin purchase for its corporate treasury.",
  whyItMatters:
    "The purchase reinforced growing corporate confidence in Bitcoin as a treasury asset.",
  sources: [],
  verified: true,
  status: "PUBLISHED",
},

{
  id: "telegram-ton-open",
  month: 9,
  day: 13,
  year: 2023,
  title: "Telegram Expands TON Integration",
  whatHappened:
    "Telegram expanded its support for The Open Network (TON), bringing blockchain features closer to its global user base.",
  whyItMatters:
    "The integration highlighted how messaging platforms can accelerate blockchain adoption.",
  sources: [],
  verified: true,
  status: "PUBLISHED",
},

{
  id: "paypal-stablecoin",
  month: 8,
  day: 7,
  year: 2023,
  title: "PayPal Launches PYUSD",
  whatHappened:
    "PayPal introduced PYUSD, its U.S. dollar-backed stablecoin.",
  whyItMatters:
    "The launch represented one of the first major global payment companies issuing its own stablecoin.",
  sources: [],
  verified: true,
  status: "PUBLISHED",
},





];