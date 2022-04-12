import React from "react";
import styled from "styled-components";
import { SStyledBox } from "../../Components/GlobalComponents";
import BTCDominanceIndex from "./BTCDominanceIndex";
import FearGreedIndex from "./FearGreedIndex";

const Indexes = () => {
  return (
    <Wrapper>
      <BTCDominanceIndex />
      <FearGreedIndex />
    </Wrapper>
  );
};

const Wrapper = styled(SStyledBox)`
  width: 50%;
  ${({ theme }) => theme.device.tablet} {
    width: auto;
    height: 80vh;
    padding: 24px;
    margin-bottom: 32px;
  }
  ${({ theme }) => theme.device.mobile} {
    padding: 16px;
    margin-bottom: 24px;
  }
`;
export default Indexes;
