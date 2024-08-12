export const parseCommasToThousands = (value: number) =>
  value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');

export const cutDecimalPoints = (num: any) => num.toString().match(/^-?\d+(?:\.\d{0,2})?/)[0];
