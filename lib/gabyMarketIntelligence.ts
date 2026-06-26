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

export type MAStructureExtension =
  | "LOW"
  | "MODERATE"
  | "HIGH"
  | "EXTREME_UPSIDE"
  | "EXTREME_DOWNSIDE";

export type FallForce =
  | "WEAK"
  | "NORMAL"
  | "STRONG"
  | "EXTREME";

export type BouncePressure =
  | "LOW"
  | "MODERATE"
  | "ELEVATED"
  | "HIGH";

export type MomentumStage =
  | "EARLY_BREAKOUT"
  | "EARLY_BREAKDOWN"
  | "HEALTHY_CONTINUATION"
  | "LATE_NEAR_RESISTANCE"
  | "LATE_NEAR_SUPPORT"
  | "EXHAUSTED_AT_RESISTANCE"
  | "EXHAUSTED_AT_SUPPORT"
  | "NONE";

export type MarketState =
  | "BULLS_IN_CONTROL"
  | "BEARS_IN_CONTROL"
  | "TRANSITION";

export type ControlStrength =
  | "STRENGTHENING"
  | "STABLE"
  | "WEAKENING";

export type MoveCondition =
  | "FRESH"
  | "MATURE"
  | "STRETCHED"
  | "EXHAUSTED";

export type MarketIntelligence = {
  direction: "BULLISH" | "BEARISH" | "TRANSITION";
  structure: MarketStructure;
nearestSupport: PriceZone | null;
nextSupport: PriceZone | null;
nearestResistance: PriceZone | null;
nextResistance: PriceZone | null;
  supportLevels: PriceZone[];
  resistanceLevels: PriceZone[];
  patternAnalysis: PatternAnalysis | null;
  momentumAnalysis: MomentumAnalysis | null;
  volumeAnalysis: VolumeAnalysis | null;
rsiAnalysis: RSIAnalysis | null;
maStructureExtension: MAStructureExtension;
fallForce: FallForce;
bouncePressure: BouncePressure;
momentumStage: MomentumStage;

marketState: MarketState;
controlStrength: ControlStrength;
moveCondition: MoveCondition;

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
  status:
    | "ALIGNED"
    | "PARTIALLY_ALIGNED"
    | "CONFLICTING";

  primaryTimeframe: string;

  supportingTimeframes: string[];

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
  pattern: PatternAnalysis | null,
  momentum: MomentumAnalysis | null,
  volume: VolumeAnalysis | null,
  rsi: RSIAnalysis | null
): MarketConviction {
  let bullishScore = 0;
  let bearishScore = 0;

  if (direction === "BULLISH") bullishScore += 3;
  if (direction === "BEARISH") bearishScore += 3;

  if (structure === "BULLISH" || structure === "HIGHER_HIGHS") {
    bullishScore += 2;
  }

  if (structure === "BEARISH" || structure === "LOWER_LOWS") {
    bearishScore += 2;
  }

  if (pattern?.bias === "BULLISH_CONTEXT") {
    bullishScore += 2;
  }

  if (pattern?.bias === "BEARISH_CONTEXT") {
    bearishScore += 2;
  }

  if (momentum?.momentum === "BULLISH_MOMENTUM") bullishScore += 2;
  if (momentum?.momentum === "BEARISH_MOMENTUM") bearishScore += 2;

  if (
    volume?.volume === "RISING_VOLUME" ||
    volume?.volume === "VOLUME_SPIKE"
  ) {
    bullishScore += 1;
    bearishScore += 1;
  }

  if (rsi?.rsi === "RSI_BULLISH" || rsi?.rsi === "RSI_OVERSOLD") {
    bullishScore += 1;
  }

  if (rsi?.rsi === "RSI_BEARISH" || rsi?.rsi === "RSI_OVERBOUGHT") {
    bearishScore += 1;
  }

  const difference = Math.abs(bullishScore - bearishScore);

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
nextSupport: null,
nearestResistance: null,
nextResistance: null,
  supportLevels: [],
  resistanceLevels: [],
  patternAnalysis: null,
  momentumAnalysis: null,
  volumeAnalysis: null,
rsiAnalysis: null,
maStructureExtension: "LOW",
fallForce: "NORMAL",
bouncePressure: "LOW",
momentumStage: "NONE",
marketState: "TRANSITION",
controlStrength: "WEAKENING",
moveCondition: "FRESH",
marketConviction: "LOW_CONVICTION",
};
  }

  const currentPrice = recentCandles[recentCandles.length - 1].close;

const maDirection = getMADirection(recentCandles);

const direction = maDirection.direction;

const maStructureExtension =
  maDirection.ma7 && maDirection.ma25 && maDirection.ma99
    ? getMAStructureExtension(
        currentPrice,
        maDirection.ma7,
        maDirection.ma25,
        maDirection.ma99
      )
    : "LOW";

const fallForce = getFallForce(recentCandles);

  const supportZones = groupZones(getSwingLows(recentCandles));
  const resistanceZones = groupZones(getSwingHighs(recentCandles));

const supportLevels = supportZones
  .filter((zone) => zone.high < currentPrice)
  .sort((a, b) => b.high - a.high);

const resistanceLevels = resistanceZones
  .filter((zone) => zone.low > currentPrice)
  .sort((a, b) => a.low - b.low);

const nearestSupport = supportLevels[0] ?? null;
const nextSupport = supportLevels[1] ?? null;

const nearestResistance = resistanceLevels[0] ?? null;
const nextResistance = resistanceLevels[1] ?? null;

const structure = getMarketStructure(recentCandles);

const patternAnalysis = getPatternAnalysis(
  recentCandles,
  nearestSupport,
  nearestResistance
);

const momentumAnalysis = getMomentumAnalysis(recentCandles);

const volumeAnalysis = getVolumeAnalysis(recentCandles);

const rsiAnalysis = getRSIAnalysis(recentCandles);

const bouncePressure = getBouncePressure(
  maStructureExtension,
  fallForce,
  rsiAnalysis,
  nearestSupport,
  currentPrice
);

const momentumStage = getMomentumStage(
  momentumAnalysis,
  patternAnalysis,
  nearestSupport,
  nearestResistance,
  currentPrice,
  maStructureExtension,
  bouncePressure
);

const marketState = getMarketState(
  direction,
  structure
);

const controlStrength = getControlStrength(
  momentumAnalysis,
  volumeAnalysis,
  fallForce
);

const moveCondition = getMoveCondition(
  maStructureExtension,
  bouncePressure,
  momentumStage
);

return {
  direction,
  structure,
nearestSupport,
nextSupport,
nearestResistance,
nextResistance,
supportLevels,
resistanceLevels,
  patternAnalysis,
  momentumAnalysis,
  volumeAnalysis,
  rsiAnalysis,
maStructureExtension,
fallForce,
bouncePressure,
momentumStage,
marketState,
controlStrength,
moveCondition,
marketConviction: getMarketConviction(
  direction,
  structure,
  patternAnalysis,
  momentumAnalysis,
  volumeAnalysis,
  rsiAnalysis
),
};
}

export function getMultiTimeframeAnalysis(
  timeframeData: Record<string, any>,
  selectedTimeframe: string
): MultiTimeframeAnalysis {
  const contextMap: Record<
    string,
    string[]
  > = {
    "1M": ["5M", "15M"],
    "5M": ["1M", "15M"],
    "15M": ["5M", "1H"],
    "1H": ["15M", "4H"],
    "4H": ["1H", "1D"],
    "1D": ["4H"],
  };

  const primary =
    timeframeData[selectedTimeframe];

  if (!primary) {
    return {
      status: "CONFLICTING",
      primaryTimeframe: selectedTimeframe,
      supportingTimeframes: [],
      summary:
        "Not enough timeframe data yet.",
    };
  }

  const supporting =
    contextMap[selectedTimeframe] || [];

let alignedScore = 0;
let conflictingScore = 0;
let checkedTimeframes = 0;

supporting.forEach((tf) => {
  const data = timeframeData[tf];

  if (!data) return;

  checkedTimeframes++;

  // Direction is most important
  if (data.direction === primary.direction) {
    alignedScore += 3;
  } else {
    conflictingScore += 3;
  }

  // Momentum confirms or weakens alignment
  if (
    data.momentum &&
    primary.momentum &&
    data.momentum === primary.momentum
  ) {
    alignedScore += 2;
  } else if (
    data.momentum &&
    primary.momentum &&
    data.momentum !== primary.momentum
  ) {
    conflictingScore += 2;
  }

  // Conviction adds smaller confirmation
  if (
    data.conviction &&
    primary.conviction &&
    data.conviction === primary.conviction
  ) {
    alignedScore += 1;
  } else if (
    data.conviction &&
    primary.conviction &&
    data.conviction !== primary.conviction
  ) {
    conflictingScore += 1;
  }
});

  let status:
    | "ALIGNED"
    | "PARTIALLY_ALIGNED"
    | "CONFLICTING";

if (checkedTimeframes === 0) {
  status = "CONFLICTING";
} else if (alignedScore >= conflictingScore + 4) {
  status = "ALIGNED";
} else if (alignedScore > conflictingScore) {
  status = "PARTIALLY_ALIGNED";
} else {
  status = "CONFLICTING";
}
  let summary =
    "Nearby timeframes are mixed.";

  if (status === "ALIGNED") {
    summary =
      "Nearby timeframes support the current timeframe direction.";
  }

  if (status === "PARTIALLY_ALIGNED") {
    summary =
      "Some nearby timeframes support the current direction while others disagree.";
  }

  if (status === "CONFLICTING") {
    summary =
      "Nearby timeframes are opposing the current timeframe direction.";
  }

  return {
    status,
    primaryTimeframe: selectedTimeframe,
    supportingTimeframes: supporting,
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

function percentDistance(price: number, ma: number) {
  if (!ma || ma <= 0) return 0;
  return ((price - ma) / ma) * 100;
}

export function getMAStructureExtension(
  price: number,
  ma7: number,
  ma25: number,
  ma99: number
): MAStructureExtension {
  const distances = [
    percentDistance(price, ma7),
    percentDistance(price, ma25),
    percentDistance(price, ma99),
  ];

  const averageDistance =
    distances.reduce((sum, value) => sum + Math.abs(value), 0) /
    distances.length;

  const aboveAll = price > ma7 && price > ma25 && price > ma99;
  const belowAll = price < ma7 && price < ma25 && price < ma99;

  if (belowAll && averageDistance >= 2.5) return "EXTREME_DOWNSIDE";
  if (aboveAll && averageDistance >= 2.5) return "EXTREME_UPSIDE";
  if (averageDistance >= 1.5) return "HIGH";
  if (averageDistance >= 0.75) return "MODERATE";

  return "LOW";
}

export function getFallForce(candles: Candle[]): FallForce {
  if (candles.length < 10) return "NORMAL";

  const recent = candles.slice(-8);

  const firstClose = recent[0].close;
  const lastClose = recent[recent.length - 1].close;

  const movePercent = ((lastClose - firstClose) / firstClose) * 100;

  let bearishCandles = 0;

  recent.forEach((candle) => {
    if (candle.close < candle.open) {
      bearishCandles++;
    }
  });

  const bearishRatio = bearishCandles / recent.length;

  if (movePercent <= -2.5 && bearishRatio >= 0.75) return "EXTREME";
  if (movePercent <= -1.5 && bearishRatio >= 0.6) return "STRONG";
  if (movePercent <= -0.75) return "NORMAL";

  return "WEAK";
}

export function getBouncePressure(
  maStructureExtension: MAStructureExtension,
  fallForce: FallForce,
  rsi: RSIAnalysis | null,
  nearestSupport: PriceZone | null,
  currentPrice: number
): BouncePressure {
  let score = 0;

  if (maStructureExtension === "EXTREME_DOWNSIDE") score += 3;
  if (maStructureExtension === "HIGH") score += 2;
  if (maStructureExtension === "MODERATE") score += 1;

  if (fallForce === "EXTREME") score += 3;
  if (fallForce === "STRONG") score += 2;
  if (fallForce === "NORMAL") score += 1;

  if (rsi?.rsi === "RSI_OVERSOLD") score += 2;

  if (
    nearestSupport &&
    currentPrice > nearestSupport.low &&
    currentPrice <= nearestSupport.high * 1.003
  ) {
    score += 2;
  }

  if (score >= 7) return "HIGH";
  if (score >= 5) return "ELEVATED";
  if (score >= 3) return "MODERATE";

  return "LOW";
}

export function getMomentumStage(
  momentum: MomentumAnalysis | null,
  pattern: PatternAnalysis | null,
  nearestSupport: PriceZone | null,
  nearestResistance: PriceZone | null,
  currentPrice: number,
  maStructureExtension: MAStructureExtension,
  bouncePressure: BouncePressure
): MomentumStage {
  const nearSupport = isPriceNearZone(
    currentPrice,
    nearestSupport,
    0.003
  );

  const nearResistance = isPriceNearZone(
    currentPrice,
    nearestResistance,
    0.003
  );

  if (
    momentum?.momentum === "BULLISH_MOMENTUM" &&
    pattern?.pattern === "RESISTANCE_BREAKING"
  ) {
    return "EARLY_BREAKOUT";
  }

  if (
    momentum?.momentum === "BEARISH_MOMENTUM" &&
    pattern?.pattern === "SUPPORT_BREAKING"
  ) {
    return "EARLY_BREAKDOWN";
  }

  if (
    momentum?.momentum === "BULLISH_MOMENTUM" &&
    nearResistance &&
    maStructureExtension === "EXTREME_UPSIDE"
  ) {
    return "EXHAUSTED_AT_RESISTANCE";
  }

  if (
    momentum?.momentum === "BEARISH_MOMENTUM" &&
    nearSupport &&
    bouncePressure === "HIGH"
  ) {
    return "EXHAUSTED_AT_SUPPORT";
  }

  if (
    momentum?.momentum === "BULLISH_MOMENTUM" &&
    nearResistance
  ) {
    return "LATE_NEAR_RESISTANCE";
  }

  if (
    momentum?.momentum === "BEARISH_MOMENTUM" &&
    nearSupport
  ) {
    return "LATE_NEAR_SUPPORT";
  }

  if (
    momentum?.momentum === "BULLISH_MOMENTUM" ||
    momentum?.momentum === "BEARISH_MOMENTUM"
  ) {
    return "HEALTHY_CONTINUATION";
  }

  return "NONE";
}

export function getMarketState(
  direction: "BULLISH" | "BEARISH" | "TRANSITION",
  structure: MarketStructure
): MarketState {
  if (
    direction === "BULLISH" &&
    (structure === "BULLISH" || structure === "HIGHER_HIGHS")
  ) {
    return "BULLS_IN_CONTROL";
  }

  if (
    direction === "BEARISH" &&
    (structure === "BEARISH" || structure === "LOWER_LOWS")
  ) {
    return "BEARS_IN_CONTROL";
  }

  return "TRANSITION";
}

export function getControlStrength(
  momentum: MomentumAnalysis | null,
  volume: VolumeAnalysis | null,
  fallForce: FallForce
): ControlStrength {
  let score = 0;

  if (
    momentum?.momentum === "BULLISH_MOMENTUM" ||
    momentum?.momentum === "BEARISH_MOMENTUM"
  ) {
    score += 2;
  }

  if (
    volume?.volume === "RISING_VOLUME" ||
    volume?.volume === "VOLUME_SPIKE"
  ) {
    score += 1;
  }

  if (fallForce === "STRONG") score += 1;
  if (fallForce === "EXTREME") score += 2;

  if (score >= 4) return "STRENGTHENING";
  if (score >= 2) return "STABLE";

  return "WEAKENING";
}

export function getMoveCondition(
  extension: MAStructureExtension,
  bouncePressure: BouncePressure,
  momentumStage: MomentumStage
): MoveCondition {
  if (
    momentumStage === "EXHAUSTED_AT_RESISTANCE" ||
    momentumStage === "EXHAUSTED_AT_SUPPORT"
  ) {
    return "EXHAUSTED";
  }

  if (
    bouncePressure === "HIGH" ||
    extension === "EXTREME_DOWNSIDE" ||
    extension === "EXTREME_UPSIDE"
  ) {
    return "STRETCHED";
  }

  if (
    momentumStage === "LATE_NEAR_RESISTANCE" ||
    momentumStage === "LATE_NEAR_SUPPORT"
  ) {
    return "MATURE";
  }

  return "FRESH";
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

function zonePrice(zone: PriceZone | null) {
  if (!zone) return null;

  const midpoint = (zone.low + zone.high) / 2;

  return Number(midpoint.toFixed(0));
}

export function buildMarketAnalysisSummary(
  market: MarketIntelligence,
  selectedTimeframe: string,
  selectedCoin: string
): string {
  const timeframe = selectedTimeframe || "1M";
  const coin = selectedCoin || "the selected market";

  const nearestSupport = zonePrice(market.nearestSupport);
  const nextSupport = zonePrice(market.nextSupport);
  const nearestResistance = zonePrice(market.nearestResistance);
  const nextResistance = zonePrice(market.nextResistance);

  let summary = "";

  if (market.marketState === "BEARS_IN_CONTROL") {
    summary += `On the ${timeframe} chart, sellers remain in control of ${coin}. `;
  } else if (market.marketState === "BULLS_IN_CONTROL") {
    summary += `On the ${timeframe} chart, buyers remain in control of ${coin}. `;
  } else {
    summary += `On the ${timeframe} chart, ${coin} is currently in transition because neither buyers nor sellers have clear control. `;
  }

  if (market.controlStrength === "STRENGTHENING") {
    summary += `Control is strengthening, `;
  } else if (market.controlStrength === "STABLE") {
    summary += `Control is stable, `;
  } else {
    summary += `Control is weakening, `;
  }

  if (market.moveCondition === "FRESH") {
    summary += `and the current move still appears fresh rather than mature. `;
  } else if (market.moveCondition === "MATURE") {
    summary += `and the current move is becoming mature rather than fresh. `;
  } else if (market.moveCondition === "STRETCHED") {
    summary += `and the move appears stretched rather than fresh. `;
  } else {
    summary += `and the move is showing signs of exhaustion. `;
  }

  if (market.momentumAnalysis?.momentum === "BULLISH_MOMENTUM") {
    summary += `Bullish momentum is present, but it should be weighed against the broader market condition. `;
  }

  if (market.momentumAnalysis?.momentum === "BEARISH_MOMENTUM") {
    summary += `Bearish momentum is present and supports the current downside pressure. `;
  }

  if (market.marketState === "BEARS_IN_CONTROL") {
    if (nearestSupport && nearestResistance) {
      summary += `Price is trading between support near ${nearestSupport} and resistance near ${nearestResistance}. `;
    }

    if (nearestResistance) {
      summary += `As long as price remains below ${nearestResistance}, the current bearish market condition remains intact. `;
    }

    if (nearestSupport) {
      summary += `If price breaks below ${nearestSupport}, bearish control would strengthen. `;
    }

    if (nextSupport) {
      summary += `The next important support is around ${nextSupport}. `;
    }

    if (nearestResistance) {
      summary += `If buyers reclaim ${nearestResistance}, the current bearish read would begin to weaken, but that alone would not confirm bullish control.`;
    }
  }

  if (market.marketState === "BULLS_IN_CONTROL") {
    if (nearestSupport && nearestResistance) {
      summary += `Price is trading between support near ${nearestSupport} and resistance near ${nearestResistance}. `;
    }

    if (nearestSupport) {
      summary += `As long as price remains above ${nearestSupport}, the current bullish market condition remains intact. `;
    }

    if (nearestResistance) {
      summary += `If price breaks above ${nearestResistance}, bullish control would strengthen. `;
    }

    if (nextResistance) {
      summary += `The next important resistance is around ${nextResistance}. `;
    }

    if (nearestSupport) {
      summary += `If price loses ${nearestSupport}, the current bullish read would begin to weaken, but that alone would not confirm bearish control.`;
    }
  }

  if (market.marketState === "TRANSITION") {
    if (nearestSupport && nearestResistance) {
      summary += `Price is trading between support near ${nearestSupport} and resistance near ${nearestResistance}. `;
      summary += `A break beyond either level would be important because it would show which side is starting to gain control, but the current market condition remains mixed until that control becomes clearer.`;
    }
  }

  return summary.trim();
}