import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { SStyledBox, STitleText } from "../../Components/GlobalComponents";
import ReactSpeedometer from "react-d3-speedometer";
import { getFearAndGreedIndex } from "../../Service/Apis";
export const Indexes = () => {
  const [fearIndex, setFearIndex] = useState(0);
  useEffect(() => {
    getFearAndGreedIndex().then((e) => {
      setFearIndex(e * 10);
    });
  }, []);

  return (
    <FeatIndexContainer>
      <STitleText>Fear and Greed Index</STitleText>
      <Container>
        <ReactSpeedometer
          value={fearIndex}
          fluidWidth={true}
          currentValueText={`Index : ${fearIndex / 10}`}
          needleTransitionDuration={2000}
          needleColor="grey"
          startColor="skyblue"
          endColor="red"
          customSegmentLabels={[
            {
              text: "Very Fear",
              position: "INSIDE",
              color: "white",
              fontSize: "12",
            },
            {
              text: "Fear",
              position: "INSIDE",
              color: "white",
              fontSize: "12",
            },
            {
              text: "Neutrality",
              position: "INSIDE",
              color: "white",
              fontSize: "12",
            },
            {
              text: "Greed",
              position: "INSIDE",
              color: "white",
              fontSize: "12",
            },
            {
              text: "Very Greed",
              position: "INSIDE",
              color: "white",
              fontSize: "12",
            },
          ]}
        />
      </Container>
    </FeatIndexContainer>
  );
};

const FeatIndexContainer = styled(SStyledBox)`
  width: 50%;
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
`;
