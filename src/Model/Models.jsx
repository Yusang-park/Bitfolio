export class ExchangesModel {
  id;
  name;
  establishedYear;
  imageUrl;
  trustScore;
  trustRank;
  volumnBtc;
  country;
  constructor(data) {
    this.id = data.url;
    this.name = data.name;
    this.establishedYear =
      data.year_established !== null ? data.year_established + "" : "";
    this.imageUrl = data.image;
    this.trustScore = data.trust_score;
    this.volumnBtc = data.trade_volume_24h_btc;
    this.trustRank = data.trust_score_rank;
    this.country = data.country;
  }
}

export class CryptoSimpleModel {
  id;
  symbol;
  fullName;
  marketCapRank;
  constructor(data) {
    this.id = data.id;
    this.symbol = data.symbol.toUpperCase();
    this.fullName = data.localization ?? data.name; //Object
    this.marketCapRank = data.market_cap_rank ?? "";
  }
}

export class CryptoSummaryModel extends CryptoSimpleModel {
  imageUrl;
  price;
  pricePercent24h;
  marketCap;

  volume;
  currentSupply;
  total_supply;
  max_supply;

  constructor(data) {
    super(data);
    this.imageUrl = data.image ?? data.large;

    this.current_price = data.price ?? data.price_btc;

    this.marketCap = data.market_cap ?? "";

    this.volume = data.total_volume ?? "";
    this.price = "$" + data.current_price ?? data.price_btc;
    this.pricePercent24h = data.hasOwnProperty("price_change_percentage_24h")
      ? data.price_change_percentage_24h.toFixed(2) + "%"
      : "";
    this.currentSupply = data.circulating_supply ?? "";
    this.totalSupply = data.total_supply ?? "";
    this.maxSupply = data.max_supply ?? "";

    // this.marketCap = data.market_cap.toLocaleString() ?? "";

    // this.volume = data.total_volume.toLocaleString() ?? "";
    // this.price = "$" + data.current_price ?? data.price_btc;
    // this.pricePercent24h = data.hasOwnProperty("price_change_percentage_24h")
    //   ? data.price_change_percentage_24h.toFixed(2) + "%"
    //   : "";
    // this.currentSupply = data.circulating_supply.toLocaleString() ?? "";
    // this.totalSupply = data.total_supply ?? "";
    // this.maxSupply = data.max_supply ?? "";
  }
}

export class CryptoDetailModel extends CryptoSimpleModel {
  marketCap;
  imageUrl;
  genesisDate;
  price;
  priceHigh24h;
  priceLow24h;
  priceChange24h;
  pricePercent24h;
  priceChangePercentage1y;
  volume;
  homepage;
  blockchain_site;
  official_forrum_url;
  chat_url;
  announcement_url;
  twitter_screen_name;
  facebook_username;
  bitcointalk_thread_identifier;
  telegram_channel_identifier;
  subreddit_url;
  github_url;
  currentSupply;
  maxSupply;
  tradingViewCoinId;
  exchanges = [];
  description;
  constructor(data) {
    super(data);
    this.price = data.market_data.current_price.usd ?? "";
    this.volume = data.market_data.total_volume.usd ?? "";
    this.marketCap = data.market_data.market_cap.usd ?? "";
    this.priceHigh24h = data.market_data.high_24h.usd ?? "";
    this.priceLow24h = data.market_data.low_24h.usd ?? "";
    this.priceChange24h = data.market_data.price_change_24h ?? "";
    this.pricePercent24h =
      typeof data.market_data.price_change_percentage_24h === "number"
        ? data.market_data.price_change_percentage_24h.toFixed(2) + "%"
        : "";
    this.priceChangePercentage1y =
      data.market_data.price_change_percentage ?? "";

    this.currentSupply = Math.floor(data.market_data.circulating_supply) ?? "";

    this.maxSupply = data.market_data.max_supply
      ? Math.floor(data.market_data.max_supply)
      : "";

    this.imageUrl = data.image.small ?? "";
    this.imageUrl = data.image.large ?? "";
    this.genesisDate = data.genesis_date ?? "";
    this.homepage = data.links.homepage ?? "";
    this.blockchain_site = data.links.blockchain_site ?? "";
    this.official_forrum_url = data.links.official_forrum_url ?? "";
    this.chat_url = data.links.chat_url ?? "";
    this.announcement_url = data.links.announcement_url ?? "";
    this.twitter_screen_name = data.links.twitter_screen_name ?? "";
    this.facebook_username = data.links.facebook_username ?? "";
    this.bitcointalk_thread_identifier =
      data.links.bitcointalk_thread_identifier ?? "";
    this.telegram_channel_identifier =
      data.links.telegram_channel_identifier ?? "";
    this.subreddit_url = data.links.subreddit_url ?? "";
    this.github_url = data.links.repos_url.github ?? "";
    this.description = data.description;

    // ================================================================================================================
    try {
      data.tickers.forEach((e) => {
        this.exchanges.push({
          name: e.market.name,
          trade_url: e.trade_url,
          target: e.target,
          price: e.converted_last.usd,
        });
      });
    } catch (e) {}
    // ================================================================================================================
    let i = 0;
    try {
      const exceptedCurrncyUnit = ["GBP", "JPY", "EUR", "BTC"];
      while (true) {
        if (
          !supportingExchangesByTradingView.includes(
            data.tickers[i].market.name.toLowerCase()
          ) ||
          exceptedCurrncyUnit.includes(data.tickers[i].target)
        ) {
          i++;
          if (data.tickers.length === i) {
            this.tradingViewCoinId = null;
            break;
          }
        } else {
          this.tradingViewCoinId = `${data.tickers[i].market.name}:${data.tickers[i].base}${data.tickers[i].target}`;
          break;
        }
      }
    } catch (e) {}
  }
}

const supportingExchangesByTradingView = [
  "ascendex",
  "deribit",
  "binance",
  "exmo",
  "binanceus",
  "ftx",
  "bingbon",
  "gemini",
  "bitcoke",
  "glassnode",
  "bitfinex",
  "honeyswap",
  "bitflyer",
  "huobi",
  "bitget",
  "korbit",
  "bithumb",
  "kraken",
  "bitkub",
  "kucoin",
  "bitmex",
  "mercado",
  "bitpanda pro",
  "okcoin",
  "bitso",
  "okex",
  "bitstamp",
  "phemex",
  "bittrex",
  "poloniex",
  "btcyou",
  "sushiswap",
  "btse",
  "the rock trading",
  "bybit",
  "timex",
  "cex.io",
  "tradestation",
  "coinbase",
  "uniswap",
  "coinfloor",
  "upbit",
  "currencycom",
];

//  "id": "bitcoin",
//     "symbol": "btc",
//     "name": "Bitcoin",
//     "image": "https://assets.coingecko.com/coins/images/1/large/bitcoin.png?1547033579",
//     "current_price": 63822,
//     "market_cap": 1202965325006,
//     "market_cap_rank": 1,
//     "fully_diluted_valuation": 1340269559099,
//     "total_volume": 40494937921,
//     "high_24h": 64608,
//     "low_24h": 61705,
//     "price_change_24h": 1881.44,
//     "price_change_percentage_24h": 3.03747,
//     "market_cap_change_24h": 34009515770,
//     "market_cap_change_percentage_24h": 2.90939,
//     "circulating_supply": 18848650,
//     "total_supply": 21000000,
//     "max_supply": 21000000,
//     "ath": 64805,
//     "ath_change_percentage": -1.47921,
//     "ath_date": "2021-04-14T11:54:46.763Z",
//     "atl": 67.81,
//     "atl_change_percentage": 94055.82574,
//     "atl_date": "2013-07-06T00:00:00.000Z",
//     "roi": null,
//     "last_updated": "2021-10-20T02:23:04.273Z"
