import React, { useReducer, createContext } from "react";

//to send Sortation Dropbox and SearchInputField data to ContentsContainer from UpperSpace
const initialState = {
  action: null,
  keyword: "",
};

const UpperContext = createContext({
  action: null,
  keyword: "",
  onSearch: () => {},
  onSortation: () => {},
});

//==============================================================================//

function reducer(state, action) {
  switch (action.type) {
    case "onSearch":
      return {
        ...state,
        action: "onSearch",
        onSearch: action.payload,
      };
    default:
  }
}

function UpperProvider(props, children) {
  const [state, dispatch] = useReducer(reducer, initialState);

  function setSearchKeyword(keyword) {
    dispatch({
      type: "onSearch",
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
