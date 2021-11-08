import React, { useReducer, createContext, useEffect } from "react";
import { authService } from "../firebase_config";
import { getFavorites, updateFavorites } from "../service/fireDb";

//to send Sortation Dropbox and SearchInputField data to ContentsContainer from UpperSpace
const initialState = {
  isLoggedIn: false,
  favorites: {},
};

const UserContext = createContext({
  isLoggedIn: false,
  favorites: {},
});

//==============================================================================//

function reducer(state, action) {
  switch (action.type) {
    case "setLogout":
      return {
        ...state,
        ...initialState,
      };
    case "setFavoriteCrypto":
      return {
        ...state,
        favorites: {
          ...state.favorites,
          ...action.payload,
        },
      };
    case "delFavoriteCrypto":
      let temp = state.favorites;
      delete temp[action.payload];
      return { ...state, favorites: temp };

    case "setIsLoggedIn":
      return {
        ...state,
        ...action.payload,
        isLoggedIn: true,
      };

    default:
  }
}

function UserProvider(props, children) {
  useEffect(() => {
    authService.onAuthStateChanged((user) => {
      if (user) {
        setIsLoggedIn(true);
      } else {
        setLogout();
      }
    });
  }, []);

  const [state, dispatch] = useReducer(reducer, initialState);

  async function setIsLoggedIn() {
    let favoritesData = await getFavorites();

    dispatch({
      type: "setIsLoggedIn",
      payload: {
        favorites: favoritesData,
      },
    });
  }

  function setLogout() {
    dispatch({
      type: "setLogout",
    });
  }

  function setFavoriteCrypto(cryptoId, fullName, imageUrl) {
    let existed = !state.favorites[cryptoId] === true;
    updateFavorites(cryptoId, fullName, imageUrl, existed);
    if (existed) {
      dispatch({
        type: "setFavoriteCrypto",
        payload: { [cryptoId]: { fullName: fullName, imageUrl: imageUrl } },
      });
    } else {
      dispatch({
        type: "delFavoriteCrypto",
        payload: cryptoId,
      });
    }
  }

  return (
    <UserContext.Provider
      value={{
        ...state,
        setFavoriteCrypto,
      }}
      {...props}
    />
  );
}

export { UserProvider, UserContext };
