import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { SpeedMeter } from "../../Components/Speedmeter/Speedmeter";
import { Text, TitleText } from "../../Components/TransComponants";
import { getFearAndGreedIndex } from "../../Service/Apis";

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

const FearGreedIndex = () => {
  const [fearIndex, setFearIndex] = useState<number | null>(null);

  useEffect(() => {
    getFearAndGreedIndex().then((e: any) => {
      setFearIndex(e);
    });
  }, []);

  function getTitle(): string {
    if (fearIndex !== null) {
      let level = Math.floor(fearIndex! / 20);
      return fearIndexTitle[level];
    }
    return "";
  }

  function getDescription() {
    if (fearIndex !== null) {
      let level = Math.floor(fearIndex! / 20);
      return fearIndexDescriptions[level];
    }
  }

  return (
    <Wrapper>
      <TitleText>Fear and Greed Index</TitleText>
      <Container>
        <SpeedMeter level={getTitle()} index={fearIndex} />
      </Container>

      <br />
      <Text>{getDescription()}</Text>
    </Wrapper>
  );
};

const Wrapper = styled.div``;

const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;

export default FearGreedIndex;
