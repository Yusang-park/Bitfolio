import React from "react";
import { useHistory } from "react-router";
import styled from "styled-components";
import { loginWithSocial } from "../../service/auth";
import { Button } from "../../styles/components";

export const LoginBox = () => {
  const history = useHistory();

  return (
    <Whole>
      <Button onClick={() => loginWithSocial("google")}>
        SignIn With Google
      </Button>
    </Whole>
  );
};

const Whole = styled.div`
  display: flex;
  flex-direction: column;
  margin: 48px;
`;
