import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import styled from "styled-components";
import { _IconButton } from "../GlobalComponents";
import { Dialog } from "../Modal";
import { UserModalBox } from "./UserModalBox";
export const UserBtn = () => {
  const [showLoginModal, setShowModal] = useState(false);

  function onClickHandler() {
    setShowModal(true);
  }

  return (
    <Container>
      {showLoginModal && (
        <Dialog setShowModal={setShowModal}>
          <UserModalBox setShowModal={setShowModal} />
        </Dialog>
      )}
      <_IconButton onClick={onClickHandler}>
        <FontAwesomeIcon icon="user"></FontAwesomeIcon>
      </_IconButton>
    </Container>
  );
};

const Container = styled(_IconButton)`
  display: none;
  ${({ theme }) => theme.device.tablet} {
    display: block;
  }
`;
