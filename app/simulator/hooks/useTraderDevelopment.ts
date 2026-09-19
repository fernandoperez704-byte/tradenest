import { useEffect, useMemo, useRef } from "react";

import { buildTrendAnalysis } from "@/lib/traderDevelopment/trendAnalysis";
import { buildRiskAnalysis } from "@/lib/traderDevelopment/riskAnalysis";
import { buildEntryQualityAnalysis } from "@/lib/traderDevelopment/entryQualityAnalysis";
import { buildExitManagementAnalysis } from "@/lib/traderDevelopment/exitManagementAnalysis";
import { buildTimeframeAnalysis } from "@/lib/traderDevelopment/timeframeAnalysis";
import { reviewTrade } from "@/lib/tradeReview/reviewTrade";
import { db } from "../../firebase";
import { addDoc, collection } from "firebase/firestore";

const REPORT_INTERVAL = 20;

type UseTraderDevelopmentProps = {
  tradeReviews: any[];
  setTradeReviews: React.Dispatch<
    React.SetStateAction<any[]>
  >;
  tradeReviewsLoaded: boolean;
  userId: string | null;
  userName: string;
  onReportRequired?: () => void;
};

export function useTraderDevelopment({
  tradeReviews,
  setTradeReviews,
  tradeReviewsLoaded,
  userId,
  userName,
  onReportRequired,
}: UseTraderDevelopmentProps) {
  const previousReviewedTradeCountRef = useRef<number | null>(null);

const onReportRequiredRef = useRef(onReportRequired);

useEffect(() => {
  onReportRequiredRef.current = onReportRequired;
}, [onReportRequired]);

  const normalizedTradeReviews = useMemo(() => {
    return (tradeReviews || [])
      .map((item) => {
        const savedReview =
          item?.review ??
          item?.automaticReview ??
          item;

        const engine =
          savedReview?.engine &&
          typeof savedReview.engine === "object"
            ? savedReview.engine
            : null;

        return {
          ...savedReview,
          ...(engine ?? {}),

          engine: engine ?? savedReview?.engine,

          snapshotId:
            savedReview?.snapshotId ??
            item?.snapshotId,

          createdAt:
            savedReview?.createdAt ??
            item?.createdAt,

          userId:
            savedReview?.userId ??
            item?.userId,

          mode:
            item?.mode ??
            savedReview?.mode ??
            engine?.mode ??
            null,

          coin:
            item?.coin ??
            savedReview?.coin ??
            engine?.coin ??
            null,

          leverage:
            item?.leverage ??
            savedReview?.leverage ??
            1,

          margin:
            item?.margin ??
            savedReview?.margin ??
            0,

          positionSize:
            item?.positionSize ??
            savedReview?.positionSize ??
            0,

          balanceAtEntry:
            item?.balanceAtEntry ??
            savedReview?.balanceAtEntry ??
            savedReview?.tradeContext?.account?.balanceAtEntry ??
            0,

          amount:
            item?.amount ??
            savedReview?.amount ??
            0,

          tradeContext:
            item?.tradeContext ??
            savedReview?.tradeContext ??
            null,

          managementReview:
            savedReview?.management ??
            savedReview?.managementReview ??
            engine?.management ??
            engine?.managementReview ??
            null,
        };
      })
      .filter((review) => {
        const result = String(
          review?.result ??
            review?.outcome ??
            review?.automaticReview?.result ??
            ""
        ).toUpperCase();

        return result !== "" && result !== "OPEN";
      });
  }, [tradeReviews]);

  const traderDevelopmentEngines = useMemo(
    () => ({
      trendBias: buildTrendAnalysis(
        normalizedTradeReviews
      ),

      riskAllocation: buildRiskAnalysis(
        normalizedTradeReviews
      ),

      entryQuality: buildEntryQualityAnalysis(
        normalizedTradeReviews
      ),

      exitManagement: buildExitManagementAnalysis(
        normalizedTradeReviews
      ),

      timeframe: buildTimeframeAnalysis(
        normalizedTradeReviews
      ),
    }),
    [normalizedTradeReviews]
  );

  const reviewedTradeCount =
    normalizedTradeReviews.length;

useEffect(() => {
  if (!tradeReviewsLoaded) return;

  const previousCount =
    previousReviewedTradeCountRef.current;

  // First loaded count becomes the baseline.
  if (previousCount === null) {
    previousReviewedTradeCountRef.current =
      reviewedTradeCount;
    return;
  }

  previousReviewedTradeCountRef.current =
    reviewedTradeCount;

  // Only react when a new completed review was added.
  if (reviewedTradeCount <= previousCount) return;

  // Open at 20, 40, 60, 80...
  if (
    reviewedTradeCount >= REPORT_INTERVAL &&
    reviewedTradeCount % REPORT_INTERVAL === 0
  ) {
    onReportRequiredRef.current?.();
  }
}, [reviewedTradeCount, tradeReviewsLoaded]);

function registerStockReview(trade: {
  symbol: string;
  quantity: number;
  entryPrice: number;
  exitPrice: number;
  pnl: number;
  tradeContext: any;
}) {
  const snapshotId = crypto.randomUUID();

  const automaticReview = {
    ...reviewTrade({
      mode: "STOCKS",
      side: "LONG",
      entryPrice: trade.entryPrice,
      exitPrice: trade.exitPrice,
      pnl: trade.pnl,
      grossPnl: trade.pnl,
      totalFees: 0,
      stopLoss: null,
      takeProfit: null,
      tradeContext: trade.tradeContext,
    }),
    snapshotId,
  };

  const savedReview = {
    snapshotId,
    mode: "STOCKS",
    coin: trade.symbol,
    side: "LONG",
    amount: trade.entryPrice * trade.quantity,
    tradeContext: trade.tradeContext ?? null,
    review: automaticReview,
  };

  setTradeReviews((prev) => [
    savedReview,
    ...prev,
  ]);

  if (userId) {
    void addDoc(collection(db, "tradeReviews"), {
      userId,
      userName,
      ...savedReview,
      tradeResult: trade.pnl > 0 ? "PROFIT" : trade.pnl < 0 ? "LOSS" : "BREAKEVEN",
      created: new Date().toISOString(),
    }).catch((error) => {
      console.error(
        "Failed to save Stock trade review:",
        error
      );
    });
  }

  return {
    snapshotId,
    automaticReview,
  };
}

return {
  normalizedTradeReviews,
  traderDevelopmentEngines,
  reviewedTradeCount,
  registerStockReview,
};

}