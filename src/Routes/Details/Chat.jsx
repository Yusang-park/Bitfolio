import React, { useContext, useEffect, useMemo, useState } from "react";

import styled from "styled-components";
import { CryptoDataContext } from "../Details";
import { authService } from "../../firebase_config";
import {
  getChatMessages,
  sendChatMessage,
} from "../../Service/FirebaseFunctions";
import { TalkBox } from "./TalkBalloon";
// import $ from "jquery";
import {
  SStyledBox,
  SRow,
  SSizedBox,
  STitleText,
} from "../../Components/GlobalComponents";
import { UserContext } from "../../Provider/UserProvider";
import { TitleText } from "../../Components/TransComponants";

export const Chat = React.memo(() => {
  const [inputText, setInputText] = useState("");
  const { data } = useContext(CryptoDataContext);
  const { tempNickname } = useContext(UserContext);
  const [chatData, setChatData] = useState({});

  useEffect(() => {
    getChatMessages(data.id, (value) => {
      if (value) {
        let res = Object.entries(value).reverse();
        setChatData(res);
      }
    });
  }, [data.id, setChatData]);

  function onChange(e) {
    if (e.target.value.endsWith("\n")) {
      onSubmit(e.target.value.replace("\n", ""));
    } else setInputText(e.target.value);
  }

  function onSubmit(message) {
    if (message.replace(" ", "").length > 0) {
      sendChatMessage(data.id, message, tempNickname);
      setInputText("");
    }
  }

  return (
    <Wrapper>
      <SRow justify_content="flex-start">
        <TitleText>Chat</TitleText>
        <STitleText> ({data.fullName})</STitleText>
      </SRow>

      <SSizedBox height="16px" />

      <ChatContainer>
        {useMemo(() => {
          return (
            <ChatScrollItem id="chatContent" ChatHistory>
              {Object.values(chatData).map((e, i) => (
                <TalkBox
                  key={i}
                  docKey={Object.keys(chatData)[i]}
                  data={e}
                  isMine={
                    (authService.currentUser != null &&
                      e[1].uid === authService.currentUser.uid) ||
                    (authService.currentUser == null &&
                      e[1].name === tempNickname)
                  }
                />
              ))}
            </ChatScrollItem>
          );
        }, [chatData, tempNickname])}
      </ChatContainer>

      <InputContainer>
        <Input
          // disabled={authService.currentUser === null}
          placeholder={
            authService.currentUser === null ? `${tempNickname}` : ""
          }
          value={inputText}
          onChange={onChange}
          maxLength={70}
        ></Input>
        <SendButton onClick={() => onSubmit(inputText)}>SEND</SendButton>
      </InputContainer>
    </Wrapper>
  );
});

const ChatContainer = styled.div`
  height: 100%;
  width: 100%;
  position: relative;

  ${({ theme }) => theme.device.tablet} {
    height: 82vh;
  }
`;

const Wrapper = styled(SStyledBox)`
  padding-right: 28px;

  ${({ theme }) => theme.device.mobile} {
    padding: 24px;
  }
`;

const ChatScrollItem = styled.div`
  position: absolute;
  display: flex;
  flex-direction: column-reverse;

  width: 100%;
  height: 100%;
  padding-right: 4px;
  color: black;
  overflow-y: auto;
  overflow-x: hidden;

  &::-webkit-scrollbar {
    width: 4px;
    border-radius: 25px;
    background: transparent;
  }
  &::-webkit-scrollbar-thumb {
    background-color: gray;
    border-radius: 4px;
  }
`;

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
