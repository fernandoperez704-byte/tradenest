export const COINBASE_FUTURES_PRODUCT_IDS = {
  BTC: "BIP-20DEC30-CDE",
  ETH: "ETP-20DEC30-CDE",
  SOL: "SLP-20DEC30-CDE",
  XRP: "XPP-20DEC30-CDE",
  DOGE: "DOP-20DEC30-CDE",

  ADA: "ADP-20DEC30-CDE",
  BNB: "BNB-20DEC30-CDE",
  LINK: "LNP-20DEC30-CDE",
  AVAX: "AVP-20DEC30-CDE",
  SUI: "SUP-20DEC30-CDE",
  HBAR: "HEP-20DEC30-CDE",
  LTC: "LCP-20DEC30-CDE",
  BCH: "BCP-20DEC30-CDE",
  DOT: "POP-20DEC30-CDE",
  AAVE: "AVE-20DEC30-CDE",
  NEAR: "NER-20DEC30-CDE",

  SHIB: "SHP-20DEC30-CDE",
  PEPE: "PEP-20DEC30-CDE",
};

export const COINBASE_FUTURES_CONTRACT_SIZES = {
  BTC: 0.01,
  ETH: 0.1,
  SOL: 5,
  XRP: 500,
  DOGE: 5000,

  ADA: 1000,
  BNB: 1,
  LINK: 50,
  AVAX: 10,
  SUI: 500,
  HBAR: 5000,
  LTC: 5,
  BCH: 1,
  DOT: 100,
  AAVE: 5,
  NEAR: 500,

  SHIB: 10000,
  PEPE: 100000,
};

export const COINBASE_FUTURES_LEVERAGE_RANGES = {
  BTC: { min: 4, max: 10 },
  ETH: { min: 4, max: 10 },
  SOL: { min: 3, max: 5 },
  XRP: { min: 3, max: 5 },
  DOGE: { min: 2, max: 4 },
  ADA: { min: 4, max: 5 },
  BNB: { min: 3, max: 4 },
  LINK: { min: 3, max: 5 },
  AVAX: { min: 3, max: 5 },
  SUI: { min: 3, max: 4 },
  HBAR: { min: 3, max: 4 },
  LTC: { min: 3, max: 4 },
  BCH: { min: 2, max: 4 },
  DOT: { min: 2, max: 5 },
  AAVE: { min: 2, max: 4 },
  NEAR: { min: 3, max: 5 },
  SHIB: { min: 2, max: 4 },
  PEPE: { min: 2, max: 4 },
} as const;

export function getCoinbaseFuturesLeverageRange(
  symbol: keyof typeof COINBASE_FUTURES_LEVERAGE_RANGES
) {
  return COINBASE_FUTURES_LEVERAGE_RANGES[symbol];
}

export function clampCoinbaseFuturesLeverage(
  symbol: keyof typeof COINBASE_FUTURES_LEVERAGE_RANGES,
  leverage: number
) {
  const range = getCoinbaseFuturesLeverageRange(symbol);

  return Math.min(
    Math.max(leverage, range.min),
    range.max
  );
}

export function getCoinbaseFuturesContractSize(
  symbol: keyof typeof COINBASE_FUTURES_CONTRACT_SIZES
) {
  return COINBASE_FUTURES_CONTRACT_SIZES[symbol];
}

export function getCoinbaseFuturesQuantity(
  symbol: keyof typeof COINBASE_FUTURES_CONTRACT_SIZES,
  contracts: number
) {
  return contracts * getCoinbaseFuturesContractSize(symbol);
}

export function getCoinbaseFuturesNotional(
  symbol: keyof typeof COINBASE_FUTURES_CONTRACT_SIZES,
  contracts: number,
  price: number
) {
  const quantity = getCoinbaseFuturesQuantity(
    symbol,
    contracts
  );

  return quantity * price;
}

export function getCoinbaseFuturesContractsFromNotional(
  symbol: keyof typeof COINBASE_FUTURES_CONTRACT_SIZES,
  notional: number,
  price: number
) {
  const contractSize =
    getCoinbaseFuturesContractSize(symbol);

  const contractNotional =
    contractSize * price;

  if (contractNotional <= 0) return 0;

  return Math.floor(notional / contractNotional);
}

export function isValidCoinbaseFuturesContractAmount(
  contracts: number
) {
  return Number.isInteger(contracts) && contracts >= 1;
}

export function buildCoinbaseFuturesPosition(
  symbol: keyof typeof COINBASE_FUTURES_CONTRACT_SIZES,
  contracts: number,
  price: number
) {
  const contractSize =
    getCoinbaseFuturesContractSize(symbol);

  const quantity =
    getCoinbaseFuturesQuantity(symbol, contracts);

  const positionSize =
    getCoinbaseFuturesNotional(symbol, contracts, price);

  return {
    contracts,
    contractSize,
    quantity,
    positionSize,
  };
}