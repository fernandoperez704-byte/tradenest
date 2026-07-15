import type { PricePoint } from "@/app/simulator/types/simulator";
import type { DetectedPattern } from "../types";

import {
  findSwingLows,
} from "../helpers/findSwingLows";

import {
  findSwingHighs,
} from "../helpers/findSwingHighs";

import {
  calculatePatternConfidence,
} from "../confidence/calculatePatternConfidence";

const CONFIG = {
  MIN_CANDLE_DIST: 6,
  MAX_CANDLE_DIST: 35,
  MAX_CANDLES_SINCE_SECOND_BOTTOM: 15,
  MAX_BOTTOM_DIFF_PERCENT: 2.5,
  MIN_NECKLINE_RISE_PERCENT: 2,
  MIN_LEG_BALANCE: 0.3,
};

export function detectDoubleBottom(
  history: PricePoint[],
  lookback: number
): DetectedPattern | null {
  const swingLows =
    findSwingLows(history);

  const swingHighs =
    findSwingHighs(history);

  if (
    swingLows.length < 2 ||
    swingHighs.length < 1
  ) {
    return null;
  }

  const windowStartIndex =
    Math.max(
      0,
      history.length - lookback
    );

  const recentSwingLows =
    swingLows.filter(
      (swingLow) =>
        swingLow.index >=
        windowStartIndex
    );

  const candidates:
    DetectedPattern[] = [];

  for (
    let secondIndex =
      recentSwingLows.length - 1;
    secondIndex >= 1;
    secondIndex--
  ) {
    for (
      let firstIndex =
        secondIndex - 1;
      firstIndex >= 0;
      firstIndex--
    ) {
      const secondBottom =
        recentSwingLows[
          secondIndex
        ];

      const firstBottom =
        recentSwingLows[
          firstIndex
        ];

      const candleDistance =
        secondBottom.index -
        firstBottom.index;

      if (
        candleDistance <
          CONFIG.MIN_CANDLE_DIST ||
        candleDistance >
          CONFIG.MAX_CANDLE_DIST
      ) {
        continue;
      }

      const candlesSinceSecondBottom =
        history.length -
        1 -
        secondBottom.index;

      if (
        candlesSinceSecondBottom >
        CONFIG
          .MAX_CANDLES_SINCE_SECOND_BOTTOM
      ) {
        continue;
      }

      const averageBottomPrice =
        (
          firstBottom.price +
          secondBottom.price
        ) / 2;

      if (
        averageBottomPrice <= 0
      ) {
        continue;
      }

      const bottomDifferencePercent =
        (
          Math.abs(
            firstBottom.price -
              secondBottom.price
          ) /
          averageBottomPrice
        ) * 100;

      if (
        bottomDifferencePercent >
        CONFIG
          .MAX_BOTTOM_DIFF_PERCENT
      ) {
        continue;
      }

      const highsBetweenBottoms =
        swingHighs.filter(
          (swingHigh) =>
            swingHigh.index >
              firstBottom.index &&
            swingHigh.index <
              secondBottom.index
        );

      if (
        highsBetweenBottoms.length ===
        0
      ) {
        continue;
      }

      const neckline =
        highsBetweenBottoms.reduce(
          (highest, current) =>
            current.price >
            highest.price
              ? current
              : highest
        );

      const firstLeg =
        neckline.index -
        firstBottom.index;

      const secondLeg =
        secondBottom.index -
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

      const necklineRisePercent =
        (
          (neckline.price -
            averageBottomPrice) /
          averageBottomPrice
        ) * 100;

      if (
        necklineRisePercent <
        CONFIG
          .MIN_NECKLINE_RISE_PERCENT
      ) {
        continue;
      }

      const latestClose =
        Number(
          history[
            history.length - 1
          ].close
        );

      const bottomSupport =
        Math.min(
          firstBottom.price,
          secondBottom.price
        );

      if (
        latestClose <
        bottomSupport
      ) {
        continue;
      }

      const confirmed =
        latestClose >
        neckline.price;

      const confidence =
        calculateConfidence(
          bottomDifferencePercent,
          necklineRisePercent,
          confirmed,
          legBalance
        );

      const endIndex =
        confirmed
          ? secondBottom.index
          : history.length - 1;

      candidates.push({
        id: `double-bottom-${firstBottom.time}-${secondBottom.time}`,

        type: "DOUBLE_BOTTOM",
        direction: "BULLISH",

        status: confirmed
          ? "CONFIRMED"
          : "FORMING",

        confidence,

        startIndex:
          firstBottom.index,

        endIndex,

        startTime:
          firstBottom.time,

        endTime: Number(
          history[endIndex].time
        ),

        highPrice:
          neckline.price,

        lowPrice:
          bottomSupport,

        evidence: [
          "Two similar swing lows were identified.",
          "A genuine swing high was identified between the bottoms.",
          `The bottoms are ${bottomDifferencePercent.toFixed(
            2
          )}% apart.`,
          `The neckline is ${necklineRisePercent.toFixed(
            2
          )}% above the bottoms.`,
        ],

        cautions: confirmed
          ? []
          : [
              "Price has not closed above the neckline.",
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
  necklineRise: number,
  confirmed: boolean,
  legBalance: number
) {
  const base =
    calculatePatternConfidence({
      patternSimilarity:
        similarity,

      breakoutStrength:
        necklineRise,

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