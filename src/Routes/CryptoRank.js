import React, { useState, useEffect, useContext } from "react";
import styled, { css } from "styled-components";
import {
  SDivider,
  SExpanded,
  SSizedBox,
  SLink,
  SPercentText,
  SRow,
  SStyledBox,
  SColumn,
  SGrayText,
  SBookmark,
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
        {cryptoList.length === 0 ? (
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
      <SDivider vertical="16px" horizontal="32px" />
      <SRow justify_content="center">
        <span onClick={prevPagePagination}>
          <FontAwesomeIcon icon="chevron-left" size="1x" color="white" />
        </span>
        <SSizedBox width="16px" />
        {[...Array(5)].map((n, index) => (
          <SLink
            key={index}
            selected={index + 1 + pageSectionIndex * 5 === parseInt(pageIndex)}
            id={index + 1 + pageSectionIndex * 5}
            onClick={changePageIndex}
            width={"38px"}
          >
            {index + 1 + pageSectionIndex * 5}
          </SLink>
        ))}
        <SSizedBox width="16px" />
        <span onClick={nextPagePagination}>
          <FontAwesomeIcon icon="chevron-right" size="1x" color="white" />
        </span>
      </SRow>
    </Wrapper>
  );
};

const BasicInfoSection = React.memo(
  ({ cryptoList, pageIndex, routeDetails, hoverIndex, setHoverIndex }) => {
    const { favorites, setFavoriteCrypto } = useContext(UserContext);
    return (
      <StyledBasicInfoSection>
        <SRow justify_content="flex-start" align="flex-start">
          <SSizedBox width="8vw" />
          <SExpanded flex="1">Name</SExpanded>
        </SRow>

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
            <SRow
              key={i * 10}
              height="100%"
              justify_content="flex-start"
              align="flex-start"
              onClick={() => routeDetails(e.id)}
            >
              <SRow width="8vw" justify_content="space-evenly">
                <SGrayText> {i + (pageIndex - 1) * 10 + 1}</SGrayText>
                <SBookmark
                  isSelected={favorites[e.id]}
                  onClick={() =>
                    setFavoriteCrypto(e.id, e.fullName, e.imageUrl)
                  }
                  size="1x"
                />
              </SRow>
              <SExpanded flex="1">
                <Icon src={e.imageUrl} />
                <SColumn>
                  {e.fullName}
                  <br></br>
                  <SGrayText>{e.symbol.toUpperCase()}</SGrayText>
                </SColumn>
              </SExpanded>
            </SRow>
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
          <SRow id="1" justify_content="flex-start" align="flex-start">
            <Element flex="2">Price</Element>
            <Element flex="5">MarketCap</Element>
            <Element flex="5">CirculatingSupply</Element>
            <Element flex="4">Volume</Element>
            <Element flex="2">24Hours</Element>
          </SRow>

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
                <SPercentText negative={e.pricePercent24h.includes("-")}>
                  {e.pricePercent24h}
                </SPercentText>
              </Element>
            </ElementRow>
          ))}
        </StyledDetailInfoSection>
      </Relative>
    );
  }
);

const ElementRow = styled(SRow)`
  height: 100%;
  justify-content: flex-start;
  align-items: center;
  background-color: ${({ isHovered }) => isHovered && css`grey`};
  /* border-bottom: 1px solid; */
  ${SGrayText} {
    color: ${({ isHovered }) => isHovered && css`white`};
  }
  cursor: pointer;
  transition: background-color 300ms ease-out 100ms;
`;

const Element = styled(SExpanded)`
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

const Row = styled(SRow)`
  flex: 1;
`;

const StyledBasicInfoSection = styled(SColumn)`
  flex: 3;
  animation-duration: 0.5s;
  animation-timing-function: ease-out;
  animation-name: ${fadeIn};
  animation-fill-mode: forwards;
`;

const StyledDetailInfoSection = styled(SColumn)`
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

const Wrapper = styled(SStyledBox)`
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
