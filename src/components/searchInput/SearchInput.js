import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState } from "react";
import styled from "styled-components";
import { Button } from "../ui/commonUI";


export const SearchInput = () => {
    
    return (
        <Whole>
        <SeachContainer >
          
                <Input placeholder="Seach" />
                
<Button ><FontAwesomeIcon icon="search" size="1x" color="white" /></Button>
            </SeachContainer>
            <RecommendedContainer>
                <ElementRow>123</ElementRow>
 
            </RecommendedContainer>
            </Whole>
    )
}
const Whole = styled.div`
    flex:1;
    max-width: 26%;
    
`;

const SeachContainer = styled.div`
    display : flex;
    
    justify-content:space-between;
    align-items:center;
    height:6.2vh;
    border-radius: 21px;
    padding-left : 24px;
    padding-right:24px;
    background: ${(props)=>props.theme.colors.gray2};
  `;
  
const Input = styled.input`
    width:calc(100% - 68px);
    padding-right: 16px;
    font-size : 20px;
    border : transparent;
    background: transparent;
    color: white;

    &:focus {
    outline: transparent;
    border:0px solid transparent;
    box-shadow: 0 0 10px transparent;
  }
`;

const RecommendedContainer = styled.div`
    display:flex;
    flex-direction: column;
    position: relative;
    z-index: 1;
    overflow: scroll;
    margin-left: 8%;
    margin-right:8%;
    max-height: 25vh;
 
    background-color: ${(props)=>props.theme.colors.gray2};
    
`;

const ElementRow = styled.div`
    display: flex;
       padding : 12px 12px;
    font-size:20px;
    color : white;

    &:hover{
        background-color: ${(props)=>props.theme.colors.gray};
    }
    
`;