import React, { useState } from "react";
import styled, { css } from "styled-components";
import { Divide } from "../ui/Divide";
import { Link, useLocation } from "react-router-dom";
import { categories } from "../../routes/categories";

export const Sidebar = () => {
  const pathName = useLocation().pathname;

  return (
    <SidebarContainer>
      <LogoRow>
        <Logo src="img/139.png" alt="Logo" />
        <LogoTitle>CryptoFolio</LogoTitle>
      </LogoRow>
      <Divide />
      {categories.map((e) => (
        <CategoryRow to={e.path} selected={e.path === pathName}>
          {e.name}
        </CategoryRow>
      ))}
    </SidebarContainer>
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

const SidebarContainer = styled.div`
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

const CategoryRow = styled(Link)`
  display: flex;
  font-size: 22px;
  padding: 8px 32px;
  margin-bottom: 28px;
  text-decoration: inherit;
  color: ${({ selected, theme }) =>
    selected ? css`white` : theme.colors.disable};
  cursor: pointer;
  &:hover {
    background-color: gray;
  }
`;
