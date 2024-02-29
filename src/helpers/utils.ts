export const timestampToddMMYYYYhhmmss = (timestamp: number): string => {
  const date = new Date(timestamp * 1000);
  return date.toLocaleDateString('es-ES') + ' ' + date.toLocaleTimeString('es-ES');
};
