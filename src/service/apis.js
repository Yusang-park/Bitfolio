import axios from "axios";
import { apiKey } from "../api_config";
import { CryptoSummaryData, CryptoDetailData } from "./Models";

const providerUrl = "https://api.coingecko.com/api/v3";

export async function getCryptoSummaryDataList(pageIndex) {
  let res = [];
  const response = await axios.get(
    `${providerUrl}/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=10&page=${pageIndex}&sparkline=false`
  );
  response.data.forEach((e) => res.push(new CryptoSummaryData(e)));
  return res;
}

export async function getCryptoObject() {
  let res = {};
  const response = await axios.get(`${providerUrl}/coins/list`);
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
  return res;
}

export async function getCryptoDetails(id) {
  const response = await axios.get(`${providerUrl}/coins/${id}`);

  return new CryptoDetailData(response.data);
}

export async function getCryptoPricesList(idList) {
  let s = idList.join(",");

  const response = await axios.get(
    `${providerUrl}/simple/price?ids=${s}&vs_currencies=usd`
  );
  // console.log(response.data);
  return response.data;
}
