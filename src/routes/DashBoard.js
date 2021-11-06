import React, { useContext, useState } from "react";
import styled from "styled-components";
import { UserContext } from "../provider/userProvider";
import { Divider } from "../components/global-components";

export const DashBoard = () => {
  const { favorites } = useContext(UserContext);

  return (
    <div>
      <p>Your favorites</p>
      <Divider />
      {Object.keys(favorites).map((e, i) => (
        <p key={i}>{e}</p>
      ))}
    </div>
  );
};

const D = styled.div`
  background-color: white;
  width: 100%;
`;
