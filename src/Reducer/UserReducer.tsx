import { Action, ActionCreator, Dispatch } from "redux";
import { ThunkAction } from "redux-thunk";
import { getFavorites, updateFavorites } from "../Service/FirebaseFunctions";
import { RootState } from "./RootReducer";

const LOGOUT = "user/Logout" as const;
const LOGIN = "user/Login" as const;
const ADD_FAVORITE_CRYPTO = "user/AddFavoriteCrypto" as const;
const DEL_FAVORITE_CRYPTO = "user/DelFavoriteCrypto" as const;

export const login = () => ({
  type: LOGIN,
});

export const logout = () => ({
  type: LOGOUT,
});

export const addFavoriteCrypto = (favorites: any) => ({
  type: ADD_FAVORITE_CRYPTO,
  payload: favorites,
});
export const delFavoriteCrypto = (cryptoID: string) => ({
  type: DEL_FAVORITE_CRYPTO,
  payload: cryptoID,
});

export type UserDispatchType =
  | ReturnType<typeof login>
  | ReturnType<typeof logout>
  | ReturnType<typeof addFavoriteCrypto>
  | ReturnType<typeof delFavoriteCrypto>;

//StateForm
interface InitialState {
  initialize: boolean;
  isLoggedIn: boolean;
  tempNickname: string;
  favorites: { [key: string]: any };
}

//initialState
const initialState: InitialState = {
  initialize: false,
  isLoggedIn: false,
  tempNickname: "",
  favorites: {},
};

//리듀서
export default function userReducer(
  state = initialState,
  action: UserDispatchType
): InitialState {
  switch (action.type) {
    case LOGIN:
      return {
        ...state,
        isLoggedIn: true,
        initialize: true,
      };
    case LOGOUT:
      return {
        ...state,
        ...initialState,
        isLoggedIn: false,
        initialize: true,
        tempNickname: "Anonymous" + Math.floor(Math.random() * 1001),
      };
    case ADD_FAVORITE_CRYPTO:
      return {
        ...state,
        favorites: {
          ...state.favorites,
          ...action.payload,
        },
      };
    case DEL_FAVORITE_CRYPTO:
      let immerObj: any = {};
      Object.entries(state.favorites).forEach((e) => {
        immerObj[e[0]] = e[1];
      });

      delete immerObj[action.payload];
      return { ...state, favorites: immerObj };
    default:
      return state;
  }
}

export const fetchLogin: ActionCreator<
  ThunkAction<void, RootState, null, UserDispatchType>
> = () => {
  return async (dispatch: Dispatch<UserDispatchType>): Promise<Action> => {
    dispatch(login());
    let response = await getFavorites();
    return dispatch(addFavoriteCrypto(response));
  };
};

export const fetchFavoriteCrypto =
  (cryptoId: string, fullName: string, imageUrl: string) =>
  async (dispatch: Dispatch<UserDispatchType>, getState: () => RootState) => {
    let state = getState().userReducer;

    if (!state.isLoggedIn) {
      alert("Login to add your favorites!");
      return;
    }
    let existed = !state.favorites[cryptoId] === true;
    updateFavorites(cryptoId, fullName, imageUrl, existed);
    if (existed) {
      dispatch(
        addFavoriteCrypto({
          [cryptoId]: { fullName: fullName, imageUrl: imageUrl },
        })
      );
    } else {
      dispatch(delFavoriteCrypto(cryptoId));
    }
  };
