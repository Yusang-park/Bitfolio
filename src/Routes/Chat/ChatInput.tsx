import React, { useState, useContext } from "react";
import styled from "styled-components";
import { SRow } from "../../Components/GlobalComponents";
import { authService } from "../../firebase_config";

import { UserContext } from "../../Provider/UserProvider";
import { sendChatMessage } from "../../Service/FirebaseFunctions";
export const ChatInput = ({ id }: { id: string }) => {
  const { tempNickname } = useContext(UserContext);

  const [inputText, setInputText] = useState("");

  function onSubmit(message: string) {
    if (message.replace(" ", "").length > 0) {
      sendChatMessage(id, message, tempNickname);
      setInputText("");
    }
  }

  function onChange(e: any) {
    if (e.target.value.endsWith("\n")) {
      onSubmit(e.target.value.replace("\n", ""));
    } else setInputText(e.target.value);
  }

  return (
    <InputContainer>
      <Input
        // disabled={authService.currentUser === null}
        placeholder={authService.currentUser === null ? `${tempNickname}` : ""}
        value={inputText}
        onChange={onChange}
        maxLength={70}
      ></Input>
      <SendButton onClick={() => onSubmit(inputText)}>SEND</SendButton>
    </InputContainer>
  );
};

const InputContainer = styled(SRow)`
  height: 15%;
  max-height: 96px;
  padding: 12px 0px;
  border-radius: 25px;
  border: 1px solid white;

  background-color: ${({ theme }) => theme.colors.gray2};

  ${({ theme }) => theme.device.tablet} {
    height: 6%;
  }
`;

const SendButton = styled.div`
  display: flex;
  width: 20%;
  min-width: 45px;
  max-width: 85px;
  height: 100%;
  margin-right: 12px;
  justify-content: center;
  align-items: center;
  border-radius: 12px;
  font-size: 1.6rem;
  color: black;
  background: linear-gradient(#ffcd00 0%, #ffcd00 100%);

  &:hover {
    background: linear-gradient(#f9de73 0%, #f9de73 100%);
  }
`;

const Input = styled.textarea`
  width: 100%;
  height: 100%;
  padding-left: 12px;
  box-sizing: border-box;
  resize: none;
  color: white;
  background-color: transparent;
  border: 0px;
  font-size: 1.8rem;
  &:focus {
    outline: transparent;
    border: 0px solid transparent;
    box-shadow: 0 0 10px transparent;
  }
`;
