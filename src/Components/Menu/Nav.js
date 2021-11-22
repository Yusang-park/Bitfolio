import React, { useState, useContext } from "react";
import { useLocation } from "react-router-dom";
import { categories } from "../../Routes/Categories";
import styled from "styled-components";
import {
  S_Expanded,
  S_SizedBox,
  S_IconButton,
  S_Button,
} from "../GlobalComponents";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { CryptoSearchBox } from "../SearchBox/CryptoSearchBox";
import { UserContext } from "../../Provider/UserProvider";
import { LoginBtn } from "../User/LoginBtn";
import { updateProfile } from "@firebase/auth";
import { Sidebar } from "./Sidebar";
import { UserBox } from "./UserBox";

export const Nav = () => {
  const { isLoggedIn, initialize } = useContext(UserContext);
  const [openedSideBar, setOpenedSideBar] = useState(false);
  const pathName = useLocation().pathname;

  function getName() {
    try {
      return categories.find((c) => c.path === pathName).name;
    } catch (e) {
      return "Details";
    }
  }

  function onClickHamberger() {
    setOpenedSideBar(!openedSideBar);
  }

  return (
    <Container>
      <Sidebar
        forPopup={true}
        isOpened={openedSideBar}
        setClose={onClickHamberger}
      />
      <HambergerBtn onClick={onClickHamberger} />
      <S_TitleText>{getName()}</S_TitleText>
      <CryptoSearchBox />
      <S_SizedBox width="16px" />

      {!initialize ? <div></div> : isLoggedIn ? <UserBox /> : <LoginBtn />}
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  height: fit-content;
  margin-bottom: 32px;
  font-size: 2.6rem;
`;

const S_TitleText = styled.div`
  display: flex;
  flex: auto;
  align-items: center;
`;

const HambergerBtn = ({ onClick }) => (
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
