export const dateFormat = (strDate) => {
  const date = new Date(strDate);
  let day = date.getDate();
  let month = date.getMonth() + 1;
  const year = date.getFullYear();

  day = day <= 9 ? `0${day}` : day;
  month = month <= 9 ? `0${month}` : month;

  return `${day}/${month}/${year}`;
};
