export const parseCommasToThousands = (value: number) =>
  value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');

export const cutDecimalPoints = (num: any) => num.toString().match(/^-?\d+(?:\.\d{0,2})?/)[0];

export const emailValidator = (value: string) =>
  value.match(
    // eslint-disable-next-line
    /(?:[a-z0-9+!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/gi
  );

export const abbreviate = (value: any, decimal = 2) => {
  const length = value.toFixed(0).length;
  const index = Math.ceil((length - 3) / 3);
  const suffix = ['K', 'M', 'G', 'T'];

  if (length < 4) {
    return Number(value.toFixed(4).replace(/0{1,2}$/, '')).toFixed(decimal);
  }

  return (
    Number((value / 1000 ** index).toFixed(1).replace(/\.0$/, '')).toFixed(decimal) +
    suffix[index - 1]
  );
};

export const playSound = (audioFile: any) => {
  audioFile.play();
};
