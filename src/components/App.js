import React, { useState, useEffect } from "react";
import { authService } from "../firebase_config";
import { darkTheme, lightTheme } from "../styles/theme";
import { ThemeProvider } from "styled-components";
import styled from "styled-components";
// import GlobalStyle from "../styles/global-style";

import { BrowserRouter, Switch, Route } from "react-router-dom";
import { Sidebar } from "./menu/Sidebar";
import { DashBoard } from "../routes/DashBoard";
import { CryptoRank } from "../routes/CryptoRank";
import { Exchanges } from "../routes/Exchanges";
import { Portfolio } from "../routes/Portfolio";
import { UpperSpace } from "./menu/UpperSpace";
import { Details } from "../routes/Details";
import { UserProvider } from "../provider/userProvider";

function App() {
  const auth = authService;
  const [theme, setTheme] = useState(lightTheme);
  const [currentThemeText, setCurrentThemeText] = useState("Light Theme");

  // const [initFirebase, setInitFirebase] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    authService.onAuthStateChanged((user) => {
      if (user) {
        setIsLoggedIn(true);
      } else {
        setIsLoggedIn(false);
      }
      // setInitFirebase(true);
    });
  });

  // 각 theme은 state로 관리되며 버튼 클릭 이벤트 시 변경됩니다.
  const switchTheme = () => {
    const nextTheme = theme === lightTheme ? darkTheme : lightTheme;
    setTheme(nextTheme);
    const nextThemeText = theme === lightTheme ? "Dark Theme" : "Light Theme";
    setCurrentThemeText(nextThemeText);
  };

  return (
    <ThemeProvider theme={theme}>
      <UserProvider isLoggedIn={isLoggedIn}>
        <Scaffold>
          <BrowserRouter>
            <Sidebar />

            <ContentsSpace>
              <UpperSpace />

              <Switch>
                <Route exact path="/dashboard">
                  <DashBoard />
                </Route>
                <Route exact path="/">
                  <CryptoRank />
                </Route>
                <Route exact path="/exchanges">
                  <Exchanges />
                </Route>
                <Route exact path="/portfolio">
                  <Portfolio />
                </Route>
                <Route exact path="/indexes">
                  <DashBoard />
                </Route>
                <Route exact path="/details/:id">
                  <Details />
                </Route>
              </Switch>
            </ContentsSpace>
          </BrowserRouter>
        </Scaffold>
      </UserProvider>
    </ThemeProvider>
  );
}

export default App;

const Scaffold = styled.div`
  display: flex;
  width: 100%;
  height: 100%;
  position: absolute;
  background-color: ${(props) => props.theme.colors.background};
  color: white;

  ${(props) => props.theme.device.mobile} {
    display: block;
  }
`;

//TODO: 패딩 조절하기
const ContentsSpace = styled.div`
  display: flex;
  flex: 83;
  flex-direction: column;
  padding: 32px;
`;
