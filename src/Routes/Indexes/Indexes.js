import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { SStyledBox } from "../../Components/GlobalComponents";
import ReactSpeedometer from "react-d3-speedometer";
import { getFearAndGreedIndex } from "../../Service/Apis";
import { Text, TitleText } from "../../Components/TransComponants";

const fearIndexDescriptions = [
  "#Very Fear",
  "#Fear",
  "#Neutrality",
  "#Greed",
  "#Very Greed",
];
const fearIndexTitle = [
  "Very Fear",
  "Fear",
  "Neutrality",
  "Greed",
  "Very Greed",
];

export const Indexes = () => {
  const [fearIndex, setFearIndex] = useState(0);

  useEffect(() => {
    getFearAndGreedIndex().then((e) => {
      setFearIndex(e);
    });
  }, []);

  function getTitle() {
    let level = Math.ceil(fearIndex / 5);
    console.log(level);
    return fearIndexTitle[level - 1];
  }

  function getDescription() {
    let level = Math.ceil(fearIndex / 5);
    console.log(level);
    return fearIndexDescriptions[level - 1];
  }

  return (
    <FeatIndexContainer>
      <TitleText>Fear and Greed Index</TitleText>
      <Container>
        <ReactSpeedometer
          value={fearIndex * 10}
          fluidWidth={true}
          currentValueText={`Index : ${(fearIndex * 10) / 10}`}
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
      <TitleText>{getTitle()}</TitleText>
      <br />
      <Text>{getDescription()}</Text>
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
  height: 30%;
`;
