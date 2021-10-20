import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import { categories } from "../../routes/categories";
import styled from "styled-components";
import { Expanded, SizedBox,Button } from "../ui/commonUI";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { SearchInput } from "../searchInput/SearchInput";

export const UpperSpace = () => {
  const pathName = useLocation().pathname;
  
  function getName() {
    return categories.find(c => c.path === pathName).name;
  }
  
  return <UpperContainer>
    <TitleText >
    {getName()}
    </TitleText>
    <SearchInput/>
    <SizedBox width="32px"/> 
    
    <DropDownContaier>Pitter Park

      <FontAwesomeIcon icon="chevron-down" size="1x" color="white"/>
    </DropDownContaier>
  </UpperContainer>;
};


const TitleText = styled.div`
display: flex;
flex:1;
align-items: center;
height: 100%;
`;




const UpperContainer = styled.div`

  display : flex;
  align-items:center;
  justify-content:space-between;
  width : 100%;
  max-height:64px;
  min-height:42px;
  padding-bottom:32px;
  font-size : 26px;
`;

const DropDownContaier = styled.div`
  display : flex;
  justify-content:space-between;
  align-items:center;
  width: 16%;
  height: 100%;
  max-height:64px;
  min-height:42px;
  border-radius: 21px;
  border : 1px solid gray;
  padding-left : 32px;
  padding-right:32px;
  font-size:20px;
  background: #2b2a37;
  `;