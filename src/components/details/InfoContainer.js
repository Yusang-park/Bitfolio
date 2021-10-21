import React from "react";
import styled from "styled-components";

export const DetailsInfoContainer = () => {
  return (
    <Row>
      <Column>
        <YellowTitleCircle>Market Cap</YellowTitleCircle>
      </Column>
    </Row>
  );
};

const Row = styled.div`
  display: flex;
`;

const Column = styled.div`
  display: flex;
  flex-direction: column;
`;

const YellowTitleCircle = styled.div`
  padding: 6px 16px;
  border-radius: 35px;
  background-color: ${({ theme }) => theme.colors.yellow};
  color: black;
`;
