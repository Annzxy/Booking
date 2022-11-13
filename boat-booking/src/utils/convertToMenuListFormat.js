export const convertToMenuListFormat = (rawItems) => {
  const items = rawItems.getElementsByTagName("Item");
  const formattedItems = [];
  items.map((item) => {
    const outputItem = {};

    outputItem.imageName = item.getElementsByTagName("ImageName")[0].value;
    outputItem.description = item.getElementsByTagName("Description")[0].value;
    outputItem.cost = item.getElementsByTagName("Cost")[0].value;
    outputItem.specialRequirement =
      item.getElementsByTagName("SpecialRequirement")[0].value;
    formattedItems.push(outputItem);
  });
  return formattedItems;
};
