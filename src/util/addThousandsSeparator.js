export const addThousandsSeparator = (amount) => {
  if (amount === null || amount === undefined) return "";
  return amount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
};
