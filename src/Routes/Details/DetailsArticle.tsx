import React, { useState } from "react";
import { TabBar } from "../../Components/Menu/TabBar";

import { DetailsCommunity } from "./DetailsCommunity";
import { DetailsDescription } from "./DetailsDescription";
import { DetailsInfo } from "./DetailsInfo";
import { DetailsMarket } from "./DetailsMarket";

const menu = ["Information", "Exchanges", "Community", "Description"];

const ArticleContainer = ({
  selectedMenuIndex,
}: {
  selectedMenuIndex: string;
}) => {
  return selectedMenuIndex === "0" ? (
    <DetailsInfo />
  ) : selectedMenuIndex === "1" ? (
    <DetailsMarket />
  ) : selectedMenuIndex === "2" ? (
    <DetailsCommunity />
  ) : (
    <DetailsDescription />
  );
};

export const DetailArticle = () => {
  const [selectedMenuIndex, setMenuIndex] = useState<number>(0);
  function changeMenu(e: any) {
    setMenuIndex(e.target.id);
  }

  return (
    <>
      <TabBar
        onChange={changeMenu}
        selectedMenuIndex={selectedMenuIndex}
        menu={menu}
      />
      <ArticleContainer selectedMenuIndex={selectedMenuIndex.toString()} />
    </>
  );
};
