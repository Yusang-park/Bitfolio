import React, { useReducer, createContext } from "react";

//to send Sortation Dropbox and SearchInputField data to ContentsContainer from UpperSpace
const initialState = {
    action: null,
    keyword: ""
};

const UpperContext = createContext({
    action: null,
    keyword: "",
    onSearch: () => { },
    onSortation:() => { },
});

//==============================================================================//

function reducer(state, action) {
    switch (action.type) {
        case "onSearch":
            return {
                ...state,
                action : "onSearch",
        onSearch: action.payload
        
      };

    case "setWeather":
      //json 호출 후 날씨별 filtering
      let res = {};

      for (const [key, value] of Object.entries(dataJson)) {
        let tempArray = Object.values(value).filter(
          (e) =>
            action.payload === "A" ? true :
            e["필터"] === action.payload || "B"
        );
        res[key] = tempArray.reduce(
          (ac, a, i) => ({
            ...ac,
            [i]: a,
          }),
          {}
        );
      }
      // console.log(res);

      // dataJson.forEach((key, value) => console.log(key));

      return {
        ...state,
        weather: action.payload,
        data: res,
      };

    default:
  }
}

function UpperProvider(props, children) {
  const [state, dispatch] = useReducer(reducer, initialState);

  function setSearchKeyword(keyword) {
    dispatch({
      type: "setWeather",
      payload: weather,
    });
  }

  return (
    <UpperContext.Provider
      value={{ weather: state.user, data: state.data, setWeather }}
      {...props}
    />
  );
}

export { UpperProvider as UpperProvider, UpperContext as UpperContext };