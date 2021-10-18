import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import { categories } from "../../routes/categories";
import styled from "styled-components";

export const UpperSpace = () => {
  const pathName = useLocation().pathname;
  
  function getName() {
    return categories.find(c => c.path === pathName).name;
  }
  
  return <UpperContainer>
    <Expanded flex="1">
    {getName()}
    </Expanded>
    <SeachContainer placeholder="Seach">
<Input placeholder="Search"></Input>
<Button ><img src="img/ico_search.png"></img></Button>
    </SeachContainer>
    <SizedBox width="32px" />
    <DropDownContaier>Pitter Park

      <img src="img/ico_w.arrow_nor.png"></img>
    </DropDownContaier>
  </UpperContainer>;
};

const Expanded = styled.div`
  flex: ${(props)=>props.flex};
`;

const SizedBox = styled.div`
width : ${(props)=>props.width}`;

const UpperContainer = styled.div`
  display : flex;
  align-items:center;
  justify-content:space-between;
  width : 100%;
  height : 79px;
  padding-bottom:39px;
  font-size : 32px;
`;

const SeachContainer = styled.div`
  display : flex;
  justify-content:space-between;
  align-items:center;
  width: 20%;
  height : 75%;
  border-radius: 21px;
  padding-left : 32px;
  padding-right:32px;
  
  background: #2b2a37;
  `;
  
  const Input = styled.input`
  width: calc(100% - 72px);
  font-size : 28px;
  border : transparent;
  background: transparent;
  color: white;

 &:focus {
    outline: transparent;
    border:0px solid transparent;
    box-shadow: 0 0 10px transparent;
  }
`;

const Button = styled.button`
width: 47px;
height: 47px;
vertical-align : middle;
border-radius: 12px;
border : 0;
background: linear-gradient(#4294f3 0%, #2c62a3 100%);

`;

const DropDownContaier = styled.div`
  display : flex;
  justify-content:space-between;
  align-items:center;
  width: 16%;
  height : 75%;
  border-radius: 21px;
  border : 1px solid gray;
  padding-left : 32px;
  padding-right:32px;
  font-size:1.5rem;
  background: #2b2a37;
  `;