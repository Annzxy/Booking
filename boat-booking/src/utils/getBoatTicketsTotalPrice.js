import { calculateBoatTicketPrice } from ".";

export const getBoatTicketsTotalPrice = (selectedSeats) => {
  if (selectedSeats.length == 0) {
    return 0;
  }
  let result = 0;

  selectedSeats.map((seat) => {
    result += calculateBoatTicketPrice(seat.row);
  });

  return result;
};
