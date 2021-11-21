import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useContext } from "react";
import styled from "styled-components";
import { UserContext } from "../../Provider/UserProvider";
import { CryptoDataContext } from "../Details";
import {
  _Expanded,
  _PercentText,
  _SizedBox,
  _Column,
  _BoldTitleText,
  _GrayText,
  _Bookmark,
} from "../../Components/GlobalComponents";

export const DetailsHeader = () => {
  const { setFavoriteCrypto, favorites } = useContext(UserContext);
  const { data } = useContext(CryptoDataContext);

  return (
    <Container>
      <Image src={data.imageUrl}></Image>
      <_SizedBox width="3%" />
      <_Column>
        <_BoldTitleText>{data.fullName}</_BoldTitleText>
        <_SizedBox height="4px" />
        <_GrayText>{data.symbol.toUpperCase()}</_GrayText>
      </_Column>
      <_SizedBox width="3%" />
      <_Column>
        <_BoldTitleText>{"$" + data.price.toLocaleString()}</_BoldTitleText>
        <_SizedBox height="4px" />
        <_PercentText negative={data.pricePercent24h.includes("-")}>
          {data.pricePercent24h}
        </_PercentText>
      </_Column>{" "}
      <_SizedBox width="3%" />
      <_Expanded flex="1" />
      <_Bookmark
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
