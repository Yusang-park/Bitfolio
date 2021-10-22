import React, { useRef, useEffect, useContext, useState } from "react";
import styled from "styled-components";
import { CryptoDataContext } from "../../routes/Details";
import { fadeIn } from "../../styles/animation";
import { Expanded, SizedBox } from "../../styles/components";
import { Chart } from "./Chart";

export const DetailsInfoContainer = () => {
  const { data } = useContext(CryptoDataContext);
  const [chartSize, setChartSize] = useState({ width: 0, height: 0 });
  const ref = useRef(0); //Get ChartContainer height

  useEffect(() => {
    setChartSize({
      ...chartSize,
      height: ref.current.clientHeight,
      width: ref.current.clientWidth,
    });
  }, []);

  const MarketCapBox = () => (
    <ColumnAlignEnd>
      <YellowTitleCircle>Market Cap</YellowTitleCircle>
      <div>{"$ " + data.marketCap.toLocaleString()}</div>
      <SizedBox height="4px" />
      <RankText>{"Rank. #" + data.marketCapRank}</RankText>
    </ColumnAlignEnd>
  );

  const SupplyAmountBox = () => (
    <ColumnAlignEnd>
      <YellowTitleCircle>Supply Amount</YellowTitleCircle>
      <div>
        <TextRow>
          <div>Current</div>
          <SizedBox width="12px" />
          <div>{data.currentSupply.toLocaleString()}</div>
        </TextRow>
      </div>
      <SizedBox height="4px" />
      <TextRow>
        <RankText>Max</RankText>
        <SizedBox width="12px" />
        <RankText>
          {data.maxSupply ? data.maxSupply.toLocaleString() : "♾️"}
        </RankText>
      </TextRow>
    </ColumnAlignEnd>
  );

  const VolumeBox = () => (
    <ColumnAlignEnd>
      <YellowTitleCircle>Volume(24h)</YellowTitleCircle>
      {"$ " + data.volume.toLocaleString()}
    </ColumnAlignEnd>
  );

  return (
    <Whole>
      <Row>
        <MarketCapBox />
        <SupplyAmountBox />
        <VolumeBox />
      </Row>
      <SizedBox height="16px" />
      <ChartContainer ref={ref}>
        <Chart chartSize={chartSize} coin={data.tradingViewCoinId} />
      </ChartContainer>
    </Whole>
  );
};

const Row = styled.div`
  display: flex;
`;

const TextRow = styled.div`
  display: flex;
  width: 100%;
  justify-content: space-between;
`;

const ColumnAlignEnd = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  margin-right: 5%;
`;

const Whole = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
  height: 100px;
  animation-duration: 0.5s;
  animation-timing-function: ease-out;
  animation-name: ${fadeIn};
  animation-fill-mode: forwards;
`;

const YellowTitleCircle = styled.div`
  padding: 6px 16px;
  border-radius: 35px;
  margin-left: auto;
  margin-right: auto;
  margin-bottom: 16px;
  background-color: ${({ theme }) => theme.colors.yellow};
  color: black;
`;

const RankText = styled.div`
  color: ${(props) => props.theme.colors.gray};
`;

const ChartContainer = styled.div`
  display: flex;
  width: 100%;
  height: 100%;
  align-items: center;
`;
