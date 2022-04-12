import { updateProfile } from "@firebase/auth";
import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import styled from "styled-components";
import { authService } from "../../firebase_config";
import { logout } from "../../Service/FirebaseAuth";
import { SColumn, SInput, SRow, SSizedBox } from "../GlobalComponents";
import { TitleText, Button, Text } from "../TransComponants";

export const UserModalBox = ({ setShowModal }: { setShowModal: Function }) => {
  const [input, setInput] = useState(
    authService.currentUser?.displayName ?? ""
  );
  const { t } = useTranslation();

  function changeInput(e: any) {
    setInput(e.target.value);
  }

  function changeDisplayName(e: any) {
    if (authService.currentUser !== null)
      updateProfile(authService.currentUser, { displayName: input }).then(
        () => {
          setShowModal(false);
        }
      );
  }

  return (
    <Container>
      <TitleText>My Account</TitleText>
      <SSizedBox height="32px" />

      <form onSubmit={changeDisplayName}>
        <Text>{t("Nickname")}</Text>
        <SSizedBox height="8px" />
        <SColumn align_items="center">
          <SRow>
            <SInput
              width="100%"
              value={input}
              onChange={changeInput}
              placeholder={t("Nickname")}
              minLength={3}
              maxLength={10}
              required
            ></SInput>
            <SSizedBox width="16px" />

            <Button onClick={changeDisplayName}>{t("Change")}</Button>
          </SRow>
        </SColumn>
      </form>

      <SSizedBox height="32px" />
      <Button onClick={logout}>Logout</Button>
    </Container>
  );
};

const Container = styled(SColumn)``;
