import { faChalkboardTeacher } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
import { apiKey } from "../api_config";
import { CryptoSummaryData, CryptoDetailData } from "./Models";

const providerUrl = "https://api.coingecko.com/api/v3";

export async function getCryptoSummaryDataList(pageIndex) {
  let res = [];
  try {
    const response = await axios.get(
      `${providerUrl}/coins/markets?vScurrency=usd&order=market_cap_desc&per_page=10&page=${pageIndex}&sparkline=false`
    );
    response.data.forEach((e) => res.push(new CryptoSummaryData(e)));
  } catch (e) {}
  return res;
}

export async function getCryptoObject() {
  let res = {};
  try {
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
  } catch (e) {}
  return res;
}

export async function getCryptoDetails(id) {
  try {
    const response = await axios.get(`${providerUrl}/coins/${id}`);

    return new CryptoDetailData(response.data);
  } catch (e) {
    return null;
  }
}

export async function getCryptoPricesList(idList) {
  let s = idList.join(",");
  try {
    const response = await axios.get(
      `${providerUrl}/simple/price?ids=${s}&vScurrencies=usd`
    );
    // console.log(response.data);
    return response.data;
  } catch (e) {
    return null;
  }
}
