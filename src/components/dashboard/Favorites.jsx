
import React, { useContext, useState } from "react";
import { useEffect } from 'react';
import { useRef } from 'react';
import styled from "styled-components";
import { UserContext } from '../../provider/userProvider';
import { getCryptoPricesList } from '../../service/apis';
import { Row, BoxStyle, TitleText, SizedBox } from '../global-components';

export const Favorite = () => {

  const [prices, setPrices] = useState({});
  const { favorites } = useContext(UserContext);

  useEffect(() => {
    getCryptoPricesList(Object.keys(favorites)).then((response) => {
    
      setPrices(response);
    });
},[favorites])
 getCryptoPricesList(Object.keys(favorites))
    return (
       <>
        <TitleText>Favorites</TitleText>
        <SizedBox height="16px"/>
        <ScrollRow>
          {Object.keys(favorites).length !== 0 ?
          
              Object.keys(favorites).map((e, i) => (
                <span key={i}><ElementContainer>
                
                  <p>{e}</p>
                {Object.keys(prices).includes(e)&&
                  <p>{`$${prices[e].usd}`}</p>}
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
  height:8vh;
  margin : 32px;
  font-weight: bold;
`;

const ElementContainer = styled(BoxStyle)`
width:8vh;
height:8vh;
margin-right:32px;
`;