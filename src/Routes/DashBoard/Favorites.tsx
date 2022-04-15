import React, { useContext, useState } from "react";
import { useEffect } from "react";

import { useHistory } from "react-router";
import styled from "styled-components";
import {
  SStyledBox,
  SGrayText,
  SSubTitleText,
  SSizedBox,
} from "../../Components/GlobalComponents";
import { BoldText, TitleText } from "../../Components/TransComponants";
import { UserContext } from "../../Provider/UserProvider";
import { getCryptoPricesList } from "../../Service/Apis";

export const Favorite = () => {
  const history = useHistory();
  const [prices, setPrices] = useState<{ [key: string]: any }>({});
  const {
    favorites,
    isLoggedIn,
  }: { favorites: { [key: string]: any }; isLoggedIn: boolean } =
    useContext(UserContext);

  useEffect(() => {
    if (Object.keys(favorites).length !== 0) {
      getCryptoPricesList(Object.keys(favorites)).then((response) => {
        setPrices(response !== null ? response : {});
      });
    }
  }, [favorites]);

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
      <TitleText>Favorites</TitleText>
      <SSizedBox height="16px" />
      <Container>
        <ScrollRow>
          {Object.keys(favorites).length !== 0 ? (
            Object.keys(favorites).map((e, i) => (
              <span key={i} onClick={() => routeDetails(e)}>
                <ElementContainer>
                  <Logo src={favorites[e].imageUrl.toString()} />
                  <div>
                    <CryptoName>{favorites[e].fullName}</CryptoName>
                    <SSizedBox height="4px" />
                    {Object.keys(prices).includes(e) && (
                      <SGrayText>{`$${prices[e].usd}`}</SGrayText>
                    )}
                  </div>
                </ElementContainer>
              </span>
            ))
          ) : (
            <EmptyWapper>
              <BoldText>
                {isLoggedIn
                  ? "Add to favorites!"
                  : "Login to use this feature!"}
              </BoldText>
            </EmptyWapper>
          )}
        </ScrollRow>
      </Container>
    </Wrapper>
  );
};
const Wrapper = styled.div`
  height: auto;
  min-height: 272px;

  ${({ theme }) => theme.device.tablet} {
    height: 400px;
  }
`;

const CryptoName = styled(SSubTitleText)``;

const Container = styled.div`
  position: sticky;
  width: 100%;
  height: 100%;
`;

const ScrollRow = styled.div`
  position: absolute;
  width: 100%;
  display: flex;
  overflow-x: scroll;
  padding-bottom: 16px;
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

const EmptyWapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 13vh;
  margin: 24px;
`;

const Logo = styled.img`
  width: 7.5vh;
  border-radius: 50px;
  transition: width 300ms ease-out 100ms;
`;

const ElementContainer = styled(SStyledBox)`
  align-items: space-around;
  justify-content: space-between;
  width: 13vh;
  height: 13vh;
  margin-right: 32px;
  padding: 24px;

  &:hover {
    background-color: grey;
    cursor: pointer;
  }
  &:hover ${SGrayText} {
    color: white;
  }
  &:hover ${Logo} {
    width: 6.5vh;
  }
`;
