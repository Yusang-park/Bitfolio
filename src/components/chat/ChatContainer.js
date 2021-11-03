import React, { useContext, useEffect, useState } from "react";
import { useRef } from "react";
import styled from "styled-components";
import { fadeIn } from "../../styles/animation";
import { CryptoDataContext } from "../../routes/Details";
import {
  Button,
  Row,
  ScaffoldStyle,
  SizedBox,
  TitleText,
} from "../../styles/components";
import { authService } from "../../firebase_config";
import { getChatMessages, sendChatMessage } from "../../service/fireDb";
import { TalkBox } from "./TalkBalloon";
import $ from "jquery";

export const ChatScaffold = () => {
  const useRefWhole = useRef();
  const useRefScroll = useRef();
  const [chatBoxSize, setChatBoxSize] = useState(0);
  const [inputText, setInputText] = useState("");
  const { data } = useContext(CryptoDataContext);
  const [chatData, setChatData] = useState({});

  //Overflow(Scroll) 발생 시 height 크기가 의도한대로 출력되지 않는 문제를 해결하기 위함
  useEffect(() => {
    setChatBoxSize({
      height: `${useRefWhole.current.clientHeight * 0.8}px`,
    });

    getChatMessages(data.id, (value) => {
      if (value)
        setChatData(Object.entries(value), () => {
          $("#chatContent").scrollTop($("#chatContent")[0].scrollHeight);
        });
    });
  }, []);

  useEffect(() => {
    try {
      $("#chatContent").scrollTop($("#chatContent")[0].scrollHeight);
    } catch (e) {}
  }, [chatData]);

  function onChange(e) {
    if (e.target.value.endsWith("\n")) {
      onSubmit(e.target.value.replace("\n", ""));
      setInputText("");
    } else setInputText(e.target.value);
  }

  function onSubmit(message) {
    if (message.replace(" ", "").length > 0) sendChatMessage(data.id, message);
  }

  return (
    <Scaffold ref={useRefWhole}>
      <TitleText>{data.fullName} Chat </TitleText>
      <SizedBox height="32px" />
      {chatData.length !== 0 && (
        <ChatContainer
          id="chatContent"
          ChatHistory
          height={chatBoxSize["height"]}
        >
          {Object.values(chatData).map(
            (e, i) =>
              authService.currentUser != null && (
                <TalkBox
                  key={i}
                  data={e}
                  isMine={e[1].uid === authService.currentUser.uid}
                />
              )
          )}
        </ChatContainer>
      )}

      <InputContainer>
        <textarea
          disabled={authService.currentUser === null}
          placeholder={
            authService.currentUser === null ? "Login first to chat" : ""
          }
          value={inputText}
          onChange={onChange}
        ></textarea>
        <Button>Send</Button>
      </InputContainer>
    </Scaffold>
  );
};

const Scaffold = styled(ScaffoldStyle)`
  width: 33%;
  padding-right: 28px;
`;

const ChatContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: ${(props) => props.height};
  width: calc(100% - 4px);
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

const InputContainer = styled(Row)`
  width: 100%;
  height: 15%;
  max-height: 96px;
  padding: 5px;
  box-sizing: border-box;

  resize: none;
  border-radius: 25px;
  border: 1px solid gray;

  background-color: ${({ theme }) => theme.colors.gray2};
  color: white;
  font-size: 18px;
  &:focus {
    outline: transparent;
    border: 1px solid ${({ theme }) => theme.colors.blue};
    box-shadow: 0 0 10px transparent;
  }
`;
