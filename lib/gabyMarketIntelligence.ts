export type Candle = {
  time: any;
  open: number;
  high: number;
  low: number;
  close: number;
  volume?: number;
};

export type MarketStructure =
  | "BULLISH"
  | "BEARISH"
  | "RANGING"
  | "HIGHER_HIGHS"
  | "LOWER_LOWS"
  | "TRANSITION";

  export type StructureAnalysis = {
  structure: MarketStructure;
  lastHigh: number | null;
  previousHigh: number | null;
  lastLow: number | null;
  previousLow: number | null;
  summary: string;
};

export type EntryQuality =
  | "EXCELLENT"
  | "GOOD"
  | "NEUTRAL"
  | "POOR";

export type PriceZone = {
  low: number;
  high: number;
  strength: number;
};

export type PatternAnalysis = {
  pattern: string;
  summary: string;
  bias:
    | "BULLISH_CONTEXT"
    | "BEARISH_CONTEXT"
    | "NEUTRAL_CONTEXT";
};

export type MomentumAnalysis = {
  momentum:
    | "BULLISH_MOMENTUM"
    | "BEARISH_MOMENTUM"
    | "WEAK_MOMENTUM";

  summary: string;
};

export type VolumeAnalysis = {
  volume:
    | "VOLUME_SPIKE"
    | "RISING_VOLUME"
    | "FALLING_VOLUME"
    | "LOW_VOLUME";

  summary: string;
};

export type RSIAnalysis = {
  rsi:
    | "RSI_OVERBOUGHT"
    | "RSI_OVERSOLD"
    | "RSI_BULLISH"
    | "RSI_BEARISH"
    | "RSI_NEUTRAL";

  value: number;
  summary: string;
};

export type MarketConviction =
  | "HIGH_CONVICTION_BULLISH"
  | "HIGH_CONVICTION_BEARISH"
  | "MIXED_CONDITIONS"
  | "LOW_CONVICTION";

export type MarketIntelligence = {
  direction: "BULLISH" | "BEARISH" | "TRANSITION";
  structure: MarketStructure;
  nearestSupport: PriceZone | null;
  nearestResistance: PriceZone | null;
  supportLevels: PriceZone[];
  resistanceLevels: PriceZone[];
  patternAnalysis: PatternAnalysis | null;
  momentumAnalysis: MomentumAnalysis | null;
  volumeAnalysis: VolumeAnalysis | null;
rsiAnalysis: RSIAnalysis | null;
marketConviction: MarketConviction;
};

export type TimeframeStructureMap = {
  "1M"?: MarketStructure;
  "5M"?: MarketStructure;
  "15M"?: MarketStructure;
  "1H"?: MarketStructure;
  "4H"?: MarketStructure;
  "1D"?: MarketStructure;
};

export type MultiTimeframeAnalysis = {
  shortTerm: MarketStructure;
  mediumTerm: MarketStructure;
  longTerm: MarketStructure;
  summary: string;
};

function getSwingHighs(candles: Candle[], lookback = 5) {
  const swings: number[] = [];

  for (let i = lookback; i < candles.length - lookback; i++) {
    const current = candles[i];

    const leftCandles = candles.slice(i - lookback, i);
    const rightCandles = candles.slice(i + 1, i + 1 + lookback);

    const isSwingHigh =
      leftCandles.every((candle) => current.high > candle.high) &&
      rightCandles.every((candle) => current.high > candle.high);

    if (isSwingHigh) {
      swings.push(current.high);
    }
  }

  return swings;
}

function getSwingLows(candles: Candle[], lookback = 5) {
  const swings: number[] = [];

  for (let i = lookback; i < candles.length - lookback; i++) {
    const current = candles[i];

    const leftCandles = candles.slice(i - lookback, i);
    const rightCandles = candles.slice(i + 1, i + 1 + lookback);

    const isSwingLow =
      leftCandles.every((candle) => current.low < candle.low) &&
      rightCandles.every((candle) => current.low < candle.low);

    if (isSwingLow) {
      swings.push(current.low);
    }
  }

  return swings;
}

function groupZones(levels: number[], tolerancePercent = 0.0015): PriceZone[] {
  const zones: PriceZone[] = [];

  levels.forEach((level) => {
    const existingZone = zones.find((zone) => {
      const midpoint = (zone.low + zone.high) / 2;
      const distancePercent = Math.abs(level - midpoint) / midpoint;

      return distancePercent <= tolerancePercent;
    });

    if (existingZone) {
      existingZone.low = Math.min(existingZone.low, level);
      existingZone.high = Math.max(existingZone.high, level);
      existingZone.strength += 1;
    } else {
      zones.push({
        low: level,
        high: level,
        strength: 1,
      });
    }
  });

  return zones;
}

function getMarketStructure(candles: Candle[]): MarketStructure {
  const recentCandles = candles.slice(-80);

  if (recentCandles.length < 30) {
    return "RANGING";
  }

  const firstClose = recentCandles[0].close;
  const lastClose = recentCandles[recentCandles.length - 1].close;

  const priceChangePercent =
    ((lastClose - firstClose) / firstClose) * 100;

  const firstHalf = recentCandles.slice(
    0,
    Math.floor(recentCandles.length / 2)
  );

  const secondHalf = recentCandles.slice(
    Math.floor(recentCandles.length / 2)
  );

  const firstHalfHigh = Math.max(...firstHalf.map((candle) => candle.high));
  const firstHalfLow = Math.min(...firstHalf.map((candle) => candle.low));

  const secondHalfHigh = Math.max(...secondHalf.map((candle) => candle.high));
  const secondHalfLow = Math.min(...secondHalf.map((candle) => candle.low));

  const makingHigherHighs = secondHalfHigh > firstHalfHigh;
  const makingHigherLows = secondHalfLow > firstHalfLow;

  const makingLowerHighs = secondHalfHigh < firstHalfHigh;
  const makingLowerLows = secondHalfLow < firstHalfLow;

  if (
    priceChangePercent > 1 &&
    (makingHigherHighs || makingHigherLows)
  ) {
    return "BULLISH";
  }

  if (
    priceChangePercent < -1 &&
    (makingLowerHighs || makingLowerLows)
  ) {
    return "BEARISH";
  }

  if (makingHigherHighs && makingHigherLows) {
    return "BULLISH";
  }

  if (makingLowerHighs && makingLowerLows) {
    return "BEARISH";
  }

  return "RANGING";
}

function getDominantStructure(
  structures: (MarketStructure | undefined)[]
): MarketStructure {
  const validStructures = structures.filter(Boolean) as MarketStructure[];

  const bullishCount = validStructures.filter(
    (structure) => structure === "BULLISH"
  ).length;

  const bearishCount = validStructures.filter(
    (structure) => structure === "BEARISH"
  ).length;

  if (bullishCount > bearishCount) return "BULLISH";
  if (bearishCount > bullishCount) return "BEARISH";

  return "RANGING";
}

function getMomentumAnalysis(candles: Candle[]): MomentumAnalysis | null {
  if (candles.length < 25) return null;

  const recentCandles = candles.slice(-10);
  const previousCandles = candles.slice(-20, -10);

  const recentClose = recentCandles[recentCandles.length - 1].close;
  const previousClose = previousCandles[previousCandles.length - 1].close;

  const recentAvgClose =
    recentCandles.reduce((sum, candle) => sum + candle.close, 0) /
    recentCandles.length;

  const previousAvgClose =
    previousCandles.reduce((sum, candle) => sum + candle.close, 0) /
    previousCandles.length;

  if (recentClose > previousClose && recentAvgClose > previousAvgClose) {
    return {
      momentum: "BULLISH_MOMENTUM",
      summary:
        "Momentum is leaning bullish because recent closes are strengthening.",
    };
  }

  if (recentClose < previousClose && recentAvgClose < previousAvgClose) {
    return {
      momentum: "BEARISH_MOMENTUM",
      summary:
        "Momentum is leaning bearish because recent closes are weakening.",
    };
  }

  return {
    momentum: "WEAK_MOMENTUM",
    summary:
      "Momentum is weak because recent closes are mixed.",
  };
}

function getVolumeAnalysis(candles: Candle[]): VolumeAnalysis | null {
  if (candles.length < 30) return null;

  const recentCandles = candles.slice(-10);
  const previousCandles = candles.slice(-30, -10);

  const recentVolume =
    recentCandles.reduce((sum, candle) => sum + (candle.volume ?? 0), 0) /
    recentCandles.length;

  const previousVolume =
    previousCandles.reduce((sum, candle) => sum + (candle.volume ?? 0), 0) /
    previousCandles.length;

  const latestVolume =
    candles[candles.length - 1].volume ?? 0;

  if (previousVolume === 0) return null;

  if (latestVolume > previousVolume * 2) {
    return {
      volume: "VOLUME_SPIKE",
      summary:
        "Volume is spiking compared to recent candles, which may indicate stronger market participation.",
    };
  }

  if (recentVolume > previousVolume * 1.2) {
    return {
      volume: "RISING_VOLUME",
      summary:
        "Volume is rising, which may indicate stronger participation behind the recent move.",
    };
  }

  if (recentVolume < previousVolume * 0.8) {
    return {
      volume: "FALLING_VOLUME",
      summary:
        "Volume is falling, which may indicate weaker participation behind the recent move.",
    };
  }

  return {
    volume: "LOW_VOLUME",
    summary:
      "Volume is normal to low, which may indicate limited participation right now.",
  };
}

function calculateRSI(candles: Candle[], period = 14): number {
  if (candles.length <= period) return 50;

  const recentCandles = candles.slice(-period - 1);

  let gains = 0;
  let losses = 0;

  for (let i = 1; i < recentCandles.length; i++) {
    const change =
      recentCandles[i].close - recentCandles[i - 1].close;

    if (change > 0) {
      gains += change;
    } else if (change < 0) {
      losses += Math.abs(change);
    }
  }

  const averageGain = gains / period;
  const averageLoss = losses / period;

  if (averageLoss === 0) return 100;
  if (averageGain === 0) return 0;

  const rs = averageGain / averageLoss;
  const rsi = 100 - 100 / (1 + rs);

  return Number(rsi.toFixed(2));
}

function getRSIAnalysis(candles: Candle[]): RSIAnalysis | null {
  if (candles.length < 15) return null;

  const value = calculateRSI(candles);

  if (value >= 70) {
    return {
      rsi: "RSI_OVERBOUGHT",
      value,
      summary:
        "RSI is overbought. Price may be extended, but this is not a sell signal.",
    };
  }

  if (value <= 30) {
    return {
      rsi: "RSI_OVERSOLD",
      value,
      summary:
        "RSI is oversold. Price may be stretched lower, but this is not a buy signal.",
    };
  }

  if (value >= 55) {
    return {
      rsi: "RSI_BULLISH",
      value,
      summary:
        "RSI shows bullish pressure, but direction still comes first.",
    };
  }

  if (value <= 45) {
    return {
      rsi: "RSI_BEARISH",
      value,
      summary:
        "RSI shows bearish pressure, but direction still comes first.",
    };
  }

  return {
    rsi: "RSI_NEUTRAL",
    value,
    summary:
      "RSI is neutral and does not show strong pressure right now.",
  };
}

function getMarketConviction(
  direction: "BULLISH" | "BEARISH" | "TRANSITION",
  structure: MarketStructure,
  momentum: MomentumAnalysis | null,
  volume: VolumeAnalysis | null,
  rsi: RSIAnalysis | null
): MarketConviction {
  let bullishScore = 0;
  let bearishScore = 0;

  if (direction === "BULLISH") bullishScore += 3;
  if (direction === "BEARISH") bearishScore += 3;

  if (
    structure === "BULLISH" ||
    structure === "HIGHER_HIGHS"
  ) {
    bullishScore += 2;
  }

  if (
    structure === "BEARISH" ||
    structure === "LOWER_LOWS"
  ) {
    bearishScore += 2;
  }

  if (momentum?.momentum === "BULLISH_MOMENTUM")
    bullishScore += 2;

  if (momentum?.momentum === "BEARISH_MOMENTUM")
    bearishScore += 2;

  if (
    volume?.volume === "RISING_VOLUME" ||
    volume?.volume === "VOLUME_SPIKE"
  ) {
    bullishScore += 1;
    bearishScore += 1;
  }

  if (
    rsi?.rsi === "RSI_BULLISH" ||
    rsi?.rsi === "RSI_OVERSOLD"
  ) {
    bullishScore += 1;
  }

  if (
    rsi?.rsi === "RSI_BEARISH" ||
    rsi?.rsi === "RSI_OVERBOUGHT"
  ) {
    bearishScore += 1;
  }

  const difference =
    Math.abs(bullishScore - bearishScore);

  if (bullishScore >= 7 && difference >= 3) {
    return "HIGH_CONVICTION_BULLISH";
  }

  if (bearishScore >= 7 && difference >= 3) {
    return "HIGH_CONVICTION_BEARISH";
  }

  if (difference <= 1) {
    return "MIXED_CONDITIONS";
  }

  return "LOW_CONVICTION";
}

export function getMarketIntelligence(candles: Candle[]): MarketIntelligence {
function getPatternAnalysis(
  candles: Candle[],
  nearestSupport: PriceZone | null,
  nearestResistance: PriceZone | null
): PatternAnalysis | null {
  if (candles.length < 40) return null;

  const currentCandle = candles[candles.length - 1];
  const previousCandle = candles[candles.length - 2];

  const currentPrice = currentCandle.close;

  const recentCandles = candles.slice(-20);
  const previousCandles = candles.slice(-40, -20);

  const recentHigh = Math.max(...recentCandles.map((c) => c.high));
  const recentLow = Math.min(...recentCandles.map((c) => c.low));

  const previousHigh = Math.max(...previousCandles.map((c) => c.high));
  const previousLow = Math.min(...previousCandles.map((c) => c.low));

  const supportMidpoint = nearestSupport
    ? (nearestSupport.low + nearestSupport.high) / 2
    : null;

  const resistanceMidpoint = nearestResistance
    ? (nearestResistance.low + nearestResistance.high) / 2
    : null;

  const nearSupport =
    supportMidpoint !== null &&
    Math.abs(currentPrice - supportMidpoint) / supportMidpoint <= 0.003;

  const nearResistance =
    resistanceMidpoint !== null &&
    Math.abs(currentPrice - resistanceMidpoint) / resistanceMidpoint <= 0.003;

  if (
    nearestSupport &&
    previousCandle.low <= nearestSupport.high &&
    currentCandle.close > nearestSupport.high &&
    currentCandle.close > currentCandle.open
  ) {
    return {
      pattern: "SUPPORT_HOLDING",
      bias: "BULLISH_CONTEXT",
      summary:
        "Price is holding support, which may indicate buyers are defending that area.",
    };
  }

  if (
    nearestResistance &&
    previousCandle.high >= nearestResistance.low &&
    currentCandle.close < nearestResistance.low &&
    currentCandle.close < currentCandle.open
  ) {
    return {
      pattern: "RESISTANCE_HOLDING",
      bias: "BEARISH_CONTEXT",
      summary:
        "Price is rejecting resistance, which may indicate sellers are defending that area.",
    };
  }

  if (
    nearestSupport &&
    currentCandle.close < nearestSupport.low
  ) {
    return {
      pattern: "SUPPORT_BREAKING",
      bias: "BEARISH_CONTEXT",
      summary:
        "Price is breaking below support, which may suggest bearish pressure is increasing.",
    };
  }

  if (
    nearestResistance &&
    currentCandle.close > nearestResistance.high
  ) {
    return {
      pattern: "RESISTANCE_BREAKING",
      bias: "BULLISH_CONTEXT",
      summary:
        "Price is breaking above resistance, which may suggest bullish pressure is increasing.",
    };
  }

  if (
    nearestSupport &&
    currentPrice > nearestSupport.high &&
    nearSupport &&
    currentCandle.close > currentCandle.open
  ) {
    return {
      pattern: "BULLISH_BREAKOUT_RETEST",
      bias: "BULLISH_CONTEXT",
      summary:
        "Price broke above resistance and is retesting that area as support, which may suggest improving bullish structure.",
    };
  }

  if (
    nearestResistance &&
    currentPrice < nearestResistance.low &&
    nearResistance &&
    currentCandle.close < currentCandle.open
  ) {
    return {
      pattern: "BEARISH_BREAKOUT_RETEST",
      bias: "BEARISH_CONTEXT",
      summary:
        "Price broke below support and is retesting that area as resistance, which may suggest improving bearish structure.",
    };
  }

const lowTolerance =
  previousLow > 0
    ? Math.abs(recentLow - previousLow) / previousLow
    : 1;

const firstThird = candles.slice(-60, -40);
const middleThird = candles.slice(-40, -20);
const lastThird = candles.slice(-20);

const firstAvgClose =
  firstThird.reduce((sum, c) => sum + c.close, 0) / firstThird.length;

const middleAvgClose =
  middleThird.reduce((sum, c) => sum + c.close, 0) / middleThird.length;

const lastAvgClose =
  lastThird.reduce((sum, c) => sum + c.close, 0) / lastThird.length;

if (
  firstThird.length &&
  middleThird.length &&
  lastThird.length &&
  middleAvgClose < firstAvgClose &&
  lastAvgClose > middleAvgClose &&
  currentPrice > middleAvgClose
) {
  return {
    pattern: "ROUNDED_BOTTOM",
    bias: "BULLISH_CONTEXT",
    summary:
      "Price is forming a rounded bottom, which may indicate selling pressure is weakening.",
  };
}

if (
  firstThird.length &&
  middleThird.length &&
  lastThird.length &&
  middleAvgClose > firstAvgClose &&
  lastAvgClose < middleAvgClose &&
  currentPrice < middleAvgClose
) {
  return {
    pattern: "ROUNDED_TOP",
    bias: "BEARISH_CONTEXT",
    summary:
      "Price is forming a rounded top, which may indicate buying pressure is weakening.",
  };
}

const recentHighTolerance =
  previousHigh > 0
    ? Math.abs(recentHigh - previousHigh) / previousHigh
    : 1;

const recentLowRising =
  recentLow > previousLow;

const recentHighFalling =
  recentHigh < previousHigh;

const recentLowTolerance =
  previousLow > 0
    ? Math.abs(recentLow - previousLow) / previousLow
    : 1;

if (
  recentHighTolerance <= 0.004 &&
  recentLowRising
) {
  return {
    pattern: "ASCENDING_TRIANGLE",
    bias: "BULLISH_CONTEXT",
    summary:
      "Price is forming equal highs with rising lows, which may suggest buyers are applying pressure near resistance.",
  };
}

if (
  recentLowTolerance <= 0.004 &&
  recentHighFalling
) {
  return {
    pattern: "DESCENDING_TRIANGLE",
    bias: "BEARISH_CONTEXT",
    summary:
      "Price is forming equal lows with falling highs, which may suggest sellers are applying pressure near support.",
  };
}

const highTolerance =
  previousHigh > 0
    ? Math.abs(recentHigh - previousHigh) / previousHigh
    : 1;

if (
  lowTolerance <= 0.004 &&
  currentPrice > recentLow
) {
  return {
    pattern: "DOUBLE_BOTTOM_ATTEMPT",
    bias: "BULLISH_CONTEXT",
    summary:
      "Price is revisiting a previous support area, which may suggest a double bottom attempt.",
  };
}

if (
  highTolerance <= 0.004 &&
  currentPrice < recentHigh
) {
  return {
    pattern: "DOUBLE_TOP_ATTEMPT",
    bias: "BEARISH_CONTEXT",
    summary:
      "Price is revisiting a previous resistance area, which may suggest a double top attempt.",
  };
}

  if (recentHigh > previousHigh && recentLow > previousLow) {
    return {
      pattern: "HIGHER_HIGH_HIGHER_LOW",
      bias: "BULLISH_CONTEXT",
      summary:
        "Price is forming higher highs and higher lows, which may suggest improving bullish structure.",
    };
  }

  if (recentHigh < previousHigh && recentLow < previousLow) {
    return {
      pattern: "LOWER_HIGH_LOWER_LOW",
      bias: "BEARISH_CONTEXT",
      summary:
        "Price is forming lower highs and lower lows, which may suggest bearish structure is strengthening.",
    };
  }

  return null;
}
  const recentCandles = candles;

  if (recentCandles.length < 20) {
return {
  direction: "TRANSITION",
  structure: "RANGING",
  nearestSupport: null,
  nearestResistance: null,
  supportLevels: [],
  resistanceLevels: [],
  patternAnalysis: null,
  momentumAnalysis: null,
  volumeAnalysis: null,
  rsiAnalysis: null,
  marketConviction: "LOW_CONVICTION",
};
  }

  const currentPrice = recentCandles[recentCandles.length - 1].close;

const direction =
  getMADirection(recentCandles).direction;

  const supportZones = groupZones(getSwingLows(recentCandles));
  const resistanceZones = groupZones(getSwingHighs(recentCandles));

const supportLevels = supportZones
  .filter((zone) => zone.high < currentPrice)
  .sort((a, b) => b.high - a.high);

const resistanceLevels = resistanceZones
  .filter((zone) => zone.low > currentPrice)
  .sort((a, b) => a.low - b.low);

const nearestSupport = supportLevels[0] ?? null;
const nearestResistance = resistanceLevels[0] ?? null;

const structure = getMarketStructure(recentCandles);
const momentumAnalysis = getMomentumAnalysis(recentCandles);
const volumeAnalysis = getVolumeAnalysis(recentCandles);
const rsiAnalysis = getRSIAnalysis(recentCandles);

return {
  direction,
  structure,
  nearestSupport,
  nearestResistance,
  supportLevels,
  resistanceLevels,
  patternAnalysis: getPatternAnalysis(
    recentCandles,
    nearestSupport,
    nearestResistance
  ),
  momentumAnalysis,
  volumeAnalysis,
  rsiAnalysis,
  marketConviction: getMarketConviction(
    direction,
    structure,
    momentumAnalysis,
    volumeAnalysis,
    rsiAnalysis
  ),
};
}

export function getMultiTimeframeAnalysis(
  timeframeStructures: TimeframeStructureMap
): MultiTimeframeAnalysis {
  const shortTerm = getDominantStructure([
    timeframeStructures["1M"],
    timeframeStructures["5M"],
    timeframeStructures["15M"],
  ]);

  const mediumTerm = getDominantStructure([
    timeframeStructures["1H"],
    timeframeStructures["4H"],
  ]);

  const longTerm = timeframeStructures["1D"] ?? "RANGING";

  let summary = "The market is mixed across timeframes.";

  if (
    shortTerm === "BULLISH" &&
    mediumTerm === "BULLISH" &&
    longTerm === "BULLISH"
  ) {
    summary =
      "The market is bullish across short-term, medium-term, and long-term timeframes.";
  } else if (
    shortTerm === "BEARISH" &&
    mediumTerm === "BEARISH" &&
    longTerm === "BEARISH"
  ) {
    summary =
      "The market is bearish across short-term, medium-term, and long-term timeframes.";
  } else if (
    shortTerm === "BULLISH" &&
    longTerm === "BEARISH"
  ) {
    summary =
      "The short-term trend is bullish, but the higher timeframe trend is still bearish.";
  } else if (
    shortTerm === "BEARISH" &&
    longTerm === "BULLISH"
  ) {
    summary =
      "The short-term trend is bearish, but the higher timeframe trend is still bullish.";
  } else if (
    shortTerm === "BULLISH" &&
    mediumTerm === "BULLISH"
  ) {
    summary =
      "The short-term and medium-term trends are bullish.";
  } else if (
    shortTerm === "BEARISH" &&
    mediumTerm === "BEARISH"
  ) {
    summary =
      "The short-term and medium-term trends are bearish.";
  }

  return {
    shortTerm,
    mediumTerm,
    longTerm,
    summary,
  };
}

export function isPriceNearZone(
  price: number,
  zone: PriceZone | null,
  tolerancePercent = 0.0015
) {
  if (!zone) return false;

  const zoneMidpoint =
    (zone.low + zone.high) / 2;

  const distancePercent =
    Math.abs(price - zoneMidpoint) /
    zoneMidpoint;

  return distancePercent <= tolerancePercent;
}

export type PriceLocation =
  | "NEAR_SUPPORT"
  | "NEAR_RESISTANCE"
  | "BETWEEN_ZONES";

export function getPriceLocation(
  price: number,
  support: PriceZone | null,
  resistance: PriceZone | null
): PriceLocation {
  if (isPriceNearZone(price, support, 0.003)) {
    return "NEAR_SUPPORT";
  }

  if (isPriceNearZone(price, resistance, 0.003)) {
    return "NEAR_RESISTANCE";
  }

  return "BETWEEN_ZONES";
}

export function getEntryQuality(
  entryPrice: number,
  support: PriceZone | null,
  resistance: PriceZone | null,
  direction: "BULLISH" | "BEARISH" | "TRANSITION"
): EntryQuality {
  const nearSupport = isPriceNearZone(
    entryPrice,
    support,
    0.003
  );

  const nearResistance = isPriceNearZone(
    entryPrice,
    resistance,
    0.003
  );

  if (
    direction === "BULLISH" &&
    nearSupport
  ) {
    return "EXCELLENT";
  }

  if (
    direction === "BEARISH" &&
    nearResistance
  ) {
    return "EXCELLENT";
  }

  if (nearSupport || nearResistance) {
    return "GOOD";
  }

  if (direction === "TRANSITION") {
    return "NEUTRAL";
  }

  return "POOR";
}

export type MovingAverageAnalysis = {
  ma7: number | null;
  ma25: number | null;
  ma99: number | null;
  direction: "BULLISH" | "BEARISH" | "TRANSITION";
  summary: string;
};

export function calculateSMA(candles: Candle[], period: number) {
  if (candles.length < period) return null;

  const recentCandles = candles.slice(-period);

  const total = recentCandles.reduce(
    (sum, candle) => sum + candle.close,
    0
  );

  return total / period;
}

export function getMovingAverageAnalysis(
  candles: Candle[]
): MovingAverageAnalysis {
  const ma7 = calculateSMA(candles, 7);
  const ma25 = calculateSMA(candles, 25);
  const ma99 = calculateSMA(candles, 99);

  let direction: MovingAverageAnalysis["direction"] = "TRANSITION";

  if (ma7 && ma25 && ma99) {
    if (ma7 > ma25 && ma25 > ma99) {
      direction = "BULLISH";
    } else if (ma7 < ma25 && ma25 < ma99) {
      direction = "BEARISH";
    }
  }

  let summary = "The moving averages are not fully aligned right now.";

  if (direction === "BULLISH") {
    summary =
      "The 7 MA is above the 25 MA, and the 25 MA is above the 99 MA. Direction is bullish.";
  } else if (direction === "BEARISH") {
    summary =
      "The 7 MA is below the 25 MA, and the 25 MA is below the 99 MA. Direction is bearish.";
  }

  return {
    ma7,
    ma25,
    ma99,
    direction,
    summary,
  };
}

export function getMADirection(candles: Candle[]) {
  const ma = getMovingAverageAnalysis(candles);

  return {
    direction: ma.direction,
    ma7: ma.ma7,
    ma25: ma.ma25,
    ma99: ma.ma99,
    summary: ma.summary,
  };
}

export function getStructureAnalysis(
  candles: Candle[]
): StructureAnalysis {
  const highs = getSwingHighs(candles);
  const lows = getSwingLows(candles);

  if (highs.length < 2 || lows.length < 2) {
    return {
      structure: "RANGING",
      lastHigh: null,
      previousHigh: null,
      lastLow: null,
      previousLow: null,
      summary: "Not enough swing data.",
    };
  }

  const lastHigh = highs[highs.length - 1];
  const previousHigh = highs[highs.length - 2];

  const lastLow = lows[lows.length - 1];
  const previousLow = lows[lows.length - 2];

  const higherHigh =
    lastHigh > previousHigh;

  const higherLow =
    lastLow > previousLow;

  const lowerHigh =
    lastHigh < previousHigh;

  const lowerLow =
    lastLow < previousLow;

  if (higherHigh && higherLow) {
    return {
      structure: "HIGHER_HIGHS",
      lastHigh,
      previousHigh,
      lastLow,
      previousLow,
      summary:
        "Market is creating higher highs and higher lows.",
    };
  }

  if (lowerHigh && lowerLow) {
    return {
      structure: "LOWER_LOWS",
      lastHigh,
      previousHigh,
      lastLow,
      previousLow,
      summary:
        "Market is creating lower highs and lower lows.",
    };
  }


  return {
    structure: "TRANSITION",
    lastHigh,
    previousHigh,
    lastLow,
    previousLow,
    summary:
      "Market structure is mixed.",
  };
}