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
};

export type MarketIntelligence = {
  structure: MarketStructure;
  nearestSupport: PriceZone | null;
  nearestResistance: PriceZone | null;
  supportLevels: PriceZone[];
  resistanceLevels: PriceZone[];
  patternAnalysis: PatternAnalysis | null;
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

export function getMarketIntelligence(candles: Candle[]): MarketIntelligence {
  function getPatternAnalysis(candles: Candle[]): PatternAnalysis | null {
  const highs = getSwingHighs(candles);
  const lows = getSwingLows(candles);

  if (highs.length < 2 || lows.length < 2) {
    return null;
  }

  const lastHigh = highs[highs.length - 1];
  const previousHigh = highs[highs.length - 2];

  const lastLow = lows[lows.length - 1];
  const previousLow = lows[lows.length - 2];

  if (lastLow > previousLow) {
    return {
      pattern: "HIGHER_LOW",
      summary:
        "Price is forming a higher low, which may indicate bearish momentum is weakening.",
    };
  }

  if (lastHigh < previousHigh) {
    return {
      pattern: "LOWER_HIGH",
      summary:
        "Price is forming a lower high, which may indicate buyers are losing strength.",
    };
  }

  return null;
}
  const recentCandles = candles;

  if (recentCandles.length < 20) {
return {
  structure: "RANGING",
  nearestSupport: null,
  nearestResistance: null,
  supportLevels: [],
  resistanceLevels: [],
  patternAnalysis: null,
};
  }

  const currentPrice = recentCandles[recentCandles.length - 1].close;

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

return {
  structure: getMarketStructure(recentCandles),
  nearestSupport,
  nearestResistance,
  supportLevels,
  resistanceLevels,
  patternAnalysis: getPatternAnalysis(recentCandles),
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