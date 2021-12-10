import React, { useState } from "react";
import { SSizedBox } from "../GlobalComponents";
import { LogoutBtn } from "../User/LogoutBtn";
import styled from "styled-components";
import { authService } from "../../firebase_config";
import { UserBtn } from "../User/UserBtn";
import { Dialog } from "../Modal";
import { UserModalBox } from "../User/UserModalBox";
export const UserBox = () => {
  const [showLoginModal, setShowModal] = useState(false);

  function onClickHandler() {
    setShowModal(true);
  }

  return (
    <>
      {showLoginModal && (
        <Dialog setShowModal={setShowModal}>
          <UserModalBox setShowModal={setShowModal} />
        </Dialog>
      )}
      <UserBtn setShowModal={setShowModal} />
      <UserContainer onClick={onClickHandler}>
        {authService.currentUser.displayName}
        <SSizedBox width="16px" />
        <LogoutBtn />
      </UserContainer>
    </>
  );
};

const UserContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 46px;
  max-width: 500px;
  padding: 0px 24px;
  border: 1px solid grey;
  border-radius: 21px;
  background: #2b2a37;
  font-size: 2rem;
  cursor: pointer;

  ${({ theme }) => theme.device.tablet} {
    display: none;
  }

  &:hover {
    background-color: ${({ theme }) => theme.colors.gray3};
  }
`;
