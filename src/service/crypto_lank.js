import axios from "axios";
import { apiKey } from "../api_config";
import { CryptoInformation } from "./crypto_info_class";



export async function getCryptoLank(pageIndex) {
    let res = [];
    
    const response = await axios.get
    (`https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=10&page=${pageIndex}&sparkline=false`);
    console.log(response);
    response.data.forEach(e => res.push(new CryptoInformation(e)));
    return res;
}