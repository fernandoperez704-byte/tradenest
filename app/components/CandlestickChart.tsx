"use client";

import dynamic from "next/dynamic";

const Chart = dynamic(() => import("react-apexcharts"), {
  ssr: false,
});

type Candle = {
  x: Date;
  y: [number, number, number, number];
};

export default function CandlestickChart() {
  const series = [
    {
      data: [
        { x: new Date("2026-01-01"), y: [100, 110, 95, 108] },
        { x: new Date("2026-01-02"), y: [108, 115, 102, 104] },
        { x: new Date("2026-01-03"), y: [104, 120, 101, 118] },
        { x: new Date("2026-01-04"), y: [118, 122, 112, 116] },
        { x: new Date("2026-01-05"), y: [116, 130, 114, 128] },
      ] as Candle[],
    },
  ];

  const options = {
    chart: {
      type: "candlestick" as const,
      background: "#0f0f10",
      toolbar: { show: true },
    },
    theme: {
      mode: "dark" as const,
    },
    xaxis: {
      type: "datetime" as const,
    },
    yaxis: {
      tooltip: { enabled: true },
    },
  };

  return (
    <Chart
      options={options}
      series={series}
      type="candlestick"
      height={420}
    />
  );
}