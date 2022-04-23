import React, { useContext, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import styled from "styled-components";
import {
  SAnimatedDiv,
  SScrollColumn,
  SGrayText,
  SRow,
  SSizedBox,
  SYellowTitleCircle,
  SURLText,
  Props,
} from "../../Components/GlobalComponents";
import { CryptoDataContext } from "../Details";

export const DetailsMarket = () => {
  const { data }: { data: any } = useContext(CryptoDataContext);
  const [exchagnesData, setExchagnesData] = useState<any[]>([]);
  const { t } = useTranslation();

  useEffect(() => {
    let sorted = [...data.exchanges];
    sorted.sort((a, b) => Number(a.price) - Number(b.price));
    setExchagnesData(sorted);
  }, [data]);

  function onChangeSort(e: React.ChangeEvent<HTMLSelectElement>) {
    let sorted = [...exchagnesData];
    switch (e.target.value) {
      case "Volume":
        setExchagnesData([...data.exchanges]);
        return;

      case "High Price":
        sorted.sort((a, b) => Number(b.price) - Number(a.price));
        break;
      case "Low Price":
        sorted.sort((a, b) => Number(a.price) - Number(b.price));
        break;
      default:
        break;
    }
    setExchagnesData(sorted);
  }

  return (
    <Wrapper>
      <SScrollColumn>
        <DropdownBox>
          <select onChange={onChangeSort}>
            <option value={"Low Price"} key={"Low Price"}>
              {t("Low Price")}
            </option>
            <option value={"High Price"} key={"High Price"}>
              {t("High Price")}
            </option>
            <option value={"Volume"} key={"Volume"}>
              {t("Volume")}
            </option>
          </select>
        </DropdownBox>
        {exchagnesData.map((e: any, i: number) => (
          <ItemRow key={i}>
            <YellowTitleCircle>{i + 1}</YellowTitleCircle>
            <SURLText href={e.trade_url}>{e.name}</SURLText>
            <SSizedBox width="8px" />
            <SGrayText>
              {data.symbol.toUpperCase()} /{" "}
              {e.target.length > 10 ? t("Unknown") : e.target}
            </SGrayText>
            <SSizedBox width="8px" />
            <PriceOfEachMarketText
              larger={Number(e.price) > Number(data.price)}
            >{`$${e.price}`}</PriceOfEachMarketText>
            <SGrayText>{e.volumn}</SGrayText>
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

const DropdownBox = styled.div`
  display: flex;
  justify-content: flex-end;
  margin-right: 16px;
  margin-bottom: 16px;
`;

const ItemRow = styled(SRow)`
  justify-content: flex-start;
  margin-bottom: 16px;
`;

const YellowTitleCircle = styled(SYellowTitleCircle)`
  margin-right: 16px;
`;

const PriceOfEachMarketText = styled.p<Props>`
  font-size: 1.6rem;
  color: ${({ larger, theme }) =>
    larger ? theme.colors.negative : theme.colors.positive};
`;
