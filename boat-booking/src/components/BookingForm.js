import React, { useState } from "react";

import { useRoute, useLocation } from "wouter";

import { styled } from "@mui/material/styles";
import TextField from "@mui/material/TextField";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Alert from "@mui/material/Alert";

import { useForm, Controller } from "react-hook-form";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

import { FootButtonGroup } from "./FootButtonGroup";

import { useBookingContext } from "../hooks";

import { BOAT_SEAT_SELECTION, BOOKING_MAIN } from "../constants";

const StyledFormItemWrapper = styled("div")(({ theme }) => ({
  marginTop: theme.spacing(2),
  marginBottom: theme.spacing(2),
}));

const StyledForm = styled("form")`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  height: 100vh;
  max-width: 25vw;
  margin: auto;
`;

const StyledRadioButtonGroup = styled(RadioGroup)`
  dislay: flex;
  flex-direction: row;
`;

const StyledSubmitButton = styled(Button)(({ theme }) => ({
  marginTop: theme.spacing(2),
}));

const StyledSubmitButtonWrapper = styled("div")(({ theme }) => ({
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  width: "100%",
}));

export const BookingForm = () => {
  const [location, setLocation] = useLocation();
  const [context, setContext] = useBookingContext();
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
    };
    setContext(newContext);
    setLocation(BOAT_SEAT_SELECTION);
  };

  const today = new Date();
  const fourDaysfromNow = new Date(today.setDate(today.getDate() + 3));

  return (
    <StyledForm onSubmit={handleSubmit(onSubmit)}>
      <Card sx={{ minWidth: 300, padding: 2 }}>
        <CardContent>
          <StyledFormItemWrapper>
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
          </StyledFormItemWrapper>

          <StyledFormItemWrapper>
            <Controller
              name="boatSelect"
              control={control}
              rules={{ required: true }}
              render={({ field }) => (
                <StyledRadioButtonGroup {...field}>
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
                </StyledRadioButtonGroup>
              )}
            />
          </StyledFormItemWrapper>
          <StyledFormItemWrapper>
            <Controller
              name="datePicker"
              control={control}
              rules={{ required: true }}
              render={({ field }) => (
                <DatePicker
                  onChange={(date) => field.onChange(date)}
                  selected={field.value}
                  minDate={Date.now()}
                  maxDate={fourDaysfromNow}
                  placeholderText="Select date here"
                />
              )}
            />
          </StyledFormItemWrapper>
          <StyledFormItemWrapper>
            <Controller
              name="timeSlot"
              control={control}
              rules={{ required: true }}
              render={({ field }) => (
                <StyledRadioButtonGroup {...field}>
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
                </StyledRadioButtonGroup>
              )}
            />
          </StyledFormItemWrapper>
          <StyledSubmitButtonWrapper>
            <StyledSubmitButton type="submit" variant="contained">
              Submit
            </StyledSubmitButton>
          </StyledSubmitButtonWrapper>
        </CardContent>
      </Card>
    </StyledForm>
  );
};
