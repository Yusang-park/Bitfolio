import React, { useRef, useEffect, useContext, useState } from "react";
import styled from "styled-components";
import { CryptoDataContext } from "../Details";
import { fadeIn } from "../../Styles/Animation";
import {
  S_AnimatedDiv,
  S_Expanded,
  S_GrayText,
  S_SizedBox,
  S_YellowTitleCircle,
  S_Row,
  S_Column,
  S_Text,
} from "../../Components/GlobalComponents";
import useWindowDimensions from "../../useWindowDimensions";
import { Chart } from "../../Components/TradingViewChart";

export const DetailsInfoTabContainer = () => {
  const { data } = useContext(CryptoDataContext);

  const MarketCapBox = () => (
    <InfoElementContainer>
      <S_YellowTitleCircle>Market Cap</S_YellowTitleCircle>
      <S_Text>{"$" + data.marketCap.toLocaleString()}</S_Text>
      <S_SizedBox height="4px" />
      <S_GrayText>{"Rank. #" + data.marketCapRank}</S_GrayText>
    </InfoElementContainer>
  );

  const SupplyAmountBox = () => (
    <InfoElementContainer>
      <S_YellowTitleCircle>Supply Amount</S_YellowTitleCircle>

      <S_Row justify_content="space-between">
        <S_Text>Current</S_Text>
        <S_SizedBox width="12px" />
        <S_Text>{data.currentSupply.toLocaleString()}</S_Text>
      </S_Row>

      <S_SizedBox height="4px" />
      <S_Row justify_content="space-between">
        <S_GrayText>Max</S_GrayText>
        <S_SizedBox width="12px" />
        <S_GrayText>
          {data.maxSupply ? data.maxSupply.toLocaleString() : "♾️"}
        </S_GrayText>
      </S_Row>
    </InfoElementContainer>
  );

  const VolumeBox = () => (
    <InfoElementContainer>
      <S_YellowTitleCircle>Volume(24h)</S_YellowTitleCircle>
      <S_Text> {"$" + data.volume.toLocaleString()}</S_Text>
    </InfoElementContainer>
  );

  return (
    <Container>
      <RowCustom justify_content="flex-start" align_items="flex-start">
        <MarketCapBox />

        <VolumeBox />
        <SupplyAmountBox />
      </RowCustom>
      <S_SizedBox height="16px" />
      <Chart coin={data.tradingViewCoinId} />
    </Container>
  );
};

const RowCustom = styled(S_Row)`
  flex-wrap: wrap;
`;

const InfoElementContainer = styled(S_Column)`
  justify-content: flex-start;
  align-items: flex-end;
  height: fit-content;
  margin-right: 32px;
  margin-bottom: 16px;
`;

const Container = styled(S_AnimatedDiv)`
  display: flex;
  flex-direction: column;
  flex: 1;
  height: 100px;
`;

const ChartContainer = styled.div`
  display: flex;
  width: 100%;
  height: 100%;
  align-items: center;
`;
