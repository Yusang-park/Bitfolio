import React from "react";
import { useHistory } from "react-router";
import styled from "styled-components";
import { loginWithSocial } from "../../Service/Auth";
import {
  S_Button,
  S_Column,
  S_Row,
  S_SizedBox,
  S_SubTitleText,
  S_Text,
} from "../GlobalComponents";

export const LoginModalBox = () => {
  const history = useHistory();

  return (
    <Container>
      <S_SubTitleText>Free Sign In</S_SubTitleText>
      <S_SizedBox height="32px" />
      <WhiteButton onClick={() => loginWithSocial("google")}>
        <S_Row>
          <Logo src="https://freesvg.org/img/1534129544.png" />{" "}
          <BtnText> Google Sign In</BtnText>
        </S_Row>
      </WhiteButton>
    </Container>
  );
};

const Container = styled(S_Column)`
  margin: 32px;
`;

const Logo = styled.img`
  width: 24px;
  height: 24px;
  margin-right: 8px;
`;

const WhiteButton = styled(S_Button)`
  background: linear-gradient(#f4f4f4 0%, #cdcdcd 100%);
  &:hover {
    background: linear-gradient(#bdbdbd 0%, #b0b0b0 100%);
  }
`;

const BtnText = styled.p`
  font-size: 1.6rem;
  color: black;
`;
