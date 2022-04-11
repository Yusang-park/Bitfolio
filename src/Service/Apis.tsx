import axios from "axios";
import { CryptoSummaryData, CryptoDetailData } from "./Models";

const cryptoProviderURL = "https://api.coingecko.com/api/v3";
const fearAndGreedIndexProviderURL = "https://api.alternative.me/fng/?limit=";

export enum sortCryptoRank {
  MarketCap,
  Volumn,
}

export async function getCryptoSummaryDataList(
  pageIndex: number,
  sort: sortCryptoRank
): Promise<Array<any>> {
  let orderTranslated =
    sort === sortCryptoRank.MarketCap ? "market_cap_desc" : "volume_desc";

  let res: Array<any> = [];
  try {
    const response = await axios.get<any>(
      `${cryptoProviderURL}/coins/markets?vs_currency=usd&order=${orderTranslated}&per_page=10&page=${pageIndex}&sparkline=false`
    );
    response.data.forEach((e: any) => res.push(new CryptoSummaryData(e)));
  } catch (e) {}
  return res;
}

export async function getCryptoObject() {
  let res = {};
  try {
    const response = await axios.get<any>(`${cryptoProviderURL}/coins/list`);
    response.data.forEach((e: any, index: any) => {
      let str = [
        e.name.replaceAll(" ", "").toLowerCase(),
        e.symbol.replaceAll(" ", "").toLowerCase(),
      ];
      str.forEach((s) => {
        let root: any = res;
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

export async function getCryptoDetails(id: string) {
  try {
    const response = await axios.get(`${cryptoProviderURL}/coins/${id}`);

    return new CryptoDetailData(response.data);
  } catch (e) {
    return null;
  }
}

export async function getCryptoPricesList(
  idList: Array<any>
): Promise<object | null> {
  let s = idList.join(",");
  try {
    const response = await axios.get<any>(
      `${cryptoProviderURL}/simple/price?ids=${s}&vs_currencies=usd`
    );

    return response?.data;
  } catch (e) {
    return null;
  }
}

export async function getFearAndGreedIndex() {
  try {
    const response = await axios.get<any>(`${fearAndGreedIndexProviderURL}1`);

    return parseInt(response.data["data"][0]["value"]);
  } catch (e) {
    return null;
  }
}
