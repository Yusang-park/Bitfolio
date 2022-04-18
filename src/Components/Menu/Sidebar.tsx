import React from "react";
import styled, { css } from "styled-components";
import {
  Props,
  SDivider,
  SRow,
  SSizedBox,
  SStyledDimmer,
  STextButton,
  STitleText,
} from "../GlobalComponents";
import { Link, useLocation } from "react-router-dom";
import { sidebarCategories } from "../../Routes/SidebarCategories";
import { useHistory } from "react-router-dom";
import logoImg from "../../Assets/ico_logo.png";
import { useTranslation } from "react-i18next";
import { fadeInSidebar } from "../../Styles/Animation";

const Sidebar = React.memo(
  ({
    forPopup = false,
    isOpened = false,
    setClose,
  }: {
    forPopup?: boolean;
    isOpened?: boolean;
    setClose?: any;
  }) => {
    const pathName = useLocation().pathname;
    const history = useHistory();
    const { t, i18n } = useTranslation();

    function onClickLogo(e: any) {
      history.push("/");
      if (setClose !== undefined) setClose();
    }

    function onClickLanguage() {
      i18n.changeLanguage(i18n.language === "ko" ? "en" : "ko");
      localStorage.setItem("language", i18n.language);
    }

    return (
      <>
        <Dimmer isOpened={isOpened} onClick={(e) => setClose()}></Dimmer>
        <SidebarContainer forPopup={forPopup} isOpened={isOpened}>
          <LogoContainer onClick={onClickLogo}>
            <Logo src={logoImg} alt="Logo" />
            <STitleText>Bitfolio</STitleText>
            <SSizedBox width="24px"></SSizedBox>
          </LogoContainer>

          <SDivider vertical="0px" horizontal="5%" />
          <SSizedBox height="16px" />
          <ul>
            {sidebarCategories.map(
              (e, i) =>
                e.hide !== false && (
                  <li key={i} onClick={setClose}>
                    {e.hasOwnProperty("href") ? (
                      <CategoryAtage
                        href={e.href}
                        key={e.name}
                        selected={
                          e.path.toLowerCase() === pathName.toLowerCase()
                        }
                      >
                        {`${t(e.name)}▸`}
                      </CategoryAtage>
                    ) : (
                      <CategoryLink
                        to={e.path}
                        key={e.name}
                        selected={
                          e.path.toLowerCase() === pathName.toLowerCase()
                        }
                      >
                        {`${t(e.name)}`}
                      </CategoryLink>
                    )}
                  </li>
                )
            )}
          </ul>
          <ChangeLanguageContainer>
            <STextButton onClick={onClickLanguage}>
              {i18n.language === "ko" ? "Change to English" : "한국어로"}
            </STextButton>
          </ChangeLanguageContainer>
        </SidebarContainer>
      </>
    );
  }
);

export default Sidebar;

const ChangeLanguageContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  padding: 16px 32px;
`;

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
  height: 96px;
`;

const LogoContainer = styled(SRow)`
  height: 230px;
  cursor: pointer;

  ${({ theme }) => theme.device.desktopL} {
    flex-direction: column;
  }
  ${STitleText} {
    transition: font-size 200ms ease-out 100ms;
  }
  /* ${Logo} {
    transition: width 200ms ease-out 100ms;
  } */

  &:hover ${STitleText} {
    /* color: ${({ theme }) => theme.colors.gray}; */
  }
  /* &:hover ${Logo} {
    width: 89px;
  } */
`;

const SidebarContainer = styled.div<Props>`
  display: ${({ forPopup }) => (!forPopup ? css`block` : css`none`)};
  width: 16.66vw;
  max-width: 320px;
  background-color: ${(props) => props.theme.colors.boxBackground};
  color: white;
  animation: ${fadeInSidebar} 0.3s;

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

const CategoryStyle = styled.div`
  display: flex;
  font-size: 2rem;
  padding: 16px 32px;
  margin-bottom: 0px;
  text-decoration: inherit;
  color: ${({ selected, theme }: { selected: boolean; theme: any }) =>
    selected ? css`white` : theme.colors.gray3};
  cursor: pointer;
  transition: background-color 300ms ease-out 100ms;

  &:hover {
    color: white;
    background-color: gray;
  }
`;

const CategoryLink = CategoryStyle.withComponent(Link);
const CategoryAtage = CategoryStyle.withComponent("a");
