import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useContext } from "react";
import styled from "styled-components";
import { UserContext } from "../../Provider/UserProvider";
import { CryptoDataContext } from "../Details";
import {
  S_Expanded,
  S_PercentText,
  S_SizedBox,
  S_Column,
  S_BoldTitleText,
  S_GrayText,
  S_Bookmark,
} from "../../Components/GlobalComponents";

export const DetailsHeader = () => {
  const { setFavoriteCrypto, favorites } = useContext(UserContext);
  const { data } = useContext(CryptoDataContext);

  return (
    <Container>
      <Image src={data.imageUrl}></Image>
      <S_SizedBox width="5%" />
      <S_Column>
        <S_BoldTitleText>{data.fullName}</S_BoldTitleText>
        <S_SizedBox height="4px" />
        <S_GrayText>{data.symbol.toUpperCase()}</S_GrayText>
      </S_Column>
      <S_SizedBox width="3%" />
      <S_Column>
        <S_BoldTitleText>{"$" + data.price.toLocaleString()}</S_BoldTitleText>
        <S_SizedBox height="4px" />
        <S_PercentText negative={data.pricePercent24h.includes("-")}>
          {data.pricePercent24h}
        </S_PercentText>
      </S_Column>
      <S_SizedBox width="5%" />
      <S_Expanded flex="1" />
      <S_Bookmark
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

  border-radius: 50px;
`;
