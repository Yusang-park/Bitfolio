import React from "react";

import { TradingViewStockChartWidget } from "react-tradingview-components";

export const Chart = ({ chartSize, coin }) => {
  return (
    <TradingViewStockChartWidget
      symbol={coin}
      theme="Dark"
      range="12m"
      width={chartSize.width}
      height={chartSize.height * 0.9}
    />
  );
};
