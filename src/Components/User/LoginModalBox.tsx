import React, { useState } from "react";

import styled from "styled-components";
import { SColumn, SRow, SSizedBox } from "../GlobalComponents";
import { Text, TextButton, TitleText } from "../TransComponants";
import { SignInModalBox } from "./SignInModalBox";
import { SignUpModalBox } from "./SignUpModalBox";

export const LoginModalBox = () => {
  const [isSignUpMode, setIsSignUpMode] = useState(false);

  function onClickChangeMode() {
    setIsSignUpMode(!isSignUpMode);
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
      {isSignUpMode ? <SignUpModalBox /> : <SignInModalBox />}
    </Wrapper>
  );
};

const Wrapper = styled(SColumn)``;
