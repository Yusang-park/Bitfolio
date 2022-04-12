import React from "react";
import styled from "styled-components";
import { SRow } from "../Components/GlobalComponents";
import { FavoriteContainer } from "./DashBoard/Favorites";

console.log("preload this file");

const DashBoard = () => {
  return (
    <Wrapper>
      <LeftContent>
        <FavoriteContainer />
      </LeftContent>
      {/* <HotCrypto /> */}
      {/* <RightContent>Portfolio</RightContent> */}
    </Wrapper>
  );
};

const Wrapper = styled(SRow)`
  justify-content: left;
  align-items: flex-start;
  width: 100%;
  ${({ theme }) => theme.device.tablet} {
    flex-direction: column;
  }
`;

const LeftContent = styled.div`
  display: flex;
  flex-direction: column;

  width: 66%;
  height: 100%;
  margin-right: 32px;

  ${({ theme }) => theme.device.tablet} {
    width: 100%;
    margin-right: 0px;
  }
`;

export default DashBoard;
