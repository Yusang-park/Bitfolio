import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import styled from "styled-components";
import { registerWithEamil } from "../../Service/FirebaseAuth";
import { SColumn, SInput, SSizedBox, SText } from "../GlobalComponents";
import { Button } from "../TransComponants";
export const SignUpModalBox = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [reEnterPassword, setReEnterPassword] = useState("");
  const [nickname, setNickname] = useState("");
  const [errorText, setErrorText] = useState("");
  const { t } = useTranslation();

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
          placeholder={t("Email")}
          required
        />
        <SSizedBox height="24px" />
        <Input
          id="password"
          value={password}
          onChange={onChange}
          type="password"
          placeholder={t("Password")}
          required
        />
        <SSizedBox height="24px" />
        <Input
          id="reEnterPassword"
          value={reEnterPassword}
          onChange={onChange}
          type="password"
          placeholder={t("Re-enter Password")}
          required
        />
        <SSizedBox height="24px" />
        <Input
          id="nickname"
          value={nickname}
          onChange={onChange}
          type="text"
          placeholder={t("Nickname")}
          maxLength={10}
          required
        />
        <SSizedBox height="16px" />
        <SText>{errorText}</SText>
        <SSizedBox height="16px" />
        <Button>Create an account</Button>
      </SColumn>
    </form>
  );
};
const Input = styled(SInput)`
  height: 48px;
`;
