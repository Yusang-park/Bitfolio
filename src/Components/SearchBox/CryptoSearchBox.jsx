import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState, useRef, useEffect } from "react";
import styled, { css } from "styled-components";
import { getCryptoObject } from "../../Service/Apis";
import {
  SIconButton,
  SRow,
  SInnerInput,
  SStyledDimmer,
} from "../GlobalComponents";
import { useHistory } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { Button } from "../TransComponants";

function searchObject(object, key) {
  let res = [];
  let root = object;
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

function findLastElement(object, res) {
  if (res.length > 10) return;

  if (object.hasOwnProperty("*key")) {
    res.push(object["*key"]);
    if (object.length === 1) {
      return;
    }
  }
  for (const [k, v] of Object.entries(object)) {
    if (k !== "*key") findLastElement(v, res);
  }
}

//TODO: focus out
export const CryptoSearchBox = () => {
  const _cryptoList = useRef(null);
  const [inputText, setInputText] = useState("");
  const [recommandedKeyword, setRecommendedKeyword] = useState([]);
  const [isPopUp, setPopUp] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const history = useHistory();
  const { t } = useTranslation();

  useEffect(() => {
    requestCryptoList();
  });

  async function requestCryptoList() {
    if (_cryptoList.current == null) {
      getCryptoObject().then((response) => {
        _cryptoList.current = response;
      });
    }
  }

  function onChange({ target: { value } }) {
    setInputText(value);
    let temp = recommandedKeyword.filter((e) => false);
    if (value === "") {
      setRecommendedKeyword(temp);
    } else if (_cryptoList != null) {
      temp = temp.concat(searchObject(_cryptoList.current, value));
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

  function onClickRedirectionDetails(id) {
    reset();
    if (isPopUp) onClickPopUp();
    history.replace({
      pathname: `/details/${id}`,
      state: {
        id: id,
      },
    });
  }

  function onClickPopUp() {
    setPopUp(!isPopUp);
  }

  function handleKeyPress(e) {
    if (e.key === "Enter") {
      onClickRedirectionDetails(recommandedKeyword[selectedIndex].id);
    }
  }

  function handleKeyDown(e) {
    if (e.code === "ArrowUp" && selectedIndex !== 0) {
      setSelectedIndex(selectedIndex - 1);
    } else if (
      e.code === "ArrowDown" &&
      recommandedKeyword.length > selectedIndex + 1
    ) {
      setSelectedIndex(selectedIndex + 1);
    }
  }

  const Recommend = () => (
    <RecommendContainer>
      {recommandedKeyword.map((e, i) => (
        <ElementRow
          key={i}
          selected={selectedIndex === i}
          onClick={() => onClickRedirectionDetails(e.id)}
        >
          {e.name} ({e.symbol.toUpperCase()})
        </ElementRow>
      ))}
    </RecommendContainer>
  );

  return (
    <Wrapper>
      <SearchContainer>
        <FontAwesomeIcon icon="search" size="1x" color="grey" />
        <SInnerInput
          placeholder={t("Search")}
          value={inputText}
          onChange={onChange}
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
                onChange={onChange}
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

  overflow-y: scroll;
  max-height: 40vh;
  background-color: ${(props) => props.theme.colors.gray};
`;

const ElementRow = styled.div`
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
