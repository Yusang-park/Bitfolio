import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import styled, { css } from "styled-components";
import { fadeIn } from "../styles/animation";
// ====================================================================================
export const TitleText = styled.div`
  font-size: 26px;
`;

export const BoldTitleText = styled.div`
  font-size: 26px;
  font-weight: bold;
`;

export const GrayText = styled.div`
  color: ${(props) => props.theme.colors.gray};
`;

export const PercentText = styled.div`
  color: ${({ theme, negative }) =>
    negative ? theme.colors.negative : theme.colors.positive};
`;
// ====================================================================================

export const AnimatedDiv = styled.div`
  animation-duration: 0.5s;
  animation-timing-function: ease-out;
  animation-name: ${fadeIn};
  animation-fill-mode: forwards;
`;

export const BoxStyle = styled(AnimatedDiv)`
  display: flex;
  flex-direction: column;
  padding: 32px 32px 32px 32px;
  border-radius: 27px;
  background: ${({ theme }) => theme.colors.boxBackground};
  box-shadow: 0px 3px 6px rgba(0, 0, 0, 0.16);
`;

export const YellowTitleCircle = styled.div`
  padding: 6px 16px;
  border-radius: 35px;
  margin-left: auto;
  margin-right: auto;
  margin-bottom: 16px;
  background-color: ${({ theme }) => theme.colors.yellow};
  color: black;
`;

export const Bookmark = ({ isSelected, onClick, size }) => {
  return (
    <BookmarkStyle isSelected={isSelected}>
      <FontAwesomeIcon
        icon={"bookmark"}
        onClick={(m) => m.stopPropagation(onClick())}
        size={size}
      />
    </BookmarkStyle>
  );
};

const BookmarkStyle = styled.div`
  color: ${({ isSelected, theme }) =>
    isSelected ? theme.colors.blue : "white"};
  cursor: grab;

  &:hover {
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

// =========================================================================

export const Button = styled.button`
  vertical-align: middle;
  width: ${(props) => (props.width ? props.width : null)};
  height: ${(props) => (props.height ? props.height : css`38px`)};
  padding: 0px 24px;
  border-radius: 12px;
  border: 0;
  color: white;
  font-size: 16px;

  background: linear-gradient(#4294f3 0%, #2c62a3 100%);

  &:hover {
    background: linear-gradient(#69a8f0 0%, #5074a1 100%);
  }
`;

export const NonPaddingButton = styled(Button)`
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
