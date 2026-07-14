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

export function detectDoubleBottom(
  history: PricePoint[]
): DetectedPattern | null {
  const swingLows = findSwingLows(history);
  const swingHighs = findSwingHighs(history);

  if (
    swingLows.length < 2 ||
    swingHighs.length < 1
  ) {
    return null;
  }

  const recentSwingLows = swingLows.slice(-8);

  for (
    let secondIndex = recentSwingLows.length - 1;
    secondIndex >= 1;
    secondIndex--
  ) {
    const secondBottom =
      recentSwingLows[secondIndex];

    for (
      let firstIndex = secondIndex - 1;
      firstIndex >= 0;
      firstIndex--
    ) {
      const firstBottom =
        recentSwingLows[firstIndex];

      const candleDistance =
        secondBottom.index -
        firstBottom.index;

      if (
        candleDistance < 6 ||
        candleDistance > 35
      ) {
        continue;
      }

      const candlesSinceSecondBottom =
        history.length -
        1 -
        secondBottom.index;

      if (candlesSinceSecondBottom > 40) {
        continue;
      }

      /*
       * A Double Bottom should form after a decline.
       * Compare price before the first bottom with
       * price 20 candles earlier.
       */
      const trendLookbackIndex = Math.max(
        0,
        firstBottom.index - 20
      );

      const prePatternPrice = Number(
        history[trendLookbackIndex].close
      );

      const priceNearFirstBottom = Number(
        history[
          Math.max(0, firstBottom.index - 1)
        ].close
      );

      const priorDeclinePercent =
        prePatternPrice > 0
          ? (
              (prePatternPrice -
                priceNearFirstBottom) /
              prePatternPrice
            ) * 100
          : 0;

      if (priorDeclinePercent < 2) {
        continue;
      }

      const averageBottomPrice =
        (
          firstBottom.price +
          secondBottom.price
        ) / 2;

      if (averageBottomPrice <= 0) {
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

      if (bottomDifferencePercent > 2.5) {
        continue;
      }

      /*
       * Require a genuine swing high between the
       * two bottoms. This prevents flat ranges or
       * random nearby lows from being classified
       * as a Double Bottom.
       */
      const highsBetweenBottoms =
        swingHighs.filter(
          (swingHigh) =>
            swingHigh.index >
              firstBottom.index &&
            swingHigh.index <
              secondBottom.index
        );

      if (highsBetweenBottoms.length === 0) {
        continue;
      }

      const necklineSwing =
        highsBetweenBottoms.reduce(
          (highest, current) =>
            current.price > highest.price
              ? current
              : highest
        );

      const necklinePrice =
        necklineSwing.price;

      /*
       * Make sure the middle peak is not sitting
       * extremely close to one of the bottoms.
       */
      const firstLegDistance =
        necklineSwing.index -
        firstBottom.index;

      const secondLegDistance =
        secondBottom.index -
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

      const necklineRisePercent =
        (
          (necklinePrice -
            averageBottomPrice) /
          averageBottomPrice
        ) * 100;

      if (necklineRisePercent < 2) {
        continue;
      }

      /*
       * Confirmation is a close above the
       * neckline after the second bottom.
       */
      const candlesAfterSecondBottom =
        history.slice(
          secondBottom.index + 1
        );

      const confirmationOffset =
        candlesAfterSecondBottom.findIndex(
          (candle) =>
            Number(candle.close) >
            necklinePrice
        );

      const confirmationIndex =
        confirmationOffset >= 0
          ? secondBottom.index +
            1 +
            confirmationOffset
          : null;

      const confirmed =
        confirmationIndex !== null;

      const confidence =
        calculatePatternConfidence({
          patternSimilarity:
            bottomDifferencePercent,

          breakoutStrength:
            necklineRisePercent,

          confirmed,
        });

      return {
        id: `double-bottom-${firstBottom.time}-${secondBottom.time}`,

        type: "DOUBLE_BOTTOM",
        direction: "BULLISH",

        status: confirmed
          ? "CONFIRMED"
          : "FORMING",

        confidence,

        startIndex: firstBottom.index,
        endIndex: secondBottom.index,

        startTime: firstBottom.time,
        endTime: secondBottom.time,

        highPrice: necklinePrice,

        lowPrice: Math.min(
          firstBottom.price,
          secondBottom.price
        ),

        evidence: [
          "Two similar swing lows were identified.",
          "A genuine swing high was identified between the two bottoms.",
          `The bottoms are ${bottomDifferencePercent.toFixed(
            2
          )}% apart.`,
          `The middle peak rises ${necklineRisePercent.toFixed(
            2
          )}% above the bottoms.`,
          `Price declined ${priorDeclinePercent.toFixed(
            2
          )}% before the first bottom.`,
        ],

        cautions: confirmed
          ? []
          : [
              "Price has not closed above the neckline.",
            ],
      };
    }
  }

  return null;
}