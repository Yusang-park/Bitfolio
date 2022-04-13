import React, { useState } from "react";
import styled from "styled-components";
import { PressButton } from "../../Components/TransComponants";
import { DetailsCommunity } from "./DetailsCommunity";
import { DetailsInfo } from "./DetailsInfo";
import { DetailsMarket } from "./DetailsMarket";

const menu = ["Information", "Exchanges", "Community"];

export const DetailArticle = () => {
  const [selectedMenuIndex, setMenuIndex] = useState<number>(0);
  function changeMenu(e: any) {
    console.log(e.target.id);
    setMenuIndex(e.target.id);
  }
  return (
    <>
      <TabBar onChange={changeMenu} selectedMenuIndex={selectedMenuIndex} />
      <ArticleContainer selectedMenuIndex={selectedMenuIndex} />
    </>
  );
};

const ArticleContainer = ({
  selectedMenuIndex,
}: {
  selectedMenuIndex: number;
}) => {
  return selectedMenuIndex == 0 ? (
    <DetailsInfo />
  ) : selectedMenuIndex == 1 ? (
    <DetailsMarket />
  ) : (
    <DetailsCommunity />
  );
};

const TabBar = ({
  onChange,
  selectedMenuIndex,
}: {
  onChange: Function;
  selectedMenuIndex: number;
}) => {
  return (
    <TabContainer>
      {menu.map((e, i) => (
        <PressButton
          id={i}
          key={i}
          selected={i === parseInt(selectedMenuIndex.toString()) ? true : false}
          onClick={onChange}
        >
          {e}
        </PressButton>
      ))}
    </TabContainer>
  );
};

const TabContainer = styled.div`
  border-bottom: 1px solid ${({ theme }) => theme.colors.gray3};
  padding-bottom: 4px;
  margin-bottom: 24px;
`;
