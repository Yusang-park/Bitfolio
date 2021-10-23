import React, { useReducer, createContext } from "react";

//to send Sortation Dropbox and SearchInputField data to ContentsContainer from UpperSpace
const initialState = {
  isLoggedIn: null,
};

const UserContext = createContext({
  isLoggedIn: null,
});

//==============================================================================//

function reducer(state, action) {
  switch (action.type) {
    case "setIsLoggedIn":
      return {
        ...state,
        isLoggedIn: action.payload,
      };

    default:
  }
}

function UserProvider(props, children) {
  const [state, dispatch] = useReducer(reducer, initialState);

  function setIsLoggedIn(state) {
    dispatch({ type: "setIsLoggedIn", payload: state });
  }

  return (
    <UserContext.Provider
      value={{
        isLoggedIn: props.isLoggedIn,
      }}
      {...props}
    />
  );
}

export { UserProvider, UserContext };
