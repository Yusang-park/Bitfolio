import React, { useContext } from "react";
import styled from "styled-components";
import { CryptoDataContext } from "../Details";
import {
  SAnimatedDiv,
  SGrayText,
  SSizedBox,
  SRow,
  SColumn,
  SText,
} from "../../Components/GlobalComponents";
import { Chart } from "../../Components/TradingViewChart";
import {
  GrayText,
  Text,
  YellowTitleCircle,
} from "../../Components/TransComponants";

export const DetailsInfo = () => {
  const { data } = useContext(CryptoDataContext);

  const MarketCapBox = () => (
    <InfoElementContainer>
      <YellowTitleCircle>MarketCap</YellowTitleCircle>
      <SSizedBox height="8px" />
      <SText>{"$" + data.marketCap.toLocaleString()}</SText>
      <SSizedBox height="4px" />
      <SGrayText>{"Rank. #" + data.marketCapRank}</SGrayText>
    </InfoElementContainer>
  );

  const SupplyAmountBox = () => (
    <InfoElementContainer>
      <YellowTitleCircle>SupplyAmount</YellowTitleCircle>
      <SSizedBox height="8px" />
      <SRow justify_content="space-between">
        <Text>Current</Text>
        <SSizedBox width="12px" />
        <SText>{data.currentSupply.toLocaleString()}</SText>
      </SRow>

      <SSizedBox height="4px" />
      <SRow justify_content="space-between">
        <GrayText>Max</GrayText>
        <SSizedBox width="12px" />
        <SGrayText>
          {data.maxSupply ? data.maxSupply.toLocaleString() : "♾️"}
        </SGrayText>
      </SRow>
    </InfoElementContainer>
  );

  const VolumeBox = () => (
    <InfoElementContainer>
      <YellowTitleCircle>Volume(24h)</YellowTitleCircle>
      <SSizedBox height="8px" />
      <SText> {"$" + data.volume.toLocaleString()}</SText>
    </InfoElementContainer>
  );

  return (
    <Wrapper>
      <InfoContainer justify_content="flex-start" align_items="flex-start">
        <MarketCapBox />
        <VolumeBox />
        <SupplyAmountBox />
      </InfoContainer>
      <SSizedBox height="16px" />
      <Chart coin={data.tradingViewCoinId} />
    </Wrapper>
  );
};

const InfoContainer = styled(SRow)`
  flex-wrap: wrap;
`;

const InfoElementContainer = styled(SColumn)`
  justify-content: flex-start;
  align-items: flex-start;
  height: fit-content;
  margin-right: 32px;
  margin-bottom: 16px;
`;

const Wrapper = styled(SAnimatedDiv)`
  display: flex;
  flex-direction: column;
  height: 100%;
`;
