import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useContext } from "react";
import styled from "styled-components";
import { CryptoDataContext } from "../../routes/Details";
import { Expanded, PercentText, SizedBox } from "../../styles/components";

export const DetailsUpperContainer = () => {
  const { data } = useContext(CryptoDataContext);

  return (
    <Container>
      <Image src={data.imageUrlLarge}></Image>
      <Column>
        <BoldText>{data.fullName}</BoldText>
        <SizedBox height="4px" />
        <SubText>{data.symbol.toUpperCase()}</SubText>
      </Column>
      <Column>
        <BoldText>{"$ " + data.price.toLocaleString()}</BoldText>
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
