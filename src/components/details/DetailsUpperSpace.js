import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useContext } from "react";
import styled from "styled-components";
import { CryptoDataContext } from "../../routes/Details";
import {
  Expanded,
  PercentText,
  SizedBox,
  Column,
  BoldTitleText,
  GrayText,
} from "../../styles/components";

export const DetailsUpperContainer = () => {
  const { data } = useContext(CryptoDataContext);

  return (
    <Container>
      <Image src={data.imageUrlLarge}></Image>
      <Column>
        <BoldTitleText>{data.fullName}</BoldTitleText>
        <SizedBox height="4px" />
        <GrayText>{data.symbol.toUpperCase()}</GrayText>
      </Column>
      <SizedBox width="32px" />
      <Column>
        <BoldTitleText>{"$ " + data.price.toLocaleString()}</BoldTitleText>
        <SizedBox height="4px" />
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
  margin-bottom: 3.75%;
`;

const Image = styled.img`
  width: 56px;
  padding-right: 32px;
`;
