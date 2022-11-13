import React, { useState } from "react";
import { useLocation } from "wouter";

import Button from "@mui/material/Button";

import { BOOKING_FORM_URL } from "../constants";

export const BoatBooking = () => {
  const [, setLocation] = useLocation();
  const [showButton, setShowButton] = useState(true);
  return (
    <>
      {showButton ? (
        <Button
          variant="contained"
          onClick={() => {
            setShowButton(false);
            setLocation(BOOKING_FORM_URL);
          }}
        >
          Start booking
        </Button>
      ) : null}
    </>
  );
};
