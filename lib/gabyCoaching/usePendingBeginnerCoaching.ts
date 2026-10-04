"use client";

import { useEffect, useRef } from "react";

type PendingBeginnerCoachingEvent = {
  snapshotId: string;
  concept: string;
  reason: string;
  createdAt: string;
};

type UsePendingBeginnerCoachingProps = {
  isPaid: boolean;
  gabyMemoryLoaded: boolean;
  loading: boolean;
  askGaby: (
    customQuestion?: string,
    reviewOverride?: any,
    options?: { internal?: boolean }
  ) => Promise<void>;
  onConceptTaught: (concept: string) => void;
};

function getConceptLabel(concept: string) {
  switch (concept) {
    case "RISK_MANAGEMENT":
      return "Risk management";
    case "STOP_LOSS":
      return "Stop loss";
    case "MARKET_DIRECTION":
      return "Market direction";
    case "MARKET_STRUCTURE":
      return "Market structure";
    case "PRICE_LOCATION":
      return "Price location";
    default:
      return concept;
  }
}

export function usePendingBeginnerCoaching({
  isPaid,
  gabyMemoryLoaded,
  loading,
  askGaby,
  onConceptTaught,
}: UsePendingBeginnerCoachingProps) {
  const consumedEventRef = useRef<string | null>(null);

  useEffect(() => {
    if (!isPaid || !gabyMemoryLoaded || loading) return;

    const rawEvent = localStorage.getItem(
      "tradenestx-pending-beginner-coaching"
    );

    if (!rawEvent) return;

    let event: PendingBeginnerCoachingEvent;

    try {
      event = JSON.parse(rawEvent);
    } catch {
      localStorage.removeItem(
        "tradenestx-pending-beginner-coaching"
      );
      return;
    }

    if (!event?.snapshotId || !event?.concept) {
      localStorage.removeItem(
        "tradenestx-pending-beginner-coaching"
      );
      return;
    }

    if (consumedEventRef.current === event.snapshotId) {
      return;
    }

    consumedEventRef.current = event.snapshotId;

    localStorage.removeItem(
      "tradenestx-pending-beginner-coaching"
    );

    onConceptTaught(
      getConceptLabel(event.concept)
    );

    void askGaby(
      `Beginner coaching opportunity: ${event.concept}. ${event.reason} Briefly teach this concept because I just completed a reviewed trade.`,
      undefined,
      { internal: true }
    );
  }, [
    isPaid,
    gabyMemoryLoaded,
    loading,
    askGaby,
    onConceptTaught,
  ]);
}