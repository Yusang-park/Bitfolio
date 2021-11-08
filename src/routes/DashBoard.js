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
        <HotCrypto />
      </LeftSpace>
      <SizedBox width="32px" />
      <RightSpace>Portfolio</RightSpace>
    </Row>
  );
};

const LeftSpace = styled.div`
  display: flex;
  flex-direction: column;
  width: 50vw;
  height: 100%;
`;

const RightSpace = styled(BoxStyle)`
  flex: 1;
`;
