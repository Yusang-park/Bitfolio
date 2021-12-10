import { updateProfile } from "@firebase/auth";
import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import styled from "styled-components";
import { authService } from "../../firebase_config";
import { logout } from "../../Service/FirebaseAuth";
import { SColumn, SInput, SSizedBox } from "../GlobalComponents";
import { TitleText, Button } from "../TransComponants";

export const UserModalBox = ({ setShowModal }) => {
  const [input, setInput] = useState("");
  const { t } = useTranslation();

  function changeInput(e) {
    setInput(e.target.value);
  }

  function changeDisplayName() {
    updateProfile(authService.currentUser, { displayName: input });
    setShowModal(false);
  }

  return (
    <Container>
      <TitleText>My Account</TitleText>
      <SSizedBox height="32px" />
      <SInput
        value={input}
        onChange={changeInput}
        placeholder={t("Nickname")}
        required
      ></SInput>
      <SSizedBox height="24px" />
      <Button onClick={changeDisplayName}>Change Nickname</Button>
      <SSizedBox height="32px" />
      <Button onClick={logout}>Logout</Button>
    </Container>
  );
};

const Container = styled(SColumn)``;
