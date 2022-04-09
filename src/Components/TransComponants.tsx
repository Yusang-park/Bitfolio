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

export const BoldText = ({ children }: { children: any }) => {
  const { t } = useTranslation();

  return <SBoldText>{t<string>(children)}</SBoldText>;
};

export const TextBlue = ({ children }: { children: any }) => {
  const { t } = useTranslation();

  return <STextBlue>{t<string>(children)}</STextBlue>;
};

export const TitleText = ({ children }: { children: any }) => {
  const { t } = useTranslation();

  return <STitleText>{t<string>(children)}</STitleText>;
};
export const GrayText = ({ children }: { children: any }) => {
  const { t } = useTranslation();

  return <SGrayText>{t<string>(children)}</SGrayText>;
};

export const Text = ({ children }: { children: any }) => {
  const { t } = useTranslation();
  return <SText>{t<string>(children)}</SText>;
};

export const TextBlack = ({ children }: { children: any }) => {
  const { t } = useTranslation();
  return <STextBlack>{t<string>(children)}</STextBlack>;
};

export const YellowTitleCircle = ({ children }: { children: any }) => {
  const { t } = useTranslation();
  return <SYellowTitleCircle>{t<string>(children)}</SYellowTitleCircle>;
};

export const TextButton = (props: any) => {
  const { t } = useTranslation();
  return <STextButton {...props}>{t<string>(props.children)}</STextButton>;
};

export const Button = (props: any) => {
  const { t } = useTranslation();
  return <SButton {...props}>{t<string>(props.children)}</SButton>;
};
export const PressButton = (props: any) => {
  const { t } = useTranslation();
  return <SPressButton {...props}>{t<string>(props.children)}</SPressButton>;
};
