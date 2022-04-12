import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { SStyledBox } from "../../Components/GlobalComponents";
import ReactSpeedometer from "react-d3-speedometer";
import { getFearAndGreedIndex } from "../../Service/Apis";
import { Text, TitleText } from "../../Components/TransComponants";
import { SpeedMeter } from "../../Components/Speedmeter/Speedmeter";

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

const Indexes = () => {
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
  display: flex;
  align-items: center;
  justify-content: center;
`;

export default Indexes;
