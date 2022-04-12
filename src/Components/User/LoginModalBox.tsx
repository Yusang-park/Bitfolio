import React, { useState } from "react";
import { useTranslation } from "react-i18next";

import styled from "styled-components";
import { loginWithEamil, loginWithSocial } from "../../Service/FirebaseAuth";
import {
  SButton,
  SColumn,
  SInput,
  SRow,
  SText,
  SSizedBox,
} from "../GlobalComponents";
import {
  Button,
  Text,
  TextBlack,
  TextButton,
  TitleText,
} from "../TransComponants";
import { SignUpModalBox } from "./SignUpModalBox";

export const LoginModalBox = () => {
  const [isSignUpMode, setIsSignUpMode] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorText, setErrorText] = useState("");
  const { t } = useTranslation();

  function onClickChangeMode() {
    setIsSignUpMode(!isSignUpMode);
  }

  function onChange(e: any) {
    switch (e.target.id) {
      case "email":
        setEmail(e.target.value);
        break;
      case "password":
        setPassword(e.target.value);
        break;
      default:
    }
  }

  async function onSubmit(e: any) {
    e.preventDefault();
    let response = await loginWithEamil(email, password);
    if (response !== null) {
      setErrorText(response);
    }
  }

  return (
    <Wrapper>
      <SColumn>
        <TitleText>{isSignUpMode ? "Create an account" : "Login"}</TitleText>
        <SSizedBox height="24px" />

        {isSignUpMode ? (
          <SRow justify_content="flex-start">
            <Text>Already have account?</Text>
            <SSizedBox width="8px" />
            <TextButton onClick={onClickChangeMode}>Login</TextButton>
          </SRow>
        ) : (
          <SRow justify_content="flex-start">
            <Text>New to CryptoFolio?</Text>
            <SSizedBox width="8px" />
            <TextButton onClick={onClickChangeMode}>
              Create an account
            </TextButton>
          </SRow>
        )}
      </SColumn>
      {isSignUpMode ? (
        <SignUpModalBox />
      ) : (
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
      )}
    </Wrapper>
  );
};

const Container = styled.div`
  width: 100%;
`;

const Wrapper = styled(SColumn)``;

const Logo = styled.img`
  width: 24px;
  height: 24px;
  margin-right: 8px;
`;

const WhiteButton = styled(SButton)`
  width: 100%;
  background: linear-gradient(#f4f4f4 0%, #e8e8e8 100%);
  &:hover {
    background: linear-gradient(#e4e4e4 0%, #f1f1f1 100%);
  }
`;
