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
    };