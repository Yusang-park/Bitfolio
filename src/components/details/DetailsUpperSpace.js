import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useContext } from "react";
import styled from "styled-components";
import { UserContext } from "../../provider/userProvider";
import { CryptoDataContext } from "../../routes/Details";
import {
  Expanded,
  PercentText,
  SizedBox,
  Column,
  BoldTitleText,
  GrayText,
  Bookmark,
} from "../global-components";

export const DetailsUpperContainer = () => {
  const { setFavoriteCrypto, favorites } = useContext(UserContext);
  const { data } = useContext(CryptoDataContext);

  return (
    <Container>
      <Image src={data.imageUrl}></Image>
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

      <Bookmark
        isSelected={favorites[data.id]}
        onClick={() => setFavoriteCrypto(data.id, data.fullName, data.imageUrl)}
        size="2x"
      />
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
  margin-right: 32px;
  border-radius: 50px;
`;
