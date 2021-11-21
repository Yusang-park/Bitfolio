import { updateProfile } from "@firebase/auth";
import React, { useState } from "react";
import { useHistory } from "react-router";
import styled from "styled-components";
import { authService } from "../../firebase_config";
import { loginWithSocial, logout } from "../../Service/Auth";
import {
  _Button,
  _Column,
  _Divider,
  _Input,
  _Row,
  _SizedBox,
  _SubTitleText,
  _Text,
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
      <_SubTitleText>Change Nickname</_SubTitleText>
      <_SizedBox height="32px" />
      <Input
        value={input}
        onChange={changeInput}
        placeholder="Nickname"
      ></Input>
      <_SizedBox height="16px" />
      <_Button onClick={changeDisplayName}>Submit</_Button>
      <_SizedBox height="16px" />
      <_Button onClick={logout}>Logout</_Button>
    </Container>
  );
};

const Container = styled(_Column)`
  margin: 32px;
`;

const Logo = styled.img`
  width: 24px;
  height: 24px;
  margin-right: 8px;
`;

const WhiteButton = styled(_Button)`
  background: linear-gradient(#f4f4f4 0%, #cdcdcd 100%);
  &:hover {
    background: linear-gradient(#bdbdbd 0%, #b0b0b0 100%);
  }
`;

const BtnText = styled.p`
  font-size: 1.6rem;
  color: black;
`;

const Input = styled(_Input)`
  height: 36px;
`;
