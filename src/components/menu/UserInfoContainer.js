import React, { useState, useContext } from "react";
import {
  Expanded,
  SizedBox,
  NonPaddingButton,
  Button,
} from "../global-components";
import { LogoutButtonContainer } from "../auth/LogoutButtonContainer";
import styled from "styled-components";
import { authService } from "../../firebase_config";
export const UserInfoContainer = () => {
  function changeDisplayName() {
    // updateProfile(authService.currentUser, { displayName: "PitterPark" });
  }

  return (
    <UserContainer onClick={changeDisplayName}>
      {authService.currentUser.displayName}
      <SizedBox width="16px" />
      <LogoutButtonContainer />
    </UserContainer>
  );
};

const UserContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  /* width: 16%; */
  max-width: 200px;
  /* height: max-content; */
  border: 1px solid grey;
  border-radius: 21px;
  padding: 0px 24px;
  font-size: 20px;
  background: #2b2a37;
`;
