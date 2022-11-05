import React from "react";
import { useRoute } from "wouter";
import { Transition } from "react-transition-group";
import Button from "@mui/material/Button";
import { BOOKING_SUMMARY_URL } from "../constants";
import { useLocation } from "wouter";
import { useBookingContext } from "../hooks";
export const BookingForm = () => {
  const [match] = useRoute("/booking-form");
  const [, setLocation] = useLocation();
  const [data, setData] = useBookingContext();

  console.log("data", data);
  return (
    <Transition in={match} timeout={500}>
      <>
        <div> {data.numberOfVisitors}</div>
        <Button
          variant="contained"
          onClick={() => {
            setData({ ...data, numberOfVisitors: ++data.numberOfVisitors });
            setLocation(BOOKING_SUMMARY_URL);
          }}
        >
          Go to SUMMARY
        </Button>
      </>
    </Transition>
  );
};
