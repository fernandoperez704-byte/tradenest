
export type GabyChartHighlight =
  | {
      id: string;
      type: "SUPPORT" | "RESISTANCE";
      low: number;
      high: number;
    }
  | {
      id: string;
      type: "TRENDLINE";
      direction: "BULLISH" | "BEARISH";
      upper: {
        startTime: number;
        startPrice: number;
        endTime: number;
        endPrice: number;
      };
      lower: {
        startTime: number;
        startPrice: number;
        endTime: number;
        endPrice: number;
      };
    }
  | {
      id: string;
      type: "CANDLE";
      time: number;
      high: number;
      low: number;
      reason?: string;
    }
  | {
      id: string;
      type: "SCENARIO_ARROW";
      direction: "UP" | "DOWN";
      startTime: number;
      startPrice: number;
      endTime: number;
      targetPrice: number;
      label?: string;
    };
