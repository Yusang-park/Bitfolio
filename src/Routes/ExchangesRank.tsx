import React, { useState, useEffect } from "react";
import { Rank, RankArrayElement } from "../Components/Rank/Rank";
import { getExchanges } from "../Service/Apis";

const basicCategories: RankArrayElement[] = [
  { type: "Name", flex: 2, valueType: "name" },
];
const additinalCategories: RankArrayElement[] = [
  { type: "TrustScore", flex: 1, valueType: "trustScore" },
  { type: "TrustRank", flex: 1, valueType: "trustRank" },
  { type: "Country", flex: 2, valueType: "country" },
  {
    type: "establishedYear",
    flex: 2,
    valueType: "establishedYear",
  },
  { type: "Volume(BTC)", flex: 3, valueType: "volumnBtc" },
];

export enum ExchangeRankSortTypes {
  None,
}

const ExchnagesRank = React.memo(() => {
  const [exchangeList, setExchangeList] = useState([]);
  const [pageIndex, setPageIndex] = useState<number>(1);
  const [sortType, setSortType] = useState<ExchangeRankSortTypes>(
    ExchangeRankSortTypes.None
  );

  useEffect(() => {
    setExchangeList((l) => l.filter((e) => false));

    getExchanges(pageIndex).then((e: any) => {
      setExchangeList(e);
      console.log(e[0].country);
    });
  }, [pageIndex, sortType]);

  function onClickHandler(id: string) {
    window.location.replace(id);
  }

  return (
    <Rank
      list={exchangeList}
      sortType={sortType}
      setSort={setSortType}
      setPage={setPageIndex}
      pageIndex={pageIndex}
      basicCategories={basicCategories}
      additinalCategories={additinalCategories}
      onClickHandler={onClickHandler}
      maxPage={3}
    />
  );
});

export default ExchnagesRank;
