import React from "react";

import {
  styled,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  Paper,
  TableRow,
  red,
  green,
  Divider,
  Container,
  Typography,
} from "@mui/material";

import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Avatar from "@mui/material/Avatar";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";

import AccessAlarmIcon from "@mui/icons-material/AccessAlarm";
import PersonAddIcon from "@mui/icons-material/PersonAdd";

import {
  convertToDollarCurrencyFormat,
  calculateBoatTicketPrice,
  convertDepartureDateToString,
  getBoatTicketsTotalPrice,
} from "../utils";

export const BoatSelectionDetailBoard = (data) => {
  const contextData = data.data;

  console.log("contextData", contextData);
  return (
    <>
      <Container sx={{ display: "flex", flexDirection: "row" }}>
        <TableContainer
          component={Paper}
          sx={{ width: "70%", marginRight: 10 }}
        >
          <Table aria-label="menu-sum">
            <TableHead>
              <TableRow>
                <TableCell align="center">Row Number</TableCell>
                <TableCell align="center">Ticket price</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {contextData.selectedSeats.map((seat, index) => {
                return (
                  <TableRow key={index}>
                    <TableCell align="center">{seat.id}</TableCell>
                    <TableCell align="center">
                      {convertToDollarCurrencyFormat(
                        calculateBoatTicketPrice(seat.row)
                      )}
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </TableContainer>
        <List sx={{ width: "20%" }}>
          <ListItem>
            <ListItemAvatar>
              <Avatar>
                <PersonAddIcon />
              </Avatar>
            </ListItemAvatar>
            <ListItemText
              primary="Number of People"
              secondary={contextData.numberOfVisitors}
            />
          </ListItem>
          <ListItem>
            <ListItemAvatar>
              <Avatar>
                <CalendarMonthIcon />
              </Avatar>
            </ListItemAvatar>
            <ListItemText
              primary="Selected Date"
              secondary={convertDepartureDateToString(
                contextData.departureDate
              )}
            />
          </ListItem>
          <ListItem>
            <ListItemAvatar>
              <Avatar>
                <AccessAlarmIcon />
              </Avatar>
            </ListItemAvatar>
            <ListItemText
              primary="Selected Time"
              secondary={contextData.departureTime}
            />
          </ListItem>
        </List>
      </Container>

      <Container
        sx={{ display: "flex", justifyContent: "end", marginBottom: 4 }}
      >
        <Typography
          variant="h6"
          sx={{ alig: "end", marginTop: 2, marginBottom: 2 }}
        >
          {`Ticket total: ${convertToDollarCurrencyFormat(
            getBoatTicketsTotalPrice(contextData.selectedSeats)
          )}`}
        </Typography>
      </Container>
    </>
  );
};
