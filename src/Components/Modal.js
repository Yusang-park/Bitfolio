import React from "react";
import styled from "styled-components";
import { fadeIn } from "../Styles/Animation";
import { S_StyledDimmer } from "./GlobalComponents";

export const Dialog = ({ setShowModal, children }) => {
  return (
    <Dimmer onClick={() => setShowModal(false)}>
      <Inner onClick={(e) => e.stopPropagation()}>{children}</Inner>
    </Dimmer>
  );
};

const Dimmer = styled(S_StyledDimmer)``;

const Inner = styled.div`
  display: flex;
  flex-direction: column;
  width: 60%;
  max-width: 640px;
  min-width: 260px;

  background-color: ${({ theme }) => theme.colors.gray3};
  border-radius: 20px;
`;
