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

export function detectDoubleTop(
  history: PricePoint[]
): DetectedPattern | null {
  const swingHighs = findSwingHighs(history);
  const swingLows = findSwingLows(history);

  if (
    swingHighs.length < 2 ||
    swingLows.length < 1
  ) {
    return null;
  }

  const recentSwingHighs = swingHighs.slice(-8);

  for (
    let secondIndex = recentSwingHighs.length - 1;
    secondIndex >= 1;
    secondIndex--
  ) {
    const secondTop =
      recentSwingHighs[secondIndex];

    for (
      let firstIndex = secondIndex - 1;
      firstIndex >= 0;
      firstIndex--
    ) {
      const firstTop =
        recentSwingHighs[firstIndex];

      const candleDistance =
        secondTop.index -
        firstTop.index;

      if (
        candleDistance < 6 ||
        candleDistance > 35
      ) {
        continue;
      }

      const candlesSinceSecondTop =
        history.length -
        1 -
        secondTop.index;

      if (candlesSinceSecondTop > 40) {
        continue;
      }

      /*
       * A Double Top should form after an upward move.
       */
      const trendLookbackIndex = Math.max(
        0,
        firstTop.index - 20
      );

      const prePatternPrice = Number(
        history[trendLookbackIndex].close
      );

      const priceNearFirstTop = Number(
        history[
          Math.max(0, firstTop.index - 1)
        ].close
      );

      const priorRisePercent =
        prePatternPrice > 0
          ? (
              (priceNearFirstTop -
                prePatternPrice) /
              prePatternPrice
            ) * 100
          : 0;

      if (priorRisePercent < 2) {
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

      const topDifferencePercent =
        (
          Math.abs(
            firstTop.price -
              secondTop.price
          ) /
          averageTopPrice
        ) * 100;

      if (topDifferencePercent > 2.5) {
        continue;
      }

      /*
       * Require a genuine swing low between the two tops.
       */
      const lowsBetweenTops =
        swingLows.filter(
          (swingLow) =>
            swingLow.index >
              firstTop.index &&
            swingLow.index <
              secondTop.index
        );

      if (lowsBetweenTops.length === 0) {
        continue;
      }

      const necklineSwing =
        lowsBetweenTops.reduce(
          (lowest, current) =>
            current.price < lowest.price
              ? current
              : lowest
        );

      const necklinePrice =
        necklineSwing.price;

      /*
       * Keep the valley reasonably centered.
       */
      const firstLegDistance =
        necklineSwing.index -
        firstTop.index;

      const secondLegDistance =
        secondTop.index -
        necklineSwing.index;

      const shorterLeg = Math.min(
        firstLegDistance,
        secondLegDistance
      );

      const longerLeg = Math.max(
        firstLegDistance,
        secondLegDistance
      );

      const legBalance =
        longerLeg > 0
          ? shorterLeg / longerLeg
          : 0;

      if (legBalance < 0.3) {
        continue;
      }

      const necklineDropPercent =
        (
          (averageTopPrice -
            necklinePrice) /
          averageTopPrice
        ) * 100;

      if (necklineDropPercent < 2) {
        continue;
      }

      /*
       * Confirmation requires a close below
       * the neckline after the second top.
       */
      const candlesAfterSecondTop =
        history.slice(
          secondTop.index + 1
        );

      const confirmationOffset =
        candlesAfterSecondTop.findIndex(
          (candle) =>
            Number(candle.close) <
            necklinePrice
        );

      const confirmationIndex =
        confirmationOffset >= 0
          ? secondTop.index +
            1 +
            confirmationOffset
          : null;

      const confirmed =
        confirmationIndex !== null;

      const confidence =
        calculatePatternConfidence({
          patternSimilarity:
            topDifferencePercent,

          breakoutStrength:
            necklineDropPercent,

          confirmed,
        });

      return {
        id: `double-top-${firstTop.time}-${secondTop.time}`,

        type: "DOUBLE_TOP",
        direction: "BEARISH",

        status: confirmed
          ? "CONFIRMED"
          : "FORMING",

        confidence,

        startIndex: firstTop.index,
        endIndex: secondTop.index,

        startTime: firstTop.time,
        endTime: secondTop.time,

        highPrice: Math.max(
          firstTop.price,
          secondTop.price
        ),

        lowPrice: necklinePrice,

        evidence: [
          "Two similar swing highs were identified.",
          "A genuine swing low was identified between the two tops.",
          `The tops are ${topDifferencePercent.toFixed(
            2
          )}% apart.`,
          `The middle valley falls ${necklineDropPercent.toFixed(
            2
          )}% below the tops.`,
          `Price rose ${priorRisePercent.toFixed(
            2
          )}% before the first top.`,
        ],

        cautions: confirmed
          ? []
          : [
              "Price has not closed below the neckline.",
            ],
      };
    }
  }

  return null;
}