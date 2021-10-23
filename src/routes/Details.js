import React, { useState, createContext, useRef, useEffect } from "react";
import styled from "styled-components";
import { getCryptoDetails } from "../service/apis";
import { fadeIn } from "../styles/animation";
import { Button, Row, SizedBox, ATag } from "../styles/components";
import { useLocation } from "react-router";
import { DetailsUpperSpace } from "../components/details/DetailsUpperSpace";
import { ProgressIndicator } from "../components/progressIndicator/progressIndicator";
import { DetailsInfoContainer } from "../components/details/DetailsInfoContainer";
import { getUserDB } from "../service/firestore";

export const CryptoDataContext = createContext({
  data: null,
});
export const Details = (props) => {
  getUserDB();
  const id = useLocation().state.id;
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
      <Row>
        <DetailsContainer>
          <DetailsUpperSpace />
          <MenuContainer>
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
          </MenuContainer>
          {menu[selectedMenuIndex].component}
        </DetailsContainer>
        <SizedBox width="32px" />
        <BoardContainer> </BoardContainer>
      </Row>
    </CryptoDataContext.Provider>
  );
};
//TODO: progress bar to center

const Center = styled.div`
  margin: auto;
`;

const DetailsContainer = styled.div`
  flex: 5;
  display: flex;
  flex-direction: column;
  margin: 0px auto;
  padding: 48px;
  border-radius: 25px;
  background-color: ${({ theme }) => theme.colors.boxBackground};
  animation-duration: 0.5s;
  animation-timing-function: ease-out;
  animation-name: ${fadeIn};
  animation-fill-mode: forwards;

  ${({ theme }) => theme.device.desktopL} {
    padding: 32px;
  }
`;

const BoardContainer = styled.div`
  display: flex;
  flex-direction: column;
  flex: 2;
  padding: 32px 32px 16px 32px;
  border-radius: 25px;
  background-color: ${({ theme }) => theme.colors.boxBackground};
  animation-duration: 0.5s;
  animation-timing-function: ease-out;
  animation-name: ${fadeIn};
  animation-fill-mode: forwards;
`;

const MenuContainer = styled.div`
  border-bottom: 1px solid ${({ theme }) => theme.colors.gray3};
  padding-bottom: 4px;

  margin-bottom: 24px;
`;
