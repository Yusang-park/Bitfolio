import React from "react";
import { useHistory } from "react-router";
import styled from "styled-components";
import { loginWithSocial } from "../../Service/Auth";
import {
  SButton,
  SColumn,
  SRow,
  SSizedBox,
  SSubTitleText,
  SText,
} from "../GlobalComponents";

export const LoginModalBox = () => {
  const history = useHistory();

  return (
    <Container>
      <SSubTitleText>Free Sign In</SSubTitleText>
      <SSizedBox height="32px" />
      <WhiteButton onClick={() => loginWithSocial("google")}>
        <SRow>
          <Logo src="https://freesvg.org/img/1534129544.png" />{" "}
          <BtnText> Google Sign In</BtnText>
        </SRow>
      </WhiteButton>
    </Container>
  );
};

const Container = styled(SColumn)`
  margin: 32px;
`;

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

const BtnText = styled.p`
  font-size: 1.6rem;
  color: black;
`;
