import React, { useState } from "react";
import styled from "styled-components";
import { SButton } from "../GlobalComponents";
import { Dialog } from "../Modal";
import { LoginModalBox } from "./LoginModalBox";

export const LoginBtn = () => {
  const [showLoginModal, setShowLoginModal] = useState(false);

  function onClickHandler() {
    setShowLoginModal(true);
  }

  return (
    <Container>
      {showLoginModal && (
        <Dialog setShowModal={setShowLoginModal}>
          <LoginModalBox />
        </Dialog>
      )}
      <SButton onClick={onClickHandler}>Login</SButton>
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  align-items: center;
`;
