import React, { useContext } from "react";
import styled from "styled-components";
import { CryptoDataContext } from "../Details";
import {
  SAnimatedDiv,
  SGrayText,
  SSizedBox,
  SYellowTitleCircle,
  SRow,
  SColumn,
  SText,
} from "../../Components/GlobalComponents";
import { Chart } from "../../Components/TradingViewChart";

export const DetailsInfo = () => {
  const { data } = useContext(CryptoDataContext);

  const MarketCapBox = () => (
    <InfoElementContainer>
      <SYellowTitleCircle>Market Cap</SYellowTitleCircle>
      <SText>{"$" + data.marketCap.toLocaleString()}</SText>
      <SSizedBox height="4px" />
      <SGrayText>{"Rank. #" + data.marketCapRank}</SGrayText>
    </InfoElementContainer>
  );

  const SupplyAmountBox = () => (
    <InfoElementContainer>
      <SYellowTitleCircle>Supply Amount</SYellowTitleCircle>

      <SRow justify_content="space-between">
        <SText>Current</SText>
        <SSizedBox width="12px" />
        <SText>{data.currentSupply.toLocaleString()}</SText>
      </SRow>

      <SSizedBox height="4px" />
      <SRow justify_content="space-between">
        <SGrayText>Max</SGrayText>
        <SSizedBox width="12px" />
        <SGrayText>
          {data.maxSupply ? data.maxSupply.toLocaleString() : "♾️"}
        </SGrayText>
      </SRow>
    </InfoElementContainer>
  );

  const VolumeBox = () => (
    <InfoElementContainer>
      <SYellowTitleCircle>Volume(24h)</SYellowTitleCircle>
      <SText> {"$" + data.volume.toLocaleString()}</SText>
    </InfoElementContainer>
  );

  return (
    <Container>
      <RowCustom justify_content="flex-start" align_items="flex-start">
        <MarketCapBox />

        <VolumeBox />
        <SupplyAmountBox />
      </RowCustom>
      <SSizedBox height="16px" />
      <Chart coin={data.tradingViewCoinId} />
    </Container>
  );
};

const RowCustom = styled(SRow)`
  flex-wrap: wrap;
`;

const InfoElementContainer = styled(SColumn)`
  justify-content: flex-start;
  align-items: flex-end;
  height: fit-content;
  margin-right: 32px;
  margin-bottom: 16px;
`;

const Container = styled(SAnimatedDiv)`
  display: flex;
  flex-direction: column;
  flex: 1;
  height: 100px;
`;
