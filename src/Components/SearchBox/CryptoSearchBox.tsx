import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState } from "react";
import styled from "styled-components";
import {
  SIconButton,
  SRow,
  SInnerInput,
  SStyledDimmer,
  Props,
} from "../GlobalComponents";
import { useHistory } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { Button } from "../TransComponants";
import { useAppSelector } from "../../Reducer/RootReducer";

function searchObject(trieTree: any, key: string): any {
  let res: string[] = [];
  let root: any = trieTree;
  try {
    for (let i = 1; i <= key.length; i++) {
      root = root[key.substring(0, i)];
    }
  } catch (e) {
    return [];
  }

  if (root !== undefined) findLastElement(root, res);
  return res;
}

function findLastElement(trieTree: any, res: string[]) {
  if (res.length > 10) return;

  if (trieTree.hasOwnProperty("*key")) {
    res.push(trieTree["*key"] as string);
    if (Object.keys(trieTree).length === 1) {
      return;
    }
  }
  for (const [k, v] of Object.entries(trieTree)) {
    if (k !== "*key") findLastElement(v, res);
  }
}

export const CryptoSearchBox = ({ onSelected }: { onSelected?: Function }) => {
  const cryptoList = useAppSelector(
    (state) => state.cryptoDataReducer.cryptoList
  );

  const [inputText, setInputText] = useState("");
  const [recommandedKeyword, setRecommendedKeyword] = useState<Array<any>>([]);
  const [isPopUp, setPopUp] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const history = useHistory();
  const { t } = useTranslation();

  function onChangeInput({ target: { value } }: { target: { value: string } }) {
    setInputText(value);
    let temp = recommandedKeyword.filter((e) => false);
    if (value === "") {
      setRecommendedKeyword(temp);
    } else if (cryptoList != null) {
      temp = temp.concat(searchObject(cryptoList, value.toLowerCase()));
      setRecommendedKeyword(temp);
    }
    setSelectedIndex(0);
  }

  function reset() {
    let temp = recommandedKeyword.filter((e) => false);
    setRecommendedKeyword(temp);
    setSelectedIndex(0);
    setInputText("");
  }

  function onSubmit(id: string) {
    reset();
    if (onSelected) {
      onSelected();
    } else {
      if (isPopUp) onClickPopUp();
      history.replace({
        pathname: `/details/${id}`,
        state: {
          id: id,
        },
      });
    }
  }

  function onClickPopUp() {
    setPopUp(!isPopUp);
    reset();
  }

  function handleKeyPress(e: any) {
    if (e.key === "Enter") {
      let toRemoveFromID = "";
      if (recommandedKeyword[selectedIndex].name.includes("(")) {
        toRemoveFromID = recommandedKeyword[selectedIndex].name
          .split("(")[1]
          .split(")")[0]
          .toLowerCase();
      }
      onSubmit(
        recommandedKeyword[selectedIndex].id
          .split(toRemoveFromID)[0]
          .slice(0, -1)
      );
    }
  }

  function handleKeyDown(e: any) {
    console.log(e);
    if (e.code === "ArrowUp" && selectedIndex !== 0) {
      setSelectedIndex(selectedIndex - 1);
    } else if (
      e.code === "ArrowDown" &&
      recommandedKeyword.length > selectedIndex + 1
    ) {
      setSelectedIndex(selectedIndex + 1);
    }
  }

  const Recommend = () => {
    function onClickHandler(e: any) {
      let toRemoveFromID = "";
      if (e.name.includes("(")) {
        toRemoveFromID = e.name.split("(")[1].split(")")[0].toLowerCase();
      }
      console.log(toRemoveFromID);
      onSubmit(e.id.split(toRemoveFromID)[0].slice(0, -1));
    }
    return (
      <RecommendContainer>
        {recommandedKeyword.map((e, i) => (
          <ElementRow
            key={i}
            selected={selectedIndex === i}
            onClick={() => onClickHandler(e)}
          >
            {e.name} ({e.symbol.toUpperCase()})
          </ElementRow>
        ))}
      </RecommendContainer>
    );
  };

  return (
    <Wrapper>
      <SearchContainer>
        <FontAwesomeIcon icon="search" size="1x" color="grey" />
        <SInnerInput
          placeholder={t("Search")}
          value={inputText}
          onChange={onChangeInput}
          onKeyPress={handleKeyPress}
          onKeyDown={handleKeyDown}
        />
      </SearchContainer>
      <Recommend />
      {/* For mobile ============================================================ */}
      <SearchButton onClick={onClickPopUp}>
        <FontAwesomeIcon icon="search" size="1x" color="white" />
      </SearchButton>
      {isPopUp && (
        <PopUpDimmer>
          <PopUpWrapper>
            <PopUpInputContainer>
              <FontAwesomeIcon icon="search" size="1x" color="grey" />
              <SInnerInput
                placeholder={t("Search")}
                value={inputText}
                onChange={onChangeInput}
              />
              <Button onClick={onClickPopUp}>EXIT</Button>
            </PopUpInputContainer>
            <Recommend />
          </PopUpWrapper>
        </PopUpDimmer>
      )}
    </Wrapper>
  );
};

const SearchButton = styled(SIconButton)`
  display: none;
  ${({ theme }) => theme.device.tablet} {
    display: block;
  }
`;

const Wrapper = styled(SRow)`
  position: relative;
  width: fit-content;
  height: 48px;
  justify-content: right;
`;

const SearchContainer = styled.div`
  display: flex;
  justify-content: left;
  align-items: center;
  height: 100%;
  border-radius: 20px;
  padding-left: 16px;
  padding-right: 16px;
  background: ${(props) => props.theme.colors.gray2};
  ${({ theme }) => theme.device.tablet} {
    display: none;
  }
`;

const RecommendContainer = styled.div`
  display: flex;
  flex-direction: column;
  position: absolute;
  width: 100%;
  z-index: 1;
  top: 48px;

  max-height: 40vh;
  background-color: ${(props) => props.theme.colors.gray};
`;

const ElementRow = styled.div<Props>`
  display: flex;
  padding: 12px 12px;
  font-size: 1.6rem;
  color: white;
  cursor: pointer;
  background-color: ${(props) =>
    props.selected ? props.theme.colors.gray3 : props.theme.colors.gray};
  &:hover {
    background-color: ${(props) => props.theme.colors.gray3};
  }
`;

// ============================================================
const PopUpDimmer = styled(SStyledDimmer)`
  padding: 0px;
  background-color: #000000e7;
`;

const PopUpWrapper = styled.div`
  width: 100%;
  height: 100%;
`;

const PopUpInputContainer = styled(SRow)`
  justify-content: space-between;
  width: auto;
  padding: 8px 16px;
  background-color: ${({ theme }) => theme.colors.gray2};
`;
