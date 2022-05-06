import React, { useState, lazy, Suspense, useEffect, Dispatch } from "react";
import styled from "styled-components";
import { BrowserRouter, Switch, Route } from "react-router-dom";

import { Nav } from "./Components/Menu/Nav";
import Sidebar from "./Components/Menu/Sidebar";

import { lightTheme } from "./Styles/Theme";
import { ThemeProvider } from "styled-components";

import { SColumn } from "./Components/GlobalComponents";
import { ProgressIndicator } from "./Components/ProgressIndicator/ProgressIndicator";
import { authService } from "./firebase_config";
import { User } from "@firebase/auth";

import { useDispatch } from "react-redux";
import { fetchLogin, logout, UserDispatchType } from "./Reducer/UserReducer";
import { fetchCryptoOBJ } from "./Reducer/CryptoDataReducer";
import { Action, AnyAction } from "redux";
import { ThunkAction } from "redux-thunk";
import { RootState } from "./Reducer/RootReducer";

const CryptoRank = lazy(() => import("./Routes/CryptoRank"));
const DashBoard = lazy(() => import("./Routes/DashBoard"));
const ExchangesRank = lazy(() => import("./Routes/ExchangesRank"));
const Portfolio = lazy(() => import("./Routes/Portfolio"));
const Indexes = lazy(() => import("./Routes/Indexes/Indexes"));
const Details = lazy(() => import("./Routes/Details"));
const Chat = lazy(() => import("./Routes/Chat/Chat"));

const App = () => {
  const dispatch = useDispatch();
  const [theme] = useState(lightTheme);

  useEffect(() => {
    authService.onAuthStateChanged((user: User | null) => {
      if (user) {
        dispatch(fetchLogin());
      } else {
        dispatch(logout());
      }
    });

    dispatch(fetchCryptoOBJ() as any);
  }, [dispatch]);

  return (
    <ThemeProvider theme={theme}>
      <Container>
        <BrowserRouter>
          <Sidebar />
          <Wrapper>
            <Nav />
            <Suspense
              fallback={
                <SColumn>
                  <ProgressIndicator />
                </SColumn>
              }
            >
              <Content>
                <Switch>
                  <Route exact path="/dashboard">
                    <DashBoard />
                  </Route>
                  <Route exact path="/">
                    <CryptoRank />
                  </Route>
                  <Route exact path="/exchanges">
                    <ExchangesRank />
                  </Route>
                  <Route exact path="/portfolio">
                    <Portfolio />
                  </Route>
                  <Route exact path="/indexes">
                    <Indexes />
                  </Route>
                  <Route exact path="/openchat">
                    <Chat expand={true} />
                  </Route>
                  <Route exact path="/details/:id">
                    <Details />
                  </Route>
                </Switch>
              </Content>
            </Suspense>
          </Wrapper>
        </BrowserRouter>
      </Container>
    </ThemeProvider>
  );
};

export default App;

const Container = styled.div`
  display: flex;
  height: 100%;
  background-color: ${(props) => props.theme.colors.background};
  color: white;
`;

const Wrapper = styled(SColumn)`
  width: 100%;
  height: auto;
  margin: 32px;
  justify-content: flex-start;
  ${({ theme }) => theme.device.tablet} {
    width: 100%;
    margin: 24px;
  }
  ${({ theme }) => theme.device.tablet} {
    width: 100%;
    margin: 16px;
  }
`;

const Content = styled.div`
  display: flex;
  justify-content: center;
  flex: 1;

  ${({ theme }) => theme.device.tablet} {
    flex-direction: column;
    justify-content: flex-start;
    height: fit-content;
    padding-bottom: 24px;
  }
  ${({ theme }) => theme.device.mobile} {
    padding-bottom: 16px;
  }
`;
