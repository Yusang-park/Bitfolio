import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import styled, { css } from "styled-components";
import { fadeIn } from "../Styles/Animation";
// ====================================================================================
export const TitleText = styled.div`
  font-size: 2.6rem;
`;

export const BoldTitleText = styled.div`
  font-size: 2.6rem;
  font-weight: bold;
`;

export const SubTitleText = styled.div`
  font-size: 1.8rem;
`;

export const GrayText = styled.div`
  font-size: 1.6rem;
  transition: color 300ms ease-out 100ms;
  color: ${(props) => props.theme.colors.gray};
`;

export const PercentText = styled.div`
  font-size: 1.6rem;
  color: ${({ theme, negative }) =>
    negative ? theme.colors.negative : theme.colors.positive};
`;

export const Text = styled.p`
  font-size: 1.6rem;
`;
// ====================================================================================

export const AnimatedDiv = styled.div`
  animation-duration: 0.5s;
  animation-timing-function: ease-out;
  animation-name: ${fadeIn};
  animation-fill-mode: forwards;
`;

export const StyledBox = styled(AnimatedDiv)`
  display: flex;
  flex-direction: column;
  padding: 32px;
  border-radius: 27px;
  background: ${({ theme }) => theme.colors.boxBackground};
  box-shadow: 0px 3px 6px rgba(0, 0, 0, 0.16);
  transition: background-color 300ms ease-out 100ms;
`;

export const YellowTitleCircle = styled.div`
  margin-left: auto;
  margin-right: auto;
  margin-bottom: 16px;
  padding: 6px 16px;
  border-radius: 35px;
  color: black;
  font-size: 1.6rem;
  background-color: ${({ theme }) => theme.colors.yellow};
`;

export const Bookmark = ({ isSelected, onClick, size }) => {
  return (
    <StyledBookmark isSelected={isSelected}>
      <FontAwesomeIcon
        icon={"bookmark"}
        onClick={(m) => m.stopPropagation(onClick())}
        size={size}
      />
    </StyledBookmark>
  );
};

const StyledBookmark = styled.div`
  color: ${({ isSelected, theme }) =>
    isSelected ? theme.colors.blue : "white"};
  cursor: auto;
  transition: color 300ms ease-out 100ms;
  &:hover {
    cursor: pointer;
  }
`;

// ====================================================================================

export const Divider = styled.div`
  height: 1px;
  margin: ${({ horizontal, vertical }) => `${vertical} ${horizontal}`};
  background-color: ${(props) => props.theme.colors.gray3};
`;

export const SizedBox = styled.div`
  align-self: center;

  width: ${(props) => props.width};
  height: ${(props) => props.height};
`;

export const Expanded = styled.div`
  display: flex;
  justify-content: ${(props) => props.justify_content ?? "left"};
  align-items: center;
  flex: ${(props) => props.flex};
`;

export const Row = styled.div`
  display: flex;
  justify-content: ${({ justify_content }) =>
    justify_content ? justify_content : css`center`};
  align-items: ${({ align_items }) =>
    align_items ? align_items : css`center`};
  width: ${({ width }) => (width ? width : css`100%`)};
  height: ${({ height }) => (height ? height : css`auto`)};
`;

export const Column = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: ${({ justify_content }) =>
    justify_content ? justify_content : css`center`};
  width: ${({ width }) => (width ? width : css`auto`)};
  height: ${({ height }) => (height ? height : css`100%`)};
`;

export const StyledDimmer = styled.div`
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

export const Button = styled.button`
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

export const IconButton = styled(Button)`
  vertical-align: middle;
  width: 38px;
  padding: 0px 0px;
  border-radius: 12px;
`;

export const ATag = styled(Button)`
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

// =========================================================================
