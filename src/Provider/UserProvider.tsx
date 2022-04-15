import React, { useReducer, createContext, useEffect } from "react";
import { authService } from "../firebase_config";
import { getFavorites, updateFavorites } from "../Service/FirebaseFunctions";

//to send Sortation Dropbox and SearchInputField data to ContentsContainer from UpperSpace
const initialState = {
  initialize: false,
  isLoggedIn: false,
  tempNickname: "",
  favorites: {},
  setFavoriteCrypto: () => {},
};

const UserContext = createContext(initialState);

//==============================================================================//

function reducer(state: any, action: any) {
  switch (action.type) {
    case "setLogout":
      return {
        ...state,
        ...initialState,
        initialize: true,
        tempNickname: "Anonymous" + Math.floor(Math.random() * 1001),
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
        initialize: true,
      };

    default:
  }
}

function UserProvider(props: any, children: any) {
  useEffect(() => {
    authService.onAuthStateChanged((user) => {
      if (user) {
        setIsLoggedIn();
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

  function setFavoriteCrypto(
    cryptoId: string,
    fullName: string,
    imageUrl: string
  ) {
    if (!state.isLoggedIn) {
      alert("Login to add your favorites!");
      return;
    }
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
