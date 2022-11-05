import { BookingContext } from "../context/BookingContext";
import { useContext } from "react";

export const useBookingContext = () => useContext(BookingContext);
