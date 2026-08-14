export type GabyChartCommand = {
  action: "SHOW" | "PIN" | "REMOVE" | "CLEAR" | "NONE";

  target?:
    | "SUPPORT"
    | "RESISTANCE"
    | "BOTH"
    | "TRENDLINE";

  count?: number;

  persistent?: boolean;
};