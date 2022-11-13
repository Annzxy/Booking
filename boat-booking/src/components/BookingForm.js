import React, { useEffect, useState } from "react";
import { isEmpty } from "lodash";

import { useLocation } from "wouter";

import { styled } from "@mui/material/styles";
import TextField from "@mui/material/TextField";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Container from "@mui/material/Container";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import Box from "@mui/material/Box";
import CardContent from "@mui/material/CardContent";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import DoneIcon from "@mui/icons-material/Done";
import CloseIcon from "@mui/icons-material/Close";

import { useForm, Controller } from "react-hook-form";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

import { useBookingContext, useFetchWeatherApi } from "../hooks";

import { BOAT_SEAT_SELECTION, WEATHER_API_BASE_URL } from "../constants";

const StyledForm = styled("form")`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  max-width: 25vw;
`;

export const BookingForm = () => {
  const [, setLocation] = useLocation();
  const [context, setContext] = useBookingContext();
  const [currentWeather, setCurrentWeather] = useState({});
  const [futureWeathers, setFutureWeathers] = useState({});
  const { item, pending, error } = useFetchWeatherApi(WEATHER_API_BASE_URL);
  useEffect(() => {
    if (!isEmpty(item) && !pending) {
      setCurrentWeather(item.current);
      setFutureWeathers(item.daily);
    }
  }, [item, pending, error]);

  const { handleSubmit, control } = useForm({
    defaultValues: {
      boatSelect: "Tere Boat",
      visitorNumber: 1,
      datePicker: new Date(),
      timeSlot: "10am",
    },
  });

  const onSubmit = (data) => {
    const newContext = {
      ...context,
      boatName: data.boatSelect,
      departureTime: data.timeSlot,
      numberOfVisitors: data.visitorNumber,
      departureDate: data.datePicker,
      futureWeathers: futureWeathers,
    };
    setContext(newContext);
    setLocation(BOAT_SEAT_SELECTION);
  };

  const today = new Date();
  const fourDaysfromNow = new Date(today.setDate(today.getDate() + 3));

  return (
    <Container
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "column",
        height: "100vh",
        padding: 2,
      }}
    >
      {!isEmpty(currentWeather) ? (
        <TableContainer
          component={Paper}
          sx={{ marginBottom: 3, maxWidth: 500 }}
        >
          <Table aria-label="current weather">
            <TableHead>
              <TableRow>
                <TableCell align="center"> Attributes</TableCell>
                <TableCell align="center">Details</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              <TableRow
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell align="center">Date:</TableCell>
                <TableCell align="center">
                  {new Date().toLocaleDateString()}
                </TableCell>
              </TableRow>
              <TableRow
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell align="center">Temperature:</TableCell>
                <TableCell align="center">{`${currentWeather.temp}°C`}</TableCell>
              </TableRow>
              <TableRow
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell align="center">Main:</TableCell>
                <TableCell align="center">
                  {currentWeather.weather[0].main}
                </TableCell>
              </TableRow>
              <TableRow
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell align="center">In Operation:</TableCell>
                <TableCell align="center">
                  {currentWeather.weather[0].main !== "Rain" ? (
                    <DoneIcon />
                  ) : (
                    <CloseIcon />
                  )}
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>
      ) : null}
      <StyledForm onSubmit={handleSubmit(onSubmit)}>
        <Card sx={{ minWidth: 300, padding: 2 }}>
          <CardContent>
            <Box sx={{ marginTop: 2, marginBottom: 2 }}>
              <Controller
                name="visitorNumber"
                control={control}
                rules={{ required: true }}
                render={({ field }) => (
                  <TextField
                    {...field}
                    type="number"
                    variant="standard"
                    label="Number of visitors"
                    InputProps={{
                      inputProps: { min: 1 },
                    }}
                  />
                )}
              />
            </Box>

            <Box sx={{ marginTop: 2, marginBottom: 2 }}>
              <Controller
                name="boatSelect"
                control={control}
                rules={{ required: true }}
                render={({ field }) => (
                  <RadioGroup
                    sx={{ dislay: "flex", flexDirection: "row" }}
                    {...field}
                  >
                    <FormControlLabel
                      value="Tere Boat"
                      control={<Radio />}
                      label="Tere Boat"
                    />
                    <FormControlLabel
                      value="Nui Boat"
                      control={<Radio />}
                      label="Nui Boat"
                    />
                  </RadioGroup>
                )}
              />
            </Box>
            <Box sx={{ marginTop: 2, marginBottom: 2 }}>
              <Controller
                name="datePicker"
                control={control}
                rules={{ required: true }}
                render={({ field }) => (
                  <DatePicker
                    sx={{ height: 20 }}
                    onChange={(date) => field.onChange(date)}
                    selected={field.value}
                    minDate={Date.now()}
                    maxDate={fourDaysfromNow}
                    placeholderText="Select date here"
                  />
                )}
              />
            </Box>
            <Box sx={{ marginTop: 2, marginBottom: 2 }}>
              <Controller
                name="timeSlot"
                control={control}
                rules={{ required: true }}
                render={({ field }) => (
                  <RadioGroup
                    sx={{ dislay: "flex", flexDirection: "row" }}
                    {...field}
                  >
                    <FormControlLabel
                      value="10am"
                      control={<Radio />}
                      label="10 AM"
                    />
                    <FormControlLabel
                      value="2pm"
                      control={<Radio />}
                      label="2 PM"
                    />
                  </RadioGroup>
                )}
              />
            </Box>
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                width: "100%",
              }}
            >
              <Button sx={{ marginTop: 2 }} type="submit" variant="contained">
                Submit
              </Button>
            </Box>
          </CardContent>
        </Card>
      </StyledForm>
    </Container>
  );
};
