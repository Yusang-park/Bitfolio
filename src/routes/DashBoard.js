import React, { useContext, useState } from "react";
import styled from "styled-components";
import {
  Column,
  Row,
  BoxStyle as BoxStyle,
  SizedBox,
} from "../Components/GlobalComponents";
import { FavoriteContainer } from "./DashBoard/Favorites";

export const DashBoard = () => {
  return (
    <Row align_items="flex-start" justify_content="left" width="100%">
      <LeftContent>
        <FavoriteContainer />
      </LeftContent>
      {/* <HotCrypto /> */}
      <RightContent>Portfolio</RightContent>
    </Row>
  );
};

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

const RightContent = styled(BoxStyle)`
  flex: 1;
`;
