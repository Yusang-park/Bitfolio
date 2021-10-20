import axios from "axios";
import React, { useState, useEffect } from "react";
import styled, {keyframes} from "styled-components";
import { apiKey,providerUrl } from "../api_config";
import { Button, Divider, Expanded, SizedBox, ATag } from "../components/ui/commonUI";
import { getCryptoLank } from "../service/crypto_lank";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { ProgressIndicator } from "../components/progressIndicator/progressIndicator";


const maxPage = 179;


export const CryptoLank = () => {
  const sortation = [{ name: '', flex: 1 },{ name: 'Name', flex: 4 }, { name: 'Symbol', flex: 7  }, { name: 'Price', flex: 5 }, { name: 'MarketCap', flex: 9 }, { name: 'Circulating Supply', flex: 9 }, { name: 'Volumn', flex:9 }, { name: '24Hours' , flex:5}];
  const [cryptoList, setCryptoList] = useState([]);
  const [pageIndex, setPageIndex] = useState(1);
  const [pageSectionIndex, setPageSectionIndex] = useState(0);
  
  
useEffect(() => {
  getCryptoLank(pageIndex).then(e=>{
   
    setCryptoList(e);
  });
}, [pageIndex]); //It is performed when mounted.
  
  
  function changePageIndex(e) {
    if (e.target.id != pageIndex) {
      setCryptoList(cryptoList.filter(e => false));
      setPageIndex(e.target.id);
    }
  }
  
  function prevPagePagination(e) {
    if(pageSectionIndex != 0)
    setPageSectionIndex(pageSectionIndex - 1);
  }
  function nextPagePagination(e) {
    if(pageSectionIndex != maxPage)
    setPageSectionIndex(pageSectionIndex + 1);
  }
  
  return <CryptoLankContainer>
    
    <SortContainer>
      {sortation.map(({name, flex}, i) => <Expanded justify_content="right" flex={flex} key={i}>{name}</Expanded>)}
    </SortContainer>
    <SizedBox height="16px"/>
    <Divider vertical="0px" horizontal="0px" />

    
      <ElementContainer>
        
      {cryptoList.length != 0 ?
      cryptoList.map((e, i) =>
        (
          <ElementRow key={i}>
            <SizedBox width="2%" ><SymbolText> {i + ((pageIndex - 1) * 10) + 1}</SymbolText></SizedBox>
            <Expanded justify_content="right" flex={sortation[1].flex}>  <Icon src={e.imageUrl}/> </Expanded>
            <Expanded justify_content="space-between" flex={sortation[2].flex}>{e.fullName } <SymbolText> {e.name.toUpperCase()}</SymbolText> </Expanded>
            <Expanded justify_content="right" flex={sortation[3].flex}>{'$' + e.price.toLocaleString()}</Expanded>
            <Expanded justify_content="right" flex={sortation[4].flex}>{'$' + e.marketCap.toLocaleString()}</Expanded>
            <Expanded justify_content="right" flex={sortation[5].flex}>{e.currentSupply.toLocaleString()}</Expanded>
            <Expanded justify_content="right" flex={sortation[6].flex}>{'$' + e.volumn.toLocaleString()}</Expanded>
            <Expanded justify_content="right" flex={sortation[7].flex}><PercentText negative={e.todayChange.includes('-')}>{e.todayChange}</PercentText></Expanded>
          </ElementRow>
        )
        ) : <ProgressIndicator/>}
      </ElementContainer>
  <SizedBox height="16px"/>  
    <PagePagination>
      <a onClick={prevPagePagination}>
<FontAwesomeIcon icon="chevron-left" size="1x" color="white"/></a>
  <SizedBox width="16px"/>  
      {[...Array(10)].map((n, index) => 
        (<ATag key={index} selected={index+1 + pageSectionIndex*10 == pageIndex} id={index+1 + pageSectionIndex*10} onClick={changePageIndex}> {index+1+ pageSectionIndex*10}</ATag>)
      )}
      <SizedBox width="16px" />
           <a onClick={nextPagePagination}>
<FontAwesomeIcon icon="chevron-right" size="1x" color="white"/></a>
    </PagePagination>
  </CryptoLankContainer>
};


const fadeIn = keyframes`
  0% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
`;

const fadeOut = keyframes`
  0% {
    opacity: 1;
  }
  100% {
    opacity: 0;
  }
`;


const CryptoLankContainer = styled.div`
  display : flex;
  flex-direction: column;
  flex : 1;
  padding : 32px 32px 16px 32px;

  border-radius: 27px;
  background: #262736;
  box-shadow: 0px 3px 6px rgba(0, 0, 0, 0.16);

  animation-duration: 0.5s;
  animation-timing-function: ease-out;
  animation-name: ${fadeIn};
  animation-fill-mode: forwards;
`;

const SortContainer = styled.div`
  display : flex;
  font-size:14px;
  font-weight:bold;
`;

const ElementContainer = styled.div`
  display : flex;
  flex : 1;
  flex-direction: column;
  justify-content: center;
`;

const Icon = styled.img`
  width:36px;
  padding-right:16px;
`;

const PagePagination = styled.div`
  display : flex;
  justify-content : center;
  align-items : center;
`;

const SymbolText = styled.div`
  padding-left:8px;
  color:${(props)=> props.theme.colors.gray}
`;


const PercentText = styled.div`
  color : ${({theme, negative})=>negative ? theme.colors.negative : theme.colors.positive}
`;

const ElementRow = styled.div`
  display :flex;
  flex:1;
  font-size : 16px;
  padding : 2px 0px;
  animation-duration: 0.5s;
  animation-timing-function: ease-out;
  animation-name: ${fadeIn};
  animation-fill-mode: forwards;
  cursor: pointer;
  &:hover {
    background-color:gray;
  }

  &:hover  ${SymbolText}{
    color : white;
}`;
