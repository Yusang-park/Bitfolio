import React, { useState } from "react";
import { useEffect } from "react/cjs/react.development";
import styled from "styled-components";
import { getCryptoDetails } from "../service/apis";
import { fadeIn } from "../styles/animation";
import { Row, SizedBox } from "../styles/components";
import { useLocation } from "react-router";
import { DetailsUpperSpace } from "../components/details/DetailsUpperSpace";
import { ProgressIndicator } from "../components/progressIndicator/progressIndicator";

export const Details = (props) => {
  const id = useLocation().state.id;
  const [data, setData] = useState(null);
  useEffect(() => {
    getCryptoDetails(id).then((response) => {
      setData(response);
    });
  }, [id]);

  return data === null ? (
    <ProgressIndicator />
  ) : (
    <Row>
      <DetailsContainer>
        <DetailsUpperSpace data={data}></DetailsUpperSpace>
      </DetailsContainer>
      <SizedBox width="32px" />
      <BoardContainer> </BoardContainer>
    </Row>
  );
};
//TODO: progress bar to center

const DetailsContainer = styled.div`
  flex: 5;
  padding: 48px;
  border-radius: 25px;
  background-color: ${({ theme }) => theme.colors.boxBackground};
  animation-duration: 0.5s;
  animation-timing-function: ease-out;
  animation-name: ${fadeIn};
  animation-fill-mode: forwards;
`;

const BoardContainer = styled.div`
  flex: 2;
  padding: 32px 32px 16px 32px;
  border-radius: 25px;
  background-color: ${({ theme }) => theme.colors.boxBackground};
  animation-duration: 0.5s;
  animation-timing-function: ease-out;
  animation-name: ${fadeIn};
  animation-fill-mode: forwards;
`;
