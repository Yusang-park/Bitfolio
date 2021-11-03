import styled from "styled-components";
import React from "react";
import { Timestamp } from "@firebase/firestore";
import { Button, Divider, Row, SizedBox } from "../../styles/components";

export const TalkBox = React.memo(({ data, isMine }) => {
  const { createdAt, message, name } = data[1];
  let date = new Timestamp(createdAt.seconds, createdAt.nanoseconds).toDate();

  return (
    <Container>
      <Row justify_content="space-between">
        <span>
          {name}
          {isMine && <Button height="20px">Delete</Button>}
        </span>
        <Time>
          {date.getMonth() + 1}.{date.getDate()} {date.getHours()}:
          {date.getMinutes()}
        </Time>
      </Row>
      <SizedBox height="12px" />
      <Divider />
      <SizedBox height="12px" />
      <Message> {message}</Message>
    </Container>
  );
});

const Container = styled.div`
  display: flex;
  flex-direction: column;

  margin: 16px;
  padding: 20px;
  border-radius: 21px;
  border: 1px solid gray;
  background: #2b2a37;
  color: white;
`;

const Time = styled.div`
  font-size: 14px;
  color: gray;
`;

const Message = styled.div`
  overflow: hidden;
  text-overflow: clip;
  display: inline-grid;
  -webkit-line-clamp: 4; // max nb lines to show
  -webkit-box-orient: vertical;
  word-break: break-all;
`;
