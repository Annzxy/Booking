import React, { useState } from "react";

import { BOAT_SEAT_SELECTION, BOOKING_SUMMARY_URL } from "../constants";

export const WeatherBoard = () => {
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
