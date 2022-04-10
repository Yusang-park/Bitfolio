import React, { useContext } from "react";
import styled from "styled-components";
import {
  SAnimatedDiv,
  SScrollColumn,
  SGrayText,
  SRow,
  SSizedBox,
  SYellowTitleCircle,
  SURLText,
} from "../../Components/GlobalComponents";
import { CryptoDataContext } from "../Details";

export const DetailsMarket = () => {
  const { data }: { data: any } = useContext(CryptoDataContext);

  return (
    <Wrapper>
      <SScrollColumn>
        {data.exchanges.map((e: any, i: number) => (
          <ItemRow key={i}>
            <YellowTitleCircle>{i + 1}</YellowTitleCircle>
            <SURLText href={e.trade_url}>{e.name}</SURLText>
            <SSizedBox width="8px" />
            <SGrayText>
              {data.symbol.toUpperCase()} /{" "}
              {e.target.includes("0X") ? "" : e.target}
            </SGrayText>
          </ItemRow>
        ))}
      </SScrollColumn>
    </Wrapper>
  );
};

const Wrapper = styled(SAnimatedDiv)`
  position: relative;
  width: 100%;
  height: 100%;
`;

const ItemRow = styled(SRow)`
  justify-content: flex-start;
  margin-bottom: 16px;
`;

const YellowTitleCircle = styled(SYellowTitleCircle)`
  margin-right: 16px;
`;
