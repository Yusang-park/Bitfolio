import React, { useState } from "react";
import styled from "styled-components";
import { SStyledBox } from "../../Components/GlobalComponents";
import { TabBar } from "../../Components/Menu/TabBar";
import BTCDominanceIndex from "./BTCDominanceIndex";
import FearGreedIndex from "./FearGreedIndex";

const menu = ["Dominance", "Fear/Greed"];

const ArticleContainer = ({
  selectedMenuIndex,
}: {
  selectedMenuIndex: string;
}) => {
  return selectedMenuIndex === "0" ? <BTCDominanceIndex /> : <FearGreedIndex />;
};

const Indexes = () => {
  const [selectedMenuIndex, setMenuIndex] = useState<number>(0);
  function changeMenu(e: any) {
    setMenuIndex(e.target.id);
  }
  return (
    <Wrapper>
      <TabBar
        onChange={changeMenu}
        selectedMenuIndex={selectedMenuIndex}
        menu={menu}
      />
      <ArticleContainer selectedMenuIndex={selectedMenuIndex.toString()} />
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
    margin-bottom: 24px;
  }
`;
export default Indexes;
