import React, { useContext, useEffect, useMemo, useState } from "react";

import styled, { css } from "styled-components";

import { UserContext } from "../../Provider/UserProvider";
import { authService } from "../../firebase_config";
import { getChatMessages } from "../../Service/FirebaseFunctions";
import { TalkBox } from "../Details/TalkBalloon";

import {
  SStyledBox,
  SRow,
  SSizedBox,
  SGrayText,
} from "../../Components/GlobalComponents";

import { useTranslation } from "react-i18next";
import { ChatInput } from "./ChatInput";
import { TitleText } from "../../Components/TransComponants";

const categories = [
  "Free",
  "Hot Crypto",
  "Margin/Future",
  "Binance",
  "Upbit",
  "Bithumb",
];

const Chat = React.memo(
  ({
    cryptoId = categories[0],
    fullName,
    expand,
  }: {
    cryptoId?: string;
    fullName?: { [key: string]: any };
    expand?: boolean;
  }) => {
    const [id, setId] = useState(cryptoId);
    const [chatData, setChatData] = useState({});
    const { t, i18n } = useTranslation();
    const { tempNickname } = useContext(UserContext);

    useEffect(() => {
      getChatMessages(id, (value: object) => {
        if (value) {
          let res = Object.entries(value).reverse();
          setChatData(res);
        } else {
          setChatData([]);
        }
      });
    }, [setChatData, id]);

    function onChangeSelect(e: any) {
      setId(e.target.value);
    }

    return (
      <Wrapper expand={expand}>
        <SRow justify_content="flex-start" align_items="center">
          <TitleText>Chat</TitleText>
          <SSizedBox width="8px" />

          {expand ? (
            <select onChange={onChangeSelect}>
              {categories.map((e, i) => (
                <option value={e} key={i}>
                  {t<string>(e)}
                </option>
              ))}
            </select>
          ) : (
            <SGrayText> ({fullName![i18n.language].toString()})</SGrayText>
          )}
        </SRow>

        <SSizedBox height="16px" />

        <ChatContainer>
          {useMemo(() => {
            return (
              <ChatScrollItem id="chatContent">
                {Object.values(chatData).map((e: any, i) => (
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
        <ChatInput id={id} />
      </Wrapper>
    );
  }
);

export default Chat;

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
  ${({ expand }) =>
    expand &&
    css`
      width: 60%;
    `}
  ${({ theme }) => theme.device.tablet} {
    ${({ expand }) =>
      expand &&
      css`
        width: auto;
      `}
  }
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
