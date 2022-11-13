import React from "react";

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

import { convertToDollarCurrencyFormat } from "../utils";

export const MenuDetailBoard = (data) => {
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 550 }} aria-label="menu-sum">
        <TableHead>
          <TableRow>
            <TableCell align="center">Items</TableCell>
            <TableCell align="center">Quantity</TableCell>
            <TableCell align="center">Sub Total</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data.data.orders.map((item, index) => {
            if (item.unit > 0) {
              return (
                <TableRow key={index}>
                  <TableCell align="center">{item.name}</TableCell>
                  <TableCell align="center">{item.unit}</TableCell>
                  <TableCell align="center">
                    {convertToDollarCurrencyFormat(item.subtotal)}
                  </TableCell>
                </TableRow>
              );
            }
          })}
        </TableBody>
      </Table>
    </TableContainer>
  );
};
