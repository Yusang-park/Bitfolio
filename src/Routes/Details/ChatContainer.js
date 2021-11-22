import React, { useContext, useEffect, useState } from "react";
import { useRef } from "react";
import styled from "styled-components";
import { fadeIn } from "../../Styles/Animation";
import { CryptoDataContext } from "../Details";
import { authService } from "../../firebase_config";
import {
  getChatMessages,
  sendChatMessage,
} from "../../Service/FirebaseFunctions";
import { TalkBox } from "./TalkBalloon";
import $ from "jquery";
import {
  _StyledBox,
  _Row,
  _SizedBox,
  _TitleText,
} from "../../Components/GlobalComponents";

export const ChatContainer = React.memo(() => {
  const useRefScroll = useRef();
  const [inputText, setInputText] = useState("");
  const { data } = useContext(CryptoDataContext);
  const [chatData, setChatData] = useState({});

  useEffect(() => {
    getChatMessages(data.id, (value) => {
      if (value) {
        setChatData(Object.entries(value));
      }
    });
  }, [data.id, getChatMessages, setChatData]);

  useEffect(() => {
    try {
      $("#chatContent").scrollTop($("#chatContent")[0].scrollHeight);
    } catch (e) {}
  }, [chatData]);

  function onChange(e) {
    if (e.target.value.endsWith("\n")) {
      onSubmit(e.target.value.replace("\n", ""));
    } else setInputText(e.target.value);
  }

  function onSubmit(message) {
    if (message.replace(" ", "").length > 0) {
      sendChatMessage(data.id, message);
      setInputText("");
    }
  }

  return (
    <Wrapper>
      <_TitleText>{data.fullName} Chat </_TitleText>
      <_SizedBox height="32px" />

      <ChatSpace>
        {chatData.length !== 0 && (
          <ChatScrollBox id="chatContent" ChatHistory>
            {Object.values(chatData).map(
              (e, i) =>
                authService.currentUser != null && (
                  <TalkBox
                    key={i}
                    docKey={Object.keys(chatData)[i]}
                    data={e}
                    isMine={e[1].uid === authService.currentUser.uid}
                  />
                )
            )}
          </ChatScrollBox>
        )}
      </ChatSpace>

      <InputContainer>
        <Input
          disabled={authService.currentUser === null}
          placeholder={
            authService.currentUser === null ? "Login first to chat" : ""
          }
          value={inputText}
          onChange={onChange}
        ></Input>
        <SendButton onClick={() => onSubmit(inputText)}>SEND</SendButton>
      </InputContainer>
    </Wrapper>
  );
});

const ChatSpace = styled.div`
  height: 100%;
  width: 100%;
  position: relative;

  ${({ theme }) => theme.device.tablet} {
    height: 65vh;
  }
`;

const Wrapper = styled(_StyledBox)`
  flex: 1;
  padding-right: 28px;
`;

const ChatScrollBox = styled.div`
  position: absolute;
  display: flex;
  flex-direction: column;
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

const InputContainer = styled(_Row)`
  height: 15%;
  max-height: 96px;
  padding: 12px 0px;
  border-radius: 25px;
  border: 1px solid white;

  background-color: ${({ theme }) => theme.colors.gray2};
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
