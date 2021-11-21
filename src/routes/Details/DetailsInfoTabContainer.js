import React, { useRef, useEffect, useContext, useState } from "react";
import styled from "styled-components";
import { CryptoDataContext } from "../Details";
import { fadeIn } from "../../Styles/Animation";
import {
  _AnimatedDiv,
  _Expanded,
  _GrayText,
  _SizedBox,
  _YellowTitleCircle,
  _Row,
  _Column,
  _Text,
} from "../../Components/GlobalComponents";
import useWindowDimensions from "../../useWindowDimensions";
import { Chart } from "../../Components/TradingViewChart";

export const DetailsInfoTabContainer = () => {
  const { data } = useContext(CryptoDataContext);

  const MarketCapBox = () => (
    <InfoElementContainer>
      <_YellowTitleCircle>Market Cap</_YellowTitleCircle>
      <_Text>{"$" + data.marketCap.toLocaleString()}</_Text>
      <_SizedBox height="4px" />
      <_GrayText>{"Rank. #" + data.marketCapRank}</_GrayText>
    </InfoElementContainer>
  );

  const SupplyAmountBox = () => (
    <InfoElementContainer>
      <_YellowTitleCircle>Supply Amount</_YellowTitleCircle>

      <_Row justify_content="space-between">
        <_Text>Current</_Text>
        <_SizedBox width="12px" />
        <_Text>{data.currentSupply.toLocaleString()}</_Text>
      </_Row>

      <_SizedBox height="4px" />
      <_Row justify_content="space-between">
        <_GrayText>Max</_GrayText>
        <_SizedBox width="12px" />
        <_GrayText>
          {data.maxSupply ? data.maxSupply.toLocaleString() : "♾️"}
        </_GrayText>
      </_Row>
    </InfoElementContainer>
  );

  const VolumeBox = () => (
    <InfoElementContainer>
      <_YellowTitleCircle>Volume(24h)</_YellowTitleCircle>
      <_Text> {"$" + data.volume.toLocaleString()}</_Text>
    </InfoElementContainer>
  );

  return (
    <Container>
      <RowCustom justify_content="flex-start" align_items="flex-start">
        <MarketCapBox />

        <VolumeBox />
        <SupplyAmountBox />
      </RowCustom>
      <_SizedBox height="16px" />
      <Chart coin={data.tradingViewCoinId} />
    </Container>
  );
};

const RowCustom = styled(_Row)`
  flex-wrap: wrap;
`;

const InfoElementContainer = styled(_Column)`
  justify-content: flex-start;
  align-items: flex-end;
  height: fit-content;
  margin-right: 32px;
  margin-bottom: 16px;
`;

const Container = styled(_AnimatedDiv)`
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
