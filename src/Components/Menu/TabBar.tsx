import React from "react";
import styled from "styled-components";
import { PressButton } from "../../Components/TransComponants";

export const TabBar = ({
  onChange,
  selectedMenuIndex,
  menu,
}: {
  onChange: Function;
  selectedMenuIndex: number;
  menu: Array<string>;
}) => {
  return (
    <TabContainer>
      {menu.map((e, i) => (
        <PressButton
          id={i}
          key={i}
          selected={i === parseInt(selectedMenuIndex.toString()) ? true : false}
          onClick={onChange}
        >
          {e}
        </PressButton>
      ))}
    </TabContainer>
  );
};

const TabContainer = styled.div`
  border-bottom: 1px solid ${({ theme }) => theme.colors.gray3};
  padding-bottom: 4px;
  margin-bottom: 24px;
`;
