import styled from "styled-components";

export const Divider = styled.div`
  height: 1px;
  margin: ${({ horizontal, vertical }) => `${vertical} ${horizontal}`};
  background-color: ${(props) => props.theme.colors.disable};
`;
export const SizedBox = styled.div`
width : ${(props) => props.width};
height: ${(props) => props.height};
` ;

export const Expanded = styled.div`
  display : flex;
  align-items : center;
  flex: ${(props)=>props.flex};
`;