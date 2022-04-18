import React, { useState, lazy, Suspense } from "react";
import styled, { css } from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { useDispatch } from "react-redux";
import { CryptoRankSortTypes } from "../../Service/Apis";
import { ProgressIndicator } from "../ProgressIndicator/ProgressIndicator";
import { useAppSelector } from "../../Reducer/RootReducer";
import { fetchFavoriteCrypto } from "../../Reducer/UserReducer";
import { simpleSlideIn } from "../../Styles/Animation";
import {
  SDivider,
  SSizedBox,
  SRow,
  SPressButton,
  SGrayText,
  SBookmark,
  SExpanded,
  SColumn,
  SPercentText,
  SStyledBox,
} from "../GlobalComponents";
import { TextBlue, GrayText, Text } from "../TransComponants";
import { ExchangeRankSortTypes } from "../../Routes/ExchangesRank";

const Icon = lazy(() => import("../Icon"));

export type RankSortTypes = CryptoRankSortTypes | ExchangeRankSortTypes;

export type RankArrayElement = {
  type: string;
  valueType: string;
  flex: number;
  sort?: RankSortTypes;
};

export const Rank = React.memo(
  ({
    list,
    sortType,
    setSort,
    setPage,
    pageIndex,
    basicCategories,
    additinalCategories,
    hasBookmark = false,
    onClickHandler,
    maxPage,
  }: {
    list: Array<any>;
    sortType: RankSortTypes;
    setSort: Function;
    setPage: any;
    pageIndex: number;
    basicCategories: RankArrayElement[];
    additinalCategories: RankArrayElement[];
    hasBookmark?: boolean;
    onClickHandler: Function;
    maxPage: number;
  }) => {
    const [hoverIndex, setHoverIndex] = useState(-1);
    const [pageSectionIndex, setPageSectionIndex] = useState(0);

    function prevPagePagination(e: any) {
      if (pageSectionIndex !== 0) setPageSectionIndex(pageSectionIndex - 1);
    }
    function nextPagePagination(e: any) {
      if (pageSectionIndex !== maxPage)
        setPageSectionIndex(pageSectionIndex + 1);
    }

    return (
      <Wrapper>
        <Row>
          {list.length === 0 ? (
            <ProgressIndicator />
          ) : (
            <>
              <BasicInfoSectionContainer
                pageIndex={pageIndex}
                list={list}
                onClickHandler={onClickHandler}
                hoverIndex={hoverIndex}
                setHoverIndex={setHoverIndex}
                basicCategories={basicCategories}
                hasBookmark={hasBookmark}
              ></BasicInfoSectionContainer>
              <DetailInfoSectionContainer
                pageIndex={pageIndex}
                cryptoList={list}
                onClickHandler={onClickHandler}
                hoverIndex={hoverIndex}
                setHoverIndex={setHoverIndex}
                sortType={sortType}
                setSort={setSort}
                additinalCategories={additinalCategories}
              ></DetailInfoSectionContainer>
            </>
          )}
        </Row>
        <BottomNavigationContainer
          prevPagePagination={prevPagePagination}
          nextPagePagination={nextPagePagination}
          pageIndex={pageIndex}
          setPage={setPage}
          pageSectionIndex={pageSectionIndex}
        />
      </Wrapper>
    );
  }
);

const BottomNavigationContainer = React.memo(
  ({
    prevPagePagination,
    nextPagePagination,
    pageIndex,
    setPage,
    pageSectionIndex,
  }: {
    prevPagePagination: React.MouseEventHandler<HTMLSpanElement>;
    nextPagePagination: React.MouseEventHandler<HTMLSpanElement>;
    pageIndex: number;
    setPage: Function;
    pageSectionIndex: number;
  }) => {
    return (
      <div>
        <SDivider horizontal="32px" />
        <SSizedBox height="16px" />
        <SRow justify_content="center">
          <span onClick={prevPagePagination}>
            <FontAwesomeIcon icon="chevron-left" size="1x" color="white" />
          </span>
          <SSizedBox width="16px" />
          {[...Array(10)].map((n, index) => (
            <SPressButton
              key={index}
              id={index.toString()}
              selected={
                index + 1 + pageSectionIndex * 10 ===
                parseInt(pageIndex.toString())
              }
              onClick={() => {
                setPage(index + 1 + pageSectionIndex * 10);
              }}
              width={"38px"}
            >
              {index + 1 + pageSectionIndex * 10}
            </SPressButton>
          ))}
          <SSizedBox width="16px" />
          <span onClick={nextPagePagination}>
            <FontAwesomeIcon icon="chevron-right" size="1x" color="white" />
          </span>
        </SRow>
      </div>
    );
  }
);

const BasicInfoSectionContainer = React.memo(
  ({
    list,
    pageIndex,
    onClickHandler,
    hoverIndex,
    setHoverIndex,
    basicCategories,
    hasBookmark,
  }: {
    list: any;
    pageIndex: number;
    onClickHandler: any;
    hoverIndex: number;
    setHoverIndex: any;
    basicCategories: RankArrayElement[];
    hasBookmark: boolean;
  }) => {
    const favorites = useAppSelector((state) => state.userReducer.favorites);
    const dispatch = useDispatch();
    return (
      <BasicInfoWrapper>
        <CategoryTitleContainer>
          <NumberingSizedBox />
          {basicCategories.map((e, i) => (
            <CategoryText key={i} flex={e.flex}>
              {e.type}
            </CategoryText>
          ))}
        </CategoryTitleContainer>
        <SSizedBox height="16px" />

        {list.map((e: any, i: any) => (
          <ElementRow
            onMouseOver={() => {
              if (hoverIndex !== i) setHoverIndex(i);
            }}
            onMouseOut={() => {
              setHoverIndex(-1);
            }}
            isHovered={hoverIndex === i}
            key={i}
            onClick={() => onClickHandler(e.id)}
          >
            <SRow
              key={i * 10}
              height="100%"
              justify_content="flex-start"
              align="flex-start"
              onClick={() => onClickHandler(e.id)}
            >
              <NumberingContainer>
                <SGrayText> {i + (pageIndex - 1) * 10 + 1}</SGrayText>
                {hasBookmark && (
                  <SBookmark
                    isSelected={favorites[e.id]}
                    onClick={() =>
                      dispatch(
                        fetchFavoriteCrypto(e.id, e.fullName, e.imageUrl) as any
                      )
                    }
                    size="1x"
                  />
                )}
              </NumberingContainer>
              <SExpanded flex="2">
                <Suspense fallback={<div></div>}>
                  <Icon src={e.imageUrl} name={e.id} />
                  <SSizedBox width="16px" />
                </Suspense>
                <SColumn>
                  {e.fullName ?? e.name}
                  <br></br>
                  <SGrayText>{e.symbol}</SGrayText>
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
    onClickHandler,
    hoverIndex,
    setHoverIndex,
    sortType: sort,
    setSort,
    additinalCategories,
  }: {
    cryptoList: any;
    pageIndex: number;
    onClickHandler: any;
    hoverIndex: number;
    setHoverIndex: any;
    sortType: RankSortTypes;
    setSort: Function;
    additinalCategories: RankArrayElement[];
  }) => {
    return (
      <DetailInfoWrapper>
        <Scroll>
          <CategoryTitleContainer id="1">
            {additinalCategories.map((e, i) => (
              <CategoryText
                key={i}
                flex={e.flex}
                enableClick={e.sort !== undefined}
                selected={sort === e.sort}
                onClick={
                  e.sort !== undefined ? () => setSort(e.sort) : () => {}
                }
              >
                {e.type}
              </CategoryText>
            ))}
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
              onClick={() => onClickHandler(e.id)}
            >
              {additinalCategories.map((c, i) => (
                <Element key={i} flex={c.flex}>
                  {typeof e[c.valueType] === "number" &&
                  `${e[c.valueType]}`.includes("%") ? (
                    <SPercentText negative={e[c.valueType].includes("-")}>
                      {e[c.valueType]}
                    </SPercentText>
                  ) : (
                    <p>
                      {typeof e[c.valueType] === "string"
                        ? e[c.valueType]
                        : e[c.valueType.toLocaleString()]}
                    </p>
                  )}
                </Element>
              ))}
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
    width: ${({ flex }: { flex: any }) => css`calc( 20px * ${flex})`};
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
  animation-name: ${simpleSlideIn};
  animation-fill-mode: forwards;
`;

const Row = styled(SRow)`
  flex: 1;
`;

const BasicInfoWrapper = styled(SColumn)`
  flex: 3;
  animation-duration: 0.5s;
  animation-timing-function: ease-out;
  animation-name: ${simpleSlideIn};
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
  width: 7vw;
  ${({ theme }) => theme.device.tablet} {
    width: 12vw;
  }
`;

const NumberingContainer = styled(SRow)`
  width: 7vw;
  justify-content: space-evenly;
  ${({ theme }) => theme.device.tablet} {
    width: 12vw;
  }
`;

const CategoryText = ({
  children,
  flex,
  enableClick = false,
  selected,
  onClick,
}: {
  children?: any;
  flex?: any;
  enableClick?: boolean;
  selected?: any;
  onClick?: any;
}) => {
  return (
    <Element
      id={children!}
      onClick={onClick}
      flex={flex}
      style={enableClick ? { cursor: "pointer" } : { cursor: "default" }}
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
