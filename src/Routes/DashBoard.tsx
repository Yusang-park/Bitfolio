import React from "react";
import styled from "styled-components";
import { SRow } from "../Components/GlobalComponents";
import { Favorite } from "./DashBoard/Favorites";
import { HotCrypto } from "./DashBoard/HotCrypto";

console.log("preload this file");

const DashBoard = () => {
  return (
    <Wrapper>
      <Container>
        <LeftContent>
          <Favorite />
          <HotCrypto />
        </LeftContent>
        {/* <RightContent>Portfolio</RightContent> */}
      </Container>
    </Wrapper>
  );
};
const Wrapper = styled.div`
  display: flex;
  width: 100%;
  height: 100%;
`;

const Container = styled(SRow)`
  justify-content: left;
  align-items: flex-start;
  height: 100%;
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
