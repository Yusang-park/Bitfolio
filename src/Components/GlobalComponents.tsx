import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import styled, { css } from "styled-components";
import { fadeIn } from "../Styles/Animation";
import { SizeProp } from "@fortawesome/fontawesome-svg-core";

export interface Props {
  negative?: string;
  isSelected?: boolean;
  horizontal?: string;
  vertical?: string;
  width?: string;
  height?: string;
  justify_content?: string;
  align_items?: string;
  flex?: string;
  selected?: boolean;
  forPopup?: boolean;
  isOpened?: boolean;
  expand?: boolean;
  isMine?: boolean;
}

// ====================================================================================
export const STitleText = styled.p`
  font-size: 2.5rem;
`;

export const SBoldTitleText = styled.p`
  font-size: 2.5rem;
  font-weight: bold;
`;

export const SSubTitleText = styled.p`
  font-size: 1.8rem;
`;

export const SGrayText = styled.p`
  font-size: 1.6rem;
  transition: color 300ms ease-out 100ms;
  color: ${(props) => props.theme.colors.gray};
`;

export const SPercentText = styled.p<Props>`
  font-size: 1.6rem;
  color: ${({ theme, negative }) =>
    negative ? theme.colors.negative : theme.colors.positive};
`;

export const SText = styled.p`
  font-size: 1.6rem;
`;
export const STextBlue = styled.p`
  font-size: 1.6rem;
  color: ${({ theme }) => theme.colors.blue};
`;

export const STextBlack = styled.p`
  font-size: 1.6rem;
  color: black;
`;

export const SBoldText = styled.p`
  font-size: 1.6rem;
  font-weight: bold;
`;

export const SURLText = styled.a`
  font-size: 1.6rem;
  &:link {
    color: white;
    text-decoration: none;
  }
  &:visited {
    color: white;
    text-decoration: none;
  }
  &:hover {
    color: ${({ href, theme }) => (href ? theme.colors.blue : css`white`)};
    cursor: pointer;
  }
`;
// ====================================================================================

export const SAnimatedDiv = styled.div<Props>`
  animation-duration: 0.5s;
  animation-timing-function: ease-out;
  animation-name: ${fadeIn};
  animation-fill-mode: forwards;
`;

export const SStyledBox = styled(SAnimatedDiv)`
  display: flex;
  flex-direction: column;
  padding: 32px;
  border-radius: 27px;
  background: ${({ theme }) => theme.colors.boxBackground};
  box-shadow: 0px 3px 6px rgba(0, 0, 0, 0.16);
  transition: background-color 300ms ease-out 100ms;
`;

export const SYellowTitleCircle = styled.div`
  width: fit-content;
  padding: 6px 16px;
  border-radius: 35px;
  color: black;
  font-size: 1.6rem;
  background-color: ${({ theme }) => theme.colors.yellow};
`;

export const SBookmark = ({
  isSelected,
  onClick,
  size,
}: {
  isSelected: boolean;
  onClick: Function;
  size: SizeProp;
}) => {
  return (
    <SStyledBookmark isSelected={isSelected}>
      <FontAwesomeIcon
        icon={"bookmark"}
        onClick={(m) => {
          m.stopPropagation();
          onClick();
        }}
        size={size}
      />
    </SStyledBookmark>
  );
};

const SStyledBookmark = styled.div<Props>`
  color: ${({ isSelected, theme }) =>
    isSelected ? theme.colors.blue : "white"};
  cursor: auto;
  transition: color 300ms ease-out 100ms;
  &:hover {
    cursor: pointer;
  }
`;

// ====================================================================================

export const SDivider = styled.div<Props>`
  height: 1px;
  margin: ${({ horizontal, vertical }) => `${vertical} ${horizontal}`};
  background-color: ${(props) => props.theme.colors.gray3};
`;

export const SSizedBox = styled.div<Props>`
  align-self: center;
  width: ${(props) => props.width};
  height: ${(props) => props.height};
`;

export const SExpanded = styled.div<Props>`
  display: flex;
  justify-content: ${(props) => props.justify_content ?? "left"};
  align-items: center;
  flex: ${(props) => props.flex ?? 1};
`;

export const SRow = styled.div<Props>`
  display: flex;
  justify-content: ${({ justify_content }) =>
    justify_content ? justify_content : css`center`};
  align-items: ${({ align_items }) =>
    align_items ? align_items : css`center`};
  width: ${({ width }) => (width ? width : css`100%`)};
  height: ${({ height }) => (height ? height : css`auto`)};
`;

export const SColumn = styled.div<Props>`
  display: flex;
  flex-direction: column;
  justify-content: ${({ justify_content }) =>
    justify_content ? justify_content : css`center`};
  width: ${({ width }) => (width ? width : css`auto`)};
  height: ${({ height }) => (height ? height : css`100%`)};
`;

export const SScrollColumn = styled(SColumn)`
  position: absolute;
  justify-content: flex-start;
  width: 100%;
  height: 100%;
  overflow-y: auto;

  &::-webkit-scrollbar {
    width: 8px;
    border-radius: 6px;
    background: ${(props) => props.theme.colors.gray3};
  }
  &::-webkit-scrollbar-thumb {
    background-color: gray;
    border-radius: 6px;
  }
`;

export const SStyledDimmer = styled.div<Props>`
  display: flex;
  justify-content: center;
  align-items: center;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  padding: 48px;
  background-color: #00000080;
  z-index: 10;
  animation-duration: 0.2s;
  animation-timing-function: ease-out;
  animation-name: ${fadeIn};
  animation-fill-mode: forwards;
`;

// =========================================================================

export const SButton = styled.button<Props>`
  vertical-align: middle;
  width: ${(props) => (props.width ? props.width : null)};
  height: ${(props) => (props.height ? props.height : css`38px`)};
  padding: 0px 24px;
  border-radius: 12px;
  border: 0;
  color: white;
  font-size: 1.6rem;

  background: linear-gradient(#4294f3 0%, #2c62a3 100%);
  transition: background-color 300ms ease-out 100ms;
  &:hover {
    background: linear-gradient(#69a8f0 0%, #5074a1 100%);
  }
`;

export const SIconButton = styled(SButton)`
  vertical-align: middle;
  width: 38px;
  padding: 0px 0px;
  border-radius: 12px;
`;

export const SPressButton = styled(SButton)`
  vertical-align: middle;
  height: 38px;
  padding: ${(props) => (props.width ? "0px" : "0px 16px")};
  margin: 0px 2px;
  border-radius: 12px;
  border: 0;
  background: ${(props) =>
    props.selected
      ? css`linear-gradient(#4294f3 0%, #2c62a3 100%)`
      : css`transparent`};
  color: white;
  &:hover {
    background: ${(props) =>
      props.selected
        ? css`linear-gradient(#69A8F0 0%, #5074A1 100%)`
        : props.theme.colors.gray};
  }
`;

export const SInput = styled.input`
  height: 48px;
  padding: 0px 16px;
  border: 1px solid white;
  border-radius: 25px;
  background-color: ${({ theme }) => theme.colors.gray2};
  font-size: 1.8rem;
  color: white;
  box-sizing: border-box;
  resize: none;
  &:focus {
    outline: transparent;
    border: 3px solid ${({ theme }) => theme.colors.blue};
    box-shadow: 0 0 10px transparent;
  }
`;

export const STextButton = styled.p`
  font-size: 1.6rem;
  text-decoration: inherit;
  color: ${({ theme }) => theme.colors.blue};
  cursor: pointer;
`;

export const SInnerInput = styled.input`
  flex: 1;
  width: auto;

  font-size: 2rem;
  margin-left: 16px;
  border: transparent;
  background: transparent;
  color: white;

  &:focus {
    outline: transparent;
    border: 0px solid transparent;
    box-shadow: 0 0 10px transparent;
  }
`;

// =========================================================================
