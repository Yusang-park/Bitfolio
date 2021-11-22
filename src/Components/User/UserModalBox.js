import { updateProfile } from "@firebase/auth";
import React, { useState } from "react";
import { useHistory } from "react-router";
import styled from "styled-components";
import { authService } from "../../firebase_config";
import { loginWithSocial, logout } from "../../Service/Auth";
import {
  S_Button,
  S_Column,
  S_Divider,
  S_Input,
  S_Row,
  S_SizedBox,
  S_SubTitleText,
  S_Text,
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
      <S_SubTitleText>Change Nickname</S_SubTitleText>
      <S_SizedBox height="32px" />
      <Input
        value={input}
        onChange={changeInput}
        placeholder="Nickname"
      ></Input>
      <S_SizedBox height="16px" />
      <S_Button onClick={changeDisplayName}>Submit</S_Button>
      <S_SizedBox height="16px" />
      <S_Button onClick={logout}>Logout</S_Button>
    </Container>
  );
};

const Container = styled(S_Column)`
  margin: 32px;
`;

const Logo = styled.img`
  width: 24px;
  height: 24px;
  margin-right: 8px;
`;

const WhiteButton = styled(S_Button)`
  background: linear-gradient(#f4f4f4 0%, #cdcdcd 100%);
  &:hover {
    background: linear-gradient(#bdbdbd 0%, #b0b0b0 100%);
  }
`;

const BtnText = styled.p`
  font-size: 1.6rem;
  color: black;
`;

const Input = styled(S_Input)`
  height: 36px;
`;
