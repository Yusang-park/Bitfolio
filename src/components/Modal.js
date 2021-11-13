import React from "react";
import styled from "styled-components";
import { fadeIn } from "../Styles/Animation";
import { StyledDimmer } from "./GlobalComponents";

export const Modal = ({ setShowModal, children }) => {
  return (
    <Dimmer onClick={() => setShowModal(false)}>
      <Innder onClick={(e) => e.stopPropagation()}>{children}</Innder>
    </Dimmer>
  );
};

const Dimmer = styled(StyledDimmer)``;

const Innder = styled.div`
  display: flex;
  flex-direction: column;
  width: 80%;
  max-width: 640px;
  height: 60%;
  background-color: ${({ theme }) => theme.colors.gray3};
  border-radius: 30px;
`;
