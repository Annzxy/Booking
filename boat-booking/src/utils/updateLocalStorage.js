import { ADD, REMOVE } from "../constants";

export const updateLocalStorage = (
  KeyInLocalStorage,
  method,
  id,
  permant = false
) => {
  let rows = JSON.parse(localStorage.getItem(KeyInLocalStorage));
  //   debugger;
  switch (method) {
    case ADD:
      rows = rows.map((row) => {
        row.map((seat) => {
          if (seat && seat.id == id) {
            if (permant) {
              seat.isReserved = true;
            }
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
          if (seat && seat.id == id) {
            seat.isSelected = false;
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
