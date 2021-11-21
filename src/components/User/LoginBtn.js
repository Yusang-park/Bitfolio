import React, { useState } from "react";
import styled from "styled-components";
import { _Button } from "../GlobalComponents";
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
      <_Button onClick={onClickHandler}>Login</_Button>
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  align-items: center;
`;
