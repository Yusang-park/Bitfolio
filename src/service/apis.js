import axios from "axios";
import { apiKey } from "../api_config";
import { CryptoSummaryData } from "./cryptoClass";



export async function getCryptoSummaryDataList(pageIndex) {
    let res = [];
    const response = await axios.get
    (`https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=10&page=${pageIndex}&sparkline=false`);
    response.data.forEach(e => res.push(new CryptoSummaryData(e)));
    return res;
}

export async function getCryptoObject() {
    let res = new Object();
    const response = await axios.get
        (`https://api.coingecko.com/api/v3/coins/list`);
    response.data.forEach((e,index) => {
        let str = [e.name.replaceAll(" ", "").toLowerCase(), e.symbol.replaceAll(" ", "").toLowerCase()];
        str.forEach((s)=>{
            let root = res;
            for (let i = 1; i <= s.length; i++) {
                if (i === s.length) {
                    root[s.substring(0, i)] = root[s.substring(0, i)] ?? {}
                    Object.assign(root[s.substring(0, i)], { '*key': e });
                } else if (!root.hasOwnProperty(s.substring(0, i))) {
                    root[s.substring(0, i)] = {};
                }
                root = root[s.substring(0, i)];
            }
        });
    });
    return res;
}

export async function getCryptoInforamtionClass(id) {
    let res = [];
    const response = await axios.get(`https://api.coingecko.com/api/v3/coins/${id}`);
    
    
}