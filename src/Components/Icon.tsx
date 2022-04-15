import React from "react";
import styled, { css } from "styled-components";

export enum IconSize {
  Small,
  Large,
}

const Icon = ({
  size = IconSize.Small,
  src,
  name,
}: {
  size?: IconSize;
  src: string;
  name: string;
}) => {
  return (
    <span>
      <Image src={src} iconSize={size} />
    </span>
  );
};

export default Icon;

const Image = styled.img.attrs({ alt: "Logo" })`
  width: ${({ iconSize }: { iconSize: IconSize }) =>
    iconSize === IconSize.Small ? css`42px` : css`50px`};
  height: ${({ iconSize }: { iconSize: IconSize }) =>
    iconSize === IconSize.Small ? css`42px` : css`50px`};

  border-radius: 50px;
  ${({ theme }) => theme.device.tablet} {
    width: 28px;
    height: 28px;
  }
`;
