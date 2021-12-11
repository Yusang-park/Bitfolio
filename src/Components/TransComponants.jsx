import React from "react";
import { useTranslation } from "react-i18next";
import {
  SBoldText,
  SGrayText,
  SText,
  STextButton,
  STitleText,
  SButton,
  STextBlack,
  SYellowTitleCircle,
  SPressButton,
  STextBlue,
} from "./GlobalComponents";

export const BoldText = ({ children }) => {
  const { t } = useTranslation();

  return <SBoldText>{t(children)}</SBoldText>;
};

export const TextBlue = ({ children }) => {
  const { t } = useTranslation();

  return <STextBlue>{t(children)}</STextBlue>;
};

export const TitleText = ({ children }) => {
  const { t } = useTranslation();

  return <STitleText>{t(children)}</STitleText>;
};
export const GrayText = ({ children }) => {
  const { t } = useTranslation();

  return <SGrayText>{t(children)}</SGrayText>;
};

export const Text = ({ children }) => {
  const { t } = useTranslation();
  return <SText>{t(children)}</SText>;
};

export const TextBlack = ({ children }) => {
  const { t } = useTranslation();
  return <STextBlack>{t(children)}</STextBlack>;
};

export const YellowTitleCircle = ({ children }) => {
  const { t } = useTranslation();
  return <SYellowTitleCircle>{t(children)}</SYellowTitleCircle>;
};

export const TextButton = (props) => {
  const { t } = useTranslation();
  return <STextButton {...props}>{t(props.children)}</STextButton>;
};

export const Button = (props) => {
  const { t } = useTranslation();
  return <SButton {...props}>{t(props.children)}</SButton>;
};
export const PressButton = (props) => {
  const { t } = useTranslation();
  return <SPressButton {...props}>{t(props.children)}</SPressButton>;
};
