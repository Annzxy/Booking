import React from "react";
import { BoatSeatSelection } from "../components/BoatSeatSelection";
import { BookingForm } from "../components/BookingForm";
import { Menu } from "../components/Menu";
import { BookingSummary } from "../components/BookingSummary";
import { Route } from "wouter";

import {
  BOOKING_SUMMARY_URL,
  BOAT_SEAT_SELECTION,
  MENU_URL,
} from "../constants";
export const Routes = () => {
  return (
    <>
      <Route path={BOAT_SEAT_SELECTION} component={BoatSeatSelection}>
        BoatSeatSelection
      </Route>
      <Route path={MENU_URL} component={Menu}>
        Menu
      </Route>
      <Route path={BOOKING_SUMMARY_URL} component={BookingSummary}>
        BookingSummary
      </Route>

      <Route path="/" component={BookingForm}>
        BookingForm
      </Route>
    </>
  );
};
