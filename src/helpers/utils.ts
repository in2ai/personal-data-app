export const timestampToddMMYYYYhhmmss = (timestamp: number): string => {
  const date = new Date(timestamp * 1000);
  return date.toLocaleDateString('es-ES') + ' ' + date.toLocaleTimeString('es-ES');
};

export const dateToddMMYYYY = (date: Date): string => {
  const d = new Date(date);
  let month = '' + (d.getMonth() + 1);
  let day = '' + d.getDate();
  const year = d.getFullYear();
  if (month.length < 2) {
    month = '0' + month;
  }
  if (day.length < 2) {
    day = '0' + day;
  }
  return `${day}/${month}/${year}`;
};

export const isoStringToddMMYYYY = (isoString: string): string => {
  const d = new Date(isoString);
  return dateToddMMYYYY(d);
};
