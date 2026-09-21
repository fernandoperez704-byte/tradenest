
import {
  COINBASE_FUTURES_CONTRACT_SIZES,
  buildCoinbaseFuturesPosition,
  getCoinbaseFuturesContractsFromNotional,
  getCoinbaseFuturesMarginDetails,
} from "../data/coinbaseFutures";

// ============================================================
// GABY AUTO TRADE — INTERNAL BENCHMARK
// ============================================================

export type GabyAutoTradeAction =
  | "LONG"
  | "SHORT"
  | "NO_TRADE";

export type GabyAutoTradeDecision = {
  action: GabyAutoTradeAction;
  confidence: number;

  higherTimeframeTrend: string | null;
  higherTimeframeAlignment: boolean | null;

  entryPrice: number | null;
  stopLoss: number | null;
  takeProfit: number | null;

  potentialGrossProfit: number | null;
  potentialNetProfit: number | null;
  potentialLoss: number | null;
  riskRewardRatio: number | null;

  riskPercent: number | null;

  reason: string;
};


// ============================================================
// CONFIG
// ============================================================

export const GABY_AUTO_TRADE_CONFIG = {
  enabled: true,
  startingBalance: 10_000,

  maxRiskPercent: 1,

  // Trade must offer at least $1.50 of gross reward
  // for every $1.00 of structural price risk.
  minRiskRewardRatio: 1.5,

  // A single position may use at most 20%
  // of benchmark equity as required margin.
  maxMarginPercent: 20,

  maxOpenPositions: 1,
  decisionIntervalMs: 60_000,
} as const;


// ============================================================
// MARKET INPUT
// ============================================================

export type GabyAutoTradeMarketInput = {
  mode: string;
  symbol: string;
  price: number;
  selectedLeverage: number;

  marketIntelligence: any;
  multiTimeframeAnalysis: any;
  movingAverageAnalysis: any;
  structureAnalysis: any;
  priceLocation: any;
  entryQuality: any;

  higherTimeframeStructures?: Record<
    string,
    {
      support: any;
      resistance: any;
    }
  >;
};


// ============================================================
// DECISION
// Gaby uses TradeNestX engine outputs only
// ============================================================

export function buildGabyAutoTradeDecision(
  market: GabyAutoTradeMarketInput
): GabyAutoTradeDecision {
  const intelligence = market.marketIntelligence;
  const multiTimeframe = market.multiTimeframeAnalysis;

  const direction = intelligence?.direction;
  const alignment = multiTimeframe?.status;
const entryQuality = market.entryQuality;

const higherStructures =
  market.higherTimeframeStructures ?? {};

const support =
  intelligence?.nearestSupport ??
  higherStructures["1H"]?.support ??
  higherStructures["4H"]?.support ??
  higherStructures["1D"]?.support ??
  null;

const resistance =
  intelligence?.nearestResistance ??
  higherStructures["1H"]?.resistance ??
  higherStructures["4H"]?.resistance ??
  higherStructures["1D"]?.resistance ??
  null;

console.log("GABY AUTO TRADE SETUP:", {
  direction,
  alignment,
  entryQuality,
  hasSupport: Boolean(support),
  hasResistance: Boolean(resistance),
  support,
  resistance,
});

  const bullishSetup =
    direction === "BULLISH" &&
    alignment !== "CONFLICTING" &&
    (entryQuality === "EXCELLENT" ||
      entryQuality === "GOOD");

  const bearishSetup =
    direction === "BEARISH" &&
    alignment !== "CONFLICTING" &&
    (entryQuality === "EXCELLENT" ||
      entryQuality === "GOOD");

  let action: GabyAutoTradeAction = "NO_TRADE";
  let stopLoss: number | null = null;
  let takeProfit: number | null = null;

if (bullishSetup && support) {
  action = "LONG";

  const structuralStopLoss = support.low;
  stopLoss = structuralStopLoss;

  takeProfit = resistance
    ? resistance.low
    : market.price +
      (market.price - structuralStopLoss) *
        GABY_AUTO_TRADE_CONFIG.minRiskRewardRatio;
}

if (bearishSetup && resistance) {
  action = "SHORT";

  const structuralStopLoss = resistance.high;
  stopLoss = structuralStopLoss;

  takeProfit = support
    ? support.high
    : market.price -
      (structuralStopLoss - market.price) *
        GABY_AUTO_TRADE_CONFIG.minRiskRewardRatio;
}

  return {
    action,
confidence:
  action === "NO_TRADE"
    ? 0
    : entryQuality === "EXCELLENT"
    ? 90
    : entryQuality === "GOOD"
    ? 75
    : 0,

    higherTimeframeTrend: null,

    higherTimeframeAlignment:
      alignment === "ALIGNED"
        ? true
        : alignment === "PARTIALLY_ALIGNED"
        ? true
        : alignment === "CONFLICTING"
        ? false
        : null,

    entryPrice: market.price,
    stopLoss,
    takeProfit,

    potentialGrossProfit: null,
    potentialNetProfit: null,
    potentialLoss: null,
    riskRewardRatio: null,

    riskPercent: null,

    reason:
      action === "NO_TRADE"
        ? "TradeNestX conditions do not currently qualify for an entry."
        : `${action} setup qualified from TradeNestX direction, timeframe alignment, entry quality, and market structure.`,
  };
}


// ============================================================
// PRE-TRADE ECONOMICS
// TradeNestX calculates the proposed trade before execution
// ============================================================

export type GabyAutoTradeEconomics = {
  positionSize: number;
  quantity: number;

  potentialGrossProfit: number;
  potentialNetProfit: number;
  potentialLoss: number;

  estimatedEntryFee: number;
  estimatedExitFee: number;
  estimatedTotalFees: number;

  riskRewardRatio: number;
  riskPercent: number;
};

export function calculateGabyAutoTradePriceEconomics(
  decision: GabyAutoTradeDecision
) {
  const {
    action,
    entryPrice,
    stopLoss,
    takeProfit,
  } = decision;

  if (
    action === "NO_TRADE" ||
    entryPrice === null ||
    stopLoss === null ||
    takeProfit === null
  ) {
    return null;
  }

  const potentialProfitPerUnit =
    action === "LONG"
      ? takeProfit - entryPrice
      : entryPrice - takeProfit;

  const potentialLossPerUnit =
    action === "LONG"
      ? entryPrice - stopLoss
      : stopLoss - entryPrice;

  if (
    potentialProfitPerUnit <= 0 ||
    potentialLossPerUnit <= 0
  ) {
    return null;
  }

  const riskRewardRatio =
    potentialProfitPerUnit / potentialLossPerUnit;

  return {
    potentialProfitPerUnit,
    potentialLossPerUnit,
    riskRewardRatio,
  };
}

export function calculateGabyAutoTradePositionSize(
  decision: GabyAutoTradeDecision,
  balance: number,
  symbol: keyof typeof COINBASE_FUTURES_CONTRACT_SIZES
) {
  const priceEconomics =
    calculateGabyAutoTradePriceEconomics(decision);

  if (
    !priceEconomics ||
    decision.entryPrice === null ||
    balance <= 0
  ) {
    return null;
  }

  const maxRiskAmount =
    balance *
    (GABY_AUTO_TRADE_CONFIG.maxRiskPercent / 100);

const roundTripFeeRate = 0.002;

const riskPerUnitWithFees =
  priceEconomics.potentialLossPerUnit +
  decision.entryPrice * roundTripFeeRate;

const riskBasedQuantity =
  maxRiskAmount / riskPerUnitWithFees;

const riskBasedNotional =
  riskBasedQuantity * decision.entryPrice;

  const contracts =
    getCoinbaseFuturesContractsFromNotional(
      symbol,
      riskBasedNotional,
      decision.entryPrice
    );

  if (contracts < 1) {
    return null;
  }

  const position =
    buildCoinbaseFuturesPosition(
      symbol,
      contracts,
      decision.entryPrice
    );

  const actualPotentialLoss =
    priceEconomics.potentialLossPerUnit *
    position.quantity;

  const riskPercent =
    (actualPotentialLoss / balance) * 100;

  return {
    maxRiskAmount,
    contracts,
    quantity: position.quantity,
    positionSize: position.positionSize,
    riskPercent,
  };

}

export function calculateGabyAutoTradeEconomics(
  decision: GabyAutoTradeDecision,
  balance: number,
  symbol: keyof typeof COINBASE_FUTURES_CONTRACT_SIZES,
  selectedLeverage: number
) {
  const priceEconomics =
    calculateGabyAutoTradePriceEconomics(decision);

  const sizing =
    calculateGabyAutoTradePositionSize(
      decision,
      balance,
      symbol
    );

  if (!priceEconomics || !sizing) {
    return null;
  }

  const potentialGrossProfit =
    priceEconomics.potentialProfitPerUnit *
    sizing.quantity;

  const potentialLoss =
    priceEconomics.potentialLossPerUnit *
    sizing.quantity;

  const marginDetails =
    getCoinbaseFuturesMarginDetails(
      symbol,
      sizing.positionSize,
      selectedLeverage
    );

  const coinbaseFuturesFeeRate = 0.001;

  const estimatedEntryFee =
    sizing.positionSize * coinbaseFuturesFeeRate;

  const estimatedExitFee =
    sizing.positionSize * coinbaseFuturesFeeRate;

  const estimatedTotalFees =
    estimatedEntryFee + estimatedExitFee;

  const requiredPriceMove =
    sizing.quantity > 0
      ? estimatedTotalFees / sizing.quantity
      : 0;

  const breakEvenPrice =
    decision.entryPrice !== null
      ? decision.action === "LONG"
        ? decision.entryPrice + requiredPriceMove
        : decision.entryPrice - requiredPriceMove
      : null;

  const potentialNetProfit =
    potentialGrossProfit - estimatedTotalFees;

  const potentialLossWithFees =
    potentialLoss + estimatedTotalFees;

  const riskPercentWithFees =
    balance > 0
      ? (potentialLossWithFees / balance) * 100
      : 0;

  const maintenanceBuffer = 0.005;

  const liquidationPrice =
    marginDetails.effectiveLeverage > 1 &&
    decision.entryPrice !== null
      ? decision.action === "LONG"
        ? decision.entryPrice *
          (1 -
            1 / marginDetails.effectiveLeverage +
            maintenanceBuffer)
        : decision.entryPrice *
          (1 +
            1 / marginDetails.effectiveLeverage -
            maintenanceBuffer)
      : null;

  return {
    contracts: sizing.contracts,
    positionSize: sizing.positionSize,
    quantity: sizing.quantity,

    marginSession: marginDetails.session,
    effectiveLeverage: marginDetails.effectiveLeverage,
    marginRequired: marginDetails.marginRequired,
    initialMarginRate: marginDetails.marginRate,
    liquidationPrice,

    potentialGrossProfit,
    potentialNetProfit,
    potentialLoss,
    potentialLossWithFees,

    estimatedEntryFee,
    estimatedExitFee,
    estimatedTotalFees,
    breakEvenPrice,

    riskRewardRatio:
      priceEconomics.riskRewardRatio,

    riskPercent: sizing.riskPercent,
    riskPercentWithFees,
  };
}

// ============================================================
// VALIDATION
// TradeNestX controls whether Gaby may execute
// ============================================================

export function validateGabyAutoTradeDecision(
  decision: GabyAutoTradeDecision,
  balance: number,
  symbol: keyof typeof COINBASE_FUTURES_CONTRACT_SIZES,
  selectedLeverage: number
) {
  if (decision.action === "NO_TRADE") {
    return { valid: false, reason: decision.reason };
  }

  if (
    !decision.entryPrice ||
    !decision.stopLoss ||
    !decision.takeProfit
  ) {
    return {
      valid: false,
      reason: "Incomplete trade plan.",
    };
  }

  const priceEconomics =
    calculateGabyAutoTradePriceEconomics(decision);

  if (!priceEconomics) {
    return {
      valid: false,
      reason: "Invalid Stop Loss or Take Profit structure.",
    };
  }

  const economics =
    calculateGabyAutoTradeEconomics(
      decision,
      balance,
      symbol,
      selectedLeverage
    );

  if (!economics) {
    return {
      valid: false,
      reason: "Unable to calculate pre-trade economics.",
    };
  }

  if (economics.potentialNetProfit <= 0) {
    return {
      valid: false,
      reason:
        "Take Profit would not produce a positive net profit after estimated fees.",
      priceEconomics,
      economics,
    };
  }

  if (
    economics.riskRewardRatio <
    GABY_AUTO_TRADE_CONFIG.minRiskRewardRatio
  ) {
    return {
      valid: false,
      reason: `Trade does not meet the minimum ${GABY_AUTO_TRADE_CONFIG.minRiskRewardRatio}:1 reward-to-risk requirement.`,
      priceEconomics,
      economics,
    };
  }

  const marginPercent =
    balance > 0
      ? (economics.marginRequired / balance) * 100
      : 100;

  if (
    marginPercent >
    GABY_AUTO_TRADE_CONFIG.maxMarginPercent
  ) {
    return {
      valid: false,
      reason: `Required margin exceeds the ${GABY_AUTO_TRADE_CONFIG.maxMarginPercent}% benchmark capital-allocation limit.`,
      priceEconomics,
      economics,
    };
  }

  if (
    economics.riskPercentWithFees >
    GABY_AUTO_TRADE_CONFIG.maxRiskPercent
  ) {
    return {
      valid: false,
      reason: "Trade exceeds benchmark maximum risk.",
      priceEconomics,
      economics,
    };
  }

  if (
    economics.liquidationPrice !== null &&
    (
      (decision.action === "LONG" &&
        decision.stopLoss <= economics.liquidationPrice) ||
      (decision.action === "SHORT" &&
        decision.stopLoss >= economics.liquidationPrice)
    )
  ) {

    return {
      valid: false,
      reason: "Stop Loss is beyond the Coinbase liquidation price.",
      priceEconomics,
      economics,
    };
  }

  if (
    economics.marginRequired +
      economics.estimatedEntryFee >
    balance
  ) {
    return {
      valid: false,
      reason:
        "Insufficient benchmark balance for required Coinbase margin plus entry fee.",
      priceEconomics,
      economics,
    };
  }

  return {
    valid: true,
    reason: "Valid pre-trade structure.",
    priceEconomics,
    economics,
  };

}

// ============================================================
// BENCHMARK POSITION
// ============================================================

export type GabyAutoTradePosition = {
  id: string;
  firestoreTradeId: string | null;

  symbol: string;
  side: "LONG" | "SHORT";

  contracts: number;
  quantity: number;
  positionSize: number;

  entryPrice: number;
  stopLoss: number;
  takeProfit: number;
  liquidationPrice: number | null;

  marginRequired: number;
  effectiveLeverage: number;
  marginSession: "INTRADAY" | "OVERNIGHT";

  entryFee: number;

  openedAt: string;
};

export function buildGabyAutoTradePosition(
  decision: GabyAutoTradeDecision,
  economics: any,
  symbol: string
): GabyAutoTradePosition | null {
  if (
    decision.action === "NO_TRADE" ||
    decision.entryPrice === null ||
    decision.stopLoss === null ||
    decision.takeProfit === null
  ) {
    return null;
  }

return {
  id: crypto.randomUUID(),
  firestoreTradeId: null,
  symbol,
    side: decision.action,

    contracts: economics.contracts,
    quantity: economics.quantity,
    positionSize: economics.positionSize,

    entryPrice: decision.entryPrice,
    stopLoss: decision.stopLoss,
    takeProfit: decision.takeProfit,
    liquidationPrice: economics.liquidationPrice,

    marginRequired: economics.marginRequired,
    effectiveLeverage: economics.effectiveLeverage,
    marginSession: economics.marginSession,

    entryFee: economics.estimatedEntryFee,

    openedAt: new Date().toISOString(),
  };
}

export type GabyAutoTradeAccount = {
  balance: number;
  marginUsed: number;
  openPosition: GabyAutoTradePosition | null;
};

export function createGabyAutoTradeAccount(): GabyAutoTradeAccount {
  return {
    balance: GABY_AUTO_TRADE_CONFIG.startingBalance,
    marginUsed: 0,
    openPosition: null,
  };
}

export function openGabyAutoTradePosition(
  account: GabyAutoTradeAccount,
  position: GabyAutoTradePosition
): GabyAutoTradeAccount {
  if (account.openPosition) {
    return account;
  }

  const totalRequired =
    position.marginRequired + position.entryFee;

  if (totalRequired > account.balance) {
    return account;
  }

  return {
    balance: account.balance - totalRequired,
    marginUsed: position.marginRequired,
    openPosition: position,
  };
}

export type GabyAutoTradeCloseReason =
  | "TAKE_PROFIT"
  | "STOP_LOSS"
  | "LIQUIDATION";

export type GabyAutoTradeClosedPosition = {
  position: GabyAutoTradePosition;

  exitPrice: number;
  exitFee: number;

  grossPnl: number;
  netPnl: number;

  reason: GabyAutoTradeCloseReason;
  closedAt: string;
};

export function getGabyAutoTradeCloseReason(
  position: GabyAutoTradePosition,
  currentPrice: number
): GabyAutoTradeCloseReason | null {
  if (position.side === "LONG") {
    if (
      position.liquidationPrice !== null &&
      currentPrice <= position.liquidationPrice
    ) {
      return "LIQUIDATION";
    }

    if (currentPrice <= position.stopLoss) {
      return "STOP_LOSS";
    }

    if (currentPrice >= position.takeProfit) {
      return "TAKE_PROFIT";
    }
  }

  if (position.side === "SHORT") {
    if (
      position.liquidationPrice !== null &&
      currentPrice >= position.liquidationPrice
    ) {
      return "LIQUIDATION";
    }

    if (currentPrice >= position.stopLoss) {
      return "STOP_LOSS";
    }

    if (currentPrice <= position.takeProfit) {
      return "TAKE_PROFIT";
    }
  }

  return null;
}

export function buildGabyAutoTradeClosedPosition(
  position: GabyAutoTradePosition,
  exitPrice: number,
  reason: GabyAutoTradeCloseReason
): GabyAutoTradeClosedPosition {
  const grossPnl =
    position.side === "LONG"
      ? (exitPrice - position.entryPrice) *
        position.quantity
      : (position.entryPrice - exitPrice) *
        position.quantity;

  const exitFee =
    position.positionSize * 0.001;

  const netPnl =
    grossPnl - position.entryFee - exitFee;

  return {
    position,

    exitPrice,
    exitFee,

    grossPnl,
    netPnl,

    reason,
    closedAt: new Date().toISOString(),
  };
}

export function closeGabyAutoTradePosition(
  account: GabyAutoTradeAccount,
  closedPosition: GabyAutoTradeClosedPosition
): GabyAutoTradeAccount {
  if (!account.openPosition) {
    return account;
  }

  const releasedMargin =
    account.openPosition.marginRequired;

  const returnedAmount =
    releasedMargin +
    closedPosition.grossPnl -
    closedPosition.exitFee;

  return {
    balance: account.balance + returnedAmount,
    marginUsed: 0,
    openPosition: null,
  };
}

export function monitorGabyAutoTradePosition(
  account: GabyAutoTradeAccount,
  currentPrice: number
) {
  const position = account.openPosition;

  if (!position) {
    return null;
  }

  const reason =
    getGabyAutoTradeCloseReason(
      position,
      currentPrice
    );

  if (!reason) {
    return null;
  }

  const closedPosition =
    buildGabyAutoTradeClosedPosition(
      position,
      currentPrice,
      reason
    );

  const updatedAccount =
    closeGabyAutoTradePosition(
      account,
      closedPosition
    );

  return {
    account: updatedAccount,
    closedPosition,
  };
}

// ============================================================
// PERFORMANCE
// ============================================================

export type GabyAutoTradePerformance = {
  totalTrades: number;
  wins: number;
  losses: number;
  netPnl: number;
  winRate: number;
};


// ============================================================
// EDUCATION METRICS
// ============================================================

export type GabyEducationMetrics = {
  trendAlignedTrades: number;
  strongEntries: number;
  disciplinedRiskTrades: number;
  noTradeDecisions: number;
};