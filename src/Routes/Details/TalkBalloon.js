import styled from "styled-components";
import React from "react";
import { Timestamp } from "@firebase/firestore";
import {
  Button,
  S_Divider,
  S_Row,
  S_SizedBox,
  S_Text,
} from "../../Components/GlobalComponents";

export const TalkBox = React.memo(({ docKey, data, isMine }) => {
  const { createdAt, message, name } = data[1];
  let date = new Timestamp(createdAt.seconds, createdAt.nanoseconds).toDate();

  return (
    <Container>
      <RowCustom justify_content="space-between">
        <span>
          <S_Text> {name}</S_Text>
          {/* {isMine && <Button height="20px">Delete</Button>} */}
        </span>
        <Time>
          {date.getMonth() + 1}.{date.getDate()} {date.getHours()}:
          {date.getMinutes()}
        </Time>
      </RowCustom>
      <S_SizedBox height="12px" />
      <S_Divider />
      <S_SizedBox height="12px" />
      <Message> {message}</Message>
    </Container>
  );
});

const RowCustom = styled(S_Row)`
  flex-wrap: wrap;
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;

  margin: 16px 0px;
  padding: 16px;
  border-radius: 21px;
  border: 1px solid gray;
  background: #2b2a37;
  color: white;
`;

const Time = styled.div`
  font-size: 1.4rem;
  color: gray;
`;

const Message = styled.div`
  overflow: hidden;
  text-overflow: clip;
  display: inline-grid;
  -webkit-line-clamp: 4; // max nb lines to show
  -webkit-box-orient: vertical;
  word-break: break-all;
  font-size: 1.6rem;
`;
