import { Dispatch } from "redux";
import { getCryptoObject } from "../Service/Apis";
const SET_CRYPTO_OBJ = "cryptoData/LoadCryptoList" as const;

//액션 생성 함수
export const setCryptoOBJ = (data: {}) => ({
  type: SET_CRYPTO_OBJ,
  payload: data,
}); //앞서 선언한 액션명

interface InitialState {
  cryptoList: {};
}

//초기 상태, 객체가 아니어도 된다.
const initialState: InitialState = {
  cryptoList: [],
};

export type CryptoDataDispatchType = ReturnType<typeof setCryptoOBJ>;

//리듀서
export default function cryptoDataReducer(
  state = initialState,
  action: CryptoDataDispatchType
): InitialState {
  switch (action.type) {
    case SET_CRYPTO_OBJ:
      return { ...state, cryptoList: action.payload };

    default:
      return state; //반드시 default는 state return
  }
}

export function fetchCryptoOBJ() {
  return async (dispatch: Dispatch<CryptoDataDispatchType>) => {
    let response = await getCryptoObject();
    return dispatch({ type: SET_CRYPTO_OBJ, payload: response });
  };
}
