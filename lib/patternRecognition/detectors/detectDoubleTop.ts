import type { PricePoint } from "@/app/simulator/types/simulator";
import type { DetectedPattern } from "../types";

import {
  findSwingHighs,
} from "../helpers/findSwingHighs";

import {
  findSwingLows,
} from "../helpers/findSwingLows";

import {
  calculatePatternConfidence,
} from "../confidence/calculatePatternConfidence";

const CONFIG = {
  MIN_CANDLE_DIST: 6,
  MAX_CANDLE_DIST: 35,
  MAX_CANDLES_SINCE_SECOND_TOP: 15,
  MAX_TOP_DIFF_PERCENT: 2.5,
  MIN_NECKLINE_DROP_PERCENT: 2,
  MIN_LEG_BALANCE: 0.3,
};

export function detectDoubleTop(
  history: PricePoint[],
  lookback: number
): DetectedPattern | null {
  const swingHighs =
    findSwingHighs(history);

  const swingLows =
    findSwingLows(history);

  if (
    swingHighs.length < 2 ||
    swingLows.length < 1
  ) {
    return null;
  }

  const windowStartIndex =
    Math.max(
      0,
      history.length - lookback
    );

  const recentSwingHighs =
    swingHighs.filter(
      (swingHigh) =>
        swingHigh.index >=
        windowStartIndex
    );

  const candidates:
    DetectedPattern[] = [];

  for (
    let secondIndex =
      recentSwingHighs.length - 1;
    secondIndex >= 1;
    secondIndex--
  ) {
    for (
      let firstIndex =
        secondIndex - 1;
      firstIndex >= 0;
      firstIndex--
    ) {
      const secondTop =
        recentSwingHighs[
          secondIndex
        ];

      const firstTop =
        recentSwingHighs[
          firstIndex
        ];

      const candleDistance =
        secondTop.index -
        firstTop.index;

      if (
        candleDistance <
          CONFIG.MIN_CANDLE_DIST ||
        candleDistance >
          CONFIG.MAX_CANDLE_DIST
      ) {
        continue;
      }

      const candlesSinceSecondTop =
        history.length -
        1 -
        secondTop.index;

      if (
        candlesSinceSecondTop >
        CONFIG
          .MAX_CANDLES_SINCE_SECOND_TOP
      ) {
        continue;
      }

      const averageTopPrice =
        (
          firstTop.price +
          secondTop.price
        ) / 2;

      if (
        averageTopPrice <= 0
      ) {
        continue;
      }

      const topDifferencePercent =
        (
          Math.abs(
            firstTop.price -
              secondTop.price
          ) /
          averageTopPrice
        ) * 100;

      if (
        topDifferencePercent >
        CONFIG.MAX_TOP_DIFF_PERCENT
      ) {
        continue;
      }

      const lowsBetweenTops =
        swingLows.filter(
          (swingLow) =>
            swingLow.index >
              firstTop.index &&
            swingLow.index <
              secondTop.index
        );

      if (
        lowsBetweenTops.length === 0
      ) {
        continue;
      }

      const neckline =
        lowsBetweenTops.reduce(
          (lowest, current) =>
            current.price <
            lowest.price
              ? current
              : lowest
        );

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
          ? shorterLeg /
            longerLeg
          : 0;

      if (
        legBalance <
        CONFIG.MIN_LEG_BALANCE
      ) {
        continue;
      }

      const necklineDropPercent =
        (
          (averageTopPrice -
            neckline.price) /
          averageTopPrice
        ) * 100;

      if (
        necklineDropPercent <
        CONFIG
          .MIN_NECKLINE_DROP_PERCENT
      ) {
        continue;
      }

      const latestClose =
        Number(
          history[
            history.length - 1
          ].close
        );

      const topResistance =
        Math.max(
          firstTop.price,
          secondTop.price
        );

      if (
        latestClose >
        topResistance
      ) {
        continue;
      }

      const confirmed =
        latestClose <
        neckline.price;

      const confidence =
        calculateConfidence(
          topDifferencePercent,
          necklineDropPercent,
          confirmed,
          legBalance
        );

      const endIndex =
        confirmed
          ? secondTop.index
          : history.length - 1;

      candidates.push({
        id: `double-top-${firstTop.time}-${secondTop.time}`,

        type: "DOUBLE_TOP",
        direction: "BEARISH",

        status: confirmed
          ? "CONFIRMED"
          : "FORMING",

        confidence,

        startIndex:
          firstTop.index,

        endIndex,

        startTime:
          firstTop.time,

        endTime: Number(
          history[endIndex].time
        ),

        highPrice:
          topResistance,

        lowPrice:
          neckline.price,

        evidence: [
          "Two similar swing highs were identified.",
          "A genuine swing low was identified between the tops.",
          `The tops are ${topDifferencePercent.toFixed(
            2
          )}% apart.`,
          `The neckline is ${necklineDropPercent.toFixed(
            2
          )}% below the tops.`,
        ],

        cautions: confirmed
          ? []
          : [
              "Price has not closed below the neckline.",
            ],
      });
    }
  }

  if (
    candidates.length === 0
  ) {
    return null;
  }

  candidates.sort((a, b) => {
    const confidenceDifference =
      b.confidence -
      a.confidence;

    if (
      confidenceDifference !== 0
    ) {
      return confidenceDifference;
    }

    const statusDifference =
      Number(
        b.status ===
          "CONFIRMED"
      ) -
      Number(
        a.status ===
          "CONFIRMED"
      );

    if (
      statusDifference !== 0
    ) {
      return statusDifference;
    }

    return (
      b.endIndex -
      a.endIndex
    );
  });

  return candidates[0] ?? null;
}

function calculateConfidence(
  similarity: number,
  necklineDrop: number,
  confirmed: boolean,
  legBalance: number
) {
  const base =
    calculatePatternConfidence({
      patternSimilarity:
        similarity,

      breakoutStrength:
        necklineDrop,

      confirmed,
    });

  return Math.min(
    confirmed ? 100 : 79,
    base +
      Math.round(
        legBalance * 5
      )
  );
}