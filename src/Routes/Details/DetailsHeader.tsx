import React, { useContext } from "react";
import styled from "styled-components";
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
import { useAppSelector } from "../../Reducer/RootReducer";
import { fetchFavoriteCrypto } from "../../Reducer/UserReducer";
import { useDispatch } from "react-redux";

export const DetailsHeader = React.memo(() => {
  const dispatch = useDispatch();
  const favorites = useAppSelector((state) => state.userReducer.favorites);

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
          dispatch(
            fetchFavoriteCrypto(
              data.id,
              data.fullName["en"],
              data.imageUrl
            ) as any
          )
        }
        size="2x"
      />
    </Container>
  );
});

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
