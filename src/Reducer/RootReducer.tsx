import { applyMiddleware, combineReducers, createStore } from "redux";
import cryptoDataReducer from "./CryptoDataReducer";
import userReducer from "./UserReducer";

import { useDispatch } from "react-redux/es/hooks/useDispatch";
import { TypedUseSelectorHook } from "react-redux/es/types";
import { useSelector } from "react-redux/es/hooks/useSelector";
import thunk from "redux-thunk";

export const store = createStore(
  combineReducers({
    cryptoDataReducer,
    userReducer,
  }),
  applyMiddleware(thunk)
);

export type RootState = ReturnType<typeof store.getState>;
type AppDispatch = typeof store.dispatch;

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

// export type RootState = ReturnType<typeof rootReducer>
