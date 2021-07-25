import { Command } from ".";
import { CommandType } from "./Calculator";
export const isPercentage = (value: string) => {
  return value === Command.Percentage;
};

export const isSign = (value: string) => {
  return value === Command.Sign;
};

export const isEqual = (value: string) => {
  return value === Command.Equal;
};

export const isClear = (value: string) => {
  return value === Command.Clear;
};

export const isAllClear = (value: string) => {
  return value === Command.AllClear;
};

export const isCommand = (value: string) => {
  return Object.values(Command).includes(<CommandType>value);
};

export const isBasicOperator = (value: string) => {
  return (
    value === Command.Addition ||
    value === Command.Subtraction ||
    value === Command.Division ||
    value === Command.Multiplication
  );
};
