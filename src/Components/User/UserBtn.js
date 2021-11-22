import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import styled from "styled-components";
import { SIconButton } from "../GlobalComponents";
import { Dialog } from "../Modal";
import { UserModalBox } from "./UserModalBox";
export const UserBtn = ({ setShowModal }) => {
  return (
    <IconButton
      onClick={() => {
        setShowModal(true);
      }}
    >
      <FontAwesomeIcon icon="user"></FontAwesomeIcon>
    </IconButton>
  );
};

const IconButton = styled(SIconButton)`
  display: none;
  ${({ theme }) => theme.device.tablet} {
    display: block;
  }
`;
