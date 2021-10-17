import React, { useState } from "react";
import styled from "styled-components";
import { Divide } from "../ui/Divide";

const categories = [
  "Dashboard",
  "Portfolio",
  "CryptoCurrencies",
  "Exchanges",
  "Indexes",
];

export const Menu = () => {
  const [selectedCategory, setCategory] = useState(categories[0]);

  return (
    <MenuContainer>
      <LogoRow>
        <Logo src="img/139.png" alt="Logo" />
        <LogoTitle>CryptoFolio</LogoTitle>
      </LogoRow>
      <Divide />
      {categories.map((e) => (
        <CategoryRow
          selected={e === selectedCategory}
          onClick={() => setCategory(e)}
        >
          {e}
        </CategoryRow>
      ))}
    </MenuContainer>
  );
};

const LogoRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;

  ${({ theme }) => theme.device.desktopL} {
    flex-direction: column;
  }
`;

const MenuContainer = styled.div`
  width: 16.66%;
  max-width: 320px;
  padding-top: 76px;
  background-color: ${(props) => props.theme.colors.container};
  color: white;

  ${({ theme }) => theme.device.desktopM} {
    display: none;
  }
  ${({ theme }) => theme.device.tablet} {
    display: none;
  }
  ${({ theme }) => theme.device.mobile} {
    display: none;
  }
`;

const Logo = styled.img`
  width: 96px;
`;

const LogoTitle = styled.div`
  font-size: 32px;
`;

const CategoryRow = styled.div`
  display: flex;
  font-size: 22px;
  padding: 4px 32px;
  margin-bottom: 28px;
  color: ${({ selected, theme }) =>
    selected ? theme.colors.white : theme.colors.disable};

  &:hover {
    background-color: gray;
    color: ${({ selected, theme }) =>
      selected ? theme.colors.white : theme.colors.black};
  }
`;
