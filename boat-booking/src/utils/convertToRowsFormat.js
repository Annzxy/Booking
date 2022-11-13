/**
 {
    "name": "layout",
    "attributes": {},
    "children": [
        {
            "name": "rows",
            "attributes": {},
            "children": [
                {
                    "name": "row1",
                    "attributes": {},
                    "children": [
                        {
                            "name": "seat",
                            "attributes": {},
                            "children": [
                                {
                                    "name": "id",
                                    "attributes": {},
                                    "children": [],
                                    "value": "1"
                                },
                                {
                                    "name": "number",
                                    "attributes": {},
                                    "children": [],
                                    "value": "\"1a\""
                                },
                                {
                                    "name": "isReserved",
                                    "attributes": {},
                                    "children": [],
                                    "value": "false"
                                },
                                {
                                    "name": "isSelected",
                                    "attributes": {},
                                    "children": [],
                                    "value": "false"
                                },
                                {
                                    "name": "tooltip",
                                    "attributes": {},
                                    "children": [],
                                    "value": "false"
                                }
                            ],
                            "value": ""
                        }
                    ],
                    "value": ""
                }
            ],
            "value": ""
        }
    ],
    "value": ""
}

  converts to

  [
    [{id: 1, number: 1a, isReserved: false, isSelected: false, tooltip: false}]
  ]
 * @param xmlInfo 
 */
export const convertToRowsFormat = (xmlInfo) => {
  const rows = xmlInfo.getElementsByTagName("row");
  const formattedRows = [];
  rows.map((row) => {
    const formattedRow = [];

    row.getElementsByTagName("seat").map((seat) => {
      const formattedSeat = {};

      // if is empty seat, push null as a gap in the map
      if (seat.children.length === 0) {
        formattedRow.push(null);
      } else {
        formattedSeat.id = seat.getElementsByTagName("id")[0].value;
        formattedSeat.number = seat.getElementsByTagName("number")[0].value;
        formattedSeat.isReserved =
          seat.getElementsByTagName("isReserved")[0].value === "false"
            ? false
            : true;
        formattedSeat.isSelected =
          seat.getElementsByTagName("isSelected")[0].value === "false"
            ? false
            : true;
        formattedSeat.tooltip = seat.getElementsByTagName("tooltip")[0].value;
        formattedRow.push(formattedSeat);
      }
    });
    formattedRows.push(formattedRow);
  });
  return formattedRows;
};
