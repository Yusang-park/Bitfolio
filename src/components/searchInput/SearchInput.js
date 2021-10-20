import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState } from "react";
import styled from "styled-components";
import { Button } from "../ui/commonUI";


export const SearchInput = () => {
    
    return (
        <SeachContainer placeholder="Seach">
<Input placeholder="Search"></Input>
<Button ><FontAwesomeIcon icon="search" size="1x" color="white" /></Button>
    </SeachContainer>
    )
}

const SeachContainer = styled.div`
  display : flex;
  justify-content:space-between;
  align-items:center;
  width: 20%;
  height: 100%;
  max-height:64px;
  min-height:42px;
  border-radius: 21px;
  padding-left : 32px;
  padding-right:32px;
  
  background: #2b2a37;
  `;
  
  const Input = styled.input`
  width: calc(100% - 72px);
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


