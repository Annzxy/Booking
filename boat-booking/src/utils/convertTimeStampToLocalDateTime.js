export const convertTimeStampToLocalDateTime = (timeStamp) => {
  const timestamp = new Date(timeStamp); // This would be the timestamp you want to format

  return new Intl.DateTimeFormat("en-UK", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).format(timestamp * 1000);
};
