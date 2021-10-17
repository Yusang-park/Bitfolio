import React, { useState } from "react";
import { authService } from "../firebase_config";
import theme, { darkTheme, lightTheme } from "../styles/theme";
import { ThemeProvider } from "styled-components";
import styled from "styled-components";
import GlobalStyle from "../styles/global-style";
import { Menu } from "./menu/Menu";

function App() {
  const [theme, setTheme] = useState(lightTheme);
  const [currentThemeText, setCurrentThemeText] = useState("Light Theme");

  // 각 theme은 state로 관리되며 버튼 클릭 이벤트 시 변경됩니다.
  const switchTheme = () => {
    const nextTheme = theme === lightTheme ? darkTheme : lightTheme;
    setTheme(nextTheme);
    const nextThemeText = theme === lightTheme ? "Dark Theme" : "Light Theme";
    setCurrentThemeText(nextThemeText);
  };

  return (
    <ThemeProvider theme={theme}>
      <Scaffold>
        <Menu />
        <span>Hello</span>
        <div>hi</div>
        <div></div>
      </Scaffold>
    </ThemeProvider>
  );
}

export default App;

const Scaffold = styled.div`
  display: flex;
  width: 100%;
  height: 100vh;
  background-color: ${(props) => props.theme.colors.background};
  color: white;

  ${(props) => props.theme.device.mobile} {
    display: block;
  }
`;
