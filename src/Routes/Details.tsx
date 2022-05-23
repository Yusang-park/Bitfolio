import React, { useState, createContext, useEffect } from "react";
import styled from "styled-components";
import { getCryptoDetails } from "../Service/Apis";

import { SSizedBox, SStyledBox } from "../Components/GlobalComponents";

import { ProgressIndicator } from "../Components/ProgressIndicator/ProgressIndicator";

import { DetailsHeader } from "./Details/DetailsHeader";
import Chat from "./Chat/Chat";
import { DetailArticle } from "./Details/DetailsArticle";

import { useParams } from "react-router-dom";

export const CryptoDataContext = createContext({
  data: null,
});

const Details = (props: any) => {
  const { id } = useParams<{ id: string }>(); //useLocation().state

  const [data, setData] = useState<any>(null);

  useEffect(() => {
    getCryptoDetails(id).then((response: any) => {
      setData(response);
    });
  }, [id, setData]);

  return data === null ? (
    <Center>
      <ProgressIndicator />
    </Center>
  ) : (
    <CryptoDataContext.Provider value={{ data: data }}>
      <DetailContainer>
        <DetailsHeader />
        <DetailArticle />
      </DetailContainer>
      <SSizedBox width="32px" />
      <Chat key={data.id} cryptoId={data.id} fullName={data.fullName} />
    </CryptoDataContext.Provider>
  );
};

export default Details;

const Center = styled.div`
  margin: auto;
`;

const DetailContainer = styled(SStyledBox)`
  width: 50vw;

  ${({ theme }) => theme.device.tablet} {
    width: auto;
    height: 80vh;
    padding: 24px;
    margin-bottom: 32px;
  }
  ${({ theme }) => theme.device.mobile} {
    margin-bottom: 24px;
  }
`;
