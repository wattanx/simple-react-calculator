export const add = (prevValue: string, value: string): string => {
  return (parseFloat(prevValue) + parseFloat(value)).toString();
};

export const subtract = (prevValue: string, value: string): string => {
  return (parseFloat(prevValue) - parseFloat(value)).toString();
};

export const multiply = (prevValue: string, value: string): string => {
  return (parseFloat(prevValue) * parseFloat(value)).toString();
};

export const divide = (prevValue: string, value: string): string => {
  if (isDivisionByZero(prevValue, value)) return "Error";
  return (parseFloat(prevValue) / parseFloat(value)).toString();
};

export const percentage = (value: string): string => {
  return (parseFloat(value) / 100).toString();
};

export const changeSign = (value: string): string => {
  return parseFloat(value) === 0 ? "0" : (parseFloat(value) * -1).toString();
};

const isDivisionByZero = (prevValue: string, value: string): boolean => {
  const num = parseFloat(value);
  return (parseFloat(prevValue) === 0 && num === 0) || num === 0;
};
