import React, { useState, createContext, useRef, useEffect } from "react";
import styled from "styled-components";
import { getCryptoDetails } from "../Service/Apis";

import {
  _Button,
  _Row,
  _SizedBox,
  _ATag,
  _StyledBox,
} from "../Components/GlobalComponents";
import { useLocation } from "react-router";
import { ProgressIndicator } from "../Components/ProgressIndicator/ProgressIndicator";

import { DetailsHeader } from "./Details/DetailsHeader";
import { DetailsInfoTabContainer } from "./Details/DetailsInfoTabContainer";
import { ChatContainer } from "./Details/ChatContainer";

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
  }, [id]);

  const menu = [
    { key: "Information", component: <DetailsInfoTabContainer /> },
    { key: "Market", component: <div /> },
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
            <_ATag
              id={i}
              key={i}
              selected={i === parseInt(selectedMenuIndex) ? true : false}
              onClick={changeMenu}
            >
              {e.key}
            </_ATag>
          ))}
        </TabBar>
        {menu[selectedMenuIndex].component}
      </DetailContainer>
      <_SizedBox width="32px" />
      <ChatContainer />
    </CryptoDataContext.Provider>
  );
};

const Center = styled.div`
  margin: auto;
`;

const DetailContainer = styled(_StyledBox)`
  width: 50vw;

  ${({ theme }) => theme.device.tablet} {
    width: auto;
    height: 80vh;
    padding: 24px;
    margin-bottom: 32px;
  }
`;

const TabBar = styled.div`
  border-bottom: 1px solid ${({ theme }) => theme.colors.gray3};
  padding-bottom: 4px;
  margin-bottom: 24px;
`;
