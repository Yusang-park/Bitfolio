import React from "react";
import { useHistory } from "react-router";
import styled from "styled-components";
import { loginWithSocial } from "../../Service/Auth";
import {
  _Button,
  _Column,
  _Row,
  _SizedBox,
  _SubTitleText,
  _Text,
} from "../GlobalComponents";

export const LoginModalBox = () => {
  const history = useHistory();

  return (
    <Container>
      <_SubTitleText>Free Sign In</_SubTitleText>
      <_SizedBox height="32px" />
      <WhiteButton onClick={() => loginWithSocial("google")}>
        <_Row>
          <Logo src="https://freesvg.org/img/1534129544.png" />{" "}
          <BtnText> Google Sign In</BtnText>
        </_Row>
      </WhiteButton>
    </Container>
  );
};

const Container = styled(_Column)`
  margin: 32px;
`;

const Logo = styled.img`
  width: 24px;
  height: 24px;
  margin-right: 8px;
`;

const WhiteButton = styled(_Button)`
  background: linear-gradient(#f4f4f4 0%, #cdcdcd 100%);
  &:hover {
    background: linear-gradient(#bdbdbd 0%, #b0b0b0 100%);
  }
`;

const BtnText = styled.p`
  font-size: 1.6rem;
  color: black;
`;
