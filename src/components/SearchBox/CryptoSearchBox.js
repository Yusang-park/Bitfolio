import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState, useRef } from "react";
import styled from "styled-components";
import { getCryptoObject } from "../../Service/Apis";
import { IconButton, Row } from "../GlobalComponents";
import { useHistory } from "react-router-dom";

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
  const [loaded, setLoaded] = useState(false);
  const history = useHistory();

  async function requestCryptoList() {
    if (_cryptoList.current == null) {
      getCryptoObject().then((response) => {
        _cryptoList.current = response;
        // console.log("getting API done");
        setLoaded(true);
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
  }

  function reset() {
    let temp = recommandedKeyword.filter((e) => false);
    setRecommendedKeyword(temp);
    setInputText("");
  }

  function routeDetails(id) {
    reset();
    history.replace({
      pathname: `/details/${id}`,
      state: {
        id: id,
      },
    });
  }

  return (
    <Container>
      <SearchContainer>
        <FontAwesomeIcon icon="search" size="1x" color="grey" />
        <Input
          placeholder="Search"
          onFocus={requestCryptoList}
          value={inputText}
          onChange={onChange}
        />
      </SearchContainer>
      {loaded && (
        <RecommendedContainer>
          {recommandedKeyword.map((e, i) => (
            <ElementRow key={i} onClick={() => routeDetails(e.id)}>
              {e.name} ({e.symbol.toUpperCase()})
            </ElementRow>
          ))}
        </RecommendedContainer>
      )}
      <SearchButton>
        <FontAwesomeIcon icon="search" size="1x" color="white" />
      </SearchButton>
    </Container>
  );
};

const SearchButton = styled(IconButton)`
  display: none;
  ${({ theme }) => theme.device.tablet} {
    display: block;
  }
`;

const Container = styled(Row)`
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
  border-radius: 21px;
  padding-left: 16px;
  padding-right: 16px;
  background: ${(props) => props.theme.colors.gray2};
  ${({ theme }) => theme.device.tablet} {
    display: none;
  }
`;

const Input = styled.input`
  width: auto;

  font-size: 2rem;
  margin-left: 16px;
  border: transparent;
  background: transparent;
  color: white;

  &:focus {
    outline: transparent;
    border: 0px solid transparent;
    box-shadow: 0 0 10px transparent;
  }
`;

const RecommendedContainer = styled.div`
  display: flex;
  flex-direction: column;
  position: absolute;
  width: 100%;
  z-index: 1;
  top: 48px;

  overflow-y: scroll;
  /* margin-left: 8%;
  margin-right: 8%; */
  max-height: 40vh;
  background-color: ${(props) => props.theme.colors.gray};
`;

const ElementRow = styled.div`
  display: flex;
  padding: 12px 12px;
  font-size: 1.6rem;
  color: white;
  cursor: pointer;
  &:hover {
    background-color: ${(props) => props.theme.colors.gray3};
  }
`;
