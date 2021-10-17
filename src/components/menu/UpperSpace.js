import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import { categories } from "../../routes/categories";

export const UpperSpace = () => {
  const pathName = useLocation().pathname;

  return <div>{pathName}</div>;
};
