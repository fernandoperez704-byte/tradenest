import { NextRequest, NextResponse } from "next/server";

import admin from "firebase-admin";

import {
  getMarketIntelligence,
  getMultiTimeframeAnalysis,
  getEntryQuality,
} from "@/lib/gabyMarketIntelligence";

import {
  buildGabyAutoTradeDecision,
  validateGabyAutoTradeDecision,
  buildGabyAutoTradePosition,
  getGabyAutoTradeCloseReason,
  buildGabyAutoTradeClosedPosition,
  GABY_AUTO_TRADE_CONFIG,
  type GabyAutoTradePosition,
} from "@/app/simulator/autoTrade/gabyAutoTrader";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const AUTO_TRADE_SYMBOL = "BTC";
const AUTO_TRADE_TIMEFRAME = "15M";

const AUTO_TRADE_HIGHER_TIMEFRAMES = [
  "1H",
  "4H",
] as const;

const coinbaseProductMap: Record<string, string> = {
  BTC: "BIP-20DEC30-CDE",
  ETH: "ETP-20DEC30-CDE",
  SOL: "SLP-20DEC30-CDE",
  XRP: "XPP-20DEC30-CDE",
  DOGE: "DOP-20DEC30-CDE",
  ADA: "ADP-20DEC30-CDE",
  BNB: "BNB-20DEC30-CDE",
  LINK: "LNP-20DEC30-CDE",
  AVAX: "AVP-20DEC30-CDE",
  SUI: "SUP-20DEC30-CDE",
  HBAR: "HEP-20DEC30-CDE",
  LTC: "LCP-20DEC30-CDE",
  BCH: "BCP-20DEC30-CDE",
  DOT: "POP-20DEC30-CDE",
  AAVE: "AVE-20DEC30-CDE",
  NEAR: "NER-20DEC30-CDE",
  SHIB: "SHP-20DEC30-CDE",
  PEPE: "PEP-20DEC30-CDE",
};

async function getCoinbaseFuturesPrice(
  symbol: string
) {
  const productId =
    coinbaseProductMap[symbol];

  if (!productId) {
    throw new Error(
      `Unsupported Auto Trade symbol: ${symbol}`
    );
  }

  const response = await fetch(
    "https://api.coinbase.com/api/v3/brokerage/market/products?product_type=FUTURE&get_all_products=true",
    {
      cache: "no-store",
      headers: {
        "Cache-Control": "no-cache",
        "User-Agent": "TradeNestX",
      },
    }
  );

  if (!response.ok) {
    throw new Error(
      "Coinbase futures prices failed"
    );
  }

  const data = await response.json();

  const product = (data.products || []).find(
    (item: any) =>
      item.product_id === productId
  );

  const price = Number(product?.price);

  if (!Number.isFinite(price) || price <= 0) {
    throw new Error(
      `No valid Coinbase futures price for ${symbol}`
    );
  }

  return price;
}

const granularityMap: Record<string, string> = {
  "1M": "ONE_MINUTE",
  "5M": "FIVE_MINUTE",
  "15M": "FIFTEEN_MINUTE",
  "1H": "ONE_HOUR",
  "4H": "FOUR_HOUR",
  "1D": "ONE_DAY",
};

const timeframeSecondsMap: Record<string, number> = {
  "1M": 60,
  "5M": 300,
  "15M": 900,
  "1H": 3600,
  "4H": 14400,
  "1D": 86400,
};

async function getCoinbaseFuturesCandles(
  symbol: string,
  timeframe: string
) {
  const productId =
    coinbaseProductMap[symbol];

  const granularity =
    granularityMap[timeframe];

  const timeframeSeconds =
    timeframeSecondsMap[timeframe];

  if (
    !productId ||
    !granularity ||
    !timeframeSeconds
  ) {
    throw new Error(
      `Unsupported Auto Trade market: ${symbol} ${timeframe}`
    );
  }

  const endTime =
    Math.floor(Date.now() / 1000);

  const recentStart =
    endTime - timeframeSeconds * 299;

  const olderEnd =
    recentStart - timeframeSeconds;

  const olderStart =
    olderEnd - timeframeSeconds * 299;

  const fetchCandles = async (
    start: number,
    end: number
  ) => {
    const response = await fetch(
      `https://api.coinbase.com/api/v3/brokerage/market/products/${productId}/candles` +
        `?start=${start}&end=${end}&granularity=${granularity}&limit=300`,
      {
        cache: "no-store",
        headers: {
          "User-Agent": "TradeNestX",
        },
      }
    );

    if (!response.ok) {
      throw new Error(
        "Coinbase futures candles failed"
      );
    }

    const data = await response.json();

    return Array.isArray(data.candles)
      ? data.candles
      : [];
  };

  const [olderCandles, recentCandles] =
    await Promise.all([
      fetchCandles(olderStart, olderEnd),
      fetchCandles(recentStart, endTime),
    ]);

  return [
    ...olderCandles,
    ...recentCandles,
  ]
    .map((item: any) => ({
      time: String(Number(item.start) * 1000),
      price: Number(item.close),
      low: Number(item.low),
      high: Number(item.high),
      open: Number(item.open),
      close: Number(item.close),
      volume: Number(item.volume),
    }))
    .sort(
      (a, b) =>
        Number(a.time) - Number(b.time)
    )
    .slice(-600);
}

async function getAutoTradeMarketAnalysis() {
  const primaryCandles =
    await getCoinbaseFuturesCandles(
      AUTO_TRADE_SYMBOL,
      AUTO_TRADE_TIMEFRAME
    );

  const primaryIntelligence =
    getMarketIntelligence(primaryCandles);

  const timeframeData: Record<string, any> = {
    [AUTO_TRADE_TIMEFRAME]: {
      direction: primaryIntelligence.direction,
      momentum:
        primaryIntelligence.momentumAnalysis?.momentum,
      conviction:
        primaryIntelligence.marketConviction,
    },
  };

  for (const timeframe of AUTO_TRADE_HIGHER_TIMEFRAMES) {
    const candles =
      await getCoinbaseFuturesCandles(
        AUTO_TRADE_SYMBOL,
        timeframe
      );

    const intelligence =
      getMarketIntelligence(candles);

    timeframeData[timeframe] = {
      direction: intelligence.direction,
      momentum:
        intelligence.momentumAnalysis?.momentum,
      conviction:
        intelligence.marketConviction,
    };
  }

  const multiTimeframeAnalysis =
    getMultiTimeframeAnalysis(
      timeframeData,
      AUTO_TRADE_TIMEFRAME
    );

  const currentPrice =
    primaryCandles[
      primaryCandles.length - 1
    ]?.close;

  if (
    !Number.isFinite(currentPrice) ||
    currentPrice <= 0
  ) {
    throw new Error(
      "No valid Auto Trade candle price"
    );
  }

  const entryQuality =
    getEntryQuality(
      currentPrice,
      primaryIntelligence.nearestSupport,
      primaryIntelligence.nearestResistance,
      primaryIntelligence.direction
    );

  return {
    currentPrice,
    marketIntelligence:
      primaryIntelligence,
    multiTimeframeAnalysis,
    entryQuality,
  };
}

function getFirebaseAdmin() {
  if (!admin.apps.length) {
    const projectId =
      process.env.FIREBASE_PROJECT_ID;

    const clientEmail =
      process.env.FIREBASE_CLIENT_EMAIL;

    const privateKey =
      process.env.FIREBASE_PRIVATE_KEY?.replace(
        /\\n/g,
        "\n"
      );

    if (
      !projectId ||
      !clientEmail ||
      !privateKey
    ) {
      throw new Error(
        "Firebase Admin environment variables are missing."
      );
    }

    admin.initializeApp({
      credential: admin.credential.cert({
        projectId,
        clientEmail,
        privateKey,
      }),
    });
  }

  return admin.firestore();
}

function isAuthorized(
  request: NextRequest
) {
  const cronSecret =
    process.env.CRON_SECRET;

  if (!cronSecret) {
    return (
      process.env.NODE_ENV !==
      "production"
    );
  }

  const authorization =
    request.headers.get(
      "authorization"
    );

  return (
    authorization ===
    `Bearer ${cronSecret}`
  );
}

export async function GET(
  request: NextRequest
) {
  if (!isAuthorized(request)) {
    return NextResponse.json(
      {
        success: false,
        error: "Unauthorized",
      },
      {
        status: 401,
      }
    );
  }

try {
  const db = getFirebaseAdmin();

  const openTradesSnapshot =
    await db
      .collection("gabyAutoTrades")
      .where("status", "==", "OPEN")
      .limit(1)
      .get();

  const openTrade =
    openTradesSnapshot.empty
      ? null
      : {
          id: openTradesSnapshot.docs[0].id,
          ...openTradesSnapshot.docs[0].data(),
        };

let currentPrice: number | null = null;
let closeReason = null;
let marketAnalysis = null;
let decision = null;
let validation = null;
let proposedPosition: GabyAutoTradePosition | null = null;

if (!openTrade) {
  marketAnalysis =
    await getAutoTradeMarketAnalysis();

  currentPrice =
    marketAnalysis.currentPrice;

  decision =
    buildGabyAutoTradeDecision({
      mode: "COINBASE_FUTURES",
      symbol: AUTO_TRADE_SYMBOL,
      price: currentPrice,
      selectedLeverage: 1,

      marketIntelligence:
        marketAnalysis.marketIntelligence,

      multiTimeframeAnalysis:
        marketAnalysis.multiTimeframeAnalysis,

      movingAverageAnalysis: null,
      structureAnalysis: null,
      priceLocation: null,

      entryQuality:
        marketAnalysis.entryQuality,
    });

  console.log(
    "GABY SERVER AUTO TRADE DECISION:",
    decision
  );

validation =
  validateGabyAutoTradeDecision(
    decision,
    GABY_AUTO_TRADE_CONFIG.startingBalance,
    AUTO_TRADE_SYMBOL,
    1
  );

console.log(
  "GABY SERVER AUTO TRADE VALIDATION:",
  validation
);

if (
  validation.valid &&
  validation.economics
) {
  proposedPosition =
    buildGabyAutoTradePosition(
      decision,
      validation.economics,
      AUTO_TRADE_SYMBOL
    );

  console.log(
    "GABY SERVER AUTO TRADE PROPOSED POSITION:",
    proposedPosition
  );

if (proposedPosition) {
  const position = proposedPosition;

  const lockRef =
    db
      .collection("gabyAutoTradeState")
      .doc("v1");

  let openedTradeId: string | null = null;

  await db.runTransaction(
    async (transaction) => {
      const lockSnapshot =
        await transaction.get(lockRef);

      const activeTradeId =
        lockSnapshot.exists
          ? lockSnapshot.data()?.activeTradeId
          : null;

      if (activeTradeId) {
        return;
      }

      const tradeRef =
        db
          .collection("gabyAutoTrades")
          .doc();

      transaction.set(tradeRef, {
        strategyVersion: "v1",

        status: "OPEN",

        symbol: position.symbol,
        side: position.side,

        contracts: position.contracts,
        quantity: position.quantity,
        positionSize:
          position.positionSize,

        entryPrice:
          position.entryPrice,
        stopLoss:
          position.stopLoss,
        takeProfit:
          position.takeProfit,
        liquidationPrice:
          position.liquidationPrice,

        marginRequired:
          position.marginRequired,
        effectiveLeverage:
          position.effectiveLeverage,
        marginSession:
          position.marginSession,

        entryFee:
          position.entryFee,

        openedAt:
          position.openedAt,

        createdAt:
          admin.firestore.FieldValue.serverTimestamp(),
      });

      transaction.set(
        lockRef,
        {
          activeTradeId: tradeRef.id,
          updatedAt:
            admin.firestore.FieldValue.serverTimestamp(),
        },
        { merge: true }
      );

      openedTradeId = tradeRef.id;
    }
  );

  if (openedTradeId) {
    console.log(
      "GABY SERVER AUTO TRADE OPENED:",
      openedTradeId
    );
  } else {
    console.log(
      "GABY SERVER AUTO TRADE SKIPPED: active trade already exists."
    );
  }
}
}

}

if (openTrade) {
  currentPrice =
    await getCoinbaseFuturesPrice(
      String((openTrade as any).symbol)
    );

  closeReason =
    getGabyAutoTradeCloseReason(
      openTrade as unknown as GabyAutoTradePosition,
      currentPrice
    );

if (closeReason) {
  const closedPosition =
    buildGabyAutoTradeClosedPosition(
      openTrade as unknown as GabyAutoTradePosition,
      currentPrice,
      closeReason
    );

const tradeRef =
  db
    .collection("gabyAutoTrades")
    .doc(openTrade.id);

const lockRef =
  db
    .collection("gabyAutoTradeState")
    .doc("v1");

await db.runTransaction(
  async (transaction) => {
    transaction.update(tradeRef, {
      status: "CLOSED",

      exitPrice: closedPosition.exitPrice,
      exitFee: closedPosition.exitFee,

      grossPnl: closedPosition.grossPnl,
      netPnl: closedPosition.netPnl,

      closeReason: closedPosition.reason,
      closedAt: closedPosition.closedAt,

      updatedAt:
        admin.firestore.FieldValue.serverTimestamp(),
    });

    transaction.set(
      lockRef,
      {
        activeTradeId: null,
        updatedAt:
          admin.firestore.FieldValue.serverTimestamp(),
      },
      { merge: true }
    );
  }
);

}

}

const stateRef =
  db
    .collection("gabyAutoTradeState")
    .doc("v1");

const lastDecision =
  openTrade
    ? "MONITORING_POSITION"
    : proposedPosition
      ? "TRADE_READY"
      : decision?.action ?? "NO_TRADE";

const lastReason =
  openTrade
    ? closeReason
      ? String(closeReason)
      : "Open position being monitored"
    : validation?.valid
      ? "Setup passed validation"
      : validation?.reason ?? decision?.reason ?? "No valid trade setup";

await stateRef.set(
  {
    lastCheck:
      admin.firestore.FieldValue.serverTimestamp(),
    lastDecision,
    lastReason,
  },
  { merge: true }
);

return NextResponse.json({
  success: true,
  openTrade,
  currentPrice,
  closeReason,
  marketAnalysis,
  decision,
  validation,
  proposedPosition,
});

} catch (error) {
  console.error(
    "Gaby Auto Trade server runner failed:",
    error
  );

  return NextResponse.json(
    {
      success: false,
      error:
        error instanceof Error
          ? error.message
          : "Unknown error",
    },
    {
      status: 500,
    }
  );
}

}