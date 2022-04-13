import React from "react";
import styled from "styled-components";
import { slideIn } from "../Styles/Animation";
import { SStyledDimmer } from "./GlobalComponents";

export const Dialog = ({
  setShowModal,
  children,
}: {
  setShowModal: (value: boolean) => void;
  children: any;
}) => {
  return (
    <Dimmer onClick={() => setShowModal(false)}>
      <Inner onClick={(e) => e.stopPropagation()}>{children}</Inner>
    </Dimmer>
  );
};

const Dimmer = styled(SStyledDimmer)``;

const Inner = styled.div`
  display: flex;
  flex-direction: column;
  width: 60%;
  max-width: 560px;
  min-width: 260px;
  padding: 32px;

  background-color: ${({ theme }) => theme.colors.boxBackground};
  border-radius: 20px;
  animation: ${slideIn} 1s;
`;
