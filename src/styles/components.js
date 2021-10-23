import styled, { css } from "styled-components";

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

export const Button = styled.button`
  vertical-align: middle;
  width: ${(props) => (props.width ? props.width : null)};
  height: 38px;
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

export const FixedSizeButton = styled(Button)`
  vertical-align: middle;
  width: 38px;
  padding: 0px 0px;
  border-radius: 12px;
`;

export const PercentText = styled.div`
  color: ${({ theme, negative }) =>
    negative ? theme.colors.negative : theme.colors.positive};
`;
export const Row = styled.div`
  display: flex;
  justify-content: space-between;
  height: 100%;
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
