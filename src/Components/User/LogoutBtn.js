import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import styled from "styled-components";
import { logout } from "../../Service/Auth";

export const LogoutBtn = () => {
  return (
    <SIconButton onClick={logout}>
      <FontAwesomeIcon icon="sign-out-alt"></FontAwesomeIcon>
    </SIconButton>
  );
};

const SIconButton = styled.div`
  color: gray;
  &:hover {
    color: ${({ theme }) => theme.colors.blue};
  }
`;
