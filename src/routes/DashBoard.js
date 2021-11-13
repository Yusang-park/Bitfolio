import React, { useContext, useState } from "react";
import styled from "styled-components";
import { Favorite } from "../components/dashboard/Favorites";
import { HotCrypto } from "../components/dashboard/HotCrypto";
import {
  Column,
  Row,
  BoxStyle as BoxStyle,
  SizedBox,
} from "../components/global-components";

export const DashBoard = () => {
  return (
    <Row align_items="flex-start" justify_content="left" width="100%">
      <LeftSpace>
        <Favorite />
        <SizedBox height="32px" />
      </LeftSpace>
      {/* <HotCrypto /> */}
      {/* <RightSpace>Portfolio</RightSpace> */}
    </Row>
  );
};

const RowCustom = styled.div`
  ${({ theme }) => theme.device.tablet} {
    flex-direction: column;
  }
`;

const LeftSpace = styled.div`
  display: flex;
  flex-direction: column;

  width: 66%;
  height: 100%;

  ${({ theme }) => theme.device.tablet} {
    width: 100%;
  }
`;

const RightSpace = styled(BoxStyle)`
  flex: 1;
`;
