import React, { useState, useEffect } from "react";
import { useFetchXml, useBookingContext, useLocalStorage } from "../hooks";
import { NUI_BOAT } from "../constants";
import { isEmpty } from "lodash";
import { convertToRowsFormat } from "../utils";
import SeatPicker from "react-seat-picker";

export const NiuBoat = () => {
  const [data, setData] = useBookingContext();
  const { item, pending } = useFetchXml(`TereBoat.xml`);
  const [rows, setRows] = useState(JSON.parse(localStorage.getItem(NUI_BOAT)));

  useEffect(() => {
    // If has value in local storage, no need to read from xml file.
    if (!isEmpty(rows)) {
      return;
    }
    console.log("item", item);
    if (!isEmpty(item) && !pending) {
      setRows(convertToRowsFormat(item));
      localStorage.setItem(NUI_BOAT, JSON.stringify(rows));
    }
  }, [item, pending]);

  console.log("rows", rows);
  if (rows) {
    return (
      <SeatPicker
        // addSeatCallback={this.addSeatCallbackContinuousCase}
        // removeSeatCallback={this.removeSeatCallback}
        rows={rows}
        maxReservableSeats={3}
        alpha
        visible
        selectedByDefault
        // loading={loading}
        // tooltipProps={{ multiline: true }}
        // continuous
      />
    );
  }

  return;
};
