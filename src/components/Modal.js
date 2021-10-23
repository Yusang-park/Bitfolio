import React from "react";
import styled from "styled-components";
import { fadeIn } from "../styles/animation";

export const Modal = ({ setShowModal, children }) => {
  return (
    <Dimmer onClick={() => setShowModal(false)}>
      <Innder onClick={(e) => e.stopPropagation()}>{children}</Innder>
    </Dimmer>
  );
};

const Dimmer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  padding: 48px;
  background-color: #00000080;
  z-index: 10000;
  animation-duration: 0.2s;
  animation-timing-function: ease-out;
  animation-name: ${fadeIn};
  animation-fill-mode: forwards;
`;

const Innder = styled.div`
  display: flex;
  flex-direction: column;
  width: 80%;
  max-width: 640px;
  height: 60%;
  background-color: ${({ theme }) => theme.colors.gray3};
  border-radius: 30px;
`;
