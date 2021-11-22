import { updateProfile } from "@firebase/auth";
import React, { useState } from "react";
import { useHistory } from "react-router";
import styled from "styled-components";
import { authService } from "../../firebase_config";
import { loginWithSocial, logout } from "../../Service/Auth";
import {
  SButton,
  SColumn,
  SDivider,
  SInput,
  SRow,
  SSizedBox,
  SSubTitleText,
  SText,
} from "../GlobalComponents";

export const UserModalBox = ({ setShowModal }) => {
  const history = useHistory();
  const [input, setInput] = useState("");

  function changeInput(e) {
    setInput(e.target.value);
  }

  function changeDisplayName() {
    updateProfile(authService.currentUser, { displayName: input });
    setShowModal(false);
  }

  return (
    <Container>
      <SSubTitleText>Change Nickname</SSubTitleText>
      <SSizedBox height="32px" />
      <Input
        value={input}
        onChange={changeInput}
        placeholder="Nickname"
      ></Input>
      <SSizedBox height="16px" />
      <SButton onClick={changeDisplayName}>Submit</SButton>
      <SSizedBox height="16px" />
      <SButton onClick={logout}>Logout</SButton>
    </Container>
  );
};

const Container = styled(SColumn)`
  margin: 32px;
`;

const Logo = styled.img`
  width: 24px;
  height: 24px;
  margin-right: 8px;
`;

const WhiteButton = styled(SButton)`
  background: linear-gradient(#f4f4f4 0%, #cdcdcd 100%);
  &:hover {
    background: linear-gradient(#bdbdbd 0%, #b0b0b0 100%);
  }
`;

const BtnText = styled.p`
  font-size: 1.6rem;
  color: black;
`;

const Input = styled(SInput)`
  height: 36px;
`;
