import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";

import { Rank, RankArrayElement } from "../Components/Rank/Rank";
import { getCryptoSummaryDataList, CryptoRankSortTypes } from "../Service/Apis";

const basicCategories: RankArrayElement[] = [
  { type: "Coin", flex: 1, valueType: "fullName" },
];
const additinalCategories: RankArrayElement[] = [
  { type: "Price", flex: 4, valueType: "price" },
  { type: "24Hours", flex: 4, valueType: "pricePercent24h" },
  {
    type: "MarketCap",
    flex: 6,
    sort: CryptoRankSortTypes.MarketCap,
    valueType: "marketCap",
  },
  { type: "CirculatingSupply", flex: 6, valueType: "currentSupply" },
  {
    type: "Volume",
    flex: 6,
    sort: CryptoRankSortTypes.Volume,
    valueType: "volume",
  },
];

const CryptoRank = React.memo(() => {
  const history = useHistory();
  const [cryptoList, setCryptoList] = useState([]);
  const [pageIndex, setPageIndex] = useState<number>(1);
  const [sortType, setSortType] = useState<CryptoRankSortTypes>(
    CryptoRankSortTypes.MarketCap
  );

  useEffect(() => {
    setCryptoList((l) => l.filter((e) => false));

    getCryptoSummaryDataList(pageIndex, sortType).then((e: any) => {
      setCryptoList(e);
    });
  }, [pageIndex, sortType]);

  function init() {
    setCryptoList((l) => l.filter((e) => false));

    getCryptoSummaryDataList(pageIndex, sortType).then((e: any) => {
      setCryptoList(e);
    });
  }

  function onClickHandler(id: string) {
    history.push({
      pathname: `/details/${id}`,
      state: {
        id: id,
      },
    });
  }

  return (
    <Rank
      list={cryptoList}
      sortType={sortType}
      setSort={setSortType}
      setPage={setPageIndex}
      pageIndex={pageIndex}
      basicCategories={basicCategories}
      additinalCategories={additinalCategories}
      hasBookmark={true}
      onClickHandler={onClickHandler}
      maxPageLength={60}
      refresh={init}
    ></Rank>
  );
});

export default CryptoRank;
