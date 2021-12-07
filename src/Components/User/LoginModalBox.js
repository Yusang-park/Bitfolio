import React, { useState } from "react";

import styled from "styled-components";
import { loginWithEamil, loginWithSocial } from "../../Service/Auth";
import {
  SButton,
  SColumn,
  SInput,
  SRow,
  SText,
  SSizedBox,
  STitleText,
  STextButton,
} from "../GlobalComponents";
import { SignUpModalBox } from "./SignUpModalBox";

export const LoginModalBox = () => {
  const [isSignUpMode, setIsSignUpMode] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorText, setErrorText] = useState("");

  function onClickChangeMode() {
    setIsSignUpMode(!isSignUpMode);
  }

  function onChange(e) {
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

  async function onSubmit(e) {
    e.preventDefault();
    let response = await loginWithEamil(email, password);
    if (response !== null) {
      setErrorText(response);
    }
  }

  return (
    <Wrapper>
      <SColumn>
        <STitleText>{isSignUpMode ? "Create an account" : "Login"}</STitleText>
        <SSizedBox height="24px" />

        {isSignUpMode ? (
          <SRow justify_content="flex-start">
            <SText>Already have account?</SText>
            <SSizedBox width="8px" />
            <STextButton onClick={onClickChangeMode}>Login</STextButton>
          </SRow>
        ) : (
          <SRow justify_content="flex-start">
            <SText>New to CryptoFolio?</SText>
            <SSizedBox width="8px" />
            <STextButton onClick={onClickChangeMode}>
              Create an account
            </STextButton>
          </SRow>
        )}
      </SColumn>
      {isSignUpMode ? (
        <SignUpModalBox />
      ) : (
        <SColumn>
          <SSizedBox height="32px" />
          <form onSubmit={onSubmit}>
            <SInput
              id="email"
              value={email}
              onChange={onChange}
              type="email"
              placeholder="Email"
              required
            />
            <SSizedBox height="24px" />
            <SInput
              id="password"
              value={password}
              onChange={onChange}
              type="password"
              placeholder="Password"
              required
            />
            <SSizedBox height="16px" />
            <SText>{errorText}</SText>
            <SSizedBox height="16px" />
            <SButton>Login</SButton>
            <SSizedBox height="16px" />
          </form>
          <WhiteButton onClick={() => loginWithSocial("google")}>
            <SRow>
              <Logo src="https://freesvg.org/img/1534129544.png" />{" "}
              <InnerBtnText> Google Sign In</InnerBtnText>
            </SRow>
          </WhiteButton>
        </SColumn>
      )}
    </Wrapper>
  );
};

const Wrapper = styled(SColumn)``;

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

const InnerBtnText = styled.p`
  font-size: 1.6rem;
  color: black;
`;
