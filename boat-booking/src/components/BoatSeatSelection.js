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
  const [selectedWeather, setSelectedWeather] = useState({});

  useEffect(() => {
    if (!isEmpty(data)) {
      data.futureWeathers.map((dailyWeather) => {
        const dateFromApi = convertTimeStampToLocalDateTime(dailyWeather.dt);
        const dateSelectedFromForm = data.departureDate
          .toLocaleString()
          .split(",")[0]
          .trim();

        if (dateFromApi == dateSelectedFromForm) {
          setSelectedWeather(dailyWeather);
        }

        if (!isEmpty(selectedWeather)) {
          if (selectedWeather.weather[0].main == "Rain") {
            setDisabled(true);
          }
        }
      });
    }
  }, [data.futureWeathers]);

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

  const shouldShowAlert = !isEmpty(data?.futureWeathers);
  const shouldShowSuccessAlert = !disabled && !isEmpty(selectedWeather);
  return (
    <Container>
      <StyledBoatSelection>{boatSelect()}</StyledBoatSelection>
      {shouldShowAlert ? (
        shouldShowSuccessAlert ? (
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
        )
      ) : null}

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
