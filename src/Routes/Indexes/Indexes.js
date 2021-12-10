import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { SStyledBox } from "../../Components/GlobalComponents";
import ReactSpeedometer from "react-d3-speedometer";
import { getFearAndGreedIndex } from "../../Service/Apis";
import { Text, TitleText } from "../../Components/TransComponants";

const fearIndexDescriptions = [
  "#Extreme Fear",
  "#Fear",
  "#Neutrality",
  "#Greed",
  "#Very Greed",
];
const fearIndexTitle = [
  "Extreme Fear",
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
    let level = Math.floor(fearIndex / 20);
    return fearIndexTitle[level];
  }

  function getDescription() {
    let level = Math.floor(fearIndex / 20);
    return fearIndexDescriptions[level];
  }

  return (
    <Wrapper>
      <TitleText>Fear and Greed Index</TitleText>
      <Container>
        <ReactSpeedometer
          maxValue={100}
          minValue={0}
          value={fearIndex}
          fluidWidth={true}
          currentValueText={`Index : ${fearIndex}`}
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
    </Wrapper>
  );
};

const Wrapper = styled(SStyledBox)`
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
  max-width: 600px;
`;
