import React, { useContext } from "react";
import { useTranslation } from "react-i18next";
import { CryptoDataContext } from "../Details";
import styled from "styled-components";
import { SScrollColumn } from "../../Components/GlobalComponents";

export const DetailsDescription = () => {
  const { data }: { data: any } = useContext(CryptoDataContext);
  const { i18n } = useTranslation();
  return (
    <Wrapper>
      <SScrollColumn>
        <Description
          dangerouslySetInnerHTML={{
            __html:
              data.description.hasOwnProperty(i18n.language) &&
              data.description[i18n.language] !== ""
                ? data.description[i18n.language]
                : data.description["en"],
          }}
        ></Description>
      </SScrollColumn>
    </Wrapper>
  );
};
const Wrapper = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
`;

const Description = styled.p`
  color: beige;
  font-size: 1.6rem;
  word-spacing: 1px;
  letter-spacing: 1px;
  line-height: 1.5;

  a {
    font-size: 1.6rem;
    &:link {
      color: ${({ theme }) => theme.colors.blue};
      text-decoration: none;
    }
    &:visited {
      color: ${({ theme }) => theme.colors.blue};
      text-decoration: none;
    }
    &:hover {
      color: ${({ theme }) => theme.colors.blue};
      cursor: pointer;
    }
  }
`;
