import React, { useContext } from "react";
import styled from "styled-components";
import { SColumn, SRow, SText } from "../../Components/GlobalComponents";
import { CryptoDataContext } from "../Details";

export const DetailsMarket = () => {
  const { data } = useContext(CryptoDataContext);

  return (
    <Wrapper>
      <Column>
        {data.exchanges.map((e, i) => (
          <Row key={i}>
            <a href={e.trade_url}>
              <SText>{`${i + 1}. ${e.name}`}</SText>
            </a>
          </Row>
        ))}
      </Column>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
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

const Row = styled(SRow)`
  justify-content: space-between;
  padding-top: 4px;
  padding-bottom: 4px;
`;
