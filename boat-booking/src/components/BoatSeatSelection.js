import React, { useState, useEffect } from "react";
import { isEmpty } from "lodash";

import { styled } from "@mui/material/styles";
import Alert from "@mui/material/Alert";
import Container from "@mui/material/Container";

import { NuiBoat } from "./NuiBoat";
import { TereBoat } from "./TereBoat";
import { FootButtonGroup } from "./FootButtonGroup";

import { useBookingContext } from "../hooks";

import {
  convertDepartureDateToString,
  convertTimeStampToLocalDateTime,
} from "../utils";

import { ROOT_URL, MENU_URL, TERE_BOAT, NUI_BOAT } from "../constants";

const StyledBoatSelection = styled("div")(({ theme }) => ({
  display: "flex",
  marginBottom: theme.spacing(5),
  marginTop: theme.spacing(5),
}));

export const BoatSeatSelection = () => {
  const [data, setData] = useBookingContext();
  const [open, setOpen] = useState(false);
  const [disabled, setDisabled] = useState(false);
  const [selectedWeather, setSelectedWeather] = useState({});

  useEffect(() => {
    if (!isEmpty(data)) {
      const currentLocalStorageKeyNameSuffix = `-${data.departureDate.getDate()}-${
        data.departureTime
      }`;

      const currentLocalStorageKeyNameMain =
        data.boatName === "Tere Boat" ? TERE_BOAT : NUI_BOAT;
      setData({
        ...data,
        localStorageKeyName: `${currentLocalStorageKeyNameMain}${currentLocalStorageKeyNameSuffix}`,
      });
      data.futureWeathers.map((dailyWeather) => {
        const dateFromApi = convertTimeStampToLocalDateTime(dailyWeather.dt);
        const dateSelectedFromForm = data.departureDate
          .toLocaleString()
          .split(",")[0]
          .trim();

        if (dateFromApi === dateSelectedFromForm) {
          setSelectedWeather(dailyWeather);
        }

        if (!isEmpty(selectedWeather)) {
          if (
            selectedWeather.weather[0].main === "Rain" &&
            selectedWeather.temp.day > 14
          ) {
            setDisabled(true);
          }
        }
      });
    }
  }, [data.futureWeathers, data.departureTime, data.boatName, selectedWeather]);

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

  const shouldShowAlert =
    !isEmpty(data?.futureWeathers) && !isEmpty(selectedWeather);
  const shouldShowSuccessAlert = !disabled;
  return (
    <Container sx={{ backgroundColor: "white", padding: 2, paddingBottom: 1 }}>
      <StyledBoatSelection>{boatSelect()}</StyledBoatSelection>
      {shouldShowAlert ? (
        shouldShowSuccessAlert ? (
          <Alert severity="success">
            {`Congrats! The weather on ${convertDepartureDateToString(
              data.departureDate
            )} is ${selectedWeather.weather[0].main} and Temp is ${
              selectedWeather.temp.day
            }°C. You can continue booking`}
          </Alert>
        ) : (
          <Alert severity="error">
            {`Sorry! The weather on ${convertDepartureDateToString(
              data.departureDate
            )} is Rain and Temp is ${
              selectedWeather.temp.day
            }°C, please select another time`}
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
