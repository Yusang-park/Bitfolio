import React, { useContext } from "react";
import styled, { css } from "styled-components";
import {
  SColumn,
  SGrayText,
  SRow,
  SSizedBox,
  SYellowTitleCircle,
} from "../../Components/GlobalComponents";
import { CryptoDataContext } from "../Details";

export const DetailsMarket = () => {
  const { data } = useContext(CryptoDataContext);
  console.log(data);

  return (
    <Wrapper>
      <Column>
        {data.exchanges.map((e, i) => (
          <ItemRow key={e}>
            <YellowTitleCircle>{i + 1}</YellowTitleCircle>
            <ExchangeName href={e.trade_url} existUrl={e.trade_url}>
              {e.name}
            </ExchangeName>
            <SSizedBox width="8px" />
            <SGrayText>
              {data.symbol.toUpperCase()} /{" "}
              {e.target.includes("0X") ? "" : e.target}
            </SGrayText>
          </ItemRow>
        ))}
      </Column>
    </Wrapper>
  );
};

const ExchangeName = styled.a`
  font-size: 1.6rem;
  &:hover {
    color: ${({ existUrl, theme }) =>
      existUrl ? theme.colors.blue : css`white`};
    cursor: pointer;
  }
`;

const Wrapper = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
`;

const ItemRow = styled(SRow)`
  justify-content: flex-start;
  margin-bottom: 16px;
`;

const Column = styled(SColumn)`
  position: absolute;

  width: 100%;
  height: 100%;
  overflow-y: auto;
  &::-webkit-scrollbar {
    width: 8px;
    border-radius: 6px;
    background: ${(props) => props.theme.colors.gray3};
  }
  &::-webkit-scrollbar-thumb {
    background-color: gray;
    border-radius: 6px;
  }
`;

const YellowTitleCircle = styled(SYellowTitleCircle)`
  margin-right: 16px;
`;
