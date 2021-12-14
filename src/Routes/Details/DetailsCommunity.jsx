import React, { useContext } from "react";
import styled from "styled-components";
import {
  SAnimatedDiv,
  SScrollColumn,
  SSizedBox,
  SURLText,
} from "../../Components/GlobalComponents";
import { YellowTitleCircle } from "../../Components/TransComponants";
import { CryptoDataContext } from "../Details";

export const DetailsCommunity = () => {
  const { data } = useContext(CryptoDataContext);

  const type = [
    { name: "Homepage", key: "homepage", prefix: "" },
    { name: "Announcement", key: "announcement_url", prefix: "" },
    {
      name: "Telegram",
      key: "telegram_channel_identifier",
      prefix: "https://t.me/",
    },
    {
      name: "Twitter",
      key: "twitter_screen_name",
      prefix: "https://twitter.com/",
    },
  ];

  return (
    <Wrapper>
      <SScrollColumn>
        {type.map((e, i) => {
          let url;

          if (typeof data[e.key] === "string") {
            if (data[e.key] === "") {
              return null;
            }
            url = e.prefix + data[e.key];
          } else {
            url = e.prefix + data[e.key][0];
            if (data[e.key][0] === "") {
              return null;
            }
          }

          return (
            <ElementContainer key={i}>
              <YellowTitleCircle>{e.name}</YellowTitleCircle>
              <SSizedBox height="8px" />
              <SURLText href={url}>{url}</SURLText>
            </ElementContainer>
          );
        })}
      </SScrollColumn>
    </Wrapper>
  );
};

const Wrapper = styled(SAnimatedDiv)`
  position: relative;
  width: 100%;
  height: 100%;
`;

const ElementContainer = styled.div`
  margin: 0px 0px 16px;
`;
