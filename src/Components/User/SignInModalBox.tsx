import React, { useState, useCallback } from "react";
import { useTranslation } from "react-i18next";
import styled from "styled-components";
import { loginWithEamil, loginWithSocial } from "../../Service/FirebaseAuth";
import {
  SButton,
  SColumn,
  SInput,
  SRow,
  SSizedBox,
  SText,
} from "../GlobalComponents";
import { Button, TextBlack } from "../TransComponants";

export const SignInModalBox = () => {
  const [errorText, setErrorText] = useState("");
  const { t } = useTranslation();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const onChange = useCallback((e: any) => {
    switch (e.target.id) {
      case "email":
        setEmail(e.target.value);
        break;
      case "password":
        setPassword(e.target.value);
        break;
      default:
    }
  }, []);

  async function onSubmit(e: any) {
    e.preventDefault();
    let response = await loginWithEamil(email, password);
    if (response !== null) {
      setErrorText(response);
    }
  }
  return (
    <Container>
      <form onSubmit={onSubmit}>
        <SColumn>
          <SSizedBox height="32px" />
          <SInput
            id="email"
            value={email}
            onChange={onChange}
            type="email"
            placeholder={t("Email")}
            required
          />
          <SSizedBox height="24px" />
          <SInput
            id="password"
            value={password}
            onChange={onChange}
            type="password"
            placeholder={t("Password")}
            required
          />
          <SSizedBox height="16px" />
          <SText>{errorText}</SText>
          <SSizedBox height="16px" />
          <Button>Login</Button>
          <SSizedBox height="16px" />
        </SColumn>
      </form>
      <WhiteButton onClick={() => loginWithSocial("google")}>
        <SRow>
          <Logo src="https://freesvg.org/img/1534129544.png" />{" "}
          <TextBlack>Sign In with Google</TextBlack>
        </SRow>
      </WhiteButton>
    </Container>
  );
};

const Logo = styled.img`
  width: 24px;
  height: 24px;
  margin-right: 8px;
`;
const Container = styled.div`
  width: 100%;
`;
const WhiteButton = styled(SButton)`
  width: 100%;
  background: linear-gradient(#eae8e8 0%, #e9e9e9 100%);
  &:hover {
    background: linear-gradient(#bebebe 0%, #d1d1d1 100%);
  }
`;
