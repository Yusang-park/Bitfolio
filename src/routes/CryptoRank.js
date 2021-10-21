import axios from "axios";
import React, { useState, useEffect } from "react";
import styled, { keyframes } from "styled-components";
import { apiKey, providerUrl } from "../api_config";
import {
  Button,
  Divider,
  Expanded,
  SizedBox,
  ATag,
  PercentText,
} from "../styles/components";
import { getCryptoSummaryDataList } from "../service/apis";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { ProgressIndicator } from "../components/progressIndicator/progressIndicator";
import { useHistory } from "react-router-dom";
import { fadeIn } from "../styles/animation";

const maxPage = 179;

export const CryptoLank = () => {
  const sortation = [
    { name: "", flex: 1 },
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
    <Whole>
      <CryptoLankContainer>
        <SortContainer>
          {sortation.map(({ name, flex }, i) => (
            <Expanded justify_content="flex-end" flex={flex} key={i}>
              {name}
            </Expanded>
          ))}
        </SortContainer>
        <SizedBox height="16px" />
        <Divider vertical="0px" horizontal="0px" />

        <ElementContainer>
          {cryptoList.length !== 0 ? (
            cryptoList.map((e, i) => (
              <ElementRow key={i} onClick={() => routeDetails(e.id)}>
                <SizedBox width="2%">
                  <SymbolText> {i + (pageIndex - 1) * 10 + 1}</SymbolText>
                </SizedBox>
                <Expanded justify_content="flex-end" flex={sortation[1].flex}>
                  {" "}
                  <Icon src={e.imageUrl} />{" "}
                </Expanded>
                <Expanded
                  justify_content="space-between"
                  flex={sortation[2].flex}
                >
                  {e.fullName}{" "}
                  <SymbolText> {e.symbol.toUpperCase()}</SymbolText>{" "}
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
            ))
          ) : (
            <ProgressIndicator />
          )}
        </ElementContainer>
        <SizedBox height="16px" />
        <PagePagination>
          <span onClick={prevPagePagination}>
            <FontAwesomeIcon icon="chevron-left" size="1x" color="white" />
          </span>
          <SizedBox width="16px" />
          {[...Array(10)].map((n, index) => (
            <ATag
              key={index}
              selected={index + 1 + pageSectionIndex * 10 === pageIndex}
              id={index + 1 + pageSectionIndex * 10}
              onClick={changePageIndex}
            >
              {" "}
              {index + 1 + pageSectionIndex * 10}
            </ATag>
          ))}
          <SizedBox width="16px" />
          <span onClick={nextPagePagination}>
            <FontAwesomeIcon icon="chevron-right" size="1x" color="white" />
          </span>
        </PagePagination>
      </CryptoLankContainer>
    </Whole>
  );
};

const Whole = styled.div`
  display: flex;
  flex: 1;
`;

const CryptoLankContainer = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
  max-width: 1440px;

  margin: 0px auto;
  padding: 32px 32px 16px 32px;

  border-radius: 27px;
  background: ${({ theme }) => theme.colors.boxBackground};
  box-shadow: 0px 3px 6px rgba(0, 0, 0, 0.16);

  animation-duration: 0.5s;
  animation-timing-function: ease-out;
  animation-name: ${fadeIn};
  animation-fill-mode: forwards;
`;

const SortContainer = styled.div`
  display: flex;
  font-size: 14px;
  font-weight: bold;
`;

const ElementContainer = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
  justify-content: center;
`;

const Icon = styled.img`
  width: 36px;
  padding-right: 16px;
`;

const PagePagination = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const SymbolText = styled.div`
  padding-left: 8px;
  color: ${(props) => props.theme.colors.gray};
`;

const ElementRow = styled.div`
  display: flex;
  flex: 1;
  font-size: 16px;
  padding: 2px 0px;
  animation-duration: 0.5s;
  animation-timing-function: ease-out;
  animation-name: ${fadeIn};
  animation-fill-mode: forwards;
  cursor: pointer;
  border-bottom: 1px solid ${({ theme }) => theme.colors.gray3};
  &:hover {
    background-color: gray;
  }

  &:hover ${SymbolText} {
    color: white;
  }
`;