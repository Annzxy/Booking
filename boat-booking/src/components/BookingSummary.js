import React from "react";
import { useLocation } from "wouter";
import { styled } from "@mui/material/styles";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { red, green } from "@mui/material/colors";
import Divider from "@mui/material/Divider";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";

import { FootButtonGroup } from "./FootButtonGroup";

import { convertToDollarCurrencyFormat, updateLocalStorage } from "../utils";

import { useBookingContext } from "../hooks";

import { MENU_URL, ROOT_URL, TERE_BOAT, NUI_BOAT, RESERVE } from "../constants";
import { MenuDetailBoard } from "./MenuDetailBoard";
import { BoatSelectionDetailBoard } from "./BoatSelectionDetailBoard";

export const BookingSummary = () => {
  const [data, setData] = useBookingContext();

  const [, setLocation] = useLocation();

  const onClick = () => {
    const keyName = data.boatName === "Tere Boat" ? TERE_BOAT : NUI_BOAT;
    updateLocalStorage(keyName, RESERVE);
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
        }}
      >
        <Typography variant="h4" sx={{ marginBottom: 10 }}>
          Booking Summary
        </Typography>

        <Typography variant="h5" sx={{ marginBottom: 10 }}>
          {`Your Total Price is: ${convertToDollarCurrencyFormat(
            data.totalFoodPrice + data.totalTicketPrice
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

        <Button variant="outlined" onClick={onClick}>
          CONFIRM ORDER
        </Button>
        <FootButtonGroup previousUrl={MENU_URL} isLastPage={true} />
      </Container>
    );
  }

  return;
};
