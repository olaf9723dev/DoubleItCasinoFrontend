import { NumericFormat } from 'react-number-format';

export const toNumber = (number: number | undefined, fixed = 5, status = false) => {
  if (!number || Number.isNaN(Number(number))) {
    if (status) {
      return Number(0).toFixed(fixed);
    }
    return '0.00';
  }
  if (status) {
    return Number(number).toFixed(fixed).toLocaleString();
  }
  return Number(Number(number).toFixed(fixed)).toLocaleString();
};

export const toNumberTag = (number = 0, fixed = 5) => {
  if (!number || Number.isNaN(Number(number))) {
    return '0.00';
  }
  return (
    <NumericFormat
      value={Number(Number(number).toFixed(fixed))}
      displayType="text"
      thousandSeparator
    />
  );
};
