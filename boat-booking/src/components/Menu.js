import React, { useState, useEffect } from "react";
import { isEmpty } from "lodash";

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

import { FootButtonGroup } from "./FootButtonGroup";
import { MenuDetailBoard } from "./MenuDetailBoard";

import { useBookingContext, useFetchXml } from "../hooks";

import {
  convertToMenuListFormat,
  convertToDollarCurrencyFormat,
} from "../utils";

import {
  BOAT_SEAT_SELECTION,
  BOOKING_SUMMARY_URL,
  MENU_LIST,
} from "../constants";

const StyledContainer = styled("div")(({ theme }) => ({
  display: "flex",
  flexDirection: "row",
  alignItems: "center",
  justifyContenet: "center",
  padding: theme.spacing(10),
}));

const StyledMenu = styled("div")(({ theme }) => ({
  marginRight: theme.spacing(5),
}));

const StyledMenuBoard = styled("div")(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  justifyContent: "start",
  height: "100vh",
}));

export const Menu = () => {
  const [data, setData] = useBookingContext();
  const [open, setOpen] = useState(false);

  const { item, pending } = useFetchXml(`Menu.xml`);
  const menuFromLocalStorage = localStorage.getItem(MENU_LIST);

  const [menu, setMenu] = useState(
    !isEmpty(menuFromLocalStorage) ? JSON.parse(menuFromLocalStorage) : null
  );

  useEffect(() => {
    // If has value in local storage, no need to read from xml file.
    if (!isEmpty(menu)) {
      return;
    }

    // if no value in local storage, and xml conversion has been done
    if (item && !pending) {
      const formattedMenuList = convertToMenuListFormat(item);
      setMenu(formattedMenuList);

      // Here we could not use rows immediately as setRows may done after fetch rows.
      localStorage.setItem(MENU_LIST, JSON.stringify(formattedMenuList));
    }
  }, [item, pending]);

  const onClickAdd = (event) => {
    let { orders, totalFoodPrice } = data;

    orders = orders.map((item) => {
      if (item.name == event.currentTarget.id) {
        item.unit++;
        item.subtotal = item.unit * item.unitPrice;
        totalFoodPrice += item.unitPrice;
      }
      return item;
    });
    setData({ ...data, orders: orders, totalFoodPrice: totalFoodPrice });
  };

  const onClickRemove = (event) => {
    let { orders, totalFoodPrice } = data;
    orders = orders.map((item) => {
      if (item.name == event.currentTarget.id) {
        if (item.unit > 0) {
          item.unit--;
          item.subtotal = item.unit * item.unitPrice;
          totalFoodPrice -= item.unitPrice;
        }
      }
      return item;
    });
    setData({ ...data, orders: orders, totalFoodPrice: totalFoodPrice });
  };

  return data ? (
    <>
      <StyledContainer>
        <StyledMenu>
          {menu ? (
            <TableContainer component={Paper}>
              <Table sx={{ minWidth: 550 }} aria-label="menu">
                <TableHead>
                  <TableRow>
                    <TableCell>Menu List</TableCell>
                    <TableCell align="left">Demo photo</TableCell>
                    <TableCell align="left">Description</TableCell>
                    <TableCell align="left">Cost</TableCell>
                    <TableCell align="left">Special Requirement</TableCell>
                    <TableCell align="left">Add</TableCell>
                    <TableCell align="left">Remove</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {menu.map((menuItem, index) => (
                    <TableRow
                      key={index}
                      sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                    >
                      <TableCell align="left">{menuItem.imageName}</TableCell>
                      <TableCell align="left">
                        <img
                          src={`${menuItem.imageName}.png`}
                          alt={menuItem.imageName}
                          loading="lazy"
                        />
                      </TableCell>
                      <TableCell align="left">{menuItem.description}</TableCell>
                      <TableCell align="left">{menuItem.cost}</TableCell>
                      <TableCell align="left">
                        {menuItem.specialRequirement}
                      </TableCell>
                      <TableCell align="left">
                        <AddIcon
                          id={menuItem.imageName}
                          sx={{ color: green[500], cursor: "pointer" }}
                          onClick={onClickAdd}
                        />
                      </TableCell>
                      <TableCell align="left">
                        <RemoveIcon
                          id={menuItem.imageName}
                          sx={{ color: red[500], cursor: "pointer" }}
                          onClick={onClickRemove}
                        />
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          ) : null}
        </StyledMenu>

        <StyledMenuBoard>
          <MenuDetailBoard data={data} />
          <Divider />
          <TableContainer component={Paper} sx={{ marginTop: 30 }}>
            <Table sx={{ minWidth: 550 }} aria-label="menu-price">
              <TableBody>
                <TableRow>
                  <TableCell align="left">Total Price (excl. GST)</TableCell>
                  <TableCell align="center">
                    {convertToDollarCurrencyFormat(data.totalFoodPrice * 0.85)}
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell align="left">GST</TableCell>
                  <TableCell align="center">
                    {convertToDollarCurrencyFormat(data.totalFoodPrice * 0.15)}
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell align="left">Total Price (incl. GST)</TableCell>
                  <TableCell align="center">
                    {convertToDollarCurrencyFormat(data.totalFoodPrice)}
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </TableContainer>
        </StyledMenuBoard>
      </StyledContainer>

      <FootButtonGroup
        previousUrl={BOAT_SEAT_SELECTION}
        nextUrl={BOOKING_SUMMARY_URL}
        open={open}
        setOpen={setOpen}
      />
    </>
  ) : null;
};
