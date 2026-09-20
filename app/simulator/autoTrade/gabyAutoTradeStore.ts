import {
  addDoc,
  collection,
  doc,
  serverTimestamp,
  updateDoc,
} from "firebase/firestore";

import { db } from "../../firebase";

import type {
  GabyAutoTradePosition,
  GabyAutoTradeClosedPosition,
} from "./gabyAutoTrader";

export async function saveGabyAutoTradeOpenPosition(
  position: GabyAutoTradePosition
) {
  const tradeRef = await addDoc(
    collection(db, "gabyAutoTrades"),
    {
      strategyVersion: "v1",

      status: "OPEN",

      symbol: position.symbol,
      side: position.side,

      contracts: position.contracts,
      quantity: position.quantity,
      positionSize: position.positionSize,

      entryPrice: position.entryPrice,
      stopLoss: position.stopLoss,
      takeProfit: position.takeProfit,
      liquidationPrice: position.liquidationPrice,

      marginRequired: position.marginRequired,
      effectiveLeverage: position.effectiveLeverage,
      marginSession: position.marginSession,

      entryFee: position.entryFee,

      openedAt: position.openedAt,
      createdAt: serverTimestamp(),
    }
  );

  return tradeRef.id;
}

export async function saveGabyAutoTradeClosedPosition(
  firestoreTradeId: string,
  closedPosition: GabyAutoTradeClosedPosition
) {
  const tradeRef = doc(
    db,
    "gabyAutoTrades",
    firestoreTradeId
  );

  await updateDoc(tradeRef, {
    status: "CLOSED",

    exitPrice: closedPosition.exitPrice,
    exitFee: closedPosition.exitFee,

    grossPnl: closedPosition.grossPnl,
    netPnl: closedPosition.netPnl,

    closeReason: closedPosition.reason,
    closedAt: closedPosition.closedAt,

    updatedAt: serverTimestamp(),
  });
}