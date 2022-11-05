import React from "react";
import { useBookingContext } from "../hooks";
import { BOOKING_FORM_URL } from "../constants";
import { useLocation } from "wouter";
import Button from "@mui/material/Button";
export const BookingSummary = () => {
  const [data, setData] = useBookingContext();
  const [, setLocation] = useLocation();
  return (
    <>
      <p>{data.numberOfVisitors}</p>
      <Button
        variant="contained"
        onClick={() => {
          setData({ ...data, numberOfVisitors: ++data.numberOfVisitors });
          setLocation(BOOKING_FORM_URL);
        }}
      >
        Go to FORM
      </Button>
    </>
  );
};
