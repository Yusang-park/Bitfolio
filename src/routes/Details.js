import React, { useState, createContext, useRef, useEffect } from "react";
import styled from "styled-components";
import { getCryptoDetails } from "../service/apis";
import { fadeIn } from "../styles/animation";
import {
  Button,
  Row,
  SizedBox,
  ATag,
  BoxStyle,
} from "../components/global-components";
import { useLocation } from "react-router";
import { DetailsUpperContainer } from "../components/details/DetailsUpperSpace";
import { ProgressIndicator } from "../components/progressIndicator/progressIndicator";
import { DetailsInfoContainer } from "../components/details/DetailsInfoContainer";
import { ChatScaffold } from "../components/chat/ChatContainer";

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
    { key: "Information", component: <DetailsInfoContainer /> },
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
      <DetailScaffold>
        <DetailsUpperContainer />
        <TabBar>
          {menu.map((e, i) => (
            <ATag
              id={i}
              key={i}
              selected={i === parseInt(selectedMenuIndex) ? true : false}
              onClick={changeMenu}
            >
              {e.key}
            </ATag>
          ))}
        </TabBar>
        {menu[selectedMenuIndex].component}
      </DetailScaffold>
      <SizedBox width="32px" />
      <ChatScaffold />
    </CryptoDataContext.Provider>
  );
};

const Center = styled.div`
  margin: auto;
`;

const DetailScaffold = styled(BoxStyle)`
  width: 50vw;

  ${({ theme }) => theme.device.tablet} {
    width: auto;
    height: 65vh;
    padding: 24px;
    margin-bottom: 32px;
  }
`;

const TabBar = styled.div`
  border-bottom: 1px solid ${({ theme }) => theme.colors.gray3};
  padding-bottom: 4px;
  margin-bottom: 24px;
`;
