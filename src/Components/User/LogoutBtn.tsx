import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import styled from "styled-components";
import { logout } from "../../Service/FirebaseAuth";

export const LogoutBtn = () => {
  return (
    <Box onClick={logout}>
      <FontAwesomeIcon icon="sign-out-alt"></FontAwesomeIcon>
    </Box>
  );
};

const Box = styled.span`
  color: gray;
  transition: color 0.5s;
  &:hover {
    color: ${({ theme }) => theme.colors.blue};
  }
`;
