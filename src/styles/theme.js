import { fadeIn } from "./Animation";

const margins = {
  sm: ".5rem",
  base: "1rem",
  lg: "2rem",
  xl: "3rem",
};

const paddings = {
  sm: ".5rem",
  base: "1rem",
  lg: "2rem",
  xl: "3rem",
};

const fonts = {
  //   family: {
  //     base: `'Noto Sans KR', sans-serif`,
  //     title: `'Merriweather', serif`,
  //   },
  //   size: {
  //     sm: "1.4rem",
  //     base: "1.6rem",
  //     lg: "2rem",
  //     xl: "2.5rem",
  //     title: "6rem",
  //   },
  //   weight: {
  //     light: 100,
  //     normal: 400,
  //     bold: 700,
  //   },
};

const colors = {
  background: "#1F1E2C",
  boxBackground: "#262736",
  gray: "#848490", //for text & hover background
  gray2: "#2b2a37", //for background of inputfield
  gray3: "#3E3E3E", //for divider
  container: "#252634",
  btnStart: "#4294F3",
  btnEnd: "#2C62A3",
  negative: "#CF304A",
  positive: "#0ECB81",
  yellow: "#FFCD00",
  blue: "#4294F3",
};

const size = {
  mobile: "425px",
  tablet: "768px",
  desktopM: "1080px",
  desktopL: "1440px",
};

// 미디어 쿼리의 중복 코드를 줄이기위해 정의된 변수입니다
const device = {
  mobile: `@media only screen and (max-width: ${size.mobile})`,
  tablet: `@media only screen and (max-width: ${size.tablet})`,
  desktopM: `@media only screen and (max-width: ${size.desktopM})`,
  desktopL: `@media only screen and (max-width: ${size.desktopL})`,
};

//테마에 따라 다른 값을 갖는 색상 값입니다
const lightThemeColors = {
  ...colors,
  primary: "#333",
  secondary: "#fff",
  tertiary: "#808080",
};

const darkThemeColors = {
  ...colors,
  primary: "#fff",
  secondary: "#333",
  tertiary: "#d4d0c4",
};

// 테마와 관련없이 공통으로 사용되는 변수들입니다
const defalutTheme = {
  margins,
  paddings,
  fonts,
  device,
};

// 각 테마는 공통 변수와 함께, 각기 다른 색상 값들을 갖습니다.
export const darkTheme = {
  ...defalutTheme,
  colors: darkThemeColors,
};

export const lightTheme = {
  ...defalutTheme,
  colors: lightThemeColors,
};
