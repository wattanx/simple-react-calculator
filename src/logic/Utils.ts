import { Operator } from ".";
import { OperatorType } from "./Calculator";
export const isPercentage = (value: string) => {
  return value === Operator.Percentage;
};

export const isSign = (value: string) => {
  return value === Operator.Sign;
};

export const isEqual = (value: string) => {
  return value === Operator.Equal;
};

export const isClear = (operator: string) => {
  return operator === Operator.Clear;
};

export const isAllClear = (value: string) => {
  return value === Operator.AllClear;
};

export const isOperation = (value: string) => {
  return Object.values(Operator).includes(<OperatorType>value);
};

export const isBasicOperator = (operator: string) => {
  return (
    operator === Operator.Addition ||
    operator === Operator.Subtraction ||
    operator === Operator.Division ||
    operator === Operator.Multiplication
  );
};
