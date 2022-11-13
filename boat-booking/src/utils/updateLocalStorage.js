import { ADD, REMOVE, RESERVE } from "../constants";

export const updateLocalStorage = (KeyInLocalStorage, method, id) => {
  let rows = JSON.parse(localStorage.getItem(KeyInLocalStorage));
  switch (method) {
    case ADD:
      rows = rows.map((row) => {
        row.map((seat) => {
          if (seat && seat.id === id) {
            seat.isSelected = true;
          }
          return seat;
        });

        return row;
      });
      break;

    case REMOVE:
      rows = rows.map((row) => {
        row.map((seat) => {
          if (seat && seat.id === id) {
            seat.isSelected = false;
          }
          return seat;
        });

        return row;
      });
      break;

    case RESERVE:
      rows = rows.map((row) => {
        row.map((seat) => {
          if (seat && seat.isSelected === true) {
            seat.isReserved = true;
          }
          return seat;
        });

        return row;
      });
      break;
    default:
  }

  localStorage.setItem(KeyInLocalStorage, JSON.stringify(rows));
};
