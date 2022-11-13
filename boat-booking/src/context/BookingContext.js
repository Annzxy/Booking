import React, { useState, createContext } from "react";

export const BookingContext = createContext();

export const INITIAL_STATE = {
  numberOfVisitors: 1,
  boatName: "Tere Boat",
  departureTime: "10am",
  departureDate: new Date(),
  selectedSeats: [],
  orders: [
    {
      name: "Chips",
      unit: 0,
      unitPrice: 15,
      subtotal: 0,
    },
    {
      name: "Dumplings",
      unit: 0,
      unitPrice: 20,
      subtotal: 0,
    },
    {
      name: "Pasta",
      unit: 0,
      unitPrice: 35,
      subtotal: 0,
    },
    {
      name: "Pho",
      unit: 0,
      unitPrice: 20,
      subtotal: 0,
    },
    {
      name: "Poke",
      unit: 0,
      unitPrice: 25,
      subtotal: 0,
    },
    {
      name: "Sandwitch",
      unit: 0,
      unitPrice: 45,
      subtotal: 0,
    },
  ],
  futureWeathers: [],
  totalTicketPrice: 0,
  totalFoodPrice: 0,
};

export const BookingContextProvider = (props) => {
  const [state, setState] = useState(INITIAL_STATE);

  return (
    <BookingContext.Provider value={[state, setState]}>
      {props.children}
    </BookingContext.Provider>
  );
};
