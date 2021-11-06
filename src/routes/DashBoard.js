import React, { useContext, useState } from "react";
import styled from "styled-components";
import { Favorite } from "../components/dashboard/Favorites";
import { Row } from "../components/global-components";

export const DashBoard = () => {
  return (
    <Row align_items="flex-start" justify_content="left">
      <Favorite />
      <Temp></Temp>
    </Row>
  );
};

const Temp = styled.div`
  flex: 1;
`;
