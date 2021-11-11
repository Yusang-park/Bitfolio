import axios from "axios";
import React, { useState, useEffect, useContext } from "react";
import styled, { keyframes } from "styled-components";
import { apiKey, providerUrl } from "../api_config";
import {
  NonPaddingButton,
  Divider,
  Expanded,
  SizedBox,
  ATag,
  PercentText,
  Row,
  AnimatedDiv,
  BoxStyle,
  Column,
  GrayText,
  Bookmark,
  Icon,
  ElementRow,
} from "../components/global-components";
import { getCryptoSummaryDataList } from "../service/apis";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { ProgressIndicator } from "../components/progressIndicator/progressIndicator";
import { useHistory } from "react-router-dom";

import { UserContext } from "../provider/userProvider";

const maxPage = 179;

export const CryptoRank = () => {
  const sortation = [
    { name: "", flex: 2 },
    { name: "Name", flex: 4 },
    { name: "Symbol", flex: 7 },
    { name: "Price", flex: 5 },
    { name: "MarketCap", flex: 9 },
    { name: "Circulating Supply", flex: 9 },
    { name: "volume", flex: 9 },
    { name: "24Hours", flex: 5 },
  ];
  const [cryptoList, setCryptoList] = useState([]);
  const [pageIndex, setPageIndex] = useState(1);
  const [pageSectionIndex, setPageSectionIndex] = useState(0);
  const { favorites, setFavoriteCrypto } = useContext(UserContext);
  const history = useHistory();

  useEffect(() => {
    getCryptoSummaryDataList(pageIndex).then((e) => {
      setCryptoList(e);
    });
  }, [pageIndex]); //It is performed when mounted.

  function changePageIndex(e) {
    if (e.target.id !== pageIndex) {
      setCryptoList(cryptoList.filter((e) => false));
      setPageIndex(e.target.id);
    }
  }

  function prevPagePagination(e) {
    if (pageSectionIndex !== 0) setPageSectionIndex(pageSectionIndex - 1);
  }
  function nextPagePagination(e) {
    if (pageSectionIndex !== maxPage) setPageSectionIndex(pageSectionIndex + 1);
  }

  function routeDetails(id) {
    history.push({
      pathname: `/details/${id}`,
      state: {
        id: id,
      },
    });
  }

  return (
    <Scaffold>
      <Row>
        <SizedBox width="32px" />
        {sortation.map(({ name, flex }, i) => (
          <Expanded justify_content="flex-end" flex={flex} key={i}>
            {name}
          </Expanded>
        ))}
        <SizedBox width="32px" />
      </Row>
      <SizedBox height="16px" />
      <Divider vertical="0px" horizontal="32px" />
      <Column>
        {cryptoList.length !== 0 ? (
          cryptoList.map((e, i) => (
            <Column>
              <ElementRow key={i} onClick={() => routeDetails(e.id)}>
                <Row width="5%" justify_content="space-between">
                  <GrayText> {i + (pageIndex - 1) * 10 + 1}</GrayText>
                  <Bookmark
                    isSelected={favorites[e.id]}
                    onClick={() =>
                      setFavoriteCrypto(e.id, e.fullName, e.imageUrl)
                    }
                    size="1x"
                  />
                </Row>

                <Expanded justify_content="flex-end" flex={sortation[1].flex}>
                  {" "}
                  <Icon src={e.imageUrl} /> <SizedBox width="16px" />
                </Expanded>
                <Expanded
                  justify_content="space-between"
                  flex={sortation[2].flex}
                >
                  {e.fullName} <GrayText> {e.symbol.toUpperCase()}</GrayText>
                </Expanded>
                <Expanded justify_content="flex-end" flex={sortation[3].flex}>
                  {"$" + e.price.toLocaleString()}
                </Expanded>
                <Expanded justify_content="flex-end" flex={sortation[4].flex}>
                  {"$" + e.marketCap.toLocaleString()}
                </Expanded>
                <Expanded justify_content="flex-end" flex={sortation[5].flex}>
                  {e.currentSupply.toLocaleString()}
                </Expanded>
                <Expanded justify_content="flex-end" flex={sortation[6].flex}>
                  {"$" + e.volume.toLocaleString()}
                </Expanded>
                <Expanded justify_content="flex-end" flex={sortation[7].flex}>
                  <PercentText negative={e.pricePercent24h.includes("-")}>
                    {e.pricePercent24h}
                  </PercentText>
                </Expanded>
              </ElementRow>
              <Divider vertical="0px" horizontal="32px" />
            </Column>
          ))
        ) : (
          <ProgressIndicator />
        )}
      </Column>
      <SizedBox height="16px" />
      <Row justify_content="center">
        <span onClick={prevPagePagination}>
          <FontAwesomeIcon icon="chevron-left" size="1x" color="white" />
        </span>
        <SizedBox width="16px" />
        {[...Array(10)].map((n, index) => (
          <ATag
            key={index}
            selected={index + 1 + pageSectionIndex * 10 === parseInt(pageIndex)}
            id={index + 1 + pageSectionIndex * 10}
            onClick={changePageIndex}
            width={"38px"}
          >
            {index + 1 + pageSectionIndex * 10}
          </ATag>
        ))}
        <SizedBox width="16px" />
        <span onClick={nextPagePagination}>
          <FontAwesomeIcon icon="chevron-right" size="1x" color="white" />
        </span>
      </Row>
    </Scaffold>
  );
};

const Scaffold = styled(BoxStyle)`
  width: 100%;
  max-width: 1440px;
  font-size: 14px;
  font-weight: bold;
  padding: 32px 0px 16px 0px;
`;
