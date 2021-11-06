import React, { useState } from "react";
import styled from "styled-components";
import { Button } from "../global-components";
import { Modal } from "../Modal";
import { LoginBox } from "./LoginBox";

export const LoginButtonContaienr = () => {
  const [showLoginModal, setShowLoginModal] = useState(false);

  function onClickHandler() {
    setShowLoginModal(true);
  }

  return (
    <Container>
      {showLoginModal && (
        <Modal setShowModal={setShowLoginModal}>
          <LoginBox />
        </Modal>
      )}
      <Button onClick={onClickHandler}>Login</Button>
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  align-items: center;
`;
