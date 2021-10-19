import axios from "axios";
import { apiKey } from "../api_config";
import { CryptoInformation } from "./crypto_info_class";



export async function getCryptoLank(pageIndex) {
    let res = [];
    
    const response = await axios.get("https://min-api.cryptocompare.com/data/top/mktcapfull?limit=10&tsym=USD&api_key=${apiKey}",
        {
            params: {
                page: pageIndex,
            }
        }
    );
    response.data.Data.forEach(e => res.push(new CryptoInformation(e)));
    return res;
}