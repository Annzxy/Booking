import React, { useState, useEffect } from "react";
import { isEmpty } from "lodash";
import SeatPicker from "react-seat-picker";

import { convertToRowsFormat, updateLocalStorage } from "../utils";

import { useFetchXml, useBookingContext } from "../hooks";

import { ADD, REMOVE } from "../constants";

export const TereBoat = () => {
  const [data, setData] = useBookingContext();
  const { item, pending } = useFetchXml(`TereBoat.xml`);

  const rowsFromLocalStorage = localStorage.getItem(data.localStorageKeyName);
  const [rows, setRows] = useState(
    !isEmpty(rowsFromLocalStorage) ? JSON.parse(rowsFromLocalStorage) : null
  );

  console.log("data.localStorageKeyName", data.localStorageKeyName);
  useEffect(() => {
    // If has value in local storage, no need to read from xml file.
    if (!isEmpty(rows)) {
      return;
    }

    // if no value in local storage, and xml conversion has been done
    if (item && !pending) {
      const formattedRows = convertToRowsFormat(item);
      setRows(formattedRows);

      if (rowsFromLocalStorage) {
        setRows(JSON.parse(rowsFromLocalStorage));
      }
      // Here we could not use rows immediately as setRows may done after fetch rows.
      localStorage.setItem(
        data.localStorageKeyName,
        JSON.stringify(formattedRows)
      );
    }
  }, [item, pending, rows, rowsFromLocalStorage]);

  const addSeat = async ({ row, number, id }, addCb) => {
    const newTooltip = `Seat selected - ${id}`;
    await addCb(row, number, id, newTooltip);

    // Added seat to context
    let { selectedSeats } = data;

    selectedSeats.push({
      row: row,
      id: id,
    });

    setData({
      ...data,
      selectedSeats: selectedSeats,
    });

    // Update localStorage
    updateLocalStorage(data.localStorageKeyName, ADD, id);
  };

  const removeSeat = async ({ row, number, id }, removeCb) => {
    // revert to null is to reset toolTip
    const newTooltip = null;
    await removeCb(row, number, newTooltip);

    // Added seat to context
    let { selectedSeats } = data;
    selectedSeats.pop();
    setData({
      ...data,
      selectedSeats: selectedSeats,
    });

    // Update localStorage
    updateLocalStorage(data.localStorageKeyName, REMOVE, id);
  };

  if (rows) {
    return (
      <SeatPicker
        addSeatCallback={addSeat}
        removeSeatCallback={removeSeat}
        rows={rows}
        maxReservableSeats={Number(data.numberOfVisitors)}
        visible
        selectedByDefault
      />
    );
  }

  return;
};
