import React, { useEffect, useState, lazy } from "react";
import { useHistory } from "react-router-dom";
import styled from "styled-components";
import {
  SSizedBox,
  SStyledBox,
  SText,
  InnerBox,
  SGrayText,
} from "../../Components/GlobalComponents";
import { IconSize } from "../../Components/Icon";
import { ProgressIndicator } from "../../Components/ProgressIndicator/ProgressIndicator";
import { TitleText } from "../../Components/TransComponants";
import { CryptoSummaryData } from "../../Model/Models";
import { getTopSearchedCrypto } from "../../Service/Apis";

const Icon = lazy(() => import("../../Components/Icon"));

export const HotCrypto = () => {
  const history = useHistory();
  const [data, setData] = useState<Array<CryptoSummaryData>>([]);
  useEffect(() => {
    getTopSearchedCrypto().then((e) => {
      if (e !== null) setData(e);
    });
  }, []);

  function routeDetails(id: string) {
    history.push({
      pathname: `/details/${id}`,
      state: {
        id: id,
      },
    });
  }

  return (
    <Wrapper>
      <TitleText>Hot Crypto🔥</TitleText>
      <SSizedBox height="16px" />
      <ArticleContainer>
        {data.length === 0 ? (
          <ProgressIndicator />
        ) : (
          <GridContainer>
            {data.map((e) => (
              <ContentContainer
                key={e.id}
                onClick={() => {
                  routeDetails(e.id);
                }}
              >
                <Icon
                  src={e.imageUrl}
                  name={e.fullName}
                  size={IconSize.Small}
                />

                <TextBox>
                  <NameText>{e.fullName}</NameText>
                  <SGrayText>{e.symbol}</SGrayText>
                </TextBox>
              </ContentContainer>
            ))}
          </GridContainer>
        )}
      </ArticleContainer>
    </Wrapper>
  );
};

const TextBox = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const ContentContainer = styled(InnerBox)`
  display: flex;

  justify-content: space-evenly;
  align-items: center;
  min-height: 130px;
  margin: 0px;
  padding: 8px 8px;
  transition: background-color 300ms ease-out 100ms;
  cursor: pointer;

  &:hover {
    background-color: ${({ theme }) => theme.colors.gray};
  }
  &:hover ${SGrayText} {
    color: white;
  }
`;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
`;

const ArticleContainer = styled(SStyledBox)`
  flex: 1;
  /* justify-content: center; */
`;

const GridContainer = styled.div`
  display: grid;

  grid-template-columns: repeat(auto-fill, minmax(16%, 1fr));
  grid-gap: 24px;
`;

const NameText = styled(SText)`
  text-align: center;
`;
