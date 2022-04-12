import React, { useState, useEffect, useContext } from "react";
import styled, { css } from "styled-components";
import {
  SDivider,
  SExpanded,
  SSizedBox,
  SPressButton,
  SPercentText,
  SRow,
  SStyledBox,
  SColumn,
  SGrayText,
  SBookmark,
} from "../Components/GlobalComponents";
import { getCryptoSummaryDataList, sortCryptoRank } from "../Service/Apis";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { ProgressIndicator } from "../Components/ProgressIndicator/ProgressIndicator";
import { useHistory } from "react-router-dom";
import { UserContext } from "../Provider/UserProvider";
import { fadeIn } from "../Styles/Animation";
import { GrayText, Text, TextBlue } from "../Components/TransComponants";

const maxPage = 179;

const CryptoRank = React.memo(() => {
  const [cryptoList, setCryptoList] = useState([]);
  const [pageIndex, setPageIndex] = useState(1);
  const [pageSectionIndex, setPageSectionIndex] = useState(0);
  const [hoverIndex, setHoverIndex] = useState(-1);
  const [sort, setSort] = useState(sortCryptoRank.MarketCap);
  const history = useHistory();

  useEffect(() => {
    //in order to except the property in deps, use  useState of function type.
    setCryptoList((l) => l.filter((e) => false));

    getCryptoSummaryDataList(pageIndex, sort).then((e: any) => {
      setCryptoList(e);
    });
  }, [pageIndex, sort]); //It is performed when mounted.

  function changePageIndex(e: any) {
    if (e.target.id !== pageIndex) {
      setCryptoList(cryptoList.filter((e) => false));
      setPageIndex(e.target.id);
    }
  }

  function prevPagePagination(e: any) {
    if (pageSectionIndex !== 0) setPageSectionIndex(pageSectionIndex - 1);
  }
  function nextPagePagination(e: any) {
    if (pageSectionIndex !== maxPage) setPageSectionIndex(pageSectionIndex + 1);
  }

  function routeDetails(id: string) {
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
            <BasicInfoSectionContainer
              pageIndex={pageIndex}
              cryptoList={cryptoList}
              routeDetails={routeDetails}
              hoverIndex={hoverIndex}
              setHoverIndex={setHoverIndex}
            ></BasicInfoSectionContainer>
            <DetailInfoSectionContainer
              pageIndex={pageIndex}
              cryptoList={cryptoList}
              routeDetails={routeDetails}
              hoverIndex={hoverIndex}
              setHoverIndex={setHoverIndex}
              sort={sort}
              setSort={setSort}
            ></DetailInfoSectionContainer>
          </>
        )}
      </Row>
      <SDivider horizontal="32px" />
      <SSizedBox height="16px" />
      <SRow justify_content="center">
        <span onClick={prevPagePagination}>
          <FontAwesomeIcon icon="chevron-left" size="1x" color="white" />
        </span>
        <SSizedBox width="16px" />
        {[...Array(5)].map((n, index) => (
          <SPressButton
            key={index}
            selected={
              index + 1 + pageSectionIndex * 5 ===
              parseInt(pageIndex.toString())
            }
            id={`${index + 1 + pageSectionIndex * 5}`}
            onClick={changePageIndex}
            width={"38px"}
          >
            {index + 1 + pageSectionIndex * 5}
          </SPressButton>
        ))}
        <SSizedBox width="16px" />
        <span onClick={nextPagePagination}>
          <FontAwesomeIcon icon="chevron-right" size="1x" color="white" />
        </span>
      </SRow>
    </Wrapper>
  );
});

const BasicInfoSectionContainer = React.memo(
  ({
    cryptoList,
    pageIndex,
    routeDetails,
    hoverIndex,
    setHoverIndex,
  }: {
    cryptoList: any;
    pageIndex: number;
    routeDetails: any;
    hoverIndex: number;
    setHoverIndex: any;
  }) => {
    const {
      favorites,
      setFavoriteCrypto,
    }: { favorites: any; setFavoriteCrypto: any } = useContext(UserContext);
    return (
      <BasicInfoWrapper>
        <CategoryTitleContainer>
          <NumberingSizedBox />
          <CategoryText flex="2">Name</CategoryText>
        </CategoryTitleContainer>
        <SSizedBox height="16px" />

        {cryptoList.map((e: any, i: any) => (
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
              <NumberingContainer>
                <SGrayText> {i + (pageIndex - 1) * 10 + 1}</SGrayText>
                <SBookmark
                  isSelected={favorites[e.id]}
                  onClick={() =>
                    setFavoriteCrypto(e.id, e.fullName, e.imageUrl)
                  }
                  size="1x"
                />
              </NumberingContainer>
              <SExpanded flex="2">
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
      </BasicInfoWrapper>
    );
  }
);

const DetailInfoSectionContainer = React.memo(
  ({
    cryptoList,
    pageIndex,
    routeDetails,
    hoverIndex,
    setHoverIndex,
    sort,
    setSort,
  }: {
    cryptoList: any;
    pageIndex: number;
    routeDetails: any;
    hoverIndex: number;
    setHoverIndex: any;
    sort: sortCryptoRank;
    setSort: Function;
  }) => {
    return (
      <DetailInfoWrapper>
        <Scroll>
          <CategoryTitleContainer id="1">
            <CategoryText flex="4">Price</CategoryText>
            <CategoryText
              flex="6"
              enableClick={true}
              selected={sort === sortCryptoRank.MarketCap}
              onClick={() => setSort(sortCryptoRank.MarketCap)}
            >
              MarketCap
            </CategoryText>
            <CategoryText flex="6">CirculatingSupply</CategoryText>
            <CategoryText
              flex="6"
              enableClick={true}
              selected={sort === sortCryptoRank.Volumn}
              onClick={() => setSort(sortCryptoRank.Volumn)}
            >
              Volume
            </CategoryText>
            <CategoryText flex="4">24Hours</CategoryText>
          </CategoryTitleContainer>
          <SSizedBox height="16px" />
          {cryptoList.map((e: any, i: any) => (
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
              <Element flex="4">${e.price}</Element>
              <Element flex="6">${e.marketCap.toLocaleString()}</Element>
              <Element flex="6">{e.currentSupply.toLocaleString()}</Element>
              <Element flex="6">${e.volume.toLocaleString()}</Element>
              <Element flex="4">
                <SPercentText negative={e.pricePercent24h.includes("-")}>
                  {e.pricePercent24h}
                </SPercentText>
              </Element>
            </ElementRow>
          ))}
        </Scroll>
      </DetailInfoWrapper>
    );
  }
);

const CategoryTitleContainer = styled(SRow)`
  justify-content: flex-start;
  align-items: flex-start;
  padding-bottom: 12px;

  ${({ theme }) => theme.device.tablet} {
    padding-bottom: 0px;
  }
`;

const ElementRow = styled(SRow)`
  height: 100%;
  justify-content: flex-start;
  align-items: center;
  background-color: ${({ isHovered }: { isHovered: any }) =>
    isHovered && css`grey`};
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
    width: ${({ flex }) => css`calc( 20px * ${flex})`};
    margin-left: 16px;
    margin-right: 16px;
    padding: 0px 0px;
  }
`;

const DetailInfoWrapper = styled.div`
  flex: 8;
  position: relative;
  width: 100%;
  height: 100%;
  animation-duration: 0.5s;
  animation-timing-function: ease-out;
  animation-name: ${fadeIn};
  animation-fill-mode: forwards;
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

const BasicInfoWrapper = styled(SColumn)`
  flex: 3;
  animation-duration: 0.5s;
  animation-timing-function: ease-out;
  animation-name: ${fadeIn};
  animation-fill-mode: forwards;
`;

const Scroll = styled(SColumn)`
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
  ${({ theme }) => theme.device.mobile} {
    padding: 16px 0px 16px 0px;
  }
`;

const NumberingSizedBox = styled(SSizedBox)`
  width: 8vw;
  ${({ theme }) => theme.device.tablet} {
    width: 12vw;
  }
`;

const NumberingContainer = styled(SRow)`
  width: 8vw;
  justify-content: space-evenly;
  ${({ theme }) => theme.device.tablet} {
    width: 12vw;
  }
`;

const CategoryText = ({
  children,
  flex,
  enableClick,
  selected,
  onClick,
}: {
  children?: any;
  flex?: any;
  enableClick?: any;
  selected?: any;
  onClick?: any;
}) => {
  return (
    <Element
      onClick={onClick}
      flex={flex}
      style={enableClick && { cursor: "pointer" }}
    >
      {enableClick ? (
        selected ? (
          <TextBlue>{children}</TextBlue>
        ) : (
          <Text>{children}</Text>
        )
      ) : (
        <GrayText>{children}</GrayText>
      )}
    </Element>
  );
};

export default CryptoRank;
