import React, { useState } from "react";
import { lightTheme } from "./Styles/Theme";
import { ThemeProvider } from "styled-components";
import styled from "styled-components";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import { Sidebar } from "./Components/Menu/Sidebar";
import { DashBoard } from "./Routes/DashBoard";
import { CryptoRank } from "./Routes/CryptoRank";
import { Exchanges } from "./Routes/Exchanges";
import { Portfolio } from "./Routes/Portfolio";
import { Nav } from "./Components/Menu/Nav";
import { Details } from "./Routes/Details";
import { UserProvider } from "./Provider/UserProvider";
import { SColumn } from "./Components/GlobalComponents";
import { Indexes } from "./Routes/Indexes/Indexes";

function App() {
  const [theme] = useState(lightTheme);

  // const [currentThemeText, setCurrentThemeText] = useState("Light Theme");

  // const [initFirebase, setInitFirebase] = useState(false);
  // const [isLoggedIn, setIsLoggedIn] = useState(false);

  // 각 theme은 state로 관리되며 버튼 클릭 이벤트 시 변경됩니다.
  // const switchTheme = () => {
  //   const nextTheme = theme === lightTheme ? darkTheme : lightTheme;
  //   setTheme(nextTheme);
  //   const nextThemeText = theme === lightTheme ? "Dark Theme" : "Light Theme";
  //   setCurrentThemeText(nextThemeText);
  // };

  return (
    <ThemeProvider theme={theme}>
      <UserProvider>
        <Container>
          <BrowserRouter>
            <Sidebar />
            <Wrapper>
              <Nav />
              <Content>
                <Switch>
                  <Route exact path="/">
                    <DashBoard />
                  </Route>
                  <Route exact path="/cryptorank">
                    <CryptoRank />
                  </Route>
                  <Route exact path="/exchanges">
                    <Exchanges />
                  </Route>
                  <Route exact path="/portfolio">
                    <Portfolio />
                  </Route>
                  <Route exact path="/indexes">
                    <Indexes />
                  </Route>
                  <Route exact path="/details/:id">
                    <Details />
                  </Route>
                </Switch>
              </Content>
            </Wrapper>
          </BrowserRouter>
        </Container>
      </UserProvider>
    </ThemeProvider>
  );
}

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
