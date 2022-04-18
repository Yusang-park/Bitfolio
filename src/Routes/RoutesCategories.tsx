interface SidebarCategory {
  name: string;
  path: string;
  hide?: boolean;
  href?: string;
}

export const sidebarCategories: Array<SidebarCategory> = [
  // { name: "Portfolio", path: "/portfolio" },
  { name: "CryptoRank", path: "/" },
  { name: "Dashboard", path: "/dashboard" },
  { name: "Exchanges", path: "/exchanges" },
  { name: "Indexes", path: "/indexes" },
  { name: "OpenChat", path: "/openchat" },
  { name: "Details", path: "/details", hide: false },
  { name: "CoinGecko", path: "", href: "https://www.coingecko.com/" },
  { name: "TradingView", path: "", href: "https://www.tradingview.com/" },
  { name: "Binance", path: "", href: "https://www.binance.com/" },
];
