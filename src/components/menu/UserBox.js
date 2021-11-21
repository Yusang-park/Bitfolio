import React, { useState, useContext } from "react";
import {
  _Expanded,
  _SizedBox,
  _IconButton,
  _Button,
} from "../GlobalComponents";
import { LogoutBtn } from "../User/LogoutBtn";
import styled from "styled-components";
import { authService } from "../../firebase_config";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { UserBtn } from "../User/UserBtn";
export const UserBox = () => {
  return (
    <>
      <UserBtn />
      <UserContainer>
        {authService.currentUser.displayName}
        <_SizedBox width="16px" />
        <LogoutBtn />
      </UserContainer>
    </>
  );
};

const UserContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 46px;
  max-width: 500px;
  padding: 0px 24px;
  border: 1px solid grey;
  border-radius: 21px;
  background: #2b2a37;
  font-size: 2rem;

  ${({ theme }) => theme.device.tablet} {
    display: none;
  }
`;
