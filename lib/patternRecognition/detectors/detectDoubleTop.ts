import type { PricePoint } from "@/app/simulator/types/simulator";
import type { DetectedPattern } from "../types";
import type { CandlePathPoint } from "../helpers/buildCandlePath";

import { PATTERN_CONFIG } from "../constants";
import { findShapeWindows } from "../helpers/findShapeWindows";
import { calculatePatternConfidence } from "../confidence/calculatePatternConfidence";

function percentDifference(
  first: number,
  second: number
): number {
  const average = (first + second) / 2;

  if (average <= 0) {
    return Infinity;
  }

  return (
    Math.abs(first - second) /
    average
  ) * 100;
}

export function detectDoubleTop(
  history: PricePoint[],
  path: CandlePathPoint[]
): DetectedPattern | null {
  if (
    !Array.isArray(history) ||
    history.length === 0 ||
    !Array.isArray(path) ||
    path.length < 5
  ) {
    return null;
  }

  const latestClose = Number(
    history[history.length - 1]?.close
  );

  if (
    !Number.isFinite(latestClose) ||
    latestClose <= 0
  ) {
    return null;
  }

  const windows = findShapeWindows(path, 5);

  let bestPattern: DetectedPattern | null =
    null;

  for (const window of windows) {
    if (!window || window.length < 5) {
      continue;
    }

    const [
      start,
      firstTop,
      neckline,
      secondTop,
      current,
    ] = window;

    /*
     * Ensure every pattern point appears
     * in the correct chronological order.
     */
    const hasCorrectOrder =
      start.index < firstTop.index &&
      firstTop.index < neckline.index &&
      neckline.index < secondTop.index &&
      secondTop.index <= current.index;

    if (!hasCorrectOrder) {
      continue;
    }

    /*
     * The candle path must form an M shape.
     */
    const formsM =
      firstTop.price > start.price &&
      neckline.price < firstTop.price &&
      secondTop.price > neckline.price &&
      current.price < secondTop.price;

    if (!formsM) {
      continue;
    }

    /*
     * Both tops must test approximately
     * the same resistance level.
     */
    const topDifferencePercent =
      percentDifference(
        firstTop.price,
        secondTop.price
      );

    const maxTopDifferencePercent = 0.75;

    if (
      topDifferencePercent >
      maxTopDifferencePercent
    ) {
      continue;
    }

    const averageTopPrice =
      (
        firstTop.price +
        secondTop.price
      ) / 2;

    if (averageTopPrice <= 0) {
      continue;
    }

    /*
     * Build a shared resistance zone.
     *
     * A maximum difference of 0.75%
     * creates a zone extending 0.375%
     * above and below the average top price.
     */
    const resistanceZoneHalfPercent =
      maxTopDifferencePercent / 2;

    const resistanceZoneLow =
      averageTopPrice *
      (
        1 -
        resistanceZoneHalfPercent / 100
      );

    const resistanceZoneHigh =
      averageTopPrice *
      (
        1 +
        resistanceZoneHalfPercent / 100
      );

    const firstTopInsideZone =
      firstTop.price >= resistanceZoneLow &&
      firstTop.price <= resistanceZoneHigh;

    const secondTopInsideZone =
      secondTop.price >= resistanceZoneLow &&
      secondTop.price <= resistanceZoneHigh;

    if (
      !firstTopInsideZone ||
      !secondTopInsideZone
    ) {
      continue;
    }

    /*
     * Require a meaningful pullback between
     * the two tops.
     */
    const necklineDropPercent =
      (
        (
          averageTopPrice -
          neckline.price
        ) /
        averageTopPrice
      ) * 100;

    if (
      necklineDropPercent <
      PATTERN_CONFIG
        .DOUBLE_TOP
        .MIN_NECKLINE_PERCENT
    ) {
      continue;
    }

/*
 * Reject patterns that are too narrow
 * or too shallow to be visually meaningful.
 */
const patternWidth =
  secondTop.index -
  firstTop.index;

const minimumPatternWidth = 6;

if (
  patternWidth <
  minimumPatternWidth
) {
  continue;
}

const minimumPatternHeightPercent = 2;

if (
  necklineDropPercent <
  minimumPatternHeightPercent
) {
  continue;
}

    /*
     * The two sides of the pattern should
     * have reasonably balanced timing.
     */
    const firstLeg =
      neckline.index -
      firstTop.index;

    const secondLeg =
      secondTop.index -
      neckline.index;

    const shorterLeg =
      Math.min(
        firstLeg,
        secondLeg
      );

    const longerLeg =
      Math.max(
        firstLeg,
        secondLeg
      );

    const legBalance =
      longerLeg > 0
        ? shorterLeg / longerLeg
        : 0;

    if (
      legBalance <
      PATTERN_CONFIG
        .DOUBLE_TOP
        .MIN_LEG_BALANCE
    ) {
      continue;
    }

    const topResistance =
      Math.max(
        firstTop.price,
        secondTop.price
      );

    /*
     * A historical Double Top is invalid
     * if price later closes above both tops.
     */
    if (latestClose > topResistance) {
      continue;
    }

const confirmed =
  current.price <
  neckline.price;

    let confidence =
      calculatePatternConfidence({
        patternSimilarity:
          topDifferencePercent,

        breakoutStrength:
          necklineDropPercent,
      });

    confidence += Math.round(
      legBalance * 5
    );

    if (confirmed) {
      confidence += 10;
    }

    confidence = Math.min(
      confirmed ? 100 : 79,
      confidence
    );

const endIndex =
  Math.min(
    current.index,
    history.length - 1
  );

    const safeHistoryItem =
      history[endIndex] ??
      history[history.length - 1];

    const candidate: DetectedPattern = {
      id: `double-top-${firstTop.time}-${secondTop.time}`,

      type: "DOUBLE_TOP",
      direction: "BEARISH",

      status: confirmed
        ? "CONFIRMED"
        : "FORMING",

      confidence,

      /*
       * Start metadata now includes the
       * beginning of the full M shape.
       */
      startIndex: start.index,
      endIndex,

      startTime: start.time,

      endTime: Number(
        safeHistoryItem.time
      ),

      highPrice: topResistance,
      lowPrice: neckline.price,

      keyPoints: [
        {
          time: start.time,
          price: start.price,
          label: "Start",
        },
        {
          time: firstTop.time,
          price: firstTop.price,
          label: "Peak 1",
        },
        {
          time: neckline.time,
          price: neckline.price,
          label: "Neckline",
        },
        {
          time: secondTop.time,
          price: secondTop.price,
          label: "Peak 2",
        },
        {
          time: current.time,
          price: current.price,
          label: confirmed
            ? "Breakdown"
            : "Current",
        },
      ],

      resistanceZone: {
        low: resistanceZoneLow,
        high: resistanceZoneHigh,
      },

      evidence: [
        "The candle path formed an M shape.",

        `The tops are ${topDifferencePercent.toFixed(
          2
        )}% apart.`,

        `Both tops tested the same resistance zone between ${resistanceZoneLow.toFixed(
          8
        )} and ${resistanceZoneHigh.toFixed(
          8
        )}.`,

        `The neckline is ${necklineDropPercent.toFixed(
          2
        )}% below the tops.`,
      ],

      cautions: confirmed
        ? []
        : [
            "Price has not closed below the neckline.",
          ],
    };

    if (
      !bestPattern ||
      candidate.confidence >
        bestPattern.confidence ||
      (
        candidate.confidence ===
          bestPattern.confidence &&
        candidate.endIndex >
          bestPattern.endIndex
      )
    ) {
      bestPattern = candidate;
    }
  }

  return bestPattern;
}