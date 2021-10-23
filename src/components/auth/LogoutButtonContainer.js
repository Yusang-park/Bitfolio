import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import styled from "styled-components";
import { logout } from "../../service/auth";

export const LogoutButtonContainer = () => {
  return (
    <IconButton onClick={logout}>
      <FontAwesomeIcon icon="sign-out-alt"></FontAwesomeIcon>
    </IconButton>
  );
};

const IconButton = styled.div`
  color: gray;
  &:hover {
    color: ${({ theme }) => theme.colors.blue};
  }
`;
