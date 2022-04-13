import React from "react";
import styled from "styled-components";

enum IconSize {
  Small,
  Large,
  Middle,
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
      {" "}
      <Image src={src} alt={name} />
    </span>
  );
};

export default Icon;

const Image = styled.img`
  width: 42px;
  height: 42px;
  margin-right: 16px;
  border-radius: 50px;
  ${({ theme }) => theme.device.tablet} {
    width: 28px;
    height: 28px;
  }
`;
