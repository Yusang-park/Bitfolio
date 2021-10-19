import React, { useState } from "react";
import styled from "styled-components";

export const CryptoLank = () => {
  const sortation = ['Index', 'Name', 'Price', 'MarketCap', 'Circulating Supply', 'Volumn', '24Hours'];


  return <CryptoLankContainer>
    <SortContainer>
      {sortation.map((e) => <span>{e}</span>)}

    </SortContainer>
  </CryptoLankContainer>
};


const CryptoLankContainer = styled.div`
flex : 1;
padding : 32px;
border-radius: 27px;
background: #262736;
box-shadow: 0px 3px 6px rgba(0, 0, 0, 0.16);
`;

const SortContainer = styled.div`
display : flex;
justify-content:space-around;
font-size:18px;
font-weight:bold;
`;