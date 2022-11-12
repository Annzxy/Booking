import React, { useState, useEffect } from "react";
import { useFetchXml, useBookingContext, useLocalStorage } from "../hooks";

import { NiuBoat } from "./NuiBoat";
import { TereBoat } from "./TereBoat";
import { FootButtonGroup } from "./FootButtonGroup";

import { ROOT_URL, MENU_URL } from "../constants";

export const BoatSeatSelection = () => {
  const [data, setData] = useBookingContext();
  const [open, setOpen] = useState(false);
  const [disabled, setDisabled] = useState(false);

  const boatSelect = () => {
    switch (data.boatName) {
      case "Niu Boat":
        return <NiuBoat />;
      case "Tere Boat":
        return <TereBoat />;
      default:
        return;
    }
  };

  return (
    <>
      {boatSelect()}
      <FootButtonGroup
        previousUrl={ROOT_URL}
        nextUrl={MENU_URL}
        open={open}
        setOpen={setOpen}
        disabled={disabled}
      />
    </>
  );
};
