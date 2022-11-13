export const calculateBoatTicketPrice = (rowNumber) => {
  switch (rowNumber) {
    case ("1", "2"):
      return 30;
    case ("3", "4", "5"):
      return 25;
    default:
      return 20;
  }
};
