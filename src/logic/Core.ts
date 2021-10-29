import { Big } from "big.js";
Big.NE = -10;

export const add = (prevValue: string, value: string): string => {
  return new Big(prevValue).plus(value).toString();
};

export const subtract = (prevValue: string, value: string): string => {
  return new Big(prevValue).minus(value).toString();
};

export const multiply = (prevValue: string, value: string): string => {
  return new Big(prevValue).mul(value).toString();
};

export const divide = (prevValue: string, value: string): string => {
  try {
    return new Big(prevValue).div(value).toString();
  } catch (err: unknown) {
    return "Error";
  }
};

export const percentage = (value: string): string => {
  return divide(value, "100").toString();
};

export const changeSign = (value: string): string => {
  return parseFloat(value) === 0 ? "0" : (parseFloat(value) * -1).toString();
};
