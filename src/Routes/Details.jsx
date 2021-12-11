import React, { useState, createContext, useEffect } from "react";
import styled from "styled-components";
import { getCryptoDetails } from "../Service/Apis";

import { SSizedBox, SStyledBox } from "../Components/GlobalComponents";
import { useLocation } from "react-router";
import { ProgressIndicator } from "../Components/ProgressIndicator/ProgressIndicator";

import { DetailsHeader } from "./Details/DetailsHeader";
import { DetailsInfo } from "./Details/DetailsInfo";
import { DetailsCommunity } from "./Details/DetailsCommunity";
import { Chat } from "./Details/Chat";
import { DetailsMarket } from "./Details/DetailsMarket";
import { PressButton } from "../Components/TransComponants";

export const CryptoDataContext = createContext({
  data: null,
});

export const Details = (props) => {
  let temp = useLocation().pathname.split("/");

  const id = temp[temp.length - 1];
  const [data, setData] = useState(null);
  const [selectedMenuIndex, setMenuIndex] = useState(0);

  useEffect(() => {
    getCryptoDetails(id).then((response) => {
      setData(response);
    });
  }, [id, setData]);

  const menu = [
    { key: "Information", component: <DetailsInfo /> },
    { key: "Exchanges", component: <DetailsMarket /> },
    { key: "Community", component: <DetailsCommunity /> },
  ];

  function changeMenu(e) {
    setMenuIndex(e.target.id);
  }

  return data === null ? (
    <Center>
      <ProgressIndicator />
    </Center>
  ) : (
    <CryptoDataContext.Provider value={{ data: data }}>
      <DetailContainer>
        <DetailsHeader />
        <TabBar>
          {menu.map((e, i) => (
            <PressButton
              id={i}
              key={i}
              selected={i === parseInt(selectedMenuIndex) ? true : false}
              onClick={changeMenu}
            >
              {e.key}
            </PressButton>
          ))}
        </TabBar>
        {menu[selectedMenuIndex].component}
      </DetailContainer>
      <SSizedBox width="32px" />
      <Chat key={data.id} cryptoId={data.id} fullName={data.fullName} />
    </CryptoDataContext.Provider>
  );
};

const Center = styled.div`
  margin: auto;
`;

const DetailContainer = styled(SStyledBox)`
  width: 50vw;

  ${({ theme }) => theme.device.tablet} {
    width: auto;
    height: 80vh;
    padding: 24px;
    margin-bottom: 32px;
  }
  ${({ theme }) => theme.device.mobile} {
    padding: 16px;
    margin-bottom: 24px;
  }
`;

const TabBar = styled.div`
  border-bottom: 1px solid ${({ theme }) => theme.colors.gray3};
  padding-bottom: 4px;
  margin-bottom: 24px;
`;
