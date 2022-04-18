import React, { useState } from "react";

import styled from "styled-components";
import { SSizedBox } from "../GlobalComponents";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { CryptoSearchBox } from "../SearchBox/CryptoSearchBox";

import { LoginBtn } from "../User/LoginBtn";
import Sidebar from "./Sidebar";
import { UserBox } from "./UserBox";
import { TitleText } from "../TransComponants";
import { useLocation } from "react-router-dom";

import { useAppSelector } from "../../Reducer/RootReducer";
import { sidebarCategories } from "../../Routes/SidebarCategories";

export const Nav = React.memo(() => {
  const isLoggedIn = useAppSelector((state) => state.userReducer.isLoggedIn);
  const initialize = useAppSelector((state) => state.userReducer.initialize);

  const [checkOpenSidebar, setOpenSidebar] = useState(false);
  const pathName = useLocation().pathname;

  function getMenuName() {
    return sidebarCategories.find((c) =>
      c["path"].includes(pathName.split("/")[1])
    )?.name;
  }

  function onClickHamberger() {
    setOpenSidebar(!checkOpenSidebar);
  }

  return (
    <Wrapper>
      <Sidebar
        forPopup={true}
        isOpened={checkOpenSidebar}
        setClose={onClickHamberger}
      />

      <HambergerBtn onClick={onClickHamberger} />
      <TitleContainer>
        <TitleText>{getMenuName()}</TitleText>
      </TitleContainer>
      <CryptoSearchBox />
      <SSizedBox width="16px" />

      {!initialize ? "" : isLoggedIn ? <UserBox /> : <LoginBtn />}
    </Wrapper>
  );
});

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  height: fit-content;
  margin-bottom: 32px;
  font-size: 2.6rem;
`;

const TitleContainer = styled.div`
  display: flex;
  flex: auto;
  align-items: center;
`;

const HambergerBtn = ({ onClick }: { onClick?: any }) => (
  <HambergerStyle>
    <FontAwesomeIcon icon="bars" onClick={onClick} />
  </HambergerStyle>
);

const HambergerStyle = styled.div`
  display: none;
  margin: auto 0px;
  margin-right: 16px;
  cursor: auto;
  transition: color 300ms ease-out 100ms;
  &:hover {
    color: grey;
    cursor: pointer;
  }

  ${({ theme }) => theme.device.desktopM} {
    display: block;
  }
`;
