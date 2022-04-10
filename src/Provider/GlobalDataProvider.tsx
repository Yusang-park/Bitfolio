import React, { useReducer, createContext, useEffect } from "react";
import { getCryptoObject } from "../Service/Apis";

//to send Sortation Dropbox and SearchInputField data to ContentsContainer from UpperSpace
const initialState = {
  cryptoListObject: [],
};

const GlobalDataContext = createContext(initialState);

//==============================================================================//

function reducer(state: any, action: any) {
  switch (action.type) {
    case "setCryptoListObject":
      return {
        ...state,
        cryptoListObject: action.payload.cryptoListObject,
      };

    default:
  }
}

function GlobalDataProvider({ children }: { children: any }) {
  const [state, dispatch] = useReducer(reducer, initialState);
  useEffect(() => {
    setCryptoListObject();
  }, []);

  async function setCryptoListObject() {
    let response = await getCryptoObject();

    console.log(response);

    dispatch({
      type: "setCryptoListObject",
      payload: {
        cryptoListObject: response,
      },
    });
  }

  return (
    <GlobalDataContext.Provider value={{ ...state }}>
      {children}
    </GlobalDataContext.Provider>
  );
}

export { GlobalDataProvider, GlobalDataContext };
