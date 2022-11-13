import React, { useState, useEffect } from "react";

import { styled } from "@mui/material/styles";

import { NuiBoat } from "./NuiBoat";
import { TereBoat } from "./TereBoat";
import { FootButtonGroup } from "./FootButtonGroup";

import { useFetchApi, useBookingContext, useLocalStorage } from "../hooks";

import { ROOT_URL, MENU_URL, WEATHER_API_BASE_URL } from "../constants";

const StyledBoatSelection = styled("div")(({ theme }) => ({
  display: "flex",
  marginBottom: theme.spacing(10),
  marginTop: theme.spacing(5),
}));

// const StyledWeatherNotification =

export const BoatSeatSelection = () => {
  const [data, setData] = useBookingContext();
  const [open, setOpen] = useState(false);
  const [disabled, setDisabled] = useState(false);

  // const { item, pending, error } = useFetchApi(
  //   WEATHER_API_BASE_URL,
  //   process.env.WEATHER_API_KEY
  // );
  console.log("data.boatName", data.boatName);
  const boatSelect = () => {
    switch (data.boatName) {
      case "Nui Boat":
        return <NuiBoat />;
      case "Tere Boat":
        return <TereBoat />;
      default:
        return;
    }
  };

  return (
    <>
      <StyledBoatSelection>{boatSelect()}</StyledBoatSelection>
      {/* {item && !pending && !error ? () : null} */}
      {/* <WeatherBoard /> */}
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
