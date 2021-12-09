import { updateProfile } from "@firebase/auth";
import React, { useState } from "react";
import styled from "styled-components";
import { authService } from "../../firebase_config";
import { logout } from "../../Service/FirebaseAuth";
import {
  SButton,
  SColumn,
  SInput,
  SSizedBox,
  STitleText,
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
      <STitleText>My Account</STitleText>
      <SSizedBox height="32px" />
      <SInput
        value={input}
        onChange={changeInput}
        placeholder="Nickname"
        required
      ></SInput>
      <SSizedBox height="24px" />
      <SButton onClick={changeDisplayName}>Change Nickname</SButton>
      <SSizedBox height="32px" />
      <SButton onClick={logout}>Logout</SButton>
    </Container>
  );
};

const Container = styled(SColumn)``;
