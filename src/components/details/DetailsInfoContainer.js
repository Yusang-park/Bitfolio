import React, { useRef, useEffect, useContext, useState } from "react";
import styled from "styled-components";
import { CryptoDataContext } from "../../routes/Details";
import { fadeIn } from "../../styles/animation";
import {
  AnimatedDiv,
  Expanded,
  GrayText,
  SizedBox,
  YellowTitleCircle,
  Row,
  Column,
} from "../global-components";
import useWindowDimensions from "../../useWindowDimensions";
import { Chart } from "./TradingViewChart";

export const DetailsInfoContainer = () => {
  const { data } = useContext(CryptoDataContext);

  const MarketCapBox = () => (
    <InfoElementContainer>
      <YellowTitleCircle>Market Cap</YellowTitleCircle>
      {"$" + data.marketCap.toLocaleString()}
      <SizedBox height="4px" />
      <GrayText>{"Rank. #" + data.marketCapRank}</GrayText>
    </InfoElementContainer>
  );

  const SupplyAmountBox = () => (
    <InfoElementContainer>
      <YellowTitleCircle>Supply Amount</YellowTitleCircle>

      <Row justify_content="space-between">
        Current
        <SizedBox width="12px" />
        {data.currentSupply.toLocaleString()}
      </Row>

      <SizedBox height="4px" />
      <Row justify_content="space-between">
        <GrayText>Max</GrayText>
        <SizedBox width="12px" />
        <GrayText>
          {data.maxSupply ? data.maxSupply.toLocaleString() : "♾️"}
        </GrayText>
      </Row>
    </InfoElementContainer>
  );

  const VolumeBox = () => (
    <InfoElementContainer>
      <YellowTitleCircle>Volume(24h)</YellowTitleCircle>
      {"$" + data.volume.toLocaleString()}
    </InfoElementContainer>
  );

  return (
    <Container>
      <RowCustom justify_content="flex-start" align_items="flex-start">
        <MarketCapBox />
        <SupplyAmountBox />
        <VolumeBox />
      </RowCustom>
      <SizedBox height="16px" />
      <Chart coin={data.tradingViewCoinId} />
    </Container>
  );
};

const RowCustom = styled(Row)`
  flex-wrap: wrap;
`;

const InfoElementContainer = styled(Column)`
  justify-content: flex-start;
  align-items: flex-end;
  height: fit-content;
  margin-right: 32px;
  margin-bottom: 16px;
`;

const Container = styled(AnimatedDiv)`
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
