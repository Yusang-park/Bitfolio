import React from "react";
import styled, { css } from "styled-components";
import {
  SDivider,
  SRow,
  SSizedBox,
  SStyledDimmer,
  STitleText,
} from "../GlobalComponents";
import { Link, useLocation } from "react-router-dom";
import { categories } from "../../Routes/Categories";
import { useHistory } from "react-router-dom";

export const Sidebar = React.memo(
  ({ forPopup = false, isOpened = false, setClose }) => {
    const pathName = useLocation().pathname;
    const history = useHistory();

    function onClickLogo(e) {
      history.push("/");
      if (setClose !== undefined) setClose();
    }

    return (
      <>
        <Dimmer isOpened={isOpened} onClick={setClose}></Dimmer>
        <SidebarContainer forPopup={forPopup} isOpened={isOpened}>
          <LogoRow onClick={onClickLogo}>
            <Logo src="img/ico_logo.png" alt="Logo" />
            <STitleText>CryptoRank</STitleText>
            <SSizedBox width="24px"></SSizedBox>
          </LogoRow>

          <SDivider vertical="0px" horizontal="5%" />
          <SSizedBox height="16px" />
          {categories.map((e, i) => (
            <div key={i} onClick={setClose}>
              <CategoryRow
                to={e.path}
                key={e.name}
                selected={e.path === pathName}
              >
                {e.name}
              </CategoryRow>
            </div>
          ))}
        </SidebarContainer>
      </>
    );
  }
);

const Dimmer = styled(SStyledDimmer)`
  display: none;
  ${({ theme }) => theme.device.desktopM} {
    ${({ isOpened }) =>
      isOpened
        ? css`
            display: block;
          `
        : css``}
  }
`;

const Logo = styled.img`
  width: 96px;
`;

const LogoRow = styled(SRow)`
  height: 260px;
  cursor: pointer;

  ${({ theme }) => theme.device.desktopL} {
    flex-direction: column;
  }
  ${STitleText} {
    transition: font-size 200ms ease-out 100ms;
  }
  ${Logo} {
    transition: width 200ms ease-out 100ms;
  }

  &:hover ${STitleText} {
    font-size: 2.4rem;
  }
  &:hover ${Logo} {
    width: 89px;
  }
`;

const SidebarContainer = styled.div`
  display: ${({ forPopup }) => (!forPopup ? css`block` : css`none`)};
  width: 16.66vw;
  max-width: 320px;
  background-color: ${(props) => props.theme.colors.container};
  color: white;
  animation: fadeIn 0.5s;

  @keyframes fadeIn {
    from {
      left: -150px;
    }

    to {
      top: 0;
    }
  }

  ${({ theme }) => theme.device.desktopM} {
    ${({ isOpened }) =>
      isOpened
        ? css`
            display: block;
            position: absolute;
            z-index: 20;
            width: 60vw;
            top: 0;
            left: 0;
            height: 100%;
          `
        : css`
            display: none;
          `};
  }
`;

const CategoryRow = styled(Link)`
  display: flex;
  font-size: 2rem;
  padding: 16px 32px;
  margin-bottom: 0px;
  text-decoration: inherit;
  color: ${({ selected, theme }) =>
    selected ? css`white` : theme.colors.gray3};
  cursor: pointer;
  transition: background-color 300ms ease-out 100ms;

  &:hover {
    color: white;
    background-color: gray;
  }
`;
