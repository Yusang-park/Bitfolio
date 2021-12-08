import React, { useState } from "react";
import styled from "styled-components";
import { SStyledBox, STitleText } from "../Components/GlobalComponents";
import ReactSpeedometer from "react-d3-speedometer"
export const Indexes = () => {
  return <FeatIndexContainer>
    <STitleText>Fear and Greed Index</STitleText>
    <Container>
<ReactSpeedometer
    value={10}
    
    fluidWidth={true}
    needleTransitionDuration={2000}
    currentValueText=""
    customSegmentLabels={[
      {
        text: "Very Fear",
        position: "INSIDE",
        color: "#555",
      },
      {
        text: "Fear",
        position: "INSIDE",
        color: "#555",
      },
      {
        text: "Neutrality",
        position: "INSIDE",
        color: "#555",
        fontSize: "19px",
      },
      {
        text: "Greed",
        position: "INSIDE",
        color: "#555",
      },
      {
        text: "Very Greed",
        position: "INSIDE",
        color: "#555",
      },
    ]}
  />
  </Container>
  </FeatIndexContainer>;

};

const FeatIndexContainer = styled(SStyledBox)`
width : 50%;
${({ theme }) => theme.device.tablet} {
    width: auto;
    height: 80vh;
    padding: 24px;
    margin-bottom: 32px;
  }
  ${({ theme }) => theme.device.mobile} {
    padding: 16px;
    margin-bottom: 24px;
  }
`;
const Container = styled.div`

height: 100%;
`