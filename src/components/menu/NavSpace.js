import React, { useState, useContext } from "react";
import { useLocation } from "react-router-dom";
import { categories } from "../../routes/categories";
import styled from "styled-components";
import {
  Expanded,
  SizedBox,
  NonPaddingButton,
  Button,
} from "../global-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { SearchInput } from "../searchInput/SearchInput";
import { UserContext } from "../../provider/userProvider";
import { LoginButtonContaienr } from "../auth/LoginButtonContainer";
import { updateProfile } from "@firebase/auth";
import { Sidebar } from "./Sidebar";
import { UserInfoContainer } from "./UserInfoContainer";

export const NavSpace = () => {
  const { isLoggedIn } = useContext(UserContext);
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
      <Hamberger onClick={onClickHamberger} />
      <TitleText>{getName()}</TitleText>
      <SearchInput />
      <SizedBox width="16px" />
      {/* {isLoggedIn ? <UserInfoContainer /> : <LoginButtonContaienr />} */}
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;

  width: 100%;
  height: 4.7vh;
  min-height: 48px;
  margin-bottom: 32px;
  font-size: 26px;
`;

const TitleText = styled.div`
  display: flex;
  flex: auto;
  align-items: center;
`;

const Hamberger = ({ onClick }) => (
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
