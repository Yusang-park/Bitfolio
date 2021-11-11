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
import { authService } from "../../firebase_config";
import { LogoutButtonContainer } from "../auth/LogoutButtonContainer";
import { updateProfile } from "@firebase/auth";
import { Sidebar } from "./Sidebar";

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

  function changeDisplayName() {
    // updateProfile(authService.currentUser, { displayName: "PitterPark" });
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
      <SizedBox width="24px" />
      {isLoggedIn ? (
        <UserContainer onClick={changeDisplayName}>
          {authService.currentUser.displayName}
          <LogoutButtonContainer />
          {/* <FontAwesomeIcon icon="chevron-down" size="1x" color="white" /> */}
        </UserContainer>
      ) : (
        <LoginButtonContaienr />
      )}
    </Container>
  );
};

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

const Container = styled.div`
  display: flex;
  align-items: unset;
  justify-content: space-between;
  width: 100%;
  max-height: 56px;
  min-height: 46px;
  padding-bottom: 32px;
  font-size: 26px;
`;

const UserContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 16%;
  max-width: 200px;
  max-height: 64px;
  min-height: 46px;
  border-radius: 21px;
  border: 1px solid gray;
  padding: 0px 24px;
  font-size: 20px;
  background: #2b2a37;
`;
