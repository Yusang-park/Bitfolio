import React, { useState } from "react";
import { useEffect } from "react/cjs/react.development";
import styled from "styled-components";
import { fadeIn } from "../styles/animation";
import { Row, SizedBox } from "../styles/components";

export const Details = () => {
    useEffect(() => {


     }, []);


    return (<Row>
        <DetailsContainer></DetailsContainer>
        <SizedBox width="32px"/>
        <BoardContainer> </BoardContainer>
    </Row>
    )
}




const DetailsContainer = styled.div`
    flex: 5;
    padding : 48px;
    border-radius: 25px;
    background-color : ${({ theme }) => theme.colors.boxBackground};
      animation-duration: 0.5s;
      animation-timing-function: ease-out;
        animation-name: ${fadeIn};
    animation-fill-mode: forwards;
    `;


const BoardContainer = styled.div`
    flex:2;     
    padding : 32px 32px 16px 32px;
    border-radius: 25px;
    background-color : ${({ theme }) => theme.colors.boxBackground};
    animation-duration: 0.5s;
    animation-timing-function: ease-out;
    animation-name: ${fadeIn};
    animation-fill-mode: forwards;
`;