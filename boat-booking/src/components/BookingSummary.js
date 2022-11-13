import React from "react";
import { useLocation } from "wouter";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";

import { FootButtonGroup } from "./FootButtonGroup";

import {
  convertToDollarCurrencyFormat,
  updateLocalStorage,
  getBoatTicketsTotalPrice,
} from "../utils";

import { useBookingContext } from "../hooks";

import { MENU_URL, ROOT_URL, TERE_BOAT, NUI_BOAT, RESERVE } from "../constants";
import { MenuDetailBoard } from "./MenuDetailBoard";
import { BoatSelectionDetailBoard } from "./BoatSelectionDetailBoard";
import { INITIAL_STATE } from "../context/BookingContext";

export const BookingSummary = () => {
  const [data, setData] = useBookingContext();

  const [, setLocation] = useLocation();

  const onClick = () => {
    const { boatName } = data;
    const keyName = boatName === "Tere Boat" ? TERE_BOAT : NUI_BOAT;
    updateLocalStorage(keyName, RESERVE);
    //clearContext
    setData({ ...INITIAL_STATE });
    setLocation(ROOT_URL, RESERVE);
  };

  if (data) {
    return (
      <Container
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          padding: 6,
          background: "white",
        }}
      >
        <Typography variant="h4" sx={{ marginBottom: 10 }}>
          Booking Summary
        </Typography>

        <Typography variant="h5" sx={{ marginBottom: 10 }}>
          {`Your Total Price is: ${convertToDollarCurrencyFormat(
            data.totalFoodPrice + getBoatTicketsTotalPrice(data.selectedSeats)
          )}`}
        </Typography>

        <BoatSelectionDetailBoard data={data} />
        <MenuDetailBoard data={data} />
        <Container sx={{ display: "flex", justifyContent: "end" }}>
          <Typography
            variant="h6"
            sx={{ alig: "end", marginTop: 2, marginBottom: 2 }}
          >
            {`Food total: ${convertToDollarCurrencyFormat(
              data.totalFoodPrice
            )}`}
          </Typography>
        </Container>

        <Button variant="contained" onClick={onClick}>
          CONFIRM ORDER
        </Button>
        <FootButtonGroup previousUrl={MENU_URL} isLastPage={true} />
      </Container>
    );
  }

  return;
};
