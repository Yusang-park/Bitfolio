
import React, { useContext, useState } from "react";
import styled from "styled-components";
import { UserContext } from '../../provider/userProvider';
import { Row, ScaffoldStyle, TitleText } from '../global-components';

export const Favorite = () => {
    const { favorites } = useContext(UserContext);
    return (
       <Whole>
        <TitleText>Favorites</TitleText>
        <Row>
        {Object.keys(favorites).map((e, i) => (
          <Scaffold key={i}>{e}</Scaffold>
        ))}
            </Row></Whole>)
}

const Whole = styled.div`
width:50vw;
overflow-x: scroll;
`;



const Scaffold = styled(ScaffoldStyle)`

`;