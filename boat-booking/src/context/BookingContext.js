import React, { useState, createContext } from "react";

export const BookingContext = createContext();

const initialState = {
  numberOfVisitors: 1,
  boatName: "Tere Boat",
  departureTime: "10am",
  departureDate: new Date(),
  selectedSeats: [],
};

export const BookingContextProvider = (props) => {
  const [state, setState] = useState(initialState);

  return (
    <BookingContext.Provider value={[state, setState]}>
      {props.children}
    </BookingContext.Provider>
  );
};
