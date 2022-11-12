import React, { useState } from "react";

import { FootButtonGroup } from "./FootButtonGroup";

import { useBookingContext } from "../hooks";

import { BOAT_SEAT_SELECTION, BOOKING_SUMMARY_URL } from "../constants";

export const Menu = () => {
  const [data, setData] = useBookingContext();
  const [open, setOpen] = useState(false);
  console.log("menu-data", data);
  return (
    <>
      <FootButtonGroup
        previousUrl={BOAT_SEAT_SELECTION}
        nextUrl={BOOKING_SUMMARY_URL}
        open={open}
        setOpen={setOpen}
      />
    </>
  );
};
