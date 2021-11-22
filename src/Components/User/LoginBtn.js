import React, { useState } from "react";
import styled from "styled-components";
import { S_Button } from "../GlobalComponents";
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
      <S_Button onClick={onClickHandler}>Login</S_Button>
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  align-items: center;
`;
