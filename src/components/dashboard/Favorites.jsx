
import React, { useContext, useState } from "react";
import { useEffect } from 'react';
import { useRef } from 'react';
import styled from "styled-components";
import { UserContext } from '../../provider/userProvider';
import { Row, BoxStyle, TitleText, SizedBox } from '../global-components';

export const Favorite = () => {



    const { favorites } = useContext(UserContext);
    return (
       <>
        <TitleText>Favorites</TitleText>
        <SizedBox height="16px"/>
        <ScrollRow>
          {Object.keys(favorites).map((e, i) => (
            <span key={i}><ElementContainer>{e}</ElementContainer></span>
        ))}
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


// const ElementBox = styled(BoxStyle)`
// margin-right: 32px;
// `;

const ElementContainer = styled(BoxStyle)`
width:8vh;
height:8vh;
margin-right:32px;
`;