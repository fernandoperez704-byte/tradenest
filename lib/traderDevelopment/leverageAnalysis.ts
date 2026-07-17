import type {
  LeverageAnalysisResult,
  TradeReview,
} from "./types";

type LeverageStats = {
  count: number;
  sumLeverage: number;
  highLeverageTrades: number;
  highLeverageLosses: number;
};

export function buildLeverageAnalysis(
  reviews: TradeReview[]
): LeverageAnalysisResult {
  const stats =
    reviews.reduce<LeverageStats>(
      (acc, review) => {
        const mode = String(
          review.mode ??
            review.tradeContext?.account
              ?.marketMode ??
            ""
        ).toUpperCase();

        if (mode !== "FUTURES") {
          return acc;
        }

        const rawLeverage =
          review.leverage ??
          review.tradeResult?.leverage ??
          review.tradeContext?.leverage ??
          review.engine?.risk?.leverage;

if (
  rawLeverage === null ||
  rawLeverage === undefined
) {
  return acc;
}

        const leverage =
          Number(rawLeverage);

        if (
          !Number.isFinite(leverage) ||
          leverage <= 0
        ) {
          return acc;
        }

        acc.count++;
        acc.sumLeverage += leverage;

        if (leverage >= 25) {
          acc.highLeverageTrades++;

          const result = String(
            review.result ??
              review.outcome ??
              review.automaticReview?.result ??
              review.automaticReview?.outcome ??
              review.engine?.result ??
              review.engine?.outcome ??
              ""
          ).toUpperCase();

          if (result === "LOSS") {
            acc.highLeverageLosses++;
          }
        }

        return acc;
      },
      {
        count: 0,
        sumLeverage: 0,
        highLeverageTrades: 0,
        highLeverageLosses: 0,
      }
    );

  const {
    count,
    sumLeverage,
    highLeverageTrades,
    highLeverageLosses,
  } = stats;

  return {
    totalFuturesTrades: count,

    averageLeverage:
      count === 0
        ? 0
        : Number(
            (
              sumLeverage / count
            ).toFixed(2)
          ),

    highLeverageTrades,

    highLeverageLossRate:
      highLeverageTrades === 0
        ? 0
        : Math.round(
            (
              highLeverageLosses /
              highLeverageTrades
            ) * 100
          ),

    highLeverageRate:
      count === 0
        ? 0
        : Math.round(
            (
              highLeverageTrades /
              count
            ) * 100
          ),
  };
}