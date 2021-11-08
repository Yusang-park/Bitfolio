
import React, { useContext, useState } from "react";
import { useEffect } from 'react';
import { useRef } from 'react';
import { useHistory } from 'react-router';
import styled from "styled-components";
import { UserContext } from '../../provider/userProvider';
import { getCryptoPricesList } from '../../service/apis';
import { Row, BoxStyle, TitleText, SizedBox, GrayText, SubTitleText } from '../global-components';

export const Favorite = () => {
  const history = useHistory();
  const [prices, setPrices] = useState({});
  const { favorites } = useContext(UserContext);

  useEffect(() => {
    if (Object.keys(favorites).length !== 0) {
      getCryptoPricesList(Object.keys(favorites)).then((response) => {
    
        setPrices(response);
      });
    }
  }, [favorites])
  
 
  function routeDetails(id) {
    history.push({
      pathname: `/details/${id}`,
      state: {
        id: id,
      },
    });
  }
 
    return (
       <>
        <TitleText>Favorites</TitleText>
        <SizedBox height="16px"/>
        <ScrollRow>
          {Object.keys(favorites).length !== 0 ?
          
              Object.keys(favorites).map((e, i) => (
                <span key={i} onClick={()=>routeDetails(e)}><ElementContainer>
                  <Logo src={favorites[e].imageUrl} />
                  <div>
                    <SubTitleText>{favorites[e].fullName}</SubTitleText>
                    <SizedBox height="4px"/>
                {Object.keys(prices).includes(e)&&
                  <GrayText>{`$${prices[e].usd}`}</GrayText>}</div>
                </ElementContainer></span>
              ))
             : 
           <EmptyWapper>Add to favorites!</EmptyWapper>
            }
            </ScrollRow></>)
}


const ScrollRow = styled.div`
display:flex;
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
  width:100%;
  height:9vh;
  margin : 24px;
  font-weight: bold;
`;

const Logo = styled.img`
width:4.5vh;
border-radius:50px;
transition: width 300ms ease-out 100ms;
`;

const ElementContainer = styled(BoxStyle)`
align-items:space-around;
justify-content: space-between;
width:9vh;
height:9vh;
margin-right:32px;
padding:24px;

&:hover{
  background-color: grey;
  cursor: pointer
}
  &:hover ${GrayText} {
    color: white;
  }
  &:hover ${Logo}{
  width:5vh;
}
`;
