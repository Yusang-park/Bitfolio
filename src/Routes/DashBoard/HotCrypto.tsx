import React, { useEffect } from "react";
import styled from "styled-components";
import { SRow, SSizedBox, SStyledBox } from "../../Components/GlobalComponents";
import { GrayText, TitleText } from "../../Components/TransComponants";
import { getTopSearchedCrypto } from "../../Service/Apis";

export const HotCrypto = () => {
  useEffect(() => {
    getTopSearchedCrypto().then((e) => {
      console.log(e);
    });
  }, []);

  return (
    <Wrapper>
      <TitleText>Hot Crypto</TitleText>
      <SSizedBox height="16px" />
      <ArticleContainer>
        <CategoryRow />
      </ArticleContainer>
    </Wrapper>
  );
};

const CategoryRow = () => {
  return (
    <CategoryContainer>
      <GrayText>Name</GrayText>

      <GrayText>Name</GrayText>

      <GrayText>Name</GrayText>
    </CategoryContainer>
  );
};

const CategoryContainer = styled(SRow)`
  justify-content: space-around;
`;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
`;

const ArticleContainer = styled(SStyledBox)`
  flex: 1;
`;
