import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState, useRef } from "react";
import styled from "styled-components";
import { getCryptoObject } from "../../service/apis";
import { NonPaddingButton } from "../../styles/components";
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
export const SearchInput = () => {
  const _cryptoList = useRef(null);
  const [inputText, setInputText] = useState("");
  const [recommandedKeyword, setRecommendedKeyword] = useState([]);
  const [loaded, setLoaded] = useState(false);
  const history = useHistory();

  async function requestCryptoList() {
    if (_cryptoList.current == null) {
      getCryptoObject().then((response) => {
        _cryptoList.current = response;
        console.log("getting API done");
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
        <Input
          placeholder="Search"
          onFocus={requestCryptoList}
          value={inputText}
          onChange={onChange}
        />
        <NonPaddingButton>
          <FontAwesomeIcon icon="search" size="1x" color="white" />
        </NonPaddingButton>
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
    </Container>
  );
};
const Container = styled.div`
  flex: 1;
  max-width: 26%;
  max-width: 300px;
`;

const SearchContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 100%;
  border-radius: 21px;
  padding-left: 24px;
  padding-right: 24px;
  background: ${(props) => props.theme.colors.gray2};
`;

const Input = styled.input`
  width: calc(100% - 68px);
  padding-right: 16px;
  font-size: 20px;
  height: 6.2vh;
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
  position: relative;
  z-index: 1;
  overflow-y: scroll;
  margin-left: 8%;
  margin-right: 8%;
  max-height: 40vh;
  background-color: ${(props) => props.theme.colors.gray};
  &::-webkit-scrollbar {
    width: 8px;
    border-radius: 6px;
    background: gray;
  }
  &::-webkit-scrollbar-thumb {
    background-color: lightgray;
    border-radius: 6px;
  }
`;

const ElementRow = styled.div`
  display: flex;
  padding: 12px 12px;
  font-size: 16px;
  color: white;
  cursor: pointer;
  &:hover {
    background-color: ${(props) => props.theme.colors.gray3};
  }
`;
