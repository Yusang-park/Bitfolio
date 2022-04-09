import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState } from "react";
import styled from "styled-components";
import { SButton } from "../GlobalComponents";
import { Dialog } from "../Modal";
import { LoginModalBox } from "./LoginModalBox";

export const LoginBtn = () => {
  const [showLoginModal, setShowLoginModal] = useState(false);

  function onClickHandler(e: React.MouseEvent<HTMLButtonElement, MouseEvent>) {
    setShowLoginModal(true);
  }

  return (
    <Container>
      {showLoginModal && (
        <Dialog setShowModal={setShowLoginModal}>
          <LoginModalBox />
        </Dialog>
      )}
      <SButton onClick={onClickHandler}>
        {" "}
        <FontAwesomeIcon icon="sign-in-alt"></FontAwesomeIcon>
      </SButton>
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  align-items: center;
`;
