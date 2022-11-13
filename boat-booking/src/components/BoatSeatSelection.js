import React, { useState, useEffect } from "react";
import { isEmpty } from "lodash";

import { styled } from "@mui/material/styles";
import Alert from "@mui/material/Alert";
import Container from "@mui/material/Container";

import { NuiBoat } from "./NuiBoat";
import { TereBoat } from "./TereBoat";
import { FootButtonGroup } from "./FootButtonGroup";

import {
  useFetchWeatherApi,
  useBookingContext,
  useLocalStorage,
} from "../hooks";

import {
  convertDepartureDateToString,
  convertTimeStampToLocalDateTime,
} from "../utils";

import { ROOT_URL, MENU_URL, WEATHER_API_BASE_URL } from "../constants";

const StyledBoatSelection = styled("div")(({ theme }) => ({
  display: "flex",
  marginBottom: theme.spacing(10),
  marginTop: theme.spacing(5),
}));

export const BoatSeatSelection = () => {
  const [data, setData] = useBookingContext();
  const [open, setOpen] = useState(false);
  const [disabled, setDisabled] = useState(false);
  const [currentWeather, setCurrentWeather] = useState({});
  const [selectedWeather, setSelectedWeather] = useState({});

  const { item, pending, error } = useFetchWeatherApi(WEATHER_API_BASE_URL);

  console.log("selectedWeather", selectedWeather);
  useEffect(() => {
    if (!isEmpty(item) && !pending) {
      setCurrentWeather(item.current);

      // find out the same date from api response as we selected from form.
      item.daily.map((dailyWeather) => {
        const dateFromApi = convertTimeStampToLocalDateTime(dailyWeather.dt);
        const dateSelectedFromForm = data.departureDate
          .toLocaleString()
          .split(",")[0]
          .trim();
        console.log("dateFromApi", dateFromApi);
        console.log("dateSelectedFromForm", dateSelectedFromForm);
        if (dateFromApi == dateSelectedFromForm) {
          setSelectedWeather(dailyWeather);
        }
      });
    }
  }, [item, pending, error]);

  useEffect(() => {
    if (!isEmpty(selectedWeather)) {
      if (selectedWeather.weather[0].main == "Rain") {
        setDisabled(true);
      }
    }
  }, [selectedWeather]);
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
    <Container>
      <StyledBoatSelection>{boatSelect()}</StyledBoatSelection>
      {!disabled && data && !isEmpty(selectedWeather) ? (
        <Alert severity="success">
          {`Congrats! The weather on ${convertDepartureDateToString(
            data.departureDate
          )} is ${selectedWeather.weather[0].main}! You can continue booking`}
        </Alert>
      ) : (
        <Alert severity="error">
          {`Sorry! The weather on ${convertDepartureDateToString(
            data.departureDate
          )} is Rain, please select another time`}
        </Alert>
      )}

      <FootButtonGroup
        previousUrl={ROOT_URL}
        nextUrl={MENU_URL}
        open={open}
        setOpen={setOpen}
        disabled={disabled}
      />
    </Container>
  );
};
