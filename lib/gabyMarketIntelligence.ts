export type Candle = {
  time: string | number; // Replaced loosely typed 'any' for better consistency with charting charting engines
  open: number;
  high: number;
  low: number;
  close: number;
  volume?: number;
};

export type MarketStructure =
  | "BULLISH"
  | "BULLISH_CONSOLIDATION"
  | "BULLISH_PULLBACK"
  | "BEARISH"
  | "BEARISH_CONSOLIDATION"
  | "BEARISH_PULLBACK"
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

export type MultiTimeframeMarketData = {
  direction: "BULLISH" | "BEARISH" | "TRANSITION";
  momentum?: MomentumAnalysis["momentum"] | null;
  conviction?: MarketConviction | null;
};

export type MovingAverageAnalysis = {
  ma7: number | null;
  ma25: number | null;
  ma99: number | null;
  direction: "BULLISH" | "BEARISH" | "TRANSITION";
  summary: string;
};

// ==========================================
// UTILITY FUNCTIONS
// ==========================================

export function calculateSMA(candles: Candle[], period: number): number | null {
  if (candles.length < period) return null;
  const recentCandles = candles.slice(-period);
  const total = recentCandles.reduce((sum, candle) => sum + candle.close, 0);
  return total / period;
}

function percentDistance(price: number, ma: number): number {
  if (!ma || ma <= 0) return 0;
  return ((price - ma) / ma) * 100;
}

function getSwingHighs(candles: Candle[], lookback = 5): number[] {
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

function getSwingLows(candles: Candle[], lookback = 5): number[] {
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
      zones.push({ low: level, high: level, strength: 1 });
    }
  });
  return zones;
}

export function isPriceNearZone(price: number, zone: PriceZone | null, tolerancePercent = 0.0015): boolean {
  if (!zone) return false;
  const zoneMidpoint = (zone.low + zone.high) / 2;
  const distancePercent = Math.abs(price - zoneMidpoint) / zoneMidpoint;
  return distancePercent <= tolerancePercent;
}

// ==========================================
// CORE TRADING CORE ENGINE LOGIC
// ==========================================

function getMarketStructure(
  candles: Candle[],
  direction: "BULLISH" | "BEARISH" | "TRANSITION"
): MarketStructure {
  const recentCandles = candles.slice(-80);

  if (recentCandles.length < 30) {
    return "RANGING";
  }

  const half = Math.floor(recentCandles.length / 2);

  const firstHalf = recentCandles.slice(0, half);
  const secondHalf = recentCandles.slice(half);

  const firstHigh = Math.max(...firstHalf.map((c) => c.high));
  const firstLow = Math.min(...firstHalf.map((c) => c.low));

  const secondHigh = Math.max(...secondHalf.map((c) => c.high));
  const secondLow = Math.min(...secondHalf.map((c) => c.low));

  const makingHigherHighs = secondHigh > firstHigh;
  const makingHigherLows = secondLow > firstLow;

  const makingLowerHighs = secondHigh < firstHigh;
  const makingLowerLows = secondLow < firstLow;

  const last10 = recentCandles.slice(-10);

  const lastClose = last10[last10.length - 1].close;
  const recentHigh = Math.max(...last10.map((c) => c.high));
  const recentLow = Math.min(...last10.map((c) => c.low));

  const rangePercent =
    lastClose > 0
      ? ((recentHigh - recentLow) / lastClose) * 100
      : 0;

  const closeNearHigh =
    recentHigh > 0 &&
    Math.abs(lastClose - recentHigh) / recentHigh <= 0.01;

  const closeNearLow =
    recentLow > 0 &&
    Math.abs(lastClose - recentLow) / recentLow <= 0.01;

  // Clear bullish structure
  if (
    direction === "BULLISH" &&
    makingHigherHighs &&
    makingHigherLows
  ) {
    return "BULLISH";
  }

  // Clear bearish structure
  if (
    direction === "BEARISH" &&
    makingLowerHighs &&
    makingLowerLows
  ) {
    return "BEARISH";
  }

  // Bullish direction temporarily moving sideways near recent highs
  if (
    direction === "BULLISH" &&
    rangePercent <= 2 &&
    closeNearHigh
  ) {
    return "BULLISH_CONSOLIDATION";
  }

  // Bearish direction temporarily moving sideways near recent lows
  if (
    direction === "BEARISH" &&
    rangePercent <= 2 &&
    closeNearLow
  ) {
    return "BEARISH_CONSOLIDATION";
  }

  // Bullish direction with structure temporarily pulling back
  if (
    direction === "BULLISH" &&
    !makingHigherHighs
  ) {
    return "BULLISH_PULLBACK";
  }

  // Bearish direction with structure temporarily bouncing
  if (
    direction === "BEARISH" &&
    !makingLowerLows
  ) {
    return "BEARISH_PULLBACK";
  }

  return "RANGING";
}

export function getDominantStructure(structures: (MarketStructure | undefined)[]): MarketStructure {
  const validStructures = structures.filter(Boolean) as MarketStructure[];
  const bullishCount = validStructures.filter((s) => s === "BULLISH").length;
  const bearishCount = validStructures.filter((s) => s === "BEARISH").length;

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

  const recentAvgClose = recentCandles.reduce((sum, c) => sum + c.close, 0) / recentCandles.length;
  const previousAvgClose = previousCandles.reduce((sum, c) => sum + c.close, 0) / previousCandles.length;

  if (recentClose > previousClose && recentAvgClose > previousAvgClose) {
    return {
      momentum: "BULLISH_MOMENTUM",
      summary: "Momentum is leaning bullish because recent closes are strengthening.",
    };
  }
  if (recentClose < previousClose && recentAvgClose < previousAvgClose) {
    return {
      momentum: "BEARISH_MOMENTUM",
      summary: "Momentum is leaning bearish because recent closes are weakening.",
    };
  }
  return {
    momentum: "WEAK_MOMENTUM",
    summary: "Momentum is weak because recent closes are mixed.",
  };
}

function getVolumeAnalysis(candles: Candle[]): VolumeAnalysis | null {
  if (candles.length < 30) return null;

  const recentCandles = candles.slice(-10);
  const previousCandles = candles.slice(-30, -10);

  const recentVolume = recentCandles.reduce((sum, c) => sum + (c.volume ?? 0), 0) / recentCandles.length;
  const previousVolume = previousCandles.reduce((sum, c) => sum + (c.volume ?? 0), 0) / previousCandles.length;
  const latestVolume = candles[candles.length - 1].volume ?? 0;

  if (previousVolume === 0) return null;

  if (latestVolume > previousVolume * 2) {
    return {
      volume: "VOLUME_SPIKE",
      summary: "Volume is spiking compared to recent candles, which may indicate stronger market participation.",
    };
  }
  if (recentVolume > previousVolume * 1.2) {
    return {
      volume: "RISING_VOLUME",
      summary: "Volume is rising, which may indicate stronger participation behind the recent move.",
    };
  }
  if (recentVolume < previousVolume * 0.8) {
    return {
      volume: "FALLING_VOLUME",
      summary: "Volume is falling, which may indicate weaker participation behind the recent move.",
    };
  }
  return {
    volume: "LOW_VOLUME",
    summary: "Volume is normal to low, which may indicate limited participation right now.",
  };
}

function calculateRSI(candles: Candle[], period = 14): number {
  if (candles.length <= period) return 50;

  // Crucial Lookback Patch: Use total context array sizing for smoothed calculations
  let gains = 0;
  let losses = 0;

  for (let i = candles.length - period; i < candles.length; i++) {
    const change = candles[i].close - candles[i - 1].close;
    if (change > 0) gains += change;
    else if (change < 0) losses += Math.abs(change);
  }

  const averageGain = gains / period;
  const averageLoss = losses / period;

  if (averageLoss === 0) return 100;
  if (averageGain === 0) return 0;

  const rs = averageGain / averageLoss;
  return Number((100 - 100 / (1 + rs)).toFixed(2));
}

function getRSIAnalysis(candles: Candle[]): RSIAnalysis | null {
  if (candles.length < 15) return null;
  const value = calculateRSI(candles);

  if (value >= 70) {
    return { rsi: "RSI_OVERBOUGHT", value, summary: "RSI is overbought. Price may be extended, but this is not a sell signal." };
  }
  if (value <= 30) {
    return { rsi: "RSI_OVERSOLD", value, summary: "RSI is oversold. Price may be stretched lower, but this is not a buy signal." };
  }
  if (value >= 55) {
    return { rsi: "RSI_BULLISH", value, summary: "RSI shows bullish pressure, but direction still comes first." };
  }
  if (value <= 45) {
    return { rsi: "RSI_BEARISH", value, summary: "RSI shows bearish pressure, but direction still comes first." };
  }
  return { rsi: "RSI_NEUTRAL", value, summary: "RSI is neutral and does not show strong pressure right now." };
}

export function getMovingAverageAnalysis(candles: Candle[]): MovingAverageAnalysis {
  const ma7 = calculateSMA(candles, 7);
  const ma25 = calculateSMA(candles, 25);
  const ma99 = calculateSMA(candles, 99);

  let direction: MovingAverageAnalysis["direction"] = "TRANSITION";
  if (ma7 && ma25 && ma99) {
    if (ma7 > ma25 && ma25 > ma99) direction = "BULLISH";
    else if (ma7 < ma25 && ma25 < ma99) direction = "BEARISH";
  }

  let summary = "The moving averages are not fully aligned right now.";
  if (direction === "BULLISH") {
    summary = "The 7 MA is above the 25 MA, and the 25 MA is above the 99 MA. Direction is bullish.";
  } else if (direction === "BEARISH") {
    summary = "The 7 MA is below the 25 MA, and the 25 MA is below the 99 MA. Direction is bearish.";
  }

  return { ma7, ma25, ma99, direction, summary };
}

export function getMAStructureExtension(price: number, ma7: number, ma25: number, ma99: number): MAStructureExtension {
  const distances = [percentDistance(price, ma7), percentDistance(price, ma25), percentDistance(price, ma99)];
  const averageDistance = distances.reduce((sum, val) => sum + Math.abs(val), 0) / distances.length;

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
  recent.forEach((c) => { if (c.close < c.open) bearishCandles++; });
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

  if (nearestSupport && currentPrice > nearestSupport.low && currentPrice <= nearestSupport.high * 1.003) {
    score += 2;
  }

  if (score >= 7) return "HIGH";
  if (score >= 5) return "ELEVATED";
  if (score >= 3) return "MODERATE";
  return "LOW";
}

export function getControlStrength(mom: MomentumAnalysis | null, vol: VolumeAnalysis | null, fall: FallForce): ControlStrength {
  if (mom?.momentum === "WEAK_MOMENTUM" || fall === "WEAK") return "WEAKENING";
  if (vol?.volume === "VOLUME_SPIKE" || vol?.volume === "RISING_VOLUME") return "STRENGTHENING";
  return "STABLE";
}

export function getMoveCondition(ext: MAStructureExtension, bounce: BouncePressure, stage: MomentumStage): MoveCondition {
  if (ext === "EXTREME_UPSIDE" || ext === "EXTREME_DOWNSIDE" || stage.startsWith("EXHAUSTED")) return "EXHAUSTED";
  if (ext === "HIGH" || stage.startsWith("LATE")) return "STRETCHED";
  if (stage.startsWith("EARLY") || ext === "LOW") return "FRESH";
  return "MATURE";
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
  const nearSupport = isPriceNearZone(currentPrice, nearestSupport, 0.003);
  const nearResistance = isPriceNearZone(currentPrice, nearestResistance, 0.003);

  if (momentum?.momentum === "BULLISH_MOMENTUM" && pattern?.pattern === "RESISTANCE_BREAKING") return "EARLY_BREAKOUT";
  if (momentum?.momentum === "BEARISH_MOMENTUM" && pattern?.pattern === "SUPPORT_BREAKING") return "EARLY_BREAKDOWN";

  if (momentum?.momentum === "BULLISH_MOMENTUM" && nearResistance && maStructureExtension === "EXTREME_UPSIDE") {
    return "EXHAUSTED_AT_RESISTANCE";
  }
  if (momentum?.momentum === "BEARISH_MOMENTUM" && nearSupport && bouncePressure === "HIGH") {
    return "EXHAUSTED_AT_SUPPORT";
  }

  if (momentum?.momentum === "BULLISH_MOMENTUM" && nearResistance) return "LATE_NEAR_RESISTANCE";
  if (momentum?.momentum === "BEARISH_MOMENTUM" && nearSupport) return "LATE_NEAR_SUPPORT";

  if (momentum?.momentum === "BULLISH_MOMENTUM" || momentum?.momentum === "BEARISH_MOMENTUM") {
    return "HEALTHY_CONTINUATION";
  }
  return "NONE";
}

export function getMarketState(direction: "BULLISH" | "BEARISH" | "TRANSITION", structure: MarketStructure): MarketState {
  if (
  direction === "BULLISH" &&
  (
    structure === "BULLISH" ||
    structure === "BULLISH_CONSOLIDATION" ||
    structure === "BULLISH_PULLBACK" ||
    structure === "HIGHER_HIGHS"
  )
) {
    return "BULLS_IN_CONTROL";
  }
  if (
  direction === "BEARISH" &&
  (
    structure === "BEARISH" ||
    structure === "BEARISH_CONSOLIDATION" ||
    structure === "BEARISH_PULLBACK" ||
    structure === "LOWER_LOWS"
  )
) {
    return "BEARS_IN_CONTROL";
  }
  return "TRANSITION";
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

if (
  structure === "BULLISH" ||
  structure === "BULLISH_CONSOLIDATION" ||
  structure === "BULLISH_PULLBACK" ||
  structure === "HIGHER_HIGHS"
) {
  bullishScore += 2;
}

if (
  structure === "BEARISH" ||
  structure === "BEARISH_CONSOLIDATION" ||
  structure === "BEARISH_PULLBACK" ||
  structure === "LOWER_LOWS"
) {
  bearishScore += 2;
}

  if (pattern?.bias === "BULLISH_CONTEXT") bullishScore += 2;
  if (pattern?.bias === "BEARISH_CONTEXT") bearishScore += 2;

  if (momentum?.momentum === "BULLISH_MOMENTUM") bullishScore += 2;
  if (momentum?.momentum === "BEARISH_MOMENTUM") bearishScore += 2;

  if (volume?.volume === "RISING_VOLUME" || volume?.volume === "VOLUME_SPIKE") {
    bullishScore += 1;
    bearishScore += 1;
  }

  if (rsi?.rsi === "RSI_BULLISH" || rsi?.rsi === "RSI_OVERSOLD") bullishScore += 1;
  if (rsi?.rsi === "RSI_BEARISH" || rsi?.rsi === "RSI_OVERBOUGHT") bearishScore += 1;

  const difference = Math.abs(bullishScore - bearishScore);
  if (bullishScore >= 7 && difference >= 3) return "HIGH_CONVICTION_BULLISH";
  if (bearishScore >= 7 && difference >= 3) return "HIGH_CONVICTION_BEARISH";
  if (difference <= 1) return "MIXED_CONDITIONS";

  return "LOW_CONVICTION";
}

// ==========================================
// MASTER ENGINE ASSEMBLY ENTRYPOINT
// ==========================================

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

    const supportMidpoint = nearestSupport ? (nearestSupport.low + nearestSupport.high) / 2 : null;
    const resistanceMidpoint = nearestResistance ? (nearestResistance.low + nearestResistance.high) / 2 : null;

    const nearSupport = supportMidpoint !== null && Math.abs(currentPrice - supportMidpoint) / supportMidpoint <= 0.003;
    const nearResistance = resistanceMidpoint !== null && Math.abs(currentPrice - resistanceMidpoint) / resistanceMidpoint <= 0.003;

    if (nearestSupport && previousCandle.low <= nearestSupport.high && currentCandle.close > nearestSupport.high && currentCandle.close > currentCandle.open) {
      return { pattern: "SUPPORT_HOLDING", bias: "BULLISH_CONTEXT", summary: "Price is holding support, indicating defending buyers." };
    }
    if (nearestResistance && previousCandle.high >= nearestResistance.low && currentCandle.close < nearestResistance.low && currentCandle.close < currentCandle.open) {
      return { pattern: "RESISTANCE_HOLDING", bias: "BEARISH_CONTEXT", summary: "Price is rejecting resistance, indicating defending sellers." };
    }
    if (nearestSupport && currentCandle.close < nearestSupport.low) {
      return { pattern: "SUPPORT_BREAKING", bias: "BEARISH_CONTEXT", summary: "Price is breaking below support, increasing bearish pressure." };
    }
    if (nearestResistance && currentCandle.close > nearestResistance.high) {
      return { pattern: "RESISTANCE_BREAKING", bias: "BULLISH_CONTEXT", summary: "Price is breaking above resistance, increasing bullish pressure." };
    }
    if (nearestSupport && currentPrice > nearestSupport.high && nearSupport && currentCandle.close > currentCandle.open) {
      return { pattern: "BULLISH_BREAKOUT_RETEST", bias: "BULLISH_CONTEXT", summary: "Price broke resistance and is retesting it as support." };
    }
    if (nearestResistance && currentPrice < nearestResistance.low && nearResistance && currentCandle.close < currentCandle.open) {
      return { pattern: "BEARISH_BREAKOUT_RETEST", bias: "BEARISH_CONTEXT", summary: "Price broke support and is retesting it as resistance." };
    }

    const lowTolerance = previousLow > 0 ? Math.abs(recentLow - previousLow) / previousLow : 1;
    const firstThird = candles.slice(-60, -40);
    const middleThird = candles.slice(-40, -20);
    const lastThird = candles.slice(-20);

    const firstAvgClose = firstThird.reduce((sum, c) => sum + c.close, 0) / firstThird.length;
    const middleAvgClose = middleThird.reduce((sum, c) => sum + c.close, 0) / middleThird.length;
    const lastAvgClose = lastThird.reduce((sum, c) => sum + c.close, 0) / lastThird.length;

    if (firstThird.length && middleThird.length && lastThird.length && middleAvgClose < firstAvgClose && lastAvgClose > middleAvgClose && currentPrice > middleAvgClose) {
      return { pattern: "ROUNDED_BOTTOM", bias: "BULLISH_CONTEXT", summary: "Price is forming a rounded bottom; selling pressure is weakening." };
    }
    if (firstThird.length && middleThird.length && lastThird.length && middleAvgClose > firstAvgClose && lastAvgClose < middleAvgClose && currentPrice < middleAvgClose) {
      return { pattern: "ROUNDED_TOP", bias: "BEARISH_CONTEXT", summary: "Price is forming a rounded top; buying pressure is weakening." };
    }

    const recentHighTolerance = previousHigh > 0 ? Math.abs(recentHigh - previousHigh) / previousHigh : 1;
    const recentLowRising = recentLow > previousLow;
    const recentHighFalling = recentHigh < previousHigh;
    const recentLowTolerance = previousLow > 0 ? Math.abs(recentLow - previousLow) / previousLow : 1;

    if (recentHighTolerance <= 0.004 && recentLowRising) {
      return { pattern: "ASCENDING_TRIANGLE", bias: "BULLISH_CONTEXT", summary: "Equal highs with rising lows; buyers pressing resistance." };
    }
    if (recentLowTolerance <= 0.004 && recentHighFalling) {
      return { pattern: "DESCENDING_TRIANGLE", bias: "BEARISH_CONTEXT", summary: "Equal lows with falling highs; sellers pressing support." };
    }

    const highTolerance = previousHigh > 0 ? Math.abs(recentHigh - previousHigh) / previousHigh : 1;
    if (lowTolerance <= 0.004 && currentPrice > recentLow) {
      return { pattern: "DOUBLE_BOTTOM_ATTEMPT", bias: "BULLISH_CONTEXT", summary: "Price revisiting past support, attempting double bottom." };
    }
    if (highTolerance <= 0.004 && currentPrice < recentHigh) {
      return { pattern: "DOUBLE_TOP_ATTEMPT", bias: "BEARISH_CONTEXT", summary: "Price revisiting past resistance, attempting double top." };
    }
    if (recentHigh > previousHigh && recentLow > previousLow) {
      return { pattern: "HIGHER_HIGH_HIGHER_LOW", bias: "BULLISH_CONTEXT", summary: "Structure forming higher highs and higher lows." };
    }
    if (recentHigh < previousHigh && recentLow < previousLow) {
      return { pattern: "LOWER_HIGH_LOWER_LOW", bias: "BEARISH_CONTEXT", summary: "Structure forming lower highs and lower lows." };
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

  // Re-use core MA routine instead of duplicating calculation arrays
  const maAnalysis = getMovingAverageAnalysis(recentCandles);
  const direction = maAnalysis.direction;

  const maStructureExtension = maAnalysis.ma7 && maAnalysis.ma25 && maAnalysis.ma99
    ? getMAStructureExtension(currentPrice, maAnalysis.ma7, maAnalysis.ma25, maAnalysis.ma99)
    : "LOW";

  const fallForce = getFallForce(recentCandles);
  const supportZones = groupZones(getSwingLows(recentCandles));
  const resistanceZones = groupZones(getSwingHighs(recentCandles));

  const supportLevels = supportZones.filter((z) => z.high < currentPrice).sort((a, b) => b.high - a.high);
  const resistanceLevels = resistanceZones.filter((z) => z.low > currentPrice).sort((a, b) => a.low - b.low);

  const nearestSupport = supportLevels[0] ?? null;
  const nextSupport = supportLevels[1] ?? null;
  const nearestResistance = resistanceLevels[0] ?? null;
  const nextResistance = resistanceLevels[1] ?? null;

  const structure = getMarketStructure(
  recentCandles,
  direction
);
  const patternAnalysis = getPatternAnalysis(recentCandles, nearestSupport, nearestResistance);
  const momentumAnalysis = getMomentumAnalysis(recentCandles);
  const volumeAnalysis = getVolumeAnalysis(recentCandles);
  const rsiAnalysis = getRSIAnalysis(recentCandles);

  const bouncePressure = getBouncePressure(maStructureExtension, fallForce, rsiAnalysis, nearestSupport, currentPrice);
  const momentumStage = getMomentumStage(momentumAnalysis, patternAnalysis, nearestSupport, nearestResistance, currentPrice, maStructureExtension, bouncePressure);
  
  const marketState = getMarketState(direction, structure);
  const controlStrength = getControlStrength(momentumAnalysis, volumeAnalysis, fallForce);
  const moveCondition = getMoveCondition(maStructureExtension, bouncePressure, momentumStage);

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
    marketConviction: getMarketConviction(direction, structure, patternAnalysis, momentumAnalysis, volumeAnalysis, rsiAnalysis),
  };
}

export function getMultiTimeframeAnalysis(
  timeframeData: Record<string, MultiTimeframeMarketData>,
  selectedTimeframe: string
): MultiTimeframeAnalysis {
  const contextMap: Record<string, string[]> = {
    "1M": ["5M", "15M"],
    "5M": ["1M", "15M"],
    "15M": ["5M", "1H"],
    "1H": ["15M", "4H"],
    "4H": ["1H", "1D"],
    "1D": ["4H"],
  };

  const primary = timeframeData[selectedTimeframe];
  if (!primary) {
    return {
      status: "CONFLICTING",
      primaryTimeframe: selectedTimeframe,
      supportingTimeframes: [],
      summary: "Not enough timeframe data yet.",
    };
  }

  const supporting = contextMap[selectedTimeframe] || [];
  let alignedScore = 0;
  let conflictingScore = 0;
  let checkedTimeframes = 0;

  supporting.forEach((tf) => {
    const data = timeframeData[tf];
    if (!data) return;
    checkedTimeframes++;

    if (data.direction === primary.direction) alignedScore += 3;
    else conflictingScore += 3;

    if (data.momentum && primary.momentum && data.momentum === primary.momentum) alignedScore += 2;
    else if (data.momentum && primary.momentum && data.momentum !== primary.momentum) conflictingScore += 2;

    if (data.conviction && primary.conviction && data.conviction === primary.conviction) alignedScore += 1;
    else if (data.conviction && primary.conviction && data.conviction !== primary.conviction) conflictingScore += 1;
  });

  let status: MultiTimeframeAnalysis["status"];
  if (checkedTimeframes === 0) status = "CONFLICTING";
  else if (alignedScore >= conflictingScore + 4) status = "ALIGNED";
  else if (alignedScore > conflictingScore) status = "PARTIALLY_ALIGNED";
  else status = "CONFLICTING";

  let summary = "Nearby timeframes are mixed.";
  if (status === "ALIGNED") summary = "Nearby timeframes support the current timeframe direction.";
  if (status === "PARTIALLY_ALIGNED") summary = "Some nearby timeframes support the current direction while others disagree.";
  if (status === "CONFLICTING") summary = "Nearby timeframes are opposing the current timeframe direction.";

  return { status, primaryTimeframe: selectedTimeframe, supportingTimeframes: supporting, summary };
}

export type PriceLocation = "NEAR_SUPPORT" | "NEAR_RESISTANCE" | "BETWEEN_ZONES";

export function getPriceLocation(price: number, support: PriceZone | null, resistance: PriceZone | null): PriceLocation {
  if (isPriceNearZone(price, support, 0.003)) return "NEAR_SUPPORT";
  if (isPriceNearZone(price, resistance, 0.003)) return "NEAR_RESISTANCE";
  return "BETWEEN_ZONES";
}

export function getEntryQuality(
  entryPrice: number,
  support: PriceZone | null,
  resistance: PriceZone | null,
  direction: "BULLISH" | "BEARISH" | "TRANSITION"
): EntryQuality {
  const nearSupport = isPriceNearZone(entryPrice, support, 0.003);
  const nearResistance = isPriceNearZone(entryPrice, resistance, 0.003);

  if (direction === "BULLISH" && nearSupport) return "EXCELLENT";
  if (direction === "BEARISH" && nearResistance) return "EXCELLENT";
  if (nearSupport || nearResistance) return "GOOD";
  if (direction === "TRANSITION") return "NEUTRAL";
  return "POOR";
}

// ==========================================
// MISSING EXPORTS FOR SIMULATOR COMPONENT
// ==========================================

/**
 * Builds a comprehensive, structural breakdown of recent swing points
 * to satisfy the getStructureAnalysis import.
 */
export function getStructureAnalysis(candles: Candle[]): StructureAnalysis {
  const direction =
  getMovingAverageAnalysis(candles).direction;

const structure = getMarketStructure(
  candles,
  direction
);
  const recentHighs = getSwingHighs(candles, 5);
  const recentLows = getSwingLows(candles, 5);

  const lastHigh = recentHighs.length > 0 ? recentHighs[recentHighs.length - 1] : null;
  const previousHigh = recentHighs.length > 1 ? recentHighs[recentHighs.length - 2] : null;
  const lastLow = recentLows.length > 0 ? recentLows[recentLows.length - 1] : null;
  const previousLow = recentLows.length > 1 ? recentLows[recentLows.length - 2] : null;

  let summary = `Market structure is currently ${structure.toLowerCase()}.`;
  if (lastHigh && previousHigh) {
    summary += ` Last swing high was ${lastHigh} compared to the previous high of ${previousHigh}.`;
  }

  return {
    structure,
    lastHigh,
    previousHigh,
    lastLow,
    previousLow,
    summary,
  };
}

/**
 * Combines all modular metrics from MarketIntelligence into a unified text summary.
 * Now accepts optional timeframe and asset parameters to fit your UI dashboard layout context.
 */
export function buildMarketAnalysisSummary(
  intelligence: MarketIntelligence,
  selectedTimeframe?: string,
  selectedCoin?: string
): string {
  const lines: string[] = [];

  // Header incorporating context if provided
  const assetStr = selectedCoin ? `${selectedCoin.toUpperCase()}` : "Market";
  const tfStr = selectedTimeframe ? ` (${selectedTimeframe})` : "";
  lines.push(`### ${assetStr} Intelligence Summary${tfStr}`);
  
  lines.push(`* **Overall Direction:** ${intelligence.direction}`);
  lines.push(`* **Market Structure:** ${intelligence.structure}`);
  lines.push(`* **State:** ${intelligence.marketState?.replace(/_/g, " ") || "UNKNOWN"} (${intelligence.controlStrength?.toLowerCase() || "neutral"})`);
  lines.push(`* **Move Condition:** ${intelligence.moveCondition}`);
  lines.push(`* **Conviction Level:** ${intelligence.marketConviction?.replace(/_/g, " ") || "NORMAL"}`);
  
  if (intelligence.patternAnalysis) {
    lines.push(`* **Pattern Detected:** ${intelligence.patternAnalysis.pattern} — ${intelligence.patternAnalysis.summary}`);
  }
  
  if (intelligence.momentumAnalysis) {
    lines.push(`* **Momentum:** ${intelligence.momentumAnalysis.summary}`);
  }
  
  if (intelligence.rsiAnalysis) {
    lines.push(`* **RSI (${intelligence.rsiAnalysis.value}):** ${intelligence.rsiAnalysis.summary}`);
  }

  if (intelligence.nearestSupport || intelligence.nearestResistance) {
    const supStr = intelligence.nearestSupport ? `[${intelligence.nearestSupport.low?.toFixed(2)} - ${intelligence.nearestSupport.high?.toFixed(2)}]` : "None";
    const resStr = intelligence.nearestResistance ? `[${intelligence.nearestResistance.low?.toFixed(2)} - ${intelligence.nearestResistance.high?.toFixed(2)}]` : "None";
    lines.push(`* **Immediate Key Zones:** Support: ${supStr} | Resistance: ${resStr}`);
  }

  return lines.join("\n");
}