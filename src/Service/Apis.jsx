import axios from "axios";
import { CryptoSummaryData, CryptoDetailData } from "./Models";

const cryptoProviderURL = "https://api.coingecko.com/api/v3";
const fearAndGreedIndexProviderURL = "https://api.alternative.me/fng/?limit=";

export async function getCryptoSummaryDataList(pageIndex, order) {
  console.log(order);
  let orderTranslated =
    order === "MarketCap" ? "market_cap_desc" : "volume_desc";

  let res = [];
  try {
    const response = await axios.get(
      `${cryptoProviderURL}/coins/markets?vs_currency=usd&order=${orderTranslated}&per_page=10&page=${pageIndex}&sparkline=false`
    );
    response.data.forEach((e) => res.push(new CryptoSummaryData(e)));
  } catch (e) {}
  return res;
}

export async function getCryptoObject() {
  let res = {};
  try {
    const response = await axios.get(`${cryptoProviderURL}/coins/list`);
    response.data.forEach((e, index) => {
      let str = [
        e.name.replaceAll(" ", "").toLowerCase(),
        e.symbol.replaceAll(" ", "").toLowerCase(),
      ];
      str.forEach((s) => {
        let root = res;
        for (let i = 1; i <= s.length; i++) {
          if (i === s.length) {
            root[s.substring(0, i)] = root[s.substring(0, i)] ?? {};
            Object.assign(root[s.substring(0, i)], { "*key": e });
          } else if (!root.hasOwnProperty(s.substring(0, i))) {
            root[s.substring(0, i)] = {};
          }
          root = root[s.substring(0, i)];
        }
      });
    });
  } catch (e) {}
  return res;
}

export async function getCryptoDetails(id) {
  try {
    const response = await axios.get(`${cryptoProviderURL}/coins/${id}`);

    return new CryptoDetailData(response.data);
  } catch (e) {
    return null;
  }
}

export async function getCryptoPricesList(idList) {
  let s = idList.join(",");
  try {
    const response = await axios.get(
      `${cryptoProviderURL}/simple/price?ids=${s}&vs_currencies=usd`
    );

    return response.data;
  } catch (e) {
    return null;
  }
}

export async function getFearAndGreedIndex() {
  try {
    const response = await axios.get(`${fearAndGreedIndexProviderURL}1`);

    return parseInt(response.data["data"][0]["value"]);
  } catch (e) {
    return null;
  }
}
