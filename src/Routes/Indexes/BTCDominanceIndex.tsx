import React from "react";
import styled from "styled-components";
import { SSizedBox } from "../../Components/GlobalComponents";
import { Chart } from "../../Components/TradingViewChart";
import { TitleText } from "../../Components/TransComponants";

const BTCDominanceIndex = () => {
  return (
    <Wrapper>
      <TitleText>BTC Dominance Index</TitleText>
      <SSizedBox height="16px" />
      <Chart coin="BTC.D" />
    </Wrapper>
  );
};

const Wrapper = styled.div`
  height: 600px;
`;

export default BTCDominanceIndex;
