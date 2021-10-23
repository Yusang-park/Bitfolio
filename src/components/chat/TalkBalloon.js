import styled from "styled-components";
import React from "react";
import { Timestamp } from "@firebase/firestore";

export function TalkBalloonL({ data }) {
  const { createdAt, message, name } = data[1];

  return (
    <Talk_L>
      <Avatar src="http://placehold.jp/50x50.png"></Avatar>
      <Balloon_L>
        <InfoRow>
          <Name>{name}</Name>
          <Time>{}</Time>
        </InfoRow>
        {message}
      </Balloon_L>
    </Talk_L>
  );
}

export function TalkBalloonR({ data }) {
  const { createdAt, message, name } = data[1];
  let date = new Date(createdAt.seconds * 1000);
  return (
    <Talk_R>
      <Balloon_R>
        <InfoRow>
          <Time>
            {date.getMonth()}.{date.getDay()} {date.getHours()}:
            {date.getMinutes()}
          </Time>
          <Name>{name}</Name>
        </InfoRow>
        <Message> {message}</Message>
      </Balloon_R>
      <Avatar src="http://placehold.jp/50x50.png"></Avatar>
    </Talk_R>
  );
}

const Talk = styled.div`
  display: grid;
  padding: 1rem 0;
`;

const Talk_L = styled(Talk)`
  grid-template-columns: 50px auto;
`;

const Talk_R = styled(Talk)`
  grid-template-columns: auto 50px;
`;

const Avatar = styled.img`
  border-radius: 50%;
  height: 50px;
  object-fit: cover;
  width: 50px;
`;
const InfoRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 8px;
`;

const Name = styled.div`
  font-size: 16px;
  text-align: left;
`;

const Time = styled.div`
  font-size: 14px;
  text-align: right;
  color: gray;
`;

const Balloon = styled.div`
  background: white;
  border-radius: 25px;
  padding: 1rem;
  position: relative;
`;

const Balloon_L = styled(Balloon)`
  width: 21vw;
  height: 100%;
  margin: 0 0 0 1rem;
  &::before {
    border-top: 10px solid transparent;
    border-left: 10px solid #f5f5f5;
    border-bottom: 10px solid transparent;
    content: "";
    height: 0;
    position: absolute;
    top: 0.3rem;
    left: -0.3rem;
    transform: rotate(90deg);
    width: 0;
  }
`;
const Balloon_R = styled(Balloon)`
  width: 21vw;
  margin: 0 1rem 0 0;
  &::before {
    border-top: 10px solid transparent;
    border-left: 10px solid #f5f5f5;
    border-bottom: 10px solid transparent;
    content: "";
    height: 0;
    position: absolute;
    top: 0.3rem;
    right: -0.3rem;
    transform: rotate(90deg);
    width: 0;
  }
`;
const Message = styled.div`
  width: 21vw;
  height: 100%;
`;
