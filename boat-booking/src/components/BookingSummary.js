import React from "react";

import { FootButtonGroup } from "./FootButtonGroup";

import { useBookingContext } from "../hooks";

import { MENU_URL } from "../constants";

export const BookingSummary = () => {
  return (
    <>
      <FootButtonGroup previousUrl={MENU_URL} isLastPage={true} />
    </>
  );
};
