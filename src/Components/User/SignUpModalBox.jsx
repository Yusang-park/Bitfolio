import React, { useState } from "react";
import styled from "styled-components";
import { registerWithEamil } from "../../Service/FirebaseAuth";
import {
  SButton,
  SColumn,
  SInput,
  SSizedBox,
  SText,
} from "../GlobalComponents";
export const SignUpModalBox = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [reEnterPassword, setReEnterPassword] = useState("");
  const [nickname, setNickname] = useState("");
  const [errorText, setErrorText] = useState("");

  function onChange(e) {
    switch (e.target.id) {
      case "email":
        setEmail(e.target.value);
        break;
      case "password":
        setPassword(e.target.value);
        break;
      case "reEnterPassword":
        setReEnterPassword(e.target.value);
        break;
      case "nickname":
        setNickname(e.target.value);
        break;
      default:
    }
  }

  async function onSubmit(e) {
    e.preventDefault();

    if (password !== reEnterPassword) {
      alert("Make sure the password and re-enter password match");
    }
    let response = await registerWithEamil(email, password, nickname);
    if (response !== null) {
      setErrorText(response);
      return;
    }
  }

  return (
    <form onSubmit={onSubmit}>
      <SColumn>
        <SSizedBox height="32px" />
        <Input
          id="email"
          value={email}
          onChange={onChange}
          type="email"
          placeholder="Email"
          required
        />
        <SSizedBox height="24px" />
        <Input
          id="password"
          value={password}
          onChange={onChange}
          type="password"
          placeholder="Password"
          required
        />
        <SSizedBox height="24px" />
        <Input
          id="reEnterPassword"
          value={reEnterPassword}
          onChange={onChange}
          type="password"
          placeholder="Re-enter Password"
          required
        />
        <SSizedBox height="24px" />
        <Input
          id="nickname"
          value={nickname}
          onChange={onChange}
          type="text"
          placeholder="Nickname"
          maxLength={10}
          required
        />
        <SSizedBox height="16px" />
        <SText>{errorText}</SText>
        <SSizedBox height="16px" />
        <SButton>Create an account</SButton>
      </SColumn>
    </form>
  );
};
const Input = styled(SInput)`
  height: 48px;
`;
