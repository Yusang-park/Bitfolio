import React, { useContext } from "react";
import styled from "styled-components";
import { UserContext } from "../../Provider/UserProvider";
import { CryptoDataContext } from "../Details";
import {
  SExpanded,
  SPercentText,
  SSizedBox,
  SColumn,
  SBoldTitleText,
  SGrayText,
  SBookmark,
} from "../../Components/GlobalComponents";
import { useTranslation } from "react-i18next";

export const DetailsHeader = () => {
  const {
    setFavoriteCrypto,
    favorites,
  }: { setFavoriteCrypto: Function; favorites: { [key: string]: any } } =
    useContext(UserContext);
  const { data }: { data: any } = useContext(CryptoDataContext);
  const { i18n } = useTranslation();

  return (
    <Container>
      <Image src={data.imageUrl}></Image>
      <SSizedBox width="5%" />
      <SColumn>
        <SBoldTitleText>{data.fullName[i18n.language]}</SBoldTitleText>
        <SSizedBox height="4px" />
        <SGrayText>{data.symbol.toUpperCase()}</SGrayText>
      </SColumn>
      <SSizedBox width="3%" />
      <SColumn>
        <SBoldTitleText>{"$" + data.price.toLocaleString()}</SBoldTitleText>
        <SSizedBox height="4px" />
        <SPercentText negative={data.pricePercent24h.includes("-")}>
          {data.pricePercent24h}
        </SPercentText>
      </SColumn>
      <SSizedBox width="5%" />
      <SExpanded flex="1" />
      <SBookmark
        isSelected={favorites[data.id]}
        onClick={() =>
          setFavoriteCrypto(data.id, data.fullName["en"], data.imageUrl)
        }
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
