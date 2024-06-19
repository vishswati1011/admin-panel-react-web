export const formatDate = (dateString) => {
  const getOrdinalSuffix = (number) => {
    const suffixes = ["th", "st", "nd", "rd"];
    const lastDigit = number % 10;
    const lastTwoDigits = number % 100;
    return suffixes[lastDigit] || suffixes[lastTwoDigits] || suffixes[0];
  };

  const date = new Date(dateString);
  const day = date.getDate();
  const month = date.toLocaleDateString(undefined, { month: "short" });
  const year = date.getFullYear();
  return `${day}${getOrdinalSuffix(day)} ${month} ${year}`;
};
