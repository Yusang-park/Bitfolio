import { updateProfile } from "@firebase/auth";
import React, { useState } from "react";
import styled from "styled-components";
import { authService } from "../../firebase_config";
import { logout } from "../../Service/Auth";
import {
  SButton,
  SColumn,
  SInput,
  SSizedBox,
  SSubTitleText,
} from "../GlobalComponents";

export const UserModalBox = ({ setShowModal }) => {
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

const Input = styled(SInput)`
  height: 36px;
`;
