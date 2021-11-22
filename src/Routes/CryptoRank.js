import axios from "axios";
import React, { useState, useEffect, useContext } from "react";
import styled, { css, keyframes } from "styled-components";
import { apiKey, providerUrl } from "../api_config";
import {
  S_IconButton,
  S_Divider,
  S_Expanded,
  S_SizedBox,
  S_ATag,
  S_PercentText,
  S_Row,
  S_AnimatedDiv,
  S_StyledBox,
  S_Column,
  S_GrayText,
  S_Bookmark,
} from "../Components/GlobalComponents";
import { getCryptoSummaryDataList } from "../Service/Apis";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { ProgressIndicator } from "../Components/ProgressIndicator/ProgressIndicator";
import { useHistory } from "react-router-dom";

import { UserContext } from "../Provider/UserProvider";
import { fadeIn } from "../Styles/Animation";

const maxPage = 179;

export const CryptoRank = () => {
  const [cryptoList, setCryptoList] = useState([]);
  const [pageIndex, setPageIndex] = useState(1);
  const [pageSectionIndex, setPageSectionIndex] = useState(0);
  const [hoverIndex, setHoverIndex] = useState(-1);
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
    <Wrapper>
      <Row>
        {cryptoList.length == 0 ? (
          <ProgressIndicator />
        ) : (
          <>
            <BasicInfoSection
              pageIndex={pageIndex}
              cryptoList={cryptoList}
              routeDetails={routeDetails}
              hoverIndex={hoverIndex}
              setHoverIndex={setHoverIndex}
            ></BasicInfoSection>
            <DetailInfoSection
              pageIndex={pageIndex}
              cryptoList={cryptoList}
              routeDetails={routeDetails}
              hoverIndex={hoverIndex}
              setHoverIndex={setHoverIndex}
            ></DetailInfoSection>
          </>
        )}
      </Row>
      <S_Divider vertical="16px" horizontal="32px" />
      <S_Row justify_content="center">
        <span onClick={prevPagePagination}>
          <FontAwesomeIcon icon="chevron-left" size="1x" color="white" />
        </span>
        <S_SizedBox width="16px" />
        {[...Array(5)].map((n, index) => (
          <S_ATag
            key={index}
            selected={index + 1 + pageSectionIndex * 5 === parseInt(pageIndex)}
            id={index + 1 + pageSectionIndex * 5}
            onClick={changePageIndex}
            width={"38px"}
          >
            {index + 1 + pageSectionIndex * 5}
          </S_ATag>
        ))}
        <S_SizedBox width="16px" />
        <span onClick={nextPagePagination}>
          <FontAwesomeIcon icon="chevron-right" size="1x" color="white" />
        </span>
      </S_Row>
    </Wrapper>
  );
};

const BasicInfoSection = React.memo(
  ({ cryptoList, pageIndex, routeDetails, hoverIndex, setHoverIndex }) => {
    const { favorites, setFavoriteCrypto } = useContext(UserContext);
    return (
      <StyledBasicInfoSection>
        <S_Row justify_content="flex-start" align="flex-start">
          <S_SizedBox width="8vw" />
          <S_Expanded flex="1">Name</S_Expanded>
        </S_Row>

        {cryptoList.map((e, i) => (
          <ElementRow
            onMouseOver={() => {
              if (hoverIndex !== i) setHoverIndex(i);
            }}
            onMouseOut={() => {
              setHoverIndex(-1);
            }}
            isHovered={hoverIndex === i}
            key={i}
            onClick={() => routeDetails(e.id)}
          >
            <S_Row
              key={i * 10}
              height="100%"
              justify_content="flex-start"
              align="flex-start"
              onClick={() => routeDetails(e.id)}
            >
              <S_Row width="8vw" justify_content="space-evenly">
                <S_GrayText> {i + (pageIndex - 1) * 10 + 1}</S_GrayText>
                <S_Bookmark
                  isSelected={favorites[e.id]}
                  onClick={() =>
                    setFavoriteCrypto(e.id, e.fullName, e.imageUrl)
                  }
                  size="1x"
                />
              </S_Row>
              <S_Expanded flex="1">
                <Icon src={e.imageUrl} />
                <S_Column>
                  {e.fullName}
                  <br></br>
                  <S_GrayText>{e.symbol.toUpperCase()}</S_GrayText>
                </S_Column>
              </S_Expanded>
            </S_Row>
          </ElementRow>
        ))}
      </StyledBasicInfoSection>
    );
  }
);

const DetailInfoSection = React.memo(
  ({ cryptoList, pageIndex, routeDetails, hoverIndex, setHoverIndex }) => {
    return (
      <Relative>
        <StyledDetailInfoSection>
          <S_Row id="1" justify_content="flex-start" align="flex-start">
            <Element flex="2">Price</Element>
            <Element flex="5">MarketCap</Element>
            <Element flex="5">CirculatingSupply</Element>
            <Element flex="4">Volume</Element>
            <Element flex="2">24Hours</Element>
          </S_Row>

          {cryptoList.map((e, i) => (
            <ElementRow
              onMouseOver={() => {
                if (hoverIndex !== i) setHoverIndex(i);
              }}
              onMouseOut={() => {
                setHoverIndex(-1);
              }}
              isHovered={hoverIndex === i}
              key={i}
              onClick={() => routeDetails(e.id)}
            >
              <Element flex="2">${e.price}</Element>
              <Element flex="5">${e.marketCap.toLocaleString()}</Element>
              <Element flex="5">{e.currentSupply.toLocaleString()}</Element>
              <Element flex="4">${e.volume.toLocaleString()}</Element>
              <Element flex="2">
                <S_PercentText negative={e.pricePercent24h.includes("-")}>
                  {e.pricePercent24h}
                </S_PercentText>
              </Element>
            </ElementRow>
          ))}
        </StyledDetailInfoSection>
      </Relative>
    );
  }
);

const ElementRow = styled(S_Row)`
  height: 100%;
  justify-content: flex-start;
  align-items: center;
  background-color: ${({ isHovered }) => isHovered && css`grey`};
  /* border-bottom: 1px solid; */
  ${S_GrayText} {
    color: ${({ isHovered }) => isHovered && css`white`};
  }
  cursor: pointer;
  transition: background-color 300ms ease-out 100ms;
`;

const Element = styled(S_Expanded)`
  ${({ theme }) => theme.device.tablet} {
    flex: none;
    width: ${({ flex }) => css`calc( 28px * ${flex})`};
    margin-left: 16px;
    margin-right: 16px;
    padding: 0px 0px;
  }
`;

const Relative = styled.div`
  flex: 8;
  position: relative;
  width: 100%;
  height: 100%;
`;

const Icon = styled.img`
  width: 42px;
  margin-right: 16px;
  border-radius: 50px;
  ${({ theme }) => theme.device.tablet} {
    width: 28px;
  }
`;

const Row = styled(S_Row)`
  flex: 1;
`;

const StyledBasicInfoSection = styled(S_Column)`
  flex: 3;
  animation-duration: 0.5s;
  animation-timing-function: ease-out;
  animation-name: ${fadeIn};
  animation-fill-mode: forwards;
`;

const StyledDetailInfoSection = styled(S_Column)`
  position: absolute;
  width: 100%;
  height: 100%;
  overflow-x: auto;

  &::-webkit-scrollbar {
    position: fixed;
    height: 0px;
    border-radius: 25px;
    background: transparent;
  }
  &::-webkit-scrollbar-thumb {
    position: fixed;
    height: 0px;
    background-color: gray;
    border-radius: 4px;
  }
`;

const Wrapper = styled(S_StyledBox)`
  width: 100%;
  height: auto;
  max-width: 1440px;
  font-size: 1.6rem;
  font-weight: 500;
  padding: 32px 0px 16px 0px;

  ${({ theme }) => theme.device.tablet} {
    height: 90vh;
  }
`;
