import React from "react";
import { useHistory } from "react-router";
import styled from "styled-components";
import { loginWithSocial } from "../../Service/Auth";
import { Button, Column } from "../GlobalComponents";

export const LoginBox = () => {
  const history = useHistory();

  return (
    <Container>
      <Button onClick={() => loginWithSocial("google")}>
        SignIn With Google
      </Button>
    </Container>
  );
};

const Container = styled(Column)`
  margin: 48px;
`;
