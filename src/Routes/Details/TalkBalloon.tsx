import styled, { css } from "styled-components";
import React from "react";
import { Timestamp } from "@firebase/firestore";
import {
  Props,
  SDivider,
  SRow,
  SSizedBox,
  InnerBox,
} from "../../Components/GlobalComponents";

export const TalkBox = React.memo(
  ({
    docKey,
    data,
    isMine,
  }: {
    docKey: string;
    data: any;
    isMine: boolean;
  }) => {
    const { createdAt, message, name } = data[1];
    let date = new Timestamp(createdAt.seconds, createdAt.nanoseconds).toDate();

    return (
      <Container>
        <RowCustom justify_content="space-between">
          <span>
            <NameText isMine={isMine}> {name}</NameText>
          </span>
          <TimeText>
            {date.getMonth() + 1}.{date.getDate()} {date.getHours()}:
            {date.getMinutes()}
          </TimeText>
        </RowCustom>
        <SSizedBox height="12px" />
        <SDivider />
        <SSizedBox height="12px" />
        <Message> {message}</Message>
      </Container>
    );
  }
);

const NameText = styled.p<Props>`
  color: ${({ theme, isMine }) => (isMine ? theme.colors.blue : css`white`)};
  font-size: 1.6rem;
`;

const RowCustom = styled(SRow)`
  flex-wrap: wrap;
`;

const Container = styled(InnerBox)``;

const TimeText = styled.div`
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
