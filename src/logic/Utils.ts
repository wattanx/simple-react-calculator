import { Operator } from ".";
import { OperatorType } from "./Calculator";
export const isPercentage = (value: string) => {
  return value === Operator.percentage;
};

export const isSign = (value: string) => {
  return value === Operator.sign;
};

export const isEqual = (value: string) => {
  return value === Operator.equal;
};

export const isClear = (operator: string) => {
  return operator === Operator.clear;
};

export const isAllClear = (value: string) => {
  return value === Operator.allClear;
};

export const isOperation = (value: string) => {
  return Object.values(Operator).includes(<OperatorType>value);
};

export const isBasicOperator = (operator: string) => {
  return (
    operator === Operator.addition ||
    operator === Operator.subtraction ||
    operator === Operator.division ||
    operator === Operator.multiplication
  );
};
