import React, { useContext, useEffect, useState } from "react";
import { useRef } from "react";
import styled from "styled-components";
import { fadeIn } from "../../styles/animation";
import { CryptoDataContext } from "../../routes/Details";
import { Button, SizedBox } from "../../styles/components";
import { authService } from "../../firebase_config";
import { getChatMessages, sendChatMessage } from "../../service/fireDb";
import { TalkBalloonL, TalkBalloonR } from "./TalkBalloon";
import $ from "jquery";

export const ChatContainer = () => {
  const useRefWhole = useRef();
  const useRefScroll = useRef();
  const [chatBoxSize, setChatBoxSize] = useState(0);
  const [inputText, setInputText] = useState("");
  const { data } = useContext(CryptoDataContext);
  const [chatData, setChatData] = useState({});

  //Overflow(Scroll) 발생 시 height 크기가 의도한대로 출력되지 않는 문제를 해결하기 위함
  useEffect(() => {
    setChatBoxSize(`${useRefWhole.current.clientHeight * 0.8}px`);

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
    <Whole ref={useRefWhole}>
      <TitleText>{data.fullName} Chat </TitleText>
      <SizedBox height="32px" />
      {chatData.length !== 0 && (
        <ChatHistory id="chatContent" ChatHistory height={chatBoxSize}>
          {Object.values(chatData).map((e, i) =>
            authService.currentUser != null &&
            e[1].uid === authService.currentUser.uid ? (
              <TalkBalloonR key={i} data={e} />
            ) : (
              <TalkBalloonL key={i} data={e} />
            )
          )}
        </ChatHistory>
      )}

      <ChatInput
        disabled={authService.currentUser === null}
        placeholder={
          authService.currentUser === null ? "Login first to chat" : ""
        }
        value={inputText}
        onChange={onChange}
      ></ChatInput>
    </Whole>
  );
};

const Whole = styled.span`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  width: 33%;
  padding: 32px 32px 32px 32px;
  border-radius: 25px;
  background-color: ${({ theme }) => theme.colors.boxBackground};
  animation-duration: 0.5s;
  animation-timing-function: ease-out;
  animation-name: ${fadeIn};
  animation-fill-mode: forwards;
  box-shadow: 0px 3px 6px rgba(0, 0, 0, 0.16);
`;

const TitleText = styled.div`
  font-size: 26px;
`;

const ChatHistory = styled.div`
  height: ${(props) => props.height};
  width: calc(100% - 8px);
  padding-right: 8px;
  color: black;
  overflow-y: auto;

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

const ChatInput = styled.textarea`
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
