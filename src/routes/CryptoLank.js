import axios from "axios";
import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { apiKey,providerUrl } from "../api_config";
import { Divider, Expanded, SizedBox } from "../components/ui/commonUI";
import { getCryptoLank } from "../service/crypto_lank";



export const CryptoLank = () => {
  const sortation = [{ name: '', flex: 1 }, { name: 'Name', flex: 2 }, { name: 'Price', flex: 2 }, { name: 'MarketCap', flex: 3 }, { name: 'Circulating Supply', flex: 4 }, { name: 'Volumn', flex: 3 }, { name: '24Hours' , flex:1}];
  const [cryptoList, setCryptoList] = useState([]);
  const [pageIndex, setPageIndex] = useState(0);
  
useEffect(() => {
  getCryptoLank(0).then(e=>{
    setCryptoList(e);
  });
  }, []); //It is performed when mounted.
  
  return <CryptoLankContainer>
    <SortContainer>
      {sortation.map(({name, flex}) => <Expanded flex={flex} key={name}>{name}</Expanded>)}
    </SortContainer>
    <SizedBox height="16px"/>
    <Divider vertical="0px" horizontal="0px" />
<SizedBox height="8px"/>
    <ElementContainer>
    {cryptoList.map((e, i) => 
      
    (<ElementRow key={e.name}>
      <Expanded flex={sortation[0].flex}>  {i + (pageIndex * 10) + 1}</Expanded>
      <Expanded flex={sortation[1].flex}>  <Icon src={providerUrl + e.imageUrl}/> {e.name}</Expanded>
      <Expanded flex={sortation[2].flex}>{e.price}</Expanded>
      <Expanded flex={sortation[3].flex}>{e.marketCap}</Expanded>
      <Expanded flex={sortation[4].flex}>{e.currentSupply}</Expanded>
      <Expanded flex={sortation[5].flex}>{e.volumn}</Expanded>
      <Expanded flex={sortation[6].flex}>{e.todayChange}</Expanded>
    </ElementRow>)
      )}
    </ElementContainer>
    <PagePagination>1,2,3,4,</PagePagination>
  </CryptoLankContainer>
};


const CryptoLankContainer = styled.div`
display : flex;
flex-direction: column;
flex : 1;
padding : 32px;

border-radius: 27px;
background: #262736;
box-shadow: 0px 3px 6px rgba(0, 0, 0, 0.16);
`;

const SortContainer = styled.div`
display : flex;
font-size:18px;
font-weight:bold;
`;

const ElementContainer = styled.div`
display : flex;
flex-direction: column;
flex : 1;`;

const ElementRow = styled.div`
display :flex;
flex:1;
font-size : 18px;
`;

const Icon = styled.img`
width:48px;
padding-right:4px;
`;

const PagePagination = styled.div`

`;
