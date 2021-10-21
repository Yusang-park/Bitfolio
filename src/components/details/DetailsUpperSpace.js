import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import styled from "styled-components";
import { Expanded, PercentText } from "../../styles/components";

export const DetailsUpperSpace = ({ data }) => {
  return (
    <Container>
      <Image src={data.imageUrlLarge}></Image>
      <Column>
        <BoldText>{data.fullName}</BoldText>
        <SubText>{data.symbol}</SubText>
      </Column>
      <Column>
        {/* //TODO: it doesn't work */}
        <BoldText>{"$ " + data.price.toLocaleString()}</BoldText>
        <PercentText negative={data.pricePercent24h.includes("-")}>
          {data.pricePercent24h}
        </PercentText>
      </Column>
      <Expanded flex="1" />

      <FontAwesomeIcon
        icon="bookmark"
        color="lightblue"
        size="2x"
      ></FontAwesomeIcon>
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  align-items: center;

  width: 100%;
  height: 83px;
`;

const Image = styled.img`
  width: 83px;
  padding-right: 32px;
`;

const BoldText = styled.div`
  font-size: 26px;
  font-weight: bold;
`;

const SubText = styled.div`
  color: ${(props) => props.theme.colors.gray};
`;

const Column = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  padding-right: 32px;
`;
